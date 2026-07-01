

# ==========================================================
# Section 1
# Introduction
# ==========================================================

# Why This Chapter Exists

By now, you already know how to write CASE expressions.

You can classify rows.

You can build salary bands.

You can create customer categories.

You can even perform conditional aggregation.

For many SQL books, that is where the CASE chapter ends.

For Data Engineers, however, that is where the interesting part begins.

The goal of this chapter is not to teach **how to write CASE**.

The goal is to teach **how to engineer CASE expressions**.

There is an enormous difference between these two skills.

A junior developer usually asks,

> "Can I solve this problem using CASE?"

A senior Data Engineer asks,

> "Should this business rule even be implemented using CASE?"

That single question separates maintainable enterprise systems from SQL that becomes impossible to maintain after a few years.

---

# The Reality of Enterprise Systems

Imagine joining a multinational bank.

The nightly ETL pipeline processes approximately **120 million transactions** every night.

Every transaction must be categorized.

Some examples include:

- High Value
- International
- Domestic
- Fraud Suspected
- Regulatory Review
- Taxable
- Manual Verification
- Priority Customer

Initially, the implementation looks straightforward.

```sql
CASE
    WHEN amount >= 100000 THEN 'High Value'
    ELSE 'Normal'
END
```

Six months later, new regulations are introduced.

Another ten business rules are added.

Marketing requests new customer segments.

Compliance introduces additional verification levels.

Fraud Detection begins assigning risk scores.

Eventually, the CASE expression grows from **2 WHEN clauses** to more than **250 WHEN clauses**.

At this point, several important questions arise.

- Can developers still understand the logic?
- Can business users request changes safely?
- Can different ETL pipelines remain consistent?
- Can this query still be optimized?
- Should these rules remain inside SQL?

This chapter answers these questions.

---

# CASE Is More Than IF-ELSE

Most programming languages provide conditional logic.

Python uses

```python
if
elif
else
```

Java uses

```java
if
else
```

Scala provides

```scala
match
```

Spark offers

```python
when()
```

SQL provides

```sql
CASE
```

Although the syntax appears similar, SQL CASE is fundamentally different.

CASE is **not a programming statement**.

CASE is an **expression**.

An expression returns a value.

Because CASE returns a value, it can appear almost anywhere an expression is allowed.

For example,

- SELECT
- ORDER BY
- GROUP BY
- HAVING
- UPDATE
- INSERT
- Window Functions
- Aggregate Functions

Understanding this distinction is essential because it explains why CASE behaves differently from procedural programming languages.

---

# CASE Is the Rule Engine of SQL

Think of CASE as the rule engine inside the SQL language.

Without CASE,

SQL can retrieve data.

With CASE,

SQL can make decisions.

For example,

Without CASE

```sql
SELECT salary
FROM employees;
```

With CASE

```sql
SELECT
    salary,
    CASE
        WHEN salary >= 100000 THEN 'Executive'
        WHEN salary >= 50000 THEN 'Senior'
        ELSE 'Junior'
    END AS employee_level
FROM employees;
```

The query no longer simply returns stored data.

It derives new information from existing data.

This concept is known as a **derived attribute**.

Derived attributes appear everywhere in modern analytics.

Examples include:

- Customer Tier
- Risk Category
- Loan Grade
- Loyalty Level
- Tax Slab
- Discount Band
- Insurance Category
- KPI Status
- Sales Performance
- Product Segment

Most of these values do not physically exist in the database.

They are computed at query time using CASE expressions or equivalent business rules.

---

# Mental Model

Imagine a hospital emergency room.

Every patient arriving at the hospital must be assigned a priority level.

The doctor follows a decision process.

```
Critical?

↓

Yes

↓

Immediate Treatment

↓

Stop
```

Otherwise,

```
High Risk?

↓

Yes

↓

Urgent

↓

Stop
```

Otherwise,

```
Normal Patient

↓

Regular Queue
```

Notice something important.

The doctor stops evaluating conditions once the first matching condition is found.

CASE follows exactly the same principle.

---

# CASE Is Everywhere

Many beginners believe CASE is mainly used in reporting.

In reality, CASE appears in almost every enterprise data platform.

Examples include:

## Banking

Customer Segmentation

Loan Classification

Risk Scoring

AML Pipelines

Transaction Monitoring

---

## Healthcare

Patient Risk

Insurance Processing

Emergency Prioritization

Clinical Dashboards

---

## Retail

Customer Loyalty

Discount Calculation

Inventory Classification

Sales KPIs

---

## Insurance

Claim Routing

Fraud Detection

Premium Classification

Policy Segmentation

---

## Telecommunications

Subscriber Classification

Recharge Categories

Revenue Segmentation

Network Alerts

---

## Manufacturing

Quality Inspection

Machine Health

Defect Classification

Production KPIs

---

# Objectives of This Chapter

By the end of this chapter, you will understand not only how CASE works, but also:

- how database engines evaluate CASE,
- how optimizers treat CASE expressions,
- when CASE affects performance,
- when CASE should be replaced with lookup tables,
- how CASE behaves inside ETL pipelines,
- how to review CASE expressions during code reviews,
- and how senior Data Engineers design maintainable business-rule systems.

The remaining sections build on these ideas step by step, moving from SQL syntax to production architecture.

---


# ==========================================================
# Section 2
# CASE Execution Internals
# ==========================================================

# Why Should a Data Engineer Understand CASE Internals?

Many developers treat CASE as a black box.

They write:

```sql
CASE
    WHEN salary >= 100000 THEN 'Executive'
    ELSE 'Employee'
END
```

The query returns the expected result, so they move on.

However, professional Data Engineers need to answer much deeper questions.

- How many times is the CASE expression evaluated?
- Does CASE execute before or after WHERE?
- Does CASE execute before JOIN?
- Can the optimizer simplify CASE?
- Does CASE prevent index usage?
- Does CASE consume CPU?
- Can CASE be parallelized?
- Why do two CASE expressions with identical results sometimes have different execution times?

Understanding these concepts helps you write SQL that is not only correct, but also scalable and maintainable.

---

# CASE Is an Expression

One of the most common misconceptions is that CASE behaves like an IF statement in a programming language.

It does not.

CASE is an expression.

Expressions return values.

For example,

```sql
SELECT

salary * 1.10
```

is an expression.

Likewise,

```sql
CASE
WHEN salary>=100000
THEN 'Executive'
ELSE 'Employee'
END
```

also returns a value.

Since CASE returns a value, SQL can place it almost anywhere that accepts expressions.

Examples include

- SELECT
- ORDER BY
- GROUP BY
- HAVING
- UPDATE
- INSERT
- Aggregate Functions
- Window Functions

---

# The Journey of a SQL Query

Before CASE is ever evaluated, the database processes the SQL statement through several internal stages.

```
                User Query

                     │

                     ▼

               SQL Parser

                     │

                     ▼

           Syntax Validation

                     │

                     ▼

          Semantic Validation

                     │

                     ▼

          Logical Query Plan

                     │

                     ▼

        Cost-Based Optimizer

                     │

                     ▼

         Physical Query Plan

                     │

                     ▼

           Read Data Pages

                     │

                     ▼

         Evaluate Expressions

                     │

                     ▼

              Return Result
```

Notice something important.

CASE does **not** execute immediately after the SQL is submitted.

It is evaluated during query execution after the optimizer has already selected an execution strategy.

---

# Example 33.3

```sql
SELECT

employee_name,

salary,

CASE

WHEN salary>=100000 THEN 'Executive'

WHEN salary>=50000 THEN 'Senior'

ELSE 'Junior'

END AS employee_level

FROM employees;
```

Let's examine what happens internally.

---

# Step 1 — Parsing

The SQL parser first checks whether the statement follows SQL grammar.

For example,

```sql
CASE

WHEN

THEN
```

must appear in the correct order.

Missing keywords generate syntax errors before any data is read.

Example

```sql
CASE

salary>100000

THEN 'Executive'
```

This produces an error because the WHEN keyword is missing.

At this stage, the database has not yet examined the employee table.

---

# Step 2 — Semantic Validation

After syntax validation succeeds,

the database verifies that every referenced object exists.

For example,

```
employees
```

must exist.

```
salary
```

must exist.

```
employee_name
```

must exist.

The database also verifies permissions.

If the current user lacks permission to access the table,

execution stops here.

Again,

no rows have been read yet.

---

# Step 3 — Logical Query Plan

The parser converts SQL into an internal representation.

Conceptually,

```
Scan Employees

↓

Read Salary

↓

Evaluate CASE

↓

Project Output
```

This is called the logical query plan.

The logical plan describes **what** must happen.

It does not describe **how** it will happen.

---

# Step 4 — Cost-Based Optimizer

Now the optimizer begins its work.

The optimizer asks questions such as

- Should I use an index?

- Should I scan the table?

- Can I execute in parallel?

- Should predicates be pushed down?

- Can expressions be simplified?

- Is constant folding possible?

The optimizer chooses the least expensive execution strategy according to its cost model.

---

# Step 5 — Physical Query Plan

The optimizer finally produces an executable plan.

A simplified execution plan might look like

```
Table Scan

↓

Projection

↓

CASE Evaluation

↓

Output
```

Different database engines represent this differently.

---

# Step 6 — Reading Rows

Only now does the database begin reading employee rows.

Suppose the table contains

| Employee | Salary |
|-----------|--------|
| Alice | 125000 |
| Bob | 70000 |
| Charlie | 30000 |

The execution engine processes one row at a time.

---

# Step 7 — CASE Evaluation

Alice

```
Salary

125000

↓

Condition 1

salary>=100000

↓

TRUE

↓

Return Executive

↓

STOP
```

Notice

The remaining WHEN clauses are never evaluated.

---

Bob

```
Salary

70000

↓

Condition 1

FALSE

↓

Condition 2

TRUE

↓

Return Senior

↓

STOP
```

---

Charlie

```
Salary

30000

↓

Condition 1

FALSE

↓

Condition 2

FALSE

↓

ELSE

↓

Junior
```

---

# Expression Trees

Internally,

CASE is represented as an expression tree.

Conceptually,

```
                CASE

                  │

        ┌─────────┴─────────┐

        ▼                   ▼

 Condition 1          Condition 2

        │                   │

        ▼                   ▼

 Executive           Senior

             │

             ▼

            ELSE

             │

             ▼

           Junior
```

The execution engine evaluates this tree for every row.

---

# Row-by-Row Evaluation

One important fact surprises many beginners.

CASE is evaluated once **for every row**.

If a query processes

```
10 rows
```

CASE executes

```
10 times.
```

If a query processes

```
500 million rows
```

CASE executes

```
500 million times.
```

This explains why expensive expressions inside CASE can significantly increase CPU usage.

---

# CASE and CPU Utilization

Consider

```sql
CASE

WHEN UPPER(city)='MUMBAI'

THEN 'West'

ELSE 'Other'

END
```

The function

```
UPPER(city)
```

must be evaluated for every row.

If the table contains

```
800 million rows
```

the database performs

```
800 million

UPPER()

operations.
```

The CASE itself is inexpensive.

The expressions inside CASE often consume most of the CPU time.

---

# CASE Is Not Stored

Another common misunderstanding is that CASE stores values in the table.

It does not.

For example,

```sql
SELECT

CASE

WHEN salary>50000

THEN 'High'

END
```

does **not** modify the employees table.

CASE simply computes a value while producing the result set.

The original data remains unchanged.

To permanently store the result, you would need an INSERT, UPDATE, generated column, materialized view, or ETL process.

---

# SQL Server Perspective

In SQL Server execution plans,

CASE commonly appears inside the **Compute Scalar** operator.

Conceptually,

```
Clustered Index Scan

↓

Compute Scalar

↓

Output
```

Compute Scalar evaluates expressions,

including

- CASE
- Arithmetic
- String concatenation
- Mathematical functions

---

# PostgreSQL Perspective

PostgreSQL does not have a dedicated CASE operator.

Instead,

CASE expressions appear within the **Projection** phase of the execution plan.

Conceptually,

```
Seq Scan

↓

Projection

↓

Output
```

The projection step computes expressions for each row before returning them.

---

# Spark SQL Perspective

Spark SQL converts CASE expressions into Catalyst expression trees.

Catalyst may optimize the expression,

remove unreachable branches,

or simplify constant expressions before generating the physical execution plan.

Execution still follows the same logical rule:

```
First TRUE condition wins.
```

---

# Snowflake Perspective

Snowflake represents CASE as part of its projection layer.

The cloud execution engine distributes row processing across compute nodes when appropriate.

Although execution is distributed,

the logical behavior of CASE remains identical.

---

# Common Misconceptions

## Misconception 1

> CASE modifies data.

False.

CASE only returns values.

---

## Misconception 2

> CASE executes before SQL optimization.

False.

Optimization occurs before CASE evaluation.

---

## Misconception 3

> CASE evaluates every WHEN condition.

False.

Evaluation stops after the first matching condition.

---

## Misconception 4

> CASE is expensive.

Not necessarily.

CASE is usually inexpensive.

The expressions inside CASE determine the actual cost.

---

# Engineering Insight

As Data Engineers,

we should think of CASE as a **row-level transformation engine**.

Every row enters the CASE expression,

gets evaluated,

and leaves with a derived value.

The complexity of that transformation directly affects CPU utilization,

query readability,

and long-term maintainability.

---

# Interview Questions

## Beginner

1. Is CASE an expression or a statement?
2. Can CASE be used in ORDER BY?
3. Does CASE modify table data?

---

## Intermediate

1. At what stage of query execution is CASE evaluated?
2. Why is CASE evaluated once per row?
3. Why does condition order matter?

---

## Senior

1. How does SQL Server represent CASE in an execution plan?
2. Why can expensive functions inside CASE become performance bottlenecks?
3. How does Spark SQL optimize CASE expressions?

---

# Section Summary

In this section, you learned that:

- CASE is an expression, not a procedural statement.
- CASE is evaluated during query execution, after optimization.
- Every row is evaluated independently.
- CASE stops at the first matching WHEN clause.
- CASE itself is inexpensive; expensive expressions inside CASE usually dominate execution cost.
- Different database engines represent CASE differently in execution plans, but the logical behavior remains consistent.

# ==========================================================
# Section 3
# CASE Evaluation, Short-Circuit Logic & Expression Optimization
# ==========================================================

# Why This Section Matters

One of the biggest misconceptions about CASE is that every
WHEN condition is evaluated for every row.

Many developers believe the database executes CASE like this:

```

WHEN 1

↓

WHEN 2

↓

WHEN 3

↓

WHEN 4

↓

Return Result

```

This mental model is incorrect.

Understanding how CASE evaluates conditions helps you:

- Write faster SQL
- Avoid hidden bugs
- Reduce CPU usage
- Design maintainable business rules
- Pass senior SQL interviews

---

# CASE Uses Sequential Evaluation

A CASE expression evaluates its WHEN clauses from top to bottom.

The first condition that evaluates to TRUE determines the result.

After that, evaluation stops.

This is called **first-match semantics**.

Consider the following example.

```sql
SELECT
    employee_name,
    salary,
    CASE
        WHEN salary >= 100000 THEN 'Executive'
        WHEN salary >= 50000 THEN 'Senior'
        WHEN salary >= 25000 THEN 'Associate'
        ELSE 'Intern'
    END AS employee_grade
FROM employees;
```

For an employee earning ₹125,000, the evaluation is:

```

Salary = 125000

↓

salary >=100000 ?

↓

TRUE

↓

Return Executive

↓

STOP

```

The remaining conditions are never considered.

---

# Visual Representation

```

                CASE

                  │

                  ▼

       salary >=100000 ?

          │

   ┌──────┴───────┐

TRUE            FALSE

│                 │

▼                 ▼

Executive     salary>=50000 ?

                     │

             ┌───────┴────────┐

           TRUE             FALSE

            │                  │

            ▼                  ▼

        Senior          salary>=25000 ?

```

The evaluation moves downward until a condition matches.

Once a branch is selected, SQL exits the CASE expression for that row.

---

# Example 33.4

Employee

| Employee | Salary |
|----------|--------:|
| Alice | 150000 |
| Bob | 80000 |
| Charlie | 35000 |
| David | 12000 |

Output

| Employee | Grade |
|----------|--------|
| Alice | Executive |
| Bob | Senior |
| Charlie | Associate |
| David | Intern |

Notice that every employee follows a different execution path through the same CASE expression.

---

# Why Ordering Matters

Suppose we accidentally reverse the conditions.

```sql
CASE
    WHEN salary >= 25000 THEN 'Associate'
    WHEN salary >= 50000 THEN 'Senior'
    WHEN salary >=100000 THEN 'Executive'
END
```

Now consider Alice.

Salary

```
150000
```

Evaluation

```

salary>=25000 ?

↓

TRUE

↓

Associate

↓

STOP

```

The result is completely wrong.

The query executes successfully.

No warning is generated.

This is one of the most dangerous CASE bugs because it silently produces incorrect business results.

---

# Rule of Thumb

When ranges overlap,

always write conditions from the most restrictive to the least restrictive.

Good

```sql
CASE
    WHEN salary >=100000 THEN 'Executive'
    WHEN salary >=50000 THEN 'Senior'
    WHEN salary >=25000 THEN 'Associate'
    ELSE 'Intern'
END
```

Bad

```sql
CASE
    WHEN salary >=25000 THEN 'Associate'
    WHEN salary >=50000 THEN 'Senior'
    WHEN salary >=100000 THEN 'Executive'
END
```

---

# Overlapping Conditions

Consider this CASE expression.

```sql
CASE
    WHEN amount > 0 THEN 'Positive'
    WHEN amount > 1000 THEN 'Large Positive'
END
```

Will "Large Positive" ever be returned?

No.

Every value greater than 1000 is also greater than 0.

The second condition is unreachable.

This is known as an **unreachable branch**.

---

# Example 33.5 — Detecting Unreachable Logic

Bad

```sql
CASE
    WHEN age >=18 THEN 'Adult'
    WHEN age >=65 THEN 'Senior Citizen'
END
```

Correct

```sql
CASE
    WHEN age >=65 THEN 'Senior Citizen'
    WHEN age >=18 THEN 'Adult'
END
```

Notice how changing only the order completely changes the business logic.

---

# Short-Circuit Evaluation

The term **short-circuit evaluation** is borrowed from programming languages.

In the context of CASE, it means:

