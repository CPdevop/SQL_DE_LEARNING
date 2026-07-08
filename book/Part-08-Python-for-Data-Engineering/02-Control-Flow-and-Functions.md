# Chapter 2: Control Flow, Comprehensions & Functions

> **Part:** Python for Data Engineering
>
> **Chapter:** 2
>
> **Difficulty:** 🟢 Beginner
>
> **Estimated Reading Time:** 40–50 minutes
>
> **Prerequisites:** Chapter 1 (Python Basics & Core Data Structures)
>
> **Target Audience:** Data Engineers, Data Analysts, ETL Developers
>
> **Version:** 2.0
>
> **Last Updated:** 2026-07-06

---

# Learning Objectives

After completing this chapter, you will be able to:
- Design robust control flow logic using conditional branching and short-circuit evaluation.
- Implement the **Iterator Protocol** (`__iter__`, `__next__`) and design memory-safe custom generator stream parsers.
- Apply high-performance grouping, slicing, and chaining operations using the **`itertools`** standard library.
- Optimize configurations and arguments using functional modules **`functools`** (`@lru_cache` and `partial`).
- Structure robust exception hierarchies using try-except-else-finally and implement **exception chaining** (`raise ... from`).
- Trace variable scopes using the LEGB rules.

---

# Quick Revision

- **Short-Circuit Evaluation:** Operators `and` and `or` evaluate conditions lazily. If the first operand determines the outcome, the second is not evaluated.
- **`enumerate(iterable)`:** Yields pairs of `(index, item)`. Great for row counting during parsing.
- **`zip(*iterables)`:** Aggregates elements from multiple iterables element-wise.
- **Comprehensions:** Lightweight, inline loops creating new lists, dicts, or sets.
- **Iterator Protocol:** The standard Python system that allows objects to be looped over using the `__iter__` and `__next__` methods.
- **`itertools` module:** Built-in functions for high-speed memory-efficient loop processing (e.g. `chain`, `groupby`, `islice`).
- **`functools` module:** Utility functions for caching (`@lru_cache`), argument pre-allocation (`partial`), and data aggregation (`reduce`).
- **Exception Chaining (`raise ... from`):** Links a new exception to a caught exception, preserving the diagnostic stack trace.

---

# Conditional Branching & Logic

Data pipelines route data depending on schemas, states, or dates. Python uses `if`, `elif`, and `else`.

### Short-Circuit Evaluation

In logical expressions, evaluation stops as soon as the result is determined. This is highly useful for checking nulls before validating attributes.

```python
# Without short-circuit, this would raise an error if record is None
record = None

if record is not None and record.get("status") == "SUCCESS":
    print("Process records")
else:
    print("Invalid or missing record")
```
If `record is not None` evaluates to `False`, Python immediately skips evaluating `record.get("status")`, preventing a `AttributeError`.

---

# Loops & Iteration Patterns

## 1. `for` Loops
`for` loops are used to iterate over items of any sequence (like a list, tuple, dictionary, or string).

### Useful Iteration Helpers:
- `enumerate(iterable, start=0)`: Tracking index while processing rows.
- `zip(*iterables)`: Combining parallel lists (e.g. matching headers to values).

```python
# Matching CSV headers to database values
headers = ["id", "name", "revenue"]
row_values = [4012, "Acme Corp", 850000.00]

# Generating a key-value mapping on the fly
record = {}
for header, val in zip(headers, row_values):
    record[header] = val
print(record)  # {'id': 4012, 'name': 'Acme Corp', 'revenue': 850000.0}

# Tracking line numbers in raw log files
raw_logs = ["WARN: DB connection slow", "ERROR: Write failed", "INFO: Job finished"]
for line_no, log in enumerate(raw_logs, start=1):
    if "ERROR" in log:
        print(f"Alert raised at line {line_no}: {log}")
```

## 2. Loop Control: `break`, `continue`, `pass`, and `else`
- `break`: Terminates the current loop immediately.
- `continue`: Skips the rest of the current iteration and jumps to the next loop pass.
- `pass`: A null operation; used as a structural placeholder.
- **`else` Block on Loops:** Executes ONLY if the loop completes naturally without hitting a `break` statement.

```python
# Searching for a specific partition file in a directory list
available_files = ["part-0.parquet", "part-1.parquet", "_SUCCESS", "part-2.parquet"]

for file in available_files:
    if file == "_SUCCESS":
        print("Success marker found!")
        break
else:
    # This runs only if the loop finishes WITHOUT hitting break
    print("Warning: _SUCCESS marker is missing in directory.")
```

---

# Custom Iterators & Generators

In Data Engineering, reading an entire 10GB file into memory before processing is impossible. We use **Iterators** and **Generators** to stream datasets item-by-item.

