# Chapter 8: SQL Written Order vs Logical Execution Order vs Physical Execution Order

> **Part:** SQL Foundations
>
> **Chapter:** 8
>
> **Difficulty:** 🟡 Intermediate
>
> **Estimated Reading Time:** 60–90 minutes
>
> **Prerequisites:**
>
> - Chapter 1 – What is SQL?
> - Chapter 2 – Relational Databases
> - Chapter 3 – Database Architecture
> - Chapter 7 – SQL Categories
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Learning Objectives

After completing this chapter, you will be able to:

- Explain the three different SQL execution orders.
- Distinguish between written, logical, and physical execution.
- Explain why SQL is written differently from how it executes.
- Understand why aliases cannot usually be referenced in the WHERE clause.
- Understand how the optimizer changes execution.
- Read SQL queries with an execution mindset.

---

# Quick Revision

- SQL is written in one order.
- SQL is logically processed in another order.
- The optimizer may physically execute it differently.
- Logical execution is defined by SQL semantics.
- Physical execution is chosen by the query optimizer.

---

# 🧠 Mental Model

Imagine ordering food at a restaurant.

You tell the waiter:

```
Dessert

↓

Main Course

↓

Starter
```

But the kitchen prepares it like this:

```
Starter

↓

Main Course

↓

Dessert
```

Likewise...

You write SQL one way.

The database processes it another way.

---

# The Three Orders

Many developers think SQL has only one execution order.

In reality, SQL has **three different perspectives**.

```
SQL

│

├── Written Order
│
├── Logical Execution Order
│
└── Physical Execution Order
```

Understanding the difference is one of the biggest milestones in becoming an advanced SQL developer.

---

# 1. Written Order

This is the order developers write SQL.

```sql
SELECT

FROM

JOIN

WHERE

GROUP BY

HAVING

ORDER BY

LIMIT
```

This order is designed to be readable.

It is **not** the order in which the database logically processes the query.

---

# Example Query

```sql
SELECT
    department,
    AVG(salary) AS avg_salary
FROM employees
WHERE salary > 50000
GROUP BY department
HAVING AVG(salary) > 70000
ORDER BY avg_salary DESC;
```

At first glance, it appears that SELECT executes first.

It does not.

---

# 2. Logical Execution Order

The SQL language defines the logical processing order as follows:

```
FROM

↓

JOIN

↓

ON

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

↓

LIMIT / TOP / FETCH
```

This explains many behaviors that surprise beginners.

---

# Step-by-Step Logical Execution

## Step 1 — FROM

The database identifies the source tables.

```
employees
```

---

## Step 2 — JOIN

Any required joins are performed.

---

## Step 3 — ON

Join conditions are applied.

---

## Step 4 — WHERE

Rows are filtered.

Only employees with salaries above 50,000 remain.

---

## Step 5 — GROUP BY

Rows are grouped by department.

---

## Step 6 — HAVING

Groups are filtered.

Departments with average salaries below 70,000 are removed.

---

## Step 7 — SELECT

Only now are the requested columns calculated and returned.

Aliases such as `avg_salary` become available.

---

## Step 8 — DISTINCT

Duplicate rows are removed if requested.

---

## Step 9 — ORDER BY

Rows are sorted.

---

## Step 10 — LIMIT

Only the requested number of rows is returned.

---

# Why Doesn't This Work?

```sql
SELECT
    salary AS s
FROM employees
WHERE s > 50000;
```

Error.

Why?

Because...

```
FROM

↓

WHERE

↓

SELECT
```

The alias `s` does not exist when the WHERE clause executes.

---

# Correct Version

```sql
SELECT
    salary AS s
FROM employees
WHERE salary > 50000;
```

---

# Visual Execution Flow

```
SQL Query

↓

FROM

↓

JOIN

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

↓

LIMIT
```

This is the logical execution order that every SQL developer should know.

---

# 3. Physical Execution Order

Now comes the interesting part.

The optimizer is free to change the execution strategy.

For example...

Logical Order

```
FROM

↓

WHERE

↓

JOIN
```

Actual Execution

```
Index Seek

↓

Filter

↓

Hash Join

↓

Parallel Aggregate

↓

Sort
```

