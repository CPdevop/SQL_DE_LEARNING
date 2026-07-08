# Chapter 1: Python Basics & Core Data Structures

> **Part:** Python for Data Engineering
>
> **Chapter:** 1
>
> **Difficulty:** 🟢 Beginner
>
> **Estimated Reading Time:** 35–45 minutes
>
> **Prerequisites:** None
>
> **Target Audience:** Data Engineers, Data Analysts, ETL Developers, Software Engineers transitioners
>
> **Version:** 2.0
>
> **Last Updated:** 2026-07-06

---

# Learning Objectives

After completing this chapter, you will be able to:
- Explain Python's memory model, particularly the concept of **mutability vs. immutability**.
- Differentiate between **shallow copy** and **deep copy**, and recognize when to use each in data processing workflows.
- Compare memory allocations of lists vs. tuples using `sys.getsizeof` and choose the optimal one for high-volume storage.
- Optimize logging and path construction by benchmarking different string interpolation methods (f-strings, `.format()`, and `%`).
- Implement specialized data structures from the `collections` module (`defaultdict`, `Counter`, `namedtuple`) to write clean and memory-efficient ETL parsers.
- Clean malformed CSV fields using advanced list, set, and dictionary operations.

---

# Quick Revision

- **Primitive Types:** `int`, `float`, `bool`, `str`, `NoneType` (via `None`).
- **Mutable Objects:** Objects whose state/content can be modified in place (e.g., `list`, `dict`, `set`).
- **Immutable Objects:** Objects whose state cannot be changed after creation (e.g., `int`, `float`, `bool`, `str`, `tuple`). Modifying them creates a new object.
- **Lists (`list`):** Ordered, mutable, indexed sequences. Best for ordered batches.
- **Tuples (`tuple`):** Ordered, immutable, indexed sequences. More memory-efficient than lists. Ideal for database rows.
- **Dictionaries (`dict`):** Key-value maps. Fast lookup ($O(1)$). Standard for JSON-like configs and records.
- **Sets (`set`):** Unordered, mutable collections of unique, hashable items. Perfect for deduplication.
- **Shallow Copy (`copy()`):** Copies the outer collection container, referencing the same internal objects.
- **Deep Copy (`copy.deepcopy()`):** Recursively copies the entire structure, creating entirely new objects at all nesting levels.
- **`collections` Module:** Core extension module containing specialized containers such as `defaultdict` (automatic fallback values), `Counter` (item frequency maps), and `namedtuple` (tuples with named attributes).

---

# Mutability vs. Immutability & Memory Footprint

Understanding mutability is crucial in Data Engineering, especially when processing records in parallel where side-effects can corrupt data.

In Python, every value is an **object**. An object has:
1. An **Identity** (its memory address, checked via `id(obj)`).
2. A **Type** (checked via `type(obj)`).
3. A **Value**.

### Immutable Types

Once created, an immutable object's value cannot change. If you try to modify it, Python creates a new object in memory.

```python
# Modifying a string creates a new string object
x = "data"
print(id(x))  # Example address: 140228392182064

x += "_engineering"
print(id(x))  # Example address: 140228392185712 (Different memory address!)
```

Common immutable types:
- `int`, `float`, `complex`
- `str`
- `tuple`
- `bool`
- `bytes`
- `frozenset`

### Mutable Types

Mutable objects can be modified in place. Their identity (`id`) remains unchanged.

```python
# Modifying a list alters it in place
batch = ["sales_202601.csv", "sales_202602.csv"]
print(id(batch))  # Example address: 140228392110208

batch.append("sales_202603.csv")
print(id(batch))  # Example address: 140228392110208 (Same memory address!)
```

Common mutable types:
- `list`
- `dict`
- `set`
- `bytearray`

> [!WARNING]
> Passing mutable objects (like lists or dictionaries) as default arguments in functions is a major anti-pattern. Because default arguments are evaluated once when the function is defined, modifications to the default argument persist across multiple function calls.

---

# Lists vs. Tuples: A Deep Dive into Memory and Speed

Data pipelines often store millions of temporary rows in memory before loading them to a warehouse. Understanding the structural differences between `list` and `tuple` can save gigabytes of RAM.

### 1. Memory Overhead Comparison
Lists are designed to be dynamic. To avoid resizing memory continuously when items are appended, Python overallocates memory space for lists (over-allocation). Tuples, being immutable, are allocated with the exact amount of memory needed.

```python
import sys

# Create a list and tuple with identical elements
my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
my_tuple = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

print(f"List memory size: {sys.getsizeof(my_list)} bytes")   # Output: ~136 bytes
print(f"Tuple memory size: {sys.getsizeof(my_tuple)} bytes") # Output: ~120 bytes
```

