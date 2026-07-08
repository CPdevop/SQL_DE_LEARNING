# Chapter 7: Practical End-to-End ETL Pipeline Project

> **Part:** Python for Data Engineering
>
> **Chapter:** 7
>
> **Difficulty:** 🔴 Advanced
>
> **Estimated Reading Time:** 55–70 minutes
>
> **Prerequisites:** Chapters 1–6
>
> **Target Audience:** Data Engineers, ETL Architects
>
> **Version:** 2.0
>
> **Last Updated:** 2026-07-06

---

# Learning Objectives

After completing this chapter, you will be able to:
- Design a production-grade data pipeline architecture integrating Pandas, PySpark, and Apache Airflow.
- Implement an extraction module that cleans raw datasets and normalizes columns using Pandas.
- Build a distributed transformation step using PySpark to perform high-volume joins, date conversions, and grouping.
- Generate idempotent, partitioned writes in Parquet format.
- Author unit tests using **`pytest`** and **`unittest.mock`** to validate data pipelines.
- Configure local orchestration environments using a multi-service **`docker-compose`** file.
- Validate dataset qualities and handle processing exceptions.

---

# Pipeline Architecture Overview

We will design a pipeline to calculate daily aggregated financial metrics by user region.

```mermaid
graph TD
    S3_Raw[Raw Storage: CSV & JSON] -->|Extract / Clean: Pandas| S3_Stage[Staging Storage: Parquet]
    S3_Stage -->|Transform / Aggregate: PySpark| S3_Warehouse[Warehouse Storage: Partitioned Parquet]
    Airflow[Orchestrator: Apache Airflow] -.->|Schedules & Coordinates| S3_Raw
    Airflow -.->|Schedules & Coordinates| S3_Stage
    style Airflow fill:#fcf,stroke:#333,stroke-width:2px
    style S3_Raw fill:#bbf,stroke:#333,stroke-width:2px
    style S3_Stage fill:#ddf,stroke:#333,stroke-width:2px
    style S3_Warehouse fill:#dfd,stroke:#333,stroke-width:2px
```

### Scenario Specification:
- **Source A (User Profiles - CSV):** Contains user IDs and country codes. Has inconsistent whitespace and missing values.
- **Source B (Transaction Logs - JSON):** Event stream containing transaction values, currencies, timestamps, and user IDs.
- **The Objective:** Clean demographics, join with transaction streams, convert transactions to standard currency (USD), calculate total spend and average transaction value grouped by country, and output daily partitions.

---

# Directory Structure

```text
/etl_project/
├── dags/
│   └── sales_etl_dag.py
├── scripts/
│   ├── extract_clean.py
│   └── spark_transform.py
├── tests/
│   ├── __init__.py
│   └── test_extract_clean.py
├── docker-compose.yaml
├── data/
│   ├── raw/
│   │   ├── users.csv
│   │   └── transactions_2026-07-06.json
│   ├── staging/
│   └── warehouse/
```

---

# Step 1: Extraction & Cleaning (Pandas)

Save this file as `scripts/extract_clean.py`.

```python
import sys
import os
import pandas as pd

def run_extraction(execution_date, data_dir):
    print(f"Starting extraction phase for: {execution_date}")
    
    # Define paths
    raw_users_path = os.path.join(data_dir, "raw/users.csv")
    raw_tx_path = os.path.join(data_dir, f"raw/transactions_{execution_date}.json")
    
    stage_users_path = os.path.join(data_dir, "staging/users_clean.parquet")
    stage_tx_path = os.path.join(data_dir, f"staging/transactions_{execution_date}.parquet")
    
    # Ensure staging directories exist
    os.makedirs(os.path.join(data_dir, "staging"), exist_ok=True)

    # 1. Clean Users Demographics
    if not os.path.exists(raw_users_path):
        raise FileNotFoundError(f"Missing user file: {raw_users_path}")
        
    df_users = pd.read_csv(raw_users_path)
    
    # Strip whitespaces and handle null values
    df_users["user_id"] = df_users["user_id"].astype(int)
    df_users["country"] = df_users["country"].str.strip().str.upper()
    df_users["country"] = df_users["country"].fillna("UNKNOWN")
    
    # Write to staging in Parquet format
    df_users.to_parquet(stage_users_path, index=False)
    print(f"Cleaned users profile written to staging: {stage_users_path}")

    # 2. Clean Transactions
    if not os.path.exists(raw_tx_path):
        raise FileNotFoundError(f"Missing transaction file for partition: {raw_tx_path}")
        
    df_tx = pd.read_json(raw_tx_path, lines=True)
    
    # Deduplicate raw stream based on transaction_id
    df_tx.drop_duplicates(subset=["transaction_id"], inplace=True)
    
    # Validate datatypes and columns
    df_tx["user_id"] = df_tx["user_id"].astype(int)
    df_tx["amount"] = pd.to_numeric(df_tx["amount"], errors="coerce").fillna(0.0)
    
    # Write to staging
    df_tx.to_parquet(stage_tx_path, index=False)
    print(f"Cleaned transactions written to staging: {stage_tx_path}")

if __name__ == "__main__":
    # Expects arguments: execution_date data_dir
    if len(sys.argv) < 3:
        print("Usage: python extract_clean.py <execution_date> <data_dir>")
        sys.exit(1)
        
    run_extraction(sys.argv[1], sys.argv[2])
```

