# Chapter 22: SQL Formatting & Enterprise Coding Standards

> **Part:** SQL Query Fundamentals
>
> **Chapter:** 22
>
> **Difficulty:** 🟢 Beginner → 🔴 Architect
>
> **Estimated Reading Time:** 120–180 minutes
>
> **Prerequisites:**
>
> - Entire Part 2
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Concept Card

| Attribute | Value |
|-----------|-------|
| Category | SQL Best Practices |
| Difficulty | 🟢 Beginner → 🔴 Architect |
| Used Daily | ⭐⭐⭐⭐⭐ |
| Interview Frequency | ⭐⭐⭐⭐☆ |
| Production Usage | ⭐⭐⭐⭐⭐ |
| Performance Impact | ⭐☆☆☆☆ |
| ANSI SQL | ✅ |
| SQL Server | ✅ |
| Spark SQL | ✅ |
| Snowflake | ✅ |

---

# Learning Objectives

After completing this chapter, you will be able to:

- Write professional SQL.
- Format SQL consistently.
- Improve readability.
- Create team coding standards.
- Review SQL effectively.
- Build maintainable SQL codebases.

---

# Quick Revision

Good SQL is:

- Correct
- Readable
- Maintainable
- Consistent
- Reviewable

Formatting doesn't change query results.

It changes how easily humans understand the query.

---

# 🧠 Mental Model

Imagine reading two books.

Book A

```
EverythingIsWrittenLikeThisWithoutSpacesOrParagraphs
```

Book B

```
Proper headings

Paragraphs

Lists

Examples
```

Both contain the same information.

Only one is enjoyable to read.

SQL works the same way.

---

# Why Formatting Matters

Developers spend

```
20%

Writing SQL
```

```
80%

Reading SQL
```

Well-formatted SQL reduces:

- Bugs
- Review time
- Maintenance cost

---

# Bad SQL

```sql
select c.customer_name,a.balance from customers c join accounts a on c.customer_id=a.customer_id where a.balance>100000 and c.status='ACTIVE' order by balance desc;
```

---

# Good SQL

```sql
SELECT
    c.customer_name,
    a.balance
FROM customers AS c
INNER JOIN accounts AS a
    ON c.customer_id = a.customer_id
WHERE c.status = 'ACTIVE'
    AND a.balance > 100000
ORDER BY
    a.balance DESC;
```

Both queries return identical results.

Only one is easy to maintain.

---

# Enterprise Formatting Rules

## Rule 1

Keywords

Always uppercase.

Good

```sql
SELECT
FROM
WHERE
```

Bad

```sql
select
from
where
```

---

## Rule 2

One Column Per Line

Good

```sql
SELECT
    customer_id,
    customer_name,
    city
```

Bad

```sql
SELECT customer_id, customer_name, city
```

---

## Rule 3

One JOIN Per Line

Good

```sql
FROM customers AS c

INNER JOIN accounts AS a
```

---

## Rule 4

Indent JOIN Conditions

```sql
INNER JOIN accounts AS a
    ON c.customer_id = a.customer_id
```

---

## Rule 5

Align WHERE Predicates

```sql
WHERE status='ACTIVE'
    AND city='Mumbai'
    AND balance>50000
```

---

## Rule 6

One Logical Block

```
SELECT

FROM

JOIN

WHERE

GROUP BY

HAVING

ORDER BY
```

Separate sections with blank lines.

---

## Rule 7

Meaningful Aliases

Good

```sql
cust

acct

txn
```

Bad

```sql
x

y

z
```

---

# Naming Conventions

Tables

```
customers

accounts

transactions
```

Columns

```
customer_id

account_number

transaction_date
```

Avoid

```
tblCustomer

colName

field1
```

---

# Alias Standards

| Table | Alias |
|--------|-------|
| customers | cust |
| accounts | acct |
| transactions | txn |
| branches | br |
| employees | emp |
| loans | loan |
| cards | card |
| merchants | merch |

Consistency improves readability.

---

# Formatting Complex Queries

Poor

```sql
SELECT ...
```

↓

Hundreds of lines

↓

Impossible to review.

Good

```
Header

↓

CTEs

↓

Main Query

↓

Filters

↓

Ordering
```

Organize queries into logical sections.

---

# SQL File Header

```sql
/*
=====================================================

Project

Script

Author

Purpose

Created

Modified

Dependencies

=====================================================
*/
```

