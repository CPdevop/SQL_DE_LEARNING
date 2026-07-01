# Chapter 14: WHERE Clause

> **Part:** SQL Query Fundamentals
>
> **Chapter:** 14
>
> **Difficulty:** 🟢 Beginner → 🟠 Intermediate
>
> **Estimated Reading Time:** 90–120 minutes
>
> **Prerequisites:**
>
> - Chapter 11 – Introduction to SQL Queries
> - Chapter 12 – SELECT Clause
> - Chapter 13 – FROM Clause
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Concept Card

| Attribute | Value |
|-----------|-------|
| SQL Category | DQL |
| Difficulty | 🟢 Beginner |
| Used Daily | ⭐⭐⭐⭐⭐ |
| Interview Frequency | ⭐⭐⭐⭐⭐ |
| Production Usage | ⭐⭐⭐⭐⭐ |
| Performance Impact | ⭐⭐⭐⭐⭐ |
| ANSI SQL | ✅ |
| SQL Server | ✅ |
| Spark SQL | ✅ |
| Snowflake | ✅ |

---

# Sample Database

Database

```
de_practice
```

Tables

```
customers

accounts

transactions
```

---

# Learning Objectives

After completing this chapter, you will be able to:

- Filter rows correctly.
- Use comparison operators.
- Use logical operators.
- Understand SQL's three-valued logic.
- Handle NULL correctly.
- Write efficient predicates.
- Understand predicate pushdown.
- Avoid common filtering mistakes.

---

# Quick Revision

- SELECT chooses columns.
- FROM chooses data sources.
- WHERE chooses rows.
- WHERE executes before SELECT.
- Efficient filtering improves performance.

---

# 🧠 Mental Model

Imagine a library containing one million books.

SELECT asks:

> Which information do I want?

FROM asks:

> Which library?

WHERE asks:

> Which books?

```
Entire Library

↓

History Books

↓

Books after 2020

↓

Books written by John

↓

Result
```

WHERE gradually narrows the data.

---

# Business Problem

Suppose the bank has

```
10 Million Customers
```

A manager asks

> Show customers from Mumbai.

Without WHERE

```
10 Million Rows
```

With WHERE

```
32,514 Rows
```

Filtering makes queries useful.

---

# What is WHERE?

The WHERE clause filters rows before they are returned.

Only rows satisfying the condition remain.

---

# Syntax

## ANSI SQL

```sql
SELECT columns
FROM table
WHERE condition;
```

SQL Server

```sql
SELECT columns
FROM table
WHERE condition;
```

Spark SQL

```sql
SELECT columns
FROM table
WHERE condition;
```

Snowflake

```sql
SELECT columns
FROM table
WHERE condition;
```

---

# Syntax Breakdown

```
FROM

↓

Read Data

↓

WHERE

↓

Filter Rows

↓

SELECT

↓

Return Columns
```

---

# Example 1

Return all customers from Mumbai.

```sql
SELECT *
FROM customers
WHERE city = 'Mumbai';
```

---

# Example 2

Salary greater than 50000.

```sql
SELECT *
FROM employees
WHERE salary > 50000;
```

---

# Comparison Operators

| Operator | Meaning |
|----------|----------|
| = | Equal |
| <> | Not Equal |
| > | Greater Than |
| < | Less Than |
| >= | Greater Than or Equal |
| <= | Less Than or Equal |

---

# Example 3

```sql
SELECT *
FROM accounts
WHERE balance >= 100000;
```

---

# Logical Operators

AND

```sql
WHERE city='Mumbai'
AND balance>50000
```

---

OR

```sql
WHERE city='Mumbai'
OR city='Delhi'
```

---

NOT

```sql
WHERE NOT city='Mumbai'
```

---

# Operator Precedence

SQL evaluates

```
NOT

↓

AND

↓

OR
```

Example

```sql
WHERE city='Mumbai'
OR city='Delhi'
AND balance>10000
```

is evaluated differently than many beginners expect.

Use parentheses.

---

# BETWEEN

```sql
WHERE salary
BETWEEN 50000
AND 100000
```

---

# IN

Instead of

```sql
WHERE city='Mumbai'
OR city='Delhi'
OR city='Pune'
```

write

```sql
WHERE city IN
(
'Mumbai',
'Delhi',
'Pune'
)
```

Cleaner and easier to maintain.

---

# LIKE

Pattern matching.

```sql
WHERE customer_name
LIKE 'A%'
```

Starts with A.

---

```sql
LIKE '%Ltd'
```

Ends with Ltd.

---

```sql
LIKE '%Bank%'
```

Contains Bank.

---

# NULL

One of the most misunderstood SQL topics.

Incorrect

```sql
WHERE phone = NULL
```

