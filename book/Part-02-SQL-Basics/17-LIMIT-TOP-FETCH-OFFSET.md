# Chapter 17: LIMIT, TOP, FETCH FIRST & OFFSET

> **Part:** SQL Query Fundamentals
>
> **Chapter:** 17
>
> **Difficulty:** 🟢 Beginner → 🟠 Intermediate
>
> **Estimated Reading Time:** 90–120 minutes
>
> **Prerequisites:**
>
> - Chapter 12 – SELECT Clause
> - Chapter 13 – FROM Clause
> - Chapter 14 – WHERE Clause
> - Chapter 16 – ORDER BY
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
| ANSI SQL | ⚠️ FETCH FIRST |
| SQL Server | ✅ TOP / OFFSET FETCH |
| Spark SQL | ✅ LIMIT |
| Snowflake | ✅ LIMIT / FETCH |

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

- Retrieve only the required number of rows.
- Understand LIMIT, TOP, FETCH FIRST, and OFFSET.
- Implement pagination.
- Compare pagination strategies.
- Understand Top-N optimization.
- Avoid OFFSET performance problems.
- Write portable SQL across different databases.

---

# Quick Revision

- SQL tables have no guaranteed order.
- Always combine LIMIT/TOP/FETCH with ORDER BY for deterministic results.
- LIMIT, TOP, and FETCH all restrict the number of returned rows.
- Different SQL dialects use different syntax.

---

# 🧠 Mental Model

Imagine a library containing one million books.

You ask:

> Show me the first 10 books.

The librarian doesn't bring every book.

Only the requested number.

```
1,000,000 Books

↓

Take First 10

↓

Return Result
```

This is exactly what LIMIT, TOP, and FETCH do.

---

# Business Problem

Suppose the bank has

```
25 Million Customers
```

A dashboard only displays

```
Top 20 Customers
```

Reading all 25 million rows would waste:

- CPU
- Memory
- Network
- Time

Instead

```
Read

↓

Sort

↓

Return Top 20
```

---

# Why Do We Need LIMIT/TOP/FETCH?

Applications rarely display every row.

Examples

- Dashboard
- Mobile App
- Search Results
- Admin Screen
- Reports

Almost every application retrieves only a subset of rows.

---

# SQL Dialect Comparison

| Database | Syntax |
|----------|--------|
| ANSI SQL | FETCH FIRST |
| SQL Server | TOP / OFFSET FETCH |
| PostgreSQL | LIMIT |
| Spark SQL | LIMIT |
| Snowflake | LIMIT / FETCH |

---

# ANSI SQL

```sql
SELECT customer_name
FROM customers
FETCH FIRST 10 ROWS ONLY;
```

---

# SQL Server

```sql
SELECT TOP (10)
customer_name
FROM customers;
```

---

# Spark SQL

```sql
SELECT customer_name
FROM customers
LIMIT 10;
```

---

# Snowflake

```sql
SELECT customer_name
FROM customers
LIMIT 10;
```

---

# Example 1

Top 5 customers.

SQL Server

```sql
SELECT TOP (5)
customer_name
FROM customers;
```

Spark SQL

```sql
SELECT customer_name
FROM customers
LIMIT 5;
```

---

# Why ORDER BY Matters

Bad

```sql
SELECT TOP (10)
*
FROM customers;
```

Which ten?

Nobody knows.

Good

```sql
SELECT TOP (10)
*
FROM customers
ORDER BY balance DESC;
```

Now the query is deterministic.

---

# OFFSET

Skip rows.

Spark SQL

```sql
SELECT *
FROM customers
LIMIT 10 OFFSET 20;
```

ANSI SQL

```sql
OFFSET 20 ROWS
FETCH NEXT 10 ROWS ONLY;
```

---

# Pagination

Page 1

Rows

```
1-10
```

Page 2

```
11-20
```

Page 3

```
21-30
```

OFFSET enables page navigation.

---

# Top-N Queries

Example

Top 10 richest customers.

```sql
SELECT
customer_name,
balance
FROM customers
ORDER BY balance DESC
LIMIT 10;
```

Very common interview question.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| LIMIT | ❌ | ❌ | ✅ | ✅ |
| TOP | ❌ | ✅ | ❌ | ❌ |
| FETCH FIRST | ✅ | ✅ | ❌ | ✅ |
| OFFSET | ✅ | ✅ | ✅ | ✅ |