The physical plan is chosen based on:

- Statistics
- Available indexes
- Table size
- Estimated cost
- Join algorithms
- Available memory

---

# 🧠 Engineering Insight

Many interview candidates memorize the logical order.

Experienced engineers go one step further.

They ask:

- Is the optimizer using an index?
- Is the join being broadcast?
- Is the query parallelized?
- Is predicate pushdown happening?

Execution order is only the beginning.

Optimization is the real goal.

---

# SQL Compatibility Matrix

| Concept | ANSI | SQL Server | PostgreSQL | Spark SQL | Snowflake |
|----------|:----:|:----------:|:----------:|:---------:|:---------:|
| Logical Execution Order | ✅ | ✅ | ✅ | ✅ | ✅ |
| Physical Optimization | ✅ | ✅ | ✅ | ✅ | ✅ |

The logical order is part of SQL semantics.

The physical execution strategy differs between database engines.

---

# Deep Dive

Why was SQL designed this way?

Because SQL is declarative.

Users describe the result they want.

The database determines how to produce that result.

If SQL executed strictly from top to bottom, optimization opportunities would be severely limited.

Separating logical semantics from physical execution allows the optimizer to choose more efficient strategies.

---

# 🔬 Under the Hood

Suppose you execute:

```sql
SELECT *
FROM customers
WHERE customer_id = 100;
```

The database may perform the following internal operations:

```
Receive SQL

↓

Parse

↓

Validate

↓

Create Logical Plan

↓

Estimate Costs

↓

Choose Index Seek

↓

Read Pages

↓

Return Result
```

Notice that it never simply "runs the query from top to bottom."

---

# Production Perspective

Understanding execution order helps explain:

- Why aliases fail in WHERE.
- Why HAVING exists.
- Why filters should be applied as early as possible.
- Why query plans matter.

This knowledge is essential for debugging slow SQL queries.

---

# Common Misconceptions

### "SELECT executes first."

Incorrect.

SELECT is processed after FROM, WHERE, GROUP BY, and HAVING.

---

### "The database always follows the logical order."

Incorrect.

The logical order defines semantics.

The optimizer may physically execute operations differently.

---

### "ORDER BY happens before SELECT."

Incorrect.

ORDER BY is evaluated after SELECT.

---

# Knowledge Check

## 🟢 Recall

1. What are the three SQL execution orders?
2. Which clause executes logically first?
3. Which clause executes logically last?

---

## 🟡 Understanding

1. Why can't aliases usually be used in WHERE?
2. Why is SQL written differently from how it is logically processed?

---

## 🟠 Application

Given the following query:

```sql
SELECT department,
       COUNT(*) AS total
FROM employees
WHERE salary > 50000
GROUP BY department
HAVING COUNT(*) > 10
ORDER BY total DESC;
```

List the logical execution order step by step.

---

## 🔴 Architect Challenge

A query runs slowly on a table containing one billion rows.

Would understanding logical execution order alone be enough to optimize it?

Explain what additional information you would need.

---

# Interview Corner

### Beginner

What is the logical execution order of a SQL query?

---

### Intermediate

Why does this query fail?

```sql
SELECT salary AS s
FROM employees
WHERE s > 50000;
```

---

### Senior

Explain the difference between logical execution order and physical execution order.

---

### Architect

How does the query optimizer change the physical execution plan while still preserving SQL semantics?

---

# Chapter Summary

- SQL has three important perspectives: written order, logical execution order, and physical execution order.
- Developers write SQL in a readable order.
- The SQL language defines a logical processing order.
- The query optimizer may choose a completely different physical execution strategy.
- Understanding all three perspectives is essential for writing efficient SQL and interpreting execution plans.

---

# What's Next?

In the next chapter, we'll explore **How a Database Executes a SQL Query**.

We'll follow a query from the moment you press **Execute** until the results appear on your screen.

You'll learn about:

- Parser
- Lexer
- Semantic Analyzer
- Query Optimizer
- Cost-Based Optimizer (CBO)
- Execution Engine
- Storage Engine
- Buffer Manager
- Result Set Generation

This chapter will connect everything we've learned so far and prepare us for advanced SQL optimization.
