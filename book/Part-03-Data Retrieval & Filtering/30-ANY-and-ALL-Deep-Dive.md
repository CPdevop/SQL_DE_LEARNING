# Chapter 30: ANY and ALL (Deep Dive)

> **Part:** Data Retrieval & Filtering
>
> **Chapter:** 30
>
> **Difficulty:** 🟡 Intermediate → 🔴 Architect
>
> **Estimated Reading Time:** 120–150 minutes
>
> **Prerequisites:**
>
> - Chapter 23 – Comparison Operators
> - Chapter 24 – Logical Operators
> - Chapter 27 – IN Operator
> - Chapter 29 – EXISTS
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Concept Card

| Attribute | Value |
|-----------|-------|
| SQL Category | Data Retrieval |
| Difficulty | 🟡 Intermediate → 🔴 Architect |
| Used Daily | ⭐⭐☆☆☆ |
| Interview Frequency | ⭐⭐⭐⭐☆ |
| Production Usage | ⭐⭐☆☆☆ |
| Performance Impact | ⭐⭐⭐⭐☆ |
| ANSI SQL | ✅ |
| SQL Server | ✅ |
| Spark SQL | ❌ Limited Support |
| Snowflake | ✅ |

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand ANY.
- Understand ALL.
- Compare ANY with IN.
- Compare ALL with MIN/MAX.
- Understand quantified comparisons.
- Read execution plans.
- Know when to avoid ANY and ALL.

---

# Quick Revision

Unlike IN,

which asks

```
Is this value in a list?
```

ANY and ALL ask

```
How should this value compare with an entire set?
```

---

# 🧠 Mental Model

Imagine a classroom.

Exam scores

```
45

60

75

90
```

Question

```
Score > ANY ?
```

Means

```
Greater than at least one score.
```

---

Question

```
Score > ALL ?
```

Means

```
Greater than every score.
```

---

# Business Problem

Suppose HR wants:

Employees earning

```
More than ANY manager
```

or

```
More than ALL interns
```

Comparing against an entire group is exactly what ANY and ALL were designed for.

---

# What is ANY?

ANY means

```
At least one comparison must be TRUE.
```

General syntax

```sql
expression operator ANY
(
    subquery
)
```

---

# Example

```sql
SELECT
    employee_name
FROM employees
WHERE salary > ANY
(
    SELECT salary
    FROM interns
);
```

Meaning

Return employees whose salary is greater than at least one intern's salary.

---

# How ANY Works

Intern salaries

```
20000

25000

30000
```

Employee salary

```
28000
```

Comparison

```
28000 > 20000

TRUE

↓

Stop

↓

Return Row
```

Only one TRUE is required.

---

# What is ALL?

ALL means

```
Every comparison must be TRUE.
```

Syntax

```sql
expression operator ALL
(
    subquery
)
```

---

# Example

```sql
SELECT
    employee_name
FROM employees
WHERE salary > ALL
(
    SELECT salary
    FROM interns
);
```

Employee

```
35000
```

Comparisons

```
35000 > 20000

TRUE

35000 > 25000

TRUE

35000 > 30000

TRUE
```

Every comparison succeeds.

The row is returned.

---

# ANY vs IN

Many developers confuse these.

Example

```sql
WHERE department_id IN
(
1,
2,
3
)
```

means

```
Equal to one of these values.
```

Equivalent

```sql
WHERE department_id = ANY
(
SELECT department_id
...
)
```

For equality comparisons,

`= ANY` behaves similarly to `IN`.

---

# ALL vs MAX()

Instead of

```sql
salary > ALL
(
SELECT salary
FROM interns
)
```

many developers write

```sql
salary >
(
SELECT MAX(salary)
FROM interns
)
```

These often produce the same result.

However,

understanding ALL helps explain quantified comparisons in ANSI SQL.

---

# ANY with Other Operators

```sql
salary < ANY(...)
```

Less than at least one value.

---

```sql
salary >= ANY(...)
```

Greater than or equal to at least one value.

---

# ALL with Other Operators

```sql
salary <= ALL(...)
```

Less than or equal to every value.

---

# NULL Behavior

Suppose

Subquery returns

```
100

NULL
```

Comparison results may become UNKNOWN depending on the operator.

Always consider NULL values when using ANY or ALL.

---

# SQL Compatibility Matrix

| Feature | ANSI | SQL Server | Spark | Snowflake |
|----------|------|-----------|--------|------------|
| ANY | ✅ | ✅ | Limited | ✅ |
| ALL | ✅ | ✅ | Limited | ✅ |

---

# Dialect Differences

Spark SQL has limited support for quantified comparisons compared with traditional relational databases.

Always verify support before writing portable SQL.

---

# Deep Dive

Internally,

optimizers often rewrite

```
ANY

↓

Semi Join

or

Aggregate Comparison
```

and

