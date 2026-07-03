# ==========================================================
# Chapter 37
# Window Functions
# ==========================================================

# 37.1 Introduction to Window Functions

# Introduction

Until now,

you have learned

how to

retrieve,

filter,

group,

join,

and

aggregate

data.

However,

many business

problems

cannot be solved

using

ordinary

SQL queries.

Businesses

often need

to compare

one row

with

other rows

without

losing

the original

rows.

This is

exactly

what

Window Functions

were designed

to do.

Window Functions

perform

calculations

across

a set

of related rows

while

preserving

every row

in

the result set.

They are

one of

the most

powerful

features

available

in PostgreSQL.

---

# What Is

A Window Function?

A

Window Function

is

a special

SQL function

that performs

a calculation

over

a group

of rows,

called

a

```
Window
```

without

combining

those rows

into

a single result.

Unlike

aggregate functions,

Window Functions

return

one result

for

every row.

---

# What

Is

A Window?

A

window

is

a logical

set

of rows

related

to

the current row.

Imagine

this table.

| Employee | Department | Salary |
|-----------|------------|-------:|
|Alice|IT|70000|
|Bob|IT|65000|
|Charlie|IT|80000|
|David|HR|60000|
|Emma|HR|55000|

When

PostgreSQL

processes

Alice,

the window

may contain

all employees

in

the IT

department.

When

it processes

David,

the window

changes

to

the HR

department.

The current

row changes,

but

the calculation

still returns

one value

for

each row.

---

# Why

Do We Need

Window Functions?

Suppose

Business asks

```
Show

Each Employee

And

The Average Salary

Of

Their Department.
```

Using

ordinary

aggregate functions,

you would

lose

the employee

rows.

Window Functions

allow

PostgreSQL

to display

both

the employee

and

the department

average

together.

---

# Aggregate

Function

Example

Suppose

we write

```sql
SELECT

department,

AVG(salary)

FROM employees

GROUP BY

department;
```

Result

| Department | Average Salary |
|-------------|---------------:|
|IT|71666.67|
|HR|57500|

Notice

that

individual

employees

have disappeared.

The rows

were grouped.

---

# Window

Function

Example

Instead,

a Window Function

can produce

something like

| Employee | Department | Salary | Department Average |
|-----------|------------|-------:|-------------------:|
|Alice|IT|70000|71666.67|
|Bob|IT|65000|71666.67|
|Charlie|IT|80000|71666.67|
|David|HR|60000|57500|
|Emma|HR|55000|57500|

Every

employee

remains

visible.

The calculation

is performed

over

the related

rows.

---

# Think

Of It

Like This

Aggregate Functions

say

```
Many Rows

↓

One Row
```

Window Functions

say

```
Many Rows

↓

Calculation

↓

Every Row
```

That is

the biggest

difference.

---

# Business

Applications

Window Functions

are used

in

almost every

analytics

system.

Examples

include

- Sales Rankings

- Running Totals

- Moving Averages

- Financial Reports

- Employee Rankings

- Customer Analytics

- Leaderboards

- Trend Analysis

- Time-Series Reports

- Data Engineering

Pipelines

---

# Enterprise

Examples

Banking

```
Running

Account

Balance
```

---

Retail

```
Top Selling

Products
```

---

Healthcare

```
Patient

Visit

Timeline
```

---

HR

```
Salary

Ranking
```

---

Finance

```
Monthly

Revenue

Growth
```

---

Manufacturing

```
Production

Trend

Analysis
```

---

# Advantages

Window Functions

allow you

to

- Keep

every row

- Compare

rows

- Rank

rows

- Calculate

running totals

- Build

moving averages

- Analyze

time-series

data

- Perform

advanced

analytics

without

complex

subqueries

---

# When

Should You

Use Them?

Consider

using

Window Functions

when

you need

to answer

questions

such as

```
Who

Has

The Highest

Salary?
```

```
What

Is

The Running

Total?
```

```
What

Was

Yesterday's

Sales?
```

```
Who

Ranks

First

In

Each Department?
```

```
How Much

Did Revenue

Increase

Compared

To Last Month?
```

These

are

ideal

Window Function

problems.

---

# Think Like

A Data Analyst

Business asks

```
Display

Every Employee

Along With

Their Rank

Inside

Their Department.
```

A

GROUP BY

query

cannot

solve

this problem

because

it removes

individual

employees.

A Window Function

keeps

every employee

while

calculating

their rank.

This makes

Window Functions

essential

for

business

analytics.

---

# Best Practices

✅ Use Window Functions for row-by-row analytics.

✅ Keep aggregate functions for summary reports.

✅ Understand the difference between grouping and windowing.

✅ Use meaningful window definitions.

✅ Learn the `OVER()` clause thoroughly.

---

# Common Misconceptions

❌ Window Functions replace aggregate functions.

❌ Window Functions reduce the number of rows.

❌ Every Window Function requires ranking.

❌ Window Functions always sort the data.

❌ Window Functions are only used in reporting.

---

# PostgreSQL Practice Lab

## Exercise 1

Explain

the difference

between

an Aggregate Function

and

a Window Function.

---

## Exercise 2

Give

three

real-world

examples

where

Window Functions

would be

more useful

than

`GROUP BY`.

---

## Exercise 3

Predict

whether

the following

business request

needs

a Window Function

or

an Aggregate Function.

```
Display

Every Employee

With

The Highest

Salary

In

Their Department.
```

---

## Exercise 4

Identify

five industries

that use

Window Functions

regularly.

---

## Exercise 5

Explain

why

Window Functions

are important

for

Business Intelligence

and

Data Engineering.

---

# Interview Questions

## Beginner

1. What is a Window Function?

2. What is meant by a "window" in SQL?

3. How does a Window Function differ from an Aggregate Function?

---

## Intermediate

1. Why do Window Functions preserve rows while aggregate functions do not?

2. Give three business scenarios where Window Functions are the best solution.

3. Why are Window Functions widely used in analytics?

---

## Senior

1. Explain the internal concept of a window in PostgreSQL.

2. How would you decide between using `GROUP BY` and a Window Function?

3. Why are Window Functions considered one of the most important SQL features for Data Engineers?

---

# Section Summary

In this section,

you learned:

- A Window Function performs calculations across a related set of rows while preserving every row in the result.
- A window is the logical group of rows over which the calculation is performed.
- Unlike aggregate functions, Window Functions do not collapse rows into a single summary.
- Window Functions are widely used for rankings, running totals, trend analysis, time-series reporting, and advanced analytics.
- Understanding the concept of a window is the foundation for mastering the `OVER()` clause and all advanced Window Functions.

---

# Coming Up Next

## Section 37.2

# Why Window Functions Exist

You'll learn:

- The limitations of traditional SQL.
- Problems that `GROUP BY` cannot solve.
- Why Window Functions were introduced.
- Real-world analytical requirements.
- Comparing traditional SQL with modern analytics.


# ==========================================================
# Section 37.2
# Why Window Functions Exist
# ==========================================================

# Introduction

Window Functions

were not

introduced

to replace

existing

SQL features.

Instead,

they were

introduced

to solve

problems

that

traditional SQL

could not

solve

efficiently.

Before

Window Functions,

developers

often wrote

complex

subqueries,

SELF JOINs,

or

multiple

Common Table Expressions

to answer

analytical

business questions.

Window Functions

provide

a simpler,

faster,

and

more readable

solution.

---

# Traditional SQL

Works Well

For

Traditional SQL

is excellent

for

- Filtering

- Sorting

- Grouping

- Joining

- Aggregating

For example,

Business asks

```
What

Is

The Average Salary

Of

Each Department?
```

A simple

`GROUP BY`

solves

the problem.

```sql
SELECT

department,

AVG(salary)

FROM employees

GROUP BY

department;
```

---

# Traditional SQL

Struggles

When

Business

requirements

become

analytical.

Example

```
Show

Every Employee

Along With

Their Department

Average Salary.
```

Using

`GROUP BY`

alone

cannot

produce

this result.

Why?

Because

`GROUP BY`

collapses

multiple rows

into

one row.

---

# Business

Problem

Suppose

we have

this table.

| Employee | Department | Salary |
|-----------|------------|-------:|
|Alice|IT|70000|
|Bob|IT|65000|
|Charlie|IT|80000|
|David|HR|60000|
|Emma|HR|55000|

Business asks

```
Display

Every Employee

And

The Average Salary

Of

Their Department.
```

Desired Result

| Employee | Department | Salary | Department Average |
|-----------|------------|-------:|-------------------:|
|Alice|IT|70000|71666.67|
|Bob|IT|65000|71666.67|
|Charlie|IT|80000|71666.67|
|David|HR|60000|57500|
|Emma|HR|55000|57500|

Traditional

`GROUP BY`

cannot

produce

this output

directly.

---

# Before

Window Functions

Developers

often used

subqueries.

Example

```sql
SELECT

e.employee_name,

e.department,

e.salary,

d.avg_salary

FROM employees e

JOIN
(
    SELECT

    department,

    AVG(salary)

    AS avg_salary

    FROM employees

    GROUP BY

    department
)

AS d

ON

e.department = d.department;
```

Although

correct,

this approach

is

longer,

less readable,

and

more difficult

to maintain.

---

# Another

Business Problem

Business asks

```
Rank

Employees

By Salary

Within

Each Department.
```

Traditional SQL

cannot

easily

assign

a ranking

to

every row.

Window Functions

were designed

for

exactly

this type

of problem.

---

# Running

Totals

Business asks

```
Display

Daily Sales

And

The Running Total.
```

Example

| Date | Sales |
|------|------:|
|1 Jan|100|
|2 Jan|200|
|3 Jan|150|
|4 Jan|300|

Desired Result

| Date | Sales | Running Total |
|------|------:|--------------:|
|1 Jan|100|100|
|2 Jan|200|300|
|3 Jan|150|450|
|4 Jan|300|750|

Traditional SQL

requires

complex

queries.

Window Functions

solve

this naturally.

---

# Previous

Row

Comparison

Business asks

```
Compare

Today's Sales

With

Yesterday's Sales.
```

Traditional SQL

often requires

SELF JOINs

or

subqueries.

Window Functions

provide

simple

navigation

functions

like

```
LAG()
```

and

```
LEAD().
```

---

# Top-N

Per Group

Business asks

```
Display

The Top

Three Employees

In

Each Department.
```

Traditional SQL

is difficult

to write

and

maintain.

Window Functions

make

this problem

straightforward.

---

# Time-Series

Analytics

Modern

businesses

analyze

data

over time.

Examples

include

- Revenue Growth

- Stock Prices

- Website Traffic

- Sensor Data

- Customer Activity

Window Functions

are designed

specifically

for

these

analytical

requirements.

---

# Why

Analytics

Needed

Something New

Business

does not

always want

summaries.

Often,

it wants

comparisons.

Examples

```
Current

Row

↓

Previous Row

↓

Next Row

↓

Running Total

↓

Department Rank

↓

Moving Average
```

Traditional SQL

was never

designed

to perform

these

calculations

easily.

---

# Window

Functions

Solve

These Problems

Instead

of collapsing

rows,

Window Functions

allow

PostgreSQL

to

- Compare rows

- Rank rows

- Navigate rows

- Build running totals

- Calculate moving averages

- Perform cumulative analysis

All

while

keeping

every row

visible.

---

# Aggregate

vs

Window

Thinking

Aggregate

thinking

asks

```
Summarize

The Data.
```

Window

thinking

asks

```
Analyze

Each Row

Using

Related Rows.
```

This

difference

changes

how

you solve

business

problems.

---

# Enterprise

Applications

Finance

```
Running

Balance
```

---

Retail

```
Top Selling

Products
```

---

Healthcare

```
Patient

Timeline
```

---

HR

```
Employee

Ranking
```

---

Marketing

```
Campaign

Performance
```

---

Data

Engineering

```
Event Stream

Analysis
```

---

# Think Like

A Business

Analyst

Business asks

```
Show

Each Customer

And

Their Rank

Based On

Total Spending.
```

A

summary

report

is not

enough.

Business

needs

every customer

along with

their position

relative

to others.

This is

why

Window Functions

exist.

---

# Best Practices

✅ Use Window Functions for analytical calculations.

✅ Continue using `GROUP BY` for summary reports.

✅ Choose the simplest solution for the business requirement.

✅ Recognize problems involving row-to-row comparisons.

✅ Think in terms of analysis rather than aggregation.

---

# Common Misconceptions

❌ Window Functions replace `GROUP BY`.

❌ Window Functions are only for ranking.

❌ Window Functions are always slower.

❌ Every analytical problem requires recursion.

❌ Window Functions modify table data.

---

# PostgreSQL Practice Lab

## Exercise 1

Explain

why

`GROUP BY`

cannot

display

every employee

along with

the department

average.

---

## Exercise 2

List

five

business problems

that

Window Functions

solve

more naturally

than

traditional SQL.

---

## Exercise 3

Identify

whether

the following

requires

an Aggregate Function

or

a Window Function.

```
Display

The Running

Total

Of

Monthly Sales.
```

---

## Exercise 4

Rewrite

a business

requirement

that

would normally

use

a SELF JOIN

using

a Window Function

conceptually.

---

## Exercise 5

Describe

why

modern

Business Intelligence

tools

rely heavily

on

Window Functions.

---

# Interview Questions

## Beginner

1. Why were Window Functions introduced?

2. What limitations of traditional SQL do they solve?

3. Give three business examples where Window Functions are useful.

---

## Intermediate

1. Why is `GROUP BY` insufficient for many analytical queries?

2. How do Window Functions simplify row-to-row comparisons?

3. Why are Window Functions important for time-series analytics?

---

## Senior

1. Explain why Window Functions became essential for modern analytics and reporting.

2. Compare traditional SQL approaches with Window Function solutions for analytical problems.

3. How would you decide between `GROUP BY`, SELF JOINs, subqueries, and Window Functions for a new business requirement?

---

# Section Summary

In this section,

you learned:

- Window Functions were introduced to solve analytical problems that traditional SQL handles poorly.
- `GROUP BY` is excellent for summaries but cannot preserve individual rows while performing calculations across related rows.
- Before Window Functions, developers often relied on complex subqueries and SELF JOINs.
- Window Functions simplify ranking, running totals, moving averages, row comparisons, and time-series analysis.
- Choosing the correct SQL technique depends on the business question rather than the feature itself.

---

# Coming Up Next

## Section 37.3

# Aggregate Functions vs Window Functions

You'll learn:

- The fundamental differences.
- Row preservation vs row reduction.
- Side-by-side examples.
- When to use each approach.
- Performance considerations.
- Common interview questions.

# ==========================================================
# Section 37.3
# Aggregate Functions vs Window Functions
# ==========================================================

# Introduction

One of

the biggest

sources

of confusion

for beginners

is

understanding

the difference

between

Aggregate Functions

and

Window Functions.

Both

perform

calculations

over

multiple rows.

However,

they produce

very different

results.

Understanding

this difference

is essential

before learning

the

`OVER()`

clause.

---

# Aggregate

Functions

Aggregate Functions

combine

multiple rows

into

a smaller

result set.

Examples

include

- `SUM()`

- `AVG()`

- `COUNT()`

- `MIN()`

- `MAX()`

Their purpose

is

to summarize

data.

---

# Window

Functions

Window Functions

also perform

calculations

across

multiple rows.

However,

they preserve

every row

while

adding

the calculated

value.

No rows

are removed.

---

# Example

Table

Suppose

we have

the following

employees.

| Employee | Department | Salary |
|-----------|------------|-------:|
|Alice|IT|70000|
|Bob|IT|65000|
|Charlie|IT|80000|
|David|HR|60000|
|Emma|HR|55000|

---

# Aggregate

Example

```sql
SELECT

department,

AVG(salary)

AS average_salary

FROM employees

GROUP BY

department;
```

Result

| Department | Average Salary |
|-------------|---------------:|
|IT|71666.67|
|HR|57500|

Notice

that

five rows

became

only

two rows.

Individual

employees

are gone.

---

# Window

Example

```sql
SELECT

employee_name,

department,

salary,

AVG(salary)

OVER
(

PARTITION BY department

)

AS average_salary

FROM employees;
```

Result

| Employee | Department | Salary | Average Salary |
|-----------|------------|-------:|---------------:|
|Alice|IT|70000|71666.67|
|Bob|IT|65000|71666.67|
|Charlie|IT|80000|71666.67|
|David|HR|60000|57500|
|Emma|HR|55000|57500|

Every

employee

remains

visible.

---

# Visual

Comparison

Aggregate

Functions

```text
5 Rows

↓

GROUP BY

↓

2 Rows
```

Window

Functions

```text
5 Rows

↓

Window Calculation

↓

5 Rows
```

This

is

the most

important

difference.

---

# Aggregate

Thinking

Aggregate Functions

answer

questions

such as

```
What

Is

The Average Salary

For

Each Department?
```

The business

needs

a summary.

---

# Window

Thinking

Window Functions

answer

questions

such as

```
Display

Every Employee

And

Their Department

Average Salary.
```

The business

needs

both

detail

and

analysis.

---

# Another

Example

Business asks

```
How Many

Employees

Exist

In

Each Department?
```

Aggregate

Solution

```sql
SELECT

department,

COUNT(*)

FROM employees

GROUP BY

department;
```

Result

| Department | Employees |
|-------------|----------:|
|IT|3|
|HR|2|

---

# Window

Solution

```sql
SELECT

employee_name,

department,

COUNT(*)

OVER
(

PARTITION BY department

)

AS employees_in_department

FROM employees;
```

Result

| Employee | Department | Employees |
|-----------|------------|----------:|
|Alice|IT|3|
|Bob|IT|3|
|Charlie|IT|3|
|David|HR|2|
|Emma|HR|2|

Again,

every row

remains.

---

# Aggregate

Functions

Reduce Rows

Example

```text
Sales

↓

Monthly Total

↓

One Row
```

---

# Window

Functions

Annotate Rows

Example

```text
Sale

↓

Running Total

↓

Same Row
```

Each row

receives

additional

information.

---

# When

To Use

Aggregate

Functions

Use

Aggregate Functions

when

you need

- Totals

- Averages

- Counts

- Minimum

- Maximum

- Summary Reports

---

# When

To Use

Window

Functions

Use

Window Functions

when

you need

- Rankings

- Running Totals

- Moving Averages

- Previous Row

- Next Row

- Department Statistics

- Time-Series Analytics

- Percentiles

---

# Can

They Work

Together?

Yes.

Example

Business asks

```
Display

Department

Average Salary

And

Rank

Departments

By

Average Salary.
```

One query

may use

Aggregate Functions

to compute

department averages,

followed by

Window Functions

to rank

those results.

They are

complementary,

not

competing

features.

---

# Enterprise

Examples

Finance

Aggregate

```
Monthly Revenue
```

Window

```
Running Revenue
```

---

HR

Aggregate

```
Average Salary
```

Window

```
Salary Rank
```

---

Retail

Aggregate

```
Sales Per Product
```

Window

```
Top Product

Within

Category
```

---

Healthcare

Aggregate

```
Patient Count
```

Window

```
Patient Visit

Sequence
```

---

# Think Like

A Data Engineer

Business asks

```
Display

Every Order

Along With

The Total Sales

For

That Customer.
```

An

Aggregate Function

alone

cannot

return

every order.

A

Window Function

adds

the customer

total

to

each order,

allowing

downstream

analytics

without

losing

transaction-level

detail.

---

# Choosing

The Right

Approach

Ask

yourself

```
Do I Need

A Summary?

↓

Yes

↓

Aggregate Function
```

Otherwise

ask

```
Do I Need

To Keep

Every Row?

↓

Yes

↓

Window Function
```

This simple

decision

helps

choose

the correct

solution.

---

# Best Practices

✅ Use Aggregate Functions for summaries.

✅ Use Window Functions for row-level analytics.

✅ Do not replace `GROUP BY` unnecessarily.

✅ Keep business requirements in focus.

✅ Learn to recognize analytical queries.

---

# Common Mistakes

❌ Expecting Window Functions to reduce rows.

❌ Using `GROUP BY` when every row must remain.

❌ Assuming Window Functions replace Aggregate Functions.

❌ Confusing summaries with analytics.

❌ Choosing the more complex solution without need.

---

# PostgreSQL Practice Lab

## Exercise 1

Write

an Aggregate Function

that displays

the average

salary

per department.

---

## Exercise 2

Write

a Window Function

that displays

every employee

along with

the average

salary

of

their department.

---

## Exercise 3

Explain

why

the two

queries

return

different

numbers

of rows.

---

## Exercise 4

Identify

whether

each business

requirement

needs

an Aggregate Function

or

a Window Function.

```
Display

Every Sale

With

Its Running Total.
```

```
Display

Total Sales

Per Month.
```

---

## Exercise 5

Create

your own

business example

where

both

Aggregate Functions

and

Window Functions

are used

in

the same

solution.

---

# Interview Questions

## Beginner

1. What is the biggest difference between Aggregate Functions and Window Functions?

2. Why does `GROUP BY` reduce rows?

3. Why do Window Functions preserve rows?

---

## Intermediate

1. Give three examples where an Aggregate Function is appropriate.

2. Give three examples where a Window Function is appropriate.

3. Can Aggregate Functions and Window Functions be used together? Explain.

---

## Senior

1. Explain how you decide between `GROUP BY` and a Window Function during database design.

2. Describe a reporting solution that combines aggregation with window analytics.

3. Why are Window Functions considered essential for modern BI and Data Engineering workloads?

---

# Section Summary

In this section,

you learned:

- Aggregate Functions summarize data by reducing multiple rows into fewer rows.
- Window Functions perform calculations across related rows while preserving every row in the result set.
- The choice between aggregation and windowing depends on whether the business requires summaries or row-level analytics.
- Aggregate Functions and Window Functions complement each other and are often used together in analytical queries.
- Recognizing this distinction is fundamental before learning the `OVER()` clause.

---

# Coming Up Next

## Section 37.4

# Understanding the OVER() Clause

You'll learn:

- What the `OVER()` clause does.
- Why every Window Function requires `OVER()`.
- How PostgreSQL defines a window.
- Basic `OVER()` syntax.
- The foundation for `PARTITION BY` and `ORDER BY`.

# ==========================================================
# Section 37.4
# Understanding the OVER() Clause
# ==========================================================

# Introduction

Every

Window Function

in PostgreSQL

uses

the

```
OVER()
```

clause.

Without

`OVER()`,

a Window Function

cannot

operate.

The

`OVER()`

clause

defines

the

window

over

which

the calculation

is performed.

It tells

PostgreSQL

which rows

should participate

in

the calculation

for

the current row.

Understanding

`OVER()`

is

the foundation

for mastering

all

Window Functions.

---

# What Is

The

OVER()

Clause?

The

`OVER()`

clause

defines

the logical

window

used

by

a Window Function.

General

syntax

```sql
window_function()

OVER
(
    ...
)
```

Everything

inside

the

`OVER()`

clause

controls

how

the window

is created.

---

# Why

Is It

Required?

Consider

this query.

```sql
SELECT

AVG(salary)

FROM employees;
```

This is

an

Aggregate Function.

It produces

one result

for

the entire

table.

Now

suppose

we write

```sql
SELECT

AVG(salary)

OVER()

FROM employees;
```

The function

becomes

a

Window Function.

Instead of

returning

one row,

it returns

a value

for

every row.

---

# Example

Employee Table

| Employee | Department | Salary |
|-----------|------------|-------:|
|Alice|IT|70000|
|Bob|IT|65000|
|Charlie|IT|80000|
|David|HR|60000|
|Emma|HR|55000|

---

# Example

Without

OVER()

```sql
SELECT

AVG(salary)

FROM employees;
```

Result

| Average Salary |
|---------------:|
|66000|

Only

one row

is returned.

---

# Example

With

OVER()

```sql
SELECT

employee_name,

salary,

AVG(salary)

OVER()

AS company_average

FROM employees;
```

Result

| Employee | Salary | Company Average |
|-----------|-------:|----------------:|
|Alice|70000|66000|
|Bob|65000|66000|
|Charlie|80000|66000|
|David|60000|66000|
|Emma|55000|66000|

Notice

that

every row

remains.

The average

is repeated

because

the window

contains

the entire

table.

---

# What

Does

OVER()

Mean?

When

PostgreSQL

sees

```sql
OVER()
```

it interprets

it as

```
Use

Every Row

In

The Result Set

As

The Window.
```

Every row

participates

in

the calculation.

---

# Visualizing

The Window

Suppose

the table

contains

five rows.

```text
Alice

Bob

Charlie

David

Emma
```

For

Alice,

the window

is

```text
Alice

Bob

Charlie

David

Emma
```

For

Bob,

the window

is still

```text
Alice

Bob

Charlie

David

Emma
```

The same

window

is reused

for

every row.

---

# General

Syntax

```sql
window_function()

OVER
(
    PARTITION BY ...

    ORDER BY ...

    ROWS ...
)
```

The

`OVER()`

clause

may contain

- `PARTITION BY`

- `ORDER BY`

- Window Frames

Each

adds

more control

over

the calculation.

Later

sections

cover

each one

in detail.

---

# Empty

OVER()

An empty

`OVER()`

means

```
Entire

Result Set
```

Example

```sql
COUNT(*)

OVER()
```

returns

the total

number

of rows

for

every row.

---

# COUNT()

Example

```sql
SELECT

employee_name,

COUNT(*)

OVER()

AS total_employees

FROM employees;
```

Result

| Employee | Total Employees |
|-----------|----------------:|
|Alice|5|
|Bob|5|
|Charlie|5|
|David|5|
|Emma|5|

---

# SUM()

Example

```sql
SELECT

employee_name,

salary,

SUM(salary)

OVER()

AS total_salary

FROM employees;
```

Result

| Employee | Salary | Total Salary |
|-----------|-------:|-------------:|
|Alice|70000|330000|
|Bob|65000|330000|
|Charlie|80000|330000|
|David|60000|330000|
|Emma|55000|330000|

---

# MAX()

Example

```sql
SELECT

employee_name,

salary,

MAX(salary)

OVER()

AS highest_salary

FROM employees;
```

Result

| Employee | Highest Salary |
|-----------|---------------:|
|Alice|80000|
|Bob|80000|
|Charlie|80000|
|David|80000|
|Emma|80000|

---

# MIN()

Example

```sql
SELECT

employee_name,

salary,

MIN(salary)

OVER()

AS lowest_salary

FROM employees;
```

Result

| Employee | Lowest Salary |
|-----------|--------------:|
|Alice|55000|
|Bob|55000|
|Charlie|55000|
|David|55000|
|Emma|55000|

---

# Why

Repeat

The Same

Value?

Business

often needs

to compare

individual rows

against

overall

statistics.

Example

```text
Employee Salary

↓

Company Average

↓

Difference
```

Without

Window Functions,

additional

queries

or

joins

would be

required.

---

# Real-World

Examples

Finance

```
Transaction

↓

Company Total
```

---

Retail

```
Product

↓

Total Sales
```

---

HR

```
Employee

↓

Highest Salary
```

---

Healthcare

```
Patient

↓

Hospital Average
```

---

Education

```
Student

↓

Class Average
```

---

# Think Like

A Data Analyst

Business asks

```
Display

Every Employee

Along With

The Company's

Highest Salary.
```

Instead

of writing

multiple

queries,

use

```sql
MAX(salary)

OVER()
```

Every employee

can now

be compared

against

the company's

highest-paid

employee.

---

# OVER()

Is

Only

The Beginning

An empty

`OVER()`

treats

the entire

result set

as

one window.

Soon,

you'll learn

how

to divide

that window

into

smaller groups

using

```
PARTITION BY
```

and

how

to order

rows

inside

the window

using

```
ORDER BY.
```

These features

make

Window Functions

extremely

powerful.

---

# Best Practices

✅ Learn the purpose of `OVER()` before using advanced window features.

✅ Start with `OVER()` before adding partitions and ordering.

✅ Use meaningful column aliases.

✅ Verify whether the entire result set or smaller windows are required.

✅ Build complexity gradually.

---

# Common Mistakes

❌ Forgetting the `OVER()` clause.

❌ Expecting `OVER()` to reduce rows.

❌ Assuming an empty `OVER()` performs grouping.

