# Chapter 28: BETWEEN Operator (Deep Dive)

> **Part:** Data Retrieval & Filtering
>
> **Chapter:** 28
>
> **Difficulty:** 🟢 Beginner → 🔴 Architect
>
> **Estimated Reading Time:** 120–150 minutes
>
> **Prerequisites:**
>
> - Chapter 23 – Comparison Operators
> - Chapter 24 – Logical Operators
> - Chapter 25 – NULL and Three-Valued Logic
> - Chapter 27 – IN Operator
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Concept Card

| Attribute | Value |
|-----------|-------|
| SQL Category | Data Retrieval |
| Difficulty | 🟢 Beginner → 🔴 Architect |
| Used Daily | ⭐⭐⭐⭐⭐ |
| Interview Frequency | ⭐⭐⭐⭐⭐ |
| Production Usage | ⭐⭐⭐⭐⭐ |
| Performance Impact | ⭐⭐⭐⭐☆ |
| ANSI SQL | ✅ |
| SQL Server | ✅ |
| Spark SQL | ✅ |
| Snowflake | ✅ |

---

# Learning Objectives

After completing this chapter, you will be able to:

- Use BETWEEN correctly.
- Understand inclusive boundaries.
- Filter numeric, date, and string ranges.
- Avoid timestamp filtering mistakes.
- Optimize range queries.
- Understand partition pruning.
- Write production-quality range filters.

---

# Quick Revision

BETWEEN checks whether a value falls within a specified range.

It is equivalent to:

```sql
column >= lower_bound
AND column <= upper_bound
```

Both boundary values are included.

---

# 🧠 Mental Model

Imagine a hotel.

Room numbers

```
101

102

103

104

105
```

Guest asks:

> Show rooms between 102 and 104.

Returned

```
102

103

104
```

Notice

```
102 Included

104 Included
```

BETWEEN is inclusive.

---

# Business Problem

A bank wants to identify:

- Loans between ₹5 lakh and ₹10 lakh.
- Transactions during January.
- Employees aged between 25 and 40.
- Orders placed during business hours.

All are examples of range filtering.

---

# What is BETWEEN?

BETWEEN tests whether a value falls within a range.

Equivalent SQL

```sql
WHERE salary BETWEEN 50000 AND 100000
```

equals

```sql
WHERE salary >= 50000
AND salary <= 100000
```

---

# Syntax

ANSI SQL

```sql
SELECT columns
FROM table
WHERE column BETWEEN lower_value AND upper_value;
```

Same syntax for:

- SQL Server
- Spark SQL
- Snowflake

---

# Example 1 — Numeric Range

```sql
SELECT
    customer_name,
    balance
FROM accounts
WHERE balance BETWEEN 50000 AND 100000;
```

---

# Example 2 — Date Range

```sql
SELECT
    transaction_id
FROM transactions
WHERE transaction_date
BETWEEN DATE '2026-01-01'
    AND DATE '2026-01-31';
```

---

# Example 3 — String Range

```sql
SELECT
    customer_name
FROM customers
WHERE customer_name
BETWEEN 'A'
    AND 'M';
```

String comparisons depend on collation and sort order.

---

# NOT BETWEEN

```sql
SELECT *
FROM loans
WHERE loan_amount
NOT BETWEEN 500000 AND 1000000;
```

Returns loans outside the specified range.

---

# BETWEEN is Inclusive

One of the most common interview questions.

Given

```
50000
```

Query

```sql
WHERE salary BETWEEN 50000 AND 100000
```

Result

```
50000 Included

100000 Included
```

---

# Date Pitfall

Consider

```sql
WHERE order_timestamp
BETWEEN
'2026-01-01'
AND
'2026-01-31'
```

If `order_timestamp` contains both date and time, rows from the end of January 31 may be excluded depending on how the literal is interpreted.

A safer approach is often:

```sql
WHERE order_timestamp >= '2026-01-01'
AND order_timestamp <  '2026-02-01'
```

This pattern includes every timestamp in January.

---

# Timestamp Filtering

Better

```sql
WHERE transaction_time >= '2026-01-01 00:00:00'
AND transaction_time < '2026-02-01 00:00:00'
```

Widely used in ETL pipelines.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| BETWEEN | ✅ | ✅ | ✅ | ✅ |
| NOT BETWEEN | ✅ | ✅ | ✅ | ✅ |

---

# Dialect Differences

The BETWEEN operator is standardized.

Differences generally relate to:

- Date literal syntax
- Timestamp precision
- Time zone handling

---

# Deep Dive

The optimizer often transforms

```sql
BETWEEN
```

into

```sql
>=

AND

<=
```

internally.

Execution plans typically reflect the equivalent range predicate rather than a special "BETWEEN" operator.

---

# 🔬 Under the Hood

```sql
WHERE balance
BETWEEN
50000
AND
100000
```

Conceptually

