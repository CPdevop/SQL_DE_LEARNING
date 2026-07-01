# Chapter 23: Comparison Operators (Deep Dive)

> **Part:** Data Retrieval & Filtering
>
> **Chapter:** 23
>
> **Difficulty:** 🟢 Beginner → 🟠 Intermediate
>
> **Estimated Reading Time:** 90–120 minutes
>
> **Prerequisites:**
>
> - Part 2 – SQL Query Fundamentals
> - Chapter 14 – WHERE Clause
> - Chapter 20 – SQL Operators
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

- Master every comparison operator.
- Compare numeric, string, date, and boolean values.
- Understand NULL comparison behavior.
- Write optimizer-friendly predicates.
- Avoid implicit conversion pitfalls.
- Improve filtering performance.

---

# Quick Revision

Comparison operators answer one simple question:

> **Does this value satisfy a condition?**

Every WHERE clause depends on comparison operators.

---

# 🧠 Mental Model

Imagine airport security.

Every passenger passes through several checkpoints.

```
Age > 18 ?

↓

Passport Valid ?

↓

Visa Valid ?

↓

Allowed
```

Each checkpoint is a comparison.

SQL works exactly the same way.

---

# Business Problem

Suppose the bank wants to identify:

- Premium customers
- Large transactions
- Loans above ₹10 lakh
- Dormant accounts

Every one of these requirements is implemented using comparison operators.

---

# What are Comparison Operators?

Comparison operators compare two expressions and return one of three logical results:

```
TRUE

FALSE

UNKNOWN
```

Notice...

Not just TRUE or FALSE.

SQL also supports **UNKNOWN** because of NULL values.

---

# Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| = | Equal | balance = 1000 |
| <> | Not Equal | city <> 'Mumbai' |
| != | Not Equal (vendor-specific) | status != 'Closed' |
| > | Greater Than | balance > 50000 |
| < | Less Than | age < 18 |
| >= | Greater Than or Equal | salary >= 75000 |
| <= | Less Than or Equal | loan_amount <= 100000 |

---

# Example 1 — Equal

```sql
SELECT
    customer_name
FROM customers
WHERE city = 'Mumbai';
```

---

# Example 2 — Not Equal

```sql
SELECT
    customer_name
FROM customers
WHERE city <> 'Mumbai';
```

---

# Example 3 — Greater Than

```sql
SELECT
    account_number,
    balance
FROM accounts
WHERE balance > 100000;
```

---

# Example 4 — Less Than

```sql
SELECT
    loan_id,
    loan_amount
FROM loans
WHERE loan_amount < 500000;
```

---

# Numeric Comparisons

```sql
WHERE balance >= 25000
```

Very common in financial systems.

---

# String Comparisons

```sql
WHERE city = 'Delhi'
```

Remember that comparison behavior may depend on:

- Collation
- Case sensitivity
- Database settings

---

# Date Comparisons

```sql
WHERE transaction_date >= DATE '2026-01-01'
```

Very common in ETL pipelines.

---

# Boolean Comparisons

Spark SQL

```sql
WHERE is_active = TRUE
```

SQL Server

```sql
WHERE is_active = 1
```

---

# Comparing Expressions

SQL compares expressions—not just columns.

```sql
WHERE balance * 1.05 > 100000
```

Although valid, this may reduce index efficiency.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| = | ✅ | ✅ | ✅ | ✅ |
| <> | ✅ | ✅ | ✅ | ✅ |
| != | ❌ | ✅ | ✅ | ✅ |
| > < >= <= | ✅ | ✅ | ✅ | ✅ |

---

# Dialect Differences

| Feature | SQL Server | Spark SQL | Snowflake |
|----------|------------|-----------|------------|
| != | Supported | Supported | Supported |
| <> | Preferred ANSI | Preferred ANSI | Preferred ANSI |

Recommendation:

Use `<>` in production when portability matters.

---

# Deep Dive

A comparison doesn't return rows.

