# Chapter 3: Object-Oriented Programming (OOP) in Data Engineering

> **Part:** Python for Data Engineering
>
> **Chapter:** 3
>
> **Difficulty:** 🟡 Intermediate
>
> **Estimated Reading Time:** 45–55 minutes
>
> **Prerequisites:** Chapter 1 & 2
>
> **Target Audience:** Data Engineers, ETL Architecture Developers
>
> **Version:** 2.0
>
> **Last Updated:** 2026-07-06

---

# Learning Objectives

After completing this chapter, you will be able to:
- Build class structures to wrap ETL steps and configuration parameters.
- Differentiate between and implement instance, class, and static methods.
- Apply inheritance, polymorphism, encapsulation, and abstraction to write clean, reusable extraction frameworks.
- Resolve multiple inheritance hierarchies using the **Method Resolution Order (MRO)** protocol and `super()`.
- Standardize record validation using **`dataclasses`**, enforcing immutability (`frozen=True`) and saving memory via **`__slots__`**.
- Implement design patterns in Data Engineering, specifically the **Singleton** pattern (connection pools) and the **Factory** pattern (dynamic DB clients).
- Construct context managers (`__enter__` / `__exit__`) to secure database connection sessions.

---

# Quick Revision

- **Class vs. Object:** A Class is a template/blueprint. An Object is an instance of that class containing state.
- **`self`:** Represents the specific instance of the class being operated on.
- **Method Resolution Order (MRO):** The linear search path Python uses to look up attributes and methods in multiple inheritance structures (checked via `Class.mro()`).
- **`dataclass`:** A class decorator that automatically generates standard methods like `__init__`, `__repr__`, and `__eq__`.
- **`__slots__`:** A list of strings defining allowed attributes, saving memory by preventing the creation of the default `__dict__` dictionary for class instances.
- **Singleton Pattern:** Restricts class instantiations to a single, global object instance.
- **Factory Pattern:** Exposes a unified interface to instantiate objects on-the-fly depending on parameters.

---

# Class Design & Method Categories

In data engineering, we use classes to package database clients, file readers, and ETL job metrics.

### Instance vs. Class vs. Static Methods
1. **Instance Method:** Modifies/reads an object's instance state. First parameter is `self`.
2. **Class Method (`@classmethod`):** Accesses/modifies class-level attributes, or serves as a constructor factory. First parameter is `cls`.
3. **Static Method (`@staticmethod`):** Utility functions that have no state access but logically belong inside the namespace of the class.

```python
import json

class DatabaseConnector:
    # Class Variable (shared across instances)
    default_port = 5432

    def __init__(self, host, username, password, port=None):
        # Instance Variables
        self.host = host
        self.username = username
        self.password = password
        self.port = port or DatabaseConnector.default_port
        self.connection_status = "DISCONNECTED"

    # Instance Method
    def connect(self):
        self.connection_status = "CONNECTED"
        print(f"Connected to {self.host}:{self.port} as {self.username}")

    # Class Method (Factory Constructor)
    @classmethod
    def from_json_config(cls, file_path):
        with open(file_path, "r") as f:
            cfg = json.load(f)
        # Returns a new instance using the class constructor
        return cls(host=cfg["host"], username=cfg["user"], password=cfg["pass"], port=cfg.get("port"))

    # Static Method (Helper)
    @staticmethod
    def is_valid_host(host):
        return isinstance(host, str) and len(host.split(".")) == 4
```

---

# Multiple Inheritance & Method Resolution Order (MRO)

Python supports multiple inheritance, allowing a class to inherit from multiple parent classes.

### The Diamond Problem & MRO
If a child inherits from parent classes `B` and `C`, which both inherit from a root class `A`, which method does the child run?
Python resolves this using the **C3 Linearization** algorithm to determine the Method Resolution Order (MRO).

```python
class BaseConnector:
    def connect(self):
        print("BaseConnector: Initializing connection...")

class PostgreSQLConnector(BaseConnector):
    def connect(self):
        print("PostgreSQLConnector: Connecting to DB...")
        super().connect()  # Calls next method in MRO chain

class AuditLogger:
    def connect(self):
        print("AuditLogger: Logging connection attempt...")
        # Since AuditLogger doesn't inherit from BaseConnector,
        # super() inside cooperative multiple inheritance looks up next in MRO

# Child class inheriting from multiple classes
class AuditedPostgresClient(PostgreSQLConnector, AuditLogger):
    pass

client = AuditedPostgresClient()
client.connect()

# View lookup order
print(AuditedPostgresClient.__mro__)
```
*Output order:*
1. `AuditedPostgresClient`
2. `PostgreSQLConnector`
3. `AuditLogger` (cooperative search resolves this next!)
4. `BaseConnector`
5. `object`

