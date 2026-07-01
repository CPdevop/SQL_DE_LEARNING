# Chapter 15: DISTINCT

> **Part:** SQL Query Fundamentals
>
> **Chapter:** 15
>
> **Difficulty:** 🟢 Beginner → 🟠 Intermediate
>
> **Estimated Reading Time:** 60–90 minutes
>
> **Prerequisites:**
>
> - Chapter 12 – SELECT Clause
> - Chapter 13 – FROM Clause
> - Chapter 14 – WHERE Clause
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
| Used Daily | ⭐⭐⭐⭐☆ |
| Interview Frequency | ⭐⭐⭐⭐⭐ |
| Production Usage | ⭐⭐⭐⭐☆ |
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

- Understand what DISTINCT does.
- Explain duplicate rows.
- Remove duplicate values correctly.
- Use DISTINCT with multiple columns.
- Use COUNT(DISTINCT).
- Compare DISTINCT and GROUP BY.
- Understand performance implications.
- Avoid unnecessary DISTINCT usage.

---

# Quick Revision

- DISTINCT removes duplicate rows from the result set.
- It operates on the selected columns.
- DISTINCT is evaluated after SELECT in the logical query processing order.
- Removing duplicates requires additional work by the database.

---

# 🧠 Mental Model

Imagine a guest list.

```
Alice

Bob

Alice

John

Bob

David
```

After applying DISTINCT

```
Alice

Bob

John

David
```

Duplicates disappear.

---

# Business Problem

Suppose the transactions table contains one million records.

Management asks:

> "Which cities do our customers belong to?"

Without DISTINCT

```
Mumbai

Mumbai

Mumbai

Delhi

Delhi

Pune

Mumbai
```

With DISTINCT

```
Mumbai

Delhi

Pune
```

DISTINCT returns only unique values.

---

# What Is DISTINCT?

DISTINCT removes duplicate rows from the result returned by a query.

It does **not** remove duplicate rows from the table.

Only the query result changes.

---

# Basic Syntax

## ANSI SQL

```sql
SELECT DISTINCT column_name
FROM customers;
```

---

## SQL Server

```sql
SELECT DISTINCT column_name
FROM customers;
```

---

## Spark SQL

```sql
SELECT DISTINCT column_name
FROM customers;
```

---

## Snowflake

```sql
SELECT DISTINCT column_name
FROM customers;
```

The syntax is identical across all major SQL dialects.

---

# Example 1

Without DISTINCT

```sql
SELECT city
FROM customers;
```

Output

```
Mumbai

Mumbai

Delhi

Mumbai

Pune
```

---

# Example 2

With DISTINCT

```sql
SELECT DISTINCT city
FROM customers;
```

Output

```
Mumbai

Delhi

Pune
```

---

# DISTINCT on Multiple Columns

DISTINCT considers the **entire selected row**.

```sql
SELECT DISTINCT
    city,
    state
FROM customers;
```

Duplicate combinations of `(city, state)` are removed.

It does **not** remove duplicate cities independently.

---

# Example

Input

| City | State |
|------|--------|
| Mumbai | Maharashtra |
| Mumbai | Maharashtra |
| Mumbai | Gujarat |
| Pune | Maharashtra |

Output

| City | State |
|------|--------|
| Mumbai | Maharashtra |
| Mumbai | Gujarat |
| Pune | Maharashtra |

---

# DISTINCT and NULL

Many beginners ask:

Does DISTINCT remove multiple NULL values?

Example

| Phone |
|--------|
| NULL |
| NULL |
| 9876543210 |

Result

```sql
SELECT DISTINCT phone
FROM customers;
```

Output

| Phone |
|--------|
| NULL |
| 9876543210 |

For duplicate elimination, multiple NULL values are treated as duplicates and appear once in the result.

---

# COUNT(DISTINCT)

Find the number of unique cities.

```sql
SELECT
COUNT(DISTINCT city)
FROM customers;
```

Output

```
3
```

This is one of the most common interview questions.

---

# DISTINCT vs GROUP BY

Both queries return the same result.

```sql
SELECT DISTINCT city
FROM customers;
```

```sql
SELECT city
FROM customers
GROUP BY city;
```

So why do both exist?

DISTINCT

→ Remove duplicates.

GROUP BY

→ Group rows for aggregation.

Use the one that best matches your intent.

---

# Logical Execution Order

Remember:

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

DISTINCT

↓

