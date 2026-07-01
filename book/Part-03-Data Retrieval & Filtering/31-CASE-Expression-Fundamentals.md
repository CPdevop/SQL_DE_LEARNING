# Chapter 31: CASE Expression Fundamentals

> **Part:** Data Retrieval & Filtering
>
> **Chapter:** 31
>
> **Difficulty:** 🟢 Beginner → 🟠 Professional
>
> **Estimated Reading Time:** 3–4 Hours
>
> **Prerequisites:**
>
> - WHERE Clause
> - Comparison Operators
> - Logical Operators
> - NULL Handling
> - IN / BETWEEN / EXISTS
>
> **Version:** 2.0
>
> **Practice Database:** PostgreSQL (`de_practice`)
>
> **Target Audience:** Data Analysts, ETL Developers, Data Engineers, BI Developers

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand what CASE is.
- Explain why CASE exists.
- Write Simple CASE expressions.
- Write Searched CASE expressions.
- Use CASE inside SELECT.
- Use CASE inside ORDER BY.
- Use CASE inside GROUP BY.
- Understand evaluation order.
- Write readable business rules.
- Avoid common CASE mistakes.

---

# Chapter Roadmap

```
CASE Expression

        │

        ├───────────────┐
        │               │
        ▼               ▼

Simple CASE      Searched CASE

        │               │

        └──────┬────────┘

               ▼

      SELECT Clause

               ▼

      ORDER BY Clause

               ▼

      GROUP BY Clause

               ▼

     Real Business Rules

               ▼

    Interview Questions
```

---

# Real World Motivation

Imagine you work for a bank.

Manager says

> Premium customers should display

```
Gold
```

Normal customers should display

```
Silver
```

New customers should display

```
Bronze
```

There is no column called

```
Customer Category
```

We must create it dynamically.

That is exactly why CASE exists.

---

# What is CASE?

CASE is SQL's conditional expression.

Think of it as SQL's version of

Python

```python
if
elif
else
```

Java

```java
if
else
```

Scala

```scala
match
```

Spark

```python
when()
```

CASE allows SQL to make decisions while returning data.

---

# Mental Model

Think of a traffic signal.

```
IF

Red

↓

Stop

ELSE IF

Yellow

↓

Ready

ELSE

Go
```

CASE follows exactly the same idea.

---

# Business Scenario 1

Employee Salary

| Salary |
|---------|
|25000|
|50000|
|90000|

Required Output

| Salary | Grade |
|---------|-------|
|25000|Low|
|50000|Medium|
|90000|High|

There is no "Grade" column.

CASE creates it.

---

# CASE Types

There are two kinds of CASE.

```
CASE

│

├── Simple CASE

└── Searched CASE
```

Both solve different kinds of problems.

---

# Simple CASE

Simple CASE compares one value against multiple possible values.

Syntax

```sql
CASE expression

    WHEN value1 THEN result1

    WHEN value2 THEN result2

    ELSE default

END
```

---

## Example

```sql
SELECT
    employee_name,
    department,
    CASE department
        WHEN 'IT' THEN 'Technology'
        WHEN 'HR' THEN 'Human Resources'
        WHEN 'FIN' THEN 'Finance'
        ELSE 'Other'
    END AS department_name
FROM employees;
```

---

### Execution Flow

```
Department

↓

IT ?

↓

Yes

↓

Technology
```

---

# Searched CASE

Most commonly used.

Instead of comparing values,

it evaluates conditions.

Syntax

```sql
CASE

WHEN condition THEN result

WHEN condition THEN result

ELSE result

END
```

---

## Example

```sql
SELECT
    employee_name,
    salary,
    CASE
        WHEN salary >= 100000 THEN 'Executive'
        WHEN salary >= 50000 THEN 'Senior'
        ELSE 'Junior'
    END AS employee_level
FROM employees;
```

---

# Which CASE Should You Use?

| Situation | Use |
|------------|-----|
| One value compared with many values | Simple CASE |
| Complex conditions | Searched CASE |

Rule

> If you need `>`, `<`, `BETWEEN`, `LIKE`, `IN`, `EXISTS`, use **Searched CASE**.

---

# CASE Evaluation

Very important.

CASE evaluates

```
Top

↓

Bottom
```

It stops at the **first TRUE condition**.

Example

```sql
CASE

WHEN salary > 10000 THEN 'A'

WHEN salary > 50000 THEN 'B'

END
```

Salary

```
70000
```

Result

```
A
```

NOT

```
B
```

Because CASE stops after the first match.

---

# Common Beginner Mistake

Wrong

```sql
CASE

WHEN salary > 10000 THEN 'A'

WHEN salary > 50000 THEN 'B'
```

Correct

```sql
CASE

WHEN salary > 50000 THEN 'B'

WHEN salary > 10000 THEN 'A'
```

Always write

```
Most Specific

↓

Least Specific
```

---

# CASE in SELECT

Most common use.

```sql
SELECT

employee_name,

salary,

CASE

WHEN salary>100000 THEN 'VIP'

ELSE 'Normal'

END AS CustomerType

FROM employees;
```

---

# CASE in ORDER BY

Example

```sql
SELECT *

FROM employees

ORDER BY

CASE

WHEN department='CEO' THEN 1

WHEN department='Manager' THEN 2

ELSE 3

END;
```

Custom sorting becomes possible.

---

# CASE in GROUP BY

```sql
SELECT

CASE

WHEN salary>=50000 THEN 'High'

ELSE 'Low'

END,

COUNT(*)

FROM employees

GROUP BY

CASE

WHEN salary>=50000 THEN 'High'

ELSE 'Low'

END;
```

We'll revisit this in the Aggregation section.

---

# CASE vs IF

| SQL | Programming |
|------|-------------|
| CASE | IF ELSE |