### 1. The Iterator Protocol
To make an object iterable, its class must implement two methods:
1. `__iter__()`: Returns the iterator object itself.
2. `__next__()`: Returns the next value from the container. If no elements are left, it raises a `StopIteration` exception.

Let's implement a custom memory-safe stream simulator:

```python
class RecordStreamSimulator:
    def __init__(self, limit):
        self.limit = limit
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.limit:
            raise StopIteration
        self.current += 1
        return {"id": self.current, "event": "stream_click"}

# Consuming the stream simulator
stream = RecordStreamSimulator(3)
for record in stream:
    print(record)
```

### 2. Generators & Yield
Writing classes implementing the protocol is verbose. Python provides **Generators**—functions that use the **`yield`** statement to yield values one-by-one. The function halts its execution state, returning control to the loop, and resumes where it left off on the next iteration.

```python
def log_stream_generator(file_path):
    with open(file_path, "r") as file:
        for line in file:
            # Yield lines one-by-one without loading the whole file into RAM
            if "ERROR" in line:
                yield line.strip()
```

---

# Functional Python: `itertools` & `functools`

Writing raw nested loops inside ETL tasks can be slow and bug-prone. Python's standard library offers robust utilities.

## 1. High-Performance Iteration with `itertools`

- **`itertools.chain(*iterables)`:** Chains multiple sequences together, avoiding list concatenations.
- **`itertools.islice(iterable, start, stop)`:** Slices streams without loading them into memory (perfect for API pagination).
- **`itertools.groupby(iterable, keykey)`:** Groups adjacent items that share the same key. **Note:** The input dataset *must* be sorted by the grouping key first.

```python
import itertools

# Chaining multiple files paths lists
log_paths_a = ["a.log", "b.log"]
log_paths_b = ["c.log", "d.log"]
for path in itertools.chain(log_paths_a, log_paths_b):
    print(f"Reading: {path}")

# Slicing the first 2 items of a continuous stream
huge_stream = range(1000000)
first_two = list(itertools.islice(huge_stream, 0, 2))
print(first_two)  # [0, 1]

# Grouping events (must be sorted by key)
events = [
    {"region": "EU", "val": 10},
    {"region": "EU", "val": 20},
    {"region": "US", "val": 15}
]
grouped = itertools.groupby(events, key=lambda x: x["region"])
for key, group in grouped:
    print(f"Region: {key}, Items: {list(group)}")
```

## 2. Functional Operations with `functools`

- **`@lru_cache(maxsize)`:** Caches the results of a function based on the arguments passed (Least Recently Used policy). Perfect for caching static DB connection strings or configuration lookups.
- **`functools.partial(func, *args, **kwargs)`:** Freezes a portion of a function's arguments, returning a new callable with fewer parameters.

```python
from functools import lru_cache, partial

# Caching slow config lookups
@lru_cache(maxsize=16)
def get_database_uri(environment):
    print(f"[CACHE MISS] Fetching config for environment: {environment}...")
    # Simulate API/SSM parameters call
    return f"postgresql://admin:secret@{environment}_host:5432/warehouse"

# First access triggers execute
print(get_database_uri("production"))
# Second access fetches from cache
print(get_database_uri("production"))

# Partial usage: standardizing logger settings
def send_log_alert(level, message):
    print(f"[{level.upper()} ALERT]: {message}")

# Create specialized logger functions
log_error = partial(send_log_alert, "ERROR")
log_warn = partial(send_log_alert, "WARNING")

log_error("Database connection lost!") # Evaluates as send_log_alert("ERROR", ...)
```

---

# Comprehensions and Memory-Efficient Generators

Comprehensions are compact syntax blocks used to build collections.

### List Comprehension
```python
# Extract and clean directory paths
raw_paths = ["  /lake/users/  ", " /lake/orders/ "]
cleaned_paths = [path.strip() for path in raw_paths]
```

### Dictionary & Set Comprehension
```python
# Convert configuration keys to lowercase
config = {"Host": "127.0.0.1", "Port": "5432"}
cleaned_config = {k.lower(): v for k, v in config.items()}
# {'host': '127.0.0.1', 'port': '5432'}

# Generate unique active status keys
statuses = ["active", "inactive", "active", "pending"]
unique_statuses = {s.upper() for s in statuses}
# {'ACTIVE', 'INACTIVE', 'PENDING'}
```

### Generator Expressions: Memory Efficiency in Action

If you are dealing with a large file containing millions of records, generating a list comprehension loads all records into RAM at once, causing Out-Of-Memory (OOM) exceptions.
Instead, use a **Generator Expression** (surrounded by `()`), which creates a generator object that yields records one at a time.