Every production SQL file should begin with this.

---

# Comment Standards

Comment

Business rules

Assumptions

Workarounds

Avoid

```
-- Select customer

SELECT customer
```

The code already explains that.

---

# SQL Compatibility Matrix

Formatting conventions are independent of SQL dialect.

They apply equally to:

- SQL Server
- Spark SQL
- Snowflake
- PostgreSQL

---

# 🧠 Engineering Insight

Formatting doesn't improve execution speed.

It dramatically improves:

- Code reviews.
- Bug fixing.
- Onboarding.
- Knowledge transfer.

---

# Team Style Guide

Every engineering team should define:

- Keyword capitalization.
- Alias conventions.
- Naming standards.
- Join formatting.
- CTE formatting.
- Comment standards.

Consistency matters more than personal preference.

---

# Code Review Checklist

Before merging SQL:

✅ Correct results

✅ Proper formatting

✅ No SELECT *

✅ Meaningful aliases

✅ Comments where needed

✅ Performance reviewed

✅ Execution plan checked

---

# Design Decisions

| Situation | Recommendation |
|------------|---------------|
| Team project | Follow shared style guide |
| Personal scripts | Keep a consistent style |
| Long queries | Break into logical sections |
| Repeated logic | Use CTEs or views |

---

# Production Story

A reporting query exceeded 2,000 lines.

Every developer formatted it differently.

The team introduced a common SQL style guide and automated formatting in their editor.

Code review time dropped noticeably because reviewers could focus on business logic rather than formatting differences.

---

# Best Practices

✅ Use consistent indentation.

✅ Align SQL keywords.

✅ Keep lines reasonably short (for example, under 100–120 characters, depending on your team's standard).

✅ Group related logic.

✅ Make SQL easy to scan.

---

# Common Mistakes

❌ Mixing formatting styles.

❌ Inconsistent aliases.

❌ Random capitalization.

❌ No spacing.

❌ Giant unreadable SELECT lists.

---

# Enterprise SQL Checklist

Before Production

```
✓ Formatting

✓ Naming

✓ Comments

✓ Performance

✓ Security

✓ Readability

✓ Portability

✓ Code Review
```

---

# Interview Questions

## Beginner

Why should SQL be formatted consistently?

---

## Intermediate

What naming conventions would you recommend for SQL projects?

---

## Senior

How do coding standards improve maintainability?

---

## Architect

Design a SQL style guide for a team of 100 Data Engineers working across SQL Server, Spark SQL, and Snowflake.

---

# Practice Questions

## Easy

Format a poorly written query.

---

## Medium

Create alias standards for your team.

---

## Hard

Review a 500-line SQL script and identify formatting improvements.

---

Design a SQL coding standard for an enterprise data platform.

---

# Cheat Sheet

| Rule | Recommendation |
|------|----------------|
| Keywords | UPPERCASE |
| Columns | One per line |
| JOIN | One per line |
| Aliases | Meaningful |
| WHERE | Vertically aligned |
| Comments | Explain why |
| Header | Required in production |

---

# Chapter Summary

- SQL formatting is for humans, not the database.
- Consistent formatting improves readability and maintainability.
- Enterprise teams benefit from shared coding standards.
- Style guides reduce review time and improve collaboration.
- Professional SQL emphasizes clarity as much as correctness.

---

# 🎉 End of Part 2

Congratulations!

You have now mastered the foundations of writing SQL queries.

You understand:

- SELECT
- FROM
- WHERE
- DISTINCT
- ORDER BY
- LIMIT / TOP / FETCH
- Aliases
- Literals
- Expressions
- Operators
- Comments
- Enterprise SQL formatting

These concepts form the basis for everything that follows.

---

# What's Next?

## Part 3 — Data Retrieval

This is where SQL becomes truly powerful.

We'll cover:

Chapter 23 — Comparison Operators Deep Dive

Chapter 24 — Logical Operators Deep Dive

Chapter 25 — NULL and Three-Valued Logic

Chapter 26 — Pattern Matching (LIKE)

Chapter 27 — IN Operator

Chapter 28 — BETWEEN Operator

Chapter 29 — EXISTS

Chapter 30 — ANY and ALL

Chapter 31 — CASE Expression

Chapter 32 — COALESCE, NULLIF & ISNULL

By the end of Part 3, you'll be able to write production-grade filtering logic used in enterprise ETL pipelines, analytics platforms, and large-scale data engineering systems.