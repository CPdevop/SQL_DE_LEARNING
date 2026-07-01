# Chapter 32: Advanced CASE Expression

> **Part:** Data Retrieval & Filtering
>
> **Chapter:** 32
>
> **Difficulty:** 🟡 Intermediate → 🔴 Architect
>
> **Estimated Reading Time:** 4–6 Hours
>
> **Prerequisites:**
>
> - Chapter 31 – CASE Expression Fundamentals
> - Aggregate Functions (Basic Understanding)
> - GROUP BY (Conceptual Understanding)
>
> **Version:** 2.0
>
> **Practice Database:** PostgreSQL (`de_practice`)

---

# Learning Objectives

After completing this chapter, you will be able to:

- Write nested CASE expressions.
- Use CASE inside aggregate functions.
- Implement conditional aggregation.
- Use CASE in JOINs.
- Use CASE inside window functions.
- Build reusable business rules.
- Design ETL transformations using CASE.
- Optimize large CASE expressions.

---

# Chapter Roadmap

```
CASE

│

├── Nested CASE

├── Conditional Aggregation

├── CASE + SUM()

├── CASE + COUNT()

├── CASE + AVG()

├── CASE + Window Functions

├── CASE + JOIN

├── CASE + UPDATE

├── CASE + ORDER BY

├── ETL Examples

├── Interview Questions

└── PostgreSQL Lab
```

---

# Why This Chapter Matters

Open almost any production SQL codebase.

You will find CASE everywhere.

Examples:

✓ Customer Segmentation

✓ Fraud Detection

✓ KPI Calculations

✓ Dashboard Metrics

✓ ETL Pipelines

✓ Data Validation

✓ Risk Classification

✓ Tax Calculation

✓ Insurance Rules

✓ Product Categorization

Learning CASE deeply is one of the fastest ways to move from junior SQL developer to professional Data Engineer.

---

# Section 1 — Nested CASE

Sometimes one decision depends on another.

Example

Employee Bonus

```
IF Salary > 100000

↓

Check Experience

↓

Experience > 10

↓

Executive Bonus

ELSE

Senior Bonus
```

---

## Example

```sql
SELECT
    employee_name,
    salary,
    experience,
    CASE
        WHEN salary >= 100000 THEN
            CASE
                WHEN experience >= 10 THEN 'Executive Bonus'
                ELSE 'Senior Bonus'
            END
        ELSE
            'Standard Bonus'
    END AS bonus_category
FROM employees;
```

---

### When NOT to Nest CASE

Bad

```
CASE

CASE

CASE

CASE

CASE
```

If nesting exceeds two or three levels, consider:

- Lookup tables
- Reference tables
- Business rule tables
- Dimension tables

---

# Section 2 — Conditional Aggregation

One of the most important SQL interview topics.

Instead of

```
Multiple Queries
```

we calculate everything in one query.

---

Example

Find

- Total Employees
- IT Employees
- HR Employees

One query.

```sql
SELECT
    COUNT(*) AS total_employees,

    SUM(
        CASE
            WHEN department='IT'
            THEN 1
            ELSE 0
        END
    ) AS it_employees,

    SUM(
        CASE
            WHEN department='HR'
            THEN 1
            ELSE 0
        END
    ) AS hr_employees

FROM employees;
```

---

## Visual

```
Employee

↓

CASE

↓

1 or 0

↓

SUM

↓

Final Count
```

---

# Section 3 — CASE with COUNT

Alternative

```sql
COUNT(

CASE

WHEN department='IT'

THEN 1

END
)
```

Understand the difference between

```
SUM(CASE...)

COUNT(CASE...)
```

We'll compare them later.

---

# Section 4 — CASE with AVG

Average salary of only IT employees.

```sql
SELECT

AVG(

CASE

WHEN department='IT'

THEN salary

END

)

FROM employees;
```

NULL values are ignored.

---

# Section 5 — CASE with MIN/MAX

Highest IT Salary

```sql
SELECT

MAX(

CASE

WHEN department='IT'

THEN salary

END

)

FROM employees;
```

---

# Section 6 — CASE in ORDER BY

Business wants

CEO

↓

Manager

↓

Everyone Else

```sql
ORDER BY

CASE

WHEN department='CEO' THEN 1

WHEN department='Manager' THEN 2

ELSE 3

END
```

---

# Section 7 — CASE in UPDATE

```sql
UPDATE employees

SET bonus_percentage=

CASE

WHEN salary>100000 THEN 20

WHEN salary>50000 THEN 10

ELSE 5

END;
```

Very common in ETL pipelines.

---

# Section 8 — CASE in JOIN

Example

VIP Customers

```sql
SELECT

c.customer_name,

CASE

WHEN a.balance>100000

THEN 'VIP'

ELSE 'Regular'

END

FROM customers c

JOIN accounts a

ON c.customer_id=a.customer_id;
```

---

# Section 9 — CASE with Window Functions

Example

