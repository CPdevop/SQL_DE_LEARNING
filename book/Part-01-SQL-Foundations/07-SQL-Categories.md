# Chapter 7: SQL Categories

> **Part:** SQL Foundations
>
> **Chapter:** 7
>
> **Difficulty:** 🟢 Beginner
>
> **Estimated Reading Time:** 35–45 minutes
>
> **Prerequisites:**
>
> - Chapter 1 – What is SQL?
> - Chapter 2 – Relational Databases
> - Chapter 3 – Database Architecture
> - Chapter 4 – Database Objects
> - Chapter 6 – SQL Dialects
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand why SQL is divided into categories.
- Explain the purpose of each SQL category.
- Identify which category a SQL statement belongs to.
- Understand how different SQL commands are grouped.
- Prepare for learning SQL syntax in the upcoming chapters.

---

# Quick Revision

- SQL contains many commands.
- These commands are grouped by purpose.
- There are five major SQL categories.
- Every SQL statement belongs to one of these categories.

---

# 🧠 Mental Model

Imagine a hospital.

Different staff members have different responsibilities.

```
Hospital

│

├── Doctors
│      Treat Patients
│
├── Nurses
│      Care for Patients
│
├── Reception
│      Register Patients
│
├── Security
│      Control Access
│
└── Administration
       Manage Hospital
```

SQL follows a similar idea.

Different commands perform different jobs.

```
SQL

│

├── DDL
│      Define Database Objects
│
├── DML
│      Modify Data
│
├── DQL
│      Retrieve Data
│
├── DCL
│      Control Permissions
│
└── TCL
       Manage Transactions
```

---

# Why Are SQL Commands Categorized?

Imagine placing every SQL command into one large list.

You would quickly lose track of their purpose.

Instead, SQL groups commands based on **what they do**.

This makes SQL easier to learn, understand, and maintain.

---

# The Five SQL Categories

| Category | Full Form | Purpose |
|----------|-----------|----------|
| DDL | Data Definition Language | Defines database structures |
| DML | Data Manipulation Language | Inserts, updates, and deletes data |
| DQL | Data Query Language | Retrieves data |
| DCL | Data Control Language | Controls permissions |
| TCL | Transaction Control Language | Manages transactions |

---

# Data Definition Language (DDL)

DDL commands define and modify database structures.

Examples:

- CREATE
- ALTER
- DROP
- TRUNCATE
- RENAME

Example:

```sql
CREATE TABLE customers
(
    customer_id INT,
    customer_name VARCHAR(100)
);
```

DDL changes the structure of the database.

Think of DDL as the **architect** of a database.

---

# Data Manipulation Language (DML)

DML commands work with the data stored inside tables.

Examples:

- INSERT
- UPDATE
- DELETE
- MERGE

Example:

```sql
INSERT INTO customers
VALUES
(1,'Alice');
```

Think of DML as the **daily operations team**.

---

# Data Query Language (DQL)

DQL retrieves information.

The primary DQL command is:

```sql
SELECT
```

Example:

```sql
SELECT *
FROM customers;
```

Data Engineers spend a large portion of their time writing DQL statements.

---

# Data Control Language (DCL)

DCL manages permissions.

Examples:

- GRANT
- REVOKE

Example:

```sql
GRANT SELECT
ON customers
TO analyst_user;
```

These commands determine who can access which database objects.

---

# Transaction Control Language (TCL)

TCL manages transactions.

Examples:

- BEGIN
- COMMIT
- ROLLBACK
- SAVEPOINT

Example:

```sql
COMMIT;
```

TCL ensures that database changes are completed successfully or safely rolled back if something goes wrong.

---

# Visual Overview

```
                    SQL

                     │

 ┌─────────┬────────┬────────┬────────┬────────┐

 ▼         ▼        ▼        ▼        ▼

DDL      DML      DQL      DCL      TCL

Define   Modify   Query    Secure   Control
Objects  Data     Data     Access   Transactions
```

---

# How These Categories Work Together

