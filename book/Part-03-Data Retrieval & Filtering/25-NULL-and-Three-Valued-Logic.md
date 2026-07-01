# Chapter 25: NULL and Three-Valued Logic (Deep Dive)

> **Part:** Data Retrieval & Filtering
>
> **Chapter:** 25
>
> **Difficulty:** 🟢 Beginner → 🔴 Architect
>
> **Estimated Reading Time:** 150–180 minutes
>
> **Prerequisites:**
>
> - Chapter 14 – WHERE Clause
> - Chapter 23 – Comparison Operators
> - Chapter 24 – Logical Operators
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

- Understand what NULL really means.
- Explain Three-Valued Logic.
- Compare NULL safely.
- Understand NULL propagation.
- Understand NULL in joins.
- Understand NULL in aggregates.
- Avoid production bugs.

---

# Quick Revision

NULL is **not**

- Zero
- Empty string
- False
- Blank

NULL means

> Unknown

or

> Missing

Everything else in this chapter follows from that one idea.

---

# 🧠 Mental Model

Imagine filling out a loan application.

```
Name

Age

Income

PAN Number
```

The applicant leaves PAN blank.

Does it mean

```
PAN = ""
```

No.

Does it mean

```
PAN = 0
```

No.

It means

```
We don't know.
```

That is SQL NULL.

---

# Business Problem

Customer Table

| Customer | Phone |
|----------|--------|
| Alice | NULL |
| Bob | 9876543210 |
| John | NULL |

Manager asks

> Show customers without phone numbers.

Many beginners write

```sql
WHERE phone = NULL
```

Returns

```
No Rows
```

Why?

This chapter explains exactly why.

---

# What is NULL?

NULL represents

- Unknown value
- Missing value
- Not applicable
- Not yet entered

It does **not** represent a specific value.

Think of NULL as

> "Information unavailable."

---

# Common Misconceptions

| Incorrect | Correct |
|------------|----------|
| NULL = 0 | ❌ |
| NULL = '' | ❌ |
| NULL = FALSE | ❌ |
| NULL = Unknown | ✅ |

---

# Three-Valued Logic

Programming languages usually use

```
TRUE

FALSE
```

SQL uses

```
TRUE

FALSE

UNKNOWN
```

UNKNOWN exists because of NULL.

---

# Example

```sql
SELECT *
FROM customers
WHERE phone = NULL;
```

Evaluation

```
phone = NULL

↓

UNKNOWN
```

WHERE only returns rows where the predicate evaluates to TRUE.

UNKNOWN rows are filtered out.

---

# Correct Way

```sql
SELECT *
FROM customers
WHERE phone IS NULL;
```

---

# IS NOT NULL

```sql
SELECT *
FROM customers
WHERE phone IS NOT NULL;
```

---

# Comparison Truth Table

| Expression | Result |
|------------|--------|
| 10 = 10 | TRUE |
| 10 = 20 | FALSE |
| 10 = NULL | UNKNOWN |
| NULL = NULL | UNKNOWN |
| NULL <> NULL | UNKNOWN |

This surprises almost everyone the first time they learn SQL.

---

# NULL Propagation

Most expressions involving NULL produce NULL.

Example

```sql
SELECT

salary + NULL
```

Result

```
NULL
```

Another

```sql
100 * NULL
```

↓

```
NULL
```

Unknown plus anything is still unknown.

---

# Logical Operators with NULL

TRUE AND UNKNOWN

↓

UNKNOWN

FALSE AND UNKNOWN

↓

FALSE

TRUE OR UNKNOWN

↓

TRUE

FALSE OR UNKNOWN

↓

UNKNOWN

Understanding these rules explains many confusing query results.

---

# WHERE Clause

Remember

```
WHERE

↓

Only TRUE survives.
```

Rows evaluating to

```
FALSE

or

UNKNOWN
```

are discarded.

---

# NULL in Aggregate Functions

Suppose

| Salary |
|----------|
|100|
|200|
|NULL|

Query

```sql
SELECT AVG(salary)
FROM employees;
```

Average

```
150
```

The NULL value is ignored.

---

# COUNT(*)

Counts rows.

```sql
COUNT(*)
```

Result

```
3
```

---

# COUNT(column)

Counts non-NULL values.

```sql
COUNT(phone)
```

Result

```
1
```

---

# COUNT(DISTINCT)

Also ignores NULL values in most SQL implementations.

---

# NULL in ORDER BY

Different databases sort NULL differently.

ANSI SQL allows

```sql
ORDER BY phone NULLS FIRST
```

or

```sql
NULLS LAST
```

Not every database supports this syntax directly.

---

# NULL in JOIN

Suppose

Customer

```
CustomerID

Phone=NULL
```

Joining

```
phone = phone
```

does not match because

```
NULL = NULL

↓

UNKNOWN
```

This explains many unexpected join results.

---

# COALESCE Preview

Replace NULL.

```sql
SELECT

COALESCE(phone,'Not Available')
```