When storing $10,000,000$ database rows, this memory overhead can degrade performance and lead to host machine swapping.

### 2. Allocation Speed
Because tuples are immutable, they are allocated in a single, static block of memory. Furthermore, Python implements an internal optimization called **recycling/caching** for small tuples: when a tuple is deleted, its memory block is kept and reused for the next tuple instantiation, bypassing calls to the system allocator.

---

# String Formatting & Performance for Log Pipelines

Logs are critical for troubleshooting failed ETL pipelines. In high-throughput streaming systems, formatting strings inside hot paths can introduce significant overhead. Let's compare the three formatting protocols:

```python
# 1. C-style formatting (Legacy)
c_style = "%s processed %d records" % ("Job_A", 1000)

# 2. str.format() (Standard)
str_format = "{} processed {} records".format("Job_A", 1000)

# 3. f-Strings (Modern, Python 3.6+)
job, count = "Job_A", 1000
f_string = f"{job} processed {count} records"
```

### Performance Benchmarks
f-strings are evaluated at runtime as a series of bytecode instructions rather than parsing a format string template. This makes them significantly faster:

| Formatting Method | Relative Execution Time | Recommendation |
| :--- | :--- | :--- |
| **f-strings** | $1.0\times$ (Fastest) | Use for all inline variables and logging. |
| **`str.format()`** | $1.3\times - 1.5\times$ slower | Use only when templates are loaded dynamically from files. |
| **`%` Formatting** | $1.2\times - 1.4\times$ slower | Avoid in modern codebases. |

---

# Primitive Data Types & Methods

## 1. Strings (`str`)
Strings are sequences of Unicode characters. They are immutable.

### Essential Methods for Data Wrangling:
- `strip()`: Removes leading/trailing whitespace. Essential for cleaning raw CSV inputs.
- `split(sep)`: Tokenizes a string into a list based on a delimiter.
- `join(iterable)`: Joins elements of an iterable into a single string.
- `replace(old, new)`: Replaces occurrences of a substring.
- `startswith(prefix)` / `endswith(suffix)`: Used to filter file formats or check patterns.
- `lower()` / `upper()`: Normalizes casings (e.g., matching email addresses).

```python
# Cleaning raw column names
raw_col = "  Transaction_ID  \n"
clean_col = raw_col.strip().lower()
print(clean_col)  # "transaction_id"

# Extracting file extension
filename = "s3://my-bucket/lake/users_active.parquet"
if filename.endswith(".parquet"):
    print("Process with PySpark Parquet Reader")

# Reconstructing CSV lines
record = ["101", "John Doe", "Engineer"]
csv_line = ",".join(record)
print(csv_line)  # "101,John Doe,Engineer"
```

## 2. Numbers (`int`, `float`)
Data engineering handles numeric transformations, metrics calculation, and indices.
- Division (`/`) always returns a `float` in Python 3.
- Floor division (`//`) returns an integer (rounded down).
- Modulo (`%`) returns the remainder, useful for chunking or batching indexes.

```python
chunk_size = 1000
total_records = 5300
batches_needed = (total_records + chunk_size - 1) // chunk_size  # Ceil division
print(batches_needed)  # 6
```

## 3. NoneType (`None`)
`None` is the equivalent of database `NULL` or missing/empty values.
- Checking for `None` should always use identity comparison `is` or `is not`, rather than equality operators (`==`).

```python
db_response = None
if db_response is None:
    print("No active records found. Retrying database connection...")
```

---

# Collection Data Types

## 1. Lists (`list`)
Lists are ordered, mutable, and allow duplicate elements.

### Performance Profile:
- **Append / Pop from end:** $O(1)$
- **Insert / Remove / Pop from front/middle:** $O(n)$
- **Search (in):** $O(n)$
- **Access by index:** $O(1)$

### Core Methods:
- `append(item)`: Adds an item to the end.
- `extend(iterable)`: Appends elements from another iterable (concatenation).
- `insert(index, item)`: Inserts item at index.
- `remove(value)`: Removes the first occurrence of `value`.
- `pop([index])`: Removes and returns the item at the given index (default is the last).
- `sort(key=..., reverse=...)`: Sorts the list in place.
- `reverse()`: Reverses the elements in place.

```python
# Batch accumulation
batch_records = []
batch_records.append({"id": 1, "status": "PENDING"})
batch_records.extend([{"id": 2, "status": "SUCCESS"}, {"id": 3, "status": "FAIL"}])

# Slicing syntax: list[start:stop:step]
# Get the first two records
print(batch_records[:2])
# Reverse list
reversed_batch = batch_records[::-1]
```

## 2. Tuples (`tuple`)
Tuples are ordered, immutable sequences.