> Once a WHEN condition is selected for a row, later WHEN branches for that row are not evaluated.

Conceptually,

```

WHEN 1

↓

TRUE ?

↓

YES

↓

RETURN

↓

STOP

```

No further WHEN clauses are considered for that row.

> **Note:** This describes the logical behavior of a CASE expression. Database optimizers may rewrite expressions internally while preserving the same observable result.

---

# Does SQL Always Evaluate Left to Right?

From the SQL language perspective, CASE returns the result associated with the first matching WHEN clause.

However, modern database optimizers are sophisticated.

They may:

- Simplify constant expressions
- Remove unreachable branches
- Fold constants
- Rewrite expressions internally

while preserving the logical meaning of the CASE expression.

As SQL developers, you should **never rely on side effects** inside CASE conditions.

---

# Expression Simplification

Consider this example.

```sql
CASE
    WHEN 1 = 1 THEN 'Always'
    WHEN salary > 100000 THEN 'Executive'
END
```

The second condition can never be reached.

Many optimizers recognize this during optimization.

Conceptually,

```

CASE

↓

WHEN TRUE

↓

Always

```

The remaining branches may be eliminated because they cannot affect the result.

---

# Constant Folding

Another common optimization is constant folding.

Example

```sql
CASE
    WHEN salary > (50000 + 50000)
    THEN 'Executive'
END
```

Instead of computing

```
50000 + 50000
```

for every row,

the optimizer may simplify it to

```sql
salary > 100000
```

before execution begins.

This reduces unnecessary computation.

---

# CPU Cost of CASE

CASE itself performs very little work.

The expensive part is usually the expressions inside CASE.

Example

```sql
CASE
    WHEN UPPER(city) = 'MUMBAI' THEN 'West'
    ELSE 'Other'
END
```

Suppose the table contains

```
250 Million Rows
```

The database may evaluate

```
UPPER(city)
```

for every row.

That means

```
250 Million Function Calls
```

The CASE expression is inexpensive.

The function evaluation is expensive.

---

# Better Design

Instead of

```sql
CASE
    WHEN UPPER(city)='MUMBAI'
```

consider normalizing the data during ingestion or using a case-insensitive comparison mechanism provided by your database.

This reduces repeated computation during query execution.

---

# CASE and Expensive Functions

Avoid repeatedly calling:

- UPPER()
- LOWER()
- TRIM()
- REPLACE()
- REGEXP functions
- Complex mathematical functions

inside CASE when working with very large datasets.

Instead,

perform expensive transformations earlier in the ETL pipeline whenever possible.

---

# Engineering Insight

Professional Data Engineers think about CASE differently.

Instead of asking

> "Does this CASE work?"

they ask

- Can two conditions overlap?
- Are any branches unreachable?
- Is every branch mutually exclusive?
- Can the optimizer simplify this?
- Are expensive functions executed unnecessarily?
- Should these rules move into a lookup table?

Those questions lead to SQL that is easier to maintain and more efficient.

---

# Production Story

An insurance company classified claims using a CASE expression containing more than 120 conditions.

Several branches were accidentally duplicated after years of business changes.

As a result:

- Some branches could never be reached.
- Different ETL jobs produced inconsistent classifications.
- Developers were afraid to modify the SQL.

The engineering team refactored the rules into a reference table with effective dates and priorities.

The CASE expression became dramatically smaller, and business users could update classifications without changing SQL code.

---

# Best Practices

✅ Order overlapping conditions carefully.

✅ Write mutually exclusive conditions whenever possible.

✅ Avoid expensive functions inside CASE.

✅ Add comments explaining complex business rules.

✅ Review CASE expressions whenever new business rules are added.

---

# Common Mistakes

❌ Incorrect ordering.

❌ Unreachable branches.

❌ Missing ELSE.

❌ Repeating expensive calculations.

❌ Assuming the optimizer executes SQL exactly as written.

---

# Interview Questions

## Beginner

1. What happens after the first matching WHEN clause?

2. Why does condition order matter?

---

## Intermediate

1. What is an unreachable CASE branch?

2. Explain short-circuit evaluation in CASE.

3. What is constant folding?

---

## Senior

1. How can overlapping conditions introduce production bugs?

2. Why should expensive functions inside CASE be avoided?

3. How can CASE expressions be simplified by the optimizer?

---

# Section Summary

In this section, you learned that:

- CASE follows first-match semantics.
- The order of WHEN clauses directly affects correctness.
- Overlapping conditions can create unreachable branches.
- Database optimizers may simplify CASE expressions while preserving their logical behavior.
- CASE itself is inexpensive; repeated function calls inside CASE often dominate execution cost.
- Careful design of CASE expressions improves readability, maintainability, and performance.


# ==========================================================
# Section 4
# CASE and the Query Optimizer
# ==========================================================

# Why This Section Matters

One of the biggest myths about SQL is:

> "The database executes SQL exactly as we write it."

This is **false**.

When you submit a SQL query, the database does **not** execute the text you wrote directly.

Instead, it analyzes the query, estimates multiple execution strategies, and chooses the one with the lowest estimated cost.

This process is called **Query Optimization**.

Understanding how the optimizer treats CASE expressions helps Data Engineers write SQL that is:

- Faster
- More scalable
- Easier to maintain
- Easier for the optimizer to optimize

---

# Mental Model

Imagine two people traveling from Mumbai to Delhi.

Person A says

```
Take Highway A
```

Person B says

```
Reach Delhi as quickly as possible.
```

Person A specifies **how**.

Person B specifies **what**.

SQL works like Person B.

You describe **what** result you want.

The optimizer decides **how** to produce it.

---

# Where CASE Fits

Consider the following query.

```sql
SELECT
    employee_name,
    salary,
    CASE
        WHEN salary >= 100000 THEN 'Executive'
        ELSE 'Employee'
    END AS employee_type
FROM employees;
```

Many beginners imagine this execution order.

```
Read Row

↓

Evaluate CASE

↓

Return Row
```

The actual process is closer to this.

```
SQL Query

↓

Parser

↓

Logical Plan

↓

Optimizer

↓

Physical Plan

↓

Table Scan

↓

Projection

↓

CASE Evaluation

↓

Return Result
```

Notice that CASE is evaluated **after** the optimizer has already chosen the execution strategy.

---

# Logical Plan vs Physical Plan

Understanding this distinction is fundamental.

## Logical Plan

The logical plan describes **what** operations are required.

Example

```
Read Employees

↓

Calculate Employee Type

↓

Return Result
```

The logical plan says nothing about indexes, joins, memory, or CPU.

---

## Physical Plan

The physical plan describes **how** the database will execute the query.

For example

```
Index Scan

↓

Projection

↓

Output
```

or

```
Sequential Scan

↓

Projection

↓

Output
```

The optimizer decides which physical plan is expected to cost less.

---

# Example 33.6

Query

```sql
SELECT
    employee_name,
    CASE
        WHEN salary >= 100000 THEN 'Executive'
        ELSE 'Employee'
    END
FROM employees;
```

Conceptually, the optimizer may produce a plan like:

```
Seq Scan

↓

Projection

↓

CASE Evaluation

↓

Output
```

The exact operators differ across databases, but the overall idea is the same.

---

# Can the Optimizer Simplify CASE?

Yes.

Suppose we write

```sql
CASE
    WHEN 1 = 1 THEN 'Always True'
    ELSE 'Impossible'
END
```

The optimizer immediately recognizes

```
1 = 1

↓

TRUE
```

Conceptually, it simplifies the expression to

```sql
'Always True'
```

There is no reason to evaluate an expression that is guaranteed to produce the same result.

---

# Constant Folding

Another common optimization is **constant folding**.

Consider

```sql
CASE
    WHEN salary > (40000 + 60000)
    THEN 'Executive'
END
```

The expression

```
40000 + 60000
```

never changes.

The optimizer can simplify it before execution begins.

Conceptually

```
40000 + 60000

↓

100000
```

Result

```sql
CASE
    WHEN salary > 100000
```

The computation is performed once during optimization instead of once per row.

---

# Dead Branch Elimination

Consider

```sql
CASE
    WHEN TRUE THEN 'A'
    WHEN salary > 100000 THEN 'B'
END
```

The second branch can never affect the result.

Some optimizers recognize this and remove unreachable logic.

Conceptually

```
WHEN TRUE

↓

Return A

↓

Done
```

This reduces unnecessary work.

---

# Predicate Pushdown

One of the most important optimizer techniques is **Predicate Pushdown**.

Suppose we write

```sql
SELECT
    employee_name,
    CASE
        WHEN salary >=100000 THEN 'Executive'
        ELSE 'Employee'
    END
FROM employees
WHERE department='IT';
```

The optimizer tries to reduce the number of rows before evaluating CASE.

Conceptually

```
Read Employees

↓

Filter Department='IT'

↓

Evaluate CASE

↓

Return Result
```

Filtering early usually means fewer CASE evaluations.

This is especially important on very large datasets.

---

# CASE Does Not Filter Rows

Another misconception is that CASE behaves like WHERE.

Consider

```sql
SELECT
CASE
WHEN salary>100000
THEN 'Executive'
ELSE 'Employee'
END
FROM employees;
```

Every employee is still returned.

CASE classifies rows.

WHERE filters rows.

These are completely different responsibilities.

---

# CASE and Index Usage

Consider

```sql
SELECT
CASE
WHEN salary>100000
THEN 'High'
ELSE 'Low'
END
FROM employees;
```

CASE itself does not normally determine whether an index is used.

The optimizer chooses access paths based primarily on predicates such as:

```sql
WHERE salary>100000
```

rather than expressions appearing only in the SELECT list.

However, placing CASE inside predicates can make optimization more difficult.

---

# Example 33.7

Less desirable

```sql
WHERE
CASE
WHEN department='IT'
THEN salary
ELSE 0
END
>50000
```

This makes the filtering logic harder for both humans and the optimizer to reason about.

A clearer alternative is often:

```sql
WHERE
department='IT'
AND salary>50000
```

This more directly expresses the business rule and is often easier to optimize.

---

# CASE and Parallel Execution

Modern databases support parallel execution.

Suppose a table contains

```
1 Billion Rows
```

The optimizer may divide the work among multiple workers.

Conceptually

```
Partition 1

↓

CASE

↓

Worker 1

----------------

Partition 2

↓

CASE

↓

Worker 2

----------------

Partition 3

↓

CASE

↓

Worker 3
```

Each worker independently evaluates CASE for its assigned rows.

The logical result remains unchanged.

---

# PostgreSQL Perspective

PostgreSQL treats CASE as part of the projection phase.

You can inspect plans using

```sql
EXPLAIN ANALYZE
SELECT ...
```

The execution plan will usually show CASE as part of the output expressions rather than as a standalone operator.

---

# SQL Server Perspective

SQL Server commonly evaluates CASE inside the **Compute Scalar** operator.

Compute Scalar is responsible for calculating expressions such as:

- CASE
- Arithmetic
- String concatenation
- Date calculations

Understanding Compute Scalar is useful during performance tuning.

---

# Spark SQL Perspective

Spark SQL converts CASE expressions into Catalyst expression trees.

The Catalyst optimizer may:

- Simplify constants
- Remove unreachable branches
- Optimize projections

before generating the physical execution plan.

---

# Snowflake Perspective

Snowflake evaluates CASE during projection.

The execution engine distributes row processing across virtual warehouse compute resources when appropriate.

Although execution is distributed, the logical behavior of CASE remains unchanged.

---

# Engineering Insight

The optimizer cannot improve poorly designed business logic.

If a CASE expression contains:

- duplicated rules,
- overlapping conditions,
- expensive functions,
- unnecessary nesting,

the optimizer still has to execute that logic.

Writing efficient CASE expressions is therefore a shared responsibility between the SQL developer and the database optimizer.

---

# Production Story

A retail company classified products using more than 300 CASE conditions.

The optimizer generated an efficient execution plan, but the query still performed poorly.

The problem was not the execution plan.

The problem was that every row evaluated hundreds of unnecessary comparisons.

The engineering team moved the classification rules into a lookup table and joined against it.

The SQL became:

- Smaller
- Easier to maintain
- Easier to review
- Faster to modify when business rules changed

The optimizer had not failed.

The design had.

---

# Best Practices

✅ Let the optimizer do its job.

✅ Write clear predicates.

✅ Keep CASE focused on deriving values, not filtering rows.

✅ Avoid unnecessary complexity inside CASE.

✅ Review execution plans for expensive queries.

---

# Common Mistakes

❌ Assuming SQL executes exactly as written.

❌ Using CASE where a simple predicate is sufficient.

❌ Ignoring the logical vs physical execution distinction.

❌ Expecting the optimizer to fix poor business-rule design.

---

# Interview Questions

## Beginner

1. Does CASE execute before the optimizer?

2. Does CASE filter rows?

---

## Intermediate

1. What is constant folding?

2. What is predicate pushdown?

3. What is the difference between a logical plan and a physical plan?

---

## Senior

1. How does SQL Server evaluate CASE expressions?

2. Why can large CASE expressions still perform poorly even with a good execution plan?

3. When should CASE logic be moved to a lookup table?

---

# Section Summary

In this section, you learned that:

- The optimizer chooses the execution strategy before CASE is evaluated.
- CASE participates in the projection phase of query execution.
- Optimizers can simplify constant expressions and eliminate unreachable branches.
- Predicate pushdown reduces the number of rows that reach CASE.
- CASE derives values; it does not filter rows.
- Efficient SQL depends on both a capable optimizer and well-designed business logic.


# ==========================================================
# Section 5
# CASE Performance Optimization
# ==========================================================

# Introduction

One of the most common misconceptions in SQL is:

> "CASE expressions are slow."

This statement is incomplete.

A CASE expression itself is extremely lightweight.

In most situations, evaluating a CASE expression requires only a few CPU instructions.

The real performance problems usually come from:

- Expensive functions inside CASE
- Repeated evaluation of the same logic
- Very large CASE expressions
- Poor query design
- Missing indexes
- Reading unnecessary rows
- Poor data modeling

A Senior Data Engineer never asks,

> "Is CASE slow?"

Instead they ask,

> "What part of this CASE expression is expensive?"

That question changes everything.

---

# Understanding the Cost of CASE

Imagine a table containing

```
1,000 rows
```

and another containing

```
1 Billion rows.
```

The CASE expression is executed once per row.

Therefore

```
1,000 rows

↓

1,000 CASE evaluations
```

while

```
1 Billion rows

↓

1 Billion CASE evaluations
```

CASE scales linearly with the number of rows processed.

For simple comparisons this is usually not a problem.

However, expensive operations inside CASE can become extremely costly.

---

# Example 33.8

Simple CASE

```sql
CASE
    WHEN salary >= 100000 THEN 'Executive'
    ELSE 'Employee'
END
```

For every row, SQL performs

- one comparison
- one result selection

This is extremely fast.

---

# Example 33.9

Now consider

```sql
CASE
    WHEN UPPER(TRIM(city))='MUMBAI'
    THEN 'West'
    ELSE 'Other'
END
```

Now every row performs

```
TRIM()

↓

UPPER()

↓

Comparison
```

Suppose the table contains

```
600 Million Rows
```

The database executes

```
600 Million TRIM()

+

600 Million UPPER()
```

before making the comparison.

Notice something important.

The expensive part is not CASE.

It is the repeated function calls.

---

# CPU Cost Breakdown

Simple CASE

```
Read Row

↓

Compare Integer

↓

Return Result
```

Estimated work

```
Very Low
```

---

Complex CASE

```
Read Row

↓

TRIM()

↓

UPPER()

↓

REGEXP

↓

Comparison

↓

Return Result
```

Estimated work

```
High CPU
```

---

# Expensive Functions Inside CASE

Functions commonly seen inside CASE include

```sql
UPPER()

LOWER()

TRIM()

REPLACE()

SUBSTRING()

REGEXP_REPLACE()

REGEXP_LIKE()

DATE_FORMAT()

TO_CHAR()
```

These functions execute for every processed row.

On small tables this is insignificant.

On billion-row fact tables it becomes expensive.

---

# Example 33.10

Bad

```sql
CASE

WHEN UPPER(city)='MUMBAI'

THEN 'West'

ELSE 'Other'

END
```

Better

Normalize city names during data ingestion.

Store

```
MUMBAI
```

instead of

```
Mumbai

mumbai

MUMBAI

MuMbAi
```

Now CASE becomes

```sql
CASE

WHEN city='MUMBAI'

THEN 'West'

ELSE 'Other'
END
```

No UPPER() required.

---

# Repeated CASE Expressions

Another common performance issue.

Example

```sql
SELECT

CASE ...

END AS Grade,

CASE ...

END AS Bonus,

CASE ...

END AS Promotion,

CASE ...

END AS Category
```

Suppose all four CASE expressions repeat almost identical business rules.

The database evaluates each expression independently.

This increases CPU usage and makes maintenance difficult.

---

# Better Design

Instead of

```
CASE

CASE

CASE

CASE
```

consider

```
Derived Table

↓

CTE

↓

View

↓

Materialized View
```

Compute the business rule once.

Reuse it everywhere.

---

# CASE Inside WHERE

Consider

```sql
SELECT *

FROM employees

WHERE

CASE

WHEN department='IT'

THEN salary

ELSE 0

END >50000;
```

This query is harder to optimize.

The optimizer must evaluate the CASE expression before deciding whether the row satisfies the predicate.

A clearer alternative is

```sql
SELECT *

FROM employees

WHERE department='IT'

AND salary>50000;
```

This expresses the business rule directly and often gives the optimizer more opportunities to produce an efficient plan.

---

# CASE and Indexes

Consider

```sql
WHERE salary>100000
```

An index on

```
salary
```

may help the optimizer locate qualifying rows efficiently.

Now compare

```sql
WHERE

CASE

WHEN department='IT'

THEN salary

ELSE 0

END >100000;
```

The optimizer now has a more complex expression to analyze.

Whether an index can still be used depends on the database engine, the exact expression, and available indexes.

As a general guideline,

keep predicates simple whenever possible.

---

# CASE and Memory

CASE itself requires very little memory.

However,

very large expressions containing hundreds of branches increase

- query complexity
- compiled plan size
- parsing time
- optimization time

This rarely becomes the primary bottleneck,

but it contributes to overall query cost.

---

# Large CASE Expressions

Imagine

