# Chapter 20: SQL Operators

> **Part:** SQL Query Fundamentals
>
> **Chapter:** 20
>
> **Difficulty:** 🟢 Beginner → 🔴 Advanced
>
> **Estimated Reading Time:** 120–150 minutes
>
> **Prerequisites:**
>
> - Chapter 12 – SELECT Clause
> - Chapter 14 – WHERE Clause
> - Chapter 19 – SQL Literals and Expressions
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Concept Card

| Attribute | Value |
|-----------|-------|
| SQL Category | SQL Foundation |
| Difficulty | 🟢 Beginner → 🔴 Advanced |
| Used Daily | ⭐⭐⭐⭐⭐ |
| Interview Frequency | ⭐⭐⭐⭐⭐ |
| Production Usage | ⭐⭐⭐⭐⭐ |
| Performance Impact | ⭐⭐⭐⭐⭐ |
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

loans
```

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand every major SQL operator.
- Distinguish different operator categories.
- Understand operator precedence.
- Write complex predicates.
- Avoid common logical mistakes.
- Understand optimizer behavior with operators.

---

# Quick Revision

- Operators perform calculations and comparisons.
- SQL contains several categories of operators.
- Different operators have different precedence.
- Efficient operator usage improves readability and performance.

---

# 🧠 Mental Model

Think of operators as **verbs** in a sentence.

Values are nouns.

Operators describe the relationship between them.

```
100

>

50
```

Without operators

```
100

50
```

has no meaning.

Operators create meaning.

---

# Business Problem

Suppose a bank wants to identify:

- Customers with balances greater than ₹100,000
- Loans between ₹5 lakh and ₹20 lakh
- Transactions not originating from Mumbai
- Accounts that are active **and** verified

Every one of these business rules depends on SQL operators.

---

# What is an Operator?

An operator is a symbol or keyword that tells SQL to perform an operation on one or more values.

Examples:

```sql
+

-

*

/

=
```

```sql
>

<

>=

<=
```

```sql
AND

OR

NOT
```

---

# Types of SQL Operators

```
SQL Operators

│

├── Arithmetic

├── Comparison

├── Logical

├── Special

├── String

├── Bitwise (Vendor Specific)

└── Assignment (Vendor Specific)
```

---

# Arithmetic Operators

| Operator | Meaning |
|----------|---------|
| + | Addition |
| - | Subtraction |
| * | Multiplication |
| / | Division |
| % | Modulus (dialect support varies) |

---

## Example

```sql
SELECT

balance * 1.18

AS gst_amount

FROM accounts;
```

---

# Comparison Operators

| Operator | Meaning |
|----------|---------|
| = | Equal |
| <> | Not Equal |
| != | Not Equal (vendor specific) |
| > | Greater Than |
| < | Less Than |
| >= | Greater Than or Equal |
| <= | Less Than or Equal |

---

## Example

```sql
SELECT *

FROM accounts

WHERE balance > 50000;
```

---

# Logical Operators

| Operator | Meaning |
|----------|---------|
| AND | All conditions true |
| OR | Any condition true |
| NOT | Reverse condition |

---

## Example

```sql
WHERE

city='Mumbai'

AND

balance>50000
```

---

# Special Operators

SQL also provides keyword-based operators.

Examples:

- BETWEEN
- IN
- LIKE
- EXISTS
- IS NULL
- ANY
- ALL

We'll study each in dedicated chapters.

---

# String Operators

SQL Server

```sql
first_name + last_name
```

Spark SQL

```sql
concat(first_name,last_name)
```

Snowflake

```sql
first_name || last_name
```

---

# Bitwise Operators

Some databases support operators such as:

```
&

|

^

~
```

These are commonly used in system programming and flag manipulation.

Spark SQL and Snowflake have different levels of support.

---

# Assignment Operators

Common in procedural SQL (e.g., T-SQL).

Example

```sql
SET @count = 10;
```

These are generally not used in standard SELECT queries.

---

# Operator Precedence

One of the most common interview topics.

Highest to Lowest

```
()

↓

Unary

↓

*

/

%

↓

+

-

↓

Comparison

↓

NOT

↓

AND

↓

OR
```

---

# Example

```sql
SELECT

10 + 5 * 2;
```

Result

```
20
```

because multiplication occurs before addition.

---

# Parentheses

Bad

```sql
WHERE

city='Mumbai'

OR

city='Delhi'

AND

balance>50000
```

Good

```sql
WHERE

(

city='Mumbai'

OR

city='Delhi'

)

