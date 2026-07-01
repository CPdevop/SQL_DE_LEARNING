# Chapter 5: How Databases Store Data

> **Part:** SQL Foundations
>
> **Chapter:** 5
>
> **Difficulty:** 🟡 Beginner to Intermediate
>
> **Estimated Reading Time:** 45–60 minutes
>
> **Prerequisites:**
>
> - Chapter 1 – What is SQL?
> - Chapter 2 – Relational Databases
> - Chapter 3 – Database Architecture
> - Chapter 4 – Database Objects
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand how databases physically store data.
- Differentiate between logical and physical storage.
- Explain pages, blocks, extents, and data files.
- Understand the role of memory and disk.
- Explain the purpose of the buffer cache.
- Compare row-based and column-based storage.
- Understand why storage architecture affects query performance.

---

# Quick Revision

- A table is a logical object.
- Data is physically stored in pages or blocks.
- Pages are grouped into extents.
- Extents are stored inside database files.
- Databases read pages—not individual rows.
- Frequently accessed pages are cached in memory.
- Physical storage has a direct impact on performance.

---

# 🧠 Mental Model

When you create a table, you don't create a spreadsheet.

You create a logical object.

Internally, the database stores your data like this:

```text
Database

│

└── Table

      │

      └── Rows

            │

            └── Data Pages

                  │

                  └── Extents

                        │

                        └── Data Files

                              │

                              └── Physical Storage (SSD / HDD / Cloud Storage)
```

SQL works with **tables**.

The database engine works with **pages**.

---

# Real-World Scenario

Imagine a library.

```
Library

↓

Shelf

↓

Book

↓

Page

↓

Sentence
```

Now compare this to a database.

```
Database

↓

Data File

↓

Extent

↓

Page

↓

Row
```

A librarian does not fetch one sentence.

They fetch an entire page.

Likewise, a database does not read one row from disk.

It reads an entire page into memory.

---

# Logical Storage vs Physical Storage

There are two ways to think about data.

## Logical Storage

This is what developers see.

```
Database

↓

Schema

↓

Table

↓

Rows

↓

Columns
```

SQL is written using this logical model.

---

## Physical Storage

This is how the database actually stores data.

```
Database

↓

Data Files

↓

Extents

↓

Pages

↓

Rows
```

The storage engine works with this physical model.

---

# What Happens When You Create a Table?

Consider the following SQL statement.

```sql
CREATE TABLE customers
(
    customer_id INT,
    customer_name VARCHAR(100)
);
```

Although this appears simple, the database performs several internal operations:

1. Validates the SQL syntax.
2. Creates metadata describing the table.
3. Registers the table in the system catalog.
4. Allocates space for future data.
5. Prepares internal structures for inserts and queries.

At this stage, the table exists even though it contains no rows.

---

# What Happens During an INSERT?

Suppose we execute:

```sql
INSERT INTO customers
VALUES (1, 'Alice');
```

The database performs a sequence of internal operations:

```text
Receive SQL

↓

Parse Statement

↓

Validate Table

↓

Check Constraints

↓

Locate Free Space

↓

Write Row to Page

↓

Update Indexes (if any)

↓

Write Transaction Log

↓

Commit Transaction
```

Although only one row is inserted, multiple components of the database participate in the operation.

---

# Data Pages

The smallest unit of data read from disk is usually a **page**.

A page contains many rows.

Example:

```
Page 1

+----------------------+
| Row 1                |
| Row 2                |
| Row 3                |
| Row 4                |
| ...                  |
+----------------------+
```

Instead of reading a single row, the storage engine reads the entire page.

This minimizes expensive disk operations.

> **Note:** SQL Server uses 8 KB pages. Other database systems may use different page or block sizes.

---

# Extents

Pages are grouped into larger storage units called **extents**.

```
Extent

├── Page 1
├── Page 2
├── Page 3
├── Page 4
├── Page 5
├── Page 6
├── Page 7
└── Page 8
```

Managing storage in larger units reduces allocation overhead and improves efficiency.

---

# Data Files

Extents are stored inside physical data files.

A simplified storage hierarchy looks like this:

```text
Database

↓

Data File

↓

Extent

↓

Page

↓

Rows
```

Different database systems implement this differently, but the overall concept is similar.

---

# Memory vs Disk

Data can reside in two primary locations:

## Disk