```python
# List Comprehension: Evaluates immediately, loads 10 million elements in memory
# memory_hog = [x * 2 for x in range(10000000)] # Consumes ~80MB RAM

# Generator Expression: Evaluates lazily, consumes almost zero memory upfront
lazy_generator = (x * 2 for x in range(10000000))

print(lazy_generator)  # <generator object <genexpr> at ...>
print(next(lazy_generator))  # 0
print(next(lazy_generator))  # 2
```

---

# Functions, Arguments, and Scopes

Functions are defined with the `def` keyword.

## 1. Parameters & Argument Passing
- **Default parameters:** Must follow non-default parameters.
- **Keyword-only parameters:** Defined after an asterisk `*` in the signature. Callers must pass them explicitly as keywords.
- **`*args`:** Packs surplus positional arguments into a tuple.
- **`**kwargs`:** Packs surplus keyword arguments into a dictionary.

```python
def configure_etl(job_name, *source_files, target_format="parquet", **options):
    print(f"Running ETL: {job_name}")
    print(f"Sources: {source_files}")
    print(f"Target format: {target_format}")
    print(f"Additional options: {options}")

configure_etl("Daily_Clean", "s3://b/file1.csv", "s3://b/file2.csv", target_format="orc", partition_by="date")
# Sources: ('s3://b/file1.csv', 's3://b/file2.csv')
# Additional options: {'partition_by': 'date'}
```

## 2. Variable Scope and the LEGB Rule
When accessing a variable inside a function, Python searches scopes in this specific order:
1. **L**ocal: Defined inside the current function.
2. **E**nclosing: Defined in outer nested/enclosing functions.
3. **G**lobal: Defined at the module level.
4. **B**uilt-in: Python's pre-loaded keywords (like `len`, `int`, etc.).

If Python cannot find the variable in any of these scopes, it throws a `NameError`.

```python
x = "global_var"

def outer():
    x = "enclosing_var"
    def inner():
        x = "local_var"
        print(x)  # Prints "local_var"
    inner()

outer()
```

---

# Robust Exception Handling & Chaining

An ETL pipeline must handle transient errors (network timeouts, disk full, syntax changes) gracefully.

### Complete try-except-else-finally Flow
- **`else`:** Executes only if no exceptions were raised in the `try` block.
- **`finally`:** Executes *always*, regardless of whether an exception occurred, ensuring cleanup operations run.

```python
def ingest_log_file(file_path):
    print("Initiating file ingestion...")
    file_handle = None
    try:
        file_handle = open(file_path, "r")
        # Ingestion logic
        records = [line.split(",") for line in file_handle]
    except FileNotFoundError as err:
        print(f"Error: File {file_path} not found.")
    except Exception as general_err:
        print(f"Unexpected processing error: {general_err}")
    else:
        print(f"Successfully processed {len(records)} log entries.")
    finally:
        if file_handle:
            file_handle.close()
            print("Closed file handle successfully.")
```

### Exception Chaining (`raise ... from`)
When catching a low-level error (like `ConnectionRefusedError`), you often want to raise a high-level domain error (like `DataPipelineExtractError`). If you do this directly, you risk losing the original stack trace.
**The Fix:** Use `raise NewException from OldException` to link them.

```python
class DatabaseConnectionError(Exception):
    """Custom exception class for pipeline databases failures."""
    pass

def query_database(query):
    try:
        # Simulate network failure
        import socket
        raise socket.timeout("Postgres socket connection timed out.")
    except socket.timeout as err:
        # Chain exceptions to preserve traceback diagnosis
        raise DatabaseConnectionError("Failed to extract analytics data.") from err

try:
    query_database("SELECT * FROM events;")
except DatabaseConnectionError as e:
    print(f"Captured: {e}")
    # The traceback will explicitly show: 
    # "The above exception was the direct cause of the following exception..."
```

---

# Exercises & Quiz

### Question 1
What is the sorting requirement for using `itertools.groupby()`?
- A) The input must be sorted alphabetically by keys.
- B) The input dataset must be sorted by the grouping key before calling `groupby()`, because it only aggregates adjacent matching keys.
- C) No sorting is required.
- D) Only numbers can be sorted.

*Answer:* **B**. `groupby()` checks contiguous keys. If the dataset is not sorted, duplicate group keys will appear multiple times in the output.

### Question 2
What does `raise NewException from err` accomplish?
- A) It deletes the error history.
- B) It automatically logs the exception to S3.
- C) It implements exception chaining, linking the new exception to the original caught exception so both stack traces are available for debugging.
- D) It prevents the program from raising exceptions.

*Answer:* **C**. Exception chaining maintains traceback histories across exception boundary wrappers.

---

# Chapter Summary Checklist
- Can you write a custom class implementing the Iterator Protocol?
- How does `itertools.chain` improve memory over list concatenations?
- When would you implement `@functools.lru_cache`?
- How do you construct custom exception wrappers using `raise ... from`?
