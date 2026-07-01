# Chapter 21: SQL Comments and Documentation

> **Part:** SQL Query Fundamentals
>
> **Chapter:** 21
>
> **Difficulty:** 🟢 Beginner
>
> **Estimated Reading Time:** 45–60 minutes
>
> **Prerequisites:**
>
> - Chapter 11 – Introduction to SQL Queries
> - Chapter 20 – SQL Operators
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Concept Card

| Attribute | Value |
|-----------|-------|
| SQL Category | Documentation |
| Difficulty | 🟢 Beginner |
| Used Daily | ⭐⭐⭐⭐☆ |
| Interview Frequency | ⭐⭐☆☆☆ |
| Production Usage | ⭐⭐⭐⭐⭐ |
| Performance Impact | ⭐☆☆☆☆ |
| ANSI SQL | ✅ |
| SQL Server | ✅ |
| Spark SQL | ✅ |
| Snowflake | ✅ |

---

# Sample Database

```
de_practice
```

---

# Learning Objectives

After completing this chapter, you will be able to:

- Write readable SQL comments.
- Use single-line and multi-line comments.
- Document business logic.
- Follow enterprise documentation standards.
- Avoid common commenting mistakes.
- Write self-documenting SQL.

---

# Quick Revision

- Comments are ignored by the SQL engine.
- Comments help humans understand SQL.
- Good SQL should be readable even without excessive comments.
- Comments explain **why**, not **what**.

---

# 🧠 Mental Model

Imagine opening a book.

Without chapter headings,

the book becomes difficult to understand.

Comments are chapter headings for SQL.

---

# Business Problem

Suppose you inherit a production ETL pipeline.

```
3500 Lines

12 Tables

18 CTEs

9 Business Rules
```

There is no documentation.

Understanding the logic could take days.

Good comments dramatically reduce onboarding time.

---

# What Are SQL Comments?

Comments are text ignored by the SQL engine.

Their purpose is to explain the SQL to people.

They never change query results.

---

# Single-Line Comments

ANSI SQL

```sql
-- Retrieve active customers

SELECT *
FROM customers;
```

---

# Multi-Line Comments

```sql
/*
Daily Customer Load

Purpose:
Load active customers into reporting.

Author:
Data Engineering Team

Last Updated:
2026-07-01
*/

SELECT *
FROM customers;
```

---

# Temporary Debugging

During development

```sql
SELECT *

-- ,email

-- ,phone

FROM customers;
```

Useful when testing queries.

---

# Commenting Business Rules

Bad

```sql
-- Filter rows

WHERE age > 18
```

Good

```sql
-- Customers must be at least 18 years old
-- to satisfy KYC regulations.

WHERE age >= 18
```

Explain **why** the rule exists.

---

# Document Assumptions

Example

```sql
/*
Assumption:

One active account per customer.
Inactive accounts excluded.
*/
```

Future developers immediately understand the expectation.

---

# Document Complex Logic

Example

```sql
/*
Fraud Detection Rule

High Risk

Amount > 500000

AND

International Transaction

AND

Night Hours
*/
```

Much easier to review.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| -- | ✅ | ✅ | ✅ | ✅ |
| /* */ | ✅ | ✅ | ✅ | ✅ |

---

# Dialect Differences

Comments are largely standardized.

Some SQL tools additionally support:

- Region folding
- TODO markers
- IDE annotations

These are editor features, not SQL features.

---

# Deep Dive

Comments are removed during parsing.

```
SQL Text

↓

Remove Comments

↓

Parser

↓

Optimizer

↓

Execution
```

The optimizer never evaluates comments.

---

# 🔬 Under the Hood

```
Read SQL

↓

Strip Comments

↓

Tokenize

↓

Parse

↓

Execute
```

Comments have essentially zero execution cost.

---

# 🧠 Engineering Insight

The best SQL often requires very few comments.

Poor

```sql
-- Select customer_id

SELECT customer_id
```

The comment adds no value.

Good

```sql
-- Exclude dormant accounts because they are archived
-- after 365 days of inactivity.

WHERE account_status = 'ACTIVE'
```

Explain intent, not syntax.

---

# 🧩 Design Decisions

| Situation | Recommendation |
|------------|---------------|
| Complex business rule | Comment |
| Simple SELECT | No comment |
| Temporary workaround | Comment with reason |
| Performance optimization | Explain why |

---

# ⚖️ Trade-offs

| Comment | Avoid |
|---------|------|
| Business rules | Obvious syntax |
| Assumptions | Every line |
| Known limitations | Redundant comments |
| Workarounds | Outdated comments |

---

# Production Story

An ETL pipeline contained

```
CASE

WHEN code='X'

THEN 17
```

Nobody knew why.

Months later,

the original developer explained

```
17

=

Government Compliance Rule
```

One short comment would have prevented hours of investigation.

---

# Enterprise SQL Header

Every production SQL file should begin with a standard header.

```sql
/*
====================================================

Project      : Banking Data Warehouse

Script       : customer_load.sql

Author       : Data Engineering Team

Purpose      : Load active customers

Dependencies : customers, accounts

Created      : YYYY-MM-DD

Modified     : YYYY-MM-DD

====================================================
*/
```

---

# Best Practices

✅ Explain business logic.

✅ Explain assumptions.

✅ Explain workarounds.

✅ Keep comments current.

✅ Prefer readable SQL over excessive comments.

---

# Common Mistakes

❌ Commenting every SQL keyword.

❌ Leaving outdated comments.

❌ Commenting obvious code.

❌ Forgetting to remove debugging comments.

---

# Interview Questions

## Beginner

What are SQL comments?

---

## Intermediate

Why should comments explain "why" instead of "what"?

---

## Senior

How do comments improve maintainability?

---

## Architect

Define documentation standards for enterprise SQL development.

---

# Practice Questions

## Easy

Write a single-line comment.

---

Write a multi-line comment.

---

## Medium

Document a business rule.

---

Create a production SQL file header.

---

## Hard

Review a poorly documented ETL query and identify missing documentation.

---

Design a commenting standard for a data engineering team with 50 developers.

---

# Cheat Sheet

| Task | Syntax |
|------|--------|
| Single Line | `-- comment` |
| Multi Line | `/* comment */` |

---

# Chapter Summary

- Comments improve readability and maintainability.
- Explain business intent rather than obvious syntax.
- Keep comments accurate and up to date.
- Enterprise SQL benefits from standardized file headers.
- Self-documenting SQL should always be the goal.

---

# What's Next?

In the next chapter, we'll complete **Part 2** with one of the most important chapters in the entire book:

**SQL Formatting & Enterprise Coding Standards**

You'll learn:

- Indentation
- Capitalization
- Naming conventions
- Alias conventions
- Line breaks
- Query organization
- CTE formatting
- JOIN formatting
- WHERE formatting
- GROUP BY formatting
- Enterprise SQL style guide
- Code review checklist

This chapter will become the foundation for every SQL example in the rest of the handbook.