❌ Confusing aggregate functions with window functions.

❌ Adding unnecessary complexity before understanding the basics.

---

# PostgreSQL Practice Lab

## Exercise 1

Use

`AVG() OVER()`

to display

every employee

along with

the company

average salary.

---

## Exercise 2

Use

`COUNT() OVER()`

to display

the total

number

of employees

for

every row.

---

## Exercise 3

Display

the company

maximum

salary

beside

every employee.

---

## Exercise 4

Display

the company

minimum

salary

beside

every employee.

---

## Exercise 5

Explain

why

every row

contains

the same

window

calculation.

---

# Interview Questions

## Beginner

1. What is the purpose of the `OVER()` clause?

2. Why is `OVER()` required for Window Functions?

3. What does an empty `OVER()` mean?

---

## Intermediate

1. How does `AVG()` differ from `AVG() OVER()`?

2. Why does `COUNT(*) OVER()` return the same value for every row?

3. When would you use an empty `OVER()` in a business report?

---

## Senior

1. Explain how PostgreSQL interprets the `OVER()` clause internally.

2. Why is `OVER()` considered the foundation of Window Functions?

3. How would you explain the purpose of `OVER()` to a developer familiar only with aggregate functions?

---

# Section Summary

In this section,

you learned:

- Every Window Function requires the `OVER()` clause.
- The `OVER()` clause defines the logical window used for the calculation.
- An empty `OVER()` treats the entire result set as a single window.
- Window Functions preserve every row while calculating values across related rows.
- `OVER()` becomes significantly more powerful when combined with `PARTITION BY`, `ORDER BY`, and window frames.

---

# Coming Up Next

## Section 37.5

# PARTITION BY

You'll learn:

- Dividing windows into logical groups.
- Independent calculations for each partition.
- Department-wise analytics.
- Customer-wise reporting.
- Real-world business examples.
- Enterprise analytical patterns.    

# ==========================================================
# Section 37.5
# PARTITION BY
# ==========================================================

# Introduction

In the previous

section,

you learned

that

an empty

```
OVER()
```

uses

the entire

result set

as

one window.

However,

businesses

rarely want

calculations

across

every row.

Instead,

they usually

need

calculations

within

logical groups.

Examples

include

- Departments

- Customers

- Products

- Regions

- Months

- Categories

The

```
PARTITION BY
```

clause

divides

the result set

into

independent

windows.

Each window

is processed

separately.

---

# What Is

PARTITION BY?

The

```
PARTITION BY
```

clause

splits

the result set

into

multiple

logical partitions.

Each partition

has

its own

window.

Window Functions

perform

calculations

independently

inside

each partition.

---

# Employee

Table

Suppose

we have

| Employee | Department | Salary |
|-----------|------------|-------:|
|Alice|IT|70000|
|Bob|IT|65000|
|Charlie|IT|80000|
|David|HR|60000|
|Emma|HR|55000|

---

# Without

PARTITION BY

```sql
SELECT

employee_name,

department,

salary,

AVG(salary)

OVER()

AS company_average

FROM employees;
```

Result

| Employee | Department | Company Average |
|-----------|------------|----------------:|
|Alice|IT|66000|
|Bob|IT|66000|
|Charlie|IT|66000|
|David|HR|66000|
|Emma|HR|66000|

The

entire table

forms

one window.

---

# With

PARTITION BY

```sql
SELECT

employee_name,

department,

salary,

AVG(salary)

OVER
(
PARTITION BY department
)

AS department_average

FROM employees;
```

Result

| Employee | Department | Salary | Department Average |
|-----------|------------|-------:|-------------------:|
|Alice|IT|70000|71666.67|
|Bob|IT|65000|71666.67|
|Charlie|IT|80000|71666.67|
|David|HR|60000|57500|
|Emma|HR|55000|57500|

Each

department

becomes

its own

window.

---

# Visualizing

Partitions

Entire Table

```text
Alice

Bob

Charlie

David

Emma
```

After

```
PARTITION BY department
```

IT

```text
Alice

Bob

Charlie
```

HR

```text
David

Emma
```

Each partition

is processed

independently.

---

# How

PostgreSQL

Works

For

Alice,

the window

contains

```text
Alice

Bob

Charlie
```

For

Bob,

the window

is still

```text
Alice

Bob

Charlie
```

For

David,

the window

changes

to

```text
David

Emma
```

The calculation

depends

on

the partition,

not

the entire

table.

---

# COUNT()

Example

```sql
SELECT

employee_name,

department,

COUNT(*)

OVER
(
PARTITION BY department
)

AS employees_in_department

FROM employees;
```

Result

| Employee | Department | Employees |
|-----------|------------|----------:|
|Alice|IT|3|
|Bob|IT|3|
|Charlie|IT|3|
|David|HR|2|
|Emma|HR|2|

Each employee

knows

how many

employees

exist

inside

their department.

---

# SUM()

Example

```sql
SELECT

employee_name,

department,

salary,

SUM(salary)

OVER
(
PARTITION BY department
)

AS department_salary

FROM employees;
```

Result

| Employee | Department | Department Salary |
|-----------|------------|------------------:|
|Alice|IT|215000|
|Bob|IT|215000|
|Charlie|IT|215000|
|David|HR|115000|
|Emma|HR|115000|

---

# MAX()

Example

```sql
SELECT

employee_name,

department,

salary,

MAX(salary)

OVER
(
PARTITION BY department
)

AS highest_salary

FROM employees;
```

Result

| Employee | Department | Highest Salary |
|-----------|------------|---------------:|
|Alice|IT|80000|
|Bob|IT|80000|
|Charlie|IT|80000|
|David|HR|60000|
|Emma|HR|60000|

---

# MIN()

Example

```sql
SELECT

employee_name,

department,

salary,

MIN(salary)

OVER
(
PARTITION BY department
)

AS lowest_salary

FROM employees;
```

---

# Multiple

Partitions

You may

partition

using

multiple columns.

Example

```sql
PARTITION BY

department,

job_title
```

Now,

each

combination

of

department

and

job title

creates

its own

window.

---

# Business

Examples

Sales

```text
PARTITION BY

sales_region
```

Each region

is analyzed

independently.

---

Banking

```text
PARTITION BY

customer_id
```

Each customer

gets

their own

running

analysis.

---

Retail

```text
PARTITION BY

product_category
```

Each category

receives

independent

statistics.

---

Healthcare

```text
PARTITION BY

patient_id
```

Each patient

has

their own

medical

timeline.

---

Education

```text
PARTITION BY

class_id
```

Each classroom

is analyzed

separately.

---

# PARTITION BY

Does Not

Group Rows

Many beginners

confuse

```
PARTITION BY
```

with

```
GROUP BY.
```

Remember

```
GROUP BY

↓

Combines Rows
```

```
PARTITION BY

↓

Keeps Rows
```

This

is

one of

the most

important

concepts

in

Window Functions.

---

# Think Like

A Business

Analyst

Business asks

```
Display

Every Employee

Along With

The Average Salary

Of

Their Department.
```

Each department

must be

analyzed

independently,

but

every employee

must remain

visible.

This is

exactly

what

```
PARTITION BY
```

was designed

to accomplish.

---

# Best Practices

✅ Partition using meaningful business groups.

✅ Keep partitions as small as practical.

✅ Choose columns with clear business meaning.

✅ Remember that rows remain visible.

✅ Test calculations for each partition.

---

# Common Mistakes

❌ Confusing `PARTITION BY` with `GROUP BY`.

❌ Forgetting that every partition has its own window.

❌ Expecting partitions to remove rows.

❌ Choosing the wrong partition column.

❌ Creating unnecessarily large partitions.

---

# PostgreSQL Practice Lab

## Exercise 1

Display

every employee

along with

the average

salary

of

their department.

---

## Exercise 2

Display

the number

of employees

in

each department

beside

every employee.

---

## Exercise 3

Display

the highest

salary

within

each department.

---

## Exercise 4

Display

the total

salary

paid

within

each department.

---

## Exercise 5

Explain

why

employees

in

different departments

receive

different

window

calculations.

---

# Interview Questions

## Beginner

1. What is the purpose of `PARTITION BY`?

2. How does `PARTITION BY` differ from `GROUP BY`?

3. What happens when `PARTITION BY` is omitted?

---

## Intermediate

1. Why does each partition have its own window?

2. Give three real-world examples where `PARTITION BY` is useful.

3. Can multiple columns be used in `PARTITION BY`?

---

## Senior

1. Explain how PostgreSQL processes partitions internally during window-function execution.

2. How would you choose the correct partition columns for a large analytical query?

3. Compare the performance implications of one large partition versus many smaller partitions.

---

# Section Summary

In this section,

you learned:

- `PARTITION BY` divides the result set into independent logical windows.
- Each partition is processed separately by the Window Function.
- Unlike `GROUP BY`, `PARTITION BY` preserves every row in the result set.
- Aggregate window functions such as `AVG()`, `SUM()`, `COUNT()`, `MIN()`, and `MAX()` can calculate values independently for each partition.
- Choosing the correct partition columns is essential for producing accurate business analytics.

---

# Coming Up Next

## Section 37.6

# ORDER BY Inside OVER()

You'll learn:

- Why ordering matters inside a window.
- The difference between `ORDER BY` inside and outside `OVER()`.
- Running calculations.
- Ranking behavior.
- Window ordering fundamentals.

# ==========================================================
# Section 37.6
# ORDER BY Inside OVER()
# ==========================================================

# Introduction

In the previous

section,

you learned

how

```
PARTITION BY
```

divides

rows

into

logical

windows.

However,

many

business

calculations

also depend

on

the order

of

rows.

Examples

include

- Running Totals

- Running Balances

- Rankings

- Time-Series Analysis

- Previous Row

- Next Row

To perform

these

calculations,

Window Functions

use

```
ORDER BY
```

inside

the

```
OVER()
```

clause.

---

# Why

Ordering

Matters

Suppose

daily sales

are

| Date | Sales |
|------|------:|
|1 Jan|100|
|2 Jan|200|
|3 Jan|150|
|4 Jan|300|

Business asks

```
Calculate

The Running

Total.
```

Without

knowing

the order

of

the dates,

PostgreSQL

cannot

calculate

the running

total.

Rows

must be

processed

in

sequence.

---

# ORDER BY

Inside

OVER()

General

syntax

```sql
window_function()

OVER
(
    ORDER BY column_name
)
```

The

```
ORDER BY
```

inside

```
OVER()
```

defines

the order

used

by

the Window Function.

---

# ORDER BY

Outside

The Query

Consider

```sql
SELECT

employee_name,

salary

FROM employees

ORDER BY salary DESC;
```

This

sorts

the

final

result set.

It does

not

change

how

Window Functions

perform

their

calculations.

---

# ORDER BY

Inside

OVER()

Example

```sql
SELECT

employee_name,

salary,

SUM(salary)

OVER
(
ORDER BY salary
)

FROM employees;
```

Here,

the

ordering

controls

the

Window Function,

not

the

display

order.

This

difference

is

extremely

important.

---

# Employee

Table

| Employee | Salary |
|-----------|-------:|
|Emma|55000|
|David|60000|
|Bob|65000|
|Alice|70000|
|Charlie|80000|

---

# Running

Salary

Total

```sql
SELECT

employee_name,

salary,

SUM(salary)

OVER
(
ORDER BY salary
)

AS running_total

FROM employees;
```

Result

| Employee | Salary | Running Total |
|-----------|-------:|--------------:|
|Emma|55000|55000|
|David|60000|115000|
|Bob|65000|180000|
|Alice|70000|250000|
|Charlie|80000|330000|

Notice

that

each row

includes

all

previous rows

in

the calculation.

---

# Visualizing

The Window

For

Emma

```text
Emma
```

Running Total

```
55000
```

---

For

David

```text
Emma

David
```

Running Total

```
115000
```

---

For

Bob

```text
Emma

David

Bob
```

Running Total

```
180000
```

The

window

grows

as

PostgreSQL

moves

through

the rows.

---

# ORDER BY

With

PARTITION BY

Business asks

```
Calculate

Running Salary

Within

Each Department.
```

```sql
SELECT

employee_name,

department,

salary,

SUM(salary)

OVER
(
PARTITION BY department

ORDER BY salary
)

AS running_department_salary

FROM employees;
```

Each department

has

its own

independent

ordered

window.

---

# Difference

Between

Two ORDER BY

Suppose

we write

```sql
SELECT

employee_name,

salary,

SUM(salary)

OVER
(
ORDER BY salary
)

FROM employees

ORDER BY employee_name;
```

The

Window Function

calculates

using

salary

order.

The

final

output

is displayed

alphabetically

by

employee name.

The

two

```
ORDER BY
```

clauses

have

different

purposes.

---

# Business

Examples

Finance

```
ORDER BY

Transaction Date
```

Produces

running balances.

---

Retail

```
ORDER BY

Sale Date
```

Produces

running revenue.

---

Healthcare

```
ORDER BY

Visit Date
```

Builds

patient

timelines.

---

Manufacturing

```
ORDER BY

Production Date
```

Shows

production

progress.

---

Education

```
ORDER BY

Exam Date
```

Analyzes

student

performance

over time.

---

# Why

Ordering

Changes

Results

Suppose

salary order

changes.

Ascending

```text
55000

60000

65000

70000

80000
```

Descending

```text
80000

70000

65000

60000

55000
```

The

running totals

become

completely

different.

The

chosen

order

directly

affects

the result.

---

# ORDER BY

Without

PARTITION BY

```text
Entire Table

↓

Ordered

↓

One Window
```

---

# ORDER BY

With

PARTITION BY

```text
IT

↓

Ordered

↓

Running Total

===================

HR

↓

Ordered

↓

Running Total
```

Each partition

is ordered

independently.

---

# Think Like

A Financial

Analyst

Business asks

```
Display

Every Transaction

And

The Account

Balance

After

That Transaction.
```

The balance

depends

entirely

on

the order

of

transactions.

Without

```
ORDER BY
```

inside

```
OVER()
```

the running

balance

cannot

be calculated

correctly.

---

# Best Practices

✅ Always define a meaningful ordering column.

✅ Use dates for time-series analytics.

✅ Combine `PARTITION BY` and `ORDER BY` when appropriate.

✅ Remember that ordering affects calculations.

✅ Keep ordering consistent with business requirements.

---

# Common Mistakes

❌ Confusing `ORDER BY` inside and outside `OVER()`.

❌ Forgetting that running calculations require ordering.

❌ Ordering by the wrong column.

❌ Assuming display order changes window calculations.

❌ Ignoring duplicate ordering values.

---

# PostgreSQL Practice Lab

## Exercise 1

Calculate

a running

salary total

ordered

by

salary.

---

## Exercise 2

Calculate

a running

salary total

within

each department.

---

## Exercise 3

Sort

the final

output

alphabetically,

while

keeping

the running

total

ordered

by

salary.

Observe

the difference.

---

## Exercise 4

Change

the window

ordering

from

ascending

to

descending.

Explain

how

the running

totals

change.

---

## Exercise 5

List

three

business scenarios

where

ordering

inside

a window

is essential.

---

# Interview Questions

## Beginner

1. Why is `ORDER BY` used inside `OVER()`?

2. How does it differ from the `ORDER BY` at the end of a query?

3. Why are running totals impossible without ordering?

---

## Intermediate

1. How does combining `PARTITION BY` and `ORDER BY` affect a Window Function?

2. Why does changing the ordering column change the results?

3. Give three business examples where ordered windows are required.

---

## Senior

1. Explain how PostgreSQL processes ordered windows internally.

2. How would you optimize large ordered window queries?

3. Describe the difference between logical ordering for window calculations and presentation ordering of the final result set.

---

# Section Summary

In this section,

you learned:

- `ORDER BY` inside `OVER()` defines the order in which the Window Function processes rows.
- It is different from the `ORDER BY` used to sort the final query output.
- Ordered windows enable running totals, running balances, rankings, and time-series analytics.
- `PARTITION BY` and `ORDER BY` are often combined to perform ordered calculations within logical groups.
- Choosing the correct ordering column is essential because it directly affects the calculation results.

---

# Coming Up Next

## Section 37.7

# Window Frames

You'll learn:

- What a window frame is.
- The difference between a partition and a frame.
- Default window frames.
- Frame boundaries.
- How frames affect window calculations.
- Real-world business examples.


# ==========================================================
# Section 37.7
# Window Frames
# ==========================================================

# Introduction

In the previous

section,

you learned

that

```
ORDER BY
```

inside

```
OVER()
```

defines

the order

of rows

for

a Window Function.

However,

ordering

alone

does not

tell PostgreSQL

which rows

should

participate

in

each calculation.

That

is the job

of

the

```
Window Frame.
```

A

Window Frame

defines

the subset

of rows

inside

the window

that

are used

for

the current

calculation.

Understanding

Window Frames

is essential

for

running totals,

moving averages,

rolling calculations,

and

advanced analytics.

---

# What Is

A Window

Frame?

A

Window Frame

is

a smaller

portion

of

the current

window.

Think

of it

like this.

```text
Entire Table

↓

Partition

↓

Window Frame
```

Every

Window Function

operates

on

its

current

frame,

not always

the entire

partition.

---

# Partition

vs

Window Frame

Suppose

we have

employees

in

the IT

department.

```text
Alice

Bob

Charlie

David

Emma
```

The

partition

contains

all

five

employees.

A

window frame

may contain

only

```text
Alice

Bob

Charlie
```

depending

on

the current

row

and

frame definition.

---

# Why

Do We Need

Frames?

Suppose

Business asks

```
Calculate

The Running

Total

Of Sales.
```

For

the first

sale,

the calculation

uses

only

one row.

For

the second

sale,

it uses

two rows.

For

the third,

three rows.

The

frame

changes

for

every row.

---

# Sales

Example

| Date | Sales |
|------|------:|
|1 Jan|100|
|2 Jan|200|
|3 Jan|150|
|4 Jan|300|

Business asks

```
Display

The Running

Total.
```

Each row

uses

a different

frame.

---

# Frame

Visualization

For

1 Jan

Frame

```text
100
```

Running Total

```
100
```

---

For

2 Jan

Frame

```text
100

200
```

Running Total

```
300
```

---

For

3 Jan

Frame

```text
100

200

150
```

Running Total

```
450
```

---

For

4 Jan

Frame

```text
100

200

150

300
```

Running Total

```
750
```

The frame

grows

with

each row.

---

# General

Syntax

```sql
window_function()

OVER
(
    PARTITION BY ...

    ORDER BY ...

    ROWS

    BETWEEN ...

    AND ...
)
```

The

frame

is defined

after

the

```
ORDER BY
```

clause.

---

# Default

Behavior

When

you specify

```
ORDER BY
```

but

do not

explicitly

define

a frame,

PostgreSQL

automatically

uses

a default

frame.

Conceptually,

it behaves

like

```text
Start

↓

First Row

↓

Current Row
```

This is

why

running totals

work

without

writing

a frame

explicitly.

Later,

you'll learn

the exact

default rules.

---

# Window

Frame

Without

ORDER BY

Suppose

we write

```sql
AVG(salary)

OVER()
```

No ordering

exists.

Therefore,

every row

uses

the entire

window.

Every employee

receives

the same

average.

---

# Window

Frame

With

ORDER BY

Suppose

we write

```sql
SUM(salary)

OVER
(
ORDER BY salary
)
```

Now,

the frame

changes

for

every row,

producing

a running

total.

---

# Business

Examples

Finance

```text
Running

Account

Balance
```

Each balance

uses

all

transactions

up to

the current

transaction.

---

Retail

```text
Running

Sales
```

Each day

includes

previous

sales.

---

Healthcare

```text
Patient

Timeline
```

Each visit

includes

earlier

medical history.

---

Education

```text
Student

Performance
```

Each exam

can include

previous

exam scores.

---

Manufacturing

```text
Production

Output
```

Each day

includes

previous

production.

---

# Frame

Moves

With

The Current

Row

Imagine

the current

row

moving

down

the table.

```text
↓

100

↓

200

↓

150

↓

300
```

As

the current

row

changes,

the

frame

also

changes.

This

dynamic

behavior

makes

Window Functions

extremely

powerful.

---

# Why

Frames

Matter

Without

Window Frames,

PostgreSQL

would

always

calculate

using

the entire

partition.

Frames

allow

calculations

to focus

on

only

the relevant

rows.

Examples

include

- Running Totals

- Moving Averages

- Rolling Windows

- Previous N Rows

- Next N Rows

---

# Think Like

A Financial

Analyst

Business asks

```
Display

The Running

Revenue

For

This Year.
```

Each month

should include

only

revenue

from

January

through

the current

month.

Future months

must

not

be included.

A

Window Frame

defines

exactly

which months

participate

in

each calculation.

---

# Window

Frames

Are Dynamic

Unlike

ordinary

filters,

Window Frames

change

automatically

for

every row.

This

dynamic

behavior

is

one of

the biggest

advantages

of

Window Functions.

---

# Best Practices

✅ Understand the difference between partitions and frames.

✅ Always think about which rows should participate in each calculation.

✅ Use frames for running and rolling analytics.

✅ Verify whether the default frame matches the business requirement.

✅ Learn frame boundaries before writing advanced window queries.

---

# Common Mistakes

❌ Confusing partitions with frames.

❌ Assuming the entire partition is always used.

❌ Ignoring how frames change for each row.

❌ Using running calculations without understanding the underlying frame.

❌ Forgetting that `ORDER BY` affects frame behavior.

---

# PostgreSQL Practice Lab

## Exercise 1

Explain

the difference

between

a partition

and

a window frame.

---

## Exercise 2

Describe

the frame

used

for

each row

in

a running

total.

---

## Exercise 3

Predict

how

the frame

changes

as

PostgreSQL

moves

through

an ordered

result set.

---

## Exercise 4

Give

three

business examples

where

Window Frames

are required.

---

## Exercise 5

Explain

why

moving averages

cannot

be calculated

correctly

without

Window Frames.

---

# Interview Questions

## Beginner

1. What is a Window Frame?

2. How is a Window Frame different from a partition?

3. Why do running totals require Window Frames?

---

## Intermediate

1. Why does the Window Frame change for each row?

2. What happens when `ORDER BY` is omitted?

3. Give three examples where frame boundaries affect the result.

---

## Senior

1. Explain how PostgreSQL evaluates Window Frames internally.

2. Why are Window Frames fundamental for advanced analytical queries?

3. How would you explain the relationship between partitions, ordering, and frames to a new SQL developer?

---

# Section Summary

In this section,

you learned:

- A Window Frame is the subset of rows within a window that participates in the current calculation.
- A partition defines the available rows, while the frame defines which of those rows are used for the current result.
- Window Frames change dynamically as PostgreSQL processes each row.
- Running totals, moving averages, and rolling calculations rely on Window Frames.
- Understanding frames is essential before learning frame types such as `ROWS`, `RANGE`, and `GROUPS`.

---

# Coming Up Next

## Section 37.8

# ROWS vs RANGE vs GROUPS

You'll learn:

- The three types of Window Frames.
- Physical rows versus logical values.
- Peer groups.
- Practical examples.
- Performance considerations.
- Choosing the correct frame type.


# ==========================================================
# Section 37.8
# ROWS vs RANGE vs GROUPS
# ==========================================================

# Introduction

In the previous

section,

you learned

that

Window Frames

define

which rows

participate

in

a Window Function.

However,

there is

another

important question.

```
How

Should

PostgreSQL

Choose

Those Rows?
```

PostgreSQL

provides

three

different

frame types.

```
ROWS

RANGE

GROUPS
```

Although

they may

appear

similar,

they behave

very differently,

especially

when

duplicate

ordering values

exist.

Choosing

the correct

frame type

is essential

for

accurate

business analytics.

---

# The Three

Frame Types

PostgreSQL

supports

three

frame units.

```
ROWS

↓

Physical Rows

====================

RANGE

↓

Ordering Values

====================

GROUPS

↓

Peer Groups
```

Each

defines

the frame

differently.

---

# ROWS

Definition

```
ROWS
```

uses

the physical

position

of rows.

It counts

actual

rows,

regardless

of

whether

multiple rows

have

the same

ordering value.

Think

of

```
ROWS
```

as

```
Count

Rows
```

---

# RANGE

Definition

```
RANGE
```

uses

the

ordering

values,

not

physical

row positions.

Rows

having

the same

ordering value

are treated

together.

Think

of

```
RANGE
```

as

```
Compare

Values
```

---

# GROUPS

Definition

```
GROUPS
```

operates

on

peer groups.

A

peer group

contains

all rows

sharing

the same

ordering value.

Instead

of counting

rows,

it counts

groups

of equal

values.

Think

of

```
GROUPS
```

as

```
Count

Peer Groups
```

---

# Sample Data

| Employee | Salary |
|-----------|-------:|
|Alice|50000|
|Bob|60000|
|Charlie|60000|
|David|70000|
|Emma|80000|

Notice

that

Bob

and

Charlie

have

the same

salary.

These rows

form

one

peer group.

---

# ROWS

Example

```sql
SUM(salary)

OVER
(
ORDER BY salary

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)
```

Running

Totals

| Salary | Running Total |
|--------:|--------------:|
|50000|50000|
|60000|110000|
|60000|170000|
|70000|240000|
|80000|320000|

Each row

is processed

individually.

Bob

and

Charlie

are treated

as

separate

rows.

---

# RANGE

Example

```sql
SUM(salary)

OVER
(
ORDER BY salary

RANGE

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)
```

Result

| Salary | Running Total |
|--------:|--------------:|
|50000|50000|
|60000|170000|
|60000|170000|
|70000|240000|
|80000|320000|

Notice

Bob

and

Charlie

receive

the same

running total.

Why?

Because

they share

the same

ordering value.

---

# GROUPS

Example

```sql
SUM(salary)

OVER
(
ORDER BY salary

GROUPS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)
```

Result

| Salary | Running Total |
|--------:|--------------:|
|50000|50000|
|60000|170000|
|60000|170000|
|70000|240000|
|80000|320000|

The calculation

moves

one

peer group

at

a time,

rather

than

one

physical row.

---

# Visualizing

ROWS

```text
50000

↓

60000

↓

60000

↓

70000

↓

80000
```

Every row

is counted.

---

# Visualizing

RANGE

```text
50000

↓

60000

60000

↓

70000

↓

80000
```

Rows

sharing

the same

value

are processed

together.

---

# Visualizing

GROUPS

```text
Group 1

50000

↓

Group 2

60000

60000

↓

Group 3

70000

↓

Group 4

80000
```

Entire

peer groups

become

the unit

of calculation.

---

# Business

Example

Finance

Suppose

multiple

transactions

occur

at

the same

timestamp.

```
ROWS
```

treats

each transaction

separately.

```
RANGE
```

treats

transactions

sharing

the same

timestamp

as

one

logical point

in time.

---

# Retail

Example

Suppose

multiple

products

have

the same

price.

```
ROWS
```

counts

each product.

```
RANGE
```

treats

all products

having

the same

price

together.

---

# Education

Example

Suppose

students

score

the same

marks.

```
ROWS
```

treats

each student

individually.

```
GROUPS
```

treats

students

with identical

scores

as

one

peer group.

---

# Which

Frame Type

Should

You Choose?

Use

```
ROWS
```

when

physical

row position

matters.

Examples

- Running totals

- Sequential events

- Financial transactions

---

Use

```
RANGE
```

when

ordering

values

matter.

Examples

- Price analysis

- Date ranges

- Time-series

analytics

---

Use

```
GROUPS
```

when

equal

ordering values

should

behave

as

one

logical group.

Examples

- Rankings

- Grades

- Performance bands

---

# Performance

Considerations

```
ROWS
```

is generally

the simplest

frame type

because

it processes

physical rows.

```
RANGE
```

and

```
GROUPS
```

may require

additional

processing

to identify

peer rows,

especially

when

many duplicates

exist.

Always

measure

performance

using

```
EXPLAIN ANALYZE.
```

---

# Think Like

A Data

Engineer

Business asks

```
Calculate

Running Revenue

By

Transaction.
```

Every

transaction

must

be counted,

even

when

two transactions

share

the same

amount.

Choose

```
ROWS.
```

Now,

Business asks