AND

balance>50000
```

Always make your intent explicit.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| Arithmetic | ✅ | ✅ | ✅ | ✅ |
| Comparison | ✅ | ✅ | ✅ | ✅ |
| Logical | ✅ | ✅ | ✅ | ✅ |
| BETWEEN | ✅ | ✅ | ✅ | ✅ |
| IN | ✅ | ✅ | ✅ | ✅ |
| EXISTS | ✅ | ✅ | ✅ | ✅ |

---

# Dialect Differences

| Topic | SQL Server | Spark SQL | Snowflake |
|--------|------------|-----------|------------|
| String Concatenation | + | concat() | \|\| |
| != Support | ✅ | ✅ | ✅ |
| Bitwise Operators | Extensive | Limited | Limited |

---

# Deep Dive

SQL evaluates operators according to precedence rules.

The optimizer may also reorder certain predicates internally when it can prove the result remains logically equivalent.

Never assume conditions are evaluated strictly from left to right.

---

# 🔬 Under the Hood

```sql
WHERE

balance > 100000

AND

city='Mumbai'
```

Internally

```
Read Row

↓

Evaluate balance

↓

Evaluate city

↓

Combine Results

↓

Return TRUE/FALSE

↓

Keep or Discard Row
```

---

# 📊 Execution Plan Notes

Operator choice influences:

- Predicate evaluation.
- Index usage.
- Predicate pushdown.
- Join strategy.
- Cardinality estimation.

Wrapping indexed columns in expressions or functions may reduce index efficiency.

---

# 🧠 Engineering Insight

This query

```sql
WHERE

balance + 100 > 50000
```

may be less efficient than

```sql
WHERE

balance > 49900
```

because the second version often allows the optimizer to use indexes more effectively.

---

# 🧩 Design Decisions

| Situation | Recommendation | Reason |
|------------|---------------|--------|
| Multiple conditions | Use parentheses | Avoid ambiguity |
| Financial logic | Use explicit calculations | Improve readability |
| Index filtering | Compare columns directly | Better optimization |
| Complex predicates | Break into logical blocks | Easier maintenance |

---

# ⚖️ Trade-offs

| Prefer | Instead of |
|---------|------------|
| IN | Long OR chains |
| BETWEEN | Multiple range comparisons |
| Explicit parentheses | Relying on precedence |
| Direct comparisons | Functions on indexed columns |

---

# Production Story

A fraud detection pipeline evaluated more than 500 million transactions each night.

Several predicates wrapped indexed columns inside arithmetic expressions, preventing efficient index usage.

Rewriting the predicates to compare the original columns directly reduced execution time substantially and improved overall throughput.

---

# Best Practices

✅ Use parentheses for clarity.

✅ Understand precedence rules.

✅ Compare columns directly where possible.

✅ Keep predicates simple.

✅ Review execution plans for expensive predicates.

---

# Common Mistakes

❌ Ignoring operator precedence.

❌ Assuming left-to-right evaluation.

❌ Overusing OR instead of IN.

❌ Applying functions to indexed columns unnecessarily.

---

# Interview Questions

## Beginner

What are SQL operators?

---

## Intermediate

What is operator precedence?

---

## Senior

How can operators affect execution plans?

---

## Architect

How would you standardize predicate-writing practices across a large engineering organization?

---

# Practice Questions

## Easy

Find accounts with balance greater than ₹50,000.

---

Find customers not from Mumbai.

---

## Medium

Return customers from Mumbai or Pune with balances greater than ₹100,000.

---

Use BETWEEN to find loans in a specified range.

---

## Hard

Explain why parentheses improve correctness and readability.

---

Rewrite a predicate that prevents index usage into a more optimizer-friendly form.

---

# Cheat Sheet

| Category | Operators |
|----------|-----------|
| Arithmetic | + - * / % |
| Comparison | = <> > < >= <= |
| Logical | AND OR NOT |
| Special | BETWEEN IN LIKE EXISTS IS NULL |

---

# Chapter Summary

- Operators define relationships between values.
- SQL provides arithmetic, comparison, logical, and special operators.
- Operator precedence affects evaluation.
- Parentheses improve readability and correctness.
- Well-written predicates improve both maintainability and performance.

---

# What's Next?

In the next chapter, we'll study **SQL Comments and Code Documentation**.

You'll learn:

- Single-line comments
- Multi-line comments
- Commenting strategies
- Documentation standards
- Self-documenting SQL
- Comment anti-patterns
- Enterprise SQL coding standards
- Production code review guidelines