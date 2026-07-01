# Chapter 18: Column Aliases and Table Aliases

> **Part:** SQL Query Fundamentals
>
> **Chapter:** 18
>
> **Difficulty:** 🟢 Beginner
>
> **Estimated Reading Time:** 60–90 minutes
>
> **Prerequisites:**
>
> - Chapter 12 – SELECT Clause
> - Chapter 13 – FROM Clause
> - Chapter 17 – LIMIT, TOP, FETCH & OFFSET
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
| Performance Impact | ⭐☆☆☆☆ |
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

branches
```

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand column aliases.
- Understand table aliases.
- Improve SQL readability.
- Use aliases correctly in joins.
- Understand alias scope.
- Apply production naming conventions.

---

# Quick Revision

- Aliases are temporary names.
- Aliases improve readability.
- Aliases do not rename database objects.
- Table aliases become essential when joining multiple tables.

---

# 🧠 Mental Model

Imagine your friend is named

```
Alexander Jonathan Williams
```

Most people simply call him

```
Alex
```

The person's name hasn't changed.

Only a shorter name is used.

SQL aliases work exactly the same way.

---

# Business Problem

Consider this query.

```sql
SELECT

customers.customer_name,

customers.customer_email,

customers.customer_phone

FROM customers;
```

Now imagine a query with six joined tables.

The SQL quickly becomes difficult to read.

Aliases solve this problem.

---

# What Is an Alias?

An alias is a temporary name assigned to a column, table, or expression during query execution.

Aliases exist only for the duration of the query.

They do not modify the database schema.

---

# Column Aliases

Without alias

```sql
SELECT

customer_name

FROM customers;
```

Output

```
customer_name
```

---

With alias

```sql
SELECT

customer_name AS CustomerName

FROM customers;
```

Output

```
CustomerName
```

Only the column heading changes.

---

# Is AS Required?

ANSI SQL

```sql
SELECT

customer_name AS CustomerName
```

Also valid

```sql
SELECT

customer_name CustomerName
```

Using `AS` is optional in most SQL dialects, but many teams prefer it because it improves readability.

---

# Table Aliases

Without alias

```sql
SELECT

customers.customer_name

FROM customers;
```

---

With alias

```sql
SELECT

c.customer_name

FROM customers AS c;
```

Much cleaner.

---

# Multiple Table Aliases

```sql
SELECT

c.customer_name,

a.account_number

FROM customers AS c

JOIN accounts AS a

ON c.customer_id = a.customer_id;
```

Notice how much easier the query is to read.

---

# Alias Scope

Aliases exist only inside the query.

This is valid

```sql
SELECT

customer_name AS Name

FROM customers;
```

After the query finishes,

```
Name
```

no longer exists.

---

# Aliases and ORDER BY

Valid

```sql
SELECT

balance AS AccountBalance

FROM accounts

ORDER BY AccountBalance DESC;
```

Because ORDER BY executes after SELECT.

---

# Aliases and WHERE

Incorrect

```sql
SELECT

balance AS AccountBalance

FROM accounts

WHERE AccountBalance > 1000;
```

Why?

Logical execution order.

```
FROM

↓

WHERE

↓

SELECT
```

The alias hasn't been created when WHERE executes.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| Column Alias | ✅ | ✅ | ✅ | ✅ |
| Table Alias | ✅ | ✅ | ✅ | ✅ |
| AS Keyword | Optional | Optional | Optional | Optional |

---

# Deep Dive

Internally,

```sql
SELECT

balance AS AccountBalance
```

does not rename the column in the table.

The database simply changes the column name in the result metadata returned to the client.

The stored table definition remains unchanged.

---

# 🔬 Under the Hood

Example

```sql
SELECT

customer_name AS Customer

FROM customers;
```

Internally

```
Read Table

↓

Project Column

↓

Rename Output Metadata

↓

Return Result
```

The underlying data is untouched.

---

# 📊 Execution Plan Notes

Aliases have virtually no impact on execution plans.

Whether you write:

```sql
SELECT customer_name
```

or

```sql
SELECT customer_name AS Customer
```

the optimizer generates the same execution plan.

Aliases affect readability, not performance.

---

# 🧠 Engineering Insight

Good aliases reduce cognitive load.

Compare

```sql
SELECT

c.customer_name,

a.account_number,

t.transaction_amount
```

versus

```sql
SELECT

customers.customer_name,

accounts.account_number,

transactions.transaction_amount
```

On large queries, concise and meaningful aliases make SQL much easier to understand.

---

# 🧩 Design Decisions

| Situation | Recommendation | Reason |
|------------|---------------|--------|
| Single table | Alias optional | Readability is already good |
| Two or more tables | Use aliases | Shorter and clearer SQL |
| Self Join | Mandatory aliases | Avoid ambiguity |
| Production ETL | Meaningful aliases (`cust`, `acct`, `txn`) | Easier maintenance |

---

# Production Story

A financial reporting query joined eight tables.

Without aliases, every column reference used fully qualified table names, making the query difficult to review.

Introducing consistent aliases (`cust`, `acct`, `txn`, `br`) reduced the query length significantly and made code reviews much easier without changing the execution plan.

---

# Best Practices

✅ Use meaningful aliases.

✅ Keep aliases consistent across your project.

✅ Use `AS` for column aliases unless your team's style guide says otherwise.

✅ Use short but descriptive table aliases.

---

# Common Mistakes

❌ Using aliases like

```text
x

y

z
```

❌ Reusing the same alias for different tables.

❌ Expecting aliases to exist outside the query.

❌ Using SELECT aliases inside WHERE.

---

# Interview Questions

## Beginner

What is a column alias?

---

## Intermediate

Why doesn't this query work?

```sql
SELECT

salary AS s

FROM employees

WHERE s > 50000;
```

---

## Senior

Do aliases affect execution plans?

Explain.

---

## Architect

How would you define alias naming conventions for a large analytics engineering team?

---

# Practice Questions

## Easy

Rename `customer_name` to `CustomerName`.

---

Assign alias `c` to `customers`.

---

## Medium

Write a query using aliases for both `customers` and `accounts`.

---

Use an alias in ORDER BY.

---

## Hard

Explain why aliases improve maintainability in large ETL pipelines.

---

Design an alias naming convention for a project with 100+ SQL scripts.

---

# Cheat Sheet

| Task | Syntax |
|------|--------|
| Column Alias | `column AS alias` |
| Table Alias | `table AS t` |
| ORDER BY Alias | `ORDER BY alias` |

---

# Chapter Summary

- Aliases are temporary names used within a query.
- Column aliases improve result readability.
- Table aliases simplify complex queries.
- Aliases do not modify database objects.
- Aliases generally do not affect performance but greatly improve maintainability.
- Consistent alias naming is a hallmark of production-quality SQL.

---

# What's Next?

In the next chapter, we'll study **SQL Literals and Expressions**.

You'll learn:

- Numeric literals
- String literals
- Date and time literals
- Boolean values
- NULL literals
- Arithmetic expressions
- String concatenation
- Expression evaluation
- Type precedence
- Implicit and explicit conversions
- Production best practices