```
Calculate

Revenue

By

Price Level.
```

Rows

having

the same

price

should

be treated

together.

Choose

```
RANGE.
```

Selecting

the correct

frame type

ensures

the business

receives

the correct

analysis.

---

# Best Practices

✅ Use `ROWS` for sequential row-by-row calculations.

✅ Use `RANGE` when equal ordering values should be processed together.

✅ Use `GROUPS` for peer-group analytics.

✅ Understand how duplicate ordering values affect results.

✅ Test calculations using realistic datasets.

---

# Common Mistakes

❌ Assuming `ROWS`, `RANGE`, and `GROUPS` always produce identical results.

❌ Ignoring duplicate ordering values.

❌ Choosing `ROWS` when value-based grouping is required.

❌ Using `RANGE` without understanding peer rows.

❌ Forgetting to validate results against business requirements.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a table

containing

duplicate

salary values.

Compare

`ROWS`

and

`RANGE`

results.

---

## Exercise 2

Modify

the query

to use

`GROUPS`.

Explain

how

the output

changes.

---

## Exercise 3

Create

a running

sales report

using

`ROWS`.

---

## Exercise 4

Analyze

product prices

using

`RANGE`.

---

## Exercise 5

Explain

which frame type

would be

appropriate

for

student grades,

bank transactions,

and

inventory prices.

---

# Interview Questions

## Beginner

1. What are the three window frame types supported by PostgreSQL?

2. How does `ROWS` differ from `RANGE`?

3. What is a peer group?

---

## Intermediate

1. Why can `ROWS` and `RANGE` produce different results?

2. When should `GROUPS` be preferred?

3. Give three business examples where `RANGE` is the correct choice.

---

## Senior

1. Explain how PostgreSQL evaluates `ROWS`, `RANGE`, and `GROUPS` internally.

2. How do duplicate ordering values influence each frame type?

3. How would you choose the appropriate frame type for a large-scale financial analytics system?

---

# Section Summary

In this section,

you learned:

- PostgreSQL supports three window frame types: `ROWS`, `RANGE`, and `GROUPS`.
- `ROWS` operates on physical row positions, while `RANGE` operates on ordering values, and `GROUPS` operates on peer groups.
- Duplicate ordering values are the primary reason these frame types can produce different results.
- Choosing the correct frame type depends on the business problem and the meaning of the ordering column.
- Understanding these frame types is essential for writing accurate analytical queries.

---

# Coming Up Next

## Section 37.9

# Default Window Frames

You'll learn:

- PostgreSQL's default frame behavior.
- How default frames change with `ORDER BY`.
- Why running totals work without explicitly specifying a frame.
- Common misconceptions.
- Enterprise best practices.


# ==========================================================
# Section 37.8
# ROWS vs RANGE vs GROUPS
# ==========================================================

# Introduction

In the previous

section,

you learned

that

Window Frames

define

which rows

participate

in

a Window Function.

However,

there is

another

important question.

```
How

Should

PostgreSQL

Choose

Those Rows?
```

PostgreSQL

provides

three

different

frame types.

```
ROWS

RANGE

GROUPS
```

Although

they may

appear

similar,

they behave

very differently,

especially

when

duplicate

ordering values

exist.

Choosing

the correct

frame type

is essential

for

accurate

business analytics.

---

# The Three

Frame Types

PostgreSQL

supports

three

frame units.

```
ROWS

↓

Physical Rows

====================

RANGE

↓

Ordering Values

====================

GROUPS

↓

Peer Groups
```

Each

defines

the frame

differently.

---

# ROWS

Definition

```
ROWS
```

uses

the physical

position

of rows.

It counts

actual

rows,

regardless

of

whether

multiple rows

have

the same

ordering value.

Think

of

```
ROWS
```

as

```
Count

Rows
```

---

# RANGE

Definition

```
RANGE
```

uses

the

ordering

values,

not

physical

row positions.

Rows

having

the same

ordering value

are treated

together.

Think

of

```
RANGE
```

as

```
Compare

Values
```

---

# GROUPS

Definition

```
GROUPS
```

operates

on

peer groups.

A

peer group

contains

all rows

sharing

the same

ordering value.

Instead

of counting

rows,

it counts

groups

of equal

values.

Think

of

```
GROUPS
```

as

```
Count

Peer Groups
```

---

# Sample Data

| Employee | Salary |
|-----------|-------:|
|Alice|50000|
|Bob|60000|
|Charlie|60000|
|David|70000|
|Emma|80000|

Notice

that

Bob

and

Charlie

have

the same

salary.

These rows

form

one

peer group.

---

# ROWS

Example

```sql
SUM(salary)

OVER
(
ORDER BY salary

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)
```

Running

Totals

| Salary | Running Total |
|--------:|--------------:|
|50000|50000|
|60000|110000|
|60000|170000|
|70000|240000|
|80000|320000|

Each row

is processed

individually.

Bob

and

Charlie

are treated

as

separate

rows.

---

# RANGE

Example

```sql
SUM(salary)

OVER
(
ORDER BY salary

RANGE

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)
```

Result

| Salary | Running Total |
|--------:|--------------:|
|50000|50000|
|60000|170000|
|60000|170000|
|70000|240000|
|80000|320000|

Notice

Bob

and

Charlie

receive

the same

running total.

Why?

Because

they share

the same

ordering value.

---

# GROUPS

Example

```sql
SUM(salary)

OVER
(
ORDER BY salary

GROUPS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)
```

Result

| Salary | Running Total |
|--------:|--------------:|
|50000|50000|
|60000|170000|
|60000|170000|
|70000|240000|
|80000|320000|

The calculation

moves

one

peer group

at

a time,

rather

than

one

physical row.

---

# Visualizing

ROWS

```text
50000

↓

60000

↓

60000

↓

70000

↓

80000
```

Every row

is counted.

---

# Visualizing

RANGE

```text
50000

↓

60000

60000

↓

70000

↓

80000
```

Rows

sharing

the same

value

are processed

together.

---

# Visualizing

GROUPS

```text
Group 1

50000

↓

Group 2

60000

60000

↓

Group 3

70000

↓

Group 4

80000
```

Entire

peer groups

become

the unit

of calculation.

---

# Business

Example

Finance

Suppose

multiple

transactions

occur

at

the same

timestamp.

```
ROWS
```

treats

each transaction

separately.

```
RANGE
```

treats

transactions

sharing

the same

timestamp

as

one

logical point

in time.

---

# Retail

Example

Suppose

multiple

products

have

the same

price.

```
ROWS
```

counts

each product.

```
RANGE
```

treats

all products

having

the same

price

together.

---

# Education

Example

Suppose

students

score

the same

marks.

```
ROWS
```

treats

each student

individually.

```
GROUPS
```

treats

students

with identical

scores

as

one

peer group.

---

# Which

Frame Type

Should

You Choose?

Use

```
ROWS
```

when

physical

row position

matters.

Examples

- Running totals

- Sequential events

- Financial transactions

---

Use

```
RANGE
```

when

ordering

values

matter.

Examples

- Price analysis

- Date ranges

- Time-series

analytics

---

Use

```
GROUPS
```

when

equal

ordering values

should

behave

as

one

logical group.

Examples

- Rankings

- Grades

- Performance bands

---

# Performance

Considerations

```
ROWS
```

is generally

the simplest

frame type

because

it processes

physical rows.

```
RANGE
```

and

```
GROUPS
```

may require

additional

processing

to identify

peer rows,

especially

when

many duplicates

exist.

Always

measure

performance

using

```
EXPLAIN ANALYZE.
```

---

# Think Like

A Data

Engineer

Business asks

```
Calculate

Running Revenue

By

Transaction.
```

Every

transaction

must

be counted,

even

when

two transactions

share

the same

amount.

Choose

```
ROWS.
```

Now,

Business asks

```
Calculate

Revenue

By

Price Level.
```

Rows

having

the same

price

should

be treated

together.

Choose

```
RANGE.
```

Selecting

the correct

frame type

ensures

the business

receives

the correct

analysis.

---

# Best Practices

✅ Use `ROWS` for sequential row-by-row calculations.

✅ Use `RANGE` when equal ordering values should be processed together.

✅ Use `GROUPS` for peer-group analytics.

✅ Understand how duplicate ordering values affect results.

✅ Test calculations using realistic datasets.

---

# Common Mistakes

❌ Assuming `ROWS`, `RANGE`, and `GROUPS` always produce identical results.

❌ Ignoring duplicate ordering values.

❌ Choosing `ROWS` when value-based grouping is required.

❌ Using `RANGE` without understanding peer rows.

❌ Forgetting to validate results against business requirements.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a table

containing

duplicate

salary values.

Compare

`ROWS`

and

`RANGE`

results.

---

## Exercise 2

Modify

the query

to use

`GROUPS`.

Explain

how

the output

changes.

---

## Exercise 3

Create

a running

sales report

using

`ROWS`.

---

## Exercise 4

Analyze

product prices

using

`RANGE`.

---

## Exercise 5

Explain

which frame type

would be

appropriate

for

student grades,

bank transactions,

and

inventory prices.

---

# Interview Questions

## Beginner

1. What are the three window frame types supported by PostgreSQL?

2. How does `ROWS` differ from `RANGE`?

3. What is a peer group?

---

## Intermediate

1. Why can `ROWS` and `RANGE` produce different results?

2. When should `GROUPS` be preferred?

3. Give three business examples where `RANGE` is the correct choice.

---

## Senior

1. Explain how PostgreSQL evaluates `ROWS`, `RANGE`, and `GROUPS` internally.

2. How do duplicate ordering values influence each frame type?

3. How would you choose the appropriate frame type for a large-scale financial analytics system?

---

# Section Summary

In this section,

you learned:

- PostgreSQL supports three window frame types: `ROWS`, `RANGE`, and `GROUPS`.
- `ROWS` operates on physical row positions, while `RANGE` operates on ordering values, and `GROUPS` operates on peer groups.
- Duplicate ordering values are the primary reason these frame types can produce different results.
- Choosing the correct frame type depends on the business problem and the meaning of the ordering column.
- Understanding these frame types is essential for writing accurate analytical queries.

---

# Coming Up Next

## Section 37.9

# Default Window Frames

You'll learn:

- PostgreSQL's default frame behavior.
- How default frames change with `ORDER BY`.
- Why running totals work without explicitly specifying a frame.
- Common misconceptions.
- Enterprise best practices.

# ==========================================================
# Section 37.9
# Default Window Frames
# ==========================================================

# Introduction

In the previous

section,

you learned

about

the three

Window Frame

types.

```
ROWS

RANGE

GROUPS
```

Fortunately,

you do not

always need

to specify

a frame

explicitly.

PostgreSQL

automatically

chooses

a default

window frame

when

one is

not provided.

Understanding

these defaults

is important

because

they directly

affect

the results

of

Window Functions.

Many

unexpected

results

occur

because

developers

do not

realize

which frame

PostgreSQL

is using.

---

# Why

Default Frames

Exist

Imagine

having

to write

this

every time.

```sql
ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
```

For

common

calculations,

that would

be repetitive.

Instead,

PostgreSQL

automatically

uses

a suitable

default frame

depending

on

whether

an

```
ORDER BY
```

exists.

---

# Case 1

No

ORDER BY

Suppose

we write

```sql
SELECT

employee_name,

AVG(salary)

OVER()

FROM employees;
```

There is

no

```
ORDER BY.
```

Therefore,

the frame

includes

the entire

partition.

Conceptually

```text
First Row

↓

Last Row
```

Every row

uses

the same

window.

---

# Example

Employee Table

| Employee | Salary |
|-----------|-------:|
|Alice|70000|
|Bob|65000|
|Charlie|80000|
|David|60000|
|Emma|55000|

Query

```sql
SELECT

employee_name,

AVG(salary)

OVER()

AS company_average

FROM employees;
```

Result

| Employee | Company Average |
|-----------|----------------:|
|Alice|66000|
|Bob|66000|
|Charlie|66000|
|David|66000|
|Emma|66000|

The frame

contains

every row.

---

# Case 2

ORDER BY

Exists

Suppose

we write

```sql
SELECT

employee_name,

salary,

SUM(salary)

OVER
(
ORDER BY salary
)

FROM employees;
```

Now,

PostgreSQL

changes

the default

frame.

Instead

of using

the entire

partition,

it uses

a frame

starting

at

the first row

and ending

at

the current row.

Conceptually

```text
First Row

↓

Current Row
```

This creates

a

running total.

---

# Running

Total

Example

| Employee | Salary | Running Total |
|-----------|-------:|--------------:|
|Emma|55000|55000|
|David|60000|115000|
|Bob|65000|180000|
|Alice|70000|250000|
|Charlie|80000|330000|

Notice

that

each row

includes

only

the rows

up to

the current

row.

---

# Conceptual

Default Frame

Without

```
ORDER BY
```

```text
Entire Partition
```

With

```
ORDER BY
```

```text
Beginning

↓

Current Row
```

This

explains

why

running totals

work

without

explicitly

writing

a frame.

---

# Important

Behavior

Suppose

duplicate

ordering values

exist.

Example

| Employee | Salary |
|-----------|-------:|
|Alice|60000|
|Bob|60000|
|Charlie|70000|

When

using

the default

frame,

PostgreSQL

uses

a

```
RANGE
```

frame

by default,

which means

rows

sharing

the same

ordering value

are treated

as

peer rows.

This behavior

can surprise

beginners.

Later,

you'll learn

how

to override

this

using

```
ROWS.
```

---

# Explicit

Vs

Default

These

queries

often

produce

the same

result.

Default

```sql
SUM(salary)

OVER
(
ORDER BY salary
)
```

Explicit

```sql
SUM(salary)

OVER
(
ORDER BY salary

RANGE

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)
```

The second

query

simply

states

the default

behavior

explicitly.

---

# Why

Understanding

Defaults

Matters

Business asks

```
Calculate

Running Revenue.
```

The query

works.

Later,

duplicate

transaction

amounts

appear.

Suddenly,

the results

change.

The SQL

did not

change.

The

default

frame

behavior

became

important.

Understanding

defaults

helps

prevent

unexpected

business

reports.

---

# Business

Examples

Finance

```text
Running

Balance
```

Uses

the default

ordered

frame.

---

Retail

```text
Running

Revenue
```

Usually

uses

the default

frame.

---

Healthcare

```text
Patient

Timeline
```

Often

depends

on

ordered

frames.

---

Education

```text
Exam

Progress
```

Uses

ordered

calculations.

---

Manufacturing

```text
Production

Progress
```

Uses

cumulative

totals.

---

# Should

You Always

Use

Defaults?

Not always.

Defaults

are convenient,

but

explicit

frame definitions

make

queries

easier

to understand,

especially

for

complex

analytics.

Many

teams

prefer

explicit

frames

in

production

code.

---

# Think Like

A Senior

Data Engineer

Business reports

```
Yesterday

Our Running

Revenue

Changed

Unexpectedly.
```

You review

the SQL.

Nothing

has changed.

Then

you discover

duplicate

ordering values

introduced

during

a data import.

Because

the query

used

the default

```
RANGE
```

frame,

peer rows

changed

the calculation.

The issue

was not

the SQL.

It was

understanding

the default

frame.

---

# Best Practices

✅ Learn PostgreSQL's default frame behavior.

✅ Understand how `ORDER BY` changes the default frame.

✅ Use explicit frames for complex business logic.

✅ Test queries using duplicate ordering values.

✅ Verify results against business expectations.

---

# Common Mistakes

❌ Assuming PostgreSQL always uses the entire partition.

❌ Forgetting that `ORDER BY` changes the default frame.

❌ Ignoring duplicate ordering values.

❌ Assuming defaults are identical to `ROWS`.

❌ Writing production queries without understanding frame behavior.

---

# PostgreSQL Practice Lab

## Exercise 1

Run

`AVG() OVER()`

without

an

`ORDER BY`.

Explain

why

every row

receives

the same

value.

---

## Exercise 2

Run

`SUM() OVER(ORDER BY salary)`.

Explain

why

a running

total

is produced.

---

## Exercise 3

Insert

duplicate

salary values.

Observe

how

the default

frame

behaves.

---

## Exercise 4

Rewrite

the query

using

an explicit

frame.

Compare

the results.

---

## Exercise 5

Explain

why

understanding

default frames

is important

for

production

analytics.

---

# Interview Questions

## Beginner

1. What happens when `OVER()` does not contain an `ORDER BY`?

2. How does adding `ORDER BY` change the default frame?

3. Why do running totals work without specifying a frame explicitly?

---

## Intermediate

1. Why can duplicate ordering values affect the default frame?

2. When should explicit frame definitions be preferred?

3. Compare PostgreSQL's default frame with an explicitly defined frame.

---

## Senior

1. Explain PostgreSQL's default window-frame behavior in detail.

2. Describe a production issue caused by misunderstanding default frames.

3. How would you establish coding standards for window-frame definitions in a large analytics team?

---

# Section Summary

In this section,

you learned:

- PostgreSQL automatically selects a default window frame when one is not explicitly specified.
- Without `ORDER BY`, the default frame includes the entire partition.
- With `ORDER BY`, PostgreSQL uses a default frame from the beginning of the partition through the current row, using `RANGE` semantics.
- Understanding default frame behavior is essential for interpreting running totals and cumulative calculations correctly.
- Explicit frame definitions often improve readability and reduce ambiguity in production SQL.

---

# Coming Up Next

## Section 37.10

# Named Windows (WINDOW Clause)

You'll learn:

- What named windows are.
- Reusing window definitions.
- Improving query readability.
- Reducing duplication.
- Enterprise coding standards.
- Performance considerations.


# ==========================================================
# Section 37.10
# Named Windows (WINDOW Clause)
# ==========================================================

# Introduction

As

Window Function

queries

become

larger,

you may

find yourself

repeating

the same

window definition

multiple times.

For example,

multiple

Window Functions

may all

use

the same

```
PARTITION BY

department

ORDER BY

salary
```

Repeating

the same

definition

makes

queries

longer,

harder

to read,

and

more difficult

to maintain.

PostgreSQL

solves

this problem

using

the

```
WINDOW
```

clause.

Named Windows

allow

you

to define

a window

once

and

reuse it

throughout

the query.

---

# What Is

A Named

Window?

A

Named Window

is

a reusable

window definition

that

can be

referenced

by

multiple

Window Functions.

Instead of

writing

the same

window

repeatedly,

you define

it once

using

the

```
WINDOW
```

clause.

---

# Without

Named Windows

Suppose

Business asks

```
Display

Department

Average Salary,

Maximum Salary,

And

Employee Count.
```

A query

might look

like

```sql
SELECT

employee_name,

department,

AVG(salary)

OVER
(
PARTITION BY department
),

MAX(salary)

OVER
(
PARTITION BY department
),

COUNT(*)

OVER
(
PARTITION BY department
)

FROM employees;
```

Notice

that

the same

window definition

is written

three times.

---

# With

Named Windows

The query

becomes

simpler.

```sql
SELECT

employee_name,

department,

AVG(salary)

OVER dept_window,

MAX(salary)

OVER dept_window,

COUNT(*)

OVER dept_window

FROM employees

WINDOW

dept_window AS
(
PARTITION BY department
);
```

The

window

is defined

once

and

reused

three times.

---

# General

Syntax

```sql
SELECT

...

window_function()

OVER window_name

FROM table_name

WINDOW

window_name AS
(
PARTITION BY ...

ORDER BY ...
);
```

The

```
WINDOW
```

clause

appears

after

the

```
FROM
```

clause

and

before

the final

```
ORDER BY
```

of

the query.

---

# Employee

Example

Table

| Employee | Department | Salary |
|-----------|------------|-------:|
|Alice|IT|70000|
|Bob|IT|65000|
|Charlie|IT|80000|
|David|HR|60000|
|Emma|HR|55000|

---

# Reusing

One Window

```sql
SELECT

employee_name,

department,

salary,

AVG(salary)

OVER dept_window

AS average_salary,

MAX(salary)

OVER dept_window

AS highest_salary,

MIN(salary)

OVER dept_window

AS lowest_salary

FROM employees

WINDOW

dept_window AS
(
PARTITION BY department
);
```

The

same

department

window

is reused

for

three

different

calculations.

---

# Multiple

Named Windows

A query

may define

multiple

windows.

Example

```sql
WINDOW

department_window AS
(
PARTITION BY department
),

company_window AS
(
)
```

Now,

one

Window Function

can calculate

department

statistics,

while another

calculates

company-wide

statistics.

---

# Example

```sql
SELECT

employee_name,

department,

salary,

AVG(salary)

OVER department_window

AS department_average,

AVG(salary)

OVER company_window

AS company_average

FROM employees

WINDOW

department_window AS
(
PARTITION BY department
),

company_window AS
(
);
```

---

# Why

Use

Named Windows?

Benefits

include

- Less repetition

- Easier maintenance

- Better readability

- Cleaner SQL

- Reduced risk

of typing errors

Large

analytical

queries

often contain

many

Window Functions.

Named Windows

make

those queries

much easier

to understand.

---

# Business

Examples

HR

```
Department

Statistics
```

One

department window

can be

reused

for

salary,

ranking,

and

employee count.

---

Retail

```
Category

Analysis
```

Reuse

the same

category

window

for

sales,

average,

and

ranking.

---

Finance

```
Account

Transactions
```

Reuse

an account

window

for

running balance,

maximum,

and

average

transaction amount.

---

Healthcare

```
Patient

History
```

Reuse

a patient

window

for

visit count,

average stay,

and

timeline

analysis.

---

Education

```
Classroom

Analytics
```

Reuse

a classroom

window

for

average marks,

highest score,

and

student ranking.

---

# Think Like

A Software

Engineer

Imagine

a report

containing

twelve

Window Functions.

Without

Named Windows,

the same

```
PARTITION BY

department

ORDER BY salary
```

appears

twelve times.

If

the business

later changes

the partition

logic,

every occurrence

must

be updated.

With

Named Windows,

only

one definition

changes.

Maintenance

becomes

much easier.

---

# Performance

Considerations

Named Windows

primarily

improve

readability

and

maintainability.

They

do not

automatically

make

queries

faster.

Their

main advantage

is

reducing

duplicate

window definitions,

making

complex

queries

easier

to understand

and

maintain.

Always

measure

performance

using

```
EXPLAIN ANALYZE
```

rather than

assuming

syntax

alone

improves

execution speed.

---

# Best Practices

✅ Give windows meaningful names.

✅ Reuse window definitions whenever possible.

✅ Keep window names descriptive.

✅ Group related Window Functions together.

✅ Use Named Windows in large analytical queries.

---

# Common Mistakes

❌ Creating meaningless window names.

❌ Defining a window that is used only once.

❌ Repeating identical window definitions instead of reusing them.

❌ Assuming Named Windows improve performance automatically.

❌ Forgetting where the `WINDOW` clause belongs in the query.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a Named Window

for

department

statistics.

Use it

with

`AVG()`

and

`COUNT()`.

---

## Exercise 2

Create

two

Named Windows.

One

for

department

analytics,

and one

for

company-wide

analytics.

---

## Exercise 3

Rewrite

a query

containing

three

identical

window definitions

using

a

Named Window.

---

## Exercise 4

Create

a report

displaying

department

average,

minimum,

and

maximum

salary

using

one

Named Window.

---

## Exercise 5

Explain

why

Named Windows

improve

maintainability

in

large

reporting

queries.

---

# Interview Questions

## Beginner

1. What is a Named Window?

2. Why does PostgreSQL provide the `WINDOW` clause?

3. Where is the `WINDOW` clause written in a query?

---

## Intermediate

1. What are the advantages of Named Windows?

2. Can multiple Named Windows exist in one query?

3. When should you use a Named Window instead of repeating window definitions?

---

## Senior

1. Design a complex analytical report using multiple Named Windows.

2. Explain how Named Windows improve long-term maintainability in enterprise SQL.

3. Why do Named Windows improve readability but not necessarily query performance?

---

# Section Summary

In this section,

you learned:

- The `WINDOW` clause allows window definitions to be named and reused within a query.
- Named Windows reduce repetition, improve readability, and simplify maintenance.
- Multiple Named Windows can be defined to support different analytical calculations in the same query.
- Named Windows are especially valuable in large BI and reporting queries with many Window Functions.
- Their primary benefit is maintainability rather than automatic performance improvement.

---

# Coming Up Next

## Section 37.11

# ROW_NUMBER()

You'll learn:

- What `ROW_NUMBER()` does.
- Sequential numbering.
- Partitioned row numbering.
- Ordering requirements.
- Real-world business applications.
- Enterprise reporting patterns.

# ==========================================================
# Section 37.11
# ROW_NUMBER()
# ==========================================================

# Introduction

One of

the first

and

most commonly

used

Window Functions

is

```
ROW_NUMBER()
```

It assigns

a unique

sequential

number

to

every row

inside

a window.

Unlike

ranking functions

that you

will learn

later,

```
ROW_NUMBER()
```

never

produces

duplicate

numbers.

Every row

receives

its own

unique

position.

---

# What Is

ROW_NUMBER()?

```
ROW_NUMBER()
```

returns

a sequential

integer

starting

from

1

for

every row

inside

the window.

General

syntax

```sql
ROW_NUMBER()

OVER
(
    ORDER BY ...
)
```

Since

a sequence

requires

an order,

an

```
ORDER BY
```

clause

is almost

always

required.

---

# Employee

Table

| Employee | Department | Salary |
|-----------|------------|-------:|
|Alice|IT|70000|
|Bob|IT|65000|
|Charlie|IT|80000|
|David|HR|60000|
|Emma|HR|55000|

---

# Basic

Example

```sql
SELECT

employee_name,

salary,

ROW_NUMBER()

OVER
(
ORDER BY salary DESC
)

AS row_number

FROM employees;
```

Result

| Employee | Salary | Row Number |
|-----------|-------:|-----------:|
|Charlie|80000|1|
|Alice|70000|2|
|Bob|65000|3|
|David|60000|4|
|Emma|55000|5|

Every row

receives

a unique

number.

---

# How

ROW_NUMBER()

Works

Step 1

Sort

the rows.

```text
Charlie

Alice

Bob

David

Emma
```

Step 2

Assign

numbers.

```text
Charlie

↓

1

Alice

↓

2

Bob

↓

3

David

↓

4

Emma

↓

5
```

---

# Using

PARTITION BY

Business asks

```
Assign

Row Numbers

Within

Each Department.
```

```sql
SELECT

employee_name,

department,

salary,

ROW_NUMBER()

OVER
(
PARTITION BY department

ORDER BY salary DESC
)

AS department_row

FROM employees;
```

Result

| Employee | Department | Salary | Row Number |
|-----------|------------|-------:|-----------:|
|Charlie|IT|80000|1|
|Alice|IT|70000|2|
|Bob|IT|65000|3|
|David|HR|60000|1|
|Emma|HR|55000|2|

Notice

that

numbering

restarts

for

every

department.

---

# Visualizing

Partitions

IT

```text
Charlie

↓

1

Alice

↓

2

Bob

↓

3
```

HR

```text
David

↓

1

Emma

↓

2
```

Each

partition

has

its own

sequence.

---

# Duplicate

Values

Suppose

the data

contains

| Employee | Salary |
|-----------|-------:|
|Alice|70000|
|Bob|70000|
|Charlie|80000|

Query

```sql
SELECT

employee_name,

salary,

ROW_NUMBER()

OVER
(
ORDER BY salary DESC
)

FROM employees;
```

Possible

Result

| Employee | Salary | Row Number |
|-----------|-------:|-----------:|
|Charlie|80000|1|
|Alice|70000|2|
|Bob|70000|3|

Even though

Alice

and

Bob

have

the same

salary,

they still

receive

different

row numbers.

---

# Important

Observation

```
ROW_NUMBER()
```

does

not

handle

ties.

It simply

numbers

rows

based

on

the ordering.

If

multiple rows

have

the same

ordering value,

their relative

order

depends

on

the sort order.

If

a deterministic

result

is required,

include

additional

columns

in

the

```
ORDER BY
```

clause.

Example

```sql
ORDER BY

salary DESC,

employee_id
```

---

# Common

Business

Applications

Finding

Top Employee

```sql
WHERE row_number = 1
```

---

Pagination