Suppose a company launches a new application.

Step 1

Create the tables.

↓

DDL

---

Step 2

Insert customer data.

↓

DML

---

Step 3

Retrieve customer reports.

↓

DQL

---

Step 4

Grant access to analysts.

↓

DCL

---

Step 5

Commit the transaction.

↓

TCL

All five categories work together during the lifecycle of a database.

---

# 🧠 Engineering Insight

Many beginners believe SQL is only about SELECT statements.

In reality:

- Database Administrators use DDL and DCL extensively.
- Application Developers frequently use DML.
- Data Engineers use a combination of DDL, DML, DQL, and TCL.
- Security Administrators primarily work with DCL.

Understanding the categories provides a complete view of SQL.

---

# SQL Compatibility Matrix

| Category | ANSI | SQL Server | PostgreSQL | Spark SQL | Snowflake |
|----------|:----:|:----------:|:----------:|:---------:|:---------:|
| DDL | ✅ | ✅ | ✅ | ✅ | ✅ |
| DML | ✅ | ✅ | ✅ | ✅ | ✅ |
| DQL | ✅ | ✅ | ✅ | ✅ | ✅ |
| DCL | ✅ | ✅ | ✅ | ⚠️ Partial | ✅ |
| TCL | ✅ | ✅ | ✅ | ⚠️ Limited | ✅ |

> **Note:** Spark SQL has historically offered more limited support for certain DCL and TCL features because it is designed primarily for distributed analytics rather than traditional OLTP workloads.

---

# Deep Dive

Although SQL is divided into categories for learning purposes, database engines do not process commands based on these labels.

The parser simply receives a SQL statement and determines how to handle it.

For example:

```
CREATE TABLE

↓

DDL

↓

Parser

↓

Optimizer

↓

Storage Engine
```

Similarly,

```
SELECT

↓

DQL

↓

Parser

↓

Optimizer

↓

Execution Engine
```

The categories help humans organize SQL concepts—they are not separate execution engines inside the database.

---

# Production Perspective

A typical nightly ETL pipeline may use multiple SQL categories.

Example:

```
CREATE Stage Table

↓

DDL

↓

INSERT New Records

↓

DML

↓

SELECT Validation Results

↓

DQL

↓

COMMIT

↓

TCL
```

Understanding these categories helps Data Engineers design robust and maintainable workflows.

---

# Common Misconceptions

### "SELECT is DML."

Incorrect.

SELECT belongs to DQL.

---

### "DDL only creates tables."

Incorrect.

DDL also modifies, renames, truncates, and drops database objects.

---

### "COMMIT saves data."

Partially true.

COMMIT makes the current transaction permanent. It does not create or modify data by itself.

---

# Knowledge Check

## 🟢 Recall

1. Name the five SQL categories.
2. Which category does SELECT belong to?
3. Which category contains CREATE TABLE?

---

## 🟡 Understanding

1. Why is SQL divided into categories?
2. Why is GRANT classified as DCL?

---

## 🟠 Application

A Data Engineer creates a table, loads customer data, retrieves a report, grants analyst access, and commits the changes.

Identify the SQL category used in each step.

---

## 🔴 Architect Challenge

Your team is designing a secure analytics platform.

Which SQL categories will be used by:

- Data Engineers
- Database Administrators
- Security Administrators
- BI Developers

Explain your reasoning.

---

# Chapter Summary

- SQL commands are grouped into five major categories.
- DDL defines database structures.
- DML modifies data.
- DQL retrieves data.
- DCL controls permissions.
- TCL manages transactions.
- Every SQL statement belongs to one of these categories.

---

# What's Next?

In the next chapter, we'll explore one of the most frequently asked SQL interview topics:

> **SQL Written Order vs Logical Execution Order vs Physical Execution Order**

You'll learn:

- Why SQL is written in one order but executed in another.
- Why aliases don't work in the `WHERE` clause.
- How the query optimizer changes execution.
- How databases actually process SQL statements internally.

This chapter will fundamentally change the way you think about SQL queries.