CASE is an **expression**, not a control-flow statement. It returns a value that can be used in a query.

---

# SQL Dialect Comparison

## ANSI SQL

```sql
CASE
WHEN condition THEN result
ELSE result
END
```

## SQL Server

Same syntax.

## Spark SQL

Same syntax.

## Snowflake

Same syntax.

Excellent portability.

---

# Deep Dive

CASE does **not** execute multiple branches.

It returns only one result for each row.

Think of it as

```
Row

↓

Evaluate Condition 1

↓

TRUE ?

↓

Return Result

↓

Stop
```

---

# Under the Hood

Conceptually

```
Read Row

↓

Evaluate CASE

↓

Store Result

↓

Return Row
```

The optimizer may simplify constant branches or fold expressions, but the logical behavior remains the same.

---

# Performance Notes

CASE itself is inexpensive.

Performance issues usually arise from:

- Expensive expressions inside CASE.
- Functions on indexed columns.
- Repeating the same complex CASE expression many times.

---

# Production Story

A retail company categorized customers using ten different reports.

Each report had a different version of the business rules.

The engineering team centralized the CASE logic in a view, ensuring all reports used the same classification and reducing inconsistencies.

---

# Best Practices

✅ Prefer Searched CASE for business rules.

✅ Order conditions from most specific to least specific.

✅ Always include ELSE when practical.

✅ Keep CASE readable.

---

# Common Mistakes

❌ Forgetting ELSE.

❌ Incorrect condition order.

❌ Deeply nested CASE expressions.

❌ Duplicating CASE logic across many queries.

---

# Interview Theory Questions

### Beginner

What is CASE?

---

Difference between Simple CASE and Searched CASE?

---

### Intermediate

How does CASE evaluate conditions?

---

Can CASE return multiple values?

---

### Senior

Where can CASE be used?

---

How does CASE affect readability and maintainability?

---

# Interview Coding Questions

### Easy

Classify employees as

```
High

Medium

Low
```

based on salary.

---

Convert department codes into department names.

---

### Medium

Create customer loyalty levels.

---

Sort employees by custom department priority.

---

### Hard

Implement a multi-level pricing rule using CASE.

---

Design a CASE expression for insurance claim risk categories.

---

# PostgreSQL Practice Lab

## Create Database

```sql
CREATE DATABASE de_practice;
```

---

## Create Table

```sql
CREATE TABLE employees (

    employee_id INT PRIMARY KEY,

    employee_name VARCHAR(100),

    department VARCHAR(20),

    salary NUMERIC(10,2),

    experience INT,

    city VARCHAR(50)

);
```

---

## Insert Data

```sql
INSERT INTO employees
VALUES
(1,'Alice','IT',120000,8,'Mumbai'),
(2,'Bob','HR',45000,2,'Delhi'),
(3,'Charlie','IT',75000,5,'Pune'),
(4,'David','FIN',95000,7,'Mumbai'),
(5,'Eva','IT',35000,1,'Bangalore'),
(6,'Frank','HR',68000,6,'Delhi'),
(7,'Grace','CEO',250000,20,'Mumbai'),
(8,'Henry','FIN',52000,4,'Chennai'),
(9,'Ivy','IT',150000,10,'Hyderabad'),
(10,'Jack','HR',30000,1,'Pune');
```

---

# Hands-on Exercises

## Easy

1. Classify employees into High and Low salary.

2. Replace department codes with full names.

3. Create Experience Level.

---

## Medium

4. Create salary bands.

5. Sort CEO first, then Managers, then everyone else.

6. Categorize cities into Metro and Non-Metro.

---

## Hard

7. Build employee promotion eligibility rules.

8. Create tax brackets using CASE.

9. Create bonus percentages.

10. Combine salary and experience into performance grades.

---

# 🏢 Real Data Engineering Scenario

A payroll ETL pipeline calculates employee bonus categories every night.

Business rules change frequently:

- Salary ≥ ₹150,000 → Platinum Bonus
- Salary ≥ ₹100,000 → Gold Bonus
- Salary ≥ ₹75,000 → Silver Bonus
- Otherwise → Standard Bonus

Implement these rules using a single `CASE` expression. Discuss how you would avoid duplicating this logic across multiple ETL jobs.

---

# Debugging Lab

Why does this produce incorrect results?

```sql
CASE
    WHEN salary > 10000 THEN 'A'
    WHEN salary > 50000 THEN 'B'
END
```

Explain:

- What result is returned for a salary of ₹70,000?
- Why?
- Rewrite the CASE expression correctly.

---

# Knowledge Check (MCQ)

1. How many types of CASE expressions are there in ANSI SQL?
2. Which CASE type supports comparison operators like `>`?
3. Does CASE stop after the first matching condition?
4. Is CASE an expression or a control-flow statement?
5. Is ELSE mandatory?

---

# Cheat Sheet

| Requirement | Solution |
|-------------|----------|
| Equality mapping | Simple CASE |
| Business rules | Searched CASE |
| Custom sorting | CASE in ORDER BY |
| Dynamic grouping | CASE in GROUP BY |

---

# Chapter Summary

- CASE is SQL's conditional expression.
- There are two types: Simple CASE and Searched CASE.
- CASE evaluates conditions from top to bottom and stops at the first match.
- Searched CASE is the preferred choice for most business rules.
- CASE is widely used in reporting, ETL pipelines, dashboards, and data warehouses.

---

# What's Next?

**Chapter 32 – Advanced CASE Expression**

We'll cover:

- Nested CASE
- Conditional Aggregation
- CASE with Window Functions
- CASE inside JOINs
- Dynamic KPI calculations
- Enterprise ETL patterns
- Performance tuning
- 50+ advanced interview problems