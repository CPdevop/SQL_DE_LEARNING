# Chapter 1: What is SQL?

> **Part:** SQL Foundations
>
> **Chapter:** 1
>
> **Difficulty:** 🟢 Beginner
>
> **Estimated Reading Time:** 20–30 minutes
>
> **Prerequisites:** None
>
> **Target Audience:** Beginners, Data Analysts, ETL Developers, Data Engineers
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Learning Objectives

After completing this chapter, you will be able to:

- Define SQL.
- Explain why SQL was created.
- Understand why SQL is a declarative language.
- Differentiate SQL from programming languages.
- Understand SQL's role in modern Data Engineering.
- Explain why SQL remains one of the most valuable technical skills.

---

# Quick Revision

- SQL stands for **Structured Query Language**.
- SQL is used to communicate with relational databases.
- SQL is a **declarative** language.
- SQL describes **what** data is needed rather than **how** to retrieve it.
- SQL is the foundation of Analytics, Business Intelligence, Data Engineering, and Data Warehousing.

---

# Why Should You Learn SQL?

Every organization generates data.

Banks process transactions.

Hospitals maintain patient records.

E-commerce companies track orders.

Streaming platforms record watch history.

Social media platforms store billions of user interactions.

All of this information is stored somewhere.

SQL is the universal language used to work with that data.

Whether you become a Data Analyst, Data Scientist, Backend Developer, Database Administrator, Machine Learning Engineer, or Data Engineer, SQL is one of the most frequently used technical skills.

For a Data Engineer, SQL is not just another programming language—it is the primary tool used to move, clean, transform, validate, and model data.

---

# What is SQL?

SQL stands for **Structured Query Language**.

SQL is a standardized language used to communicate with relational database management systems (RDBMS).

Using SQL, we can:

- Retrieve data
- Insert new data
- Update existing data
- Delete unwanted data
- Create tables
- Modify database structures
- Manage permissions
- Control transactions
- Analyze data
- Build data pipelines

Unlike procedural programming languages, SQL focuses on **what** information is required rather than **how** to retrieve it.

The database engine determines the most efficient execution strategy.

---

# Understanding the Name

## Structured

Data inside relational databases follows a predefined structure called a **schema**.

Example:

| EmployeeID | EmployeeName | Department | Salary |
|------------|--------------|------------|--------|
| 101 | Alice | Finance | 85000 |
| 102 | Bob | Sales | 72000 |

Every record follows the same structure.

---

## Query

A query is simply a request for information.

Examples:

- Show all employees.
- Count today's orders.
- Calculate monthly revenue.
- Find duplicate customers.

Every request sent to a database is called a query.

---

## Language

SQL provides a common language that allows humans to communicate with databases regardless of the underlying programming language.

Applications written in Java, Python, C#, Go, Scala, or JavaScript all commonly use SQL to interact with relational databases.

---

# Why Was SQL Created?

Imagine managing a library with millions of books.

Without SQL, you would have to:

1. Visit every shelf.
2. Inspect every book.
3. Compare each title manually.
4. Keep searching until the correct book is found.

Databases solve the storage problem.

SQL solves the communication problem.

Instead of manually searching through records, you simply ask:

> "Find every book written by a particular author."

The database determines the fastest way to answer that request.

---

# Declarative vs Procedural Thinking

One of the most important concepts in SQL is that it is a **declarative language**.

## Procedural Approach

A procedural language describes every step required to solve a problem.

Example:

```text
Open the employee file.
Read the first record.
Check the salary.
If the salary is greater than 50,000, save the record.
Repeat until the end of the file.
Sort the results.
Display the output.
```

The programmer controls the execution.

---

## Declarative Approach

In SQL, the same task is written as:

```sql
SELECT *
FROM Employee
WHERE Salary > 50000;
```

The database engine decides:

- Which index to use.
- Whether to scan the table.
- Whether parallel processing is beneficial.
- How to filter the records.
- How to return the result.

You specify **what** you need.

The database determines **how** to retrieve it efficiently.

---

# Why SQL Is Still Relevant

Many new technologies have emerged over the years.

Examples include:

- NoSQL databases
- Data Lakes
- Lakehouses
- Distributed Processing Frameworks
- Cloud Data Warehouses

Despite these advances, SQL remains the dominant language for querying structured data.

Modern platforms such as Spark SQL, Snowflake, BigQuery, Redshift, Databricks SQL, and many others continue to use SQL as their primary query language.

Learning SQL is therefore an investment that remains valuable across technologies.

---

# SQL in Data Engineering

For Data Engineers, SQL is used throughout the data lifecycle.

Typical responsibilities include:

- Extracting data
- Cleaning data
- Transforming data
- Loading data into warehouses
- Building reporting datasets
- Validating data quality
- Creating fact tables
- Creating dimension tables
- Implementing Slowly Changing Dimensions
- Developing ETL and ELT pipelines
- Investigating production issues
- Optimizing long-running queries

SQL is not merely a reporting language; it is one of the core implementation languages for modern data platforms.

---

# Deep Dive

## What Happens When You Execute a SQL Query?

Many beginners believe the database simply reads the table and returns rows.

In reality, much more happens internally.

The lifecycle of a SQL query typically follows these stages:

```text
User Query
        │
        ▼
Parser
        │
        ▼
Syntax Validation
        │
        ▼
Semantic Validation
        │
        ▼
Logical Query Plan
        │
        ▼
Cost-Based Optimizer
        │
        ▼
Physical Execution Plan
        │
        ▼
Execution Engine
        │
        ▼
Storage Engine
        │
        ▼
Results Returned
```

Each stage has a specific purpose:

- **Parser:** Checks whether the SQL statement follows the language grammar.
- **Syntax Validation:** Detects invalid keywords, missing commas, and malformed statements.
- **Semantic Validation:** Confirms that referenced tables, columns, and objects exist and that permissions allow access.
- **Logical Query Plan:** Represents *what* operations are required, independent of implementation.
- **Cost-Based Optimizer (CBO):** Evaluates alternative execution strategies and estimates their costs.
- **Physical Execution Plan:** Chooses concrete algorithms, such as table scans, index seeks, hash joins, or merge joins.
- **Execution Engine:** Executes the selected plan.
- **Storage Engine:** Retrieves or updates the underlying data pages.

As a Data Engineer, understanding these stages is essential for diagnosing performance issues and writing efficient SQL.

---

# Real-World Data Engineering Example

Suppose a retail company receives millions of online orders every day.

Each night, an ETL pipeline must calculate the previous day's total revenue.

A simplified SQL query might be:

```sql
SELECT
    SUM(OrderAmount) AS TotalRevenue
FROM Orders
WHERE OrderDate = CURRENT_DATE - 1;
```

Although this query appears simple, the database may scan partitions, leverage indexes, distribute work across multiple nodes, and aggregate results in parallel before returning the final value.

This illustrates why understanding SQL internals is just as important as understanding SQL syntax.

---