---

# Step 2: Distributed Transformation (PySpark)

Save this file as `scripts/spark_transform.py`.

```python
import sys
import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, when, sum as _sum, avg as _avg, lit

def run_transformation(execution_date, data_dir):
    print(f"Starting Spark transformation phase for partition: {execution_date}")

    # Initialize PySpark Session
    spark = SparkSession.builder \
        .appName("ETL-Project-Spark-Transform") \
        .master("local[*]") \
        .getOrCreate()

    # Define paths
    stage_users_path = os.path.join(data_dir, "staging/users_clean.parquet")
    stage_tx_path = os.path.join(data_dir, f"staging/transactions_{execution_date}.parquet")
    warehouse_output_path = os.path.join(data_dir, "warehouse/regional_sales")

    # Load datasets from staging
    users_df = spark.read.parquet(stage_users_path)
    tx_df = spark.read.parquet(stage_tx_path)

    # Convert amounts to USD based on currency exchange rate logic
    # Assume 1 EUR = 1.1 USD, 1 GBP = 1.3 USD, 1 USD = 1.0 USD
    tx_usd_df = tx_df.withColumn(
        "amount_usd",
        when(col("currency") == "EUR", col("amount") * 1.1)
        .when(col("currency") == "GBP", col("amount") * 1.3)
        .otherwise(col("amount"))
    )

    # Join datasets (Broadcasting users lookup table because it is small)
    from pyspark.sql.functions import broadcast
    joined_df = tx_usd_df.join(broadcast(users_df), on="user_id", how="inner")

    # Aggregate: metrics grouped by Country
    aggregated_df = joined_df.groupBy("country").agg(
        _sum("amount_usd").alias("total_revenue_usd"),
        _avg("amount_usd").alias("avg_transaction_usd")
    )

    # Add logical running date column to partitioning
    result_df = aggregated_df.withColumn("run_date", lit(execution_date))

    # Write output to Warehouse partitioned by run_date
    # Save mode overwrite ensures idempotency: if rerun, partition is overwritten
    result_df.write \
        .mode("overwrite") \
        .partitionBy("run_date") \
        .parquet(warehouse_output_path)

    print(f"Aggregated metrics successfully written to: {warehouse_output_path}")
    spark.stop()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: spark-submit spark_transform.py <execution_date> <data_dir>")
        sys.exit(1)
        
    run_transformation(sys.argv[1], sys.argv[2])
```

---

# Step 3: Workflow Orchestration (Airflow DAG)

Save this file as `dags/sales_etl_dag.py`.

```python
import os
import subprocess
from datetime import datetime, timedelta
from airflow.decorators import dag, task

PROJECT_DIR = "/opt/airflow/etl_project"

default_args = {
    "owner": "airflow",
    "retries": 1,
    "retry_delay": timedelta(minutes=2),
}

@dag(
    dag_id="financial_etl_pipeline",
    default_args=default_args,
    description="Daily ingestion and warehouse load pipeline",
    schedule_interval="@daily",
    start_date=datetime(2026, 7, 1),
    catchup=False,
    tags=["finance", "spark", "pandas"]
)
def financial_etl_pipeline():

    @task
    def run_pandas_extraction(ds=None):
        script_path = os.path.join(PROJECT_DIR, "scripts/extract_clean.py")
        data_dir = os.path.join(PROJECT_DIR, "data")
        
        print(f"Calling script: {script_path} for date {ds}")
        cmd = ["python", script_path, ds, data_dir]
        
        # Run process
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        print(result.stdout)
        
        if result.returncode != 0:
            raise RuntimeError(f"Extraction failed: {result.stderr}")

    @task
    def run_spark_transformation(ds=None):
        script_path = os.path.join(PROJECT_DIR, "scripts/spark_transform.py")
        data_dir = os.path.join(PROJECT_DIR, "data")
        
        print(f"Calling spark submit: {script_path} for date {ds}")
        cmd = ["spark-submit", script_path, ds, data_dir]
        
        # Run process
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        print(result.stdout)
        
        if result.returncode != 0:
            raise RuntimeError(f"Transformation failed: {result.stderr}")

    # Set dependency sequence using functional references
    extract_task = run_pandas_extraction()
    transform_task = run_spark_transformation()
    
    extract_task >> transform_task

# Initialize pipeline
dag_instance = financial_etl_pipeline()
```

---

# Step 4: Unit Testing & Mocks (pytest)