```sql
CASE

WHEN code='A001'

...

WHEN code='A999'

...
```

Hundreds of branches.

Questions to ask:

- Can business users maintain this?
- Can new rules be added safely?
- Can this become a lookup table?

If the answer is yes,

a lookup table is usually a better long-term design.

---

# Benchmark Scenario

Suppose we classify

```
100 Million Customers
```

Approach A

```
200 WHEN clauses
```

Approach B

```
Customer

↓

JOIN

↓

Customer Category Table
```

Approach B often offers better maintainability because business rules live in data instead of code.

Performance depends on many factors including indexing, data distribution, and optimizer choices, so always benchmark with real workloads.

---

# CASE in ETL Pipelines

Nightly ETL

```
Read Source

↓

CASE

↓

Classification

↓

Warehouse
```

If the pipeline executes every night,

even small improvements save considerable compute time over months and years.

This is why Data Engineers continuously review transformation logic.

---

# Engineering Insight

A CASE expression should answer business questions,

not become a database of business rules.

If business rules change frequently,

they probably belong in

- lookup tables
- configuration tables
- dimension tables
- metadata tables

instead of hardcoded SQL.

---

# Production Story

A telecommunications company maintained a CASE expression containing over 400 WHEN clauses to map product codes.

Every product launch required modifying SQL.

Every modification required code review.

Every deployment required regression testing.

Eventually the engineering team replaced the CASE expression with

```
product_dimension
```

The SQL shrank from hundreds of lines to a simple JOIN.

Business users could now update mappings without changing SQL code.

Maintenance time dropped dramatically.

---

# Performance Checklist

Before deploying a CASE expression ask yourself:

✓ Does CASE contain expensive functions?

✓ Can expensive transformations happen earlier in ETL?

✓ Are overlapping conditions present?

✓ Can repeated CASE expressions be consolidated?

✓ Should this become a lookup table?

✓ Can predicates be simplified?

✓ Have I reviewed the execution plan?

---

# Best Practices

✅ Keep CASE expressions focused.

✅ Normalize data whenever possible.

✅ Avoid unnecessary function calls.

✅ Reuse business logic.

✅ Benchmark changes using realistic datasets.

---

# Common Mistakes

❌ Assuming CASE is the performance bottleneck.

❌ Calling expensive functions for every row.

❌ Copying the same CASE expression into multiple reports.

❌ Creating CASE expressions with hundreds of branches.

❌ Ignoring execution plans.

---

# Benchmark Lab

## Scenario

You need to classify 50 million customer records.

### Version A

```sql
CASE
WHEN UPPER(TRIM(city))='MUMBAI'
THEN 'WEST'
ELSE 'OTHER'
END
```

### Version B

```sql
CASE
WHEN city='MUMBAI'
THEN 'WEST'
ELSE 'OTHER'
END
```

### Discussion

Compare the two approaches.

Think about:

- CPU usage
- Function evaluations
- Readability
- Maintainability
- ETL preprocessing opportunities

---

# Interview Questions

## Beginner

1. Is CASE inherently slow?

2. How many times is CASE evaluated?

---

## Intermediate

1. Why can functions inside CASE become expensive?

2. Why should CASE generally be avoided inside WHERE when a simpler predicate is possible?

3. What are repeated CASE expressions?

---

## Senior

1. How would you optimize a CASE expression with 300 WHEN clauses?

2. When should CASE logic be moved into a lookup table?

3. How would you benchmark two different CASE implementations?

---

# Section Summary

In this section, you learned:

- CASE itself is usually inexpensive.
- The expressions inside CASE often determine the real execution cost.
- Expensive functions can significantly increase CPU usage.
- Repeated CASE expressions reduce maintainability.
- Large CASE expressions often indicate a data-modeling problem.
- Good performance comes from efficient SQL design, thoughtful data modeling, and understanding how the optimizer processes expressions.

# ==========================================================
# Section 6
# CASE Anti-Patterns & Enterprise Code Review
# ==========================================================

# Introduction

Writing a CASE expression is easy.

Writing a CASE expression that remains readable, maintainable, scalable, and performant for the next five years is much harder.

One of the responsibilities of a Senior Data Engineer is reviewing SQL written by other developers.

During these reviews, the same mistakes appear repeatedly.

These mistakes are known as **anti-patterns**.

An anti-pattern is a solution that appears correct initially but creates long-term problems.

Understanding these anti-patterns helps you:

- Write cleaner SQL
- Reduce technical debt
- Improve maintainability
- Prevent performance problems
- Standardize business logic
- Pass senior SQL interviews

Throughout this section, every anti-pattern includes:

- ❌ Poor SQL
- 🔍 Code Review
- ⚠ Why It Is Dangerous
- ✅ Recommended Solution

---

# Anti-Pattern 1
# Wrong Condition Order

Poor SQL

```sql
SELECT
employee_name,

CASE

WHEN salary>=10000 THEN 'Junior'

WHEN salary>=50000 THEN 'Senior'

WHEN salary>=100000 THEN 'Executive'

END

FROM employees;
```

---

## Enterprise Code Review

```
Review Comments

✓ SQL syntax is valid.

✗ Business logic is incorrect.

✗ Conditions overlap.

✗ Executive employees are classified as Junior.
```

---

## Why It Happens

Many developers write conditions in ascending order because it feels natural.

Unfortunately,

CASE stops after the first matching condition.

Therefore,

every employee earning more than ₹100,000 satisfies

```
salary>=10000
```

before SQL ever reaches

```
salary>=100000
```

---

## Correct Version

```sql
CASE

WHEN salary>=100000 THEN 'Executive'

WHEN salary>=50000 THEN 'Senior'

WHEN salary>=10000 THEN 'Junior'

ELSE 'Unknown'

END
```

---

## Rule

Always write overlapping ranges

```
Most Specific

↓

Least Specific
```

---

# Anti-Pattern 2
# Missing ELSE

Poor SQL

```sql
CASE

WHEN department='IT'

THEN 'Technology'

END
```

---

## Problem

What happens for

```
HR

Finance

Sales
```

Answer

NULL

---

Many dashboards later display

```
(blank)
```

Users think the data is corrupted.

In reality,

the CASE expression simply omitted ELSE.

---

## Better

```sql
CASE

WHEN department='IT'

THEN 'Technology'

ELSE 'Other'

END
```

---

## Engineering Recommendation

Always ask yourself

> "What should happen when none of my conditions match?"

If you cannot answer this,

your CASE is incomplete.

---

# Anti-Pattern 3
# Duplicate CASE Expressions

Poor SQL

```sql
SELECT

CASE

WHEN salary>100000

THEN 'High'

ELSE 'Low'

END AS SalaryBand,

CASE

WHEN salary>100000

THEN 20

ELSE 10

END AS Bonus,

CASE

WHEN salary>100000

THEN 'Promotion'

ELSE 'No Promotion'

END
```

Notice

Every CASE evaluates

```
salary>100000
```

again.

---

## Code Review

```
Repeated Business Rule

↓

Harder Maintenance

↓

Higher CPU

↓

More Bugs
```

---

## Better Design

```sql
WITH EmployeeLevel AS
(
SELECT

employee_id,

salary,

CASE

WHEN salary>100000

THEN 'Executive'

ELSE 'Employee'

END AS EmployeeLevel

FROM employees
)

SELECT *

FROM EmployeeLevel;
```

Now reuse

```
EmployeeLevel
```

instead of repeating the same CASE logic.

---

# Anti-Pattern 4
# Huge CASE Expressions

Real production example

```sql
CASE

WHEN code='A001'

...

WHEN code='A527'

...

WHEN code='A982'

...
```

800 lines.

---

## Why This Is Bad

Imagine

Marketing introduces

```
A983
```

Every ETL

Every Dashboard

Every Stored Procedure

Every Report

must now change.

---

## Enterprise Solution

```
Product Codes

↓

Lookup Table

↓

JOIN

↓

Done
```

Business rules belong in

```
Data

NOT

Code
```

---

# Anti-Pattern 5
# Using CASE Instead of a Lookup Table

Poor SQL

```sql
CASE

WHEN country='IN'

THEN 'India'

WHEN country='US'

THEN 'United States'

WHEN country='JP'

THEN 'Japan'

...
```

---

## Better

```
country_dimension

CountryCode

CountryName
```

Then

```sql
JOIN country_dimension
```

instead.

---

Benefits

- Easier maintenance
- Business controlled
- Reusable
- Less SQL

---

# Anti-Pattern 6
# CASE Inside WHERE

Poor SQL

```sql
SELECT *

FROM employees

WHERE

CASE

WHEN department='IT'

THEN salary

ELSE 0

END >50000;
```

---

## Review

Business logic is difficult to understand.

Filtering logic becomes hidden.

Optimizer opportunities may be reduced depending on the database engine.

---

## Better

```sql
SELECT *

FROM employees

WHERE department='IT'

AND salary>50000;
```

Readable.

Simple.

Usually easier to optimize.

---

# Anti-Pattern 7
# Expensive Functions Inside CASE

Poor SQL

```sql
CASE

WHEN

REGEXP_REPLACE(

LOWER(

TRIM(city)

)

...

)
```

Every row executes

```
TRIM()

↓

LOWER()

↓

REGEXP

↓

CASE
```

---

For

```
500 Million Rows
```

this becomes

```
500 Million

TRIM()

500 Million

LOWER()

500 Million

REGEXP()
```

---

## Better

Normalize

```
city
```

during ingestion.

CASE becomes

```sql
CASE

WHEN city='MUMBAI'

THEN 'West'

END
```

---

# Anti-Pattern 8
# Nested CASE Hell

Poor SQL

```sql
CASE

WHEN ...

THEN

CASE

WHEN ...

THEN

CASE

WHEN ...

```

Eventually

```
CASE

↓

CASE

↓

CASE

↓

CASE

↓

CASE
```

Nobody understands it.

---

## Better

Move rules into

- Views

- CTEs

- Lookup Tables

- Metadata Tables

---

# Anti-Pattern 9
# Mixing Business Domains

Poor SQL

```sql
CASE

Loan Rules

Tax Rules

Fraud Rules

Customer Rules

Insurance Rules

Marketing Rules

Everything Together
```

One CASE.

One thousand lines.

---

Better

Separate

```
Loan Logic

↓

Tax Logic

↓

Fraud Logic

↓

Marketing Logic
```

Each rule should solve

one business problem.

---

# Anti-Pattern 10
# Magic Numbers

Poor SQL

```sql
CASE

WHEN score>847

THEN 'Gold'
```

Question

Why

```
847
```

Nobody knows.

---

Better

```sql
CASE

WHEN score>GoldThreshold
```

Or

store

```
847
```

inside

```
Configuration Table
```

Now everyone understands

where the value originated.

---

# Enterprise Code Review Example

Developer submits

```sql
SELECT

CASE

WHEN salary>100000

THEN 'Executive'

WHEN salary>50000

THEN 'Senior'

END

FROM employees;
```

---

Senior Engineer Review

```
✓ Syntax

Excellent

✓ Readability

Good

✗ Missing ELSE

Potential NULL values

✗ Business Documentation

Missing

✗ Unit Tests

Missing

✓ Performance

Acceptable
```

---

Improved Version

```sql
CASE

WHEN salary>=100000 THEN 'Executive'

WHEN salary>=50000 THEN 'Senior'

ELSE 'Junior'

END
```

---

# Anti-Pattern Decision Matrix

| Situation | Recommended Solution |
|-----------|---------------------|
| 2–5 Rules | CASE |
| 10–20 Rules | CASE with comments |
| 50+ Rules | Lookup Table |
| Frequently changing rules | Metadata Table |
| Business-managed rules | Configuration Table |
| Static derived values | CASE |

---

# Best Practices

✅ Write mutually exclusive conditions.

✅ Keep CASE expressions small.

✅ Always include ELSE.

✅ Replace repetitive mappings with lookup tables.

✅ Document complex business rules.

✅ Review CASE expressions during code review.

---

# Common Mistakes

❌ Wrong ordering.

❌ Missing ELSE.

❌ Copy-paste CASE logic.

❌ 500 WHEN clauses.

❌ Mixing unrelated business rules.

❌ Hardcoded configuration values.

❌ Nested CASE expressions.

---

# Interview Questions

## Beginner

1. Why should CASE usually include ELSE?

2. Why does condition order matter?

---

## Intermediate

1. When should CASE be replaced by a lookup table?

2. Why are duplicate CASE expressions harmful?

3. What is a CASE anti-pattern?

---

## Senior

1. Review a CASE expression containing 300 WHEN clauses.

2. Design a maintainable replacement.

3. Explain why metadata tables are preferable for frequently changing business rules.

---

# Section Summary

In this section, you learned that:

- Correct SQL is not always good SQL.
- Many CASE expressions become difficult to maintain as business rules evolve.
- Lookup tables and metadata tables are often better than very large CASE expressions.
- Code reviews should evaluate correctness, readability, maintainability, and scalability—not just syntax.
- Enterprise SQL favors reusable business rules over hardcoded logic.


# ==========================================================
# Section 7
# CASE vs Lookup Tables
# ==========================================================

# Introduction

One of the most common mistakes developers make is assuming that every business rule belongs inside a CASE expression.

Initially, this seems reasonable.

For example,

```sql
CASE
    WHEN status = 'P' THEN 'Pending'
    WHEN status = 'S' THEN 'Shipped'
    WHEN status = 'D' THEN 'Delivered'
    WHEN status = 'C' THEN 'Cancelled'
END
```

The query is simple.

It works.

There are only four rules.

No problem.

Now imagine the business grows.

Instead of four rules, there are:

- 50 Product Categories
- 120 Insurance Plans
- 300 Tax Codes
- 850 Product Codes
- 2,000 Postal Regions

Should all of these remain inside CASE?

Absolutely not.

---

# The Real Question

The question is not

> Can CASE solve this problem?

The question is

> Should CASE solve this problem?

A Senior Data Engineer always thinks about:

- Maintainability
- Scalability
- Readability
- Performance
- Ease of Change

---

# Business Scenario

Suppose an e-commerce company stores order status codes.

| Code | Meaning |
|------|----------|
| P | Pending |
| S | Shipped |
| D | Delivered |
| C | Cancelled |
| R | Returned |

A developer writes

```sql
SELECT
    order_id,

    CASE
        WHEN status='P' THEN 'Pending'
        WHEN status='S' THEN 'Shipped'
        WHEN status='D' THEN 'Delivered'
        WHEN status='C' THEN 'Cancelled'
        WHEN status='R' THEN 'Returned'
    END AS order_status

FROM orders;
```

Nothing is technically wrong.

But is this the best design?

Let's investigate.

---

# When CASE Is the Right Choice

CASE is an excellent choice when

- The number of rules is small.
- The rules rarely change.
- The logic belongs only to this query.
- The mapping is simple.

Examples

### Salary Bands

```sql
CASE
WHEN salary>=100000 THEN 'Executive'
WHEN salary>=50000 THEN 'Senior'
ELSE 'Junior'
END
```

---

### Pass / Fail

```sql
CASE
WHEN marks>=40
THEN 'Pass'
ELSE 'Fail'
END
```

---

### Adult / Minor

```sql
CASE
WHEN age>=18
THEN 'Adult'
ELSE 'Minor'
END
```

These are business calculations.

CASE is perfect.

---

# When CASE Becomes a Problem

Suppose Marketing adds

```
Returned

↓

Refund Requested

↓

Refund Approved

↓

Refund Completed

↓

Exchange Requested

↓

Exchange Approved

↓

Exchange Completed
```

Now the CASE becomes

```sql
WHEN status='RA' THEN ...
WHEN status='RC' THEN ...
WHEN status='EA' THEN ...
WHEN status='EC' THEN ...
...
```

Every report must change.

Every ETL job must change.

Every dashboard must change.

The maintenance cost grows rapidly.

---

# Lookup Table Solution

Instead of hardcoding the mapping,

store it in a table.

```
order_status_dimension
```

| Status Code | Status Name |
|--------------|-------------|
| P | Pending |
| S | Shipped |
| D | Delivered |
| C | Cancelled |
| R | Returned |

Query

```sql
SELECT

o.order_id,

d.status_name

FROM orders o

JOIN order_status_dimension d

ON o.status=d.status_code;
```

---

# Benefits

Business users can now add

```
RA

Refund Approved
```

without changing SQL.

Only one table changes.

Every report immediately reflects the new business rule.

---

# Visual Comparison

CASE

```
Business Rule

↓

SQL

↓

Deploy

↓

Reports Updated
```

Lookup Table

```
Business Rule

↓

Update Table

↓

Done
```

No SQL deployment.

---

# Example 33.11

CASE Version

```sql
CASE

WHEN country='IN' THEN 'India'

WHEN country='US' THEN 'United States'

WHEN country='JP' THEN 'Japan'

WHEN country='FR' THEN 'France'

...
```

---

Lookup Version

```
country_dimension

CountryCode

CountryName
```

Query

```sql
SELECT

c.customer_name,

d.country_name

FROM customers c

JOIN country_dimension d

ON c.country_code=d.country_code;
```

Which version is easier to maintain?

Clearly,

the lookup table.

---

# Maintenance Comparison

Suppose the company expands to

```
220 Countries
```

CASE

```
220 WHEN clauses
```

Lookup

```
220 rows
```

Which is easier for the business team?

The lookup table.

---

# Performance Considerations

Many developers assume that

```
JOIN

↓

Slow
```

and

```
CASE

↓

Fast
```

Reality is more nuanced.

A lookup table containing a few hundred rows is typically very small.

With proper indexing, joining to such a table is often highly efficient.

More importantly,

lookup tables improve

- maintainability
- readability
- consistency

Performance should always be measured using realistic workloads rather than assumed.

---

# CASE vs Lookup Table

| Attribute | CASE | Lookup Table |
|-----------|------|--------------|
| Small mappings | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Large mappings | ⭐ | ⭐⭐⭐⭐⭐ |
| Business maintenance | ⭐ | ⭐⭐⭐⭐⭐ |
| Readability | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Reusability | ⭐ | ⭐⭐⭐⭐⭐ |
| Version control | SQL Deployment | Data Update |
| Business-owned rules | Difficult | Easy |

---

# When NOT to Use Lookup Tables

Not every CASE should become a JOIN.

For example,

```sql
CASE

WHEN salary>=100000 THEN 'Executive'

WHEN salary>=50000 THEN 'Senior'

ELSE 'Junior'
```