---

# Modern Data Structures: Dataclasses

Writing boilerplate code for data representation classes is tedious. Python's `@dataclass` decorator automates method generation.

### `@dataclass` Features:
- Implements `__init__`, `__repr__`, `__eq__` automatically.
- **`frozen=True`**: Enforces immutability, making records read-only and hashable (allowing insertion into sets or dict keys).
- **`__slots__`**: Restricts dynamic attribute creation. By default, every class instance holds a dictionary (`__dict__`) to store attributes. Using `__slots__` bypasses `__dict__`, reducing the object's memory overhead by up to 60%.

```python
from dataclasses import dataclass

# Dataclass with slots and frozen validation
@dataclass(frozen=True, slots=True)
class LogRecord:
    timestamp: str
    user_id: int
    event_type: str
    ip_address: str

# Instantiate record
record = LogRecord("2026-07-06 12:00:00", 9122, "LOGIN", "10.0.0.1")

# Attempting to modify attributes raises frozen exception:
# record.user_id = 9999  # FrozenInstanceError
```

---

# Design Patterns in Data Engineering

OOP allows us to structure common creational patterns to manage configuration and connections.

## 1. The Singleton Pattern
When connecting to a database, you should avoid instantiating duplicate client connections. The Singleton pattern guarantees that only one instance of the class exists.

```python
class DatabaseConnectionPool:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            print("Creating global database connection pool...")
            cls._instance = super(DatabaseConnectionPool, cls).__new__(cls)
        return cls._instance

    def __init__(self, size=10):
        # Prevent re-initializing instance variables if pool already exists
        if not hasattr(self, "initialized"):
            self.size = size
            self.initialized = True
            self.connections = ["conn_1", "conn_2"]
```

## 2. The Factory Pattern
In ingestion pipelines, you need to instantiate different extractor classes depending on the file format. The Factory pattern delegates the instantiation logic to a central creator function.

```python
class BaseReader:
    def read(self): raise NotImplementedError

class CSVReader(BaseReader):
    def read(self): return "Reading CSV file..."

class ParquetReader(BaseReader):
    def read(self): return "Reading Parquet file..."

# Ingestion Factory
class IngestionReaderFactory:
    @staticmethod
    def get_reader(file_format: str) -> BaseReader:
        formats = {
            "csv": CSVReader,
            "parquet": ParquetReader
        }
        reader_class = formats.get(file_format.lower())
        if not reader_class:
            raise ValueError(f"Unsupported ingestion format: {file_format}")
        return reader_class()

# Usage
reader = IngestionReaderFactory.get_reader("parquet")
print(reader.read())  # "Reading Parquet file..."
```

---

# The Four Pillars of OOP in Data Engineering

## 1. Inheritance
Inheritance allows a class to inherit attributes and methods from a parent class. This is perfect for setting up a generic base extractor class and writing database-specific subclasses.

```python
class BaseExtractor:
    def __init__(self, source_path):
        self.source_path = source_path
        print(f"Initialized extractor for: {self.source_path}")

    def log_progress(self, message):
        print(f"[EXTRACTOR LOG]: {message}")

# Child class inheriting from BaseExtractor
class S3Extractor(BaseExtractor):
    def download_file(self):
        self.log_progress("Connecting to AWS S3...")
        # Download logic here
        self.log_progress(f"File downloaded from S3 path: {self.source_path}")
```

## 2. Polymorphism
Polymorphism allows subclasses to define their own specific behaviors for a shared method interface. A controller script can iterate over multiple extractors and trigger them identically.

```python
class CSVReader:
    def parse(self):
        return "Parsing CSV lines into list of dicts..."

class ParquetReader:
    def parse(self):
        return "Reading Parquet columns into binary format..."

# Client code executing polymorphic calls
readers = [CSVReader(), ParquetReader()]
for reader in readers:
    # Polymorphism: calls parse() without needing to know the specific class type
    print(reader.parse())
```