We'll study COALESCE in detail later.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| IS NULL | ✅ | ✅ | ✅ | ✅ |
| IS NOT NULL | ✅ | ✅ | ✅ | ✅ |
| COALESCE | ✅ | ✅ | ✅ | ✅ |

---

# Dialect Differences

| Feature | SQL Server | Spark | Snowflake |
|----------|------------|--------|------------|
| ISNULL() | ✅ | ❌ | ❌ |
| COALESCE() | ✅ | ✅ | ✅ |
| NVL() | ❌ | ❌ | Compatibility support in some contexts |

For portable SQL, prefer **COALESCE()**.

---

# Deep Dive

Internally

```sql
WHERE phone IS NULL
```

does not compare values.

Instead,

the database checks the NULL marker stored with each row.

Conceptually:

```
Read Row

↓

Check NULL Flag

↓

TRUE/FALSE

↓

Return Row
```

The exact storage implementation varies by database engine.

---

# 🔬 Under the Hood

```
Read Data Page

↓

Read NULL Bitmap / Metadata

↓

Evaluate Predicate

↓

Return Matching Rows
```

Most database engines maintain metadata indicating whether a column value is NULL.

---

# 📊 Execution Plan Notes

Good

```sql
WHERE phone IS NULL
```

Can often use an index if the database indexes NULL values.

Some databases and index types treat NULL values differently, so behavior varies.

Review execution plans rather than assuming index usage.

---

# 🧠 Engineering Insight

Never write

```sql
WHERE column = NULL
```

Never write

```sql
WHERE column <> NULL
```

Always use

```sql
IS NULL

IS NOT NULL
```

This is one of the most common SQL interview questions.

---

# 🧩 Design Decisions

| Situation | Recommendation |
|------------|---------------|
| Missing value check | IS NULL |
| Default display value | COALESCE |
| Count rows | COUNT(*) |
| Count populated values | COUNT(column) |

---

# ⚖️ Trade-offs

| Use | Instead of |
|------|------------|
| IS NULL | = NULL |
| IS NOT NULL | <> NULL |
| COALESCE | Vendor-specific functions when portability matters |

---

# Production Story

A healthcare ETL pipeline attempted to identify patients with missing insurance IDs.

The original query used:

```sql
WHERE insurance_id = NULL
```

No rows were returned, so thousands of incomplete records were skipped.

Changing the predicate to:

```sql
WHERE insurance_id IS NULL
```

correctly identified all missing records and prevented downstream processing errors.

---

# Testing Your Logic

Given:

| ID | Phone |
|----|--------|
|1|NULL|
|2|9999999999|
|3|NULL|

Predict the result:

```sql
SELECT *
FROM customers
WHERE phone = NULL;
```

**Answer:** No rows.

Now predict:

```sql
SELECT *
FROM customers
WHERE phone IS NULL;
```

**Answer:** Rows 1 and 3.

---

# Best Practices

✅ Use IS NULL and IS NOT NULL.

✅ Prefer COALESCE for portable NULL replacement.

✅ Understand UNKNOWN.

✅ Test NULL behavior explicitly.

---

# Common Mistakes

❌ Comparing NULL with `=`.

❌ Assuming NULL equals an empty string.

❌ Forgetting aggregates ignore NULL values.

❌ Ignoring NULL behavior in JOIN conditions.

---

# Interview Questions

## Beginner

What is NULL?

---

## Intermediate

Why does `WHERE column = NULL` return no rows?

---

## Senior

How do aggregate functions handle NULL values?

---

## Architect

Design a data quality strategy for handling NULL values across an enterprise data warehouse.

---

# Practice Questions

## Easy

Find customers with missing email addresses.

---

Find customers whose phone numbers are present.

---

## Medium

Compare `COUNT(*)` and `COUNT(email)`.

---

Predict the output of expressions involving NULL.

---

## Hard

Explain why `NULL = NULL` evaluates to UNKNOWN.

---

Design a strategy for handling NULL values consistently across ETL pipelines, reporting systems, and APIs.

---

# Cheat Sheet

| Task | Syntax |
|------|--------|
| Check NULL | `IS NULL` |
| Check NOT NULL | `IS NOT NULL` |
| Replace NULL | `COALESCE()` |
| Count All Rows | `COUNT(*)` |
| Count Non-NULL Values | `COUNT(column)` |

---

# Chapter Summary

- NULL represents unknown or missing information.
- SQL uses three-valued logic: TRUE, FALSE, and UNKNOWN.
- Always use `IS NULL` and `IS NOT NULL` for NULL comparisons.
- Aggregate functions generally ignore NULL values (except `COUNT(*)`, which counts rows).
- NULL handling is essential for writing correct and reliable SQL.

---

# What's Next?

In the next chapter, we'll study **LIKE and Pattern Matching (Deep Dive)**.

You'll learn:

- `%` wildcard
- `_` wildcard
- ESCAPE characters
- Case sensitivity
- Collations
- Index usage
- Performance tuning
- Regular expression alternatives
- Production search strategies