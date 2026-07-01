# Chapter 29: EXISTS and NOT EXISTS (Deep Dive)

> **Part:** Data Retrieval & Filtering
>
> **Chapter:** 29
>
> **Difficulty:** 🟢 Beginner → 🔴 Architect
>
> **Estimated Reading Time:** 150–180 minutes
>
> **Prerequisites:**
>
> - Chapter 23 – Comparison Operators
> - Chapter 24 – Logical Operators
> - Chapter 25 – NULL and Three-Valued Logic
> - Chapter 27 – IN Operator
> - Chapter 28 – BETWEEN Operator
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
| Performance Impact | ⭐⭐⭐⭐⭐ |
| ANSI SQL | ✅ |
| SQL Server | ✅ |
| Spark SQL | ✅ |
| Snowflake | ✅ |

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand EXISTS.
- Understand NOT EXISTS.
- Write correlated subqueries.
- Compare EXISTS vs IN.
- Compare EXISTS vs JOIN.
- Understand Semi Joins.
- Understand Anti Joins.
- Optimize EXISTS queries.

---

# Quick Revision

EXISTS asks only one question.

> **Does at least one matching row exist?**

It does **not** care how many rows exist.

---

# 🧠 Mental Model

Imagine entering a movie theater.

The security guard asks:

```
Do you have a ticket?
```

If the answer is

```
YES
```

The guard stops checking.

He doesn't ask

```
How many tickets?
```

This is exactly how EXISTS behaves.

---

# Business Problem

Suppose a bank stores:

```
Customers

Accounts
```

Management asks:

> Show customers who own at least one account.

We don't need

- Account balance
- Number of accounts
- Account type

We only need to know

```
Does one exist?
```

EXISTS is designed for this problem.

---

# What is EXISTS?

EXISTS returns TRUE if the subquery returns at least one row.

Otherwise,

it returns FALSE.

---

# Syntax

ANSI SQL

```sql
SELECT
    customer_name
FROM customers c
WHERE EXISTS
(
    SELECT 1
    FROM accounts a
    WHERE a.customer_id = c.customer_id
);
```

Same syntax in:

- SQL Server
- Spark SQL
- Snowflake

---

# Why SELECT 1?

Many beginners ask

```sql
SELECT *
```

or

```sql
SELECT customer_id
```

inside EXISTS.

It doesn't matter.

The database ignores the selected value.

Common convention:

```sql
SELECT 1
```

because it clearly communicates:

> "I only care whether a row exists."

---

# Example

Customers

| customer_id | name |
|--------------|------|
|1|Alice|
|2|Bob|
|3|John|

Accounts

| customer_id |
|--------------|
|1|
|3|

Query

```sql
SELECT
    customer_name
FROM customers c
WHERE EXISTS
(
    SELECT 1
    FROM accounts a
    WHERE a.customer_id = c.customer_id
);
```

Output

```
Alice

John
```

Bob has no account.

---

# Correlated Subquery

Notice

```sql
a.customer_id = c.customer_id
```

The inner query references the outer query.

This is called

```
Correlated Subquery
```

The inner query depends on each row of the outer query.

---

# NOT EXISTS

Return customers without accounts.

```sql
SELECT
    customer_name
FROM customers c
WHERE NOT EXISTS
(
    SELECT 1
    FROM accounts a
    WHERE a.customer_id = c.customer_id
);
```

Output

```
Bob
```

---

# EXISTS vs IN

IN

```sql
WHERE customer_id IN
(
    SELECT customer_id
    FROM accounts
)
```

EXISTS

```sql
WHERE EXISTS
(
    SELECT 1
    FROM accounts a
    WHERE a.customer_id = c.customer_id
)
```

Both often return the same result.

Their execution strategy may differ.

---

# EXISTS vs JOIN

JOIN

```sql
SELECT
c.customer_name,
a.account_number
```

Returns data from both tables.

---

EXISTS

```sql
SELECT
customer_name
```

Returns only rows from the outer table.

EXISTS is a filtering operation.

JOIN combines datasets.

---

# EXISTS vs COUNT(*)

Bad

```sql
WHERE
(
SELECT COUNT(*)
FROM accounts
WHERE ...
) > 0
```

Better

```sql
WHERE EXISTS (...)
```

COUNT may need to count all matching rows.

EXISTS can stop after finding the first match.

---

# Semi Join

Most databases transform EXISTS into

```
Semi Join
```

Conceptually

```
Customers

↓

Accounts

↓

Match Found?

↓

Return Customer
```

The matching account row itself is not returned.

---

# Anti Join

NOT EXISTS often becomes

```
Anti Join
```

Conceptually

```
Customers

↓

Accounts

↓

No Match?

↓

Return Customer
```

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| EXISTS | ✅ | ✅ | ✅ | ✅ |
| NOT EXISTS | ✅ | ✅ | ✅ | ✅ |
| Correlated Subqueries | ✅ | ✅ | ✅ | ✅ |

---

# Dialect Differences

Syntax is standardized.

Differences are mostly in:

- Optimizer rewrites
- Semi-Join implementation
- Distributed execution

---

# Deep Dive

Developers often imagine

```
Outer Row

↓

Run Entire Inner Query

↓

Next Row
```

Modern optimizers frequently rewrite EXISTS into efficient semi-joins.

