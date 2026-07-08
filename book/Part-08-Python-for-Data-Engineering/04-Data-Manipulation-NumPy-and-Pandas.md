# Chapter 4: Data Wrangling with NumPy & Pandas

> **Part:** Python for Data Engineering
>
> **Chapter:** 4
>
> **Difficulty:** 🟡 Intermediate
>
> **Estimated Reading Time:** 50–65 minutes
>
> **Prerequisites:** Chapters 1–3
>
> **Target Audience:** Data Engineers, Data Analysts, Data Scientists
>
> **Version:** 2.0
>
> **Last Updated:** 2026-07-06

---

# Learning Objectives

After completing this chapter, you will be able to:
- Explain NumPy's memory model, vectorization, and apply **dimension broadcasting** rules.
- Reduce Pandas memory usage by up to 90% using **categorical type casting** and **numeric downcasting**.
- Process large CSV files without running out of RAM using **chunk-by-chunk processing** (`chunksize`).
- Read and write file formats commonly used in Data Lakes (Parquet, JSON, CSV) and databases.
- Navigate index levels, query data with boolean filters, and use `.loc` and `.iloc` safely.
- Perform database-equivalent joins, unions, and aggregations using `merge`, `concat`, and `groupby`.
- Clean and impute missing data safely, avoiding copying warnings (`SettingWithCopyWarning`).
- Manipulate timestamp fields in transactional datasets.

---

# Quick Revision

- **Vectorization:** Computing operations on entire arrays at compile-time (C-speed) rather than executing slow interpreter-level loops.
- **Broadcasting:** NumPy's ability to perform operations on arrays of different shapes during arithmetic.
- **Categorical Dtype:** Casts low-cardinality string columns to category mappings, saving memory by representing strings as integer IDs under the hood.
- **Downcasting:** Truncating large types (e.g. `float64`) to smaller, memory-efficient sizes (e.g. `float32`) if values fit.
- **`chunksize`:** Parameter in `read_csv` returning an iterator that loads the file in manageable batches, keeping memory usage constant.
- **Series:** A 1D labeled array.
- **DataFrame:** A 2D tabular structure containing columns of different types (effectively a dictionary of Series).
- **`loc` vs. `iloc`:** `loc` is label-based indexing; `iloc` is integer position-based indexing.
- **`SettingWithCopyWarning`:** A warning raised by Pandas when you attempt to modify a view instead of a direct copy of a DataFrame.

---

# NumPy Foundations & Broadcasting Rules

NumPy (`Numerical Python`) stores data in contiguous blocks of memory using homogeneous types.

### Vectorization vs. Loops
In raw Python, adding 1 to a list of a million numbers requires iterating over each element and fetching its object pointer. In NumPy, this is done in one C-level vectorized sweep.

```python
import numpy as np
import time

# Create a million numbers
size = 1000000
py_list = list(range(size))
np_arr = np.arange(size)

# Time raw python loop
t0 = time.time()
py_list_plus_one = [x + 1 for x in py_list]
print(f"Python loop time: {time.time() - t0:.5f}s")

# Time NumPy vectorized operation
t0 = time.time()
np_arr_plus_one = np_arr + 1  # Vectorized operation
print(f"NumPy vector time: {time.time() - t0:.5f}s")  # Usually 20-50x faster!
```

### Broadcasting Rules
Broadcasting allows mathematical operations on arrays of different dimensions. When operating on two arrays, NumPy compares their shapes element-wise, starting from the trailing dimensions. Two dimensions are compatible if:
1. They are **equal**, or
2. One of them is **1**.

```python
# Array A: Shape (3, 4)
# Array B: Shape (1, 4) -> Broadcasts along the first dimension to size 3
A = np.array([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
])
B = np.array([10, 20, 30, 40]) # Shape (4,) is implicitly treated as (1, 4)

# B is stretched to match A's dimension and added element-wise
result = A + B
print(result)
```

