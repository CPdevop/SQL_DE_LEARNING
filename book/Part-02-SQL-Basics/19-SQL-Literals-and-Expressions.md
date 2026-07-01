# Chapter 19: SQL Literals and Expressions

> **Part:** SQL Query Fundamentals
>
> **Chapter:** 19
>
> **Difficulty:** 🟢 Beginner → 🟠 Intermediate
>
> **Estimated Reading Time:** 90–120 minutes
>
> **Prerequisites:**
>
> - Chapter 12 – SELECT Clause
> - Chapter 13 – FROM Clause
> - Chapter 18 – Aliases
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Concept Card

| Attribute | Value |
|-----------|-------|
| SQL Category | DQL Foundation |
| Difficulty | 🟢 Beginner |
| Used Daily | ⭐⭐⭐⭐⭐ |
| Interview Frequency | ⭐⭐⭐⭐⭐ |
| Production Usage | ⭐⭐⭐⭐⭐ |
| Performance Impact | ⭐⭐⭐⭐☆ |
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
```

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand SQL literals.
- Understand SQL expressions.
- Differentiate literals from columns.
- Use arithmetic expressions.
- Use string expressions.
- Understand expression evaluation.
- Understand type precedence.
- Avoid implicit conversion issues.

---

# Quick Revision

- Literals are fixed values.
- Expressions produce new values.
- Columns participate in expressions.
- Every calculated column is an expression.

---

# 🧠 Mental Model

Think of cooking.

Ingredients

```
Egg

Milk

Sugar
```

are like literals.

Recipe

```
Egg + Milk + Sugar

↓

Cake
```

is an expression.

Expressions combine values to produce new values.

---

# Business Problem

Suppose a bank stores

```
Balance

GST Rate

Interest Rate
```

The application must calculate

```
Final Balance

Interest Amount

Tax

Net Amount
```

These values don't exist in the table.

SQL computes them using expressions.

---

# What is a Literal?

A literal is a fixed value written directly in SQL.

Examples

```sql
100
```

```sql
'Mumbai'
```

```sql
TRUE
```

```sql
NULL
```

Literals never change unless you edit the SQL statement.

---

# Types of Literals

## Numeric

```sql
100
```

```sql
25.75
```

---

## String

```sql
'Mumbai'
```

```sql
'OpenAI'
```

---

## Date

ANSI SQL

```sql
DATE '2026-01-01'
```

SQL Server commonly uses

```sql
CAST('2026-01-01' AS DATE)
```

or

```sql
CONVERT(DATE,'2026-01-01')
```

Spark SQL

```sql
DATE '2026-01-01'
```

Snowflake

```sql
DATE '2026-01-01'
```

---

## NULL

```sql
NULL
```

Represents an unknown or missing value.

---

## Boolean

Supported directly in PostgreSQL, Spark SQL, and Snowflake.

```sql
TRUE

FALSE
```

SQL Server commonly uses the `BIT` type with values `1` and `0`.

---

# What is an Expression?

An expression combines one or more values and operators to produce a result.

Example

```sql
balance * 1.05
```

The result is calculated for every row.

---

# Expression Components

```
Column

+

Literal

+

Operator

↓

Expression
```

---

# Example 1

Arithmetic

```sql
SELECT

10 + 5;
```

Output

```
15
```

---

# Example 2

Using Columns

```sql
SELECT

balance,

balance + 500

FROM accounts;
```

---

# Example 3

Percentage

```sql
SELECT

balance,

balance * 0.18 AS GST

FROM accounts;
```

---

# Example 4

Concatenation

SQL Server

```sql
SELECT

first_name + ' ' + last_name
```

Spark SQL

```sql
SELECT

concat(first_name,' ',last_name)
```

Snowflake

```sql
SELECT

first_name || ' ' || last_name
```

---

# Example 5

Mixed Expression

```sql
SELECT

(balance + interest)

- charges

AS final_balance

FROM accounts;
```

---

# Operator Precedence

SQL follows precedence rules.

```
()

↓

Unary Operators

↓

* /

↓

+ -

↓

Comparison

↓

NOT

↓

AND

↓

OR
```

Example

```sql
10 + 5 * 2
```

Result

```
20
```

Not

```
30
```

---

# Parentheses

Always improve readability.

Instead of

```sql
salary+bonus-tax
```

Prefer

```sql
(salary + bonus)

- tax
```

---

# Type Precedence

Example

```sql
SELECT

100 + '50'
```

Some databases perform implicit conversion.

Others produce errors.

Always know your database's conversion rules.

---

# Implicit Conversion

Automatic conversion performed by the database.

Example

```
INT

↓

