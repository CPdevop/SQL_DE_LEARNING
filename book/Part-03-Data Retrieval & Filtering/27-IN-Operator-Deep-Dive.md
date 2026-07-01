# Chapter 27: IN Operator (Deep Dive)

> **Part:** Data Retrieval & Filtering
>
> **Chapter:** 27
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
> - Chapter 26 – LIKE
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

- Understand the IN operator.
- Compare IN and OR.
- Use IN with subqueries.
- Understand NOT IN.
- Handle NULL correctly.
- Understand optimizer behavior.
- Write efficient production queries.

---

# Quick Revision

IN checks whether a value exists in a list of values.

Instead of writing many OR conditions,

IN provides a cleaner and more maintainable solution.

---

# 🧠 Mental Model

Imagine entering a building.

Security has an approved visitor list.

```
101

105

110

115
```

Your ID is

```
105
```

The guard checks

```
Is 105 in this list?
```

Yes.

Access granted.

That is exactly what IN does.

---

# Business Problem

Marketing wants to send an email campaign only to customers from:

- Mumbai
- Delhi
- Pune
- Chennai

Instead of writing four OR conditions,

IN expresses the requirement clearly.

---

# What is IN?

IN compares a value against a list of values.

If the value exists in the list,

the condition evaluates to TRUE.

---

# Basic Syntax

ANSI SQL

```sql
SELECT
    customer_name
FROM customers
WHERE city IN ('Mumbai', 'Delhi', 'Pune');
```

The syntax is identical across SQL Server, Spark SQL, and Snowflake.

---

# Example 1

Without IN

```sql
SELECT
    customer_name
FROM customers
WHERE city = 'Mumbai'
    OR city = 'Delhi'
    OR city = 'Pune';
```

---

# Example 2

With IN

```sql
SELECT
    customer_name
FROM customers
WHERE city IN
(
    'Mumbai',
    'Delhi',
    'Pune'
);
```

Cleaner.

More readable.

Easier to maintain.

---

# How IN Works

Conceptually

```
city

↓

Compare

↓

Mumbai?

↓

Delhi?

↓

Pune?

↓

TRUE or FALSE
```

---

# IN with Numbers

```sql
SELECT *
FROM accounts
WHERE branch_id IN
(
    101,
    205,
    310
);
```

---

# IN with Dates

```sql
SELECT *
FROM holidays
WHERE holiday_date IN
(
    DATE '2026-01-01',
    DATE '2026-08-15',
    DATE '2026-12-25'
);
```

---

# IN with Subqueries

```sql
SELECT
    customer_name
FROM customers
WHERE customer_id IN
(
    SELECT customer_id
    FROM accounts
);
```

Now the list is generated dynamically.

---

# Logical Execution

```
Subquery

↓

List Produced

↓

Outer Query

↓

IN Evaluation
```

The optimizer may transform this into a semi-join rather than literally building a list.

---

# NOT IN

```sql
SELECT *
FROM customers
WHERE city NOT IN
(
    'Mumbai',
    'Delhi'
);
```

Returns customers from every other city.

---

# ⚠ NULL Problem

Suppose

```sql
WHERE city NOT IN
(
    'Mumbai',
    NULL
);
```

Many beginners expect

```
Everything except Mumbai
```

Actual result

```
No Rows
```

Why?

Because

```
city <> NULL

↓

UNKNOWN
```

The entire predicate becomes UNKNOWN.

This is one of SQL's most famous pitfalls.

---

# Safe Alternative

When NULL values are possible,

consider

```sql
NOT EXISTS
```

We'll study EXISTS in the next chapters.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| IN | ✅ | ✅ | ✅ | ✅ |
| NOT IN | ✅ | ✅ | ✅ | ✅ |
| Subquery | ✅ | ✅ | ✅ | ✅ |

---

# Dialect Differences

The syntax is standardized.

Differences usually arise from:

- Optimizer choices
- Large IN list handling
- NULL behavior in execution plans

---

# Deep Dive

The optimizer does not necessarily compare values one by one.

Depending on the database,

it may use:

- Hash lookups
- Semi-joins
- Predicate expansion
- Constant folding

The implementation is chosen based on estimated cost.

---

# 🔬 Under the Hood

```sql
WHERE city IN
(
    'Mumbai',
    'Delhi',
    'Pune'
)
```

Conceptually