The logical meaning remains the same, but the physical execution can be very different.

---

# 🔬 Under the Hood

```sql
WHERE EXISTS(...)
```

Conceptually

```
Outer Row

↓

Search Matching Row

↓

Found?

↓

YES

↓

Stop Searching

↓

Return Row
```

Notice

```
Stop Searching
```

This is why EXISTS can be very efficient.

---

# 📊 Execution Plan Notes

Common operators

- Nested Loop (Semi Join)
- Hash Match (Semi Join)
- Merge Join (Semi Join)
- Left Anti Semi Join

Execution plans rarely execute EXISTS literally.

Instead,

they transform it into specialized join operations.

---

# 🧠 Engineering Insight

EXISTS is often preferable when:

- Only existence matters.
- Matching rows may be numerous.
- Large datasets are involved.
- Duplicate values are irrelevant.

---

# 🧩 Design Decisions

| Situation | Recommendation |
|------------|---------------|
| Existence check | EXISTS |
| Exclusion check | NOT EXISTS |
| Return columns from both tables | JOIN |
| Small static lists | IN |

---

# ⚖️ Trade-offs

| Use EXISTS | Use Another Approach |
|-------------|----------------------|
| Existence check | JOIN for combined data |
| Large correlated lookups | IN for short constant lists |
| NULL-safe exclusion | NOT EXISTS instead of NOT IN |

---

# Production Story

A fraud detection pipeline needed to identify customers who had at least one suspicious transaction.

The original implementation used:

```sql
COUNT(*) > 0
```

The query scanned every matching transaction for each customer.

Replacing it with EXISTS allowed the optimizer to stop searching after the first qualifying transaction, reducing execution time significantly.

---

# 🛠 Debugging Lab

Bug

```sql
WHERE customer_id NOT IN
(
SELECT customer_id
FROM accounts
)
```

The subquery contained NULL values.

Result

```
Unexpectedly returned no rows.
```

Rewrite using

```sql
NOT EXISTS
```

Explain why the result changes.

---

# 🔄 Rewrite Challenge

Rewrite

```sql
WHERE customer_id IN
(
SELECT customer_id
FROM accounts
)
```

using

1. EXISTS
2. INNER JOIN
3. LEFT JOIN ... IS NOT NULL

Compare:

- Readability
- Duplicate handling
- Performance considerations
- When each approach is appropriate

---

# Decision Matrix

| Requirement | Best Choice |
|-------------|-------------|
| Check existence | EXISTS |
| Exclude matching rows | NOT EXISTS |
| Return columns from both tables | JOIN |
| Filter by a few constant values | IN |
| Avoid NULL issues during exclusion | NOT EXISTS |

---

# Best Practices

✅ Use EXISTS when checking for existence.

✅ Use NOT EXISTS instead of NOT IN when NULL values are possible.

✅ Use SELECT 1 to communicate intent.

✅ Review execution plans for correlated subqueries.

---

# Common Mistakes

❌ Using COUNT(*) > 0 instead of EXISTS.

❌ Confusing JOIN with EXISTS.

❌ Ignoring correlated predicates.

❌ Using NOT IN when NULL values may exist.

---

# Interview Questions

## Beginner

What does EXISTS do?

---

## Intermediate

What is a correlated subquery?

---

## Senior

Explain EXISTS vs IN.

---

## Senior+

Why can EXISTS outperform COUNT(*) > 0?

---

## Architect

Design an efficient solution to determine whether each customer has placed at least one order in a 50-billion-row transaction table.

---

# Practice Questions

## Easy

Return customers who own at least one account.

---

Return customers without any loans.

---

## Medium

Rewrite an IN query using EXISTS.

---

Rewrite a COUNT(*) > 0 query using EXISTS.

---

## Hard

Explain how a database optimizer transforms EXISTS into a semi-join.

---

Design an efficient ETL validation query to verify that every fact table record has a matching dimension record.

---

# Cheat Sheet

| Requirement | Operator |
|-------------|----------|
| Check existence | EXISTS |
| Check absence | NOT EXISTS |
| Multiple constants | IN |
| Combine tables | JOIN |

---

# Related Chapters

- ✅ Chapter 14 — WHERE Clause
- ✅ Chapter 23 — Comparison Operators
- ✅ Chapter 24 — Logical Operators
- ✅ Chapter 25 — NULL and Three-Valued Logic
- ✅ Chapter 27 — IN Operator
- ▶️ Chapter 30 — ANY and ALL
- ▶️ Part 5 — Joins
- ▶️ Part 12 — Query Optimization

---

# Chapter Summary

- EXISTS checks whether at least one matching row exists.
- NOT EXISTS checks that no matching rows exist.
- EXISTS is commonly implemented as a semi-join.
- NOT EXISTS is commonly implemented as an anti-join.
- EXISTS is often a better choice than COUNT(*) > 0 for existence checks.
- Understanding EXISTS is essential for writing scalable production SQL.

---

# What's Next?

In the next chapter, we'll study **ANY and ALL (Deep Dive)**.

You'll learn:

- ANY vs ALL
- ANY vs IN
- ALL vs MAX/MIN
- Quantified comparisons
- Correlated subqueries
- Optimizer behavior
- Performance considerations
- Real-world production examples