```sql
SUM(

CASE

WHEN department='IT'

THEN salary

END

)

OVER()
```

We'll revisit this in the Window Function section.

---

# Section 10 — CASE in ETL

Nightly ETL

```
Transaction

↓

CASE

↓

High Risk

Medium Risk

Low Risk

↓

Warehouse
```

CASE becomes the rule engine.

---

# Performance Notes

CASE itself is cheap.

Performance problems usually come from:

- Expensive functions inside CASE.
- Repeating CASE many times.
- Complex nested expressions.

---

# Engineering Recommendation

If the same CASE appears in

- 20 reports

- 15 dashboards

- 8 ETL jobs

Move it into

- View

- Materialized View

- Dimension Table

- Semantic Layer

Avoid duplicated business logic.

---

# Production Story

A retail company had 14 different definitions of "High Value Customer."

Every dashboard used a different CASE expression.

Finance, Sales, and Marketing reported different numbers.

The engineering team created a centralized customer segmentation view containing one standardized CASE expression.

From that point onward, every downstream report used the same business logic.

---

# Best Practices

✅ Keep CASE readable.

✅ Always include ELSE.

✅ Order conditions carefully.

✅ Prefer lookup tables for hundreds of mappings.

---

# Common Mistakes

❌ Deep nesting.

❌ Duplicated CASE logic.

❌ Missing ELSE.

❌ Wrong condition order.

---

# Interview Theory Questions

## Beginner

Difference between nested CASE and simple CASE?

---

## Intermediate

Explain conditional aggregation.

---

Why is SUM(CASE...) so common?

---

## Senior

How would you centralize CASE logic across multiple ETL pipelines?

---

## Architect

Design a business-rule engine using SQL.

---

# Interview Coding Questions

## Easy

Create employee grades.

---

Categorize salaries.

---

## Medium

Find IT employee count using CASE.

---

Calculate average HR salary.

---

## Hard

Create customer loyalty levels.

---

Build insurance risk categories.

---

Implement tax slabs.

---

Calculate employee bonuses.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employee_bonus (

employee_id INT,

bonus_percentage NUMERIC(5,2)

);
```

---

## Additional Sample Data

```sql
INSERT INTO employee_bonus

VALUES

(1,NULL),

(2,NULL),

(3,NULL),

(4,NULL),

(5,NULL),

(6,NULL),

(7,NULL),

(8,NULL),

(9,NULL),

(10,NULL);
```

---

# Hands-on Exercises

## Easy

Create

```
Junior

Senior

Executive
```

using CASE.

---

## Medium

Calculate

```
IT Count

HR Count

Finance Count
```

using one query.

---

## Hard

Create

```
Performance Rating

Bonus %

Tax %

Promotion Eligibility

Insurance Category
```

using CASE.

---

# FAANG Interview Challenge

Amazon stores millions of orders.

Each order must be classified:

```
Cancelled

↓

Refund

Delivered

↓

Completed

Pending

↓

Open
```

Write one CASE expression.

Then extend it to include

```
International Order

↓

Priority Handling
```

---

# 🏢 Real Data Engineering Scenario

A healthcare company processes millions of patient claims every night.

Business Rules:

- Claim Amount > ₹5,00,000 → High Risk
- Claim Amount between ₹1,00,000 and ₹5,00,000 → Medium Risk
- Otherwise → Low Risk

Additionally:

- Patients older than 65 are marked as Senior.
- Emergency claims always receive Priority Processing.

Design a single SQL query using CASE expressions to generate all three derived columns in one ETL step.

---

# Debugging Lab

Bug

```sql
CASE

WHEN salary>10000 THEN 'Low'

WHEN salary>100000 THEN 'High'
```

Question

Why is

```
High
```

never returned?

Fix it.

---

# Knowledge Check

1. Can CASE be nested?

2. Can CASE be used inside SUM()?

3. Does AVG ignore NULL?

4. Can CASE be used in UPDATE?

5. Should large lookup mappings use CASE?

---

# Cheat Sheet

| Requirement | Solution |
|-------------|----------|
| Multi-condition logic | Searched CASE |
| Multiple metrics | Conditional Aggregation |
| Custom sorting | CASE in ORDER BY |
| ETL transformation | CASE in SELECT/UPDATE |
| Reusable mapping | Lookup Table |

---

# Chapter Summary

- Nested CASE is useful but should be used sparingly.
- Conditional aggregation is one of the most important SQL techniques.
- CASE integrates seamlessly with aggregates, joins, updates, and window functions.
- Centralizing business rules improves consistency across ETL pipelines and reports.
- CASE is the foundation of production-grade business logic in SQL.

---

# What's Next?

**Chapter 33 – CASE Performance, Optimization & Interview Mastery**

We'll cover:

- CASE execution plans
- Optimizer behavior
- CASE vs Lookup Tables
- CASE vs Dimension Tables
- CASE in Billion-row ETL jobs
- Performance tuning
- 100+ Interview Questions
- Real FAANG SQL Challenges