This is a calculation.

A lookup table cannot easily represent numeric ranges without additional design.

CASE remains the better choice.

---

# Hybrid Design

Many enterprise systems combine both approaches.

Example

Customer Tier

```
CASE

↓

Executive
```

Product Name

```
Lookup Table

↓

JOIN
```

Tax Rate

```
Configuration Table

↓

JOIN
```

Country

```
Country Dimension

↓

JOIN
```

Every rule uses the most appropriate technique.

---

# Engineering Insight

Think of CASE as a calculator.

Think of lookup tables as dictionaries.

Calculations belong inside CASE.

Reference data belongs inside tables.

Understanding this distinction dramatically improves system design.

---

# Production Story

A global retail company mapped more than 1,500 product codes using CASE.

Every new product launch required:

- SQL changes
- Code review
- Testing
- Deployment

The engineering team replaced the CASE with a product dimension table.

Now:

- Product managers updated mappings.
- ETL jobs required no modification.
- Dashboards automatically reflected new products.
- Development time decreased significantly.

The biggest improvement was not performance.

It was maintainability.

---

# Enterprise Design Pattern

```
Source Data

↓

Lookup Dimension

↓

Join

↓

Business Category

↓

Warehouse

↓

Dashboard
```

This pattern appears in almost every modern data warehouse.

---

# Best Practices

✅ Use CASE for calculations.

✅ Use lookup tables for reference data.

✅ Keep business mappings outside SQL whenever practical.

✅ Design lookup tables with primary keys and indexes.

✅ Document ownership of lookup tables.

---

# Common Mistakes

❌ Using CASE for hundreds of mappings.

❌ Hardcoding business reference data.

❌ Copying the same CASE into dozens of reports.

❌ Assuming JOINs are always slower than CASE.

❌ Forgetting that business rules change over time.

---

# Decision Matrix

| Scenario | Recommended Solution |
|----------|----------------------|
| Salary Bands | CASE |
| Tax Slabs | CASE or Configuration Table |
| Country Names | Lookup Table |
| Product Codes | Lookup Table |
| Customer Segments | CASE |
| ISO Codes | Lookup Table |
| Business Thresholds | Configuration Table |
| Risk Calculation | CASE + Lookup Table |

---

# PostgreSQL Lab

## Create Lookup Table

```sql
CREATE TABLE order_status_dimension
(
    status_code CHAR(2) PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL
);
```

---

## Insert Data

```sql
INSERT INTO order_status_dimension
(status_code, status_name)
VALUES
('P','Pending'),
('S','Shipped'),
('D','Delivered'),
('C','Cancelled'),
('R','Returned');
```

---

## Orders Table

```sql
CREATE TABLE orders
(
    order_id INT PRIMARY KEY,
    customer_id INT,
    status CHAR(2),
    order_amount NUMERIC(10,2)
);
```

---

## Sample Data

```sql
INSERT INTO orders
VALUES
(101,1,'P',1200.00),
(102,2,'S',800.00),
(103,3,'D',5000.00),
(104,4,'C',450.00),
(105,5,'R',900.00);
```

---

## Exercise 1

Write a query using CASE to display the order status.

---

## Exercise 2

Write the same query using the lookup table.

---

## Exercise 3

Compare both approaches.

Discuss:

- Readability
- Maintainability
- Scalability
- Performance

---

# Interview Questions

## Beginner

1. What is a lookup table?
2. When is CASE preferable?

---

## Intermediate

1. Why are lookup tables easier to maintain?
2. Can a lookup table replace every CASE expression?

---

## Senior

1. A CASE expression contains 600 WHEN clauses. How would you redesign it?
2. When would you choose a configuration table instead of a lookup table?
3. Explain the trade-offs between CASE, lookup tables, and dimension tables.

---

# Section Summary

In this section, you learned that:

- CASE is ideal for calculations and small decision trees.
- Lookup tables are ideal for business reference data and large mappings.
- Maintainability often matters more than reducing one JOIN.
- Enterprise systems typically store business mappings in tables rather than hardcoding them in SQL.
- Choosing between CASE and a lookup table is an architectural decision, not just a coding decision.


# ==========================================================
# Section 8
# CASE vs Dimension Tables
# ==========================================================

# Introduction

In the previous section, we learned that lookup tables are often a better alternative to very large CASE expressions.

However, enterprise data warehouses rarely stop at lookup tables.

Instead, they use **Dimension Tables**.

One of the biggest differences between a junior SQL developer and an experienced Data Engineer is understanding **when a simple lookup evolves into a dimension table**.

This section explores that transition.

---

# Mental Model

Think of three different ways to classify data.

```
CASE

↓

Hardcoded Logic
```

```
Lookup Table

↓

Reference Data
```

```
Dimension Table

↓

Business Entity
```

They solve different problems.

---

# What is a Dimension Table?

A dimension table stores descriptive information about a business entity.

Unlike CASE, which calculates a value,

and unlike a lookup table, which usually maps one code to one description,

a dimension table stores **multiple attributes** about the same business concept.

Example

Customer Dimension

| Customer Key | Segment | Region | Age Group | Loyalty Tier |
|--------------|----------|---------|------------|--------------|
|101|Gold|West|Adult|Premium|
|102|Silver|South|Senior|Standard|

Notice

One row contains much more than a simple mapping.

---

# Business Scenario

Suppose a retail company wants to classify customers.

A junior developer writes

```sql
CASE

WHEN total_purchase>=500000

THEN 'Platinum'

WHEN total_purchase>=200000

THEN 'Gold'

WHEN total_purchase>=50000

THEN 'Silver'

ELSE 'Bronze'

END
```

Initially,

this is perfectly acceptable.

---

One year later,

Marketing introduces

- Loyalty Tier

- Reward Points

- Discount %

- Cashback %

- Free Shipping

- Birthday Coupon

- Premium Support

The CASE expression starts growing.

Eventually

```
CASE

↓

200 lines
```

Now ask yourself

Should all this remain inside SQL?

The answer is usually

No.

---

# Dimension Table Solution

Instead,

store customer attributes inside a dimension.

Example

```
dim_customer_segment
```

| Segment | Minimum Purchase | Discount | Reward Rate | Shipping |
|-----------|----------------:|-----------|-------------|----------|
|Bronze|0|2%|1x|No|
|Silver|50000|5%|2x|No|
|Gold|200000|10%|3x|Yes|
|Platinum|500000|15%|5x|Yes|

Now,

SQL becomes

```sql
SELECT

c.customer_name,

d.segment,

d.discount,

d.reward_rate,

d.shipping

FROM customers c

JOIN dim_customer_segment d

ON c.segment=d.segment;
```

The business rules now live in data,

not in SQL.

---

# CASE vs Lookup vs Dimension

```
CASE

↓

Calculates
```

```
Lookup Table

↓

Maps
```

```
Dimension Table

↓

Describes
```

This distinction is extremely important.

---

# Visual Comparison

CASE

```
Salary

↓

Executive
```

Lookup Table

```
Country Code

↓

Country Name
```

Dimension Table

```
Customer

↓

Segment

↓

Discount

↓

Rewards

↓

Marketing Category

↓

Support Level
```

---

# Why Data Warehouses Prefer Dimensions

Imagine a company has

```
300 Reports
```

Every report contains

```sql
CASE

WHEN amount>=500000

...
```

Marketing changes the rules.

Now

```
300 Reports
```

must change.

Instead,

with a dimension table,

only

```
dim_customer_segment
```

changes.

Every report automatically reflects the new logic.

---

# Slowly Changing Dimensions (Preview)

Dimension tables can preserve history.

Example

Customer

```
Gold

↓

Platinum
```

Should historical reports change?

Usually

No.

Instead,

a new version of the dimension is created.

This concept is called

```
Slowly Changing Dimension (SCD)
```

We will study this in detail later in the Data Warehousing section.

For now,

remember

CASE cannot preserve historical business rules.

Dimension tables can.

---

# Example 33.12

Suppose product categories are stored like this.

```sql
CASE

WHEN product_type='M'

THEN 'Mobile'

WHEN product_type='L'

THEN 'Laptop'

WHEN product_type='T'

THEN 'Television'
```

Instead,

create

```
dim_product
```

| Product Code | Category | Warranty | GST | Return Days |
|---------------|-----------|----------|-----|-------------|
|M|Mobile|12 Months|18%|7|
|L|Laptop|24 Months|18%|14|
|T|Television|36 Months|28%|10|

Now,

every report automatically receives

- Category
- Warranty
- GST
- Return Policy

using one JOIN.

---

# Dimension Tables Reduce Duplication

Without dimensions

```
CASE

↓

Dashboard

↓

CASE

↓

ETL

↓

CASE

↓

API

↓

CASE

↓

Analytics
```

Business rules are duplicated everywhere.

With dimensions

```
Dimension

↓

JOIN

↓

Everything Uses Same Rules
```

One source of truth.

---

# Enterprise Architecture Pattern

```
Operational Database

↓

ETL

↓

Fact Table

↓

Join

↓

Dimension Table

↓

Analytics

↓

Power BI

↓

Reports
```

Notice

CASE usually appears

during ETL.

Dimensions remain

inside the warehouse.

---

# Performance Considerations

Many developers worry about JOIN performance.

Suppose

```
Fact Table

↓

500 Million Rows
```

Dimension

```
5,000 Rows
```

The optimizer can often perform this join efficiently when appropriate indexes and statistics are available.

More importantly,

the maintainability gained from using a dimension table usually outweighs the cost of one additional join.

Always benchmark with representative workloads.

---

# Enterprise Design Principles

Dimension tables should contain

- Business descriptions
- Classification values
- Reporting attributes
- Slowly changing history
- Surrogate keys
- Metadata

Dimension tables should **not** contain

- Transaction amounts
- Frequently changing facts
- Event data

Those belong in fact tables.

---

# CASE + Dimension

Sometimes both are used together.

Example

```sql
CASE

WHEN amount>=100000

THEN 'Large Order'

ELSE 'Regular Order'

END
```

Then

JOIN

```
dim_order_category
```

to retrieve

- SLA

- Priority

- Escalation Level

- Notification Policy

This hybrid approach is extremely common.

---

# Production Story

A healthcare company originally classified patients using a CASE expression containing more than 180 WHEN clauses.

As new insurance plans, age categories, and treatment priorities were introduced,

the SQL became almost impossible to maintain.

The engineering team redesigned the system.

Instead of CASE,

they created

```
dim_patient_classification
```

containing

- Insurance Type
- Priority
- Treatment Category
- Billing Group
- Reporting Code

The CASE expression disappeared.

Business analysts could now modify classification rules by updating dimension data instead of requesting SQL changes.

Maintenance time decreased significantly,

and reporting became consistent across every department.

---

# CASE vs Lookup vs Dimension

| Feature | CASE | Lookup | Dimension |
|----------|------|---------|-----------|
| Calculates values | ✅ | ❌ | ❌ |
| Maps codes | Limited | ✅ | ✅ |
| Stores many attributes | ❌ | Limited | ✅ |
| Maintains history | ❌ | Rarely | ✅ |
| Business-managed | ❌ | Sometimes | ✅ |
| Ideal for ETL | ✅ | ✅ | ✅ |
| Ideal for Warehouses | Limited | Limited | ✅ |

---

# Best Practices

✅ Use CASE for calculations.

✅ Use lookup tables for simple mappings.

✅ Use dimension tables for business entities.

✅ Avoid embedding business metadata inside SQL.

✅ Design dimensions with surrogate keys and descriptive attributes.

---

# Common Mistakes

❌ Treating lookup tables and dimension tables as the same.

❌ Hardcoding business classifications in reports.

❌ Using CASE to maintain hundreds of business rules.

❌ Ignoring historical reporting requirements.

❌ Storing fact data inside dimensions.

---

# PostgreSQL Practice Lab

## Create Customer Segment Dimension

```sql
CREATE TABLE dim_customer_segment
(
    segment_key SERIAL PRIMARY KEY,
    segment_name VARCHAR(30) UNIQUE NOT NULL,
    minimum_purchase NUMERIC(12,2),
    discount_percent NUMERIC(5,2),
    reward_multiplier INT,
    free_shipping BOOLEAN
);
```

---

## Insert Sample Data

```sql
INSERT INTO dim_customer_segment
(segment_name, minimum_purchase, discount_percent, reward_multiplier, free_shipping)
VALUES
('Bronze',0,2,1,FALSE),
('Silver',50000,5,2,FALSE),
('Gold',200000,10,3,TRUE),
('Platinum',500000,15,5,TRUE);
```

---

## Exercise 1

Write a CASE expression to classify customers based on total purchase.

---

## Exercise 2

Replace the CASE expression with a join to `dim_customer_segment`.

---

## Exercise 3

Discuss the advantages and disadvantages of each approach.

---

# Interview Questions

## Beginner

1. What is a dimension table?
2. How is a dimension table different from a lookup table?

---

## Intermediate

1. When should CASE be replaced by a dimension table?
2. Why are dimension tables common in data warehouses?

---

## Senior

1. Design a customer segmentation solution for a retail warehouse.
2. Explain why dimension tables improve maintainability.
3. How would Slowly Changing Dimensions affect this design?

---

# Architecture Decision Record (ADR-33-02)

**Title**

Customer Classification Strategy

**Context**

Customer segmentation rules change every quarter and are used by reporting, marketing, ETL, and analytics.

**Options Considered**

1. Hardcoded CASE expressions
2. Lookup table
3. Dimension table

**Decision**

Use a dimension table.

**Reason**

- Centralized business rules
- Multiple descriptive attributes
- Supports historical tracking
- Reusable across all reporting systems

**Consequences**

**Advantages**

- Single source of truth
- Easier maintenance
- Supports future SCD implementation
- Consistent reporting

**Disadvantages**

- Requires joins
- Requires ETL maintenance
- Slightly more complex data model

---

# Section Summary

In this section, you learned:

- CASE calculates values.
- Lookup tables map simple reference data.
- Dimension tables model complete business entities.
- Modern data warehouses rely on dimension tables to centralize business logic and descriptive attributes.
- Choosing between CASE, lookup tables, and dimensions is an architectural decision based on maintainability, scalability, and reporting requirements rather than SQL syntax alone.


# ==========================================================
# Section 9
# CASE in ETL Pipelines
# ==========================================================

# Introduction

Most SQL books teach CASE using examples like

```sql
CASE
    WHEN salary > 100000 THEN 'Executive'
    ELSE 'Employee'
END
```

Although these examples explain syntax, they do not represent how CASE is actually used in enterprise systems.

In production environments, CASE is rarely used only for reports.

Instead, it becomes one of the primary transformation tools inside ETL and ELT pipelines.

CASE is responsible for converting raw operational data into meaningful business information.

Examples include

- Customer Segmentation
- Risk Classification
- Fraud Detection
- Product Categorization
- Tax Calculation
- Regulatory Reporting
- KPI Generation
- Data Quality Flags
- SLA Classification
- Business Status Codes

This section explains how CASE fits into the modern data engineering lifecycle.

---

# ETL Refresher

ETL stands for

```
Extract

↓

Transform

↓

Load
```

Each phase has a different responsibility.

```
Operational Database

↓

Extract

↓

Raw Data

↓

Transform

↓

Business Rules

↓

Load

↓

Data Warehouse
```

CASE belongs primarily in the **Transformation** phase.

---

# Why CASE Is a Transformation Tool

Suppose an operational database stores orders.

| Order ID | Amount |
|-----------|---------:|
|101|500|
|102|25000|
|103|125000|

The operational system only stores facts.

Business users need

```
Small Order

Medium Order

Large Order
```

These values do not exist.

They must be derived.

Example

```sql
CASE
    WHEN amount >=100000 THEN 'Large'
    WHEN amount >=10000 THEN 'Medium'
    ELSE 'Small'
END
```

CASE transforms raw facts into business information.

---

# Real ETL Pipeline

Imagine a banking ETL pipeline.

```
Transactions

↓

Validation

↓

CASE

↓

Risk Classification

↓

Warehouse

↓

Dashboard
```

Every night,

millions of transactions receive

- Risk Level
- Fraud Category
- Regulatory Flag
- AML Status

before being loaded into the warehouse.

---

# Example 33.13

Suppose the source table contains

| Transaction ID | Amount |
|---------------|--------:|
|1|500|
|2|25000|
|3|450000|

Transformation

```sql
SELECT

transaction_id,

amount,

CASE

WHEN amount>=100000

THEN 'High Value'

WHEN amount>=10000

THEN 'Medium Value'

ELSE 'Low Value'

END AS transaction_category

FROM staging_transactions;
```

Notice

The source data remains unchanged.

The ETL pipeline creates a new derived column.

---

# ETL Architecture

A simplified enterprise pipeline looks like

```
Operational System

↓

Landing Zone

↓

Raw Table

↓

Validation

↓

Transformation

↓

CASE

↓

Business Rules

↓

Warehouse

↓

BI Reports
```

CASE is one of several transformations applied before loading the final warehouse tables.

---

# Business Rule Example

Insurance company

Requirement

```
Claim Amount

↓

Category
```

Rules

| Claim Amount | Category |
|---------------|----------|
|<100000|Standard|
|100000–500000|Manual Review|
|>500000|High Risk|

Implementation

```sql
CASE

WHEN claim_amount>500000

THEN 'High Risk'

WHEN claim_amount>=100000

THEN 'Manual Review'

ELSE 'Standard'

END
```

---

# Multiple Transformations

A single ETL job rarely performs only one CASE.

Example

```sql
SELECT

customer_id,

CASE
WHEN age>=60
THEN 'Senior'
ELSE 'Adult'
END AS age_group,

CASE
WHEN income>=1000000
THEN 'Premium'
ELSE 'Standard'
END AS customer_tier,

CASE
WHEN city IN ('Mumbai','Delhi','Bangalore')
THEN 'Metro'
ELSE 'Non Metro'
END AS city_type

FROM staging_customers;
```

One query generates several business attributes.

---

# Transformation vs Storage

One important design decision is

Should the derived value be stored?

or

Should it be calculated every time?

Example

```
CASE

↓

Query

↓

Result
```

versus

```
CASE

↓

ETL

↓

Warehouse Column

↓

Reports
```

Both approaches are valid.

The correct choice depends on

- business requirements
- frequency of change
- performance
- reporting needs