- Persistent
- Large capacity
- Slower access

## Memory (RAM)

- Temporary
- Limited capacity
- Extremely fast

Because disk access is expensive, databases attempt to keep frequently used pages in memory.

---

# Buffer Cache

The buffer cache is an area of memory used to store recently accessed data pages.

```
Disk

↓

Read Page

↓

Buffer Cache

↓

SQL Query
```

If another query requests the same page, the database can read it directly from memory instead of disk.

This significantly improves performance.

---

# 🧠 Engineering Insight

When someone says:

> "Our customer table contains 800 million rows."

An experienced Data Engineer immediately asks:

- Is the table partitioned?
- Is it compressed?
- Is it indexed?
- How many pages does it occupy?
- Can the required pages fit in memory?
- Will this query perform a full table scan?

Understanding physical storage changes the way you think about SQL.

---

# Row-Based Storage

Traditional relational databases store complete rows together.

Example:

```
Page

--------------------------------

1 | Alice | Mumbai | 45000

2 | Bob   | Delhi  | 38000

3 | Carol | Pune   | 91000

--------------------------------
```

This layout is efficient for transactional workloads where entire records are frequently read or updated.

---

# Column-Based Storage

Analytical databases often store values column by column.

```
CustomerID

1

2

3

--------------------

Name

Alice

Bob

Carol

--------------------

Balance

45000

38000

91000
```

This approach is highly efficient for analytical queries that access only a subset of columns.

---

# Row Store vs Column Store

| Feature | Row Store | Column Store |
|----------|-----------|--------------|
| Best For | OLTP | OLAP |
| Reads | Entire rows | Selected columns |
| Updates | Excellent | More expensive |
| Analytics | Moderate | Excellent |
| Compression | Moderate | Excellent |

---

# 🔬 Under the Hood

Suppose you execute:

```sql
SELECT *
FROM customers
WHERE customer_id = 10;
```

Internally, the database performs operations similar to the following:

```text
Receive Query

↓

Parse SQL

↓

Validate Objects

↓

Create Logical Plan

↓

Optimize Query

↓

Check Buffer Cache

↓

If Page Exists

↓

Read from Memory

↓

Else Read from Disk

↓

Return Result
```

Understanding this workflow will make later topics such as indexing and execution plans much easier.

---

# Production Story

A nightly ETL pipeline processed a transaction table containing over one billion rows.

Initially, every query required scanning a large portion of the table from storage.

After introducing partitioning and better indexing, the amount of data read decreased dramatically, reducing the pipeline runtime from several hours to minutes.

The SQL itself changed very little.

The storage strategy made the difference.

---

# Architecture Perspective

Application developers usually think in terms of tables and rows.

Database administrators think in terms of pages, files, and memory.

Data Engineers must understand both perspectives.

The ability to connect logical SQL with physical storage is one of the skills that separates experienced engineers from beginners.

---

# Common Misconceptions

## "A row is read directly from disk."

Incorrect.

The storage engine reads pages.

---

## "Memory permanently stores data."

Incorrect.

Memory is temporary.

Persistent data is stored on disk or cloud storage.

---

## "A table is just a spreadsheet."

Incorrect.

A table is a logical object backed by sophisticated physical storage structures.

---

# Knowledge Check

## 🟢 Recall

1. What is a data page?
2. What is an extent?
3. Why is memory faster than disk?

---

## 🟡 Understanding

1. Why do databases read pages instead of individual rows?
2. Explain the purpose of the buffer cache.

---

## 🟠 Application

A table contains 500 million rows.

How might physical storage affect query performance?

---

## 🔴 Architect Challenge

Your organization is building a new analytics platform.

Would you choose row-based or column-based storage?

Explain your reasoning.

---

# Chapter Summary

- SQL works with logical objects such as tables.
- Databases store data physically in pages and files.
- Pages are grouped into extents.
- Memory and buffer caches reduce expensive disk access.
- Row-based and column-based storage serve different workloads.
- Understanding physical storage is essential for writing efficient SQL and designing scalable data systems.

---

# What's Next?

In the next chapter, we'll compare the major SQL dialects used in modern data engineering:

- ANSI SQL
- SQL Server (T-SQL)
- Spark SQL
- Snowflake SQL
- PostgreSQL

We'll learn where they are similar, where they differ, and how to write portable SQL across platforms.