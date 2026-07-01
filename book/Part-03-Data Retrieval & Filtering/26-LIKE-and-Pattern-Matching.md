# Chapter 26: LIKE and Pattern Matching (Deep Dive)

> **Part:** Data Retrieval & Filtering
>
> **Chapter:** 26
>
> **Difficulty:** 🟢 Beginner → 🔴 Architect
>
> **Estimated Reading Time:** 120–150 minutes
>
> **Prerequisites:**
>
> - Chapter 14 – WHERE Clause
> - Chapter 23 – Comparison Operators
> - Chapter 25 – NULL and Three-Valued Logic
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

- Understand pattern matching.
- Use `%` and `_` wildcards.
- Escape wildcard characters.
- Understand case sensitivity.
- Optimize LIKE queries.
- Understand index behavior.
- Know when LIKE is not the right tool.

---

# Quick Revision

LIKE performs pattern matching.

Unlike `=`, it does not require an exact match.

---

# 🧠 Mental Model

Imagine searching your phone contacts.

You type

```
Raj
```

Results

```
Raj

Rajesh

Rajat

Rajiv
```

You didn't type the complete name.

You searched by a **pattern**.

LIKE works exactly the same way.

---

# Business Problem

Suppose an e-commerce company stores

```
5 Million Products
```

Users search

```
iPhone

Galaxy

Laptop

Sony
```

Exact matching isn't enough.

Pattern matching becomes essential.

---

# What is LIKE?

LIKE compares a string against a pattern.

Instead of asking

```
Is this exactly equal?
```

it asks

```
Does this text match this pattern?
```

---

# Syntax

ANSI SQL

```sql
SELECT columns
FROM table
WHERE column LIKE pattern;
```

The syntax is identical across SQL Server, Spark SQL, and Snowflake.

---

# Wildcard Characters

| Wildcard | Meaning |
|----------|---------|
| % | Zero or more characters |
| _ | Exactly one character |

These two symbols are the foundation of LIKE.

---

# Example 1 — Starts With

```sql
SELECT
    customer_name
FROM customers
WHERE customer_name LIKE 'A%';
```

Matches

```
Alice

Amit

Anita

Andrew
```

---

# Example 2 — Ends With

```sql
WHERE customer_name LIKE '%son';
```

Matches

```
Johnson

Anderson

Wilson
```

---

# Example 3 — Contains

```sql
WHERE customer_name LIKE '%mit%';
```

Matches

```
Amit

Smith

Amitabh
```

---

# Example 4 — Single Character

```sql
WHERE customer_name LIKE 'J_n';
```

Matches

```
Jan

Jen

Jon
```

Does not match

```
John
```

because `_` represents exactly one character.

---

# Multiple Wildcards

```sql
LIKE 'A__%'
```

Meaning

```
Starts with A

↓

Next two characters can be anything

↓

Remaining characters optional
```

---

# Escaping Wildcards

Suppose the data contains

```
50%
```

Searching

```sql
LIKE '50%'
```

matches many values.

Instead

ANSI SQL

```sql
WHERE discount LIKE '50\%' ESCAPE '\';
```

The escape character tells SQL to treat `%` as a literal character.

Support and syntax can vary slightly by database.

---

# NOT LIKE

Find customers whose names do not start with A.

```sql
SELECT
    customer_name
FROM customers
WHERE customer_name NOT LIKE 'A%';
```

---

# LIKE vs =

```sql
WHERE city = 'Mumbai'
```

Requires an exact match.

```sql
WHERE city LIKE 'Mum%'
```

Matches any value beginning with "Mum".

Use `=` when you need exact equality.

Use `LIKE` when you need pattern matching.

---

# Case Sensitivity

Case sensitivity depends on:

- Database
- Collation
- Configuration

Example

```sql
LIKE 'john%'
```

may or may not match

```
John

JOHN

john
```

Always verify the behavior of your database.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| LIKE | ✅ | ✅ | ✅ | ✅ |
| NOT LIKE | ✅ | ✅ | ✅ | ✅ |
| ESCAPE | ✅ | ✅ | ✅ | ✅ |

---

# Dialect Differences

| Feature | SQL Server | Spark SQL | Snowflake |
|----------|------------|-----------|------------|
| Case Sensitivity | Collation Dependent | Configuration Dependent | Collation/Configuration Dependent |
| ESCAPE | Supported | Supported | Supported |