```text
Rows

1–10

↓

Page 1

Rows

11–20

↓

Page 2
```

---

Removing

Duplicates

Keep

only

the first

row

within

each group.

---

Latest

Record

Per Customer

Assign

row numbers

ordered

by

transaction date,

then

keep

```
ROW_NUMBER() = 1
```

---

# Example

Latest Order

Per Customer

```sql
SELECT *

FROM
(
    SELECT

    customer_id,

    order_date,

    ROW_NUMBER()

    OVER
    (
        PARTITION BY customer_id

        ORDER BY order_date DESC
    )

    AS rn

    FROM orders
)

AS t

WHERE rn = 1;
```

Each customer

returns

only

their latest

order.

---

# Enterprise

Applications

Banking

```
Latest

Transaction

Per Account
```

---

Retail

```
Latest

Purchase

Per Customer
```

---

HR

```
Highest Paid

Employee

Per Department
```

---

Healthcare

```
Most Recent

Patient Visit
```

---

IoT

```
Latest

Sensor Reading
```

---

# Think Like

A Data

Engineer

Business asks

```
Keep

Only

The Latest

Record

For

Each Customer.
```

Instead of

complex

SELF JOINs,

assign

a

```
ROW_NUMBER()
```

ordered

by

the latest

timestamp.

Then,

keep

only

```
ROW_NUMBER() = 1.
```

This pattern

is one

of

the most

common

Window Function

solutions

used

in

ETL pipelines

and

data warehouses.

---

# Performance

Considerations

```
ROW_NUMBER()
```

requires

sorting

according

to

the

```
ORDER BY
```

inside

```
OVER().
```

Large datasets

may require

significant

sorting.

Indexes

supporting

the ordering

columns

may help

overall query

performance,

although

PostgreSQL

may still

need

to perform

sorting

depending

on

the query.

Always

verify

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Always specify a deterministic `ORDER BY`.

✅ Combine with `PARTITION BY` when numbering groups independently.

✅ Use `ROW_NUMBER() = 1` to retrieve the latest or first record per group.

✅ Include tie-breaker columns when ordering values may be duplicated.

✅ Test results using duplicate data.

---

# Common Mistakes

❌ Assuming `ROW_NUMBER()` handles ties.

❌ Omitting `ORDER BY`.

❌ Expecting numbering to continue across partitions.

❌ Using `ROW_NUMBER()` when tied rows should share the same rank.

❌ Forgetting to include a deterministic tie-breaker.

---

# PostgreSQL Practice Lab

## Exercise 1

Assign

row numbers

to

employees

ordered

by

salary.

---

## Exercise 2

Restart

row numbering

for

each department.

---

## Exercise 3

Retrieve

the highest-paid

employee

from

each department

using

`ROW_NUMBER()`.

---

## Exercise 4

Create

duplicate

salary values.

Observe

how

`ROW_NUMBER()`

behaves.

---

## Exercise 5

Retrieve

the latest

order

for

each customer

using

`ROW_NUMBER()`.

---

# Interview Questions

## Beginner

1. What does `ROW_NUMBER()` do?

2. Why does `ROW_NUMBER()` require an ordering?

3. What happens when `PARTITION BY` is used?

---

## Intermediate

1. Why does `ROW_NUMBER()` assign different numbers to rows with equal values?

2. How can `ROW_NUMBER()` be used for deduplication?

3. Why should a tie-breaker column be included in the `ORDER BY` clause?

---

## Senior

1. Design an ETL process that keeps only the latest record for each business key using `ROW_NUMBER()`.

2. Compare `ROW_NUMBER()` with `RANK()` and explain when each should be used.

3. How would you optimize a `ROW_NUMBER()` query processing hundreds of millions of rows?

---

# Section Summary

In this section,

you learned:

- `ROW_NUMBER()` assigns a unique sequential number to every row within a window.
- Numbering is based on the `ORDER BY` clause and restarts for each `PARTITION BY` group.
- Unlike ranking functions, `ROW_NUMBER()` never assigns the same number to multiple rows.
- It is widely used for pagination, deduplication, latest-record selection, and top-N queries.
- Deterministic ordering with tie-breaker columns produces consistent and reliable results.

---

# Coming Up Next

## Section 37.12

# RANK()

You'll learn:

- How `RANK()` differs from `ROW_NUMBER()`.
- Handling ties.
- Ranking with gaps.
- Business leaderboard examples.
- Choosing between `ROW_NUMBER()` and `RANK()`.


# ==========================================================
# Section 37.12
# RANK()
# ==========================================================

# Introduction

In the previous

section,

you learned

that

```
ROW_NUMBER()
```

assigns

a unique

number

to

every row.

However,

real-world

business data

often contains

ties.

Example

```text
Alice

↓

70000

Bob

↓

70000
```

Should

Alice

and

Bob

receive

different

ranks?

Usually,

the answer

is

No.

This is

why

PostgreSQL

provides

the

```
RANK()
```

Window Function.

---

# What Is

RANK()?

```
RANK()
```

assigns

the same

rank

to

rows

having

equal

ordering values.

If

multiple rows

share

the same

rank,

the next

rank

is skipped.

This creates

gaps

in

the ranking.

---

# General

Syntax

```sql
RANK()

OVER
(
    ORDER BY ...
)
```

Like

```
ROW_NUMBER()
```

ranking

depends

on

the

```
ORDER BY
```

clause.

---

# Employee

Table

| Employee | Salary |
|-----------|-------:|
|Charlie|80000|
|Alice|70000|
|Bob|70000|
|David|60000|
|Emma|55000|

---

# Example

```sql
SELECT

employee_name,

salary,

RANK()

OVER
(
ORDER BY salary DESC
)

AS salary_rank

FROM employees;
```

Result

| Employee | Salary | Rank |
|-----------|-------:|-----:|
|Charlie|80000|1|
|Alice|70000|2|
|Bob|70000|2|
|David|60000|4|
|Emma|55000|5|

Notice

that

Alice

and

Bob

share

Rank

2.

Rank

3

does not

exist.

---

# Why

Was Rank

3

Skipped?

Two employees

occupied

Rank

2.

Therefore,

the next

available

position

becomes

Rank

4.

Visualizing

the ranking

```text
1

↓

2

↓

2

↓

4

↓

5
```

This is

the defining

behavior

of

```
RANK().
```

---

# Comparing

ROW_NUMBER()

And

RANK()

Using

the same

data

```
ROW_NUMBER()

↓

1

2

3

4

5
```

```
RANK()

↓

1

2

2

4

5
```

```
ROW_NUMBER()
```

always

assigns

unique numbers.

```
RANK()
```

allows

ties.

---

# Using

PARTITION BY

Business asks

```
Rank

Employees

Within

Each Department.
```

```sql
SELECT

employee_name,

department,

salary,

RANK()

OVER
(
PARTITION BY department

ORDER BY salary DESC
)

AS department_rank

FROM employees;
```

Result

| Employee | Department | Salary | Rank |
|-----------|------------|-------:|-----:|
|Charlie|IT|80000|1|
|Alice|IT|70000|2|
|Bob|IT|70000|2|
|David|HR|60000|1|
|Emma|HR|55000|2|

Ranking

restarts

for

each

department.

---

# Business

Applications

Sales

Leaderboard

Employees

with

equal

sales

should

share

the same

position.

---

Sports

Competition

Athletes

with

the same

score

receive

the same

rank.

---

University

Entrance

Students

with

identical

marks

share

the same

position.

---

Customer

Loyalty

Customers

having

equal

spending

receive

the same

rank.

---

# Top

Three

Employees

Suppose

Business asks

```
Display

The Top

Three

Highest Paid

Employees.
```

Using

```
RANK()
```

may return

more than

three rows

if

multiple

employees

tie

for

third place.

Example

```text
Rank

1

↓

Charlie

Rank

2

↓

Alice

Bob

Rank

4

↓

David
```

Business

must decide

whether

ties

should

be included.

---

# Difference

Between

Ranking

And

Position

Imagine

a race.

```text
Runner A

↓

1st

Runner B

↓

2nd

Runner C

↓

2nd

Runner D

↓

4th
```

Runner D

finishes

fourth,

not

third,

because

two runners

shared

second place.

This

matches

how

```
RANK()
```

works.

---

# Enterprise

Applications

HR

```
Salary

Ranking
```

---

Retail

```
Top Selling

Products
```

---

Finance

```
Highest

Revenue

Branches
```

---

Healthcare

```
Hospital

Performance

Ranking
```

---

Education

```
Student

Merit List
```

---

# Think Like

A Business

Manager

Business asks

```
Who

Are

The Highest

Performing

Salespeople?
```

If

two employees

sell

exactly

the same

amount,

they should

receive

the same

rank.

Using

```
ROW_NUMBER()
```

would

artificially

place

one employee

ahead

of

the other.

```
RANK()
```

better

reflects

business

fairness.

---

# Performance

Considerations

Like

other

ranking

functions,

```
RANK()
```

requires

sorting

based

on

the

```
ORDER BY
```

columns.

Large

datasets

may require

substantial

sorting.

Appropriate

indexes

may improve

overall

query performance,

but

always

verify

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Use `RANK()` when equal values should share the same rank.

✅ Combine with `PARTITION BY` for independent rankings.

✅ Choose deterministic ordering columns.

✅ Verify whether skipped ranks match business expectations.

✅ Discuss tie-handling requirements with stakeholders.

---

# Common Mistakes

❌ Expecting consecutive ranks after ties.

❌ Using `RANK()` when every row requires a unique position.

❌ Forgetting that ranking restarts within partitions.

❌ Assuming `RANK()` and `ROW_NUMBER()` behave identically.

❌ Ignoring business rules for tied values.

---

# PostgreSQL Practice Lab

## Exercise 1

Rank

employees

by

salary.

Observe

how

ties

are handled.

---

## Exercise 2

Rank

employees

within

each department.

---

## Exercise 3

Insert

duplicate

salary values.

Compare

`ROW_NUMBER()`

and

`RANK()`.

---

## Exercise 4

Retrieve

the

top-ranked

employee

from

each department.

---

## Exercise 5

Explain

why

`RANK()`

may return

more rows

than expected

when

retrieving

the

Top 3.

---

# Interview Questions

## Beginner

1. What does `RANK()` do?

2. How does `RANK()` handle ties?

3. Why are some rank values skipped?

---

## Intermediate

1. Compare `RANK()` and `ROW_NUMBER()`.

2. When is `RANK()` more appropriate than `ROW_NUMBER()`?

3. How does `PARTITION BY` affect `RANK()`?

---

## Senior

1. Design a leaderboard that fairly handles ties using `RANK()`.

2. Explain why `RANK()` can return more than N rows in a Top-N query.

3. How would you optimize ranking queries over hundreds of millions of records?

---

# Section Summary

In this section,

you learned:

- `RANK()` assigns the same rank to rows with equal ordering values.
- Unlike `ROW_NUMBER()`, `RANK()` leaves gaps after ties.
- Rankings restart independently for each `PARTITION BY` group.
- `RANK()` is widely used for leaderboards, merit lists, sales rankings, and performance reporting where ties should be treated fairly.
- Choosing between `ROW_NUMBER()` and `RANK()` depends on the business rules for handling ties.

---

# Coming Up Next

## Section 37.13

# DENSE_RANK()

You'll learn:

- How `DENSE_RANK()` differs from `RANK()`.
- Rankings without gaps.
- Comparing all three ranking functions.
- Real-world business scenarios.
- Choosing the correct ranking function.

# ==========================================================
# Section 37.13
# DENSE_RANK()
# ==========================================================

# Introduction

In the previous

section,

you learned

that

```
RANK()
```

assigns

the same

rank

to

rows

having

equal

ordering values.

However,

it also

creates

gaps

in

the ranking.

Some

businesses

do not

want

those gaps.

Instead,

they want

continuous

ranking.

This is

exactly

what

```
DENSE_RANK()
```

provides.

---

# What Is

DENSE_RANK()?

```
DENSE_RANK()
```

assigns

the same

rank

to

rows

having

equal

ordering values.

Unlike

```
RANK(),
```

it does

not

skip

rank numbers.

The next

distinct

value

receives

the next

consecutive

rank.

---

# General

Syntax

```sql
DENSE_RANK()

OVER
(
    ORDER BY ...
)
```

Like

other

ranking

functions,

it requires

an

```
ORDER BY
```

to define

the ranking

sequence.

---

# Employee

Table

| Employee | Salary |
|-----------|-------:|
|Charlie|80000|
|Alice|70000|
|Bob|70000|
|David|60000|
|Emma|55000|

---

# Example

```sql
SELECT

employee_name,

salary,

DENSE_RANK()

OVER
(
ORDER BY salary DESC
)

AS salary_rank

FROM employees;
```

Result

| Employee | Salary | Dense Rank |
|-----------|-------:|-----------:|
|Charlie|80000|1|
|Alice|70000|2|
|Bob|70000|2|
|David|60000|3|
|Emma|55000|4|

Notice

that

no ranks

are skipped.

---

# Comparing

The Three

Ranking

Functions

Using

the same

data

```
ROW_NUMBER()

↓

1

2

3

4

5
```

```
RANK()

↓

1

2

2

4

5
```

```
DENSE_RANK()

↓

1

2

2

3

4
```

This

comparison

is one

of

the most

important

interview

topics.

---

# Visualizing

The Difference

Employees

```text
Charlie

↓

80000

Alice

↓

70000

Bob

↓

70000

David

↓

60000

Emma

↓

55000
```

Ranking

Comparison

| Employee | ROW_NUMBER | RANK | DENSE_RANK |
|-----------|-----------:|-----:|-----------:|
|Charlie|1|1|1|
|Alice|2|2|2|
|Bob|3|2|2|
|David|4|4|3|
|Emma|5|5|4|

---

# Using

PARTITION BY

Business asks

```
Rank

Employees

Within

Each Department

Without

Skipping

Ranks.
```

```sql
SELECT

employee_name,

department,

salary,

DENSE_RANK()

OVER
(
PARTITION BY department

ORDER BY salary DESC
)

AS department_rank

FROM employees;
```

Result

| Employee | Department | Salary | Dense Rank |
|-----------|------------|-------:|-----------:|
|Charlie|IT|80000|1|
|Alice|IT|70000|2|
|Bob|IT|70000|2|
|David|HR|60000|1|
|Emma|HR|55000|2|

Ranking

restarts

for

each

department.

---

# When

Should

You Use

DENSE_RANK()?

Use

```
DENSE_RANK()
```

when

equal values

should

share

the same

rank,

but

rank numbers

must remain

continuous.

Examples

include

- Product Rankings

- Student Grades

- Sales Performance

- Department Rankings

- Customer Segments

---

# Business

Example

Student

Grades

Marks

```text
95

↓

95

↓

90

↓

85
```

Using

```
RANK()

↓

1

1

3

4
```

Using

```
DENSE_RANK()

↓

1

1

2

3
```

Many

educational

institutions

prefer

continuous

ranking.

---

# Top

Three

Products

Suppose

Business asks

```
Display

Top Three

Products

By Sales.
```

If

two products

share

second place,

```
DENSE_RANK()
```

returns

```text
1

↓

2

2

↓

3
```

The third

rank

still

exists.

With

```
RANK(),
```

Rank

3

would

be skipped.

---

# Enterprise

Applications

Retail

```
Product

Ranking
```

---

Finance

```
Branch

Performance
```

---

Healthcare

```
Hospital

Quality

Scores
```

---

HR

```
Employee

Performance
```

---

Education

```
Student

Merit

Ranking
```

---

# Choosing

Between

The Three

Functions

Need

every row

to have

a unique

position?

↓

Use

```
ROW_NUMBER()
```

---

Need

ties,

and

gaps

are acceptable?

↓

Use

```
RANK()
```

---

Need

ties,

but

no gaps?

↓

Use

```
DENSE_RANK()
```

This

decision tree

is commonly

asked

in

SQL interviews.

---

# Think Like

A Business

Analyst

Business asks

```
Assign

Performance

Levels

To

Employees.
```

Employees

with

equal

performance

scores

should

share

the same

level.

However,

management

does not

want

missing

level numbers.

```
DENSE_RANK()
```

perfectly

matches

this

requirement.

---

# Performance

Considerations

```
DENSE_RANK()
```

has

performance

characteristics

similar

to

```
RANK().
```

Both

require

sorting

based

on

the

```
ORDER BY
```

columns.

Indexes

may improve

overall

query performance,

but

always

confirm

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Use `DENSE_RANK()` when gaps are undesirable.

✅ Use deterministic ordering columns.

✅ Combine with `PARTITION BY` for independent rankings.

✅ Validate business rules for tie handling.

✅ Compare outputs with `RANK()` during testing.

---

# Common Mistakes

❌ Assuming `DENSE_RANK()` behaves like `RANK()`.

❌ Using `ROW_NUMBER()` when tied rows should share the same rank.

❌ Forgetting that ranking restarts within partitions.

❌ Ignoring tie-handling requirements.

❌ Choosing the wrong ranking function for the business problem.

---

# PostgreSQL Practice Lab

## Exercise 1

Assign

dense ranks

to

employees

based

on

salary.

---

## Exercise 2

Compare

the outputs

of

`ROW_NUMBER()`,

`RANK()`,

and

`DENSE_RANK()`

using

the same

dataset.

---

## Exercise 3

Restart

dense ranking

for

each department.

---

## Exercise 4

Insert

additional

duplicate

salary values.

Observe

how

`DENSE_RANK()`

behaves.

---

## Exercise 5

Design

a report

that displays

the

top three

products

using

`DENSE_RANK()`.

---

# Interview Questions

## Beginner

1. What does `DENSE_RANK()` do?

2. How does `DENSE_RANK()` differ from `RANK()`?

3. How does `DENSE_RANK()` handle ties?

---

## Intermediate

1. Compare `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`.

2. When is `DENSE_RANK()` the best choice?

3. How does `PARTITION BY` affect `DENSE_RANK()`?

---

## Senior

1. Design a ranking system for employee performance that fairly handles ties without gaps.

2. Explain how business requirements determine whether `ROW_NUMBER()`, `RANK()`, or `DENSE_RANK()` should be used.

3. How would you optimize dense-ranking queries over very large datasets?

---

# Section Summary

In this section,

you learned:

- `DENSE_RANK()` assigns the same rank to rows with equal ordering values.
- Unlike `RANK()`, it does not leave gaps after ties.
- Ranking restarts independently for each `PARTITION BY` group.
- `DENSE_RANK()` is ideal when business rules require fair tie handling with continuous rank numbers.
- Choosing among `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` depends entirely on how the business wants ties to be treated.

---

# Coming Up Next

## Section 37.14

# NTILE()

You'll learn:

- What `NTILE()` does.
- Dividing data into equal-sized buckets.
- Quartiles, quintiles, deciles, and percentiles.
- Customer segmentation.
- Salary banding.
- Real-world analytics use cases.


# ==========================================================
# Section 37.14
# NTILE()
# ==========================================================

# Introduction

Sometimes,

businesses

do not

need

an exact

rank.

Instead,

they want

to divide

data

into

equal-sized

groups.

Examples

include

- Top 25% Customers

- Bottom 10% Products

- Top Quartile Employees

- High-Risk Accounts

- Performance Bands

PostgreSQL

provides

the

```
NTILE()
```

Window Function

to solve

these

problems.

Instead of

assigning

a rank,

```
NTILE()
```

assigns

each row

to

a numbered

bucket.

---

# What Is

NTILE()?

```
NTILE(n)
```

divides

the rows

into

approximately

equal-sized

groups,

called

buckets.

Each row

is assigned

a bucket

number

starting

from

1.

General

syntax

```sql
NTILE(n)

OVER
(
    ORDER BY ...
)
```

Where

```
n
```

is

the number

of buckets

to create.

---

# Employee

Table

| Employee | Salary |
|-----------|-------:|
|Charlie|80000|
|Alice|70000|
|Bob|65000|
|David|60000|
|Emma|55000|
|Frank|50000|
|Grace|45000|
|Henry|40000|

---

# Example

Divide

Employees

Into

Four Buckets

```sql
SELECT

employee_name,

salary,

NTILE(4)

OVER
(
ORDER BY salary DESC
)

AS salary_quartile

FROM employees;
```

Result

| Employee | Salary | Quartile |
|-----------|-------:|---------:|
|Charlie|80000|1|
|Alice|70000|1|
|Bob|65000|2|
|David|60000|2|
|Emma|55000|3|
|Frank|50000|3|
|Grace|45000|4|
|Henry|40000|4|

Each bucket

contains

approximately

the same

number

of rows.

---

# Visualizing

NTILE(4)

```text
Bucket 1

Charlie

Alice

================

Bucket 2

Bob

David

================

Bucket 3

Emma

Frank

================

Bucket 4

Grace

Henry
```

---

# What

If Rows

Cannot Be

Divided

Evenly?

Suppose

there are

10 rows,

but

we request

```
NTILE(4)
```

PostgreSQL

distributes

the extra

rows

to

the earlier

buckets.

Example

```text
10 Rows

↓

Bucket 1

3 Rows

Bucket 2

3 Rows

Bucket 3

2 Rows

Bucket 4

2 Rows
```

The size

difference

between

buckets

is

never

greater

than

one row.

---

# Using

PARTITION BY

Business asks

```
Divide

Employees

Into

Salary Quartiles

Within

Each Department.
```

```sql
SELECT

employee_name,

department,

salary,

NTILE(4)

OVER
(
PARTITION BY department

ORDER BY salary DESC
)

AS department_quartile

FROM employees;
```

Each department

is divided

independently.

---

# Common

Bucket Sizes

```
NTILE(2)

↓

Halves
```

---

```
NTILE(4)

↓

Quartiles
```

---

```
NTILE(5)

↓

Quintiles
```

---

```
NTILE(10)

↓

Deciles
```

---

```
NTILE(100)

↓

Percentile

Buckets
```

Although

`NTILE(100)`

creates

100 buckets,

it is

not

the same

as

a true

statistical

percentile.

Later,

you'll learn

functions

designed

specifically

for

percentile

analysis.

---

# Business

Applications

Customer

Segmentation

```text
Top

25%

Customers
```

---

Employee

Performance

```text
Top

Quartile

Employees
```

---

Retail

```text
Top

10%

Products
```

---

Banking

```text
High-Risk

Accounts
```

---

Marketing

```text
Customer

Value

Segments
```

---

# Sales

Example

Business asks

```
Divide

Salespeople

Into

Four

Performance

Groups.
```

The report

can classify

employees

as

```text
Top

25%

↓

High Performers

================

Second

25%

↓

Above Average

================

Third

25%

↓

Average

================

Bottom

25%

↓

Needs Improvement
```

---

# University

Example

Business asks

```
Divide

Students

Into

Performance

Quartiles.
```

Students

can now

be grouped

without

assigning

individual

ranks.

---

# NTILE()

Is

Not

A Ranking

Function

Many beginners

mistake

```
NTILE()
```

for

a ranking

function.

Remember

```
ROW_NUMBER()

↓

Position
```

```
RANK()

↓

Rank
```

```
DENSE_RANK()

↓

Rank

Without Gaps
```

```
NTILE()

↓

Bucket
```

The goal

is

classification,

not

ranking.

---

# Think Like

A Marketing

Analyst

Business asks

```
Identify

The Top

25%

Customers

For

A Loyalty

Campaign.
```

Exact

ranking

is unnecessary.

The business

only needs

to know

which customers

belong

to

the highest

quartile.

```
NTILE(4)
```

provides

a simple

solution.

---

# Performance

Considerations

Like

other

Window Functions,

```
NTILE()
```

requires

sorting

based

on

the

```
ORDER BY
```

columns.

The bucket

assignment

occurs

after

sorting.

Large datasets

may require

significant

sorting,

so

verify

performance

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Use `NTILE()` for segmentation rather than ranking.

✅ Choose bucket counts that match business requirements.

✅ Use deterministic ordering columns.

✅ Combine with `PARTITION BY` for independent segmentation.

✅ Validate bucket sizes using real datasets.

---

# Common Mistakes

❌ Confusing buckets with ranks.

❌ Assuming every bucket has exactly the same number of rows.

❌ Using `NTILE(100)` as a true percentile calculation.

❌ Forgetting that sorting determines bucket assignment.

❌ Choosing too many buckets for small datasets.

---

# PostgreSQL Practice Lab

## Exercise 1

Divide

employees

into

two

salary groups

using

`NTILE(2)`.

---

## Exercise 2

Divide

employees

into

quartiles

using

`NTILE(4)`.

---

## Exercise 3

Segment

employees

within

each department

using

`PARTITION BY`.

---

## Exercise 4

Create

a dataset

containing

10 rows.

Apply

`NTILE(4)`.

Observe

how

PostgreSQL

distributes

the extra

rows.

---

## Exercise 5

Design

a customer

segmentation

report

using

`NTILE(5)`.

---

# Interview Questions

## Beginner

1. What does `NTILE()` do?

2. How does `NTILE(4)` divide a dataset?

3. Is `NTILE()` a ranking function?

---

## Intermediate

1. How does PostgreSQL distribute rows when buckets cannot be perfectly balanced?

2. How does `PARTITION BY` affect `NTILE()`?

3. Give three business examples where `NTILE()` is appropriate.

---

## Senior

1. Design a customer segmentation system using `NTILE()`.

2. Compare `NTILE()` with `RANK()` and explain when each should be used.

3. How would you optimize large-scale segmentation queries using `NTILE()`?

---

# Section Summary

In this section,

you learned:

- `NTILE()` divides ordered rows into approximately equal-sized buckets.
- Buckets are numbered starting from 1 and are used for classification rather than ranking.
- When rows cannot be divided evenly, PostgreSQL distributes the extra rows to the earlier buckets.
- `NTILE()` is widely used for quartiles, deciles, customer segmentation, salary bands, and performance analysis.
- Choosing the correct number of buckets depends on the business objective rather than the dataset size.

---

# Coming Up Next

## Section 37.15

# PERCENT_RANK()

You'll learn:

- What `PERCENT_RANK()` calculates.
- Ranking as a percentage.
- Difference between `NTILE()` and `PERCENT_RANK()`.
- Percentile-based analytics.
- Business intelligence applications.
- Enterprise reporting patterns.

# ==========================================================
# Section 37.15
# PERCENT_RANK()
# ==========================================================

# Introduction

Sometimes,

businesses

do not

want

an employee's

rank.

Instead,

they want

to know

how well

that employee

performed

relative

to

everyone else.

Examples

include

- Top 10% Customers

- Student Percentile

- Sales Performance

- Product Popularity

- Credit Risk

Instead of

returning

an integer

rank,

PostgreSQL

can return

a

relative

ranking

between

0

and

1.

This is

the purpose

of

```
PERCENT_RANK().
```

---

# What Is

PERCENT_RANK()?

```
PERCENT_RANK()
```

calculates

the relative

position

of

each row

within

its window.

The result

is

a decimal

between

```
0
```

and

```
1.
```

General

syntax

```sql
PERCENT_RANK()

OVER
(
    ORDER BY ...
)
```

---

# Formula

Internally,

PostgreSQL

calculates

```
(RANK - 1)

/

(Total Rows - 1)
```

Notice

that

it uses

```
RANK()
```

not

```
ROW_NUMBER().
```

Therefore,

ties

receive

the same

percentage.

---

# Employee

Table

| Employee | Salary |
|-----------|-------:|
|Charlie|80000|
|Alice|70000|
|Bob|70000|
|David|60000|
|Emma|55000|

---

# Example

```sql
SELECT

employee_name,

salary,

PERCENT_RANK()

OVER
(
ORDER BY salary DESC
)

AS percent_rank

FROM employees;
```

Result

| Employee | Salary | Percent Rank |
|-----------|-------:|-------------:|
|Charlie|80000|0.00|
|Alice|70000|0.25|
|Bob|70000|0.25|
|David|60000|0.75|
|Emma|55000|1.00|

Notice

that

the values

range

from

0

to

1.

---

# Understanding

The Result

The highest

salary

receives

```
0
```

because

it is

the first

rank.

The lowest

salary

receives

```
1
```

because

it is

the last

rank.

Rows

between

them

receive

proportional

values.

---

# Visualizing

PERCENT_RANK()