---

# Example 33.14

Daily Sales Category

Option 1

Calculate every report

```
Dashboard

↓

CASE
```

Option 2

Calculate once during ETL

```
ETL

↓

sales_category

↓

Warehouse
```

Large warehouses usually prefer the second approach for commonly used business attributes.

---

# CASE in Data Validation

CASE is frequently used to identify bad data.

Example

```sql
CASE

WHEN email IS NULL

THEN 'Missing'

WHEN email NOT LIKE '%@%'

THEN 'Invalid'

ELSE 'Valid'

END
```

This creates a validation flag that downstream processes can use.

---

# CASE in Data Quality

Suppose

```
Phone Number

↓

Validation
```

Implementation

```sql
CASE

WHEN phone IS NULL

THEN 'Missing'

WHEN LENGTH(phone)<10

THEN 'Invalid'

ELSE 'Valid'

END
```

Data quality dashboards often rely heavily on CASE expressions like these.

---

# CASE in Slowly Changing Dimensions

Suppose a customer changes loyalty tier.

ETL may use CASE to determine

```
Existing Customer?

↓

Yes

↓

Update Dimension

↓

No

↓

Insert New Row
```

Although SCD logic involves more than CASE, conditional expressions often play a key role in deciding the appropriate action.

---

# CASE in Incremental Loads

Example

```
Existing Record

↓

CASE

↓

Insert

Update

Ignore
```

Pseudo-SQL

```sql
CASE

WHEN target.customer_id IS NULL

THEN 'INSERT'

WHEN source.last_modified>target.last_modified

THEN 'UPDATE'

ELSE 'IGNORE'

END
```

Many incremental ETL frameworks implement similar decision logic.

---

# CASE in Error Handling

Suppose

```
Amount <0
```

Business Rule

```
Reject Record
```

Implementation

```sql
CASE

WHEN amount<0

THEN 'ERROR'

ELSE 'VALID'

END
```

Records can then be routed into

```
Error Table
```

for later investigation.

---

# Enterprise ETL Pattern

```
Raw Data

↓

Standardization

↓

Validation

↓

CASE

↓

Classification

↓

Business Rules

↓

Dimension Lookup

↓

Fact Table

↓

Warehouse
```

Notice

CASE is only one transformation.

Enterprise ETL pipelines combine

- CASE
- JOIN
- Aggregation
- Window Functions
- Lookup Tables
- Dimensions

to build analytical datasets.

---

# Production Story

An airline company processed nearly 90 million booking events every day.

Originally,

customer status was calculated separately by

- Finance
- Marketing
- Customer Support

Each team implemented its own CASE logic.

As a result,

the same customer appeared as

```
Gold

↓

Silver

↓

Premium
```

depending on the report.

The engineering team redesigned the ETL pipeline.

Customer classification was calculated once during nightly ETL and stored inside the warehouse.

Every downstream report now used the same business definition.

The biggest improvement was not performance.

It was consistency.

---

# Engineering Insight

One of the responsibilities of a Data Engineer is deciding

**where**

business rules should execute.

Sometimes

```
CASE

↓

Dashboard
```

is appropriate.

Sometimes

```
CASE

↓

ETL

↓

Warehouse
```

is much better.

Moving stable business logic into ETL often

- improves consistency
- reduces duplicated SQL
- simplifies reporting
- improves maintainability

---

# Best Practices

✅ Use CASE during transformations.

✅ Create reusable derived attributes.

✅ Centralize business rules.

✅ Validate incoming data.

✅ Document transformation logic.

---

# Common Mistakes

❌ Duplicating CASE in every dashboard.

❌ Mixing validation logic with reporting logic.

❌ Hardcoding frequently changing business rules.

❌ Calculating the same attribute repeatedly.

❌ Allowing different ETL jobs to implement different definitions.

---

# PostgreSQL Practice Lab

## Create Staging Table

```sql
CREATE TABLE staging_transactions
(
    transaction_id INT PRIMARY KEY,
    customer_id INT,
    amount NUMERIC(12,2),
    transaction_date DATE
);
```

---

## Insert Sample Data

```sql
INSERT INTO staging_transactions
VALUES
(1,101,500,'2026-01-01'),
(2,102,25000,'2026-01-01'),
(3,103,450000,'2026-01-01'),
(4,104,9500,'2026-01-01'),
(5,105,125000,'2026-01-01');
```

---

## Exercise 1

Create a transaction category using CASE.

---

## Exercise 2

Create a fraud flag.

Rules:

- Amount > 300000 → High Risk
- Amount between 100000 and 300000 → Medium Risk
- Otherwise → Low Risk

---

## Exercise 3

Add a validation flag that identifies invalid transaction amounts.

---

## Challenge Exercise

Using one SQL query, generate the following derived columns:

- Transaction Category
- Fraud Risk
- Validation Status
- Reporting Bucket

---

# Interview Questions

## Beginner

1. During which ETL phase is CASE primarily used?
2. Why is CASE considered a transformation?

---

## Intermediate

1. Should business rules be implemented during ETL or reporting?
2. How can CASE improve data quality?
3. How is CASE used during incremental loading?

---

## Senior

1. Design an ETL pipeline that centralizes customer segmentation.
2. Explain why duplicate CASE expressions across reports are dangerous.
3. When should a derived attribute be stored instead of recalculated?

---

# Architecture Decision Record (ADR-33-03)

**Title**

Location of Customer Segmentation Logic

**Context**

Customer segmentation is required by reporting, marketing, fraud detection, and customer support.

**Options**

1. Compute in every dashboard
2. Compute in ETL and store in warehouse
3. Compute in application code

**Decision**

Compute once during ETL and store the derived attribute.

**Reason**

- Single source of truth
- Consistent reporting
- Reduced duplicate SQL
- Easier maintenance
- Better governance

**Trade-offs**

- Requires ETL updates when rules change
- Slight increase in warehouse storage
- Simplifies downstream analytics

---

# Section Summary

In this section, you learned:

- CASE is a core transformation tool in ETL pipelines.
- It is commonly used for classification, validation, risk scoring, and business-rule implementation.
- Stable business logic is often best computed once during ETL and reused throughout the warehouse.
- Centralizing CASE logic improves consistency, maintainability, and governance across enterprise data platforms.


# ==========================================================
# Section 10
# CASE in Data Warehouses
# ==========================================================

# Introduction

A Data Warehouse is much more than a database containing historical records.

It is the central repository that stores cleaned, transformed, validated, and business-ready data.

One of the primary goals of a Data Warehouse is consistency.

Every department in an organization should see the same definition of business metrics.

For example,

When Finance says

```
Premium Customer
```

Marketing,

Customer Support,

Sales,

and Compliance

should all mean exactly the same thing.

CASE expressions often play an important role in achieving this consistency.

---

# Where CASE Fits in a Data Warehouse

A simplified warehouse architecture looks like this.

```
Operational Systems

↓

Landing Zone

↓

Raw Layer

↓

Standardized Layer

↓

Business Transformation

↓

CASE

↓

Dimension Tables

↓

Fact Tables

↓

Data Marts

↓

Reports
```

Notice that CASE is normally used during transformation before data reaches reporting.

---

# Business Example

Suppose an e-commerce company stores the following sales.

| Order | Amount |
|--------|--------:|
|101|500|
|102|25000|
|103|120000|

The warehouse needs

```
Order Size
```

The operational database does not contain this column.

During transformation

```sql
CASE
WHEN amount>=100000 THEN 'Large'
WHEN amount>=10000 THEN 'Medium'
ELSE 'Small'
END
```

The derived value is stored inside the warehouse.

---

# Materialized Business Attributes

Many warehouse columns do not exist in operational systems.

Examples

```
Customer Tier

Risk Category

Sales Band

Order Size

Age Group

Income Bracket

Profit Band

Inventory Status

Product Segment
```

These are called **derived business attributes**.

They are usually created using CASE during ETL.

---

# Dynamic vs Materialized Logic

One of the biggest architectural decisions is deciding

Should CASE execute every query?

or

Should CASE execute once during ETL?

Consider Customer Tier.

Option 1

```
Dashboard

↓

CASE

↓

Every Query
```

Option 2

```
Nightly ETL

↓

CASE

↓

customer_tier Column

↓

Dashboard
```

Which approach is better?

The answer depends on the business rule.

---

# Decision Framework

Ask the following questions.

## Question 1

Does the business rule change frequently?

If yes,

keeping it dynamic may be preferable.

---

## Question 2

Is the calculation expensive?

If yes,

materializing the result during ETL may reduce repeated computation.

---

## Question 3

Will hundreds of reports use the same value?

If yes,

store it once.

---

## Question 4

Is historical accuracy required?

If yes,

store the value that was valid at that point in time.

---

# Example 33.15

Customer Tier

```sql
CASE
WHEN lifetime_purchase>=1000000 THEN 'Platinum'
WHEN lifetime_purchase>=500000 THEN 'Gold'
WHEN lifetime_purchase>=100000 THEN 'Silver'
ELSE 'Bronze'
END
```

Suppose this calculation appears in

```
Power BI

Excel

Tableau

Python

Marketing Reports

Finance Reports

Mobile App
```

Repeating the same CASE everywhere is risky.

Better

```
Warehouse

↓

customer_tier

↓

Every Consumer Uses Same Value
```

---

# Derived Columns

Warehouse tables often contain

```
Original Data

+

Derived Columns
```

Example

| Customer | Lifetime Purchase | Customer Tier |
|-----------|------------------:|--------------|
|Alice|1200000|Platinum|
|Bob|450000|Silver|

The third column never existed in the operational database.

It was created during transformation.

---

# CASE Inside Fact Table Loading

Fact loading often looks like

```
Read Orders

↓

Validate

↓

CASE

↓

Business Category

↓

Insert Fact Table
```

Example

```sql
INSERT INTO fact_sales
(
order_id,

customer_id,

sales_amount,

sales_category
)

SELECT

order_id,

customer_id,

amount,

CASE
WHEN amount>=100000 THEN 'Large'
WHEN amount>=10000 THEN 'Medium'
ELSE 'Small'
END

FROM staging_sales;
```

---

# CASE Inside Dimension Loading

Dimension loading frequently uses CASE to derive descriptive attributes.

Example

```sql
INSERT INTO dim_customer
(
customer_id,

customer_name,

age_group
)

SELECT

customer_id,

customer_name,

CASE

WHEN age>=60 THEN 'Senior'

WHEN age>=18 THEN 'Adult'

ELSE 'Minor'

END

FROM staging_customer;
```

---

# Slowly Changing Dimensions

Suppose

Customer Tier

changes from

```
Gold

↓

Platinum
```

Should historical reports change?

Usually,

No.

Instead,

the warehouse stores

```
Gold

2022-2024

↓

Platinum

2024-Present
```

This is why many derived values belong inside dimensions instead of being recalculated during reporting.

---

# Data Mart Example

Sales Data Mart

```
Fact Sales

↓

Join

↓

Customer Dimension

↓

Product Dimension

↓

Date Dimension

↓

Power BI
```

Notice

Power BI usually reads

```
customer_tier
```

instead of recalculating it.

This improves

- consistency
- simplicity
- report performance

---

# Dynamic CASE Still Exists

Not every CASE belongs inside ETL.

Example

A user wants

```
Today's Top Customers
```

Threshold changes every day.

This calculation is naturally dynamic.

CASE inside reporting is appropriate.

---

# Hybrid Approach

Enterprise systems commonly use both approaches.

Stable business rules

↓

Warehouse Columns

Dynamic calculations

↓

Dashboard CASE

Example

```
Customer Tier

Stored
```

```
Today's Revenue Target

Calculated
```

---

# Enterprise Warehouse Pattern

```
Operational Systems

↓

Landing

↓

Staging

↓

Validation

↓

CASE

↓

Dimensions

↓

Facts

↓

Data Marts

↓

Analytics

↓

Machine Learning

↓

Dashboards
```

Notice

CASE appears during transformation,

not necessarily during reporting.

---

# Engineering Insight

A Data Warehouse is designed to answer business questions consistently.

If the same CASE expression appears in

```
300 Reports
```

the warehouse has failed to centralize business logic.

Warehouse design should minimize duplicated calculations.

---

# Production Story

A global insurance company calculated

```
Risk Category
```

inside every reporting tool.

Power BI,

Excel,

Tableau,

and Python notebooks

all contained different CASE expressions.

As business rules evolved,

the reports slowly diverged.

The engineering team moved risk calculation into the nightly ETL pipeline.

A new column

```
risk_category
```

was stored inside the warehouse.

Within weeks,

every dashboard reported identical values.

The warehouse became the organization's single source of truth.

---

# Best Practices

✅ Materialize stable business attributes.

✅ Keep dynamic calculations in reporting when appropriate.

✅ Avoid duplicating CASE across reporting tools.

✅ Store historical classifications when required.

✅ Document transformation rules.

---

# Common Mistakes

❌ Recalculating the same attribute in every dashboard.

❌ Ignoring historical reporting requirements.

❌ Materializing highly volatile calculations.

❌ Mixing reporting logic with warehouse transformation logic.

❌ Creating inconsistent CASE expressions across teams.

---

# PostgreSQL Practice Lab

## Create Fact Table

```sql
CREATE TABLE fact_sales
(
    sales_key SERIAL PRIMARY KEY,
    order_id INT,
    customer_id INT,
    sales_amount NUMERIC(12,2),
    sales_category VARCHAR(20)
);
```

---

## Insert Using CASE

```sql
INSERT INTO fact_sales
(
order_id,
customer_id,
sales_amount,
sales_category
)

SELECT

order_id,

customer_id,

order_amount,

CASE
WHEN order_amount>=100000 THEN 'Large'
WHEN order_amount>=10000 THEN 'Medium'
ELSE 'Small'
END

FROM orders;
```

---

## Exercise 1

Create an

```
Age Group
```

column while loading

```
dim_customer
```

---

## Exercise 2

Create

```
Sales Category
```

while loading

```
fact_sales
```

---

## Exercise 3

Discuss which derived attributes should remain dynamic and which should be materialized.

---

# Interview Questions

## Beginner

1. What is a derived attribute?
2. Why is CASE commonly used during ETL?

---

## Intermediate

1. Should every CASE be materialized?
2. Why do warehouses store derived business columns?

---

## Senior

1. Design a warehouse that avoids duplicated CASE logic.
2. Explain the trade-offs between dynamic calculations and stored derived attributes.
3. How would you version business rules that change over time?

---

# Architecture Decision Record (ADR-33-04)

## Title

Materializing Customer Tier

### Context

Customer Tier is used by more than 250 reports across Finance, Sales, Marketing, and Customer Support.

### Options

1. Compute using CASE in every report.
2. Compute once during ETL and store in the warehouse.

### Decision

Materialize Customer Tier during ETL.

### Reason

- Single source of truth
- Better report performance
- Consistent business definition
- Easier governance

### Consequences

**Advantages**

- Consistent reporting
- Simpler dashboards
- Lower report complexity
- Reduced duplicated SQL

**Disadvantages**

- Requires ETL updates when rules change
- Consumes additional storage
- Historical management may require Slowly Changing Dimensions

---

# Section Summary

In this section, you learned:

- CASE is commonly used during warehouse transformations to create derived business attributes.
- Stable business rules are often materialized during ETL, while dynamic calculations remain in reporting.
- Centralizing CASE logic in the warehouse improves consistency, governance, and maintainability.
- Choosing where CASE executes is an architectural decision that affects performance, reporting, and long-term system design.


# ==========================================================
# Section 11
# CASE in Business Intelligence (BI) & Analytics
# ==========================================================

# Introduction

A Data Warehouse stores data.

A Business Intelligence (BI) platform converts that data into information.

Executives rarely write SQL.

Instead, they consume

- Dashboards
- KPI Reports
- Interactive Visualizations
- Scorecards
- Executive Summaries

Behind many of these visualizations lies one or more CASE expressions.

Understanding where CASE belongs in the analytics layer is essential for designing maintainable reporting systems.

---

# The Analytics Pipeline

A modern analytics platform typically follows this architecture.

```
Operational Database

↓

Landing

↓

Staging

↓

Transformation

↓

CASE

↓

Fact Tables

↓

Dimension Tables

↓

Semantic Layer

↓

Power BI / Tableau

↓

Dashboard

↓

Business Decisions
```

Notice that CASE may appear in multiple layers.

The challenge is deciding where it should live.

---

# The Three Places CASE Can Exist

Business rules can be implemented in three different places.

```
ETL Layer

↓

Warehouse Layer

↓

BI Layer
```

Each has different advantages and disadvantages.

---

# CASE in the ETL Layer

Business rule

```
Customer Tier
```

is calculated during ETL.

Warehouse stores

```
customer_tier
```

Dashboard simply displays it.

```
ETL

↓

CASE

↓

Warehouse

↓

Dashboard
```

Advantages

- One business definition
- Faster dashboards
- Easier governance
- Consistent KPIs

---

# CASE in the Warehouse

Sometimes

CASE is written inside warehouse views.

Example

```sql
CREATE VIEW vw_sales_summary AS

SELECT

customer_id,

sales_amount,

CASE

WHEN sales_amount>=100000

THEN 'Large'

ELSE 'Regular'

END AS sales_category

FROM fact_sales;
```

Reports simply query

```
vw_sales_summary
```

instead of repeating the CASE.

---

# CASE Inside Power BI

Power BI allows calculated columns and DAX measures.

Example

```
Sales

↓

IF()

↓

Category
```

Although this works,

it creates an important question.

Should business rules exist

inside Power BI

or

inside the warehouse?

---

# The Single Source of Truth

Imagine

Finance uses

```sql
CASE

WHEN amount>=100000

THEN 'Large'
```

Marketing uses

```sql
CASE

WHEN amount>=90000

THEN 'Large'
```

Customer Support uses

```sql
CASE

WHEN amount>=95000

THEN 'Large'
```

Three departments.

Three definitions.

Three different answers.

This is one of the most common causes of inconsistent reporting.

---

# Better Architecture

```
Warehouse

↓

sales_category

↓

Power BI

↓

Tableau

↓

Excel

↓

Python

↓

Everyone Uses Same Value
```

Business logic exists once.

Every consumer uses it.

---

# Example 33.16

Sales Dashboard

Requirement

Display

- Large Orders
- Medium Orders
- Small Orders

Option 1

Power BI

