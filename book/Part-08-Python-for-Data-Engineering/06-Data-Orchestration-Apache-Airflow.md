# Chapter 6: Workflow Orchestration with Apache Airflow

> **Part:** Python for Data Engineering
>
> **Chapter:** 6
>
> **Difficulty:** 🟡 Intermediate
>
> **Estimated Reading Time:** 45–60 minutes
>
> **Prerequisites:** Chapters 1–3
>
> **Target Audience:** Data Engineers, DevOps Engineers, Analytics Engineers
>
> **Version:** 2.0
>
> **Last Updated:** 2026-07-06

---

# Learning Objectives

After completing this chapter, you will be able to:
- Compare and configure Airflow's Executor architectures (**Celery**, **Kubernetes**, **Local**, **Sequential**).
- Design complex workflows using the **`BranchPythonOperator`** to execute tasks dynamically.
- Control task execution behaviors using custom **Trigger Rules** (e.g. `all_done`, `one_failed`).
- Author workflow DAGs using standard parameters (e.g. `start_date`, `schedule_interval`, `catchup`).
- Use standard Operators (`PythonOperator`, `BashOperator`) and connect task dependencies.
- Build modern data-sharing DAGs using the **TaskFlow API** and `@task` decorators.
- Design **idempotent** workflows that can be run repeatedly without corrupting datasets.
- Secure connection strings using Airflow Connections and Variables.

---

# Quick Revision

- **DAG (Directed Acyclic Graph):** A collection of all tasks you want to run, organized in a way that reflects their relationships and dependencies.
- **Executor:** The mechanism that determines *how* and *where* tasks are executed.
- **`BranchPythonOperator`:** An operator that runs a Python function to decide which task path to execute next.
- **Trigger Rule:** Setting that determines when a downstream task runs based on its parents' statuses (defaults to `all_success`).
- **Idempotency:** A design principle where running a pipeline multiple times with the same input parameters yields the exact same state, preventing duplicate records.

---

# Airflow Executor Architectures

Airflow's scheduler delegates task execution to the configured **Executor**. Choosing the right executor is critical when moving from development to production.

| Executor | Database Backend | Concurrency Profile | Production Fit |
| :--- | :--- | :--- | :--- |
| **Sequential** | SQLite (Default) | Single task at a time (Sequential) | ❌ Development only. SQLite locks during concurrent writes. |
| **Local** | PostgreSQL / MySQL | Multi-threaded concurrency on a single machine | ⚠️ Small production loads. Limited by the CPU/RAM of the scheduler node. |
| **Celery** | PostgreSQL / Redis | Distributed tasks sent to permanent Celery worker nodes |  Large enterprise loads. Handles steady, predictable scaling. |
| **Kubernetes** | PostgreSQL | Distributed tasks spun up as individual Kubernetes Pods on-the-fly | 🚀 Elastic scaling. Zero-resource idle costs. Perfect for containerized tasks. |

---

# Dynamic Task Routing & Trigger Rules

Data pipelines often need to branch. For example, if a database health check fails, the pipeline should route to an alert task and skip the rest of the ETL pipeline.

## 1. Branching with `BranchPythonOperator`
The `BranchPythonOperator` evaluates a python function that returns the `task_id` (or list of `task_ids`) of the task(s) to run next. All other paths are set to the `skipped` state.

```python
from airflow import DAG
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.empty import EmptyOperator
from datetime import datetime

default_args = {"start_date": datetime(2026, 7, 1)}

def check_new_data():
    # Simulate API count check
    new_records_count = 50
    if new_records_count > 0:
        return "run_extraction_task"  # Target task ID to branch to
    return "skip_pipeline_task"

with DAG("branching_etl_flow", default_args=default_args, schedule_interval=None) as dag:

    # Branch task
    task_branch = BranchPythonOperator(
        task_id="check_records_count",
        python_callable=check_new_data
    )

    # Path A: Run ETL
    task_extract = EmptyOperator(task_id="run_extraction_task")
    task_transform = EmptyOperator(task_id="run_transformation_task")

    # Path B: Skip
    task_skip = EmptyOperator(task_id="skip_pipeline_task")

    # Connect dependencies
    task_branch >> [task_extract, task_skip]
    task_extract >> task_transform
```

## 2. Trigger Rules
By default, downstream tasks only execute if all parent tasks succeed (`all_success`). Airflow provides **Trigger Rules** to modify this behavior (e.g. running cleanup tasks even if parent tasks fail).

| Trigger Rule | Execution Condition | Common Use Case |
| :--- | :--- | :--- |
| **`all_success`** (Default) | All parent tasks completed successfully. | Standard ETL steps. |
| **`all_done`** | All parent tasks completed, regardless of status (success/failed/skipped). | Cleanup tasks (e.g. turning off server, closing files). |
| **`one_failed`** | At least one parent task failed. | Triggering immediate pager alerts. |
| **`one_success`** | At least one parent task succeeded. | Alternate source routing. |
| **`none_failed_min_one_success`** | All parents completed without failure, and at least one succeeded. | Branching joins. |

```python
# Task running regardless of parent success status (for cleanup)
cleanup_temp_files = EmptyOperator(
    task_id="cleanup_temp_files",
    trigger_rule="all_done",
    dag=dag
)
```

---

# Authoring DAGs & Dependency Management