---

# Pandas Memory Optimization Techniques

Large transactional files can quickly exhaust memory on resource-constrained servers. We can reduce our memory footprint using three main techniques:

## 1. Downcasting Numeric Types
By default, Pandas imports integers as `int64` and floats as `float64`. If your values only range from 0 to 100, `int8` is sufficient and uses much less memory.

```python
import pandas as pd

# Downcast floats from float64 to float32
df = pd.DataFrame({"large_floats": [1.5, 2.7, 3.9] * 100000})
print(f"Original Memory: {df.memory_usage(deep=True).sum()} bytes")

df["large_floats"] = pd.to_numeric(df["large_floats"], downcast="float")
print(f"Optimized Memory: {df.memory_usage(deep=True).sum()} bytes") # Saves 50%!
```

## 2. Casting Low-Cardinality Strings to `category`
If a column with millions of rows only contains a few unique values (e.g. `status` or `country`), casting it to the `category` data type saves memory. Under the hood, Pandas maps each unique string to a small integer ID, storing the strings themselves only once.

```python
df_regions = pd.DataFrame({"region": ["North America", "Europe", "Asia"] * 100000})
print(f"Original String Memory: {df_regions.memory_usage(deep=True).sum()} bytes")

# Convert to category
df_regions["region"] = df_regions["region"].astype("category")
print(f"Optimized Category Memory: {df_regions.memory_usage(deep=True).sum()} bytes") # Saves >90%!
```

## 3. Chunk-by-Chunk File Processing
Instead of loading a massive 5GB CSV file into memory at once, use the `chunksize` parameter to process the file in smaller, manageable batches.

```python
# Process a large CSV file in chunks of 50,000 rows
chunk_size = 50000
total_revenue = 0

# read_csv returns an iterator when chunksize is provided
for chunk in pd.read_csv("giant_transactions.csv", chunksize=chunk_size):
    # Process the chunk in memory, then release it
    total_revenue += chunk["amount"].sum()
    
print(f"Calculated Total Revenue: {total_revenue}")
```

---

# Pandas Indexing & Querying

Pandas DataFrames align data using row index levels.

### 1. Index Structures & Multi-indexing
Indices allow faster label lookups. A `MultiIndex` groups rows hierarchically, representing dimensions.

```python
data = {
    "region": ["US", "US", "EU", "EU"],
    "product": ["SaaS", "Hardware", "SaaS", "Hardware"],
    "sales": [50000, 20000, 45000, 10000]
}
df_idx = pd.DataFrame(data)

# Set composite index (MultiIndex)
df_idx.set_index(["region", "product"], inplace=True)
print(df_idx)

# Retrieve specific group slice
print(df_idx.loc[("US", "SaaS")])
```

### 2. Selection and Filtering: `loc` vs. `iloc`

| Indexer | Syntax | Meaning |
| :--- | :--- | :--- |
| **`loc`** | `df.loc[row_labels, col_labels]` | Selects by **row and column labels**. |
| **`iloc`** | `df.iloc[row_offsets, col_offsets]` | Selects by **integer positions/offsets** (0-indexed). |

```python
data = {
    "user_id": [101, 102, 103],
    "region": ["US", "EU", "AP"],
    "spend": [150.50, 420.00, 75.25]
}
df = pd.DataFrame(data)
df.set_index("user_id", inplace=True)

# Select user 102's spend via loc (label lookup)
print(df.loc[102, "spend"])  # 420.0

# Select first row, second column via iloc (offset lookup)
print(df.iloc[0, 1])  # 150.5 (spend of first row)
```

---

# Data Aggregations, Joins & Unions

## 1. Group By & Aggregation (`groupby`)
Splits the table, applies function aggregations, and combines results.