```text
Highest Salary

↓

0.00

================

Middle

↓

0.25

↓

0.25

↓

0.75

================

Lowest Salary

↓

1.00
```

---

# Using

PARTITION BY

Business asks

```
Calculate

Salary

Percent Rank

Within

Each Department.
```

```sql
SELECT

employee_name,

department,

salary,

PERCENT_RANK()

OVER
(
PARTITION BY department

ORDER BY salary DESC
)

AS department_percent_rank

FROM employees;
```

Each department

receives

its own

independent

percentage

ranking.

---

# Single

Row

Partition

Suppose

a partition

contains

only

one row.

Example

```text
HR

↓

David
```

The result

is

```
0
```

because

there are

no other

rows

to compare.

---

# Business

Applications

HR

```text
Salary

Percentile
```

---

Education

```text
Student

Performance
```

---

Retail

```text
Customer

Spending
```

---

Banking

```text
Credit

Score

Comparison
```

---

Healthcare

```text
Hospital

Performance
```

---

# Example

Student

Performance

Suppose

Business asks

```
Identify

Students

Within

The Top

20%.
```

Query

```sql
WHERE

percent_rank

<= 0.20
```

The report

returns

students

whose ranking

places them

within

the highest

20%

of

their class.

---

# Difference

Between

NTILE()

And

PERCENT_RANK()

```
NTILE()

↓

Buckets
```

Example

```text
Quartile 1

Quartile 2

Quartile 3

Quartile 4
```

---

```
PERCENT_RANK()

↓

Continuous

Percentage
```

Example

```text
0.00

0.17

0.33

0.50

0.67

0.83

1.00
```

One

creates

groups.

The other

calculates

relative

position.

---

# Difference

Between

RANK()

And

PERCENT_RANK()

```
RANK()

↓

1

2

2

4

5
```

---

```
PERCENT_RANK()

↓

0.00

0.25

0.25

0.75

1.00
```

One

returns

an integer.

The other

returns

a normalized

percentage.

---

# Think Like

A Business

Analyst

Business asks

```
Show

Each Customer's

Relative

Position

Based

On

Annual Spending.
```

A rank

such as

```
37
```

does not

immediately

communicate

performance.

A value

such as

```
0.08
```

indicates

that

the customer

is

very close

to

the top

of

the ordered

list.

This

often provides

more meaningful

insight.

---

# Enterprise

Applications

Marketing

```
Customer

Lifetime Value
```

---

Insurance

```
Risk

Scoring
```

---

Finance

```
Portfolio

Performance
```

---

Retail

```
Sales

Performance
```

---

Education

```
Exam

Percentiles
```

---

# Performance

Considerations

```
PERCENT_RANK()
```

requires

sorting

using

the

```
ORDER BY
```

columns.

Its

performance

characteristics

are similar

to

other

ranking

functions.

Always

measure

query

performance

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Use `PERCENT_RANK()` for relative performance analysis.

✅ Combine with `PARTITION BY` for independent percentage rankings.

✅ Understand that results range from `0` to `1`.

✅ Remember that tied rows receive the same percentage.

✅ Convert percentages to a 0–100 scale in reports only if required by the business.

---

# Common Mistakes

❌ Assuming `PERCENT_RANK()` returns percentages from 1 to 100.

❌ Confusing `PERCENT_RANK()` with `NTILE()`.

❌ Expecting evenly spaced values.

❌ Forgetting that ties share the same value.

❌ Misinterpreting `0` as poor performance when ordering is descending.

---

# PostgreSQL Practice Lab

## Exercise 1

Calculate

the

salary

percent rank

for

all employees.

---

## Exercise 2

Calculate

salary

percent rank

within

each department.

---

## Exercise 3

Insert

duplicate

salary values.

Observe

how

ties

affect

the result.

---

## Exercise 4

Identify

employees

whose

`PERCENT_RANK()`

is

less than

or equal

to

`0.20`.

---

## Exercise 5

Compare

the outputs

of

`RANK()`,

`NTILE(4)`,

and

`PERCENT_RANK()`

using

the same

dataset.

---

# Interview Questions

## Beginner

1. What does `PERCENT_RANK()` calculate?

2. What is the range of values returned by `PERCENT_RANK()`?

3. Why do tied rows receive the same percentage?

---

## Intermediate

1. Explain the formula used by `PERCENT_RANK()`.

2. Compare `PERCENT_RANK()` and `NTILE()`.

3. How does `PARTITION BY` affect `PERCENT_RANK()`?

---

## Senior

1. Design a customer analytics report using `PERCENT_RANK()` to identify top-performing customers.

2. Explain why `PERCENT_RANK()` is more informative than `RANK()` for some BI dashboards.

3. How would you optimize percentile-ranking queries over very large datasets?

---

# Section Summary

In this section,

you learned:

- `PERCENT_RANK()` calculates the relative position of each row within its window.
- It returns values between `0` and `1`, based on the formula `(RANK - 1) / (Total Rows - 1)`.
- Rows with equal ordering values receive the same percentage because the calculation is based on `RANK()`.
- `PERCENT_RANK()` is ideal for percentile analysis, relative performance measurement, and business intelligence reporting.
- It differs from `NTILE()` by producing a continuous relative position rather than assigning rows to buckets.

---

# Coming Up Next

## Section 37.16

# CUME_DIST()

You'll learn:

- What `CUME_DIST()` calculates.
- Difference between cumulative distribution and percent rank.
- Handling ties.
- Business percentile analysis.
- Comparing `PERCENT_RANK()` and `CUME_DIST()`.
- Real-world enterprise applications.

# ==========================================================
# Section 37.17
# LAG()
# ==========================================================

# Introduction

Until now,

the Window Functions

you learned

performed

calculations

such as

- Ranking

- Running Totals

- Percentiles

However,

many business

questions

require

comparing

the current row

with

another row.

Examples

include

- Compare today's sales with yesterday's sales.

- Compare this month's revenue with last month's revenue.

- Compare the current salary with the previous salary.

- Compare the current stock price with yesterday's closing price.

Before

Window Functions,

developers

used

SELF JOINs

or

complex

subqueries

to solve

these problems.

PostgreSQL

provides

```
LAG()
```

to make

these comparisons

simple.

---

# What Is

LAG()?

```
LAG()
```

returns

a value

from

a previous row

within

the same

window.

General

syntax

```sql
LAG(expression)

OVER
(
    ORDER BY ...
)
```

---

# Optional

Arguments

The complete

syntax

is

```sql
LAG

(
    expression,

    offset,

    default_value
)

OVER
(
    ORDER BY ...
)
```

Where

```
expression
```

The value

to retrieve.

---

```
offset
```

How many rows

back

to look.

Default

```
1
```

---

```
default_value
```

Returned

when

no previous row

exists.

If omitted,

PostgreSQL

returns

```
NULL
```

---

# Sales

Table

| Month | Sales |
|--------|------:|
|Jan|100|
|Feb|150|
|Mar|120|
|Apr|180|
|May|200|

---

# Basic

Example

```sql
SELECT

month,

sales,

LAG(sales)

OVER
(
ORDER BY month
)

AS previous_sales

FROM monthly_sales;
```

Result

| Month | Sales | Previous Sales |
|--------|------:|---------------:|
|Jan|100|NULL|
|Feb|150|100|
|Mar|120|150|
|Apr|180|120|
|May|200|180|

Each row

retrieves

the sales

from

the previous

month.

---

# Visualizing

LAG()

```text
Jan

100

↓

NULL

================

Feb

150

↓

100

================

Mar

120

↓

150

================

Apr

180

↓

120

================

May

200

↓

180
```

---

# Using

Offset

Suppose

Business asks

```
Compare

Current Sales

With

Sales

Two Months

Ago.
```

```sql
SELECT

month,

sales,

LAG

(
sales,

2
)

OVER
(
ORDER BY month
)

AS sales_two_months_ago

FROM monthly_sales;
```

Result

| Month | Sales | Sales Two Months Ago |
|--------|------:|---------------------:|
|Jan|100|NULL|
|Feb|150|NULL|
|Mar|120|100|
|Apr|180|150|
|May|200|120|

---

# Using

Default Values

Instead

of

returning

```
NULL,
```

you can

provide

a default.

```sql
SELECT

month,

sales,

LAG

(
sales,

1,

0
)

OVER
(
ORDER BY month
)

AS previous_sales

FROM monthly_sales;
```

Result

| Month | Sales | Previous Sales |
|--------|------:|---------------:|
|Jan|100|0|
|Feb|150|100|
|Mar|120|150|
|Apr|180|120|
|May|200|180|

---

# Using

PARTITION BY

Business asks

```
Compare

Monthly Sales

Within

Each Region.
```

```sql
SELECT

region,

month,

sales,

LAG(sales)

OVER
(
PARTITION BY region

ORDER BY month
)

AS previous_sales

FROM regional_sales;
```

Each region

maintains

its own

history.

---

# Month-over-Month

Growth

Business asks

```
Calculate

Monthly

Revenue Growth.
```

```sql
SELECT

month,

sales,

sales

-

LAG(sales)

OVER
(
ORDER BY month
)

AS growth

FROM monthly_sales;
```

Result

| Month | Sales | Growth |
|--------|------:|-------:|
|Jan|100|NULL|
|Feb|150|50|
|Mar|120|-30|
|Apr|180|60|
|May|200|20|

---

# Percentage

Growth

```sql
SELECT

month,

sales,

ROUND
(
(
sales

-

LAG(sales)

OVER
(
ORDER BY month
)
)

*100.0

/

LAG(sales)

OVER
(
ORDER BY month
),

2
)

AS growth_percent

FROM monthly_sales;
```

Example

Result

| Month | Growth % |
|--------|---------:|
|Jan|NULL|
|Feb|50.00|
|Mar|-20.00|
|Apr|50.00|
|May|11.11|

---

# Business

Applications

Finance

```text
Current Price

↓

Previous Price
```

---

Retail

```text
Today's Sales

↓

Yesterday's Sales
```

---

Healthcare

```text
Current Visit

↓

Previous Visit
```

---

Manufacturing

```text
Current Output

↓

Yesterday's Output
```

---

HR

```text
Current Salary

↓

Previous Salary
```

---

# Change

Detection

Business asks

```
Identify

When

A Customer's

Membership

Status

Changed.
```

Example

```text
Silver

↓

Silver

↓

Gold

↓

Gold

↓

Platinum
```

Using

```
LAG()
```

the current

status

can be

compared

with

the previous

status.

Rows

where

the values

differ

indicate

a change.

---

# Stock

Market

Example

| Day | Price |
|-----|------:|
|Mon|100|
|Tue|103|
|Wed|101|
|Thu|108|

Query

```sql
SELECT

day,

price,

price

-

LAG(price)

OVER
(
ORDER BY day
)

AS daily_change

FROM stock_prices;
```

The report

shows

daily

price movement.

---

# Think Like

A Financial

Analyst

Business asks

```
Which Months

Experienced

A Decline

In Revenue?
```

Using

```
LAG(),
```

compare

each month's

revenue

with

the previous

month.

Negative

differences

immediately

identify

declining

periods.

No

SELF JOIN

is required.

---

# Performance

Considerations

```
LAG()
```

requires

sorting

based

on

the

```
ORDER BY
```

columns.

Large

datasets

may require

sorting,

especially

for

time-series

analysis.

Indexes

supporting

the ordering

columns

may improve

overall

query performance,

but

always

validate

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Always specify a meaningful `ORDER BY`.

✅ Use `PARTITION BY` for independent histories.

✅ Specify a default value when `NULL` is not appropriate.

✅ Use `LAG()` instead of SELF JOINs for previous-row comparisons.

✅ Validate time ordering carefully.

---

# Common Mistakes

❌ Forgetting the `ORDER BY` clause.

❌ Ordering by the wrong column.

❌ Ignoring `NULL` in the first row.

❌ Confusing `LAG()` with `LEAD()`.

❌ Assuming `LAG()` changes the table order.

---

# PostgreSQL Practice Lab

## Exercise 1

Display

each month's

sales

along with

the previous

month's

sales.

---

## Exercise 2

Calculate

month-over-month

sales growth.

---

## Exercise 3

Retrieve

sales

from

two months

earlier

using

an offset.

---

## Exercise 4

Use

`PARTITION BY`

to compare

monthly sales

within

each region.

---

## Exercise 5

Identify

rows

where

sales

decreased

compared

to

the previous

month.

---

# Interview Questions

## Beginner

1. What does `LAG()` do?

2. What is the default offset used by `LAG()`?

3. What happens when no previous row exists?

---

## Intermediate

1. Explain the three arguments accepted by `LAG()`.

2. How does `PARTITION BY` affect `LAG()`?

3. Why is `LAG()` preferred over a SELF JOIN for previous-row comparisons?

---

## Senior

1. Design a month-over-month revenue analysis using `LAG()`.

2. Explain how `LAG()` can be used for change-data detection in ETL pipelines.

3. How would you optimize `LAG()` queries over billions of time-series records?

---

# Section Summary

In this section,

you learned:

- `LAG()` retrieves values from previous rows within the same window.
- It supports optional `offset` and `default_value` arguments.
- `LAG()` is ideal for comparing current and previous records, calculating growth, and detecting changes over time.
- `PARTITION BY` allows independent historical comparisons within logical groups.
- `LAG()` replaces many complex SELF JOINs and is a fundamental tool for time-series analytics.

---

# Coming Up Next

## Section 37.18

# LEAD()

You'll learn:

- Accessing values from future rows.
- Comparing current and next records.
- Forecasting and scheduling.
- Detecting upcoming events.
- Time-series planning.
- Enterprise business use cases.


# ==========================================================
# Section 37.18
# LEAD()
# ==========================================================

# Introduction

In the previous

section,

you learned

that

```
LAG()
```

retrieves

values

from

previous rows.

Sometimes,

businesses

need

the opposite.

Instead of

looking

backward,

they need

to look

forward.

Examples

include

- Compare today's sales with tomorrow's sales.

- Find the next scheduled appointment.

- Determine the next shipment date.

- Compare the current stock price with the next trading day.

- Calculate the time until the next event.

For these

situations,

PostgreSQL

provides

the

```
LEAD()
```

Window Function.

---

# What Is

LEAD()?

```
LEAD()
```

returns

a value

from

a future row

within

the same

window.

General

syntax

```sql
LEAD(expression)

OVER
(
    ORDER BY ...
)
```

---

# Optional

Arguments

Complete

syntax

```sql
LEAD
(
    expression,

    offset,

    default_value
)

OVER
(
    ORDER BY ...
)
```

Where

```
expression
```

The value

to retrieve.

---

```
offset
```

How many rows

ahead

to look.

Default

```
1
```

---

```
default_value
```

Returned

when

no future row

exists.

If omitted,

PostgreSQL

returns

```
NULL.
```

---

# Sales

Table

| Month | Sales |
|--------|------:|
|Jan|100|
|Feb|150|
|Mar|120|
|Apr|180|
|May|200|

---

# Basic

Example

```sql
SELECT

month,

sales,

LEAD(sales)

OVER
(
ORDER BY month
)

AS next_month_sales

FROM monthly_sales;
```

Result

| Month | Sales | Next Month Sales |
|--------|------:|-----------------:|
|Jan|100|150|
|Feb|150|120|
|Mar|120|180|
|Apr|180|200|
|May|200|NULL|

Each row

retrieves

the sales

from

the next

month.

---

# Visualizing

LEAD()

```text
Jan

100

↓

150

================

Feb

150

↓

120

================

Mar

120

↓

180

================

Apr

180

↓

200

================

May

200

↓

NULL
```

---

# Using

Offset

Suppose

Business asks

```
Compare

Current Sales

With

Sales

Two Months

Later.
```

```sql
SELECT

month,

sales,

LEAD
(
sales,

2
)

OVER
(
ORDER BY month
)

AS sales_after_two_months

FROM monthly_sales;
```

Result

| Month | Sales | Sales After Two Months |
|--------|------:|-----------------------:|
|Jan|100|120|
|Feb|150|180|
|Mar|120|200|
|Apr|180|NULL|
|May|200|NULL|

---

# Using

Default Values

Instead

of

returning

```
NULL,
```

provide

a default.

```sql
SELECT

month,

sales,

LEAD
(
sales,

1,

0
)

OVER
(
ORDER BY month
)

AS next_sales

FROM monthly_sales;
```

Result

| Month | Sales | Next Sales |
|--------|------:|-----------:|
|Jan|100|150|
|Feb|150|120|
|Mar|120|180|
|Apr|180|200|
|May|200|0|

---

# Using

PARTITION BY

Business asks

```
Display

Each Region's

Current

And

Next Month's

Sales.
```

```sql
SELECT

region,

month,

sales,

LEAD(sales)

OVER
(
PARTITION BY region

ORDER BY month
)

AS next_sales

FROM regional_sales;
```

Each region

has

its own

future

history.

---

# Forecast

Preparation

Business asks

```
Compare

Current Demand

With

Next Month's

Demand.
```

```sql
SELECT

month,

demand,

LEAD(demand)

OVER
(
ORDER BY month
)

AS next_month_demand

FROM forecasts;
```

The report

helps

identify

expected

changes.

---

# Time Until

Next Event

Suppose

we have

| Event | Date |
|--------|------|
|Meeting A|1 Jan|
|Meeting B|5 Jan|
|Meeting C|10 Jan|

Query

```sql
SELECT

event_name,

event_date,

LEAD(event_date)

OVER
(
ORDER BY event_date
)

AS next_event

FROM events;
```

Each event

can now

be compared

with

the following

event.

---

# Business

Applications

Finance

```text
Today's Price

↓

Tomorrow's Price
```

---

Retail

```text
Current Promotion

↓

Next Promotion
```

---

Healthcare

```text
Current Appointment

↓

Next Appointment
```

---

Manufacturing

```text
Current Shipment

↓

Next Shipment
```

---

HR

```text
Current Role

↓

Next Promotion
```

---

# Identifying

Final Records

Business asks

```
Find

The Final

Transaction

For

Each Customer.
```

Example

```sql
SELECT

customer_id,

transaction_date,

LEAD(transaction_date)

OVER
(
PARTITION BY customer_id

ORDER BY transaction_date
)

AS next_transaction

FROM transactions;
```

Rows

where

```
next_transaction

IS NULL
```

represent

the final

transaction

for

each customer.

---

# Comparing

LAG()

And

LEAD()

```
LAG()

↓

Previous Row
```

---

```
LEAD()

↓

Next Row
```

Visual

comparison

```text
Previous

←

Current

→

Next
```

Together,

they provide

complete

navigation

through

ordered

data.

---

# Think Like

A Supply

Chain

Manager

Business asks

```
Determine

How Many

Days

Remain

Until

The Next

Shipment.
```

Using

```
LEAD(),
```

retrieve

the next

shipment date,

then

subtract

the current

shipment date.

No

SELF JOIN

is required.

---

# Enterprise

Applications

Logistics

```
Next

Delivery
```

---

Airlines

```
Next

Flight
```

---

Hospitals

```
Next

Appointment
```

---

Telecommunications

```
Next

Billing Cycle
```

---

Manufacturing

```
Next

Production Run
```

---

# Performance

Considerations

```
LEAD()
```

has

performance

characteristics

similar

to

```
LAG().
```

It requires

sorting

based

on

the

```
ORDER BY
```

columns.

Appropriate

indexes

may improve

overall

query performance,

but

always

validate

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Always define a meaningful `ORDER BY`.

✅ Use `PARTITION BY` when future comparisons should remain within logical groups.

✅ Provide a default value when `NULL` is not appropriate.

✅ Use `LEAD()` instead of SELF JOINs for next-row comparisons.

✅ Verify chronological ordering carefully.

---

# Common Mistakes

❌ Confusing `LEAD()` with `LAG()`.

❌ Forgetting that the last row usually returns `NULL`.

❌ Ordering by the wrong column.

❌ Ignoring partition boundaries.

❌ Assuming `LEAD()` changes the output order.

---

# PostgreSQL Practice Lab

## Exercise 1

Display

each month's

sales

along with

the next

month's

sales.

---

## Exercise 2

Retrieve

sales

from

two months

later

using

an offset.

---

## Exercise 3

Use

`PARTITION BY`

to compare

future sales

within

each region.

---

## Exercise 4

Find

the final

transaction

for

each customer

using

`LEAD()`.

---

## Exercise 5

Calculate

the number

of days

between

each shipment

and

the next

shipment.

---

# Interview Questions

## Beginner

1. What does `LEAD()` do?

2. What is the default offset used by `LEAD()`?

3. What happens when no future row exists?

---

## Intermediate

1. Compare `LEAD()` and `LAG()`.

2. How does `PARTITION BY` affect `LEAD()`?

3. Why is `LEAD()` useful for forecasting and scheduling?

---

## Senior

1. Design a shipment scheduling report using `LEAD()`.

2. Explain how `LEAD()` can identify the final record within each business entity.

3. How would you optimize `LEAD()` queries over very large time-series datasets?

---

# Section Summary

In this section,

you learned:

- `LEAD()` retrieves values from future rows within the same window.
- It supports optional `offset` and `default_value` arguments.
- `LEAD()` is ideal for forecasting, scheduling, event sequencing, and future-row comparisons.
- `PARTITION BY` enables independent future navigation within logical groups.
- Together, `LAG()` and `LEAD()` provide powerful row-navigation capabilities without requiring SELF JOINs.

---

# Coming Up Next

## Section 37.19

# FIRST_VALUE()

You'll learn:

- Retrieving the first value in a window.
- Effect of window frames on `FIRST_VALUE()`.
- Department-wise first employee.
- Time-series baselines.
- Business intelligence use cases.
- Common pitfalls.

# ==========================================================
# Section 37.19
# FIRST_VALUE()
# ==========================================================

# Introduction

The previous

Window Functions

allowed us

to

- Navigate

to

previous rows

using

```
LAG()
```

- Navigate

to

future rows

using

```
LEAD()
```

Sometimes,

however,

businesses

need

to compare

every row

with

the

first row

inside

its window.

Examples

include

- Compare today's stock price with the opening price.

- Compare an employee's salary with the highest salary.

- Compare current sales with the first month's sales.

- Measure growth since the beginning of the year.

PostgreSQL

provides

the

```
FIRST_VALUE()
```

Window Function

for

these

requirements.

---

# What Is

FIRST_VALUE()?

```
FIRST_VALUE()
```

returns

the value

from

the first row

of

the current

window frame.

General

syntax

```sql
FIRST_VALUE(expression)

OVER
(
    ORDER BY ...
)
```

Unlike

ranking

functions,

```
FIRST_VALUE()
```

returns

an actual

column value,

not

a number.

---

# Employee

Table

| Employee | Salary |
|-----------|-------:|
|Charlie|80000|
|Alice|70000|
|Bob|65000|
|David|60000|
|Emma|55000|

---

# Basic

Example

```sql
SELECT

employee_name,

salary,

FIRST_VALUE(salary)

OVER
(
ORDER BY salary DESC
)

AS highest_salary

FROM employees;
```

Result

| Employee | Salary | Highest Salary |
|-----------|-------:|---------------:|
|Charlie|80000|80000|
|Alice|70000|80000|
|Bob|65000|80000|
|David|60000|80000|
|Emma|55000|80000|

Every row

receives

the salary

from

the first row

of

the ordered

window.

---

# Visualizing

FIRST_VALUE()

```text
80000

↓

First Value

================

70000

↓

80000

================

65000

↓

80000

================

60000

↓

80000

================

55000

↓

80000
```

The

first value

is reused

for

every row.

---

# Using

PARTITION BY

Business asks

```
Display

Every Employee

Along With

The Highest

Salary

In

Their Department.
```

```sql
SELECT

employee_name,

department,

salary,

FIRST_VALUE(salary)

OVER
(
PARTITION BY department

ORDER BY salary DESC
)

AS department_highest_salary

FROM employees;
```

Each department

has

its own

first value.

---

# Comparing

With

The First

Value

Business asks

```
How Much

Less

Does

Each Employee

Earn

Compared

To

The Highest

Salary?
```

```sql
SELECT

employee_name,

salary,

FIRST_VALUE(salary)

OVER
(
ORDER BY salary DESC
)

-

salary

AS difference

FROM employees;
```

Result

| Employee | Difference |
|-----------|-----------:|
|Charlie|0|
|Alice|10000|
|Bob|15000|
|David|20000|
|Emma|25000|

---

# Time-Series

Example

Sales

Table

| Month | Sales |
|--------|------:|
|Jan|100|
|Feb|150|
|Mar|120|
|Apr|180|
|May|200|

Business asks

```
Compare

Every Month

With

January.
```

```sql
SELECT

month,

sales,

FIRST_VALUE(sales)

OVER
(
ORDER BY month
)

AS january_sales

FROM monthly_sales;
```

Result

| Month | Sales | January Sales |
|--------|------:|--------------:|
|Jan|100|100|
|Feb|150|100|
|Mar|120|100|
|Apr|180|100|
|May|200|100|

---

# Measuring

Growth

Since

The Beginning

```sql
SELECT

month,

sales,

sales

-

FIRST_VALUE(sales)

OVER
(
ORDER BY month
)

AS growth_since_january

FROM monthly_sales;
```

Result

| Month | Growth |
|--------|--------:|
|Jan|0|
|Feb|50|
|Mar|20|
|Apr|80|
|May|100|

This pattern

is common

in

financial

dashboards.

---

# Why

Window Frames

Matter

Consider

this query.

```sql
FIRST_VALUE(salary)

OVER
(
ORDER BY salary DESC
)
```

By default,

the frame

starts

at

the first row

and ends

at

the current row.

Since

the first row

always

remains

inside

the frame,

```
FIRST_VALUE()
```

usually

behaves

as expected.

Later,

when

you learn

advanced

frame definitions,

you'll see

how

changing

the frame

can

change

the result.

---

# Business

Applications

Finance

```text
Opening

Stock Price
```

---

Retail

```text
First

Monthly

Sales
```

---

Healthcare

```text
First

Patient Visit
```

---

Manufacturing

```text
Initial

Production

Target
```

---

HR

```text
Highest

Department

Salary
```

---

# Enterprise

Example

Employee

Promotion

History

Business asks

```
Compare

Each Promotion

With

The Employee's

Original

Salary.
```

```text
Original Salary

↓

Current Salary

↓

Difference
```

```
FIRST_VALUE()
```

returns

the original

salary,

allowing

easy

comparison

with

every

promotion.

---

# FIRST_VALUE()

Vs

MIN()

Suppose

Business asks

```
Display

The Lowest

Salary.
```

You could

use

```sql
MIN(salary)

OVER()
```

or

```sql
FIRST_VALUE(salary)

OVER
(
ORDER BY salary
)
```

Although

both

may return

the same

result,

they are

not

identical.

```
MIN()
```

calculates

the smallest

value.

```
FIRST_VALUE()
```

returns

the value

from

the first row

of

the current

window frame.

If

the frame

changes,

their results

may differ.

---

# Think Like

A Financial

Analyst

Business asks

```
How Much

Has

Revenue

Increased

Since

January?
```

Instead

of repeatedly

joining

the January

record,

retrieve

January's

revenue

once

using

```
FIRST_VALUE()
```

and

compare

every month

against it.

The SQL

remains

simple,

readable,

and efficient.

---

# Performance

Considerations

```
FIRST_VALUE()
```

requires

sorting

based

on

the

```
ORDER BY
```

columns.

Like

other

navigation

functions,

its

performance

depends

primarily

on

sorting.

Indexes

may help

overall

query performance,

but

always

verify

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Always specify a meaningful `ORDER BY`.

✅ Combine with `PARTITION BY` for independent first values.

✅ Understand that `FIRST_VALUE()` depends on the current window frame.

✅ Use descriptive aliases.

✅ Verify results when using custom frame definitions.

---

# Common Mistakes

❌ Confusing `FIRST_VALUE()` with `MIN()`.

❌ Forgetting that frame definitions affect the result.

❌ Ordering by the wrong column.

❌ Ignoring partition boundaries.

❌ Assuming `FIRST_VALUE()` always returns the global first value.

---

# PostgreSQL Practice Lab

## Exercise 1

Display

every employee

along with

the highest

salary

in

the company

using