DECIMAL
```

without explicit CAST.

Convenient, but it may impact performance or fail unexpectedly.

---

# Explicit Conversion

Better

```sql
CAST(balance AS DECIMAL(12,2))
```

or

```sql
CONVERT(DECIMAL(12,2),balance)
```

depending on the SQL dialect.

Explicit conversion makes your intent clear.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| Numeric Literals | ✅ | ✅ | ✅ | ✅ |
| String Literals | ✅ | ✅ | ✅ | ✅ |
| Expressions | ✅ | ✅ | ✅ | ✅ |
| CAST | ✅ | ✅ | ✅ | ✅ |

---

# Dialect Differences

| Topic | SQL Server | Spark SQL | Snowflake |
|--------|------------|-----------|------------|
| String Concatenation | `+` | `concat()` | `||` |
| Boolean Literal | BIT (1/0) | TRUE/FALSE | TRUE/FALSE |
| Date Literal | CAST/CONVERT | DATE 'YYYY-MM-DD' | DATE 'YYYY-MM-DD' |

---

# Deep Dive

Every expression is evaluated for every qualifying row.

Suppose

```sql
SELECT

balance * 1.05

FROM accounts;
```

For one million rows,

the multiplication executes one million times.

Simple expressions are inexpensive, but complex expressions can become costly.

---

# 🔬 Under the Hood

```
Read Row

↓

Read balance

↓

Read Literal 1.05

↓

Multiply

↓

Store Temporary Result

↓

Return Output
```

Expressions are evaluated as part of the execution plan.

---

# 📊 Execution Plan Notes

Expressions often appear as:

- Compute Scalar (SQL Server)
- Project (Spark SQL)
- Projection (Snowflake)

Complex expressions may:

- Increase CPU usage.
- Prevent index usage when used inside predicates.
- Require additional type conversions.

---

# 🧠 Engineering Insight

Computed expressions inside the SELECT list are usually inexpensive.

Computed expressions inside the WHERE clause can significantly affect performance.

Example

Good

```sql
WHERE balance > 10000
```

Less optimal

```sql
WHERE balance * 1.18 > 10000
```

Applying functions or arithmetic directly to indexed columns may reduce the optimizer's ability to use indexes efficiently.

---

# 🧩 Design Decisions

| Situation | Recommendation | Reason |
|------------|---------------|--------|
| Repeated calculation | Use an alias | Improves readability |
| Complex business logic | Break into multiple expressions or CTEs | Easier maintenance |
| Financial calculations | Use DECIMAL | Better precision than FLOAT |
| Production code | Prefer explicit CAST | Avoid implicit conversion surprises |

---

# ⚖️ Trade-offs

| Use Expressions | Avoid |
|-----------------|-------|
| Calculated reports | Duplicating business logic everywhere |
| Derived columns | Very complex nested expressions |
| ETL transformations | Hidden implicit conversions |

---

# Production Story

A financial ETL pipeline calculated interest using floating-point arithmetic.

Over millions of rows, small rounding differences accumulated.

Switching the calculations to DECIMAL ensured consistent financial results and matched downstream accounting systems.

---

# Best Practices

✅ Use parentheses.

✅ Use explicit CAST where appropriate.

✅ Prefer DECIMAL for money.

✅ Keep expressions readable.

✅ Reuse aliases when supported.

---

# Common Mistakes

❌ Ignoring operator precedence.

❌ Using FLOAT for financial calculations.

❌ Relying on implicit conversion.

❌ Creating unreadable nested expressions.

---

# Interview Questions

## Beginner

What is a SQL literal?

---

## Intermediate

What is the difference between a literal and an expression?

---

## Senior

How can implicit conversions affect query performance?

---

## Architect

How would you standardize expression and type conversion rules across a multi-team data engineering platform?

---

# Practice Questions

## Easy

Return the value `100`.

---

Return `'Mumbai'`.

---

Calculate `25 * 4`.

---

## Medium

Calculate GST as 18% of `balance`.

---

Concatenate first and last names.

---

## Hard

Explain why financial systems should generally use DECIMAL instead of FLOAT.

---

Identify the performance risks of implicit conversion in a WHERE clause.

---

# Cheat Sheet

| Task | Syntax |
|------|--------|
| Numeric Literal | `100` |
| String Literal | `'Mumbai'` |
| Arithmetic | `salary * 1.10` |
| CAST | `CAST(value AS type)` |

---

# Chapter Summary

- Literals are fixed values.
- Expressions compute new values.
- Expressions combine columns, literals, operators, and functions.
- Operator precedence affects expression results.
- Explicit type conversion improves clarity and portability.
- Well-designed expressions improve both readability and maintainability.

---

# What's Next?

In the next chapter, we'll study **SQL Operators**, where we'll explore:

- Arithmetic operators
- Comparison operators
- Logical operators
- Bitwise operators
- Set operators (overview)
- Operator precedence
- Short-circuit evaluation
- Performance implications
- Real-world production examples