```
Read Row

↓

Lookup Value

↓

Match?

↓

TRUE/FALSE

↓

Return or Discard
```

---

# 📊 Execution Plan Notes

Possible execution strategies include:

- Constant Scan
- Hash Match (Semi Join)
- Nested Loop (Semi Join)
- Filter

Execution plans vary by optimizer and query shape.

---

# 🧠 Engineering Insight

Large IN lists containing hundreds or thousands of values are difficult to maintain.

Instead of

```sql
WHERE customer_id IN
(
    1001,
    1002,
    ...
    5000
)
```

consider

- A temporary table
- A staging table
- A lookup table
- A subquery

These approaches are often easier to maintain and may perform better.

---

# 🧩 Design Decisions

| Situation | Recommendation |
|------------|---------------|
| Few constant values | IN |
| Many OR conditions | IN |
| Thousands of values | Lookup table |
| Dynamic list | Subquery |
| NULL-sensitive exclusion | NOT EXISTS |

---

# ⚖️ Trade-offs

| Use IN | Consider Another Approach |
|---------|--------------------------|
| Small constant lists | Large lookup tables |
| Static filters | Dynamic joins |
| Readability | Massive IN lists |

---

# Production Story

A nightly ETL process filtered 15,000 customer IDs using a very large IN list generated by application code.

Maintaining the SQL became difficult, and the optimizer struggled with the enormous predicate.

The team loaded the IDs into a temporary staging table and joined against it instead.

The SQL became simpler to maintain, and performance improved because the optimizer had more flexibility in choosing an execution plan.

---

# 🛠 Debugging Lab

Bug

```sql
SELECT *
FROM customers
WHERE city NOT IN
(
    'Mumbai',
    NULL
);
```

Expected

```
All cities except Mumbai
```

Actual

```
No rows
```

Reason

```
NULL

↓

UNKNOWN

↓

Predicate fails
```

Fix

Filter NULL values from the list or use `NOT EXISTS` when appropriate.

---

# 🔄 Rewrite Challenge

Original

```sql
WHERE city='Mumbai'
OR city='Delhi'
OR city='Pune'
OR city='Chennai'
```

Rewrite using

1. IN
2. A lookup table
3. A subquery

Compare

- Readability
- Maintainability
- Scalability

---

# Best Practices

✅ Use IN instead of long OR chains.

✅ Keep constant lists reasonably small.

✅ Use lookup tables for very large lists.

✅ Be cautious with NOT IN when NULL values may exist.

---

# Common Mistakes

❌ Writing hundreds of OR conditions.

❌ Using massive hard-coded IN lists.

❌ Ignoring NULL behavior with NOT IN.

❌ Assuming IN always performs the same as EXISTS.

---

# Interview Questions

## Beginner

What is the IN operator?

---

## Intermediate

What are the advantages of IN over OR?

---

## Senior

Explain why `NOT IN` behaves unexpectedly when NULL values are present.

---

## Architect

Design a scalable solution for filtering 10 million rows against a dynamic list of 500,000 customer IDs.

---

# Practice Questions

## Easy

Return customers from Mumbai, Delhi, and Pune.

---

Return accounts from branch IDs 101, 205, and 310.

---

## Medium

Use IN with a subquery to find customers who own accounts.

---

Rewrite a long OR chain using IN.

---

## Hard

Explain why `NOT IN` can return no rows when the list contains NULL.

---

Design a production strategy for filtering a billion-row table using a dynamic list of IDs.

---

# Cheat Sheet

| Task | Syntax |
|------|--------|
| Multiple Values | `IN (...)` |
| Exclusion | `NOT IN (...)` |
| Dynamic List | `IN (SELECT ...)` |

---

# Chapter Summary

- IN simplifies multi-value comparisons.
- It improves readability compared with long OR chains.
- IN works with constants and subqueries.
- Be careful when using NOT IN with NULL values.
- For large dynamic lists, consider lookup tables or subqueries instead of hard-coded values.

---

# What's Next?

In the next chapter, we'll study the **BETWEEN Operator (Deep Dive)**.

You'll learn:

- Inclusive range filtering
- BETWEEN for numbers, dates, and strings
- NOT BETWEEN
- Common off-by-one mistakes
- Date and timestamp pitfalls
- Range optimization
- Index usage
- Partition pruning
- Real-world production examples