`FIRST_VALUE()`.

---

## Exercise 2

Display

every employee

along with

the highest

salary

within

their department.

---

## Exercise 3

Calculate

how much

each employee

earns

below

the department's

highest-paid

employee.

---

## Exercise 4

Compare

monthly sales

with

January's

sales.

---

## Exercise 5

Compare

the outputs

of

`FIRST_VALUE()`

and

`MIN()`

using

different

window frames.

---

# Interview Questions

## Beginner

1. What does `FIRST_VALUE()` return?

2. How does `FIRST_VALUE()` differ from `LAG()`?

3. Why is `ORDER BY` important for `FIRST_VALUE()`?

---

## Intermediate

1. How does `PARTITION BY` affect `FIRST_VALUE()`?

2. Why can `FIRST_VALUE()` and `MIN()` return different results?

3. How do window frames influence `FIRST_VALUE()`?

---

## Senior

1. Design a financial dashboard comparing each month's revenue with the first month's revenue.

2. Explain why understanding window frames is critical when using `FIRST_VALUE()`.

3. How would you optimize `FIRST_VALUE()` queries on very large datasets?

---

# Section Summary

In this section,

you learned:

- `FIRST_VALUE()` returns the value from the first row of the current window frame.
- It is commonly used to compare each row with a baseline, such as the highest salary or the first month's sales.
- `PARTITION BY` creates independent first values for each logical group.
- Unlike `MIN()`, `FIRST_VALUE()` depends on both the ordering and the current window frame.
- Understanding frame behavior is essential for using `FIRST_VALUE()` correctly in advanced analytics.

---

# Coming Up Next

## Section 37.20

# LAST_VALUE()

You'll learn:

- Retrieving the last value in a window.
- Why `LAST_VALUE()` often surprises beginners.
- The role of window frames.
- Comparing `FIRST_VALUE()` and `LAST_VALUE()`.
- Real-world business use cases.
- Common pitfalls and best practices.

# ==========================================================
# Section 37.20
# LAST_VALUE()
# ==========================================================

# Introduction

In the previous

section,

you learned

that

```
FIRST_VALUE()
```

returns

the value

from

the first row

of

the current

window frame.

Naturally,

you might

expect

```
LAST_VALUE()
```

to return

the value

from

the last row

of

the window.

While

that is

technically

true,

there is

an important

detail.

```
LAST_VALUE()
```

returns

the last value

of

the current

window frame,

not

necessarily

the last row

of

the entire

partition.

This

is one

of

the most

common

sources

of confusion

when

learning

Window Functions.

---

# What Is

LAST_VALUE()?

```
LAST_VALUE()
```

returns

the value

from

the last row

of

the current

window frame.

General

syntax

```sql
LAST_VALUE(expression)

OVER
(
    ORDER BY ...
)
```

Unlike

aggregate

functions,

it returns

a value

from

one row,

not

a calculated

summary.

---

# Employee

Table

| Employee | Salary |
|-----------|-------:|
|Charlie|80000|
|Alice|70000|
|Bob|65000|
|David|60000|
|Emma|55000|

---

# First

Attempt

```sql
SELECT

employee_name,

salary,

LAST_VALUE(salary)

OVER
(
ORDER BY salary DESC
)

AS last_salary

FROM employees;
```

Result

| Employee | Salary | LAST_VALUE |
|-----------|-------:|-----------:|
|Charlie|80000|80000|
|Alice|70000|70000|
|Bob|65000|65000|
|David|60000|60000|
|Emma|55000|55000|

Many

beginners

expect

every row

to show

```
55000.
```

Instead,

each row

returns

its own

salary.

Why?

Because

of

the default

window frame.

---

# The

Default

Frame

When

```
ORDER BY
```

is present,

the default

frame

extends

from

the first row

to

the current row.

Conceptually

```text
First Row

↓

Current Row
```

Therefore,

the last row

inside

the frame

is

always

the current

row.

As a result,

```
LAST_VALUE()
```

returns

the current

row's value.

---

# Visualizing

The Default

Frame

Current Row

Charlie

Frame

```text
Charlie
```

Last Value

```
80000
```

---

Current Row

Alice

Frame

```text
Charlie

Alice
```

Last Value

```
70000
```

---

Current Row

Bob

Frame

```text
Charlie

Alice

Bob
```

Last Value

```
65000
```

The last

row

of

each frame

is

the current

row.

---

# Retrieving

The True

Last Value

To retrieve

the last value

of

the entire

partition,

extend

the frame

to

the final

row.

```sql
SELECT

employee_name,

salary,

LAST_VALUE(salary)

OVER
(
ORDER BY salary DESC

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

UNBOUNDED FOLLOWING
)

AS lowest_salary

FROM employees;
```

Result

| Employee | Salary | Lowest Salary |
|-----------|-------:|--------------:|
|Charlie|80000|55000|
|Alice|70000|55000|
|Bob|65000|55000|
|David|60000|55000|
|Emma|55000|55000|

Now,

every row

returns

the salary

from

the final

row

of

the partition.

---

# Using

PARTITION BY

Business asks

```
Display

Every Employee

Along With

The Lowest

Salary

In

Their Department.
```

```sql
SELECT

employee_name,

department,

salary,

LAST_VALUE(salary)

OVER
(
PARTITION BY department

ORDER BY salary DESC

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

UNBOUNDED FOLLOWING
)

AS department_lowest_salary

FROM employees;
```

Each department

has

its own

last value.

---

# Comparing

With

The Last

Value

Business asks

```
How Much

More

Does

Each Employee

Earn

Compared

To

The Lowest

Salary?
```

```sql
SELECT

employee_name,

salary,

salary

-

LAST_VALUE(salary)

OVER
(
ORDER BY salary DESC

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

UNBOUNDED FOLLOWING
)

AS difference

FROM employees;
```

Result

| Employee | Difference |
|-----------|-----------:|
|Charlie|25000|
|Alice|15000|
|Bob|10000|
|David|5000|
|Emma|0|

---

# Time-Series

Example

Sales

Table

| Month | Sales |
|--------|------:|
|Jan|100|
|Feb|150|
|Mar|120|
|Apr|180|
|May|200|

Business asks

```
Compare

Every Month

With

May.
```

```sql
SELECT

month,

sales,

LAST_VALUE(sales)

OVER
(
ORDER BY month

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

UNBOUNDED FOLLOWING
)

AS may_sales

FROM monthly_sales;
```

Result

| Month | Sales | May Sales |
|--------|------:|----------:|
|Jan|100|200|
|Feb|150|200|
|Mar|120|200|
|Apr|180|200|
|May|200|200|

---

# FIRST_VALUE()

Vs

LAST_VALUE()

```
FIRST_VALUE()

↓

Beginning

Of

Frame
```

---

```
LAST_VALUE()

↓

End

Of

Frame
```

Both

depend

on

the current

window frame.

Changing

the frame

can change

both

results.

---

# Business

Applications

Finance

```text
Closing

Stock Price
```

---

Retail

```text
Final

Monthly

Sales
```

---

Healthcare

```text
Latest

Patient

Status
```

---

Manufacturing

```text
Final

Production

Output
```

---

HR

```text
Lowest

Department

Salary
```

---

# Enterprise

Example

Project

Progress

Business asks

```
Compare

Every Milestone

With

The Final

Project

Status.
```

Using

```
LAST_VALUE(),
```

every milestone

can be

compared

against

the project's

final

completion

state.

---

# Think Like

A Data

Analyst

Business asks

```
How Far

Away

Is

Each Month

From

The Year's

Final

Revenue?
```

Retrieve

December's

revenue

using

```
LAST_VALUE()
```

with

an

appropriate

window frame,

then

compare

every month

against it.

---

# Performance

Considerations

```
LAST_VALUE()
```

has

performance

characteristics

similar

to

```
FIRST_VALUE().
```

The

primary

cost

comes

from

sorting

the window

using

the

```
ORDER BY
```

columns.

Always

verify

execution

plans

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Remember that `LAST_VALUE()` depends on the current window frame.

✅ Explicitly specify the frame when you need the last value of the entire partition.

✅ Combine with `PARTITION BY` for group-level analysis.

✅ Use meaningful ordering columns.

✅ Test queries with different frame definitions.

---

# Common Mistakes

❌ Expecting `LAST_VALUE()` to automatically return the last row of the partition.

❌ Forgetting to extend the frame using `UNBOUNDED FOLLOWING`.

❌ Confusing `LAST_VALUE()` with `MAX()`.

❌ Ignoring the impact of the default frame.

❌ Ordering by the wrong column.

---

# PostgreSQL Practice Lab

## Exercise 1

Run

`LAST_VALUE()`

using

the default

frame.

Explain

why

each row

returns

its own

value.

---

## Exercise 2

Modify

the query

to return

the true

last value

of

the partition.

---

## Exercise 3

Display

the lowest

salary

within

each department

using

`PARTITION BY`.

---

## Exercise 4

Compare

monthly sales

with

the final

month's

sales.

---

## Exercise 5

Compare

the outputs

of

`LAST_VALUE()`

and

`MAX()`

using

different

window frames.

---

# Interview Questions

## Beginner

1. What does `LAST_VALUE()` return?

2. Why does `LAST_VALUE()` often surprise beginners?

3. How does the default window frame affect `LAST_VALUE()`?

---

## Intermediate

1. Why is `UNBOUNDED FOLLOWING` often required with `LAST_VALUE()`?

2. Compare `FIRST_VALUE()` and `LAST_VALUE()`.

3. How does `PARTITION BY` affect `LAST_VALUE()`?

---

## Senior

1. Explain why `LAST_VALUE()` and `MAX()` are not equivalent.

2. Design a dashboard comparing monthly performance with the year's final result using `LAST_VALUE()`.

3. How would you explain the relationship between window frames and `LAST_VALUE()` to a junior SQL developer?

---

# Section Summary

In this section,

you learned:

- `LAST_VALUE()` returns the value from the last row of the current window frame.
- With the default frame, it often returns the current row's value, which surprises many developers.
- To retrieve the last value of the entire partition, explicitly extend the frame using `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.
- `PARTITION BY` creates independent last values for each logical group.
- Understanding window frames is essential for using `LAST_VALUE()` correctly.

---

# Coming Up Next

## Section 37.21

# NTH_VALUE()

You'll learn:

- Retrieving the nth value in a window.
- Choosing any position within a window.
- Understanding frame dependence.
- Business reporting examples.
- Comparison with `FIRST_VALUE()` and `LAST_VALUE()`.
- Advanced analytical use cases.


# ==========================================================
# Section 37.21
# NTH_VALUE()
# ==========================================================

# Introduction

In the previous

sections,

you learned

about

```
FIRST_VALUE()
```

and

```
LAST_VALUE().
```

Those functions

retrieve

the first

or

last value

from

the current

window frame.

But

what if

the business

asks

```
Display

The Third

Highest

Salary.
```

Or

```
Compare

Every Month

With

The Second

Month

Of

The Year.
```

Neither

```
FIRST_VALUE()
```

nor

```
LAST_VALUE()
```

can answer

these questions.

For this,

PostgreSQL

provides

```
NTH_VALUE().
```

---

# What Is

NTH_VALUE()?

```
NTH_VALUE()
```

returns

the value

from

the

nth row

of

the current

window frame.

General

syntax

```sql
NTH_VALUE
(
expression,

n
)

OVER
(
    ORDER BY ...
)
```

Where

```
expression
```

is

the column

to retrieve,

and

```
n
```

is

the row

position

inside

the window frame.

---

# Employee

Table

| Employee | Salary |
|-----------|-------:|
|Charlie|80000|
|Alice|70000|
|Bob|65000|
|David|60000|
|Emma|55000|

---

# First

Attempt

```sql
SELECT

employee_name,

salary,

NTH_VALUE
(
salary,

3
)

OVER
(
ORDER BY salary DESC
)

AS third_highest_salary

FROM employees;
```

Result

| Employee | Salary | Third Highest |
|-----------|-------:|--------------:|
|Charlie|80000|NULL|
|Alice|70000|NULL|
|Bob|65000|65000|
|David|60000|65000|
|Emma|55000|65000|

Many

developers

find

this

surprising.

Why

are

the first

two rows

```
NULL?
```

The answer

is

the

window frame.

---

# Why

NULL

Appears

The default

window frame

extends

from

the first row

to

the current row.

Current Row

Charlie

Frame

```text
Charlie
```

There is

no

third row.

Therefore,

```
NULL
```

is returned.

---

Current Row

Alice

Frame

```text
Charlie

Alice
```

Still,

there is

no

third row.

Again,

```
NULL.
```

---

Current Row

Bob

Frame

```text
Charlie

Alice

Bob
```

Now,

the third

row exists.

Therefore,

```
65000
```

is returned.

---

# Retrieving

The True

Third Value

Suppose

Business asks

```
Display

The Third

Highest Salary

For

Every Employee.
```

Extend

the frame

to

the end

of

the partition.

```sql
SELECT

employee_name,

salary,

NTH_VALUE
(
salary,

3
)

OVER
(
ORDER BY salary DESC

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

UNBOUNDED FOLLOWING
)

AS third_highest_salary

FROM employees;
```

Result

| Employee | Salary | Third Highest |
|-----------|-------:|--------------:|
|Charlie|80000|65000|
|Alice|70000|65000|
|Bob|65000|65000|
|David|60000|65000|
|Emma|55000|65000|

Now,

every row

can see

the third

row

of

the entire

partition.

---

# Using

PARTITION BY

Business asks

```
Display

The Second

Highest

Salary

Within

Each Department.
```

```sql
SELECT

employee_name,

department,

salary,

NTH_VALUE
(
salary,

2
)

OVER
(
PARTITION BY department

ORDER BY salary DESC

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

UNBOUNDED FOLLOWING
)

AS second_highest_salary

FROM employees;
```

Each department

has

its own

second

highest

salary.

---

# Time-Series

Example

Sales

Table

| Month | Sales |
|--------|------:|
|Jan|100|
|Feb|150|
|Mar|120|
|Apr|180|
|May|200|

Business asks

```
Compare

Every Month

With

February's

Sales.
```

```sql
SELECT

month,

sales,

NTH_VALUE
(
sales,

2
)

OVER
(
ORDER BY month

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

UNBOUNDED FOLLOWING
)

AS february_sales

FROM monthly_sales;
```

Result

| Month | Sales | February Sales |
|--------|------:|---------------:|
|Jan|100|150|
|Feb|150|150|
|Mar|120|150|
|Apr|180|150|
|May|200|150|

---

# Comparing

FIRST_VALUE(),

NTH_VALUE(),

And

LAST_VALUE()

```
FIRST_VALUE()

↓

1st Row
```

---

```
NTH_VALUE()

↓

Nth Row
```

---

```
LAST_VALUE()

↓

Last Row
```

All three

depend

on

the current

window frame.

---

# Business

Applications

Finance

```text
Third

Highest

Stock Price
```

---

Retail

```text
Second

Best

Selling

Product
```

---

Healthcare

```text
Third

Patient

Visit
```

---

Education

```text
Second

Highest

Exam Score
```

---

HR

```text
Second

Highest

Salary
```

---

# Enterprise

Example

Sales

Performance

Business asks

```
Compare

Every Salesperson

With

The Third

Highest

Performer.
```

Instead

of using

complex

subqueries,

retrieve

the third

highest

sales value

using

```
NTH_VALUE().
```

---

# What

If

The Nth

Row

Does Not

Exist?

Suppose

the partition

contains

only

three rows,

but

the query

requests

```sql
NTH_VALUE
(
salary,

5
)
```

Since

there is

no

fifth row,

PostgreSQL

returns

```
NULL.
```

No error

occurs.

---

# Think Like

A Business

Analyst

Business asks

```
Compare

Every Store

With

The Second

Best

Performing

Store.
```

Using

```
NTH_VALUE(),
```

retrieve

the second

highest

sales

once,

then

compare

every store

against

that benchmark.

---

# Performance

Considerations

```
NTH_VALUE()
```

has

performance

characteristics

similar

to

```
FIRST_VALUE()
```

and

```
LAST_VALUE().
```

Sorting

based

on

the

```
ORDER BY
```

columns

is

the primary

cost.

Always

verify

query plans

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Specify a meaningful `ORDER BY`.

✅ Explicitly define the window frame when retrieving values from the entire partition.

✅ Use `PARTITION BY` for independent group analysis.

✅ Ensure the requested position exists.

✅ Use descriptive aliases.

---

# Common Mistakes

❌ Forgetting that `NTH_VALUE()` depends on the window frame.

❌ Expecting the nth value to exist in every frame.

❌ Ignoring `NULL` results when the requested position is unavailable.

❌ Ordering by the wrong column.

❌ Confusing `NTH_VALUE()` with ranking functions.

---

# PostgreSQL Practice Lab

## Exercise 1

Retrieve

the second

highest

salary

using

`NTH_VALUE()`.

---

## Exercise 2

Retrieve

the third

highest

salary

for

the entire

company.

---

## Exercise 3

Retrieve

the second

highest

salary

within

each department.

---

## Exercise 4

Compare

monthly sales

with

February's

sales.

---

## Exercise 5

Request

an

nth value

that does

not exist.

Explain

why

`NULL`

is returned.

---

# Interview Questions

## Beginner

1. What does `NTH_VALUE()` return?

2. Why can `NTH_VALUE()` return `NULL`?

3. Why is `ORDER BY` required?

---

## Intermediate

1. How does the window frame affect `NTH_VALUE()`?

2. Compare `FIRST_VALUE()`, `NTH_VALUE()`, and `LAST_VALUE()`.

3. How does `PARTITION BY` affect `NTH_VALUE()`?

---

## Senior

1. Design a dashboard comparing every employee with the second-highest salary in their department.

2. Explain why `NTH_VALUE()` often surprises developers using the default window frame.

3. How would you optimize `NTH_VALUE()` queries on large analytical datasets?

---

# Section Summary

In this section,

you learned:

- `NTH_VALUE()` returns the value from the nth row of the current window frame.
- Like `FIRST_VALUE()` and `LAST_VALUE()`, it depends on both the ordering and the window frame.
- With the default frame, early rows may return `NULL` because the requested nth row is not yet part of the frame.
- Extending the frame with `UNBOUNDED FOLLOWING` allows every row to access the nth value of the entire partition.
- `NTH_VALUE()` is useful for benchmarking against specific positions, such as the second-highest salary or third-best sales figure.

---

# Coming Up Next

## Section 37.22

# Advanced Window Frame Boundaries

You'll learn:

- `UNBOUNDED PRECEDING`
- `UNBOUNDED FOLLOWING`
- `CURRENT ROW`
- `n PRECEDING`
- `n FOLLOWING`
- Building custom rolling windows for advanced analytics.


# ==========================================================
# Section 37.22
# Advanced Window Frame Boundaries
# ==========================================================

# Introduction

In the previous

sections,

you learned

that

Window Frames

determine

which rows

participate

in

a Window Function.

You also

learned

that

the default

frame

is not

always

what

the business

requires.

Fortunately,

PostgreSQL

allows

you

to define

custom

frame boundaries.

This enables

advanced

analytics

such as

- Running Totals

- Moving Averages

- Rolling Windows

- Previous N Days

- Next N Days

- Financial Analysis

Understanding

frame boundaries

is one

of

the most

important

skills

for

advanced

Window Functions.

---

# General

Syntax

```sql
window_function()

OVER
(
    ORDER BY ...

    ROWS

    BETWEEN

    frame_start

    AND

    frame_end
)
```

The frame

is defined

using

two boundaries.

```
Start

↓

End
```

---

# Available

Frame

Boundaries

PostgreSQL

supports

five

major

boundary types.

```
UNBOUNDED PRECEDING
```

↓

Beginning

of

the partition.

---

```
CURRENT ROW
```

↓

The current

row.

---

```
UNBOUNDED FOLLOWING
```

↓

End

of

the partition.

---

```
n PRECEDING
```

↓

n rows

before

the current

row.

---

```
n FOLLOWING
```

↓

n rows

after

the current

row.

---

# Visualizing

A Window

Suppose

the table

contains

```text
Row 1

Row 2

Row 3

Row 4

Row 5
```

Current Row

↓

Row 3

```text
Row 1

Row 2

↓

Row 3

Row 4

Row 5
```

Every

boundary

is defined

relative

to

the current

row.

---

# UNBOUNDED

PRECEDING

Definition

```
UNBOUNDED PRECEDING
```

means

```
Start

At

The First

Row

Of

The Partition.
```

Example

```sql
ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
```

Frame

for

Row 4

```text
Row 1

Row 2

Row 3

↓

Row 4
```

This is

commonly used

for

running totals.

---

# UNBOUNDED

FOLLOWING

Definition

```
UNBOUNDED FOLLOWING
```

means

```
Continue

Until

The Last

Row

Of

The Partition.
```

Example

```sql
ROWS

BETWEEN

CURRENT ROW

AND

UNBOUNDED FOLLOWING
```

Frame

for

Row 3

```text
↓

Row 3

Row 4

Row 5
```

Useful

for

future-looking

analysis.

---

# CURRENT

ROW

Definition

```
CURRENT ROW
```

represents

the current

row

being processed.

Example

```sql
ROWS

BETWEEN

CURRENT ROW

AND

CURRENT ROW
```

Frame

```text
↓

Row 3
```

Only

one row

is included.

---

# n

PRECEDING

Definition

```
2 PRECEDING
```

means

```
Two Rows

Before

Current Row
```

Example

```sql
ROWS

BETWEEN

2 PRECEDING

AND

CURRENT ROW
```

Frame

for

Row 4

```text
Row 2

Row 3

↓

Row 4
```

Useful

for

moving

averages.

---

# n

FOLLOWING

Definition

```
2 FOLLOWING
```

means

```
Two Rows

After

Current Row
```

Example

```sql
ROWS

BETWEEN

CURRENT ROW

AND

2 FOLLOWING
```

Frame

for

Row 2

```text
↓

Row 2

Row 3

Row 4
```

Useful

for

forecasting

and

planning.

---

# Complete

Boundary

Examples

Beginning

↓

Current Row

```sql
ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
```

Running

Totals

---

Current Row

↓

End

```sql
ROWS

BETWEEN

CURRENT ROW

AND

UNBOUNDED FOLLOWING
```

Remaining

Totals

---

Two Rows

↓

Current Row

```sql
ROWS

BETWEEN

2 PRECEDING

AND

CURRENT ROW
```

Moving

Average

---

Current Row

↓

Two Rows

Ahead

```sql
ROWS

BETWEEN

CURRENT ROW

AND

2 FOLLOWING
```

Future

Planning

---

One Row

Before

↓

One Row

After

```sql
ROWS

BETWEEN

1 PRECEDING

AND

1 FOLLOWING
```

Sliding

Window

---

# Running

Total

Example

```sql
SELECT

month,

sales,

SUM(sales)

OVER
(
ORDER BY month

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)

AS running_total

FROM monthly_sales;
```

Every row

includes

all

previous rows.

---

# Three-Month

Moving Average

```sql
SELECT

month,

sales,

AVG(sales)

OVER
(
ORDER BY month

ROWS

BETWEEN

2 PRECEDING

AND

CURRENT ROW
)

AS moving_average

FROM monthly_sales;
```

Each row

uses

the current

month

and

the previous

two months.

---

# Remaining

Revenue

Example

```sql
SELECT

month,

sales,

SUM(sales)

OVER
(
ORDER BY month

ROWS

BETWEEN

CURRENT ROW

AND

UNBOUNDED FOLLOWING
)

AS remaining_revenue

FROM monthly_sales;
```

Each row

shows

the revenue

still remaining

after

the current

month.

---

# Business

Applications

Finance

```text
Running

Balance
```

---

Retail

```text
Rolling

Sales

Average
```

---

Healthcare

```text
Previous

Three Visits
```

---

Manufacturing

```text
Next

Production

Schedule
```

---

Logistics

```text
Future

Deliveries
```

---

# Choosing

The Correct

Frame

Need

all previous

rows?

↓

Use

```
UNBOUNDED PRECEDING
```

---

Need

only

recent rows?

↓

Use

```
n PRECEDING
```

---

Need

future rows?

↓

Use

```
n FOLLOWING
```

---

Need

entire

partition?

↓

Use

```
UNBOUNDED PRECEDING

↓

UNBOUNDED FOLLOWING
```

---

# Think Like

A Financial

Analyst

Business asks

```
Calculate

The Average

Revenue

Over

The Last

Three Months.
```

Using

```
ROWS

BETWEEN

2 PRECEDING

AND

CURRENT ROW
```

creates

a rolling

three-month

window,

which is

far more

useful

than

averaging

the entire

year.

---

# Performance

Considerations

Smaller

window frames

often require

less data

to participate

in

each calculation,

but

overall

performance

still depends

primarily

on

sorting

and

execution

strategy.

Always

analyze

complex

queries

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Explicitly define frame boundaries for complex analytics.

✅ Match frame definitions to business requirements.

✅ Use rolling windows for moving calculations.

✅ Test edge cases near the beginning and end of partitions.

✅ Document non-default frame definitions in production SQL.

---

# Common Mistakes

❌ Assuming the default frame always matches business requirements.

❌ Confusing `PRECEDING` with `FOLLOWING`.

❌ Forgetting that boundaries are relative to the current row.

❌ Using overly large frames when smaller ones are sufficient.

❌ Ignoring edge rows where fewer preceding or following rows exist.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a running

total

using

`UNBOUNDED PRECEDING`.

---

## Exercise 2

Calculate

a three-row

moving average

using

`2 PRECEDING`.

---

## Exercise 3

Calculate

the remaining

sales

after

each month

using

`UNBOUNDED FOLLOWING`.

---

## Exercise 4

Create

a sliding

window

using

`1 PRECEDING`

and

`1 FOLLOWING`.

---

## Exercise 5

Explain

how

changing

the frame

changes

the calculation.

---

# Interview Questions

## Beginner

1. What is a window frame boundary?

2. What does `UNBOUNDED PRECEDING` mean?

3. What does `CURRENT ROW` represent?

---

## Intermediate

1. Compare `n PRECEDING` and `UNBOUNDED PRECEDING`.

2. When would you use `UNBOUNDED FOLLOWING`?

3. Explain a real-world use case for `1 PRECEDING AND 1 FOLLOWING`.

---

## Senior

1. Design a rolling three-month revenue dashboard using custom frame boundaries.

2. Explain how frame boundaries influence navigation functions such as `FIRST_VALUE()` and `LAST_VALUE()`.

3. How would you choose frame boundaries for financial, healthcare, and logistics analytics?

---

# Section Summary

In this section,

you learned:

- Window frame boundaries define the exact rows used in each window calculation.
- PostgreSQL supports `UNBOUNDED PRECEDING`, `CURRENT ROW`, `UNBOUNDED FOLLOWING`, `n PRECEDING`, and `n FOLLOWING`.
- Custom frame boundaries enable running totals, moving averages, rolling windows, and future-looking analytics.
- Choosing the correct frame boundaries is essential for producing accurate business reports.
- Understanding boundaries is the foundation for advanced analytical SQL.

---

# Coming Up Next

## Section 37.23

# Running Totals

You'll learn:

- Building cumulative totals.
- Running balances.
- Financial dashboards.
- Inventory tracking.
- Performance optimization.
- Enterprise reporting examples.



# ==========================================================
# Section 37.23
# Running Totals
# ==========================================================

# Introduction

One of

the most

common

applications

of

Window Functions

is

calculating

running totals.

A

running total

is

a cumulative

sum

that grows

as

each new

row

is processed.

Businesses

use

running totals

to answer

questions

such as

- How much revenue has been earned so far?

- What is the current account balance?

- How many products have been sold up to today?

- What is the cumulative production output?

Running totals

appear

in

almost every

BI dashboard,

financial report,

and

analytical system.

---

# What Is

A Running

Total?

A

running total

adds

the current

row

to

all previous

rows.

Suppose

daily sales

are

| Day | Sales |
|-----|------:|
|Mon|100|
|Tue|200|
|Wed|150|
|Thu|250|
|Fri|300|

Running Total

becomes

| Day | Sales | Running Total |
|-----|------:|--------------:|
|Mon|100|100|
|Tue|200|300|
|Wed|150|450|
|Thu|250|700|
|Fri|300|1000|

Each row

includes

everything

before it.

---

# SQL

Solution

```sql
SELECT

