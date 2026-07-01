# Chapter 13: FROM Clause

> **Part:** SQL Query Fundamentals
>
> **Chapter:** 13
>
> **Difficulty:** 🟢 Beginner
>
> **Estimated Reading Time:** 60–90 minutes
>
> **Prerequisites:**
>
> - Chapter 11 – Introduction to SQL Queries
> - Chapter 12 – SELECT Clause
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

Tables used

```
customers
accounts
transactions
```

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand the purpose of the FROM clause.
- Explain why FROM is the first logical execution step.
- Query data from tables and views.
- Use table aliases.
- Understand multiple data sources.
- Build a strong foundation for joins.

---

# Quick Revision

- SELECT specifies what to return.
- FROM specifies where the data comes from.
- Every query needs a data source unless it returns only constants or expressions.
- FROM is the first logical step in SQL execution.

---

# 🧠 Mental Model

Imagine ordering a book online.

The first question isn't:

> Which page do you want?

It's:

> Which book are you talking about?

The FROM clause answers exactly that question.

```
SELECT

↓

What information?

FROM

↓

From where?
```

Without a data source, the database cannot retrieve data.

---

# Business Problem

Suppose a bank stores:

```
customers

accounts

transactions

branches
```

If someone asks:

> Show me all customers.

The database must first know **which table contains customer data**.

That's the job of the FROM clause.

---

# What Is the FROM Clause?

The FROM clause identifies the source of the data used by a query.

This source may be:

- A table
- A view
- A subquery
- A Common Table Expression (CTE)
- A table-valued function
- An external table (platform dependent)

Most beginner queries use a single table.

---

# Basic Syntax

## ANSI SQL

```sql
SELECT column_name
FROM table_name;
```

---

## SQL Server

```sql
SELECT column_name
FROM table_name;
```

---

## Spark SQL

```sql
SELECT column_name
FROM table_name;
```

---

## Snowflake

```sql
SELECT column_name
FROM table_name;
```

---

# Syntax Breakdown

```
SELECT

↓

Choose columns

↓

FROM

↓

Choose data source
```

---

# Example 1

Retrieve every customer.

```sql
SELECT *
FROM customers;
```

---

# Example 2

Retrieve customer names.

```sql
SELECT customer_name
FROM customers;
```

---

# Example 3

Retrieve account numbers.

```sql
SELECT account_number
FROM accounts;
```

---

# Example 4

Using Table Aliases

```sql
SELECT
    c.customer_name
FROM customers AS c;
```

The alias `c` becomes a short name for the table.

Aliases improve readability, especially when multiple tables are involved.

---

# Example 5

Selecting From a View

```sql
SELECT *
FROM active_customers;
```

Views behave like tables from the perspective of a query.

---

# Why Is FROM Executed First?

Many beginners think SQL starts with SELECT.

It doesn't.

Logical execution order begins with:

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

↓

ORDER BY
```

The database must first identify the source of the data before it can filter, group, or return anything.

---

# Tables vs Views

| Feature | Table | View |
|----------|-------|------|
| Stores Data | ✅ | Usually No |
| Can Query | ✅ | ✅ |
| Can Join | ✅ | ✅ |
| Physical Storage | Yes | SQL Definition |

We'll explore views in a dedicated chapter later.

---

# Table Aliases

Instead of writing:

```sql
SELECT customers.customer_name
FROM customers;
```

You can write:

```sql
SELECT c.customer_name
FROM customers AS c;
```

Benefits:

- Shorter SQL.
- Easier to read.
- Essential for joins.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark SQL | Snowflake |
|----------|:----:|:----------:|:---------:|:---------:|
| FROM Table | ✅ | ✅ | ✅ | ✅ |
| FROM View | ✅ | ✅ | ✅ | ✅ |
| Table Alias | ✅ | ✅ | ✅ | ✅ |
| Multiple Tables | ✅ | ✅ | ✅ | ✅ |

---

# Deep Dive

Although we write:

```sql
SELECT customer_name
FROM customers;
```

The database logically processes:

```
FROM customers

↓

Read metadata

↓

Locate data pages

↓

Build working row set

↓

SELECT customer_name
```

The FROM clause establishes the working dataset used by the rest of the query.

---

# 🔬 Under the Hood

Suppose we execute:

```sql
SELECT customer_name
FROM customers;
```

Internally:

```
Receive SQL

↓

Parse

↓

Locate customers table

↓

Read metadata

↓

Determine storage location

↓

Read required pages

↓

Build row set

↓

Project customer_name

↓

Return results
```

---

# 🧠 Engineering Insight

Large production systems rarely query a single table.

A typical analytics query may use:

- 1 fact table
- 5 dimension tables
- Several views
- One or more CTEs

The FROM clause is responsible for assembling the complete dataset before the rest of the query executes.

---

# Production Story

An ETL job loaded daily transactions into a reporting table.

Originally, the query referenced a complex reporting view.

Replacing the view with the underlying partitioned table significantly reduced execution time because the optimizer had fewer layers to process.

The key lesson is that understanding your data source is just as important as writing correct SQL.

---

# Performance Considerations

Choosing the correct data source matters.

Prefer:

- The smallest appropriate table.
- Partitioned tables for large datasets.
- Indexed tables for frequent lookups.

Avoid querying unnecessary views or staging tables when a more suitable source exists.

---

# Best Practices

✅ Use meaningful table aliases.

✅ Keep aliases consistent (`c` for customers, `a` for accounts, `t` for transactions).

✅ Always know whether you're querying a table or a view.

✅ Use schema-qualified names in production when appropriate (for example, `sales.customers`).

---

# Common Mistakes

❌ Forgetting the FROM clause when selecting table data.

❌ Using unclear aliases like `x`, `y`, and `z`.

❌ Querying the wrong table because of similar names.

❌ Assuming a view always performs the same as a table.

---

# Beyond the Basics

As your SQL skills grow, the FROM clause can reference much more than a single table.

Examples include:

- Derived tables
- Common Table Expressions (CTEs)
- Table-valued functions
- LATERAL / APPLY operations
- External tables
- Iceberg and Delta Lake tables

We'll study each of these topics in dedicated chapters later in the book.

---

# Interview Questions

## Beginner

What is the purpose of the FROM clause?

---

## Intermediate

Why is the FROM clause logically executed before SELECT?

---

## Senior

How can choosing the wrong data source affect performance?

---

## Architect

When would you expose a view instead of allowing direct access to a base table?

---

# Practice Questions

## Easy

1. Retrieve all columns from the `customers` table.
2. Retrieve `customer_name` from `customers`.

---

## Medium

Retrieve `account_number` from `accounts` using a table alias.

---

## Hard

Explain why SQL cannot logically execute the SELECT clause before the FROM clause.

---

# Cheat Sheet

| Task | Syntax |
|------|--------|
| Query Table | `FROM customers` |
| Table Alias | `FROM customers AS c` |
| Query View | `FROM active_customers` |

---

# Chapter Summary

- The FROM clause identifies the data source for a query.
- FROM is the first logical step in SQL execution.
- Data sources can include tables, views, subqueries, and more.
- Table aliases improve readability and become essential when working with joins.
- Choosing the correct data source is important for both correctness and performance.

---

# What's Next?

In the next chapter, we'll study the **WHERE Clause**.

You'll learn:

- How SQL filters rows.
- Comparison operators.
- Logical operators.
- NULL handling.
- Predicate evaluation.
- Predicate pushdown.
- Performance considerations.
- Real-world filtering techniques used in Data Engineering.