### Why Tuples in Data Engineering?
1. **Safety:** They prevent accidental write-over in multi-threaded workflows.
2. **Hashability:** If a tuple contains only immutable elements, it is hashable. This means it can be used as a key in a dictionary or added to a set (unlike lists).
3. **Database Mapping:** Commonly represent structured database records returned by database cursors (e.g., `psycopg2`).

```python
# Unpacking query results
row = (4092, "USD", 1250.75, "2026-07-06")
tx_id, currency, amount, date = row
print(f"Transaction {tx_id} processed: {amount} {currency}")

# Tuples as composite dictionary keys (e.g., grouping by composite key)
grouped_data = {}
grouped_data[("North America", "SaaS")] = 98000.00
grouped_data[("Europe", "SaaS")] = 43000.00
```

## 3. Dictionaries (`dict`)
Dictionaries are collections of key-value pairs. From Python 3.7+, they maintain insertion order.

### Performance Profile:
- **Lookup / Insertion / Deletion:** Average $O(1)$ (constant time).

### Core Methods:
- `keys()`: Returns a view of dict keys.
- `values()`: Returns a view of dict values.
- `items()`: Returns a view of `(key, value)` tuples.
- `get(key, default)`: Safely fetches a value. If the key is missing, returns the `default` instead of raising a `KeyError`.
- `setdefault(key, default)`: Returns key's value if present. If not, inserts the key with the `default` value. Very useful for grouping.
- `update(other_dict)`: Merges another dictionary in place (overwriting matching keys).
- `pop(key[, default])`: Removes the key and returns its value.

```python
# Handling missing data columns safely
record = {"user_id": 9821, "signup_channel": None}

# Safely access sign-up channel with fallback
channel = record.get("signup_channel", "Organic") or "Organic"
# Safely access non-existent key
tier = record.get("subscription_tier", "Free")

# Grouping list of records using setdefault
records = [
    {"region": "US", "amount": 100},
    {"region": "EU", "amount": 200},
    {"region": "US", "amount": 150},
]
regional_totals = {}
for r in records:
    regional_totals.setdefault(r["region"], []).append(r["amount"])
print(regional_totals)  # {'US': [100, 150], 'EU': [200]}
```

## 4. Sets (`set`)
Sets are unordered, mutable collections of unique, hashable elements.

### Performance Profile:
- **Lookup (in) / Addition / Removal:** Average $O(1)$.

### Core Methods & Operators:
- `add(item)`: Adds an element.
- `remove(item)`: Removes item; raises `KeyError` if not found.
- `discard(item)`: Removes item; does NOT raise an error if missing.
- `union(other)` or `|`: Combines unique items from both sets.
- `intersection(other)` or `&`: Returns common items.
- `difference(other)` or `-`: Returns elements in this set but not the other.
- `symmetric_difference(other)` or `^`: Returns items in either set, but not both.

```python
# De-duplicating ID columns
raw_user_ids = [101, 102, 101, 103, 102, 104]
unique_users = set(raw_user_ids)
print(unique_users)  # {101, 102, 103, 104}

# Schema validation: checking if extra columns are present
expected_schema = {"id", "name", "email", "created_at"}
actual_schema = {"id", "name", "email", "ip_address", "session_id"}

extra_columns = actual_schema - expected_schema
missing_columns = expected_schema - actual_schema
print(f"Extra cols: {extra_columns}")      # {'ip_address', 'session_id'}
print(f"Missing cols: {missing_columns}")  # {'created_at'}
```

---

# The Collections Module: Advanced Structures

Python's standard `collections` module provides container alternatives with improved performance and design patterns.

### 1. `defaultdict`
A `defaultdict` behaves like a standard dictionary but calls a factory function to provide default values when accessing non-existent keys, eliminating manual `if key not in dict` checks.

```python
from collections import defaultdict

# Setup defaultdict with list factory
user_events = defaultdict(list)

# Safely append without checking if user_id exists
user_events[101].append("login")
user_events[101].append("click_ad")
user_events[102].append("login")

print(dict(user_events))  # {101: ['login', 'click_ad'], 102: ['login']}
```

### 2. `Counter`
A `Counter` is a dictionary subclass designed to count hashable objects. It maps items to their occurrence count.

```python
from collections import Counter

log_statuses = ["SUCCESS", "SUCCESS", "FAIL", "SUCCESS", "FAIL", "WARN"]
status_counts = Counter(log_statuses)

print(status_counts)               # Counter({'SUCCESS': 3, 'FAIL': 2, 'WARN': 1})
print(status_counts.most_common(1)) # [('SUCCESS', 3)]
```

### 3. `namedtuple`
`namedtuple` returns a subclass of tuple that allows accessing elements by field name (e.g. `row.user_id`) in addition to indices, serving as an immutable, lightweight record template.