```
DAX

↓

IF()

```

Option 2

Warehouse

```
CASE

↓

sales_category

↓

Dashboard
```

Which is better?

Usually

Option 2.

---

# Why?

Suppose

Marketing changes

```
Large Order

100000

↓

75000
```

If CASE exists

inside 50 dashboards,

every dashboard requires modification.

If CASE exists

inside ETL,

one pipeline changes.

Every dashboard automatically reflects the new definition.

---

# Semantic Layer

Many organizations build a semantic layer.

```
Warehouse

↓

Semantic Model

↓

Power BI

↓

Users
```

The semantic layer exposes

- Business Names
- KPIs
- Dimensions
- Measures

CASE should generally exist below the semantic layer whenever possible.

---

# KPI Example

Requirement

Executive dashboard should display

```
Revenue Status
```

Rules

```
Revenue >= Target

↓

Achieved

Otherwise

↓

Below Target
```

Implementation

```sql
CASE

WHEN revenue>=target

THEN 'Achieved'

ELSE 'Below Target'

END
```

Power BI simply groups by

```
Revenue Status
```

No DAX required.

---

# Conditional Formatting

CASE often drives dashboard colors.

Example

```
Green

↓

Target Achieved
```

```
Yellow

↓

Warning
```

```
Red

↓

Critical
```

Warehouse

```sql
CASE

WHEN score>=90

THEN 'GREEN'

WHEN score>=70

THEN 'YELLOW'

ELSE 'RED'

END
```

Power BI only reads

```
status_color
```

---

# Dashboard Performance

Imagine

100 users

refreshing dashboards simultaneously.

If every dashboard computes

```
CASE

↓

Millions of Rows
```

Power BI performs repeated calculations.

Instead

```
Warehouse

↓

CASE Once

↓

Dashboard Reads Result
```

The workload shifts from the reporting layer to the data platform.

---

# Enterprise Reporting Pattern

```
Source Systems

↓

ETL

↓

Warehouse

↓

Derived Columns

↓

Semantic Layer

↓

Power BI

↓

Executives
```

Notice

Business users never see

CASE.

They simply consume trusted business metrics.

---

# Self-Service BI

Modern organizations encourage self-service analytics.

Business users should not need to understand

```sql
CASE

WHEN ...

...
```

Instead,

they should see

```
Customer Tier

Risk Level

Sales Category
```

already prepared.

This reduces reporting errors.

---

# Production Story

A multinational retailer maintained over

```
180 Power BI Reports.
```

Each report contained its own customer segmentation logic.

When loyalty rules changed,

developers spent almost two weeks updating dashboards.

The engineering team redesigned the warehouse.

Customer segmentation became a warehouse column.

Power BI reports no longer contained CASE expressions.

Future rule changes required modifying only the ETL pipeline.

Report maintenance time dropped dramatically.

---

# BI Design Guidelines

Good candidates for warehouse CASE

- Customer Tier
- Sales Category
- Risk Level
- Product Segment
- Employee Grade
- Profit Band

Good candidates for dashboard calculations

- Today's Top 10
- Current User Filters
- Dynamic Rankings
- Interactive Parameters
- Temporary Calculations

---

# CASE vs DAX vs SQL

| Requirement | SQL CASE | DAX | Recommendation |
|------------|----------|-----|----------------|
| Customer Tier | ✅ | Possible | SQL |
| Risk Category | ✅ | Possible | SQL |
| Interactive Filters | ❌ | ✅ | DAX |
| Running Total | Possible | ✅ | DAX |
| Business Classification | ✅ | Possible | SQL |
| KPI Labels | ✅ | Possible | SQL |

---

# Enterprise Analytics Pattern

```
Operational System

↓

Warehouse

↓

CASE

↓

Fact Table

↓

Dimension Table

↓

Semantic Layer

↓

Power BI Dataset

↓

Executive Dashboard
```

Notice

CASE becomes part of the organization's

**Business Logic Layer**.

---

# Best Practices

✅ Keep permanent business rules in the warehouse.

✅ Use BI tools for visualization rather than core business logic.

✅ Expose derived attributes through semantic models.

✅ Avoid duplicating CASE across dashboards.

✅ Document KPI definitions.

---

# Common Mistakes

❌ Writing different CASE expressions in different reports.

❌ Embedding complex business rules inside DAX.

❌ Recalculating warehouse attributes in BI tools.

❌ Allowing departments to define KPIs independently.

❌ Treating dashboards as transformation engines.

---

# PostgreSQL Practice Lab

Suppose

```
fact_sales
```

contains

```
sales_amount
```

## Exercise 1

Create

```
sales_category
```

using CASE.

---

## Exercise 2

Create a view

```
vw_sales_dashboard
```

that exposes

- Customer Name
- Sales Amount
- Sales Category
- Risk Level

---

## Exercise 3

Explain why Power BI should query the view instead of recreating the CASE logic.

---

# Interview Questions

## Beginner

1. What is the purpose of CASE in BI reporting?

2. Should every dashboard contain its own CASE expressions?

---

## Intermediate

1. Why is the warehouse considered the single source of truth?

2. When should CASE be implemented in SQL instead of DAX?

3. What is a semantic layer?

---

## Senior

1. Design a reporting architecture for 500 Power BI dashboards.

2. Explain how duplicated CASE expressions create governance problems.

3. How would you centralize KPI definitions across an enterprise?

---

# Architecture Decision Record (ADR-33-05)

## Title

Location of Business Classification Logic

### Context

Customer Tier, Sales Category, and Risk Level are required by Power BI, Tableau, Excel, APIs, and Machine Learning pipelines.

### Options

1. Implement CASE in every BI tool.
2. Implement CASE in warehouse views.
3. Materialize the attributes during ETL.

### Decision

Materialize stable business attributes during ETL and expose them through the semantic layer.

### Reason

- One definition of every KPI.
- Consistent reporting.
- Simpler dashboards.
- Easier governance.
- Better long-term maintainability.

### Consequences

**Advantages**

- Single source of truth.
- Faster report development.
- Easier onboarding of analysts.
- Reduced duplicated logic.

**Disadvantages**

- ETL must be updated when business rules change.
- Slightly larger warehouse tables.

---

# Section Summary

In this section, you learned:

- CASE plays a critical role in Business Intelligence and Analytics.
- Stable business rules should usually be implemented before data reaches BI tools.
- Centralizing CASE logic in the warehouse creates a single source of truth.
- BI platforms should focus on visualization and interactive analysis rather than duplicating business-rule logic.
- Well-designed semantic layers make dashboards simpler, faster, and more consistent across the organization.



# ==========================================================
# Section 12
# Enterprise SQL Code Review
# ==========================================================

# Introduction

Writing SQL is only half of a Data Engineer's job.

The other half is reviewing SQL written by other developers.

Many production incidents are not caused by syntax errors.

Instead, they are caused by

- Incorrect business logic
- Poor readability
- Missing edge cases
- Duplicate logic
- Performance issues
- Maintainability problems

A professional SQL code review aims to detect these issues before the code reaches production.

---

# Why Code Reviews Matter

Imagine a company with

- 25 Data Engineers
- 60 ETL Pipelines
- 150 Database Objects
- 500 BI Reports

Without code reviews,

every developer writes SQL differently.

Different styles.

Different business rules.

Different naming conventions.

Eventually,

the warehouse becomes inconsistent.

Code reviews create

- Standardization
- Knowledge Sharing
- Better Performance
- Better Maintainability
- Fewer Production Bugs

---

# Goals of a SQL Code Review

A reviewer should evaluate much more than syntax.

A good review asks

✓ Is the business logic correct?

✓ Is the SQL readable?

✓ Can another developer understand this six months later?

✓ Is performance acceptable?

✓ Can the optimizer execute this efficiently?

✓ Are edge cases handled?

✓ Does the SQL follow company standards?

---

# SQL Review Checklist

Before approving SQL, verify

## Correctness

- Does the query return the correct result?
- Are NULL values handled?
- Are duplicate rows considered?
- Are edge cases covered?

---

## Readability

- Are aliases meaningful?
- Is formatting consistent?
- Are complex expressions documented?
- Are long CASE expressions commented?

---

## Performance

- Does the query scan unnecessary rows?
- Can predicates be pushed earlier?
- Are indexes being used?
- Are expensive functions repeated?

---

## Maintainability

- Can business users request changes easily?
- Is logic duplicated?
- Should a lookup table replace CASE?
- Should the logic be moved into ETL?

---

# Example Review 1

Developer submits

```sql
SELECT

customer_id,

CASE

WHEN amount>100000

THEN 'High'

WHEN amount>50000

THEN 'Medium'

ELSE 'Low'

END

FROM sales;
```

---

## Review Comments

```
Business Logic

★★★★★

Readability

★★★★☆

Performance

★★★★★

Maintainability

★★★★☆

Approved

YES
```

Reason

- Correct ordering
- ELSE included
- Simple logic
- Easy to understand

---

# Example Review 2

Developer submits

```sql
CASE

WHEN amount>1000

THEN 'Small'

WHEN amount>100000

THEN 'Large'

END
```

---

## Review Comments

```
Business Logic

★☆☆☆☆

Rejected
```

Issue

```
100000

↓

Matches

1000

↓

Returns

Small
```

Large orders are never classified correctly.

---

Recommendation

```sql
CASE

WHEN amount>100000

THEN 'Large'

WHEN amount>1000

THEN 'Small'

ELSE 'Micro'

END
```

---

# Example Review 3

Developer submits

```sql
CASE

WHEN country='IN'

THEN 'India'

WHEN country='US'

THEN 'USA'

...

120 More WHEN Clauses
```

---

## Review

```
Business Mapping

↓

Lookup Table Recommended
```

Reason

Business mappings should not be hardcoded.

---

# Example Review 4

Developer submits

```sql
CASE

WHEN

UPPER(

TRIM(city)

)

='MUMBAI'

THEN ...
```

---

## Review

Problem

```
UPPER()

↓

TRIM()

↓

Every Row
```

Recommendation

Normalize

```
city
```

during ETL.

---

# Example Review 5

Developer submits

```sql
CASE

WHEN score>90

THEN 'Excellent'
```

---

Review Question

Why

```
90
```

Where did this number come from?

Recommendation

Store thresholds inside

```
Configuration Table
```

instead of hardcoding them.

---

# SQL Review Scorecard

| Category | Questions |
|-----------|-----------|
| Correctness | Is the logic correct? |
| Readability | Can another engineer understand it? |
| Maintainability | Will it survive future business changes? |
| Performance | Does it scale? |
| Reusability | Can other teams reuse it? |
| Security | Does it expose sensitive data? |
| Testing | Are edge cases verified? |

---

# Enterprise SQL Standards

Good SQL

```sql
CASE

WHEN salary>=100000

THEN 'Executive'

WHEN salary>=50000

THEN 'Senior'

ELSE 'Junior'

END AS employee_grade
```

Poor SQL

```sql
case when salary>=100000 then 'Executive'
when salary>=50000 then 'Senior'
else 'Junior' end eg
```

Readable SQL is easier to maintain and review.

---

# Naming Standards

Prefer

```text
customer_tier

sales_category

risk_level

fraud_status
```

Avoid

```text
c1

x

flag

temp

test
```

Names should describe business meaning.

---

# Comments

Poor

```sql
CASE
WHEN score>90
```

Better

```sql
-- Customer qualifies for Gold loyalty tier
-- based on FY2026 marketing policy.

CASE

WHEN score>=gold_threshold
```

Explain **why** the rule exists, not just **what** it does.

---

# Unit Testing SQL

Every CASE expression should be tested.

Example

| Input | Expected Output |
|-------:|-----------------|
|120000|High|
|75000|Medium|
|500|Low|
|NULL|Unknown|

Never assume SQL is correct simply because it runs.

---

# Regression Testing

Suppose Marketing changes

```
Gold

↓

750000

↓

500000
```

Questions

- Which ETL jobs change?
- Which dashboards change?
- Which APIs change?

Regression testing ensures nothing else breaks.

---

# Enterprise Review Workflow

```
Developer

↓

Pull Request

↓

Automated SQL Checks

↓

Peer Review

↓

Senior Engineer Review

↓

Performance Review

↓

Testing

↓

Production
```

Every SQL change should pass through this process.

---

# Production Story

A financial institution introduced a new fraud rule.

One developer updated the ETL pipeline.

Another developer forgot to update a reporting procedure.

The warehouse now contained

two different fraud definitions.

Customers were incorrectly flagged.

The issue was discovered during a quarterly audit.

The company introduced mandatory SQL code reviews.

Every CASE expression affecting business rules now required approval from two senior engineers.

---

# SQL Review Decision Matrix

| Situation | Decision |
|------------|----------|
| Simple CASE | Approve |
| Missing ELSE | Request Changes |
| Overlapping Conditions | Reject |
| 300 WHEN Clauses | Replace with Lookup Table |
| Repeated Logic | Refactor |
| Hardcoded Business Rules | Move to Configuration |

---

# PostgreSQL Practice Lab

## Exercise 1

Review the following SQL.

```sql
CASE

WHEN amount>1000

THEN 'Small'

WHEN amount>100000

THEN 'Large'

END
```

Identify all issues.

---

## Exercise 2

Rewrite the SQL using best practices.

---

## Exercise 3

Review a CASE expression containing

50 WHEN clauses.

Should it remain CASE?

Explain your reasoning.

---

# Interview Questions

## Beginner

1. Why are SQL code reviews important?

2. Should CASE always include ELSE?

---

## Intermediate

1. What should be checked during a SQL review?

2. Why are magic numbers dangerous?

3. When should SQL be rejected?

---

## Senior

1. Design a SQL review checklist for your organization.

2. How would you standardize business-rule implementations across multiple teams?

3. How would you prevent duplicated CASE logic across ETL pipelines and dashboards?

---

# Architecture Decision Record (ADR-33-06)

## Title

Standardizing SQL Code Reviews

### Context

Business-critical CASE expressions are implemented across ETL pipelines, stored procedures, and reporting views.

### Decision

Introduce mandatory peer reviews and a standardized SQL review checklist.

### Reason

- Improve consistency
- Catch business-rule defects early
- Reduce production incidents
- Share knowledge across the engineering team

### Consequences

**Advantages**

- Higher code quality
- Fewer production bugs
- Better documentation
- Easier onboarding

**Disadvantages**

- Slightly longer development cycle
- Requires reviewer availability

---

# Enterprise SQL Review Checklist

Before approving SQL, ask:

✓ Is the business logic correct?

✓ Is CASE ordered correctly?

✓ Are all edge cases handled?

✓ Is ELSE included?

✓ Can a lookup table replace this CASE?

✓ Are expensive functions minimized?

✓ Is the SQL readable?

✓ Is the business rule documented?

✓ Has the SQL been tested with boundary values?

✓ Will this SQL still make sense one year from now?

---

# Section Summary

In this section, you learned:

- SQL code reviews are about much more than syntax.
- Reviewers should evaluate correctness, maintainability, readability, performance, and business alignment.
- CASE expressions should be reviewed carefully for ordering, missing ELSE clauses, duplicate logic, and hardcoded business rules.
- A standardized review process helps teams produce consistent, reliable SQL and reduces production defects.



# ==========================================================
# Section 12
# Enterprise SQL Code Review
# ==========================================================

# Introduction

Writing SQL is only half of a Data Engineer's job.

The other half is reviewing SQL written by other developers.

Many production incidents are not caused by syntax errors.

Instead, they are caused by

- Incorrect business logic
- Poor readability
- Missing edge cases
- Duplicate logic
- Performance issues
- Maintainability problems

A professional SQL code review aims to detect these issues before the code reaches production.

---

# Why Code Reviews Matter

Imagine a company with

- 25 Data Engineers
- 60 ETL Pipelines
- 150 Database Objects
- 500 BI Reports

Without code reviews,

every developer writes SQL differently.

Different styles.

Different business rules.

Different naming conventions.

Eventually,

the warehouse becomes inconsistent.

Code reviews create

- Standardization
- Knowledge Sharing
- Better Performance
- Better Maintainability
- Fewer Production Bugs

---

# Goals of a SQL Code Review

A reviewer should evaluate much more than syntax.

A good review asks

✓ Is the business logic correct?

✓ Is the SQL readable?

✓ Can another developer understand this six months later?

✓ Is performance acceptable?

✓ Can the optimizer execute this efficiently?

✓ Are edge cases handled?

✓ Does the SQL follow company standards?

---

# SQL Review Checklist

Before approving SQL, verify

## Correctness

- Does the query return the correct result?
- Are NULL values handled?
- Are duplicate rows considered?
- Are edge cases covered?

---

## Readability

- Are aliases meaningful?
- Is formatting consistent?
- Are complex expressions documented?
- Are long CASE expressions commented?

---

## Performance

- Does the query scan unnecessary rows?
- Can predicates be pushed earlier?
- Are indexes being used?
- Are expensive functions repeated?

---

## Maintainability

- Can business users request changes easily?
- Is logic duplicated?
- Should a lookup table replace CASE?
- Should the logic be moved into ETL?

---

# Example Review 1

Developer submits

```sql
SELECT

customer_id,

CASE

WHEN amount>100000

THEN 'High'

WHEN amount>50000

THEN 'Medium'

ELSE 'Low'

END

FROM sales;
```

---

## Review Comments

```
Business Logic

★★★★★

Readability

★★★★☆

Performance

★★★★★

Maintainability

★★★★☆

Approved

YES
```

Reason

- Correct ordering
- ELSE included
- Simple logic
- Easy to understand

---

# Example Review 2

Developer submits

```sql
CASE

WHEN amount>1000

THEN 'Small'

WHEN amount>100000

THEN 'Large'

END
```

---

## Review Comments

```
Business Logic

★☆☆☆☆

Rejected
```

Issue

```
100000

↓

Matches

1000

↓

Returns

Small
```

Large orders are never classified correctly.

---

Recommendation

```sql
CASE

WHEN amount>100000

THEN 'Large'

WHEN amount>1000

THEN 'Small'

ELSE 'Micro'

END
```

---

# Example Review 3

Developer submits

```sql
CASE

WHEN country='IN'

THEN 'India'

WHEN country='US'

THEN 'USA'

...

120 More WHEN Clauses
```

---

## Review

```
Business Mapping

↓

Lookup Table Recommended
```

Reason

Business mappings should not be hardcoded.