ORDER BY
```

DISTINCT is applied after the SELECT list has been evaluated.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| DISTINCT | ✅ | ✅ | ✅ | ✅ |
| COUNT(DISTINCT) | ✅ | ✅ | ✅ | ✅ |
| DISTINCT Multiple Columns | ✅ | ✅ | ✅ | ✅ |

---

# Deep Dive

How does the database remove duplicates?

Common strategies include:

```
Sort

↓

Compare Adjacent Rows

↓

Remove Duplicates
```

or

```
Hash Values

↓

Identify Duplicate Keys

↓

Return Unique Rows
```

The optimizer decides which strategy is more efficient.

---

# 🔬 Under the Hood

Example

```sql
SELECT DISTINCT city
FROM customers;
```

Internally

```
Read Pages

↓

Project city

↓

Sort or Hash

↓

Remove Duplicate Values

↓

Return Result
```

---

# 📊 Execution Plan Notes

Execution plans often use operators such as:

- Sort + Distinct
- Hash Aggregate
- Stream Aggregate (on already ordered data)

Which operator is chosen depends on:

- Available indexes
- Estimated row count
- Existing sort order
- Database optimizer

Viewing execution plans is the best way to understand how your database implements DISTINCT.

---

# 🧠 Engineering Insight

DISTINCT is often used to hide problems.

Example

A bad JOIN creates duplicate rows.

Developer writes

```sql
SELECT DISTINCT ...
```

The duplicates disappear.

The bug remains.

Instead of immediately adding DISTINCT, first ask:

**"Why are duplicates being produced?"**

---

# Production Story

A reporting query joined customers, accounts, and transactions.

The result contained duplicate customer records because the join logic was incorrect.

Adding DISTINCT appeared to solve the issue, but it also increased query execution time.

After fixing the join condition, DISTINCT was no longer required, and the query became both faster and easier to understand.

---

# Performance Considerations

DISTINCT may require:

- Sorting
- Hashing
- Additional memory
- Additional CPU

On very large datasets, duplicate elimination can become expensive.

Always ask:

> Do I really need DISTINCT?

---

# Best Practices

✅ Use DISTINCT only when duplicate removal is required.

✅ Investigate unexpected duplicates before using DISTINCT.

✅ Prefer fixing incorrect joins over masking them with DISTINCT.

✅ Review execution plans for expensive duplicate elimination.

---

# Common Mistakes

❌ Using DISTINCT to fix incorrect JOINs.

❌ Assuming DISTINCT modifies table data.

❌ Forgetting that DISTINCT applies to all selected columns.

❌ Using DISTINCT unnecessarily on columns that are already unique.

---

# Interview Questions

## Beginner

What does DISTINCT do?

---

## Intermediate

What is the difference between DISTINCT and GROUP BY?

---

## Senior

How does the optimizer remove duplicates internally?

---

## Architect

A DISTINCT query runs slowly on a table with 500 million rows.

What factors would you investigate before optimizing it?

---

# Practice Questions

## Easy

Return all unique customer cities.

---

Return all unique account types.

---

## Medium

Return unique combinations of city and state.

---

Find the number of unique branches.

---

## Hard

Explain why adding DISTINCT to a poorly written JOIN may hide the real problem instead of solving it.

---

Design a strategy to return unique customers from a billion-row transaction table with minimal overhead.

---

# Cheat Sheet

| Task | Syntax |
|------|--------|
| Remove Duplicates | `SELECT DISTINCT col` |
| Multiple Columns | `SELECT DISTINCT col1, col2` |
| Count Unique | `COUNT(DISTINCT col)` |

---

# Chapter Summary

- DISTINCT removes duplicate rows from the query result.
- Duplicate elimination is based on all selected columns.
- DISTINCT does not modify the underlying table.
- COUNT(DISTINCT) counts unique values.
- DISTINCT and GROUP BY may produce similar results but serve different purposes.
- DISTINCT can be expensive because it often requires sorting or hashing.
- Use DISTINCT intentionally—not as a workaround for incorrect query logic.

---

# What's Next?

In the next chapter, we'll study **ORDER BY**, one of the most important clauses for controlling the presentation of query results.

You'll learn:

- Ascending and descending sorting.
- Sorting by multiple columns.
- Sorting by aliases and expressions.
- NULL sorting behavior.
- Collation and case sensitivity.
- ORDER BY vs logical execution order.
- Sorting performance.
- Top-N queries.
- Production best practices.