```
ALL

↓

Aggregate Comparison

or

Anti Join
```

The exact strategy depends on the query.

---

# 🔬 Under the Hood

Example

```sql
salary > ALL(...)
```

Conceptually

```
Read Employee

↓

Read Subquery

↓

Compare Against Every Value

↓

TRUE?

↓

Return Row
```

---

# 📊 Execution Plan Notes

Execution plans may contain:

- Aggregate
- Nested Loop
- Hash Join
- Semi Join

Many optimizers transform quantified comparisons into simpler equivalent forms.

---

# 🧠 Engineering Insight

Although ANY and ALL are powerful,

many teams prefer

```sql
MAX()

MIN()

EXISTS()

IN()
```

because they are more familiar to most developers.

Readability often outweighs clever syntax.

---

# 🧩 Design Decisions

| Requirement | Recommendation |
|------------|---------------|
| Equality against list | IN |
| Existence check | EXISTS |
| Compare with maximum | MAX() |
| Compare with minimum | MIN() |
| ANSI quantified comparison | ANY / ALL |

---

# ⚖️ Trade-offs

| Use ANY / ALL | Use Another Approach |
|---------------|---------------------|
| ANSI SQL portability | MAX/MIN for readability |
| Advanced queries | EXISTS for existence |
| Interview questions | Simpler SQL for teams |

---

# Production Story

A financial audit query used:

```sql
salary > ALL
(
SELECT salary
FROM contractors
)
```

Although correct, many team members found it difficult to understand.

The query was rewritten using:

```sql
salary >
(
SELECT MAX(salary)
FROM contractors
)
```

The rewritten version was easier to review while producing the same result.

---

# 🛠 Debugging Lab

Bug

```sql
salary > ALL
(
NULL,
10000
)
```

Unexpected results occurred because NULL affected comparison logic.

Lesson

Always understand how NULL interacts with quantified comparisons.

---

# 🔄 Rewrite Challenge

Rewrite

```sql
salary > ALL
(
SELECT salary
FROM interns
)
```

using

1. MAX()
2. NOT EXISTS
3. JOIN

Compare

- Readability
- Maintainability
- Performance

---

# Decision Matrix

| Requirement | Best Choice |
|-------------|-------------|
| Equality against values | IN |
| Existence | EXISTS |
| Compare with highest value | MAX() |
| Compare with lowest value | MIN() |
| ANSI quantified comparison | ANY / ALL |

---

# Best Practices

✅ Use ANY and ALL when they clearly express business intent.

✅ Consider MAX() or MIN() if they improve readability.

✅ Test NULL behavior.

✅ Verify dialect support.

---

# Common Mistakes

❌ Confusing ANY with IN.

❌ Forgetting NULL handling.

❌ Using ANY or ALL where EXISTS is more appropriate.

❌ Assuming every SQL engine supports all quantified comparisons identically.

---

# Interview Questions

## Beginner

What is the difference between ANY and ALL?

---

## Intermediate

How is `= ANY` related to `IN`?

---

## Senior

When would you replace ALL with MAX()?

---

## Architect

Design a portable SQL strategy for quantified comparisons across SQL Server, Snowflake, and Spark SQL.

---

# Practice Questions

## Easy

Find employees earning more than ANY intern.

---

Find employees earning more than ALL interns.

---

## Medium

Rewrite ANY using IN where appropriate.

---

Rewrite ALL using MAX().

---

## Hard

Explain optimizer transformations for quantified comparisons.

---

Compare readability, portability, and performance of ANY, ALL, EXISTS, and aggregate-based approaches.

---

# Cheat Sheet

| Requirement | Construct |
|-------------|-----------|
| Equal to one of many values | IN |
| Greater than at least one value | > ANY |
| Greater than every value | > ALL |
| Compare to highest value | MAX() |
| Compare to lowest value | MIN() |

---

# Related Chapters

- ✅ Chapter 23 — Comparison Operators
- ✅ Chapter 24 — Logical Operators
- ✅ Chapter 27 — IN Operator
- ✅ Chapter 29 — EXISTS
- ▶️ Chapter 31 — CASE Expression
- ▶️ Part 12 — Query Optimization

---

# Chapter Summary

- ANY requires at least one comparison to evaluate to TRUE.
- ALL requires every comparison to evaluate to TRUE.
- `= ANY` is conceptually similar to `IN`.
- ALL can often be expressed using `MAX()` or `MIN()`.
- Quantified comparisons are powerful but should be used with readability and portability in mind.

---

# What's Next?

In the next chapter, we'll study one of the most powerful features in SQL:

**Chapter 31 — CASE Expression (Deep Dive)**

You'll learn:

- Simple CASE
- Searched CASE
- CASE in SELECT
- CASE in WHERE
- CASE in ORDER BY
- CASE with Aggregates
- Conditional Aggregation
- Nested CASE
- Performance considerations
- Production ETL patterns