## 3. Encapsulation
Encapsulation wraps data and methods in a single unit and restricts direct access to prevent state corruption.
- Single underscore `_`: Protected variable (by convention, do not access outside the class).
- Double underscore `__`: Private variable (enforces name mangling to prevent direct modification).
- Properties (`@property`): Used to control access and validate variables when reading or writing them.

```python
class APIClient:
    def __init__(self, endpoint, rate_limit):
        self.endpoint = endpoint
        self.__rate_limit = rate_limit  # Private attribute

    # Getter property
    @property
    def rate_limit(self):
        return self.__rate_limit

    # Setter property with validation logic
    @rate_limit.setter
    def rate_limit(self, value):
        if value <= 0:
            raise ValueError("Rate limit must be greater than zero requests/sec.")
        self.__rate_limit = value
```

## 4. Abstraction
Abstraction hides implementation details and exposes only essential features. Python uses the `abc` (Abstract Base Class) module. If a subclass fails to implement an abstract method, Python will raise a `TypeError` when you try to instantiate it.

```python
from abc import ABC, abstractmethod

class DataPipeline(ABC):
    @abstractmethod
    def extract(self):
        pass

    @abstractmethod
    def transform(self, data):
        pass

    @abstractmethod
    def load(self, data):
        pass

    # Concrete method (shared logic)
    def run_pipeline(self):
        raw_data = self.extract()
        clean_data = self.transform(raw_data)
        self.load(clean_data)

class DailyUserETL(DataPipeline):
    def extract(self):
        return ["Raw User Data"]
    
    def transform(self, data):
        return [item.lower() for item in data]
    
    def load(self, data):
        print(f"Loaded users to S3: {data}")
```

---

# Magic Methods & Context Managers

Magic methods are prefixed and suffixed with double underscores `__`. They customize core behaviors.

### Context Managers (`__enter__` & `__exit__`)
One of the most important concepts for a Data Engineer is managing resources. If an ETL job exits due to a database exception without closing its connections, the database server can exhaust its connection pool and crash.
Context managers guarantee cleanup, even if exceptions occur.

Let's write a safe custom Postgres cursor context manager:

```python
import psycopg2

class PostgresConnectionManager:
    def __init__(self, dsn):
        self.dsn = dsn
        self.connection = None

    def __enter__(self):
        # Setup resource
        print("Opening PostgreSQL database connection...")
        self.connection = psycopg2.connect(self.dsn)
        return self.connection.cursor()  # Yields the cursor to the with-statement

    def __exit__(self, exc_type, exc_val, exc_tb):
        # Teardown resource
        print("Closing PostgreSQL database connection...")
        if self.connection:
            if exc_type is not None:
                # An exception occurred, roll back any changes
                print(f"Exception encountered: {exc_val}. Rolling back transaction...")
                self.connection.rollback()
            else:
                # Success, commit transaction
                self.connection.commit()
            self.connection.close()
        
        # Return True to suppress exceptions (usually not recommended), False to propagate them
        return False
```
Usage:
```python
db_dsn = "dbname=lake user=admin password=secret host=localhost"

# The connection and cursor are automatically cleaned up even if queries crash
try:
    with PostgresConnectionManager(db_dsn) as cursor:
        cursor.execute("SELECT * FROM non_existent_table;")
        results = cursor.fetchall()
except Exception as e:
    print(f"Handled error: {e}")
```

---

# Exercises & Quiz

### Question 1
What does cooperative multiple inheritance look like in Python?
- A) Running loops inside thread pools.
- B) Ensuring that subclasses call `super()` inside overriding methods to yield control back to the MRO lookup chain.
- C) Making all class attributes public.
- D) Running Spark submit with Python 2 support.

*Answer:* **B**. Cooperative inheritance requires using `super()` so Python can search all inheriting classes in the linear MRO chain.

### Question 2
How does adding `__slots__` to a custom class optimize RAM usage?
- A) It compiles variables into native C floats.
- B) It changes mutable fields to immutable ones.
- C) It bypasses creating the default instance dictionary `__dict__`, reducing the memory overhead of class instances.
- D) It deletes object references when the script finishes.

*Answer:* **C**. Restricting properties to a predefined list using `__slots__` prevents the creation of the default instance dictionary `__dict__`, saving memory.

---

# Chapter Summary Checklist
- Can you determine the MRO flow order of a multiple inheritance structure?
- How do you construct an immutable dataclass schema?
- What is the difference between Singleton and Factory design patterns?
- Can you write a custom context manager class to handle files safely?