```python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator

# Default arguments applied to all tasks in this DAG
default_args = {
    "owner": "data_team",
    "depends_on_past": False,
    "email_on_failure": True,
    "email": ["alerts@company.com"],
    "retries": 2,
    "retry_delay": timedelta(minutes=5),
}

def print_hello():
    print("Beginning the daily ETL process...")

# Define the DAG context
with DAG(
    dag_id="daily_system_etl",
    default_args=default_args,
    description="Inbound logs extraction and cleanup",
    schedule_interval="@daily",  # Every day at midnight
    start_date=datetime(2026, 7, 1),
    catchup=False,  # If True, Airflow runs missing runs since start_date
) as dag:

    # Task 1: Python Task
    task_hello = PythonOperator(
        task_id="log_start",
        python_callable=print_hello
    )

    # Task 2: Bash Task
    task_extract = BashOperator(
        task_id="extract_raw_logs",
        bash_command="curl -s http://api.metrics.com/logs > /tmp/raw_logs.json"
    )

    # Task 3: Another Bash Task
    task_verify = BashOperator(
        task_id="verify_s3_upload",
        bash_command="echo 'Upload verified!'"
    )

    # Setting task execution order using bitshift operators
    task_hello >> task_extract >> task_verify
```

---

# Modern Airflow: The TaskFlow API

Airflow 2.0 introduced the **TaskFlow API**. Instead of writing verbose Operator configurations and manually using XComs, you can use the `@dag` and `@task` decorators. Airflow automatically serializes outputs and inputs between tasks.

```python
from airflow.decorators import dag, task
from datetime import datetime

@dag(
    start_date=datetime(2026, 7, 1),
    schedule="@daily",
    catchup=False,
    tags=["sales"]
)
def simple_sales_pipeline():

    @task
    def extract_revenue():
        # Returns a dict. Airflow saves this output to XComs
        return {"store_a": 12000, "store_b": 18000}

    @task
    def calculate_total(revenues: dict) -> int:
        # Airflow automatically resolves XCom dependencies and passes it here
        total = sum(revenues.values())
        print(f"Aggregated Sales Total: ${total}")
        return total

    @task
    def load_total(total_revenue: int):
        print(f"Saving total sales (${total_revenue}) to target warehouse.")

    # Setting up dependencies by passing task outputs directly
    raw_rev = extract_revenue()
    total = calculate_total(raw_rev)
    load_total(total)

# Instantiate DAG
dag_instance = simple_sales_pipeline()
```

---

# Scheduling, Logical Date, & Idempotency

## 1. Logical Date (execution_date)
In Airflow, the Logical Date represents the start of the time interval being processed, **not** the current calendar time.
For a daily DAG scheduled for `@daily` on `2026-07-06`, the execution run triggers at `2026-07-07 00:00:00`, passing `2026-07-06` as the logical date template.
This ensures you are processing data for the interval that just closed.

## 2. Designing Idempotent Pipelines
An **idempotent** task produces the same result no matter how many times you run it with the same parameters.
If a task appends transactions to a database table without deduplication, running a failed pipeline again will insert duplicate records.

### Idempotency Best Practices:
1. **Use UPSERTs or Write-Replace patterns:** Instead of using simple `INSERT` statements, use `INSERT ON CONFLICT DO UPDATE` or overwrite target paths using partition paths (e.g. `/year=2026/month=07/day=06/`).
2. **Utilize Logical Dates in Queries:** Use Airflow's built-in date templates to filter data, avoiding queries that pull relative dates like `CURRENT_DATE`.

```python
# Idempotent database write pattern inside a task
@task
def load_data_to_postgres(ds=None):  # 'ds' is Airflow's execution date string (YYYY-MM-DD)
    query = f"""
        DELETE FROM daily_metrics WHERE run_date = '{ds}';
        INSERT INTO daily_metrics (run_date, metric_value) 
        SELECT '{ds}', SUM(amount) FROM raw_transactions WHERE tx_date = '{ds}';
    """
    print(f"Executing idempotent query for partition: {ds}")
```

---

# Managing Connections & Variables

Do **not** hardcode database passwords or AWS secret keys inside your DAG files.
Instead, manage secrets using Airflow's built-in **Connections** and **Variables** UI.

```python
from airflow.models import Variable
from airflow.providers.postgres.hooks.postgres import PostgresHook

@task
def extract_from_db():
    # Retrieve non-sensitive global variable
    source_table = Variable.get("my_source_table", default_var="transactions")
    
    # Retrieve sensitive connection details using a Hook
    pg_hook = PostgresHook(postgres_conn_id="my_production_postgres")
    connection = pg_hook.get_conn()
    
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM {source_table} LIMIT 10;")
    records = cursor.fetchall()
    return records
```

---

# Exercises & Quiz

### Question 1
Which Airflow Executor spins up individual Kubernetes pods on-the-fly to execute each task?
- A) Local Executor.
- B) Celery Executor.
- C) Sequential Executor.
- D) Kubernetes Executor.

*Answer:* **D**. The Kubernetes Executor creates dynamic pods for each task instance, ensuring isolated environment dependencies and resource scaling.

### Question 2
Under which Trigger Rule will a downstream task execute if at least one of its parent tasks fails?
- A) `all_success`
- B) `all_done`
- C) `one_failed`
- D) `none_failed`

*Answer:* **C**. The `one_failed` rule is used to trigger error-handling or alert workflows when a parent task fails.

---

# Chapter Summary Checklist
- Can you describe the scaling differences between Celery and Kubernetes Executors?
- How do you construct a dynamic pipeline using `BranchPythonOperator`?
- When would you change a task's Trigger Rule from `all_success` to `all_done`?
- How do you secure database passwords using Airflow's metadata connections database?