---

# Example Review 4

Developer submits

```sql
CASE

WHEN

UPPER(

TRIM(city)

)

='MUMBAI'

THEN ...
```

---

## Review

Problem

```
UPPER()

↓

TRIM()

↓

Every Row
```

Recommendation

Normalize

```
city
```

during ETL.

---

# Example Review 5

Developer submits

```sql
CASE

WHEN score>90

THEN 'Excellent'
```

---

Review Question

Why

```
90
```

Where did this number come from?

Recommendation

Store thresholds inside

```
Configuration Table
```

instead of hardcoding them.

---

# SQL Review Scorecard

| Category | Questions |
|-----------|-----------|
| Correctness | Is the logic correct? |
| Readability | Can another engineer understand it? |
| Maintainability | Will it survive future business changes? |
| Performance | Does it scale? |
| Reusability | Can other teams reuse it? |
| Security | Does it expose sensitive data? |
| Testing | Are edge cases verified? |

---

# Enterprise SQL Standards

Good SQL

```sql
CASE

WHEN salary>=100000

THEN 'Executive'

WHEN salary>=50000

THEN 'Senior'

ELSE 'Junior'

END AS employee_grade
```

Poor SQL

```sql
case when salary>=100000 then 'Executive'
when salary>=50000 then 'Senior'
else 'Junior' end eg
```

Readable SQL is easier to maintain and review.

---

# Naming Standards

Prefer

```text
customer_tier

sales_category

risk_level

fraud_status
```

Avoid

```text
c1

x

flag

temp

test
```

Names should describe business meaning.

---

# Comments

Poor

```sql
CASE
WHEN score>90
```

Better

```sql
-- Customer qualifies for Gold loyalty tier
-- based on FY2026 marketing policy.

CASE

WHEN score>=gold_threshold
```

Explain **why** the rule exists, not just **what** it does.

---

# Unit Testing SQL

Every CASE expression should be tested.

Example

| Input | Expected Output |
|-------:|-----------------|
|120000|High|
|75000|Medium|
|500|Low|
|NULL|Unknown|

Never assume SQL is correct simply because it runs.

---

# Regression Testing

Suppose Marketing changes

```
Gold

↓

750000

↓

500000
```

Questions

- Which ETL jobs change?
- Which dashboards change?
- Which APIs change?

Regression testing ensures nothing else breaks.

---

# Enterprise Review Workflow

```
Developer

↓

Pull Request

↓

Automated SQL Checks

↓

Peer Review

↓

Senior Engineer Review

↓

Performance Review

↓

Testing

↓

Production
```

Every SQL change should pass through this process.

---

# Production Story

A financial institution introduced a new fraud rule.

One developer updated the ETL pipeline.

Another developer forgot to update a reporting procedure.

The warehouse now contained

two different fraud definitions.

Customers were incorrectly flagged.

The issue was discovered during a quarterly audit.

The company introduced mandatory SQL code reviews.

Every CASE expression affecting business rules now required approval from two senior engineers.

---

# SQL Review Decision Matrix

| Situation | Decision |
|------------|----------|
| Simple CASE | Approve |
| Missing ELSE | Request Changes |
| Overlapping Conditions | Reject |
| 300 WHEN Clauses | Replace with Lookup Table |
| Repeated Logic | Refactor |
| Hardcoded Business Rules | Move to Configuration |

---

# PostgreSQL Practice Lab

## Exercise 1

Review the following SQL.

```sql
CASE

WHEN amount>1000

THEN 'Small'

WHEN amount>100000

THEN 'Large'

END
```

Identify all issues.

---

## Exercise 2

Rewrite the SQL using best practices.

---

## Exercise 3

Review a CASE expression containing

50 WHEN clauses.

Should it remain CASE?

Explain your reasoning.

---

# Interview Questions

## Beginner

1. Why are SQL code reviews important?

2. Should CASE always include ELSE?

---

## Intermediate

1. What should be checked during a SQL review?

2. Why are magic numbers dangerous?

3. When should SQL be rejected?

---

## Senior

1. Design a SQL review checklist for your organization.

2. How would you standardize business-rule implementations across multiple teams?

3. How would you prevent duplicated CASE logic across ETL pipelines and dashboards?

---

# Architecture Decision Record (ADR-33-06)

## Title

Standardizing SQL Code Reviews

### Context

Business-critical CASE expressions are implemented across ETL pipelines, stored procedures, and reporting views.

### Decision

Introduce mandatory peer reviews and a standardized SQL review checklist.

### Reason

- Improve consistency
- Catch business-rule defects early
- Reduce production incidents
- Share knowledge across the engineering team

### Consequences

**Advantages**

- Higher code quality
- Fewer production bugs
- Better documentation
- Easier onboarding

**Disadvantages**

- Slightly longer development cycle
- Requires reviewer availability

---

# Enterprise SQL Review Checklist

Before approving SQL, ask:

✓ Is the business logic correct?

✓ Is CASE ordered correctly?

✓ Are all edge cases handled?

✓ Is ELSE included?

✓ Can a lookup table replace this CASE?

✓ Are expensive functions minimized?

✓ Is the SQL readable?

✓ Is the business rule documented?

✓ Has the SQL been tested with boundary values?

✓ Will this SQL still make sense one year from now?

---

# Section Summary

In this section, you learned:

- SQL code reviews are about much more than syntax.
- Reviewers should evaluate correctness, maintainability, readability, performance, and business alignment.
- CASE expressions should be reviewed carefully for ordering, missing ELSE clauses, duplicate logic, and hardcoded business rules.
- A standardized review process helps teams produce consistent, reliable SQL and reduces production defects.


# ==========================================================
# Section 14
# CASE Interview Mastery
# ==========================================================

# Introduction

By now, you understand:

- CASE syntax
- Simple CASE
- Searched CASE
- Optimizer behavior
- Performance considerations
- Enterprise design
- ETL usage
- Data Warehouse usage
- BI usage
- Code review

This section combines all of those concepts into interview-style questions.

Unlike many interview books, every question includes:

- Business scenario
- Problem statement
- Thinking process
- SQL solution
- Alternative solution
- Common mistakes
- Interview discussion
- Follow-up questions

The goal is not only to solve problems but also to explain *why* a particular solution is appropriate.

---

# Interview Difficulty Levels

Questions are grouped into five levels.

| Level | Target Audience |
|--------|-----------------|
| Level 1 | Beginner |
| Level 2 | Intermediate |
| Level 3 | Advanced |
| Level 4 | Senior Data Engineer |
| Level 5 | Staff / Principal Engineer |

---

# Level 1 — Fundamentals

## Question 1

Write a CASE expression that classifies employees.

Rules

| Salary | Grade |
|---------|--------|
| >=150000 | Executive |
| >=100000 | Senior |
| >=50000 | Mid |
| Otherwise | Junior |

### Solution

```sql
SELECT
employee_name,

CASE

WHEN salary>=150000 THEN 'Executive'

WHEN salary>=100000 THEN 'Senior'

WHEN salary>=50000 THEN 'Mid'

ELSE 'Junior'

END AS employee_grade

FROM employees;
```

---

### Interview Discussion

The interviewer expects

- correct ordering
- ELSE clause
- readable SQL

---

### Follow-up

What happens if ELSE is removed?

Answer

Rows that match none of the conditions return

```
NULL
```

---

# Question 2

Create

```
Adult

Minor
```

based on age.

---

### Solution

```sql
SELECT

customer_name,

CASE

WHEN age>=18

THEN 'Adult'

ELSE 'Minor'

END

FROM customers;
```

---

# Level 2 — Intermediate

## Question 3

Create an order category.

Rules

| Amount | Category |
|---------|----------|
| >=100000 | Large |
| >=10000 | Medium |
| Otherwise | Small |

---

### Solution

```sql
SELECT

order_id,

CASE

WHEN order_amount>=100000 THEN 'Large'

WHEN order_amount>=10000 THEN 'Medium'

ELSE 'Small'

END

FROM orders;
```

---

### Interview Discussion

Expected follow-up

Can we use

```
BETWEEN
```

instead?

Yes.

Example

```sql
WHEN order_amount BETWEEN 10000 AND 99999
```

Both approaches are valid.

---

# Question 4

Generate

```
High Income

Medium Income

Low Income
```

using annual income.

---

# Level 3 — Advanced

## Question 5

Find

the number of

Large,

Medium,

and

Small

orders

using

```
SUM(CASE...)
```

---

### Solution

```sql
SELECT

SUM(

CASE

WHEN order_amount>=100000

THEN 1

ELSE 0

END

) AS large_orders,

SUM(

CASE

WHEN order_amount>=10000

AND order_amount<100000

THEN 1

ELSE 0

END

) AS medium_orders,

SUM(

CASE

WHEN order_amount<10000

THEN 1

ELSE 0

END

) AS small_orders

FROM orders;
```

---

### Interview Discussion

The interviewer is testing

- conditional aggregation
- CASE inside aggregate functions
- logical thinking

---

# Question 6

Display

```
High Value Customer
```

only if

```
Total Purchase

>

500000
```

Hint

```
GROUP BY

+

CASE

+

SUM()
```

---

# Level 4 — Senior

## Question 7

A CASE expression contains

```
400 WHEN clauses.
```

Would you approve this during code review?

---

### Expected Answer

Probably not.

I would investigate

- lookup tables
- dimension tables
- configuration tables
- metadata-driven rules

before approving.

---

### Interview Discussion

The interviewer is not testing SQL syntax.

They are testing architecture.

---

# Question 8

The same CASE expression appears

inside

15 dashboards.

How would you redesign it?

---

Expected Answer

Move the business rule

into

ETL

or

Warehouse

and expose

one derived column.

---

# Question 9

CASE appears inside

WHERE

and

query performance drops.

How would you investigate?

---

Expected Discussion

- Review execution plan

- Check predicate simplification

- Look for function calls

- Review indexes

- Benchmark alternative predicates

---

# Level 5 — Staff Engineer

## Question 10

Design

a classification engine

for

```
500 Million

Daily Transactions
```

Requirements

- Business rules change weekly.

- Non-developers update rules.

- Historical reports must remain correct.

- SQL changes should be minimal.

---

### Expected Discussion

Architecture

```
Configuration Tables

↓

Rule Engine

↓

ETL

↓

Dimensions

↓

Warehouse

↓

Reports
```

Not

```
5000-line CASE
```

---

# Coding Challenge

## Challenge 1

Generate

- Customer Tier

- Income Band

- Age Group

- City Category

using one SQL query.

---

## Challenge 2

Rewrite the solution using

lookup tables.

---

## Challenge 3

Which version would you deploy?

Why?

---

# Debugging Challenge

Developer submits

```sql
CASE

WHEN salary>10000

THEN 'Junior'

WHEN salary>50000

THEN 'Senior'

WHEN salary>100000

THEN 'Executive'

END
```

Questions

1. Identify every issue.

2. Explain why it is incorrect.

3. Rewrite it.

4. Explain the business impact.

---

# Architecture Challenge

A company has

```
120 Reports

40 ETL Jobs

18 APIs
```

Every system contains

the same CASE expression.

How would you redesign the platform?

---

Expected Discussion

```
Business Rule

↓

ETL

↓

Warehouse

↓

Semantic Layer

↓

Reports
```

One business definition.

---

# Rapid Fire Questions

1. Is CASE an expression or a statement?

2. Can CASE appear inside ORDER BY?

3. Does CASE modify data?

4. Is ELSE mandatory?

5. Can CASE return NULL?

6. Can CASE be nested?

7. Can CASE be used inside SUM()?

8. Can CASE be used inside AVG()?

9. Does CASE stop after the first matching condition?

10. Does CASE guarantee evaluation of every WHEN clause?

---

# Common Interview Mistakes

❌ Wrong condition order.

❌ Missing ELSE.

❌ Hardcoding hundreds of mappings.

❌ Ignoring NULL values.

❌ Assuming CASE is always the best solution.

❌ Not discussing architecture when asked about maintainability.

---

# Interview Tips

✅ Explain your reasoning before writing SQL.

✅ Clarify assumptions.

✅ Consider edge cases.

✅ Mention maintainability.

✅ Discuss performance only after correctness.

✅ Think beyond syntax.

Senior interviewers are often more interested in your design decisions than your ability to type SQL quickly.

---

# Practice Assignment

Using the enterprise database created in the PostgreSQL Lab, solve the following:

1. Customer Tier Classification
2. Employee Grade
3. Order Size Category
4. Product Price Band
5. Fraud Risk
6. Data Quality Status
7. Revenue KPI
8. Customer Lifetime Segment
9. Dashboard Status
10. Executive Report Dataset

Each problem should be solved using:

- CASE
- Lookup Table (where appropriate)
- Dimension Table (where appropriate)

Finally, compare all three approaches.

---

# Section Summary

After completing this section, you should be able to:

- Solve CASE interview questions confidently.
- Explain not only the SQL syntax but also the architectural reasoning behind your solution.
- Recognize when CASE is appropriate and when a lookup table, dimension table, or configuration table is a better choice.
- Demonstrate the level of thinking expected from Senior and Staff Data Engineers.


# ==========================================================
# Section 15
# Enterprise Capstone Project
# Building a Customer Intelligence Pipeline
# ==========================================================

# Project Overview

Congratulations!

You have been hired as a Data Engineer for a multinational e-commerce company.

Every day the company receives millions of transactions from

- Website
- Mobile App
- Physical Stores
- Partner Vendors

The business team wants a centralized reporting platform.

Your responsibility is to design the SQL transformations.

This project simulates a real production ETL pipeline.

---

# Business Requirements

The company wants to answer questions like:

- Who are our Premium Customers?
- Which orders are High Value?
- Which customers are at Fraud Risk?
- Which products generate maximum revenue?
- Which customers require manual verification?
- Which customers qualify for loyalty benefits?

None of these values exist in the source system.

You must derive them.

---

# Source Tables

The warehouse contains

```
customers

orders

employees

products

transactions

payments

returns
```

---

# Final Reporting Table

Create

```
fact_customer_dashboard
```

with the following columns.

| Column | Description |
|----------|-------------|
| customer_id | Customer |
| customer_name | Customer Name |
| customer_tier | Bronze / Silver / Gold / Platinum |
| age_group | Minor / Adult / Senior |
| city_category | Metro / Non Metro |
| total_purchase | Total Sales |
| order_category | Small / Medium / Large |
| fraud_risk | Low / Medium / High |
| payment_status | Successful / Failed |
| loyalty_status | Eligible / Not Eligible |
| validation_status | Valid / Invalid |
| dashboard_status | Green / Yellow / Red |

---

# Step 1
# Customer Tier

Business Rules

| Purchase | Tier |
|-----------|------|
| >=2000000 | Platinum |
| >=1000000 | Gold |
| >=500000 | Silver |
| Otherwise | Bronze |

---

# Step 2
# Age Group

| Age | Group |
|------|-------|
| <18 | Minor |
| 18-59 | Adult |
| >=60 | Senior |

---

# Step 3
# Order Category

| Amount | Category |
|----------|----------|
| >=100000 | Large |
| >=25000 | Medium |
| Otherwise | Small |

---

# Step 4
# Customer Risk

Business Rules

```
Purchase > ₹10,00,000

AND

More than 5 failed payments

↓

High Risk
```

```
Purchase > ₹5,00,000

↓

Medium Risk
```

Otherwise

```
Low Risk
```

---

# Step 5
# Loyalty Status

```
Gold

↓

Eligible

Platinum

↓

Eligible

Others

↓

Not Eligible
```

---

# Step 6
# Validation Status

Customer is invalid if

- City is NULL
- Age is NULL
- Income is NULL

Otherwise

```
Valid
```

---

# Step 7
# Dashboard Status

Rules

```
High Risk

↓

RED
```

```
Medium Risk

↓

YELLOW
```

Otherwise

```
GREEN
```

---

# Architecture

```
Operational Database

↓

Landing

↓

Raw Tables

↓

Validation

↓

CASE

↓

Lookup Tables

↓

Dimensions

↓

Fact Table

↓

Power BI

↓

Executives
```

---

# Solution Strategy

The project should be built in multiple stages.

```
Stage 1

Read Raw Data

↓

Stage 2

Clean Data

↓

Stage 3

Validate

↓

Stage 4

CASE Transformations

↓

Stage 5

Dimension Lookup

↓

Stage 6

Fact Table

↓

Stage 7

Dashboard
```

---

# Challenge 1

Write ONE SQL query that generates

- Customer Tier
- Age Group
- Order Category
- Loyalty Status
- Dashboard Status

---

# Challenge 2

Replace

```
Customer Tier
```

with a lookup table.

Discuss advantages.

---

# Challenge 3

Replace

```
Order Category
```

using a dimension table.

---

# Challenge 4

Which CASE expressions should remain?

Which should become dimensions?

Explain your reasoning.

---

# Challenge 5

The business introduces

```
Diamond

↓

Purchase >= ₹50,00,000
```

Questions

1. Which SQL changes?

2. Which ETL changes?

3. Which dimensions change?

4. Which dashboards change?

---

# Challenge 6

Marketing changes

```
Gold

↓

₹10,00,000

↓

₹8,00,000
```

How would your architecture minimize code changes?

---

# Challenge 7

The Fraud Team requests

```
Extreme Risk
```

for customers having

- High Purchase
- More than 20 Failed Payments
- More than 3 Chargebacks

How would you redesign the pipeline without creating a 500-line CASE expression?

---

# Enterprise Discussion

Suppose your company has

```
300 ETL Jobs

600 Dashboards

120 APIs

20 Machine Learning Models
```

All of them require

```
Customer Tier
```

Should every system calculate it independently?

Absolutely not.

The business rule should exist exactly once.

A well-designed warehouse provides a **single source of truth**.

---

# Production Architecture

```
Raw Layer

↓

Validation Layer

↓

Transformation Layer

↓

Business Rule Layer

↓

Dimension Layer

↓

Fact Layer

↓

Semantic Layer

↓

Power BI

↓

Executive Dashboard

↓

Machine Learning
```

Notice that

CASE belongs inside the

**Business Rule Layer**.

---

# Deliverables

After completing this project, you should produce

✓ PostgreSQL SQL Script

✓ ETL SQL Script

✓ Lookup Tables

✓ Dimension Tables

✓ Reporting View

✓ Dashboard Dataset

✓ Architecture Diagram