---

# Deep Dive

Pattern matching is not always efficient.

These two queries behave differently.

Good

```sql
WHERE customer_name LIKE 'A%'
```

Less Efficient

```sql
WHERE customer_name LIKE '%A'
```

Why?

The first query may allow an index to be used because the beginning of the string is known.

The second query generally requires examining far more values because the pattern starts with a wildcard.

---

# 🔬 Under the Hood

```sql
WHERE customer_name LIKE 'A%'
```

Conceptually

```
Read Index

↓

Find Values Beginning With A

↓

Return Matches
```

---

```sql
LIKE '%A%'
```

Conceptually

```
Read Each Candidate Value

↓

Check Pattern

↓

Return Matches
```

The exact implementation depends on the database and available indexes.

---

# 📊 Execution Plan Notes

Possible operators include

- Index Seek
- Index Scan
- Table Scan
- Filter

Leading wildcards (`%abc`) often reduce the optimizer's ability to use a standard B-tree index efficiently.

---

# 🧠 Engineering Insight

Avoid

```sql
LIKE '%customer%'
```

on massive tables if performance matters.

Consider

- Full-text search
- Search indexes
- Dedicated search engines (for example, Elasticsearch or OpenSearch)
- Trigram or specialized indexes (database dependent)

Choose the tool that matches the search requirement.

---

# 🧩 Design Decisions

| Situation | Recommendation |
|------------|---------------|
| Starts with | LIKE 'A%' |
| Ends with | LIKE '%A' |
| Contains | LIKE '%ABC%' |
| Exact value | = |

---

# ⚖️ Trade-offs

| Use LIKE | Use Another Approach |
|-----------|---------------------|
| Prefix search | Exact equality (`=`) |
| Simple search | Full-text search |
| Small datasets | Large text search systems |
| Ad hoc filtering | Dedicated search engines |

---

# Production Story

A customer support application searched millions of customer names using

```sql
LIKE '%john%'
```

As the dataset grew, response times increased significantly.

The team introduced a dedicated search solution for free-text lookups while retaining LIKE for smaller administrative queries.

---

# 🛠 Debugging Lab

Bug

```sql
SELECT *
FROM customers
WHERE customer_name LIKE 'A_';
```

Expected

```
Alice

Amit
```

Actual

```
No Alice
```

Why?

`_`

matches

```
Exactly One Character
```

"Alice" contains more than two characters.

Correct pattern

```sql
LIKE 'A%'
```

---

# Best Practices

✅ Use `=` for exact matches.

✅ Use LIKE only when pattern matching is required.

✅ Prefer prefix searches over leading wildcard searches when possible.

✅ Test case sensitivity on your target platform.

---

# Common Mistakes

❌ Confusing `%` and `_`.

❌ Using LIKE for exact equality.

❌ Expecting LIKE to ignore case on every database.

❌ Using leading wildcards on very large tables without understanding the performance implications.

---

# Interview Questions

## Beginner

What is the difference between `%` and `_`?

---

## Intermediate

Why is

```sql
LIKE '%abc'
```

often slower than

```sql
LIKE 'abc%'
```

---

## Senior

How does LIKE interact with indexes?

---

## Architect

Design a scalable search strategy for an application storing one billion customer names.

---

# Practice Questions

## Easy

Find customers whose names start with "S".

---

Find cities ending with "pur".

---

## Medium

Find product names containing "Pro".

---

Find names matching the pattern `A__`.

---

## Hard

Explain why leading wildcards often reduce index efficiency.

---

Recommend an alternative architecture for large-scale free-text search.

---

# Cheat Sheet

| Pattern | Meaning |
|---------|---------|
| `A%` | Starts with A |
| `%A` | Ends with A |
| `%A%` | Contains A |
| `_` | Exactly one character |

---

# Chapter Summary

- LIKE performs pattern matching rather than exact comparison.
- `%` matches zero or more characters.
- `_` matches exactly one character.
- Prefix searches are generally more index-friendly than leading wildcard searches.
- LIKE is suitable for simple pattern matching but is not a replacement for full-text search.

---

# What's Next?

In the next chapter, we'll study the **IN Operator (Deep Dive)**.

You'll learn:

- IN vs OR
- Multi-value filtering
- IN with subqueries
- NOT IN pitfalls
- NULL behavior
- Optimizer behavior
- Performance tuning
- Real-world production examples