```
Read Balance

↓

Compare Lower Bound

↓

Compare Upper Bound

↓

TRUE/FALSE

↓

Return or Discard
```

---

# 📊 Execution Plan Notes

Efficient range predicates can often use:

- Index Seek
- Range Scan
- Partition Pruning

Avoid wrapping indexed columns in functions.

Good

```sql
WHERE order_date
BETWEEN
DATE '2026-01-01'
AND DATE '2026-01-31'
```

Less optimal

```sql
WHERE YEAR(order_date)=2026
```

---

# 🧠 Engineering Insight

BETWEEN is excellent for:

- Numeric ranges
- Date ranges
- Salary bands
- Age groups

For timestamp data, consider half-open intervals:

```sql
>= start

AND

< next_boundary
```

They avoid ambiguity at the upper boundary.

---

# 🧩 Design Decisions

| Situation | Recommendation |
|------------|---------------|
| Numeric range | BETWEEN |
| Date only | BETWEEN is acceptable |
| Timestamp | Half-open interval (`>=` / `<`) |
| Partition filtering | Compare raw columns |

---

# ⚖️ Trade-offs

| Use BETWEEN | Use Explicit Comparisons |
|--------------|-------------------------|
| Inclusive ranges | Exclusive boundaries |
| Numeric intervals | Timestamp filtering |
| Readable SQL | Precise boundary control |

---

# Production Story

A retail ETL pipeline calculated daily sales using:

```sql
BETWEEN
'2026-01-01'
AND
'2026-01-31'
```

The timestamp column stored values with milliseconds.

Late-night transactions on January 31 were unintentionally excluded.

The pipeline was rewritten using:

```sql
>= '2026-01-01'
AND < '2026-02-01'
```

ensuring every January transaction was processed.

---

# 🛠 Debugging Lab

Bug

```sql
WHERE order_time
BETWEEN
'2026-01-01'
AND
'2026-01-31'
```

Missing rows

```
2026-01-31 18:45:22
```

Reason

The upper bound represents the start of January 31 unless a time component is included.

Fix

```sql
WHERE order_time >= '2026-01-01'
AND order_time < '2026-02-01'
```

---

# 🔄 Rewrite Challenge

Original

```sql
WHERE salary >= 50000
AND salary <= 100000
```

Rewrite using

```sql
BETWEEN
```

Now rewrite back to explicit comparisons.

Discuss:

- Readability
- Maintainability
- Timestamp suitability

---

# Best Practices

✅ Use BETWEEN for inclusive numeric ranges.

✅ Prefer half-open intervals for timestamps.

✅ Keep indexed columns free of unnecessary functions.

✅ Test boundary values explicitly.

---

# Common Mistakes

❌ Assuming BETWEEN excludes endpoints.

❌ Using BETWEEN on timestamp columns without considering time components.

❌ Wrapping range columns in functions.

❌ Ignoring time zones in distributed systems.

---

# Interview Questions

## Beginner

Is BETWEEN inclusive or exclusive?

---

## Intermediate

Rewrite BETWEEN using comparison operators.

---

## Senior

Why are half-open intervals often preferred for timestamp filtering?

---

## Architect

Design an efficient date filtering strategy for a 20-billion-row partitioned transaction table.

---

# Practice Questions

## Easy

Find employees aged between 25 and 40.

---

Find balances between ₹50,000 and ₹1,00,000.

---

## Medium

Retrieve January 2026 transactions.

---

Find loans outside a specified range using NOT BETWEEN.

---

## Hard

Explain why BETWEEN can cause bugs when filtering timestamps.

---

Design a scalable date filtering strategy for a partitioned data lake.

---

# Cheat Sheet

| Task | Syntax |
|------|--------|
| Inclusive Range | `BETWEEN a AND b` |
| Outside Range | `NOT BETWEEN a AND b` |
| Timestamp Range | `>= start AND < next_boundary` |

---

# Related Chapters

- ✅ Chapter 14 — WHERE Clause
- ✅ Chapter 23 — Comparison Operators
- ✅ Chapter 25 — NULL and Three-Valued Logic
- ✅ Chapter 27 — IN Operator
- ▶️ Chapter 29 — EXISTS
- ▶️ Part 12 — Query Optimization
- ▶️ Part 13 — Data Engineering SQL

---

# Chapter Summary

- BETWEEN is shorthand for an inclusive range comparison.
- It is ideal for numeric and many date-only ranges.
- Timestamp filtering often benefits from half-open intervals (`>=` and `<`).
- Well-written range predicates improve readability and optimizer efficiency.
- Always test boundary conditions in production code.

---

# What's Next?

In the next chapter, we'll study **EXISTS and NOT EXISTS (Deep Dive)**.

You'll learn:

- EXISTS vs IN
- EXISTS vs JOIN
- Semi-joins and anti-joins
- Correlated subqueries
- Optimizer transformations
- Performance tuning
- Production ETL patterns
- Common interview questions