```python
# Grouping sales by region and calculating multiple metrics
sales_data = {
    "store": ["NY", "LA", "NY", "CH", "LA"],
    "revenue": [500, 800, 300, 200, 900],
    "customers": [20, 35, 12, 8, 40]
}
df_sales = pd.DataFrame(sales_data)

summary = df_sales.groupby("store").agg(
    total_revenue=("revenue", "sum"),
    average_customers=("customers", "mean"),
    store_count=("store", "count")
)
print(summary)
```

## 2. Joins & Merges
Pandas supports database-style joins using `pd.merge()`:
- **Inner:** Keeps matches in both tables.
- **Left:** Keeps all rows from left table, matching rows from right.
- **Right:** Keeps all rows from right table, matching rows from left.
- **Outer:** Keeps all rows from both tables, filling mismatches with `NaN`.

```python
df_users = pd.DataFrame({"user_id": [1, 2, 3], "name": ["Alice", "Bob", "Charlie"]})
df_transactions = pd.DataFrame({"user_id": [1, 2, 1], "amount": [99.0, 45.0, 12.5]})

# Merge (equivalent to inner join)
df_merged = pd.merge(df_users, df_transactions, on="user_id", how="inner")
```

---

# Data Cleaning & Copy Warnings

### Avoiding `SettingWithCopyWarning`
This warning occurs when you chain selectors (e.g. `df[df['spend'] > 100]['spend'] = 0`). Chained indexing makes it ambiguous whether you are modifying a copy or the original data.
**The Fix:** Always use `.loc` or create an explicit copy using `.copy()`.

```python
# Safe correction
high_spenders = df.loc[df["spend"] > 100].copy()
high_spenders["tier"] = "Premium"
```

### Vectorized Mapping vs `apply()`
The `df.apply()` method runs custom functions row-by-row. However, it executes slowly because it runs at Python interpreter speed for every row.
**Performance Tip:** Use built-in vectorized functions (`str` methods, `np.select`, `map`) instead of `apply()` whenever possible.

```python
# Slow: using apply
# df['status'] = df['spend'].apply(lambda x: 'High' if x > 150 else 'Low')

# Fast: using numpy vectorized select
df["status"] = np.where(df["spend"] > 150, "High", "Low")
```

---

# Parsing Timestamps & Time Series Basics

Data pipelines rely on timestamps for windowing, sorting, and daily partitioning.

```python
data = {
    "event_time": ["2026-07-06 14:00:00", "2026-07-06 15:30:15", "2026-07-07 09:12:00"],
    "metric": [10, 15, 8]
}
df_ts = pd.DataFrame(data)

# Convert string object column to datetimes
df_ts["event_time"] = pd.to_datetime(df_ts["event_time"])

# Extract datetime properties
df_ts["day"] = df_ts["event_time"].dt.day
df_ts["hour"] = df_ts["event_time"].dt.hour
df_ts["day_name"] = df_ts["event_time"].dt.day_name()
```

---

# Exercises & Quiz

### Question 1
Under what conditions does NumPy allow broadcasting on two arrays?
- A) Both arrays must be equal in dimension lengths, or one of them must have a dimension of length 1.
- B) Only when both arrays are one-dimensional.
- C) Both arrays must contain only integers.
- D) It only works on single rows.

*Answer:* **A**. Dimensions are matched from right to left, and are compatible if they are equal or if one of them is 1.

### Question 2
When importing low-cardinality string columns (like `country` or `gender`) in Pandas, how can you reduce memory usage?
- A) Convert them to floats.
- B) Change them to tuples.
- C) Cast them to the `category` data type using `.astype('category')`.
- D) Split them into multiple tables.

*Answer:* **C**. Casting low-cardinality strings to categories maps values to integer IDs under the hood, significantly reducing memory usage.

---

# Chapter Summary Checklist
- Can you explain NumPy's dimension compatibility rules for broadcasting?
- How does casting columns to the `category` data type optimize RAM usage?
- How do you configure `pd.read_csv` to process large files in chunks?
- How do you resolve a `SettingWithCopyWarning` when writing attributes?