Writing automated tests validates your pipeline against regressions. We use `pytest` along with `unittest.mock` to bypass actual disk writes and file requirements during test runs.

Save this test script as `tests/test_extract_clean.py`:

```python
import os
import pytest
from unittest.mock import patch, MagicMock
import pandas as pd
from scripts.extract_clean import run_extraction

@patch("os.path.exists")
@patch("pandas.read_csv")
@patch("pandas.read_json")
@patch("pandas.DataFrame.to_parquet")
@patch("os.makedirs")
def test_run_extraction(mock_makedirs, mock_to_parquet, mock_read_json, mock_read_csv, mock_exists):
    # 1. Arrange mock values
    mock_exists.return_value = True  # Pretend files exist on disk
    
    # Mock user demographics input
    mock_read_csv.return_value = pd.DataFrame({
        "user_id": [1001, 1002],
        "country": [" US ", " EU "] # Notice raw whitespaces
    })
    
    # Mock transaction stream input
    mock_read_json.return_value = pd.DataFrame({
        "transaction_id": ["tx01", "tx01", "tx02"], # Notice duplicate transaction
        "user_id": [1001, 1001, 1002],
        "amount": ["100.5", "100.5", "50.0"],
        "currency": ["USD", "USD", "EUR"]
    })

    # 2. Act
    run_extraction("2026-07-06", "/dummy/dir")

    # 3. Assert: Verify mock read calls
    mock_read_csv.assert_called_once()
    mock_read_json.assert_called_once()
    
    # Get the cleaned demographics DataFrame passed to to_parquet
    # (Checking if white space stripping and capitalization occurred)
    cleaned_users_df = mock_to_parquet.call_args_list[0][0][0]
    assert cleaned_users_df.loc[0, "country"] == "US"
    assert cleaned_users_df.loc[1, "country"] == "EU"
    
    # Get the cleaned transaction DataFrame
    # (Checking if transaction_id deduplication successfully occurred)
    cleaned_tx_df = mock_to_parquet.call_args_list[1][0][0]
    assert len(cleaned_tx_df) == 2  # Duplicate 'tx01' must be dropped!
```

Execute tests using command:
```bash
pytest tests/
```

---

# Step 5: Local Container Setup (docker-compose)

To orchestrate this pipeline locally, save the following configuration as `docker-compose.yaml` in your project root. This spins up a PostgreSQL server for Airflow's metadata, alongside Airflow scheduler and webserver containers.

```yaml
version: '3.7'
services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_USER=airflow
      - POSTGRES_PASSWORD=airflow
      - POSTGRES_DB=airflow
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  airflow-webserver:
    image: apache/airflow:2.5.1-python3.8
    depends_on:
      - postgres
    environment:
      - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow
      - AIRFLOW__CORE__EXECUTOR=LocalExecutor
    ports:
      - "8080:8080"
    volumes:
      - ./dags:/opt/airflow/dags
      - ./scripts:/opt/airflow/etl_project/scripts
      - ./data:/opt/airflow/etl_project/data
    command: webserver

  airflow-scheduler:
    image: apache/airflow:2.5.1-python3.8
    depends_on:
      - postgres
    environment:
      - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow
      - AIRFLOW__CORE__EXECUTOR=LocalExecutor
    volumes:
      - ./dags:/opt/airflow/dags
      - ./scripts:/opt/airflow/etl_project/scripts
      - ./data:/opt/airflow/etl_project/data
    command: scheduler

volumes:
  db_data:
```

Launch the environment with:
```bash
docker-compose up -d
```
Access the Airflow UI at `http://localhost:8080` (default login credentials: `admin` / `admin` after running initialization scripts).

---

# Exercises & Quiz

### Question 1
In our unit tests, what is the primary purpose of `@patch('pandas.read_csv')`?
- A) It speeds up the system clock.
- B) It mocks the `read_csv` function, allowing us to simulate reading CSV files and return test DataFrames without needing real files on disk.
- C) It translates Python code to Java bytecode.
- D) It formats SQL queries.

*Answer:* **B**. Patching mocks file reader methods, allowing self-contained pipeline tests without physical file dependencies.

### Question 2
Why does the `docker-compose` setup configure a shared volume (`./dags:/opt/airflow/dags`)?
- A) To encrypt database connections.
- B) To run unit tests automatically.
- C) To mount our local DAG files into the running Airflow containers, ensuring the scheduler and webserver pick up changes instantly.
- D) It is required for PySpark installation.

*Answer:* **C**. Volume mounts sync development folder files directly into the containerized daemon paths.

---

# Chapter Summary Checklist
- Can you explain how to mock PySpark sessions inside unit tests?
- What are the benefits of separating your ETL into modular scripts rather than placing all code inside the DAG file?
- How do you construct volume mounts to share directories across container boundaries?
- Do you feel confident running and testing automated data pipelines locally?