---

# Deep Dive

LIMIT doesn't necessarily mean

```
Read Entire Table

↓

Return 10 Rows
```

Modern optimizers often use

```
Top-N Sort

↓

Stop Early

↓

Return Result
```

Much more efficient.

---

# 🔬 Under the Hood

Suppose

```sql
SELECT
customer_name
FROM customers
ORDER BY balance DESC
LIMIT 10;
```

Internally

```
Read Pages

↓

Estimate Plan

↓

Top-N Optimization

↓

Maintain Best 10 Rows

↓

Return Result
```

The database may avoid sorting the entire dataset.

---

# 📊 Execution Plan Notes

Execution plans may include

- Top
- Limit
- Top-N Sort
- Partial Sort
- Heap

Look for operators that indicate the optimizer has recognized the row limit.

---

# 🧠 Engineering Insight

Many developers think

```
LIMIT 10
```

always makes queries fast.

Not necessarily.

Without an index, the database may still scan millions of rows before determining which ten satisfy the ORDER BY.

Performance depends on:

- Indexes
- Sort order
- Predicate selectivity
- Execution plan

---

# OFFSET Performance

Small

```
OFFSET 10
```

Fast.

Large

```
OFFSET 10,000,000
```

Potentially expensive.

The database often must process and discard the skipped rows.

---

# Keyset Pagination

Instead of

```sql
OFFSET 100000
```

Use

```sql
WHERE customer_id > 100000
ORDER BY customer_id
LIMIT 10;
```

Advantages

- Better scalability
- Faster execution
- Uses indexes effectively
- Preferred for very large datasets

This technique is known as **keyset pagination** or **seek pagination**.

---

# ⚖️ Trade-offs

| Use OFFSET | Use Keyset Pagination |
|------------|----------------------|
| Small page numbers | Large datasets |
| Admin reports | High-traffic applications |
| Simple UI | Infinite scrolling |
| Ad hoc queries | APIs |

---

# Production Story

A customer portal displayed page 25,000 using OFFSET.

As the table grew, response times increased because the database processed many rows before returning the requested page.

Switching to keyset pagination allowed the database to seek directly to the required rows using an index, greatly improving response time.

---

# Performance Considerations

Good

✅ ORDER BY with LIMIT

✅ Indexed sort columns

✅ Top-N optimization

Avoid

❌ Large OFFSET values

❌ LIMIT without ORDER BY

❌ Sorting huge datasets unnecessarily

---

# Best Practices

✅ Always use ORDER BY.

✅ Use LIMIT/TOP only when needed.

✅ Prefer keyset pagination for APIs.

✅ Review execution plans.

---

# Common Mistakes

❌ Assuming LIMIT guarantees consistent results without ORDER BY.

❌ Using huge OFFSET values.

❌ Forgetting database-specific syntax.

❌ Believing LIMIT automatically makes every query efficient.

---

# Interview Questions

## Beginner

Difference between LIMIT and TOP?

---

## Intermediate

Why should LIMIT usually be combined with ORDER BY?

---

## Senior

Explain Top-N optimization.

---

## Architect

Design a pagination strategy for a table containing 5 billion rows.

---

# Practice Questions

## Easy

Return the first five customers.

---

Return the top ten balances.

---

## Medium

Return page three with ten rows per page.

---

Return the five newest transactions.

---

## Hard

Explain why

```
LIMIT 10
```

without ORDER BY

can return different rows across executions.

---

Design an API pagination strategy for a billion-row customer table.

---

# Cheat Sheet

| Database | Syntax |
|----------|--------|
| SQL Server | TOP |
| PostgreSQL | LIMIT |
| Spark SQL | LIMIT |
| Snowflake | LIMIT |
| ANSI | FETCH FIRST |

---

# Chapter Summary

- LIMIT, TOP, and FETCH restrict the number of rows returned.
- ORDER BY should almost always accompany row limiting.
- OFFSET enables pagination but can become expensive.
- Keyset pagination is often more efficient for large datasets.
- Modern optimizers frequently implement Top-N optimizations.

---

# What's Next?

In the next chapter, we'll study **Column Aliases and Table Aliases**.

You'll learn:

- Why aliases exist.
- Temporary vs permanent names.
- Readability improvements.
- Aliases in SELECT, FROM, and ORDER BY.
- Alias scope.
- Naming conventions.
- Production best practices.