day,

sales,

SUM(sales)

OVER
(
ORDER BY day

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)

AS running_total

FROM daily_sales;
```

This is

the standard

running total

pattern

used

in

PostgreSQL.

---

# Visualizing

The Frame

Current Row

↓

Monday

Frame

```text
Monday
```

Total

```
100
```

---

Current Row

↓

Tuesday

Frame

```text
Monday

Tuesday
```

Total

```
300
```

---

Current Row

↓

Wednesday

Frame

```text
Monday

Tuesday

Wednesday
```

Total

```
450
```

The frame

grows

with

every row.

---

# Why

Use

ROWS?

Although

the query

works

without

explicitly

writing

the frame,

production

code

should

prefer

```sql
ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
```

instead

of relying

on

the default

```
RANGE
```

frame.

This avoids

unexpected

behavior

when

duplicate

ordering values

exist.

---

# Running

Balance

Example

Bank

Transactions

| Date | Amount |
|------|-------:|
|1 Jan|500|
|2 Jan|-100|
|3 Jan|200|
|4 Jan|-50|

Query

```sql
SELECT

transaction_date,

amount,

SUM(amount)

OVER
(
ORDER BY transaction_date

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)

AS account_balance

FROM transactions;
```

Result

| Date | Amount | Balance |
|------|-------:|--------:|
|1 Jan|500|500|
|2 Jan|-100|400|
|3 Jan|200|600|
|4 Jan|-50|550|

---

# Using

PARTITION BY

Business asks

```
Calculate

Running Sales

For

Each Store.
```

```sql
SELECT

store_id,

sale_date,

sales,

SUM(sales)

OVER
(
PARTITION BY store_id

ORDER BY sale_date

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)

AS running_store_sales

FROM store_sales;
```

Each store

has

its own

independent

running total.

---

# Inventory

Tracking

Inventory

Movements

| Date | Quantity |
|------|---------:|
|1 Jan|100|
|2 Jan|-20|
|3 Jan|50|
|4 Jan|-10|

Query

```sql
SELECT

movement_date,

quantity,

SUM(quantity)

OVER
(
ORDER BY movement_date

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)

AS inventory_level

FROM inventory_transactions;
```

The report

shows

stock levels

after

every transaction.

---

# Revenue

Dashboard

Business asks

```
Display

Revenue

Earned

So Far

Each Month.
```

```sql
SELECT

month,

revenue,

SUM(revenue)

OVER
(
ORDER BY month

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)

AS cumulative_revenue

FROM monthly_revenue;
```

The dashboard

shows

progress

throughout

the year.

---

# Running

Count

Running totals

are not

limited

to

```
SUM().
```

Example

```sql
SELECT

order_date,

COUNT(*)

OVER
(
ORDER BY order_date

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)

AS running_orders

FROM orders;
```

Each row

shows

how many

orders

have occurred

so far.

---

# Running

Average

```sql
SELECT

month,

sales,

AVG(sales)

OVER
(
ORDER BY month

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)

AS cumulative_average

FROM monthly_sales;
```

Each row

calculates

the average

up to

that point.

---

# Business

Applications

Finance

```text
Running

Account

Balance
```

---

Retail

```text
Running

Revenue
```

---

Healthcare

```text
Patients

Processed

So Far
```

---

Manufacturing

```text
Production

Completed
```

---

Logistics

```text
Packages

Delivered
```

---

# Why

Window

Functions?

Before

Window Functions,

running totals

required

SELF JOINs

or

correlated

subqueries.

Example

conceptually

```text
Current Row

↓

Find

Every

Previous Row

↓

Calculate

SUM()
```

Window Functions

perform

this

much more

efficiently

and

produce

far simpler

SQL.

---

# Think Like

A CFO

Business asks

```
How Much

Revenue

Has

The Company

Generated

So Far

This Year?
```

The report

should

update

after

every month.

A running

total

provides

exactly

this view,

making it

one of

the most

important

financial

analytics

patterns.

---

# Performance

Considerations

Running totals

require

sorting

using

the

```
ORDER BY
```

columns.

For

very large

datasets,

proper

indexes

on

the ordering

columns

can improve

overall

query performance.

Always

verify

execution

plans

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Use `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` explicitly.

✅ Choose deterministic ordering columns.

✅ Combine with `PARTITION BY` for group-level running totals.

✅ Test duplicate ordering values.

✅ Validate cumulative calculations against expected business totals.

---

# Common Mistakes

❌ Relying on the default `RANGE` frame.

❌ Ordering by the wrong column.

❌ Forgetting `PARTITION BY` when separate running totals are required.

❌ Assuming the output order controls the calculation order.

❌ Using SELF JOINs when a Window Function is more appropriate.

---

# PostgreSQL Practice Lab

## Exercise 1

Calculate

a running

sales total

using

`SUM()`.

---

## Exercise 2

Calculate

a running

account

balance

using

positive

and

negative

transactions.

---

## Exercise 3

Calculate

running

sales

for

each store

using

`PARTITION BY`.

---

## Exercise 4

Create

a running

count

of

orders.

---

## Exercise 5

Compare

running totals

using

the default

frame

and

an explicit

`ROWS`

frame

when

duplicate

ordering values

exist.

---

# Interview Questions

## Beginner

1. What is a running total?

2. Which Window Function is commonly used to create running totals?

3. Why is `ORDER BY` required?

---

## Intermediate

1. Why is `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` preferred over the default frame?

2. How does `PARTITION BY` affect running totals?

3. Give three business examples where running totals are useful.

---

## Senior

1. Design a financial reporting system that calculates running balances for millions of transactions.

2. Explain why running totals using Window Functions outperform traditional SELF JOIN approaches.

3. How would you optimize cumulative calculations in a high-volume PostgreSQL data warehouse?

---

# Section Summary

In this section,

you learned:

- Running totals calculate cumulative values from the beginning of a partition through the current row.
- The standard pattern uses `SUM()` with `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.
- Running totals can also be created using other aggregate window functions such as `COUNT()` and `AVG()`.
- `PARTITION BY` creates independent running totals for logical groups such as stores, departments, or customers.
- Running totals are one of the most widely used analytical patterns in finance, retail, healthcare, logistics, and manufacturing.

---

# Coming Up Next

## Section 37.24

# Moving Averages

You'll learn:

- Rolling averages.
- Sliding windows.
- Three-day and seven-day moving averages.
- Trend analysis.
- Forecasting.
- Business intelligence dashboards.


# ==========================================================
# Section 37.24
# Moving Averages
# ==========================================================

# Introduction

Unlike

running totals,

which include

all previous

rows,

a

moving average

uses

only

a fixed

number

of

recent rows.

Businesses

use

moving averages

to

smooth

short-term

fluctuations

and

identify

long-term

trends.

Common

examples

include

- Stock Prices

- Daily Sales

- Website Traffic

- Manufacturing Output

- Patient Admissions

- Temperature Analysis

Moving averages

are among

the most

important

analytical

techniques

used

in

Business Intelligence

and

Data Science.

---

# What Is

A Moving

Average?

A

moving average

calculates

the average

of

the current row

and

a fixed

number

of

nearby rows.

Unlike

running totals,

the window

does not

continuously

grow.

Instead,

it slides

forward

one row

at

a time.

---

# Sales

Table

| Day | Sales |
|-----|------:|
|Mon|100|
|Tue|200|
|Wed|150|
|Thu|250|
|Fri|300|
|Sat|220|
|Sun|280|

---

# Three-Day

Moving

Average

Business asks

```
Calculate

The Average

Sales

For

The Current

Day

And

The Previous

Two Days.
```

Query

```sql
SELECT

day,

sales,

AVG(sales)

OVER
(
ORDER BY day

ROWS

BETWEEN

2 PRECEDING

AND

CURRENT ROW
)

AS moving_average

FROM daily_sales;
```

Result

| Day | Sales | Moving Average |
|-----|------:|---------------:|
|Mon|100|100.00|
|Tue|200|150.00|
|Wed|150|150.00|
|Thu|250|200.00|
|Fri|300|233.33|
|Sat|220|256.67|
|Sun|280|266.67|

---

# Visualizing

The Window

Current Row

↓

Wednesday

Frame

```text
Monday

Tuesday

↓

Wednesday
```

Average

```
(100+200+150)

/

3
```

---

Current Row

↓

Thursday

Frame

```text
Tuesday

Wednesday

↓

Thursday
```

Average

```
(200+150+250)

/

3
```

The frame

slides

forward

one row

at

a time.

---

# Seven-Day

Moving

Average

```sql
SELECT

day,

sales,

AVG(sales)

OVER
(
ORDER BY day

ROWS

BETWEEN

6 PRECEDING

AND

CURRENT ROW
)

AS moving_average

FROM daily_sales;
```

This pattern

is commonly

used

for

weekly

trend analysis.

---

# Centered

Moving

Average

Sometimes

Business asks

```
Average

The Current

Day,

One Previous

Day,

And

One Next

Day.
```

Query

```sql
SELECT

day,

sales,

AVG(sales)

OVER
(
ORDER BY day

ROWS

BETWEEN

1 PRECEDING

AND

1 FOLLOWING
)

AS centered_average

FROM daily_sales;
```

Each row

uses

three

neighboring

rows.

---

# Visualizing

Centered

Window

Current Row

↓

Wednesday

```text
Tuesday

↓

Wednesday

Thursday
```

Average

uses

all

three rows.

---

# Using

PARTITION BY

Business asks

```
Calculate

A Three-Day

Moving Average

For

Each Store.
```

```sql
SELECT

store_id,

sale_date,

sales,

AVG(sales)

OVER
(
PARTITION BY store_id

ORDER BY sale_date

ROWS

BETWEEN

2 PRECEDING

AND

CURRENT ROW
)

AS moving_average

FROM store_sales;
```

Each store

has

its own

moving average.

---

# Rolling

Maximum

Moving windows

are not

limited

to

averages.

Example

```sql
SELECT

day,

sales,

MAX(sales)

OVER
(
ORDER BY day

ROWS

BETWEEN

2 PRECEDING

AND

CURRENT ROW
)

AS rolling_max

FROM daily_sales;
```

Shows

the highest

sales

during

the last

three days.

---

# Rolling

Minimum

```sql
SELECT

day,

sales,

MIN(sales)

OVER
(
ORDER BY day

ROWS

BETWEEN

2 PRECEDING

AND

CURRENT ROW
)

AS rolling_min

FROM daily_sales;
```

Displays

the lowest

sales

within

the moving

window.

---

# Rolling

Sum

```sql
SELECT

day,

sales,

SUM(sales)

OVER
(
ORDER BY day

ROWS

BETWEEN

6 PRECEDING

AND

CURRENT ROW
)

AS rolling_week_sales

FROM daily_sales;
```

Calculates

sales

over

the latest

seven days.

---

# Business

Applications

Finance

```text
Moving

Stock Price

Average
```

---

Retail

```text
Rolling

Sales

Trend
```

---

Healthcare

```text
Average

Patient

Admissions
```

---

Manufacturing

```text
Rolling

Production

Output
```

---

Weather

```text
Seven-Day

Temperature

Average
```

---

# Why

Moving

Averages?

Suppose

daily sales

are

```text
100

500

120

480

130

520
```

The raw

data

is difficult

to interpret.

A moving

average

smooths

these

fluctuations,

making

overall

trends

much easier

to identify.

---

# Think Like

A Business

Analyst

Business asks

```
Ignore

Daily

Fluctuations.

Show

The Overall

Sales

Trend.
```

Instead

of plotting

raw sales,

calculate

a

seven-day

moving average.

Management

can now

identify

the long-term

direction

of

sales.

---

# Performance

Considerations

Moving averages

require

sorting

using

the

```
ORDER BY
```

columns.

Smaller

window frames

generally

process

fewer rows

per calculation,

but

overall

performance

still depends

primarily

on

sorting

and

execution

strategy.

Always

validate

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Choose a window size that matches the business requirement.

✅ Use `ROWS` for row-based moving calculations.

✅ Combine with `PARTITION BY` for independent rolling analytics.

✅ Test edge rows where fewer preceding rows exist.

✅ Clearly document the window size in production reports.

---

# Common Mistakes

❌ Confusing moving averages with running averages.

❌ Choosing an inappropriate window size.

❌ Forgetting that early rows have fewer preceding rows.

❌ Ordering by the wrong column.

❌ Using `RANGE` when row-based windows are required.

---

# PostgreSQL Practice Lab

## Exercise 1

Calculate

a three-day

moving average

for

daily sales.

---

## Exercise 2

Calculate

a seven-day

moving average.

---

## Exercise 3

Create

a centered

moving average

using

`1 PRECEDING`

and

`1 FOLLOWING`.

---

## Exercise 4

Calculate

a rolling

maximum

over

the last

five rows.

---

## Exercise 5

Calculate

moving averages

independently

for

each store

using

`PARTITION BY`.

---

# Interview Questions

## Beginner

1. What is a moving average?

2. How does a moving average differ from a running total?

3. Why is `ORDER BY` required?

---

## Intermediate

1. Explain `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW`.

2. Why do early rows have smaller windows?

3. Give three business examples where moving averages are useful.

---

## Senior

1. Design a sales trend dashboard using moving averages.

2. Compare running averages and moving averages.

3. How would you optimize rolling-window calculations on billions of records?

---

# Section Summary

In this section,

you learned:

- Moving averages calculate statistics over a fixed-size sliding window.
- `ROWS BETWEEN n PRECEDING AND CURRENT ROW` is the standard pattern for rolling analytics.
- Moving windows can be used with `AVG()`, `SUM()`, `MIN()`, `MAX()`, and other aggregate window functions.
- `PARTITION BY` enables independent moving averages for each business entity.
- Moving averages smooth short-term fluctuations and reveal long-term trends, making them invaluable for business intelligence and forecasting.

---

# Coming Up Next

## Section 37.25

# Top-N Per Group

You'll learn:

- Finding the top N rows within each group.
- Using `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`.
- Handling ties.
- Department-wise top performers.
- Customer-wise latest records.
- Enterprise interview patterns.


# ==========================================================
# Section 37.25
# Top-N Per Group
# ==========================================================

# Introduction

One of

the most

frequently

asked

business

questions

is

```
Who

Are

The Top

N

Performers

Within

Each Group?
```

Examples

include

- Top 3 Employees per Department

- Top 5 Selling Products per Category

- Latest Order per Customer

- Highest Scoring Students per Class

- Largest Transactions per Account

Before

Window Functions,

these queries

often required

complex

SELF JOINs

or

correlated

subqueries.

Today,

they are

solved

using

ranking

Window Functions.

---

# What Is

Top-N

Per Group?

Instead

of finding

the top

N rows

for

the entire

table,

we find

the top

N rows

inside

each

partition.

Example

Departments

```text
IT

↓

Top 3

Employees

================

HR

↓

Top 3

Employees

================

Finance

↓

Top 3

Employees
```

Each group

is processed

independently.

---

# Employee

Table

| Employee | Department | Salary |
|-----------|------------|-------:|
|Charlie|IT|80000|
|Alice|IT|70000|
|Bob|IT|65000|
|David|HR|60000|
|Emma|HR|55000|
|Frank|HR|50000|

---

# Using

ROW_NUMBER()

Business asks

```
Display

The Highest

Paid

Employee

In

Each Department.
```

```sql
SELECT *

FROM
(
    SELECT

    employee_name,

    department,

    salary,

    ROW_NUMBER()

    OVER
    (
        PARTITION BY department

        ORDER BY salary DESC
    )

    AS rn

    FROM employees
)

AS ranked

WHERE rn = 1;
```

Result

| Employee | Department | Salary |
|-----------|------------|-------:|
|Charlie|IT|80000|
|David|HR|60000|

---

# Top

Three

Employees

```sql
SELECT *

FROM
(
    SELECT

    employee_name,

    department,

    salary,

    ROW_NUMBER()

    OVER
    (
        PARTITION BY department

        ORDER BY salary DESC
    )

    AS rn

    FROM employees
)

AS ranked

WHERE rn <= 3;
```

Each department

returns

its own

top

three

employees.

---

# Why

Use

ROW_NUMBER()?

```
ROW_NUMBER()
```

guarantees

exactly

N rows

per partition,

provided

the partition

contains

at least

N rows.

This makes

it ideal

when

ties

should

not

produce

extra rows.

---

# Using

RANK()

Suppose

Business asks

```
Include

Employees

Who

Tie

For

Third Place.
```

```sql
SELECT *

FROM
(
    SELECT

    employee_name,

    department,

    salary,

    RANK()

    OVER
    (
        PARTITION BY department

        ORDER BY salary DESC
    )

    AS salary_rank

    FROM employees
)

AS ranked

WHERE salary_rank <= 3;
```

If

multiple

employees

share

third place,

all

are returned.

The result

may contain

more than

three rows

per department.

---

# Using

DENSE_RANK()

```sql
SELECT *

FROM
(
    SELECT

    employee_name,

    department,

    salary,

    DENSE_RANK()

    OVER
    (
        PARTITION BY department

        ORDER BY salary DESC
    )

    AS salary_rank

    FROM employees
)

AS ranked

WHERE salary_rank <= 3;
```

This returns

the top

three

distinct

salary levels

without

gaps

in ranking.

---

# Choosing

The Correct

Function

Need

exactly

N rows?

↓

Use

```
ROW_NUMBER()
```

---

Need

ties,

even

if

extra rows

appear?

↓

Use

```
RANK()
```

---

Need

continuous

ranking

without

gaps?

↓

Use

```
DENSE_RANK()
```

Choosing

the correct

ranking function

depends

entirely

on

the business

requirement.

---

# Latest

Record

Per Customer

Business asks

```
Display

The Latest

Order

For

Each Customer.
```

```sql
SELECT *

FROM
(
    SELECT

    customer_id,

    order_date,

    ROW_NUMBER()

    OVER
    (
        PARTITION BY customer_id

        ORDER BY order_date DESC
    )

    AS rn

    FROM orders
)

AS ranked

WHERE rn = 1;
```

This is

one of

the most

common

Window Function

patterns

used

in

ETL

and

Data Warehousing.

---

# Highest

Selling

Product

Per Category

```sql
SELECT *

FROM
(
    SELECT

    category,

    product_name,

    sales,

    ROW_NUMBER()

    OVER
    (
        PARTITION BY category

        ORDER BY sales DESC
    )

    AS rn

    FROM products
)

AS ranked

WHERE rn = 1;
```

Each category

returns

its

best-selling

product.

---

# Business

Applications

HR

```text
Top Employees

Per Department
```

---

Retail

```text
Top Products

Per Category
```

---

Finance

```text
Largest

Transactions

Per Customer
```

---

Healthcare

```text
Latest

Patient Visit
```

---

Education

```text
Top Students

Per Class
```

---

# Why

Window

Functions?

Before

Window Functions,

Top-N

queries

often required

correlated

subqueries,

SELF JOINs,

or

vendor-specific

SQL.

Ranking

functions

make

these queries

simpler,

more readable,

and

usually

more efficient.

---

# Think Like

A Data

Engineer

Business asks

```
Keep

Only

The Most

Recent

Record

For

Every Customer.
```

Assign

```
ROW_NUMBER()

OVER

(
PARTITION BY customer_id

ORDER BY updated_at DESC
)
```

Then

keep

```
ROW_NUMBER() = 1.
```

This pattern

appears

in

almost every

ETL pipeline,

data warehouse,

and

Slowly Changing

Dimension

implementation.

---

# Performance

Considerations

Top-N

queries

require

sorting

inside

each partition.

Indexes

supporting

the

partition

and

ordering

columns

may improve

overall

performance.

For example,

an index

on

```sql
(department, salary DESC)
```

may help

queries

that partition

by

department

and

order

by

salary.

Always

verify

performance

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Use `ROW_NUMBER()` when exactly N rows are required.

✅ Use `RANK()` when ties should be included.

✅ Use `DENSE_RANK()` for continuous ranking without gaps.

✅ Use deterministic ordering columns.

✅ Filter the ranking in an outer query or Common Table Expression (CTE).

---

# Common Mistakes

❌ Using `ROW_NUMBER()` when tied rows should be included.

❌ Forgetting `PARTITION BY`.

❌ Ordering by the wrong column.

❌ Assuming Top-N means the entire table instead of each group.

❌ Ignoring tie-breaking columns for deterministic results.

---

# PostgreSQL Practice Lab

## Exercise 1

Retrieve

the highest-paid

employee

from

each department.

---

## Exercise 2

Retrieve

the top

three

highest-paid

employees

from

each department.

---

## Exercise 3

Insert

duplicate

salary values.

Compare

`ROW_NUMBER()`,

`RANK()`,

and

`DENSE_RANK()`

for

Top-3

queries.

---

## Exercise 4

Retrieve

the latest

order

for

each customer.

---

## Exercise 5

Retrieve

the best-selling

product

from

each product

category.

---

# Interview Questions

## Beginner

1. What is a Top-N per Group query?

2. Why is `PARTITION BY` required?

3. Which ranking function guarantees exactly N rows?

---

## Intermediate

1. Compare `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` for Top-N queries.

2. Why can `RANK()` return more than N rows?

3. How would you retrieve the latest record for each customer?

---

## Senior

1. Design a deduplication pipeline using `ROW_NUMBER()` for a large data warehouse.

2. Explain how index design affects Top-N per Group queries.

3. How would you optimize a Top-10 per category report over billions of records?

---

# Section Summary

In this section,

you learned:

- Top-N per Group queries retrieve the highest-ranked rows within each partition rather than across the entire table.
- `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` each support different business rules for handling ties.
- The "latest record per business key" pattern using `ROW_NUMBER() = 1` is one of the most common SQL interview and ETL questions.
- Proper partitioning, ordering, and indexing are critical for both correctness and performance.
- Top-N per Group is a foundational analytical pattern used across finance, retail, healthcare, education, and data engineering.

---

# Coming Up Next

## Section 37.26

# Gap and Island Problems

You'll learn:

- What Gap and Island problems are.
- Detecting consecutive sequences.
- Finding missing dates and IDs.
- Identifying continuous activity periods.
- Advanced interview patterns.
- Enterprise analytics use cases.

# ==========================================================
# Section 37.26
# Gap and Island Problems
# ==========================================================

# Introduction

One of

the most

popular

advanced SQL

interview topics

is

the

```
Gap

And

Island

Problem.
```

Almost

every

large company

including

product-based

companies,

banks,

and

data engineering

teams

asks

some variation

of

this problem.

Businesses

often need

to identify

- Consecutive login days

- Continuous purchase periods

- Missing invoice numbers

- Missing dates

- Consecutive machine uptime

- Continuous stock availability

Window Functions

make

these problems

far easier

than

traditional

SQL approaches.

---

# What Is

A Gap?

A

Gap

is

a break

between

two

expected

values.

Examples

include

```text
Order IDs

1

2

3

6

7

10
```

Missing

values

```text
4

5

8

9
```

These

missing values

represent

gaps.

---

# What Is

An Island?

An

Island

is

a continuous

sequence

of values.

Example

Login Days

```text
1 Jan

2 Jan

3 Jan

----------------

7 Jan

8 Jan

----------------

15 Jan

16 Jan

17 Jan
```

The data

contains

three

islands

of

continuous

activity.

---

# Business

Examples

Finance

```text
Missing

Transaction IDs
```

---

Retail

```text
Continuous

Sales

Periods
```

---

Healthcare

```text
Consecutive

Patient Visits
```

---

Manufacturing

```text
Machine

Downtime
```

---

Logistics

```text
Shipment

Delays
```

---

# Why

Are

Gap

And

Island

Problems

Important?

Businesses

often ask

questions

such as

```
How Many

Consecutive Days

Did

A Customer

Visit?
```

or

```
Which Dates

Contain

Missing

Sales Records?
```

These

cannot

be answered

using

simple

aggregations.

---

# Sample

Attendance

Table

| Date |
|------|
|2026-01-01|
|2026-01-02|
|2026-01-03|
|2026-01-06|
|2026-01-07|
|2026-01-10|

Notice

the

missing

dates.

---

# Detecting

Gaps

Using

LAG()

```sql
SELECT

attendance_date,

LAG(attendance_date)

OVER
(
ORDER BY attendance_date
)

AS previous_date

FROM attendance;
```

Result

| Date | Previous Date |
|------|---------------|
|1 Jan|NULL|
|2 Jan|1 Jan|
|3 Jan|2 Jan|
|6 Jan|3 Jan|
|7 Jan|6 Jan|
|10 Jan|7 Jan|

---

# Finding

Missing

Days

```sql
SELECT

attendance_date,

attendance_date

-

LAG(attendance_date)

OVER
(
ORDER BY attendance_date
)

AS day_difference

FROM attendance;
```

Result

| Date | Difference |
|------|-----------:|
|1 Jan|NULL|
|2 Jan|1|
|3 Jan|1|
|6 Jan|3|
|7 Jan|1|
|10 Jan|3|

Whenever

the difference

is greater

than

```
1,
```

a gap

exists.

---

# Detecting

Consecutive

Records

Suppose

Business asks

```
Find

Continuous

Login

Sequences.
```

Rows

having

a difference

of exactly

```
1 day
```

belong

to

the same

island.

Rows

with

larger gaps

start

new

islands.

---

# The

Classic

Island

Technique

One of

the most

common

solutions

uses

```
ROW_NUMBER().
```

Example

Data

| Date |
|------|
|1 Jan|
|2 Jan|
|3 Jan|
|6 Jan|
|7 Jan|

Assign

row numbers.

| Date | Row Number |
|------|-----------:|
|1 Jan|1|
|2 Jan|2|
|3 Jan|3|
|6 Jan|4|
|7 Jan|5|

Now

calculate

```text
Date

-

Row Number
```

Rows

belonging

to

the same

continuous

sequence

produce

the same

result.

This

derived value

becomes

the

island

identifier.

---

# Example

```sql
SELECT

attendance_date,

attendance_date

-

ROW_NUMBER()

OVER
(
ORDER BY attendance_date
)

AS island_id

FROM attendance;
```

Rows

sharing

the same

```
island_id
```

belong

to

the same

continuous

sequence.

---

# Grouping

The Islands

```sql
SELECT

MIN(attendance_date)

AS start_date,

MAX(attendance_date)

AS end_date,

COUNT(*)

AS consecutive_days

FROM
(
    SELECT

    attendance_date,

    attendance_date

    -

    ROW_NUMBER()

    OVER
    (
        ORDER BY attendance_date
    )

    AS island_id

    FROM attendance
)

AS islands

GROUP BY island_id;
```

Example

Result

| Start | End | Days |
|------|------|----:|
|1 Jan|3 Jan|3|
|6 Jan|7 Jan|2|
|10 Jan|10 Jan|1|

---

# Customer

Purchase

Streak

Business asks

```
How Many

Consecutive

Days

Did

Each Customer

Purchase?
```

```sql
ROW_NUMBER()

OVER
(
PARTITION BY customer_id

ORDER BY purchase_date
)
```

Each customer

receives

independent

islands.

---

# Machine

Uptime

Business asks

```
Identify

Continuous

Machine

Operation.
```

Each

continuous

operating

period

forms

an island.

Maintenance

periods

create

gaps.

---

# Business

Applications

HR

```text
Employee

Attendance

Streaks
```

---

Retail

```text
Customer

Purchase

Streaks
```

---

Healthcare

```text
Continuous

Treatment

Periods
```

---

Finance

```text
Missing

Transaction

Numbers
```

---

IoT

```text
Continuous

Sensor

Activity
```

---

# Think Like

A Data

Engineer

Business asks

```
Identify

Customers

Who

Purchased

Products

For

At Least

Seven

Consecutive

Days.
```

Using

the

```
ROW_NUMBER()

difference

technique,

```

continuous

purchase

periods

can be

identified,

grouped,

and

filtered

without

complex

procedural

logic.

This pattern

appears

frequently

in

SQL interviews.

---

# Performance

Considerations

Gap

and

Island

queries

typically

require

sorting

using

the

```
ORDER BY
```

columns.

Large

datasets

benefit

from

indexes

on

the

ordering

columns,

especially

dates

or