Correct

```sql
WHERE phone IS NULL
```

---

```sql
WHERE phone IS NOT NULL
```

---

# Three-Valued Logic

SQL doesn't use only

```
TRUE

FALSE
```

It also has

```
UNKNOWN
```

Because NULL means

> Unknown

Not

> Empty

This is one of SQL's most important concepts.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| WHERE | ✅ | ✅ | ✅ | ✅ |
| BETWEEN | ✅ | ✅ | ✅ | ✅ |
| IN | ✅ | ✅ | ✅ | ✅ |
| LIKE | ✅ | ✅ | ✅ | ✅ |
| IS NULL | ✅ | ✅ | ✅ | ✅ |

---

# Deep Dive

WHERE is logically executed before SELECT.

```
FROM

↓

WHERE

↓

GROUP BY

↓

HAVING

↓

SELECT
```

The database filters rows before projecting columns.

---

# 🔬 Under the Hood

Suppose

```sql
SELECT customer_name
FROM customers
WHERE city='Mumbai';
```

Internally

```
Locate Table

↓

Read Pages

↓

Evaluate Predicate

↓

Discard Non-Matching Rows

↓

Project Columns

↓

Return Result
```

---

# 🧠 Engineering Insight

Filtering early is almost always better.

Imagine

```
1 Billion Rows

↓

WHERE

↓

10 Rows
```

Much better than

```
1 Billion Rows

↓

SELECT *

↓

Application filters later
```

Always push filtering into SQL whenever possible.

---

# Predicate Pushdown

Modern engines

Spark

Snowflake

Databricks

can push filters closer to storage.

Instead of

```
Read Entire File

↓

Filter
```

they do

```
Filter

↓

Read Only Needed Data
```

This can reduce I/O dramatically.

---

# SARGable Predicates

Good

```sql
WHERE customer_id = 100
```

Bad

```sql
WHERE YEAR(order_date)=2025
```

The second query may prevent efficient index usage in many databases because the column is wrapped in a function.

A more index-friendly alternative is often:

```sql
WHERE order_date >= '2025-01-01'
  AND order_date <  '2026-01-01'
```

We'll cover SARGability in depth in the indexing and performance sections later in the book.

---

# Production Story

An ETL job processed 2 billion transactions every night.

Originally

```
Read Entire Table

↓

Python Filter
```

Changed to

```
SQL WHERE

↓

Read Only Required Rows
```

The pipeline runtime dropped significantly because far less data was transferred and processed.

---

# Performance Considerations

Good

✅ Equality filters

✅ Indexed columns

✅ Partition columns

Bad

❌ Functions on indexed columns

❌ Unnecessary OR chains

❌ Filtering outside SQL

---

# Best Practices

✅ Filter as early as possible.

✅ Use IN instead of long OR chains when appropriate.

✅ Always use IS NULL.

✅ Keep predicates readable.

✅ Use parentheses for complex logic.

---

# Common Mistakes

❌ WHERE salary=NULL

❌ Forgetting parentheses

❌ Using SELECT * then filtering in code

❌ Wrapping indexed columns in functions without understanding the performance impact

---

# Interview Questions

## Beginner

Difference between WHERE and HAVING?

---

## Intermediate

Why can't

```sql
WHERE SUM(salary)>10000
```

work?

---

## Senior

Explain predicate pushdown.

---

## Architect

How does filtering strategy affect distributed query execution?

---

# Practice Questions

## Easy

Return customers from Mumbai.

---

Return accounts with balance greater than 100000.

---

## Medium

Find customers from Mumbai or Pune.

---

Find customers whose names start with A.

---

## Hard

Explain why

```sql
WHERE phone=NULL
```

doesn't work.

---

Design an efficient filter for one billion transaction records using a transaction date range.

---

# Cheat Sheet

| Task | Syntax |
|------|--------|
| Equal | = |
| Greater | > |
| Between | BETWEEN |
| Multiple Values | IN |
| Pattern | LIKE |
| NULL | IS NULL |

---

# Chapter Summary

- WHERE filters rows before they are returned.
- Comparison and logical operators allow precise filtering.
- SQL uses three-valued logic: TRUE, FALSE, and UNKNOWN.
- NULL must be tested with `IS NULL` or `IS NOT NULL`.
- Filtering early improves performance.
- Efficient predicates reduce I/O and improve scalability.

---

# What's Next?

In the next chapter, we'll study the **DISTINCT** keyword.

You'll learn:

- How duplicate rows occur.
- How DISTINCT removes duplicates.
- Why DISTINCT can be expensive.
- DISTINCT vs GROUP BY.
- COUNT(DISTINCT ...).
- Performance implications.
- Real-world data engineering use cases.