✓ Data Dictionary

✓ Business Rule Documentation

---

# Evaluation Checklist

| Category | Weight |
|-----------|--------|
| SQL Correctness | 20% |
| CASE Usage | 15% |
| Readability | 10% |
| Performance | 15% |
| Architecture | 15% |
| Maintainability | 15% |
| Documentation | 10% |

---

# Bonus Challenge

Rewrite the complete solution using

- PostgreSQL
- Spark SQL
- Snowflake SQL

Compare

- Syntax
- Readability
- Performance Considerations
- Enterprise Use Cases

---

# Real Interview Question

> You inherit an ETL pipeline containing a 2,000-line CASE expression that classifies insurance claims.

Explain:

1. How you would review it.
2. How you would identify duplicated logic.
3. Which parts should become lookup tables.
4. Which parts should become dimension tables.
5. Which rules should remain CASE.
6. How you would migrate safely without changing business results.

This type of design question is common in Senior and Staff Data Engineer interviews.

---

# Learning Outcomes

After completing this Capstone Project, you will be able to:

✓ Design enterprise-grade CASE transformations.

✓ Decide when to use CASE, lookup tables, or dimension tables.

✓ Build maintainable ETL pipelines.

✓ Create reusable reporting datasets.

✓ Think like a Data Engineer rather than simply writing SQL.

✓ Explain architectural decisions during interviews.

---

# What's Next?

Congratulations!

You have completed the most comprehensive chapter on SQL CASE expressions.

In the next chapter, we move to another essential topic:

# NULL Handling (NULL, IS NULL, IS NOT NULL, COALESCE, NULLIF)

You will learn:

- Three-Valued Logic
- Why NULL breaks comparisons
- NULL in Aggregations
- NULL in JOINs
- COALESCE
- NULLIF
- IS DISTINCT FROM
- Performance Considerations
- Enterprise Data Quality Patterns
- ETL Null Handling
- Warehouse Null Strategies
- Interview Questions
- Enterprise Capstone

NULL handling is one of the most misunderstood topics in SQL and is responsible for countless production bugs. We'll approach it with the same depth and practical focus as this CASE chapter.


# ==========================================================
# Section 16
# CASE Cheat Sheet & Quick Reference
# ==========================================================

# Purpose

This section is designed as a quick revision guide.

Instead of reading the entire chapter again, you can review this section in a few minutes before

- Interviews
- Technical Assessments
- Code Reviews
- Project Work
- Certification Exams

---

# CASE Syntax

## Searched CASE

```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ELSE default_result
END
```

---

## Simple CASE

```sql
CASE expression
    WHEN value1 THEN result1
    WHEN value2 THEN result2
    ELSE default_result
END
```

---

# CASE Evaluation Order

```
CASE

↓

WHEN 1

↓

TRUE ?

↓

YES

↓

RETURN

↓

STOP

↓

NO

↓

WHEN 2

↓

TRUE ?

↓

YES

↓

RETURN

↓

STOP
```

Remember

> **First TRUE condition wins.**

---

# CASE Can Be Used In

| Clause | Supported |
|----------|-----------|
| SELECT | ✅ |
| WHERE | ✅ |
| ORDER BY | ✅ |
| GROUP BY | ✅ |
| HAVING | ✅ |
| UPDATE | ✅ |
| INSERT | ✅ |
| Window Functions | ✅ |
| Aggregate Functions | ✅ |

---

# Common Examples

## Salary Band

```sql
CASE
WHEN salary>=100000 THEN 'Executive'
WHEN salary>=50000 THEN 'Senior'
ELSE 'Junior'
END
```

---

## Pass / Fail

```sql
CASE
WHEN marks>=40
THEN 'Pass'
ELSE 'Fail'
END
```

---

## Customer Tier

```sql
CASE
WHEN purchase>=1000000 THEN 'Gold'
WHEN purchase>=500000 THEN 'Silver'
ELSE 'Bronze'
END
```

---

# Conditional Aggregation

Count High Value Orders

```sql
SELECT

SUM(

CASE

WHEN amount>=100000

THEN 1

ELSE 0

END

)

FROM orders;
```

---

Average Salary

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

---

# CASE Inside ORDER BY

```sql
ORDER BY

CASE

WHEN department='CEO'

THEN 1

WHEN department='Finance'

THEN 2

ELSE 3

END;
```

Useful for custom sorting.

---

# CASE Inside UPDATE

```sql
UPDATE employees

SET bonus=

CASE

WHEN salary>=100000

THEN salary*0.20

ELSE salary*0.10

END;
```

---

# CASE Inside INSERT

```sql
INSERT INTO employee_grade

SELECT

employee_id,

CASE

WHEN salary>=100000

THEN 'Executive'

ELSE 'Employee'

END

FROM employees;
```

---

# CASE Inside Window Functions

```sql
SELECT

employee_name,

SUM(

CASE

WHEN department='Sales'

THEN salary

ELSE 0

END

)

OVER()

FROM employees;
```

---

# Performance Checklist

Before using CASE ask yourself

✓ Is CASE really needed?

✓ Are conditions mutually exclusive?

✓ Is ELSE included?

✓ Are expensive functions avoided?

✓ Can the optimizer simplify this?

✓ Should this become a lookup table?

✓ Should this become a dimension?

✓ Should this be materialized during ETL?

---

# Decision Matrix

| Scenario | Best Solution |
|------------|---------------|
| Salary Bands | CASE |
| Country Codes | Lookup Table |
| Product Categories | Dimension Table |
| Customer Tier | CASE / ETL |
| ISO Codes | Lookup |
| Dynamic Threshold | CASE |
| Static Mapping | Lookup |
| Historical Attributes | Dimension |

---

# Enterprise Decision Tree

```
Need a Calculation?

↓

YES

↓

CASE

↓

NO

↓

Need Code Mapping?

↓

YES

↓

Lookup Table

↓

Need Multiple Attributes?

↓

YES

↓

Dimension Table
```

---

# CASE vs IF

| CASE | IF |
|------|----|
| ANSI SQL Standard | Vendor Specific |
| Portable | Not Always |
| Multiple Conditions | Usually Limited |
| Preferred | Use Only When Necessary |

---

# CASE vs COALESCE

| CASE | COALESCE |
|------|----------|
| General Decision Logic | NULL Handling |
| Many Conditions | First Non-NULL Value |
| Flexible | Specialized |

---

# CASE vs Lookup Table

| CASE | Lookup |
|------|--------|
| Calculations | Reference Data |
| Small Rules | Large Mappings |
| Hardcoded | Data Driven |
| Less Flexible | Easier Maintenance |

---

# CASE vs Dimension Table

| CASE | Dimension |
|------|-----------|
| Derived Value | Business Entity |
| Temporary | Reusable |
| No History | Supports History |
| Small Logic | Enterprise Modeling |

---

# Enterprise Best Practices

✅ Keep CASE expressions short.

✅ Document complex business rules.

✅ Use descriptive aliases.

✅ Always include ELSE.

✅ Keep calculations separate from mappings.

✅ Centralize reusable business logic.

---

# Enterprise Anti-Patterns

❌ 500 WHEN clauses.

❌ Wrong ordering.

❌ Missing ELSE.

❌ Nested CASE inside nested CASE.

❌ Hardcoded business mappings.

❌ Repeated CASE in multiple reports.

❌ Magic numbers.

---

# SQL Review Checklist

Before committing SQL

✓ Correct ordering

✓ ELSE included

✓ No duplicate logic

✓ Readable formatting

✓ Performance reviewed

✓ Business rules documented

✓ Unit tested

✓ Peer reviewed

---

# Interview Revision

Remember

CASE is

✅ Expression

NOT

❌ Statement

---

Evaluation

```
Top

↓

Bottom

↓

First Match Wins
```

---

CASE does

✅ Return Values

CASE does NOT

❌ Filter Rows

❌ Modify Data

❌ Store Values

---

# Architecture Summary

```
Small Calculation

↓

CASE

----------------

Reference Data

↓

Lookup

----------------

Business Entity

↓

Dimension

----------------

Reusable Business Logic

↓

ETL

↓

Warehouse

↓

Dashboard
```

---

# One Page Revision

```
CASE

↓

Expression

↓

First TRUE Wins

↓

Used in SELECT

↓

Conditional Aggregation

↓

ORDER BY

↓

UPDATE

↓

INSERT

↓

Window Functions

↓

ETL

↓

Warehouse

↓

Analytics

↓

Interview
```

---

# Top 20 Interview Questions

1. CASE or Statement?
2. Simple vs Searched CASE?
3. Evaluation Order?
4. First Match Wins?
5. Missing ELSE?
6. CASE inside WHERE?
7. CASE inside ORDER BY?
8. CASE inside GROUP BY?
9. Conditional Aggregation?
10. CASE and NULL?
11. CASE Performance?
12. CASE vs IF?
13. CASE vs COALESCE?
14. CASE vs Lookup?
15. CASE vs Dimension?
16. CASE in ETL?
17. CASE in BI?
18. CASE Anti-Patterns?
19. CASE Code Review?
20. Large CASE Refactoring?

---

# Chapter Completion Checklist

After completing Chapter 33, you should be able to

☑ Write simple CASE expressions.

☑ Write searched CASE expressions.

☑ Use CASE inside every SQL clause where appropriate.

☑ Build conditional aggregations.

☑ Optimize CASE performance.

☑ Design enterprise business rules.

☑ Decide between CASE, Lookup Tables, and Dimension Tables.

☑ Build ETL transformations.

☑ Create BI-ready datasets.

☑ Review SQL professionally.

☑ Solve senior-level interview questions.

☑ Design enterprise architectures using CASE.


# ==========================================================
# Section 17
# Chapter Summary, Knowledge Graph & Learning Roadmap
# ==========================================================

# Chapter Recap

Congratulations!

You have completed one of the most comprehensive chapters in this handbook.

This chapter was never intended to simply teach the syntax of the `CASE` expression.

Instead, the objective was to help you understand how CASE expressions are designed, optimized, maintained, and used in modern enterprise data platforms.

You have progressed from writing basic conditional expressions to making architectural decisions that influence ETL pipelines, data warehouses, reporting systems, and enterprise applications.

By completing this chapter, you have acquired both SQL knowledge and Data Engineering design principles.

---

# Knowledge Graph

The following diagram summarizes everything learned throughout this chapter.

```
                                  CASE Expression

                                         │

      ┌──────────────────────────────────┼──────────────────────────────────┐

      │                                  │                                  │

      ▼                                  ▼                                  ▼

Basic Syntax                     Advanced CASE                     Conditional Logic

      │                                  │                                  │

      ▼                                  ▼                                  ▼

Simple CASE                    Nested CASE                    Multiple Conditions

      │                                  │

      └──────────────┬───────────────────┘

                     ▼

             Query Execution

                     │

      ┌──────────────┼──────────────┐

      ▼                              ▼

Logical Plan                 Physical Plan

      │                              │

      ▼                              ▼

Optimizer                 Execution Engine

                     │

                     ▼

             Performance Tuning

                     │

      ┌──────────────┼──────────────┐

      ▼                              ▼

Expensive Functions          Predicate Design

      │                              │

      └──────────────┬───────────────┘

                     ▼

            Enterprise Design

                     │

      ┌──────────────┼───────────────┐

      ▼                              ▼

Lookup Tables              Dimension Tables

                     │

                     ▼

               ETL Pipelines

                     │

                     ▼

             Data Warehouse

                     │

                     ▼

          Business Intelligence

                     │

                     ▼

             Enterprise Reporting
```

---

# CASE Decision Framework

Whenever you need conditional logic, ask yourself the following questions.

```
Do I need to calculate something?

        │

      YES

        │

        ▼

     Use CASE

        │

        ▼

Does the logic change frequently?

        │

   YES         NO

    │           │

    ▼           ▼

Configuration   CASE

Table

```

---

If the requirement is a mapping instead of a calculation,

```
Need to map codes?

        │

       YES

        │

        ▼

Lookup Table

        │

        ▼

Need additional business attributes?

        │

       YES

        │

        ▼

Dimension Table
```

---

# Enterprise Decision Matrix

| Business Requirement | Recommended Solution |
|----------------------|----------------------|
| Salary Band | CASE |
| Customer Tier | CASE (ETL) |
| Product Category | Dimension Table |
| Country Code | Lookup Table |
| Tax Rate | Configuration Table |
| Discount Percentage | Configuration Table |
| Customer Segment | CASE or Dimension |
| Risk Classification | CASE |
| ISO Country Mapping | Lookup Table |
| Business Metadata | Dimension Table |

---

# Common Production Uses of CASE

CASE expressions appear in almost every enterprise data platform.

Examples include:

### Banking

- Loan Classification
- Fraud Detection
- AML Risk
- Credit Scoring

---

### Healthcare

- Patient Priority
- Insurance Category
- Risk Assessment
- Billing Classification

---

### Retail

- Customer Tier
- Product Category
- Discount Band
- Sales Category

---

### Telecommunications

- Subscriber Type
- Recharge Category
- Network Status
- Customer Segment

---

### Insurance

- Claim Priority
- Policy Classification
- Risk Level
- Premium Band

---

### Manufacturing

- Machine Health
- Defect Category
- Production Status
- Inventory Classification

---

# Skills Acquired

After completing this chapter, you can now:

## SQL Skills

✓ Write Simple CASE

✓ Write Searched CASE

✓ Use CASE inside SELECT

✓ Use CASE inside ORDER BY

✓ Use CASE inside GROUP BY

✓ Use CASE inside HAVING

✓ Use CASE inside UPDATE

✓ Use CASE inside INSERT

✓ Use CASE inside Aggregate Functions

✓ Use CASE inside Window Functions

---

## Data Engineering Skills

✓ Design ETL transformations

✓ Build reusable business rules

✓ Classify transactional data

✓ Build reporting datasets

✓ Create derived business attributes

✓ Improve SQL maintainability

✓ Review SQL professionally

✓ Read execution plans conceptually

✓ Understand optimizer behavior

✓ Build scalable transformation logic

---

## Architecture Skills

✓ Decide between CASE and Lookup Tables

✓ Decide between CASE and Dimension Tables

✓ Materialize business attributes

✓ Centralize business logic

✓ Design reusable SQL

✓ Build warehouse-friendly transformations

---

# Common Mistakes to Remember

Never forget these lessons.

❌ Wrong condition ordering

❌ Missing ELSE

❌ Overlapping conditions

❌ Hardcoded business mappings

❌ Huge CASE expressions

❌ Duplicate CASE logic

❌ Expensive functions inside CASE

❌ Mixing business domains

❌ Ignoring maintainability

❌ Ignoring execution plans

---

# Best Practices

Always remember these principles.

✅ Keep CASE expressions readable.

✅ Make conditions mutually exclusive whenever possible.

✅ Add ELSE unless NULL is intentional.

✅ Use descriptive aliases.

✅ Replace large mappings with lookup tables.

✅ Replace business entities with dimensions.

✅ Store stable business rules during ETL.

✅ Review SQL before deployment.

✅ Test boundary conditions.

✅ Document business assumptions.

---

# Self-Assessment Checklist

Can you confidently answer the following?

| Question | Completed |
|-----------|-----------|
| Can you explain CASE? | ☐ |
| Can you explain Simple vs Searched CASE? | ☐ |
| Can you explain evaluation order? | ☐ |
| Can you explain optimizer behavior? | ☐ |
| Can you optimize CASE? | ☐ |
| Can you review CASE professionally? | ☐ |
| Can you design lookup tables? | ☐ |
| Can you design dimensions? | ☐ |
| Can you build ETL transformations? | ☐ |
| Can you answer senior interview questions? | ☐ |

If any answer is "No",

revisit the corresponding section before moving forward.

---

# Recommended Practice

Before starting the next chapter, complete the following.

## Practice 1

Rewrite every CASE example without looking at the solution.

---

## Practice 2

Replace three CASE expressions with lookup tables.

---

## Practice 3

Convert one lookup table into a dimension table.

---

## Practice 4

Create your own business classification problem and solve it.

---

## Practice 5

Explain CASE to another person without referring to your notes.

Teaching is one of the fastest ways to identify knowledge gaps.

---

# Recommended Reading Order

Continue your SQL journey in the following sequence.

```
CASE

↓

NULL Handling

↓

Functions

↓

GROUP BY

↓

HAVING

↓

Joins

↓

Set Operators

↓

Subqueries

↓

CTEs

↓

Window Functions

↓

Query Optimization

↓

Transactions

↓

Indexes

↓

Data Warehousing

↓

Spark SQL

↓

Snowflake SQL
```

Each chapter builds on concepts learned previously.

---

# Key Takeaways

Remember these five principles.

### 1.

CASE is an **expression**, not a statement.

---

### 2.

CASE returns the first matching result.

Order matters.

---

### 3.

CASE is ideal for calculations,

not large business mappings.

---

### 4.

Business rules should have a single source of truth.

Avoid duplicating CASE expressions across ETL jobs, reports, and dashboards.

---

### 5.

A Senior Data Engineer thinks beyond syntax.

They design SQL that is:

- Correct
- Readable
- Maintainable
- Performant
- Scalable

---

# Looking Ahead

The next chapter explores one of the most misunderstood topics in SQL.

# Chapter 34
# NULL Handling

You will learn

- What NULL actually represents
- Three-Valued Logic
- Why `NULL = NULL` is not TRUE
- IS NULL
- IS NOT NULL
- COALESCE
- NULLIF
- IS DISTINCT FROM
- NULLs in JOINs
- NULLs in Aggregate Functions
- NULLs in Window Functions
- ETL Null Strategies
- Data Warehouse Null Design
- Query Optimization with NULLs
- Enterprise Case Studies
- PostgreSQL Lab
- Interview Questions
- Capstone Project

Understanding NULL is essential because it affects almost every SQL query you will write.

---

# Final Thoughts

Learning SQL is not about memorizing syntax.

It is about learning how data behaves.

As you progress through this handbook, continue asking not only:

> **"How do I write this query?"**

but also

> **"How would this design behave in a production data platform handling billions of rows?"**

That mindset is what transforms a SQL developer into a Data Engineer.

---

# End of Chapter 33

**Congratulations!**

You have completed one of the most comprehensive CASE expression chapters designed specifically for Data Engineers.

The next chapter begins with one of SQL's most important concepts:

**Chapter 34 — NULL Handling**