sequence

numbers.

Always

validate

performance

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Use `LAG()` to detect gaps.

✅ Use `ROW_NUMBER()` to identify islands.

✅ Partition by business entities when needed.

✅ Validate date ordering carefully.

✅ Test edge cases at the beginning and end of sequences.

---

# Common Mistakes

❌ Confusing gaps with islands.

❌ Forgetting `PARTITION BY` for multiple entities.

❌ Ordering by the wrong column.

❌ Ignoring duplicate dates.

❌ Assuming consecutive IDs always imply consecutive dates.

---

# PostgreSQL Practice Lab

## Exercise 1

Identify

all gaps

between

attendance dates

using

`LAG()`.

---

## Exercise 2

Calculate

the number

of days

between

each

attendance record.

---

## Exercise 3

Identify

continuous

attendance

periods

using

the

`ROW_NUMBER()`

difference

technique.

---

## Exercise 4

Find

purchase

streaks

for

each customer

using

`PARTITION BY`.

---

## Exercise 5

Identify

customers

whose

longest

purchase streak

was

at least

seven days.

---

# Interview Questions

## Beginner

1. What is a Gap in SQL?

2. What is an Island in SQL?

3. Which Window Function is commonly used to detect gaps?

---

## Intermediate

1. Explain the `ROW_NUMBER()` difference technique for identifying islands.

2. How does `LAG()` help detect missing records?

3. Why is `PARTITION BY` important for multi-customer streak analysis?

---

## Senior

1. Design a system to identify customer purchase streaks using Window Functions.

2. Explain how you would detect missing invoice numbers in a financial system.

3. How would you optimize Gap and Island queries over billions of time-series records?

---

# Section Summary

In this section,

you learned:

- A **Gap** is a break between expected values, while an **Island** is a continuous sequence of related rows.
- `LAG()` is commonly used to detect gaps by comparing the current row with the previous row.
- The classic `ROW_NUMBER()` difference technique groups consecutive rows into islands.
- Gap and Island problems are common in attendance tracking, financial auditing, customer analytics, IoT monitoring, and interview questions.
- Correct ordering, partitioning, and indexing are essential for accurate and efficient solutions.

---

# Coming Up Next

## Section 37.27

# Window Functions vs GROUP BY

You'll learn:

- Key conceptual differences.
- When to use Window Functions.
- When to use `GROUP BY`.
- Combining both in the same query.
- Common interview questions.
- Real-world reporting patterns.


# ==========================================================
# Section 37.27
# Window Functions vs GROUP BY
# ==========================================================

# Introduction

One of

the most

common

SQL interview

questions

is

```
What

Is

The Difference

Between

Window Functions

And

GROUP BY?
```

Many

beginners

believe

they perform

the same

task

because

both

can use

functions

such as

```
SUM()

AVG()

COUNT()

MAX()

MIN()
```

However,

they solve

completely

different

business

problems.

Understanding

this difference

is essential

for

writing

correct

analytical SQL.

---

# GROUP BY

What

Does It

Do?

```
GROUP BY
```

combines

multiple rows

into

a single

summary row

for

each group.

Original

Data

| Department | Employee | Salary |
|------------|----------|-------:|
|IT|Alice|70000|
|IT|Bob|65000|
|HR|David|60000|
|HR|Emma|55000|

Query

```sql
SELECT

department,

SUM(salary)

FROM employees

GROUP BY department;
```

Result

| Department | Total Salary |
|------------|-------------:|
|IT|135000|
|HR|115000|

Notice

that

individual

employee rows

disappear.

---

# Window

Functions

What

Do They

Do?

Window Functions

perform

calculations

without

removing

individual rows.

Example

```sql
SELECT

employee_name,

department,

salary,

SUM(salary)

OVER
(
PARTITION BY department
)

AS department_total

FROM employees;
```

Result

| Employee | Department | Salary | Department Total |
|-----------|------------|-------:|-----------------:|
|Alice|IT|70000|135000|
|Bob|IT|65000|135000|
|David|HR|60000|115000|
|Emma|HR|55000|115000|

Every row

remains

visible.

---

# Visual

Comparison

```
GROUP BY

↓

Many Rows

↓

One Row
```

---

```
Window Function

↓

Many Rows

↓

Many Rows
```

Window Functions

add

information.

```
GROUP BY
```

reduces

information.

---

# Side-by-Side

Comparison

| Feature | GROUP BY | Window Function |
|---------|----------|-----------------|
|Reduces Rows|✅ Yes|❌ No|
|Preserves Detail Rows|❌ No|✅ Yes|
|Supports Ranking|❌ No|✅ Yes|
|Running Totals|❌ No|✅ Yes|
|Moving Averages|❌ No|✅ Yes|
|Row Navigation|❌ No|✅ Yes|

---

# Business

Example

Department

Salary Report

Business asks

```
Show

Every Employee

Along With

The Total

Department

Salary.
```

Using

```
GROUP BY
```

is impossible,

because

employee rows

are removed.

Using

Window Functions

solves

the problem

easily.

---

# Business

Example

Department

Summary

Business asks

```
Display

Only

One Row

Per Department

Showing

Total Salary.
```

Here,

```
GROUP BY
```

is

the correct

solution.

Window Functions

would

return

unnecessary

duplicate

totals.

---

# Combining

GROUP BY

And

Window

Functions

These

features

can

work

together.

Example

```sql
SELECT

department,

department_total,

RANK()

OVER
(
ORDER BY department_total DESC
)

AS department_rank

FROM
(
    SELECT

    department,

    SUM(salary)

    AS department_total

    FROM employees

    GROUP BY department
)

AS totals;
```

Step 1

```
GROUP BY
```

creates

department

totals.

Step 2

```
RANK()
```

ranks

those totals.

This

pattern

is common

in

BI dashboards.

---

# Another

Example

Sales

Summary

Business asks

```
Find

Monthly

Revenue

Then

Rank

The Months.
```

```sql
SELECT

sales_month,

monthly_sales,

RANK()

OVER
(
ORDER BY monthly_sales DESC
)

AS revenue_rank

FROM
(
    SELECT

    sales_month,

    SUM(amount)

    AS monthly_sales

    FROM sales

    GROUP BY sales_month
)

AS monthly_summary;
```

Aggregation

occurs

first.

Ranking

occurs

afterward.

---

# Why

Not

Use

GROUP BY

For

Running

Totals?

Suppose

Business asks

```
Display

Revenue

Accumulated

After

Each Month.
```

```
GROUP BY
```

cannot

reference

previous

rows.

Window Functions

can.

Example

```sql
SUM(sales)

OVER
(
ORDER BY month

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)
```

---

# Why

Not

Use

Window

Functions

For

Simple

Summaries?

Suppose

Business asks

```
How Many

Employees

Exist

In

Each Department?
```

If

only

one row

per department

is required,

```
GROUP BY
```

is

simpler,

clearer,

and

usually

more efficient.

---

# Think Like

A Business

Analyst

Business asks

```
Show

Every Employee,

Their Salary,

Their Department's

Average Salary,

And

Their Rank

Within

The Department.
```

This

cannot

be solved

using only

```
GROUP BY.
```

It requires

Window Functions,

because

individual

employee rows

must remain

visible

while

department-level

calculations

are added.

---

# Enterprise

Applications

Finance

```text
Department

Budgets

+

Rankings
```

---

Retail

```text
Product

Sales

+

Running

Totals
```

---

Healthcare

```text
Patient

Visits

+

Department

Statistics
```

---

Manufacturing

```text
Factory

Production

+

Plant

Rankings
```

---

Education

```text
Student

Scores

+

Class

Averages
```

---

# Performance

Considerations

```
GROUP BY
```

typically

uses

aggregation

operations.

Window Functions

usually

require

sorting

for

partitioning

and

ordering.

Complex

analytical

queries

may combine

both.

Always

review

execution

plans

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Use `GROUP BY` when only summary rows are required.

✅ Use Window Functions when detail rows must remain visible.

✅ Combine both techniques for advanced reporting.

✅ Choose the simplest approach that satisfies the business requirement.

✅ Optimize grouping and ordering columns with appropriate indexes.

---

# Common Mistakes

❌ Using `GROUP BY` when individual rows must remain visible.

❌ Using Window Functions when only aggregated summaries are needed.

❌ Assuming Window Functions reduce the number of rows.

❌ Forgetting that Window Functions execute after aggregation in logical query processing.

❌ Choosing a more complex solution than necessary.

---

# PostgreSQL Practice Lab

## Exercise 1

Calculate

department

salary totals

using

`GROUP BY`.

---

## Exercise 2

Display

every employee

along with

their department's

total salary

using

a Window Function.

---

## Exercise 3

Rank

departments

by

their total

salary

using

both

`GROUP BY`

and

`RANK()`.

---

## Exercise 4

Compare

the number

of rows

returned

by

`GROUP BY`

and

Window Functions.

---

## Exercise 5

Explain

which approach

is appropriate

for

each

business requirement.

---

# Interview Questions

## Beginner

1. What is the primary difference between `GROUP BY` and Window Functions?

2. Does `GROUP BY` preserve detail rows?

3. Can Window Functions reduce the number of rows?

---

## Intermediate

1. Why can't `GROUP BY` produce running totals?

2. Explain a business scenario where Window Functions are required instead of `GROUP BY`.

3. Can `GROUP BY` and Window Functions be used together?

---

## Senior

1. Design an executive dashboard combining department summaries, rankings, and running totals.

2. Explain the logical execution order of `GROUP BY` and Window Functions in PostgreSQL.

3. How would you optimize a reporting query that uses both aggregation and Window Functions over billions of rows?

---

# Section Summary

In this section,

you learned:

- `GROUP BY` reduces multiple rows into summary rows, while Window Functions preserve every detail row.
- Window Functions add analytical calculations such as rankings, running totals, moving averages, and row navigation without collapsing the dataset.
- `GROUP BY` is ideal for summary reports, while Window Functions are ideal for analytical reports that retain row-level detail.
- Both techniques can be combined to build powerful business intelligence reports.
- Choosing the correct approach depends entirely on the business requirement.

---

# Coming Up Next

## Section 37.28

# Window Functions Performance Optimization

You'll learn:

- How PostgreSQL executes Window Functions.
- Sorting costs.
- Memory usage.
- Index optimization.
- Reading `EXPLAIN ANALYZE`.
- Enterprise performance tuning techniques.


# ==========================================================
# Section 37.28
# Window Functions Performance Optimization
# ==========================================================

# Introduction

Window Functions

are

among

the most

powerful

features

in

PostgreSQL.

However,

they can

also become

one of

the most

expensive

operations

on

large datasets.

A query

that runs

in

milliseconds

on

10,000 rows

may require

minutes

on

500 million

rows

if

it is

poorly designed.

Understanding

how

PostgreSQL

executes

Window Functions

is essential

for

building

enterprise-scale

applications.

---

# How

PostgreSQL

Executes

Window Functions

A typical

execution

contains

three

major steps.

```text
Read Rows

↓

Sort Rows

↓

Calculate

Window Function
```

The

sorting

phase

is usually

the most

expensive

operation.

---

# Why

Sorting

Is

Expensive

Suppose

Business asks

```
Rank

Employees

By

Salary.
```

PostgreSQL

must first

sort

all rows

by

salary.

Only

after

sorting

can it

calculate

```
ROW_NUMBER()

RANK()

DENSE_RANK()

LAG()

LEAD()
```

Sorting

large datasets

requires

memory

and

sometimes

temporary

disk files.

---

# Example

```sql
SELECT

employee_name,

salary,

RANK()

OVER
(
ORDER BY salary DESC
)

FROM employees;
```

Execution

conceptually

becomes

```text
Table Scan

↓

Sort

By Salary

↓

Calculate

Rank
```

---

# Understanding

EXPLAIN

ANALYZE

Always

measure

performance

using

```sql
EXPLAIN ANALYZE
```

Example

```sql
EXPLAIN ANALYZE

SELECT

employee_name,

salary,

RANK()

OVER
(
ORDER BY salary DESC
)

FROM employees;
```

Typical

execution plan

contains

```text
Seq Scan

↓

Sort

↓

WindowAgg
```

```
WindowAgg
```

represents

the execution

of

Window Functions.

---

# Common

Execution

Operators

```
Seq Scan
```

↓

Reads

the table.

---

```
Index Scan
```

↓

Reads

using

an index.

---

```
Sort
```

↓

Orders

the rows.

---

```
WindowAgg
```

↓

Calculates

Window Functions.

---

```
Gather

Merge
```

↓

Combines

parallel

workers.

---

# Indexes

Can Help

Suppose

the query

uses

```sql
ORDER BY salary
```

An index

on

```sql
(salary)
```

may reduce

sorting

costs,

although

PostgreSQL

may still

choose

a separate

sort

depending

on

the execution

plan,

the query,

and

the data

distribution.

Always

verify

using

```
EXPLAIN ANALYZE.
```

---

# Composite

Indexes

Suppose

Business asks

```
Rank

Employees

Within

Each Department.
```

Query

```sql
PARTITION BY department

ORDER BY salary DESC
```

A useful

index

may be

```sql
(department,

salary DESC)
```

This matches

both

the partition

and

the ordering

columns.

---

# Avoid

Unnecessary

Sorting

Poor

Example

```sql
SELECT

*

FROM employees

ORDER BY name;

SELECT

RANK()

OVER
(
ORDER BY salary
)
```

Two

different

sorting

operations

may occur.

Whenever

possible,

avoid

requiring

multiple

different

sort orders

within

the same

query.

---

# Use

Only

Required

Columns

Poor

Example

```sql
SELECT *

FROM employees;
```

Better

```sql
SELECT

employee_name,

salary
```

Reading

fewer columns

reduces

I/O,

memory,

and

network

usage.

---

# Filter

Before

Window

Functions

Poor

Example

```sql
SELECT

RANK()

OVER
(
ORDER BY salary
)

FROM employees;
```

Then

later

filter

the result.

Better

```sql
SELECT

RANK()

OVER
(
ORDER BY salary
)

FROM employees

WHERE department = 'IT';
```

Reducing

the number

of rows

before

window

processing

usually

improves

performance.

---

# Reuse

Sorting

When Possible

Suppose

multiple

Window Functions

share

the same

window.

Good

Example

```sql
SELECT

salary,

ROW_NUMBER()

OVER
(
ORDER BY salary
),

RANK()

OVER
(
ORDER BY salary
),

DENSE_RANK()

OVER
(
ORDER BY salary
)

FROM employees;
```

Since

all three

functions

share

the same

ordering,

PostgreSQL

can often

reuse

the sort.

---

# Use

Named

Windows

For

Readability

```sql
SELECT

employee_name,

salary,

ROW_NUMBER()

OVER salary_window,

RANK()

OVER salary_window

FROM employees

WINDOW salary_window AS
(
ORDER BY salary DESC
);
```

Named

windows

improve

maintainability

and

can help

avoid

repeating

identical

window

definitions.

---

# Beware

Of

Large

Partitions

Business asks

```
Calculate

Running Totals

For

Every Customer.
```

If

one customer

has

100 million

rows,

that

single partition

becomes

very expensive.

Large

partitions

increase

memory usage

and

processing time.

---

# Memory

Usage

Window

operations

may require

significant

working

memory.

If

available

memory

is insufficient,

PostgreSQL

may write

temporary

files

to disk,

which

is much

slower

than

processing

in memory.

Database

administrators

often tune

settings

such as

```
work_mem
```

to improve

large

analytical

queries.

---

# Enterprise

Optimization

Checklist

✔ Filter

Early

↓

Fewer Rows

---

✔ Select

Only

Needed

Columns

↓

Less I/O

---

✔ Use

Indexes

On

Partition

And

Ordering

Columns

---

✔ Share

Window

Definitions

When

Possible

---

✔ Check

Execution

Plans

Using

```
EXPLAIN ANALYZE
```

---

✔ Avoid

Huge

Partitions

When

Possible

---

# Business

Applications

Finance

```text
Million

Transaction

Ranking
```

---

Retail

```text
Customer

Analytics
```

---

Healthcare

```text
Patient

History
```

---

Manufacturing

```text
Machine

Monitoring
```

---

Telecommunications

```text
Call

History

Analysis
```

---

# Think Like

A Data

Engineer

Business asks

```
Rank

500 Million

Sales

Records

Every Night.
```

The SQL

may be

correct,

but

without

appropriate

indexes,

filtering,

memory

configuration,

and

execution-plan

analysis,

the ETL

pipeline

may fail

to complete

within

the required

processing window.

Performance

is often

more important

than

the SQL

syntax itself.

---

# Best Practices

✅ Always inspect queries using `EXPLAIN ANALYZE`.

✅ Index partition and ordering columns where appropriate.

✅ Filter rows before applying Window Functions.

✅ Retrieve only the columns required.

✅ Reuse identical window definitions.

✅ Test performance using production-like data volumes.

---

# Common Mistakes

❌ Assuming Window Functions are always fast.

❌ Ignoring execution plans.

❌ Using `SELECT *` unnecessarily.

❌ Creating different sort orders in the same query.

❌ Forgetting that sorting is usually the largest cost.

❌ Ignoring data skew that creates extremely large partitions.

---

# PostgreSQL Practice Lab

## Exercise 1

Run

`EXPLAIN ANALYZE`

on

a simple

ranking query.

Identify

the

`WindowAgg`

operator.

---

## Exercise 2

Create

an index

matching

the

`ORDER BY`

column.

Compare

execution

plans.

---

## Exercise 3

Create

a composite

index

supporting

both

`PARTITION BY`

and

`ORDER BY`.

Measure

the difference.

---

## Exercise 4

Compare

performance

between

`SELECT *`

and

selecting

only

required

columns.

---

## Exercise 5

Write

three

Window Functions

sharing

the same

window.

Observe

whether

PostgreSQL

reuses

the sorting

operation.

---

# Interview Questions

## Beginner

1. Why are Window Functions often expensive?

2. Which execution plan operator performs Window Functions?

3. Why is sorting required?

---

## Intermediate

1. How can indexes improve Window Function performance?

2. Why should filtering occur before applying Window Functions?

3. What is the benefit of using `EXPLAIN ANALYZE`?

---

## Senior

1. Design a strategy to optimize a nightly ETL job that computes rankings over 500 million rows.

2. Explain how partition size affects Window Function performance.

3. How would you tune PostgreSQL for large analytical workloads using Window Functions?

---

# Section Summary

In this section,

you learned:

- Window Functions typically execute after sorting the data, making sorting the dominant performance cost.
- `EXPLAIN ANALYZE` is the primary tool for understanding how PostgreSQL executes Window Functions.
- Appropriate indexes on `PARTITION BY` and `ORDER BY` columns can significantly improve performance in many cases.
- Filtering early, selecting only required columns, and sharing identical window definitions help reduce execution time.
- Optimizing Window Functions is critical for enterprise-scale reporting, ETL pipelines, and analytical data warehouses.

---

# Coming Up Next

## Section 37.29

# Window Functions Interview Mastery

You'll learn:

- The most common interview questions.
- Real-world scenarios.
- Trick questions.
- Performance discussions.
- Best practices.
- Enterprise design patterns.


# ==========================================================
# Section 37.29
# Window Functions Interview Mastery
# ==========================================================

# Introduction

Congratulations!

You have now

learned

all major

PostgreSQL

Window Functions.

However,

knowing

the syntax

alone

is not

enough

to crack

SQL interviews.

Interviewers

want

to evaluate

whether

you can

- Solve business problems

- Choose the correct Window Function

- Write efficient SQL

- Optimize performance

- Explain your reasoning

This chapter

focuses

on

interview thinking,

not

just

syntax.

---

# Interview

Mindset

When

given

a SQL problem,

never

start

typing

immediately.

Instead,

identify

three things.

```
Business

Requirement

↓

Required

Output

↓

Correct

Window Function
```

Choosing

the correct

function

is often

more important

than

writing

the SQL.

---

# Question

1

Find

The Highest

Paid Employee

Per Department

Business asks

```
Display

One

Highest Paid

Employee

From

Each Department.
```

Recommended

solution

```sql
ROW_NUMBER()

OVER
(
PARTITION BY department

ORDER BY salary DESC
)
```

Then

filter

```sql
WHERE rn = 1
```

---

# Follow-up

Question

What

if

two employees

share

the highest

salary?

Business

must decide.

Need

exactly

one row?

↓

Use

```
ROW_NUMBER()
```

---

Need

both

employees?

↓

Use

```
RANK()
```

---

# Question

2

Top Three

Employees

Per Department

Need

exactly

three rows?

↓

```
ROW_NUMBER()
```

---

Need

ties?

↓

```
RANK()
```

---

Need

continuous

ranking?

↓

```
DENSE_RANK()
```

Interviewers

often ask

why

you selected

one

instead

of

another.

---

# Question

3

Running

Revenue

Business asks

```
Display

Revenue

Accumulated

Month

By

Month.
```

Solution

```sql
SUM(revenue)

OVER
(
ORDER BY month

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)
```

Key point

Running totals

require

Window Functions,

not

```
GROUP BY.
```

---

# Question

4

Month-over-Month

Growth

Business asks

```
Compare

Current Month

With

Previous Month.
```

Solution

```sql
LAG(revenue)
```

Calculate

```sql
current

-

previous
```

Interviewers

often ask

why

a SELF JOIN

is unnecessary.

---

# Question

5

Latest

Order

Per Customer

Business asks

```
Retrieve

The Most

Recent

Order

For

Every Customer.
```

Solution

```sql
ROW_NUMBER()

OVER
(
PARTITION BY customer_id

ORDER BY order_date DESC
)
```

Keep

```
ROW_NUMBER() = 1
```

One of

the most

common

Data Engineering

questions.

---

# Question

6

Second

Highest

Salary

Business asks

```
Display

The Second

Highest

Salary.
```

Possible

solutions

```sql
DENSE_RANK()
```

or

```sql
NTH_VALUE()
```

depending

on

the business

requirement.

Interviewers

often ask

which

approach

is better.

---

# Question

7

Customer

Purchase

Streak

Business asks

```
Identify

Customers

Purchasing

Products

For

Seven

Consecutive

Days.
```

Solution

```
ROW_NUMBER()

Difference

Technique
```

This is

the classic

Gap

and

Island

problem.

---

# Question

8

Department

Average

Business asks

```
Display

Every Employee

And

The Average

Salary

Of

Their Department.
```

Solution

```sql
AVG(salary)

OVER
(
PARTITION BY department
)
```

```
GROUP BY
```

cannot

preserve

employee rows.

---

# Question

9

Running

Balance

Business asks

```
Calculate

Account

Balance

After

Each Transaction.
```

Solution

```sql
SUM(amount)

OVER
(
ORDER BY transaction_date

ROWS

BETWEEN

UNBOUNDED PRECEDING

AND

CURRENT ROW
)
```

Very common

banking

question.

---

# Question

10

Compare

Current

And

Next

Shipment

Business asks

```
Compare

Today's Shipment

With

Tomorrow's Shipment.
```

Solution

```sql
LEAD()
```

---

# Common

Trick

Question

Difference

Between

```
RANK()
```

and

```
DENSE_RANK()
```

Expected

answer

```
RANK()

↓

Leaves

Gaps
```

---

```
DENSE_RANK()

↓

No

Gaps
```

Always

explain

using

an example.

---

# Common

Trick

Question

Why

Does

LAST_VALUE()

Return

The Current

Row?

Expected

answer

The default

window frame

ends

at

the current

row.

Therefore,

the current

row

is

the last

row

inside

the frame.

Mention

```
UNBOUNDED FOLLOWING
```

for

full marks.

---

# Common

Trick

Question

Window

Functions

Vs

GROUP BY

Expected

answer

```
GROUP BY

↓

Collapses

Rows
```

---

```
Window

Functions

↓

Preserve

Rows
```

Mention

that

Window Functions

perform

calculations

without

removing

detail rows.

---

# Performance

Interview

Questions

Interviewer

asks

```
Why

Is

My

Window Function

Slow?
```

Expected

discussion

- Sorting

- Large Partitions

- Missing Indexes

- Disk Spill

- `work_mem`

- `EXPLAIN ANALYZE`

These

topics

demonstrate

production

experience.

---

# Enterprise

Scenario

Deduplication

Business asks

```
Remove

Duplicate

Customer

Records.

Keep

Only

The Latest

Version.
```

Solution

```sql
ROW_NUMBER()

OVER
(
PARTITION BY customer_id

ORDER BY updated_at DESC
)
```

Delete

or

keep

only

```sql
rn = 1
```

This pattern

appears

frequently

in

ETL,

CDC,

and

Slowly Changing

Dimensions.

---

# Enterprise

Scenario

Leaderboard

Business asks

```
Display

Top

10

Salespeople.

Include

Ties.
```

Correct

answer

```
RANK()
```

Explain

why

```
ROW_NUMBER()
```

would

incorrectly

exclude

employees

sharing

the same

sales.

---

# Enterprise

Scenario

Executive

Dashboard

Business asks

```
Show

Revenue,

Running Total,

Moving Average,

Rank,

And

Department

Average.
```

Expected

solution

combines

multiple

Window Functions

within

a single

query.

This

tests

your ability

to solve

real-world

analytical

problems.

---

# Interview

Tips

✅ Clarify the business requirement before choosing a function.

✅ Explain why your chosen function fits the requirement.

✅ Mention tie-handling whenever ranking is involved.

✅ Discuss performance considerations for large datasets.

✅ Think in terms of business problems rather than SQL syntax.

---

# Common

Mistakes

❌ Using `ROW_NUMBER()` when ties should be preserved.

❌ Forgetting `PARTITION BY`.

❌ Ignoring window frames with `LAST_VALUE()` and `NTH_VALUE()`.

❌ Using `GROUP BY` when detail rows must remain visible.

❌ Failing to explain the business reasoning behind the SQL.

---

# PostgreSQL Practice Lab

## Exercise 1

Solve

the

Top-3

Employees

Per Department

problem

using

all three

ranking

functions.

---

## Exercise 2

Write

a running

balance

query

for

bank

transactions.

---

## Exercise 3

Retrieve

the latest

customer

record

using

`ROW_NUMBER()`.

---

## Exercise 4

Find

customer

purchase

streaks

using

the

Gap

and

Island

technique.

---

## Exercise 5

Optimize

a Window Function

query

using

`EXPLAIN ANALYZE`

and

appropriate

indexes.

---

# Interview

Cheat Sheet

| Business Requirement | Recommended Function |
|----------------------|----------------------|
| Unique Ranking | `ROW_NUMBER()` |
| Ranking With Gaps | `RANK()` |
| Ranking Without Gaps | `DENSE_RANK()` |
| Equal Buckets | `NTILE()` |
| Relative Rank | `PERCENT_RANK()` |
| Cumulative Distribution | `CUME_DIST()` |
| Previous Row | `LAG()` |
| Next Row | `LEAD()` |
| First Value | `FIRST_VALUE()` |
| Last Value | `LAST_VALUE()` |
| Nth Value | `NTH_VALUE()` |
| Running Total | `SUM() OVER(...)` |
| Moving Average | `AVG() OVER(...)` |
| Latest Record | `ROW_NUMBER()` |
| Top-N Per Group | `ROW_NUMBER()`, `RANK()`, or `DENSE_RANK()` |
| Gap Detection | `LAG()` |
| Island Detection | `ROW_NUMBER()` Difference Technique |

---

# Final Summary

You have now

completed

the complete

PostgreSQL

Window Functions

module.

You learned:

- Window Function fundamentals
- `OVER()`, `PARTITION BY`, and `ORDER BY`
- Ranking functions
- Navigation functions
- Value functions
- Window frame boundaries
- Running totals
- Moving averages
- Top-N per group
- Gap and Island problems
- Performance optimization
- Interview patterns
- Enterprise use cases

These topics

cover

the vast majority

of

Window Function

questions

asked

in

SQL interviews

at

product-based

companies,

data engineering

roles,

analytics,

business intelligence,

and

enterprise

application

development.

---

# Congratulations!

You have

successfully

mastered

PostgreSQL

Window Functions.

This knowledge

forms

a core

foundation

for

advanced SQL,

data engineering,

analytics,

business intelligence,

and

technical interviews.

# End of Chapter 37