```python
from collections import namedtuple

# Define Row schema
UserRow = namedtuple("UserRow", ["user_id", "email", "country"])

# Instantiate row
row = UserRow(user_id=402, email="user@domain.com", country="CA")

print(row.user_id)  # Access by field name (402)
print(row[1])       # Access by index ("user@domain.com")
```

---

# Memory Management: Shallow Copy vs. Deep Copy

Because variable names in Python are references (labels pointing to memory addresses), copying mutable objects requires care.

```python
# Reference assignment (not a copy!)
list_a = [1, 2, [3, 4]]
list_b = list_a  # Both variables point to the exact same list object in memory
list_b[0] = 99
print(list_a)    # [99, 2, [3, 4]] - Original list was modified!
```

### Shallow Copy

A shallow copy creates a new container object, but populates it with *references* to the original nested objects.
Methods to shallow copy: `list.copy()`, `dict.copy()`, `copy.copy(x)`.

```python
import copy

list_a = [1, 2, [3, 4]]
list_shallow = copy.copy(list_a)

# Modify top-level item (integer is immutable)
list_shallow[0] = 99
print(list_a)        # [1, 2, [3, 4]] - Original outer container is unchanged.

# Modify nested mutable item
list_shallow[2][0] = 999
print(list_a)        # [1, 2, [999, 4]] - Original nested list changed!
```

### Deep Copy

A deep copy recursively duplicates the outer container *and* all nested mutable elements, allocating new memory spaces.
Method: `copy.deepcopy(x)`.

```python
import copy

list_a = [1, 2, [3, 4]]
list_deep = copy.deepcopy(list_a)

list_deep[2][0] = 999
print(list_a)     # [1, 2, [3, 4]] - Original is completely untouched!
```

> [!IMPORTANT]
> When mutating config parameters or database schemas represented as nested dicts (e.g. `{ "db": { "host": "localhost", "port": 5432 } }`), always use a `deepcopy` if you need to create a template copy for modification, avoiding leakage back into global parameters.

---

# Enterprise Ingestion Parser Example

Let's combine these concepts into a practical data engineering script: parsing raw CSV text rows, cleaning formatting anomalies, and aggregating log events.

```python
from collections import defaultdict, namedtuple
import csv

# Raw CSV content simulate
raw_csv_data = """id,username,active_status
101,  alice_dev ,true
102, bob_qa,false
103, charlie_prod,  TRUE
104,  david_eng,
"""

# Schema mapping
CleanRecord = namedtuple("CleanRecord", ["id", "username", "is_active"])

def parse_and_clean_csv(raw_text):
    clean_records = []
    lines = raw_text.strip().split("\n")
    reader = csv.reader(lines)
    
    # Skip Header
    header = next(reader)
    
    for row in reader:
        # Prevent index out of bounds on empty lines
        if not row or len(row) < 3:
            continue
            
        # Parse fields
        raw_id, raw_name, raw_active = row
        
        # Clean formatting
        record_id = int(raw_id.strip())
        username = raw_name.strip().lower()
        
        # Normalize boolean fields
        active_clean = raw_active.strip().upper()
        is_active = active_clean == "TRUE"
        
        # Add to collection
        clean_records.append(CleanRecord(record_id, username, is_active))
        
    return clean_records

parsed_data = parse_and_clean_csv(raw_csv_data)
for record in parsed_data:
    print(f"Record {record.id}: name={record.username}, active={record.is_active}")
```

---

# Exercises & Quiz

### Question 1
What is the output of the following code snippet?
```python
x = (1, 2, [3, 4])
x[2].append(5)
print(x)
```
- A) Raises a `TypeError` because tuples are immutable.
- B) `(1, 2, [3, 4])`
- C) `(1, 2, [3, 4, 5])`
- D) `(1, 2, 5)`

*Answer:* **C**. Although the tuple is immutable (its container structure cannot point to different objects), the object at index `2` is a mutable `list`. The list itself can be altered in-place.

### Question 2
You are building an ETL script that loads a nested configuration dictionary. If you want to modify settings for a test database instance without altering the production database config template, which copy method should you use?
- A) Direct assignment (`test_cfg = prod_cfg`)
- B) Shallow copy (`test_cfg = prod_cfg.copy()`)
- C) Deep copy (`import copy; test_cfg = copy.deepcopy(prod_cfg)`)
- D) String conversion (`test_cfg = str(prod_cfg)`)

*Answer:* **C**. Direct assignment and shallow copy would propagate nested dictionary mutations back to `prod_cfg`.

---

# Chapter Summary Checklist
- Can you explain why tuples have lower memory overhead than lists in Python?
- Why do f-strings execute faster than calling `.format()`?
- How does `defaultdict` simplify writing metrics trackers?
- What are the risks of using a shallow copy on nested dictionary settings?