It returns a logical result.

Example

```
Balance = 100000

↓

TRUE

↓

Row Returned
```

or

```
FALSE

↓

Row Discarded
```

---

# 🔬 Under the Hood

```sql
WHERE balance > 100000
```

Internally

```
Read Balance

↓

Read Literal

↓

Compare Values

↓

TRUE/FALSE/UNKNOWN

↓

Return or Discard
```

This evaluation occurs for every qualifying row.

---

# 📊 Execution Plan Notes

Good predicate

```sql
WHERE customer_id = 100
```

May produce:

```
Index Seek
```

Poor predicate

```sql
WHERE customer_id + 10 = 110
```

May require:

```
Table Scan
```

Small predicate changes can significantly affect execution plans.

---

# 🧠 Engineering Insight

These two queries return the same rows:

```sql
WHERE amount + 100 > 1000
```

```sql
WHERE amount > 900
```

The second form is generally easier for the optimizer to use with indexes.

---

# 🧩 Design Decisions

| Situation | Recommendation | Reason |
|------------|---------------|--------|
| Equality search | Use `=` | Fast and readable |
| Portability | Prefer `<>` over `!=` | ANSI compliant |
| Financial filtering | Compare raw columns | Better optimization |
| Dates | Compare date values directly | Supports partition pruning |

---

# ⚖️ Trade-offs

| Prefer | Avoid |
|---------|------|
| `=` | Comparing after unnecessary calculations |
| `<>` | Vendor-specific `!=` when portability matters |
| Direct comparisons | Functions on indexed columns |

---

# Production Story

A transaction validation job filtered data using:

```sql
WHERE YEAR(transaction_date) = 2026
```

The database could not efficiently use the index on `transaction_date`.

The query was rewritten as:

```sql
WHERE transaction_date >= DATE '2026-01-01'
  AND transaction_date < DATE '2027-01-01'
```

The rewritten predicate allowed better index usage and significantly reduced execution time.

---

# Best Practices

✅ Compare columns directly.

✅ Prefer ANSI operators.

✅ Use explicit date ranges.

✅ Review execution plans for expensive filters.

---

# Common Mistakes

❌ Using `!=` when ANSI portability is required.

❌ Comparing incompatible data types.

❌ Applying arithmetic to indexed columns.

❌ Ignoring NULL behavior.

---

# Interview Questions

## Beginner

What comparison operators does SQL support?

---

## Intermediate

Why is `<>` preferred over `!=` in portable SQL?

---

## Senior

How can comparison operators influence execution plans?

---

## Architect

Design filtering standards for a multi-platform SQL environment that includes SQL Server, Spark SQL, and Snowflake.

---

# Practice Questions

## Easy

Find customers from Mumbai.

Find balances greater than ₹50,000.

---

## Medium

Return loans between ₹5 lakh and ₹20 lakh using comparison operators.

Compare transaction dates after 1 January 2026.

---

## Hard

Rewrite a non-SARGable comparison into an optimizer-friendly predicate.

Explain how comparison operators affect index usage.

---

# Cheat Sheet

| Operator | Meaning |
|----------|---------|
| = | Equal |
| <> | Not Equal |
| > | Greater Than |
| < | Less Than |
| >= | Greater Than or Equal |
| <= | Less Than or Equal |

---

# Chapter Summary

- Comparison operators evaluate relationships between values.
- SQL comparisons return TRUE, FALSE, or UNKNOWN.
- Direct comparisons are usually more optimizer-friendly.
- ANSI operators improve portability.
- Well-designed comparison predicates improve performance and maintainability.

---

# What's Next?

In the next chapter, we'll study **Logical Operators (`AND`, `OR`, `NOT`) Deep Dive**.

You'll learn:

- Predicate composition
- Short-circuit evaluation
- Predicate simplification
- De Morgan's Laws
- Boolean algebra in SQL
- Complex business rule implementation
- Optimizer behavior
- Performance implications