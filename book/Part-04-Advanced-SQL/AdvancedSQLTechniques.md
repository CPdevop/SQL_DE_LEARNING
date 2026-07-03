# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.1
# Introduction to Advanced SQL Techniques
# ==========================================================

# Introduction

You have

already

mastered

many

advanced

PostgreSQL

topics,

including

- Advanced JOINs

- Subqueries

- Set Operations

- Window Functions

- Common Table Expressions

- Recursive Queries

Now,

it is

time

to combine

these

concepts

to solve

real-world

business

problems.

This chapter

focuses

on

Advanced SQL

Techniques

used in

- Data Engineering

- Business Intelligence

- Analytics

- Data Warehousing

- Enterprise Reporting

- Product Companies

These

techniques

appear

frequently

in

senior-level

SQL interviews.

---

# What Is

Advanced SQL?

Advanced SQL

goes beyond

basic

CRUD

operations.

Instead,

it focuses

on

answering

complex

business

questions.

Examples

include

```
Monthly

Sales

Dashboard
```

```
Executive

Summary

Reports
```

```
Dynamic

Business

Metrics
```

```
Multi-Level

Aggregations
```

```
Pivoted

Reports
```

```
Interactive

Dashboards
```

```
Financial

Statements
```

---

# Characteristics

Of

Advanced SQL

Advanced SQL

usually

contains

multiple

techniques

combined

inside

one query.

Example

```text
CTE

↓

JOIN

↓

Window Function

↓

Aggregation

↓

Pivot

↓

Final Report
```

Large

enterprise

queries

often

combine

five

or more

SQL concepts.

---

# Real

Business

Example

Business asks

```
Display

Monthly

Revenue

By

Region

↓

Rank

Regions

↓

Calculate

Running

Totals

↓

Generate

Executive

Dashboard.
```

This

cannot

be solved

using

only

basic

SQL.

Instead,

it requires

multiple

advanced

techniques

working

together.

---

# Common

Business

Requirements

Finance

```text
Profit

And

Loss

Statements
```

---

Retail

```text
Sales

Dashboards
```

---

Healthcare

```text
Patient

Analytics
```

---

Manufacturing

```text
Production

Efficiency
```

---

Education

```text
Student

Performance

Reports
```

---

# Why

Companies

Need

Advanced SQL

Enterprise

systems

generate

millions

or

billions

of rows.

Decision-makers

need

information,

not

raw data.

Advanced SQL

transforms

raw

transaction

data

into

meaningful

business

insights.

---

# Typical

Reporting

Pipeline

```text
Raw Data

↓

Cleaning

↓

Aggregation

↓

Analytics

↓

Visualization

↓

Decision Making
```

SQL

often

performs

the first

four

steps.

---

# Topics

Covered

In

This Chapter

You will

learn

how

to create

Pivot

Tables

↓

Cross-tab

Reports

↓

Multiple

Grouping

Levels

↓

Executive

Dashboards

↓

Advanced

Aggregations

↓

Enterprise

Reporting

Patterns

↓

Interview

Solutions

---

# Enterprise

Example

Suppose

Business asks

```
Show

Sales

By

Region,

Quarter,

Product,

And

Salesperson,

Along With

Running

Totals,

Ranking,

And

Grand Totals.
```

This

single

report

may require

- CTEs

- Window Functions

- GROUPING SETS

- ROLLUP

- Pivoting

- Advanced Aggregations

Understanding

how

to combine

these

features

is

a critical

skill

for

Data Engineers

and

Analytics

Engineers.

---

# Skills

Required

Before

This Chapter

You should

already

understand

- SELECT

- JOINs

- GROUP BY

- HAVING

- Window Functions

- CTEs

- Recursive CTEs

These

form

the foundation

for

Advanced SQL.

---

# Business

Applications

Business

Intelligence

```text
Executive

Dashboards
```

---

Finance

```text
Financial

Statements
```

---

Retail

```text
Sales

Analytics
```

---

Healthcare

```text
Hospital

KPIs
```

---

Manufacturing

```text
Operational

Reporting
```

---

# Think Like

An Analytics

Engineer

Business asks

```
Generate

An Executive

Dashboard

Showing

Sales,

Profit,

Growth,

Rankings,

Running

Totals,

And

Quarterly

Breakdowns.
```

Instead

of writing

multiple

queries,

combine

advanced

SQL features

to

produce

a single,

maintainable,

high-performance

report.

This

is exactly

the type

of

problem

Advanced SQL

is designed

to solve.

---

# Performance

Considerations

Advanced SQL

often

combines

multiple

features

within

a single

statement.

Complex

queries

may require

sorting,

aggregation,

joins,

and

window

processing.

Always

measure

performance

using

```
EXPLAIN ANALYZE
```

and

optimize

indexes,

join order,

and

aggregation

strategies

where

appropriate.

---

# Best Practices

✅ Break complex logic into CTEs.

✅ Use Window Functions instead of procedural code where appropriate.

✅ Choose the correct aggregation technique.

✅ Optimize before deploying to production.

✅ Keep business logic readable.

---

# Common Mistakes

❌ Trying to solve every problem using a single SQL feature.

❌ Writing unreadable nested queries.

❌ Ignoring execution plans.

❌ Optimizing without measuring.

❌ Mixing business logic and presentation logic unnecessarily.

---

# PostgreSQL Practice Lab

## Exercise 1

Identify

an enterprise

report

that requires

multiple

advanced

SQL features.

---

## Exercise 2

List

five

advanced

SQL concepts

you have

already

learned

that

can be

combined

inside

one query.

---

## Exercise 3

Explain

why

executive

dashboards

often

require

more than

one

SQL technique.

---

## Exercise 4

Draw

the reporting

pipeline

from

raw data

to

business

decision.

---

## Exercise 5

Run

`EXPLAIN ANALYZE`

on

a complex

reporting

query

and

identify

its major

execution

operators.

---

# Interview Questions

## Beginner

1. What is Advanced SQL?

2. Why do enterprise reports require more than basic SQL?

3. Name three advanced SQL features commonly used together.

---

## Intermediate

1. Explain how Window Functions, CTEs, and aggregations can work together.

2. Why is Advanced SQL important in Business Intelligence?

3. How do enterprise dashboards differ from simple reports?

---

## Senior

1. Design an executive dashboard query using multiple advanced SQL techniques.

2. Explain how you would optimize a complex reporting query.

3. Discuss how Advanced SQL supports analytics engineering and data warehousing.

---

# Section Summary

In this section,

you learned:

- Advanced SQL combines multiple SQL features to solve complex business problems.
- Enterprise reporting often requires CTEs, Window Functions, advanced aggregations, and pivoting in a single query.
- Advanced SQL transforms raw transactional data into actionable business insights.
- Readability, maintainability, and performance are equally important in production-grade SQL.
- This chapter focuses on practical enterprise reporting patterns and advanced interview topics.

---

# Coming Up Next

## Section 39.2

# Pivoting Data

You'll learn:

- What pivoting is.
- Row-to-column transformation.
- Conditional aggregation.
- Business reporting examples.
- Pivoting techniques in PostgreSQL.
- Enterprise dashboard use cases.


# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.1
# Introduction to Advanced SQL Techniques
# ==========================================================

# Introduction

You have

already

mastered

many

advanced

PostgreSQL

topics,

including

- Advanced JOINs

- Subqueries

- Set Operations

- Window Functions

- Common Table Expressions

- Recursive Queries

Now,

it is

time

to combine

these

concepts

to solve

real-world

business

problems.

This chapter

focuses

on

Advanced SQL

Techniques

used in

- Data Engineering

- Business Intelligence

- Analytics

- Data Warehousing

- Enterprise Reporting

- Product Companies

These

techniques

appear

frequently

in

senior-level

SQL interviews.

---

# What Is

Advanced SQL?

Advanced SQL

goes beyond

basic

CRUD

operations.

Instead,

it focuses

on

answering

complex

business

questions.

Examples

include

```
Monthly

Sales

Dashboard
```

```
Executive

Summary

Reports
```

```
Dynamic

Business

Metrics
```

```
Multi-Level

Aggregations
```

```
Pivoted

Reports
```

```
Interactive

Dashboards
```

```
Financial

Statements
```

---

# Characteristics

Of

Advanced SQL

Advanced SQL

usually

contains

multiple

techniques

combined

inside

one query.

Example

```text
CTE

↓

JOIN

↓

Window Function

↓

Aggregation

↓

Pivot

↓

Final Report
```

Large

enterprise

queries

often

combine

five

or more

SQL concepts.

---

# Real

Business

Example

Business asks

```
Display

Monthly

Revenue

By

Region

↓

Rank

Regions

↓

Calculate

Running

Totals

↓

Generate

Executive

Dashboard.
```

This

cannot

be solved

using

only

basic

SQL.

Instead,

it requires

multiple

advanced

techniques

working

together.

---

# Common

Business

Requirements

Finance

```text
Profit

And

Loss

Statements
```

---

Retail

```text
Sales

Dashboards
```

---

Healthcare

```text
Patient

Analytics
```

---

Manufacturing

```text
Production

Efficiency
```

---

Education

```text
Student

Performance

Reports
```

---

# Why

Companies

Need

Advanced SQL

Enterprise

systems

generate

millions

or

billions

of rows.

Decision-makers

need

information,

not

raw data.

Advanced SQL

transforms

raw

transaction

data

into

meaningful

business

insights.

---

# Typical

Reporting

Pipeline

```text
Raw Data

↓

Cleaning

↓

Aggregation

↓

Analytics

↓

Visualization

↓

Decision Making
```

SQL

often

performs

the first

four

steps.

---

# Topics

Covered

In

This Chapter

You will

learn

how

to create

Pivot

Tables

↓

Cross-tab

Reports

↓

Multiple

Grouping

Levels

↓

Executive

Dashboards

↓

Advanced

Aggregations

↓

Enterprise

Reporting

Patterns

↓

Interview

Solutions

---

# Enterprise

Example

Suppose

Business asks

```
Show

Sales

By

Region,

Quarter,

Product,

And

Salesperson,

Along With

Running

Totals,

Ranking,

And

Grand Totals.
```

This

single

report

may require

- CTEs

- Window Functions

- GROUPING SETS

- ROLLUP

- Pivoting

- Advanced Aggregations

Understanding

how

to combine

these

features

is

a critical

skill

for

Data Engineers

and

Analytics

Engineers.

---

# Skills

Required

Before

This Chapter

You should

already

understand

- SELECT

- JOINs

- GROUP BY

- HAVING

- Window Functions

- CTEs

- Recursive CTEs

These

form

the foundation

for

Advanced SQL.

---

# Business

Applications

Business

Intelligence

```text
Executive

Dashboards
```

---

Finance

```text
Financial

Statements
```

---

Retail

```text
Sales

Analytics
```

---

Healthcare

```text
Hospital

KPIs
```

---

Manufacturing

```text
Operational

Reporting
```

---

# Think Like

An Analytics

Engineer

Business asks

```
Generate

An Executive

Dashboard

Showing

Sales,

Profit,

Growth,

Rankings,

Running

Totals,

And

Quarterly

Breakdowns.
```

Instead

of writing

multiple

queries,

combine

advanced

SQL features

to

produce

a single,

maintainable,

high-performance

report.

This

is exactly

the type

of

problem

Advanced SQL

is designed

to solve.

---

# Performance

Considerations

Advanced SQL

often

combines

multiple

features

within

a single

statement.

Complex

queries

may require

sorting,

aggregation,

joins,

and

window

processing.

Always

measure

performance

using

```
EXPLAIN ANALYZE
```

and

optimize

indexes,

join order,

and

aggregation

strategies

where

appropriate.

---

# Best Practices

✅ Break complex logic into CTEs.

✅ Use Window Functions instead of procedural code where appropriate.

✅ Choose the correct aggregation technique.

✅ Optimize before deploying to production.

✅ Keep business logic readable.

---

# Common Mistakes

❌ Trying to solve every problem using a single SQL feature.

❌ Writing unreadable nested queries.

❌ Ignoring execution plans.

❌ Optimizing without measuring.

❌ Mixing business logic and presentation logic unnecessarily.

---

# PostgreSQL Practice Lab

## Exercise 1

Identify

an enterprise

report

that requires

multiple

advanced

SQL features.

---

## Exercise 2

List

five

advanced

SQL concepts

you have

already

learned

that

can be

combined

inside

one query.

---

## Exercise 3

Explain

why

executive

dashboards

often

require

more than

one

SQL technique.

---

## Exercise 4

Draw

the reporting

pipeline

from

raw data

to

business

decision.

---

## Exercise 5

Run

`EXPLAIN ANALYZE`

on

a complex

reporting

query

and

identify

its major

execution

operators.

---

# Interview Questions

## Beginner

1. What is Advanced SQL?

2. Why do enterprise reports require more than basic SQL?

3. Name three advanced SQL features commonly used together.

---

## Intermediate

1. Explain how Window Functions, CTEs, and aggregations can work together.

2. Why is Advanced SQL important in Business Intelligence?

3. How do enterprise dashboards differ from simple reports?

---

## Senior

1. Design an executive dashboard query using multiple advanced SQL techniques.

2. Explain how you would optimize a complex reporting query.

3. Discuss how Advanced SQL supports analytics engineering and data warehousing.

---

# Section Summary

In this section,

you learned:

- Advanced SQL combines multiple SQL features to solve complex business problems.
- Enterprise reporting often requires CTEs, Window Functions, advanced aggregations, and pivoting in a single query.
- Advanced SQL transforms raw transactional data into actionable business insights.
- Readability, maintainability, and performance are equally important in production-grade SQL.
- This chapter focuses on practical enterprise reporting patterns and advanced interview topics.

---

# Coming Up Next

## Section 39.2

# Pivoting Data

You'll learn:

- What pivoting is.
- Row-to-column transformation.
- Conditional aggregation.
- Business reporting examples.
- Pivoting techniques in PostgreSQL.
- Enterprise dashboard use cases.

# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.3
# Conditional Pivoting with CASE
# ==========================================================

# Introduction

In the

previous

section,

you learned

what

pivoting

is.

Now,

you will

learn

the most

important

pivoting

technique

used

in

PostgreSQL

and

many

other

SQL databases.

Since

PostgreSQL

does not

have

a built-in

```
PIVOT
```

operator,

the most

common

solution

is

```
Conditional

Aggregation

Using

CASE.
```

This

technique

is widely

used

in

production

systems

and

SQL interviews.

---

# What Is

Conditional

Pivoting?

Conditional

Pivoting

uses

```
CASE
```

inside

aggregate

functions

to convert

row values

into

columns.

Instead

of

```text
Region

Quarter

Sales
```

we produce

```text
Region

Q1

Q2

Q3

Q4
```

using

conditional

logic.

---

# Sample

Sales

Table

| Region | Quarter | Sales |
|---------|---------|------:|
|North|Q1|100|
|North|Q2|120|
|North|Q3|140|
|North|Q4|180|
|South|Q1|150|
|South|Q2|170|
|South|Q3|160|
|South|Q4|200|

Business asks

```
Display

Quarterly

Sales

As

Columns.
```

---

# Basic

Solution

```sql
SELECT

region,

SUM
(
    CASE

    WHEN quarter = 'Q1'

    THEN sales

    ELSE 0

    END
)

AS q1_sales,

SUM
(
    CASE

    WHEN quarter = 'Q2'

    THEN sales

    ELSE 0

    END
)

AS q2_sales,

SUM
(
    CASE

    WHEN quarter = 'Q3'

    THEN sales

    ELSE 0

    END
)

AS q3_sales,

SUM
(
    CASE

    WHEN quarter = 'Q4'

    THEN sales

    ELSE 0

    END
)

AS q4_sales

FROM sales

GROUP BY region;
```

---

# Result

| Region | Q1 | Q2 | Q3 | Q4 |
|---------|---:|---:|---:|---:|
|North|100|120|140|180|
|South|150|170|160|200|

Rows

have now

become

columns.

---

# How

It Works

Suppose

the current

row

contains

```text
North

Q2

120
```

Evaluation

```sql
CASE

WHEN quarter='Q1'

THEN sales

ELSE 0
```

returns

```text
0
```

---

Next

expression

```sql
CASE

WHEN quarter='Q2'

THEN sales

ELSE 0
```

returns

```text
120
```

Every

aggregate

collects

only

its own

quarter.

---

# Visualizing

The Process

Original

```text
North

Q1

100

North

Q2

120

North

Q3

140

North

Q4

180
```

↓

CASE

↓

```text
Q1

100

Q2

120

Q3

140

Q4

180
```

↓

SUM()

↓

One

Row

Per

Region

---

# Why

Use

SUM()?

The

CASE

expression

returns

a value

for

every row.

```
SUM()
```

combines

those

values

into

one

result

per group.

Without

aggregation,

multiple

rows

would

still

exist.

---

# Multiple

Grouping

Columns

Business asks

```
Display

Quarterly

Sales

For

Each

Region

And

Year.
```

```sql
SELECT

sales_year,

region,

SUM
(
CASE

WHEN quarter='Q1'

THEN sales

ELSE 0

END
)

AS q1,

SUM
(
CASE

WHEN quarter='Q2'

THEN sales

ELSE 0

END
)

AS q2,

SUM
(
CASE

WHEN quarter='Q3'

THEN sales

ELSE 0

END
)

AS q3,

SUM
(
CASE

WHEN quarter='Q4'

THEN sales

ELSE 0

END
)

AS q4

FROM sales

GROUP BY

sales_year,

region;
```

Each

year-region

combination

becomes

one row.

---

# Pivoting

Employee

Counts

Business asks

```
Display

Number

Of Employees

Per

Department.
```

```sql
SELECT

office,

COUNT
(
CASE

WHEN department='HR'

THEN 1

END
)

AS hr,

COUNT
(
CASE

WHEN department='IT'

THEN 1

END
)

AS it,

COUNT
(
CASE

WHEN department='Finance'

THEN 1

END
)

AS finance

FROM employees

GROUP BY office;
```

---

# Pivoting

Average

Salary

```sql
SELECT

department,

AVG
(
CASE

WHEN gender='Male'

THEN salary

END
)

AS male_avg,

AVG
(
CASE

WHEN gender='Female'

THEN salary

END
)

AS female_avg

FROM employees

GROUP BY department;
```

Notice

that

no

```
ELSE 0
```

is needed

because

`AVG()`

ignores

`NULL`

values.

---

# Handling

Missing

Values

Suppose

South

has

no

Q4

sales.

The

result

may contain

```text
NULL
```

instead

of

a number.

Use

```
COALESCE()
```

to

replace

it.

```sql
COALESCE
(
SUM
(
CASE

WHEN quarter='Q4'

THEN sales

END
),

0
)

AS q4
```

---

# Enterprise

Example

Business asks

```
Display

Monthly

Revenue

Across

Columns

For

Every Store.
```

```text
Store

Jan

Feb

Mar

Apr
```

This

layout

is

ideal

for

executive

dashboards.

---

# Advantages

Of

CASE

Pivoting

✅ Works

in

almost

every

SQL database.

---

✅ Easy

to understand.

---

✅ Flexible

for

multiple

aggregations.

---

✅ Requires

no

extensions.

---

# Limitations

Of

CASE

Pivoting

❌ Column

names

must be

known

before

writing

the query.

---

❌ Long

queries

when

many

pivot

columns

exist.

---

❌ Difficult

to maintain

when

new

categories

appear

frequently.

---

# Business

Applications

Finance

```text
Quarterly

Revenue
```

---

Retail

```text
Monthly

Sales
```

---

Healthcare

```text
Patient

Visits
```

---

Manufacturing

```text
Production

Reports
```

---

Education

```text
Semester

Grades
```

---

# Think Like

A BI

Developer

Business asks

```
Create

An Executive

Dashboard

Showing

Revenue

By

Quarter,

Store,

And

Year.
```

Conditional

aggregation

allows

you

to create

the entire

report

using

standard

SQL,

making

it portable

across

multiple

database

systems.

---

# Performance

Considerations

Each

pivot

column

introduces

another

conditional

expression.

Queries

with

dozens

or

hundreds

of

pivot

columns

become

more

CPU-intensive

and

harder

to maintain.

Indexes

on

grouping

columns

help

aggregation,

but

the

`CASE`

expressions

themselves

must

still

be evaluated

for

every row.

Always

validate

performance

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Aggregate after applying conditional logic.

✅ Use descriptive column aliases.

✅ Replace missing values using `COALESCE()` where appropriate.

✅ Keep pivot columns limited to meaningful categories.

✅ Consider other pivoting techniques for very wide reports.

---

# Common Mistakes

❌ Forgetting the `GROUP BY`.

❌ Omitting aggregation around `CASE`.

❌ Using `ELSE 0` unnecessarily with `AVG()`.

❌ Ignoring `NULL` values.

❌ Creating extremely wide pivot tables.

---

# PostgreSQL Practice Lab

## Exercise 1

Pivot

quarterly

sales

using

`CASE`

and

`SUM()`.

---

## Exercise 2

Pivot

employee

counts

by

department.

---

## Exercise 3

Pivot

average

salary

by

gender.

---

## Exercise 4

Handle

missing

quarters

using

`COALESCE()`.

---

## Exercise 5

Modify

the pivot

to include

both

year

and

region.

---

# Interview Questions

## Beginner

1. What is conditional pivoting?

2. Why is `CASE` commonly used for pivoting in PostgreSQL?

3. Why is `SUM()` typically combined with `CASE`?

---

## Intermediate

1. Explain how conditional aggregation converts rows into columns.

2. Why is `COALESCE()` often used in pivot reports?

3. Why is `ELSE 0` usually omitted when using `AVG()`?

---

## Senior

1. Design a quarterly sales dashboard using conditional aggregation.

2. Compare conditional pivoting with PostgreSQL's `crosstab()` function.

3. How would you optimize a pivot query containing dozens of conditional columns?

---

# Section Summary

In this section,

you learned:

- PostgreSQL commonly performs pivoting using conditional aggregation with `CASE`.
- `CASE` expressions isolate values for each target column, while aggregate functions combine them into a single row.
- `SUM()`, `COUNT()`, and `AVG()` can all be used for conditional pivoting.
- `COALESCE()` helps replace missing pivot values with meaningful defaults.
- Conditional pivoting is portable, flexible, and one of the most frequently used pivoting techniques in enterprise SQL.

---

# Coming Up Next

## Section 39.4

# Dynamic Pivot Concepts

You'll learn:

- Why static pivots are sometimes insufficient.
- Dynamic column generation.
- Dynamic SQL concepts.
- PostgreSQL approaches to dynamic pivoting.
- Enterprise reporting scenarios with changing categories.

# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.4
# Dynamic Pivot Concepts
# ==========================================================

# Introduction

In the

previous

section,

you learned

how

to create

a

static

pivot

using

```
CASE
```

Static

pivoting

works well

when

the output

columns

are known

before

writing

the query.

However,

many

real-world

business

reports

do not

have

fixed

categories.

New

months,

products,

departments,

or

regions

may appear

at any

time.

In such

situations,

we need

```
Dynamic

Pivoting.
```

---

# Static

Pivot

Review

Suppose

Business asks

```
Display

Quarterly

Sales.
```

Known

quarters

```text
Q1

Q2

Q3

Q4
```

The SQL

can be

written

once

because

the columns

never

change.

---

# The

Problem

Business asks

```
Display

Sales

By

Every

Product

Category.
```

Current

categories

```text
Electronics

Furniture

Books
```

Next month,

Business

adds

```text
Clothing
```

The

existing

static

pivot

does not

show

the new

category.

Someone

must edit

the SQL.

---

# What Is

Dynamic

Pivoting?

Dynamic

Pivoting

creates

the

pivot

columns

automatically

at runtime.

Instead

of

hardcoding

column

names,

the query

discovers

them

from

the data.

---

# Static

Vs

Dynamic

Pivot

Static

```text
Known

Columns

↓

Q1

Q2

Q3

Q4
```

---

Dynamic

```text
Read

Distinct

Values

↓

Create

Columns

Automatically
```

---

# Dynamic

Pivot

Workflow

```text
Read

Distinct

Categories

↓

Generate

Column

List

↓

Build

SQL

Statement

↓

Execute

SQL

↓

Return

Pivoted

Result
```

The

SQL

statement

itself

is

generated

dynamically.

---

# Example

Sales

Table

| Region | Product | Sales |
|---------|----------|------:|
|North|Laptop|120|
|North|Tablet|80|
|North|Phone|150|
|South|Laptop|90|
|South|Phone|140|

Business asks

```
Display

Sales

For

Every

Product

As

Columns.
```

Current

products

become

columns.

```text
Region

Laptop

Tablet

Phone
```

Next month,

if

```
Monitor
```

is added,

the report

automatically

includes

a

```
Monitor
```

column.

---

# Why

Dynamic

SQL?

Normal

SQL

must know

all

column names

before

execution.

Dynamic

pivoting

requires

building

the SQL

statement

after

reading

the data.

Conceptually

```text
Data

↓

SQL

Generation

↓

Execution
```

---

# PostgreSQL

Support

PostgreSQL

does not

provide

automatic

dynamic

pivoting.

Instead,

developers

typically

use

- Dynamic SQL

inside

PL/pgSQL

functions

or

procedures

- Application

code

(Python,

Java,

Node.js,

etc.)

- Report

generation

tools

that

generate

SQL

automatically

---

# Example

Dynamic

Column

Discovery

Suppose

the table

contains

products.

```sql
SELECT

DISTINCT product

FROM sales

ORDER BY product;
```

Result

```text
Laptop

Phone

Tablet
```

These

values

can then

be used

to build

the pivot

query.

---

# Conceptual

Dynamic

Query

Suppose

the discovered

products

are

```text
Laptop

Phone

Tablet
```

The

generated

SQL

might

look like

```sql
SELECT

region,

SUM(CASE WHEN product='Laptop' THEN sales END) AS laptop,

SUM(CASE WHEN product='Phone' THEN sales END) AS phone,

SUM(CASE WHEN product='Tablet' THEN sales END) AS tablet

FROM sales

GROUP BY region;
```

Notice

that

the SQL

was created

automatically,

not

typed

manually.

---

# Building

Dynamic

SQL

In

PL/pgSQL

the SQL

is often

constructed

as

a string.

Conceptually

```text
'SELECT ...'

+

Generated

Column

Expressions

+

'FROM sales'
```

The

finished

string

is then

executed.

---

# Business

Example

Business asks

```
Generate

Monthly

Revenue

Report

For

Every

Year.
```

Each year

contains

different

months

of data.

Dynamic

pivoting

automatically

adapts

to

new

months

without

changing

the SQL.

---

# Advantages

Of

Dynamic

Pivoting

✅ Automatically

handles

new

categories.

---

✅ Requires

less

manual

maintenance.

---

✅ Ideal

for

changing

business

data.

---

✅ Useful

for

reporting

applications.

---

# Limitations

Of

Dynamic

Pivoting

❌ More

complex

than

static

pivoting.

---

❌ Requires

dynamic

SQL.

---

❌ Harder

to debug.

---

❌ Query

plans

cannot

always

be reused

because

the SQL

changes.

---

# Dynamic

Pivot

Vs

Static

Pivot

| Feature | Static Pivot | Dynamic Pivot |
|---------|--------------|---------------|
|Known Columns|✅ Yes|❌ No|
|Easy to Write|✅ Yes|⚠️ Moderate|
|Automatically Handles New Categories|❌ No|✅ Yes|
|Uses Dynamic SQL|❌ No|✅ Yes|
|Best For|Fixed Reports|Changing Reports|

---

# Enterprise

Applications

Business

Intelligence

```text
Interactive

Dashboards
```

---

Retail

```text
Product

Reports
```

---

Finance

```text
Monthly

Revenue
```

---

Healthcare

```text
Hospital

Statistics
```

---

Education

```text
Student

Performance
```

---

# Think Like

A BI

Developer

Business asks

```
Create

A Dashboard

That

Automatically

Displays

Sales

For

New Products

Without

Changing

The SQL.
```

A static

pivot

would

require

manual

updates.

A dynamic

pivot

builds

the column

list

automatically,

making

the dashboard

self-adjusting

as

the business

changes.

---

# Performance

Considerations

Dynamic

pivoting

usually

requires

two

steps.

Step 1

Discover

distinct

column

values.

↓

Step 2

Build

and

execute

dynamic

SQL.

This

introduces

additional

processing

compared

to

a static

pivot.

For

frequently

executed

reports,

consider

caching

or

materializing

the results

when

appropriate.

Always

measure

performance

using

```
EXPLAIN ANALYZE
```

on

the

generated

query.

---

# Best Practices

✅ Use static pivots whenever the output columns are fixed.

✅ Use dynamic pivots only when categories change frequently.

✅ Validate dynamically generated SQL carefully.

✅ Use descriptive aliases for generated columns.

✅ Separate SQL generation from business logic.

---

# Common Mistakes

❌ Using dynamic pivoting for fixed reports.

❌ Concatenating untrusted input into dynamic SQL.

❌ Forgetting to quote identifiers correctly.

❌ Ignoring SQL injection risks in application-generated SQL.

❌ Assuming dynamic pivoting is always faster.

---

# PostgreSQL Practice Lab

## Exercise 1

Identify

a report

that

requires

dynamic

pivoting.

---

## Exercise 2

Retrieve

the distinct

category

values

from

a table.

---

## Exercise 3

Explain

how

those

values

can

be used

to generate

a pivot

query.

---

## Exercise 4

Compare

the maintenance

effort

of

static

and

dynamic

pivoting.

---

## Exercise 5

List

the advantages

and

disadvantages

of

dynamic

SQL

for

pivoting.

---

# Interview Questions

## Beginner

1. What is dynamic pivoting?

2. Why can't a static pivot automatically display new categories?

3. Why is dynamic SQL required for dynamic pivoting?

---

## Intermediate

1. Explain the workflow of a dynamic pivot.

2. How are pivot column names discovered?

3. Why is dynamic pivoting more difficult to debug?

---

## Senior

1. Design a reporting solution that automatically adapts to new business categories.

2. Discuss the security considerations when generating SQL dynamically.

3. Compare static pivoting, dynamic pivoting, and `crosstab()` for enterprise reporting.

---

# Section Summary

In this section,

you learned:

- Dynamic pivoting creates pivot columns automatically based on the data.
- It typically involves discovering distinct values, generating SQL dynamically, and executing that SQL.
- PostgreSQL does not provide automatic dynamic pivoting, so developers commonly use PL/pgSQL, application code, or reporting tools.
- Dynamic pivoting is ideal for reports whose categories change over time.
- Care must be taken to ensure security, maintainability, and performance when generating dynamic SQL.

---

# Coming Up Next

## Section 39.5

# Unpivoting Data

You'll learn:

- What unpivoting is.
- Converting columns into rows.
- Using `UNION ALL`.
- Practical ETL use cases.
- Data warehouse transformations.
- Enterprise reporting patterns.


# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.5
# Unpivoting Data
# ==========================================================

# Introduction

In the

previous

sections,

you learned

how

to transform

rows

into

columns

using

pivoting.

Sometimes,

the opposite

transformation

is required.

Business

or

ETL

processes

may receive

data

stored

across

multiple

columns,

but

analytics

and

reporting

often

work better

when

the data

is stored

as

rows.

This

transformation

is called

```
Unpivoting.
```

---

# What Is

Unpivoting?

Unpivoting

converts

columns

into

rows.

Instead

of

```text
Region

Q1

Q2

Q3

Q4
```

we produce

```text
Region

Quarter

Sales
```

This

creates

a normalized

structure

that

is easier

to query,

aggregate,

and

analyze.

---

# Sample

Pivoted

Sales

Table

| Region | Q1 | Q2 | Q3 | Q4 |
|---------|---:|---:|---:|---:|
|North|100|120|140|180|
|South|150|170|160|200|

Business asks

```
Convert

Quarter

Columns

Into

Rows.
```

---

# Expected

Result

| Region | Quarter | Sales |
|---------|----------|------:|
|North|Q1|100|
|North|Q2|120|
|North|Q3|140|
|North|Q4|180|
|South|Q1|150|
|South|Q2|170|
|South|Q3|160|
|South|Q4|200|

---

# Does

PostgreSQL

Have

UNPIVOT?

Unlike

some

database

systems,

PostgreSQL

does

not

provide

a built-in

```
UNPIVOT
```

operator.

Instead,

unpivoting

is commonly

performed

using

- `UNION ALL`

- `VALUES`

with

a

`LATERAL`

join

Both

approaches

are widely

used

in

production.

---

# Method 1

Using

UNION ALL

```sql
SELECT

region,

'Q1'

AS quarter,

q1

AS sales

FROM sales_summary

UNION ALL

SELECT

region,

'Q2',

q2

FROM sales_summary

UNION ALL

SELECT

region,

'Q3',

q3

FROM sales_summary

UNION ALL

SELECT

region,

'Q4',

q4

FROM sales_summary;
```

---

# Result

| Region | Quarter | Sales |
|---------|----------|------:|
|North|Q1|100|
|North|Q2|120|
|North|Q3|140|
|North|Q4|180|

The

same

pattern

continues

for

every

region.

---

# Visualizing

The

Transformation

Original

```text
North

Q1 100

Q2 120

Q3 140

Q4 180
```

↓

UNION ALL

↓

```text
North

Q1

100

North

Q2

120

North

Q3

140

North

Q4

180
```

Columns

become

rows.

---

# Method 2

Using

VALUES

With

LATERAL

PostgreSQL

provides

a concise

alternative.

```sql
SELECT

s.region,

v.quarter,

v.sales

FROM sales_summary s

CROSS JOIN LATERAL

(
    VALUES

    ('Q1', s.q1),

    ('Q2', s.q2),

    ('Q3', s.q3),

    ('Q4', s.q4)

)

AS v

(
    quarter,

    sales
);
```

---

# Result

| Region | Quarter | Sales |
|---------|----------|------:|
|North|Q1|100|
|North|Q2|120|
|North|Q3|140|
|North|Q4|180|
|South|Q1|150|
|South|Q2|170|
|South|Q3|160|
|South|Q4|200|

This

approach

is usually

shorter

and

easier

to maintain

than

multiple

`UNION ALL`

statements.

---

# Why

Use

LATERAL?

The

`VALUES`

list

needs

access

to

the current

row

from

`sales_summary`.

`LATERAL`

allows

the derived

table

to reference

columns

from

the row

currently

being

processed.

---

# Business

Example

Employee

Performance

Table

| Employee | Jan | Feb | Mar |
|-----------|----:|----:|----:|
|Alice|92|94|96|
|Bob|88|90|91|

Business asks

```
Convert

Monthly

Scores

Into

Rows.
```

Result

| Employee | Month | Score |
|-----------|--------|------:|
|Alice|Jan|92|
|Alice|Feb|94|
|Alice|Mar|96|
|Bob|Jan|88|
|Bob|Feb|90|
|Bob|Mar|91|

---

# ETL

Use Case

Many

Excel

files

arrive

like

this.

```text
Store

Jan

Feb

Mar

Apr
```

Before

loading

the data

into

a Data

Warehouse,

ETL

processes

often

unpivot

the data

into

```text
Store

Month

Sales
```

This

normalized

format

supports

aggregation,

filtering,

and

analytics

much more

efficiently.

---

# Data

Warehouse

Workflow

```text
Excel

↓

Unpivot

↓

Normalized

Rows

↓

Load

Fact Table

↓

Analytics
```

Unpivoting

is therefore

a common

ETL

transformation.

---

# Advantages

Of

Unpivoting

✅ Produces

normalized

data.

---

✅ Simplifies

aggregation.

---

✅ Easier

to filter.

---

✅ Better

for

time-series

analysis.

---

✅ Ideal

for

Data

Warehouses.

---

# Limitations

Of

Unpivoting

❌ Increases

the number

of rows.

---

❌ Wide

tables

may require

many

column

transformations.

---

❌ Manual

queries

become

longer

when

many

columns

exist.

---

# Business

Applications

Finance

```text
Budget

Imports
```

---

Retail

```text
Monthly

Sales
```

---

Healthcare

```text
Patient

Measurements
```

---

Manufacturing

```text
Production

Logs
```

---

Education

```text
Semester

Results
```

---

# Think Like

A Data

Engineer

Business asks

```
Import

Thousands

Of

Excel

Files

Containing

Monthly

Columns

Into

A Data

Warehouse.
```

Instead

of storing

monthly

values

as

columns,

unpivot

them

into

rows.

The

resulting

schema

is easier

to aggregate,

join,

filter,

and

analyze.

---

# Performance

Considerations

`UNION ALL`

executes

one query

per

source

column,

so

very wide

tables

can produce

long

queries.

The

`VALUES`

+

`LATERAL`

approach

is often

more

compact

and

maintainable,

although

both

ultimately

expand

each

source

row

into

multiple

output

rows.

Always

measure

performance

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Prefer normalized data for analytics.

✅ Use `UNION ALL` instead of `UNION` unless duplicate removal is required.

✅ Consider `VALUES` with `LATERAL` for cleaner PostgreSQL code.

✅ Unpivot data during ETL whenever practical.

✅ Use meaningful names for generated columns.

---

# Common Mistakes

❌ Expecting PostgreSQL to provide an `UNPIVOT` keyword.

❌ Using `UNION` instead of `UNION ALL` unnecessarily.

❌ Forgetting that unpivoting increases row count.

❌ Keeping spreadsheet-style data in analytical databases.

❌ Ignoring data normalization.

---

# PostgreSQL Practice Lab

## Exercise 1

Convert

quarterly

sales

columns

into

rows

using

`UNION ALL`.

---

## Exercise 2

Rewrite

the same

query

using

`VALUES`

and

`LATERAL`.

---

## Exercise 3

Unpivot

monthly

employee

performance

scores.

---

## Exercise 4

Explain

why

unpivoting

is common

in

ETL

pipelines.

---

## Exercise 5

Compare

the

`UNION ALL`

and

`VALUES`

approaches

for

readability

and

maintainability.

---

# Interview Questions

## Beginner

1. What is unpivoting?

2. Why is unpivoting useful?

3. Does PostgreSQL support an `UNPIVOT` keyword?

---

## Intermediate

1. Explain how `UNION ALL` performs unpivoting.

2. What role does `LATERAL` play in the `VALUES` approach?

3. Why is normalized data preferred for analytics?

---

## Senior

1. Design an ETL process that unpivots spreadsheet-style monthly data into a fact table.

2. Compare `UNION ALL` and `VALUES ... LATERAL` for unpivoting in PostgreSQL.

3. How would you optimize unpivoting for tables containing hundreds of columns?

---

# Section Summary

In this section,

you learned:

- Unpivoting converts columns into rows.
- PostgreSQL does not provide a built-in `UNPIVOT` operator.
- Unpivoting is commonly implemented using `UNION ALL` or `VALUES` with a `LATERAL` join.
- Normalized row-based data is easier to aggregate, filter, and analyze than spreadsheet-style wide tables.
- Unpivoting is a fundamental transformation in ETL pipelines and data warehouse design.

---

# Coming Up Next

## Section 39.6

# Crosstab() in PostgreSQL

You'll learn:

- The `tablefunc` extension.
- Using the `crosstab()` function.
- Static pivot tables.
- Input query requirements.
- Performance and limitations.
- Enterprise reporting examples.

# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.6
# Crosstab() in PostgreSQL
# ==========================================================

# Introduction

In the

previous

sections,

you learned

how

to create

pivot

tables

using

```
CASE
```

and

learned

the concepts

behind

dynamic

pivoting.

PostgreSQL

also provides

a specialized

function

called

```
crosstab()
```

which

can create

pivot

tables

more

efficiently

for

many

reporting

scenarios.

Unlike

conditional

aggregation,

```
crosstab()
```

is provided

through

the

```
tablefunc
```

extension,

not

the

PostgreSQL

core

SQL language.

---

# What Is

crosstab()?

```
crosstab()
```

transforms

rows

into

columns,

similar

to

a pivot

table.

Input

```text
Region

Quarter

Sales
```

↓

Output

```text
Region

Q1

Q2

Q3

Q4
```

It is

designed

specifically

for

reporting.

---

# Enabling

The

Extension

Before

using

```
crosstab(),
```

the

extension

must

be installed.

```sql
CREATE EXTENSION tablefunc;
```

This

is usually

performed

once

per

database.

---

# Sample

Sales

Table

| Region | Quarter | Sales |
|---------|---------|------:|
|North|Q1|100|
|North|Q2|120|
|North|Q3|140|
|North|Q4|180|
|South|Q1|150|
|South|Q2|170|
|South|Q3|160|
|South|Q4|200|

Business asks

```
Display

Quarterly

Sales

As

Columns.
```

---

# Basic

crosstab()

Query

```sql
SELECT *

FROM crosstab
(
$$

SELECT

region,

quarter,

sales

FROM sales

ORDER BY

region,

quarter

$$
)

AS pivot_result
(
    region TEXT,

    q1 NUMERIC,

    q2 NUMERIC,

    q3 NUMERIC,

    q4 NUMERIC
);
```

---

# Result

| Region | Q1 | Q2 | Q3 | Q4 |
|---------|---:|---:|---:|---:|
|North|100|120|140|180|
|South|150|170|160|200|

---

# Understanding

The Input

Query

The

input

must return

exactly

three

columns.

```text
Row Identifier

↓

Category

↓

Value
```

Example

```sql
SELECT

region,

quarter,

sales

FROM sales;
```

---

# Why

ORDER BY

Matters

The

input

must be

ordered

correctly.

```sql
ORDER BY

region,

quarter
```

Without

consistent

ordering,

values

may appear

under

the wrong

columns.

---

# Defining

The

Output

Unlike

ordinary

queries,

```
crosstab()
```

requires

the output

columns

to be

declared

explicitly.

```sql
AS pivot_result
(
    region TEXT,

    q1 NUMERIC,

    q2 NUMERIC,

    q3 NUMERIC,

    q4 NUMERIC
)
```

PostgreSQL

must know

the result

structure

before

executing

the query.

---

# Using

A Category

Query

A more

robust

form

of

`crosstab()`

accepts

two queries.

The first

returns

the data.

The second

returns

the ordered

list

of

categories.

```sql
SELECT *

FROM crosstab
(
$$
SELECT

region,

quarter,

sales

FROM sales

ORDER BY

region,

quarter
$$,

$$
SELECT

DISTINCT

quarter

FROM sales

ORDER BY

quarter
$$
)

AS pivot_result
(
    region TEXT,

    q1 NUMERIC,

    q2 NUMERIC,

    q3 NUMERIC,

    q4 NUMERIC
);
```

Using

a category

query

helps

ensure

that

values

are placed

under

the correct

columns,

especially

when

some

categories

are missing

for

certain

rows.

---

# Missing

Categories

Suppose

North

has

no

Q4

sales.

Result

```text
North

100

120

140

NULL
```

Unlike

conditional

aggregation,

`crosstab()`

returns

`NULL`

for

missing

categories.

Use

```
COALESCE()
```

afterward

if

zeros

are preferred.

---

# Visualizing

The

Transformation

Input

```text
North

Q1

100

North

Q2

120

North

Q3

140
```

↓

crosstab()

↓

```text
North

100

120

140

NULL
```

Rows

become

columns.

---

# Advantages

Of

crosstab()

✅ Shorter

than

large

`CASE`

queries.

---

✅ Designed

specifically

for

pivoting.

---

✅ Performs

well

for

many

static

pivot

reports.

---

✅ Produces

cleaner

reporting

SQL.

---

# Limitations

Of

crosstab()

❌ Requires

the

`tablefunc`

extension.

---

❌ Output

columns

must be

known

before

execution.

---

❌ Not

well suited

for

fully

dynamic

pivoting.

---

❌ Input

ordering

is critical.

---

# CASE

Vs

crosstab()

| Feature | CASE | crosstab() |
|---------|------|------------|
|Standard SQL|✅ Yes|❌ PostgreSQL Specific|
|Needs Extension|❌ No|✅ Yes|
|Easy To Read|⚠️ Moderate|✅ Yes|
|Dynamic Columns|❌ No|❌ No (by itself)|
|Widely Portable|✅ Yes|❌ PostgreSQL Only|

---

# Business

Applications

Finance

```text
Quarterly

Revenue
```

---

Retail

```text
Monthly

Sales
```

---

Healthcare

```text
Patient

Statistics
```

---

Manufacturing

```text
Production

Reports
```

---

Education

```text
Semester

Results
```

---

# Think Like

A BI

Developer

Business asks

```
Generate

Quarterly

Sales

Reports

Every Day

For

Executives.
```

If

the report

always

contains

the same

quarters,

```
crosstab()
```

provides

a concise

and

efficient

solution,

reducing

the amount

of SQL

compared

to

large

conditional

aggregation

queries.

---

# Performance

Considerations

`crosstab()`

is optimized

for

row-to-column

transformations,

but

the source

query

still

performs

the heavy

work

of

filtering,

joining,

sorting,

and

aggregation.

Ensure

the source

query

is efficient

and

returns

rows

ordered

correctly.

Indexes

on

grouping

and

category

columns

can improve

the performance

of

the source

query.

Always

measure

using

```
EXPLAIN ANALYZE
```

on

the source

query,

since

`crosstab()`

itself

acts

on

its output.

---

# Best Practices

✅ Enable `tablefunc` only once per database.

✅ Always order the source query correctly.

✅ Prefer the two-query form for reliable category mapping.

✅ Declare output columns carefully.

✅ Use `COALESCE()` when missing categories should appear as zero.

---

# Common Mistakes

❌ Forgetting to install the `tablefunc` extension.

❌ Returning the wrong number of columns from the source query.

❌ Omitting `ORDER BY` in the source query.

❌ Declaring incorrect output data types.

❌ Expecting `crosstab()` to automatically create dynamic columns.

---

# PostgreSQL Practice Lab

## Exercise 1

Enable

the

`tablefunc`

extension.

---

## Exercise 2

Create

a quarterly

sales

pivot

using

`crosstab()`.

---

## Exercise 3

Rewrite

a

`CASE`

pivot

using

`crosstab()`.

---

## Exercise 4

Handle

missing

quarters

using

`COALESCE()`.

---

## Exercise 5

Compare

the readability

of

`CASE`

and

`crosstab()`

solutions.

---

# Interview Questions

## Beginner

1. What is `crosstab()`?

2. Which PostgreSQL extension provides `crosstab()`?

3. Why must output columns be declared explicitly?

---

## Intermediate

1. Why is `ORDER BY` required in the source query?

2. Explain the difference between the one-query and two-query forms of `crosstab()`.

3. When would you choose `crosstab()` instead of conditional aggregation?

---

## Senior

1. Design a quarterly reporting solution using `crosstab()`.

2. Compare `CASE`, `FILTER`, and `crosstab()` for enterprise pivot reports.

3. How would you optimize the source query used by `crosstab()` for millions of rows?

---

# Section Summary

In this section,

you learned:

- `crosstab()` is PostgreSQL's specialized function for creating pivot tables.
- It is provided by the `tablefunc` extension and must be enabled before use.
- The source query must return row identifier, category, and value columns in the correct order.
- Output columns must be declared explicitly because PostgreSQL needs the result structure in advance.
- `crosstab()` is concise and efficient for static pivot reports but is not a replacement for fully dynamic pivoting.

---

# Coming Up Next

## Section 39.7

# GROUPING SETS

You'll learn:

- Multiple grouping levels in a single query.
- Eliminating repeated `UNION ALL` queries.
- Multi-dimensional aggregation.
- Enterprise financial reporting.
- Performance advantages over multiple aggregations.


# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.6
# Crosstab() in PostgreSQL
# ==========================================================

# Introduction

In the

previous

sections,

you learned

how

to create

pivot

tables

using

```
CASE
```

and

learned

the concepts

behind

dynamic

pivoting.

PostgreSQL

also provides

a specialized

function

called

```
crosstab()
```

which

can create

pivot

tables

more

efficiently

for

many

reporting

scenarios.

Unlike

conditional

aggregation,

```
crosstab()
```

is provided

through

the

```
tablefunc
```

extension,

not

the

PostgreSQL

core

SQL language.

---

# What Is

crosstab()?

```
crosstab()
```

transforms

rows

into

columns,

similar

to

a pivot

table.

Input

```text
Region

Quarter

Sales
```

↓

Output

```text
Region

Q1

Q2

Q3

Q4
```

It is

designed

specifically

for

reporting.

---

# Enabling

The

Extension

Before

using

```
crosstab(),
```

the

extension

must

be installed.

```sql
CREATE EXTENSION tablefunc;
```

This

is usually

performed

once

per

database.

---

# Sample

Sales

Table

| Region | Quarter | Sales |
|---------|---------|------:|
|North|Q1|100|
|North|Q2|120|
|North|Q3|140|
|North|Q4|180|
|South|Q1|150|
|South|Q2|170|
|South|Q3|160|
|South|Q4|200|

Business asks

```
Display

Quarterly

Sales

As

Columns.
```

---

# Basic

crosstab()

Query

```sql
SELECT *

FROM crosstab
(
$$

SELECT

region,

quarter,

sales

FROM sales

ORDER BY

region,

quarter

$$
)

AS pivot_result
(
    region TEXT,

    q1 NUMERIC,

    q2 NUMERIC,

    q3 NUMERIC,

    q4 NUMERIC
);
```

---

# Result

| Region | Q1 | Q2 | Q3 | Q4 |
|---------|---:|---:|---:|---:|
|North|100|120|140|180|
|South|150|170|160|200|

---

# Understanding

The Input

Query

The

input

must return

exactly

three

columns.

```text
Row Identifier

↓

Category

↓

Value
```

Example

```sql
SELECT

region,

quarter,

sales

FROM sales;
```

---

# Why

ORDER BY

Matters

The

input

must be

ordered

correctly.

```sql
ORDER BY

region,

quarter
```

Without

consistent

ordering,

values

may appear

under

the wrong

columns.

---

# Defining

The

Output

Unlike

ordinary

queries,

```
crosstab()
```

requires

the output

columns

to be

declared

explicitly.

```sql
AS pivot_result
(
    region TEXT,

    q1 NUMERIC,

    q2 NUMERIC,

    q3 NUMERIC,

    q4 NUMERIC
)
```

PostgreSQL

must know

the result

structure

before

executing

the query.

---

# Using

A Category

Query

A more

robust

form

of

`crosstab()`

accepts

two queries.

The first

returns

the data.

The second

returns

the ordered

list

of

categories.

```sql
SELECT *

FROM crosstab
(
$$
SELECT

region,

quarter,

sales

FROM sales

ORDER BY

region,

quarter
$$,

$$
SELECT

DISTINCT

quarter

FROM sales

ORDER BY

quarter
$$
)

AS pivot_result
(
    region TEXT,

    q1 NUMERIC,

    q2 NUMERIC,

    q3 NUMERIC,

    q4 NUMERIC
);
```

Using

a category

query

helps

ensure

that

values

are placed

under

the correct

columns,

especially

when

some

categories

are missing

for

certain

rows.

---

# Missing

Categories

Suppose

North

has

no

Q4

sales.

Result

```text
North

100

120

140

NULL
```

Unlike

conditional

aggregation,

`crosstab()`

returns

`NULL`

for

missing

categories.

Use

```
COALESCE()
```

afterward

if

zeros

are preferred.

---

# Visualizing

The

Transformation

Input

```text
North

Q1

100

North

Q2

120

North

Q3

140
```

↓

crosstab()

↓

```text
North

100

120

140

NULL
```

Rows

become

columns.

---

# Advantages

Of

crosstab()

✅ Shorter

than

large

`CASE`

queries.

---

✅ Designed

specifically

for

pivoting.

---

✅ Performs

well

for

many

static

pivot

reports.

---

✅ Produces

cleaner

reporting

SQL.

---

# Limitations

Of

crosstab()

❌ Requires

the

`tablefunc`

extension.

---

❌ Output

columns

must be

known

before

execution.

---

❌ Not

well suited

for

fully

dynamic

pivoting.

---

❌ Input

ordering

is critical.

---

# CASE

Vs

crosstab()

| Feature | CASE | crosstab() |
|---------|------|------------|
|Standard SQL|✅ Yes|❌ PostgreSQL Specific|
|Needs Extension|❌ No|✅ Yes|
|Easy To Read|⚠️ Moderate|✅ Yes|
|Dynamic Columns|❌ No|❌ No (by itself)|
|Widely Portable|✅ Yes|❌ PostgreSQL Only|

---

# Business

Applications

Finance

```text
Quarterly

Revenue
```

---

Retail

```text
Monthly

Sales
```

---

Healthcare

```text
Patient

Statistics
```

---

Manufacturing

```text
Production

Reports
```

---

Education

```text
Semester

Results
```

---

# Think Like

A BI

Developer

Business asks

```
Generate

Quarterly

Sales

Reports

Every Day

For

Executives.
```

If

the report

always

contains

the same

quarters,

```
crosstab()
```

provides

a concise

and

efficient

solution,

reducing

the amount

of SQL

compared

to

large

conditional

aggregation

queries.

---

# Performance

Considerations

`crosstab()`

is optimized

for

row-to-column

transformations,

but

the source

query

still

performs

the heavy

work

of

filtering,

joining,

sorting,

and

aggregation.

Ensure

the source

query

is efficient

and

returns

rows

ordered

correctly.

Indexes

on

grouping

and

category

columns

can improve

the performance

of

the source

query.

Always

measure

using

```
EXPLAIN ANALYZE
```

on

the source

query,

since

`crosstab()`

itself

acts

on

its output.

---

# Best Practices

✅ Enable `tablefunc` only once per database.

✅ Always order the source query correctly.

✅ Prefer the two-query form for reliable category mapping.

✅ Declare output columns carefully.

✅ Use `COALESCE()` when missing categories should appear as zero.

---

# Common Mistakes

❌ Forgetting to install the `tablefunc` extension.

❌ Returning the wrong number of columns from the source query.

❌ Omitting `ORDER BY` in the source query.

❌ Declaring incorrect output data types.

❌ Expecting `crosstab()` to automatically create dynamic columns.

---

# PostgreSQL Practice Lab

## Exercise 1

Enable

the

`tablefunc`

extension.

---

## Exercise 2

Create

a quarterly

sales

pivot

using

`crosstab()`.

---

## Exercise 3

Rewrite

a

`CASE`

pivot

using

`crosstab()`.

---

## Exercise 4

Handle

missing

quarters

using

`COALESCE()`.

---

## Exercise 5

Compare

the readability

of

`CASE`

and

`crosstab()`

solutions.

---

# Interview Questions

## Beginner

1. What is `crosstab()`?

2. Which PostgreSQL extension provides `crosstab()`?

3. Why must output columns be declared explicitly?

---

## Intermediate

1. Why is `ORDER BY` required in the source query?

2. Explain the difference between the one-query and two-query forms of `crosstab()`.

3. When would you choose `crosstab()` instead of conditional aggregation?

---

## Senior

1. Design a quarterly reporting solution using `crosstab()`.

2. Compare `CASE`, `FILTER`, and `crosstab()` for enterprise pivot reports.

3. How would you optimize the source query used by `crosstab()` for millions of rows?

---

# Section Summary

In this section,

you learned:

- `crosstab()` is PostgreSQL's specialized function for creating pivot tables.
- It is provided by the `tablefunc` extension and must be enabled before use.
- The source query must return row identifier, category, and value columns in the correct order.
- Output columns must be declared explicitly because PostgreSQL needs the result structure in advance.
- `crosstab()` is concise and efficient for static pivot reports but is not a replacement for fully dynamic pivoting.

---

# Coming Up Next

## Section 39.7

# GROUPING SETS

You'll learn:

- Multiple grouping levels in a single query.
- Eliminating repeated `UNION ALL` queries.
- Multi-dimensional aggregation.
- Enterprise financial reporting.
- Performance advantages over multiple aggregations.

# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.7
# GROUPING SETS
# ==========================================================

# Introduction

Business

reports

often

require

multiple

levels

of

aggregation.

For example,

Business asks

```
Show

Sales

By

Region

↓

By

Product

↓

Grand

Total
```

A beginner

solution

might

use

multiple

queries

combined

with

```
UNION ALL.
```

However,

this

requires

multiple

table

scans

and

repeated

aggregation.

PostgreSQL

provides

a much

better

solution

called

```
GROUPING SETS.
```

---

# What Are

GROUPING

SETS?

```
GROUPING SETS
```

allow

multiple

different

```
GROUP BY
```

operations

to be

performed

inside

a single

query.

Instead

of writing

multiple

queries,

you define

all

required

grouping

levels

together.

---

# Traditional

Approach

Suppose

Business asks

```
Sales

By Region

↓

Sales

By Product

↓

Grand

Total
```

Without

```
GROUPING SETS
```

you might

write

```sql
SELECT

region,

NULL,

SUM(sales)

FROM sales

GROUP BY region

UNION ALL

SELECT

NULL,

product,

SUM(sales)

FROM sales

GROUP BY product

UNION ALL

SELECT

NULL,

NULL,

SUM(sales)

FROM sales;
```

The table

is scanned

multiple

times.

---

# Using

GROUPING

SETS

The same

result

can be

produced

using

one query.

```sql
SELECT

region,

product,

SUM(sales)

AS total_sales

FROM sales

GROUP BY

GROUPING SETS
(
    (region),

    (product),

    ()
);
```

---

# Sample

Sales

Table

| Region | Product | Sales |
|---------|----------|------:|
|North|Laptop|100|
|North|Phone|150|
|South|Laptop|120|
|South|Phone|180|

---

# Result

| Region | Product | Total Sales |
|---------|----------|-----------:|
|North|NULL|250|
|South|NULL|300|
|NULL|Laptop|220|
|NULL|Phone|330|
|NULL|NULL|550|

Each

grouping

set

produces

its own

aggregation.

---

# Understanding

The

Grouping

Sets

```sql
(region)
```

↓

Sales

per

region

---

```sql
(product)
```

↓

Sales

per

product

---

```sql
()
```

↓

Grand

total

The empty

parentheses

represent

aggregation

over

the entire

table.

---

# Visualizing

Execution

```text
Sales Table

↓

Group By Region

↓

Group By Product

↓

Grand Total

↓

Combine Results
```

PostgreSQL

performs

all

groupings

within

one

logical

query.

---

# Multiple

Columns

Business asks

```
Display

Sales

By

Region

And

Product,

Then

Region,

Then

Grand

Total.
```

```sql
SELECT

region,

product,

SUM(sales)

AS total_sales

FROM sales

GROUP BY

GROUPING SETS
(
    (region, product),

    (region),

    ()
);
```

---

# Result

| Region | Product | Total Sales |
|---------|----------|-----------:|
|North|Laptop|100|
|North|Phone|150|
|South|Laptop|120|
|South|Phone|180|
|North|NULL|250|
|South|NULL|300|
|NULL|NULL|550|

The

query

returns

both

detailed

and

summary

rows.

---

# Why

Use

GROUPING

SETS?

Instead

of

```text
Query 1

↓

UNION ALL

↓

Query 2

↓

UNION ALL

↓

Query 3
```

you write

```text
One

Query

↓

Multiple

Grouping

Levels
```

This

is cleaner

and

often

more

efficient.

---

# Enterprise

Example

Business asks

```
Generate

Revenue

By

Department,

Region,

And

Overall

Company.
```

```
GROUPING SETS
```

can produce

all

three

reports

simultaneously.

---

# Handling

NULL

Values

Summary

rows

contain

```
NULL
```

for

columns

that

are not

part

of

the current

grouping.

Example

```text
North

NULL

250
```

means

```
Total

For

North
```

not

that

the product

is unknown.

Later,

you'll

learn

the

```
GROUPING()
```

function,

which

helps

distinguish

summary

NULLs

from

actual

NULL

data.

---

# GROUPING

SETS

Vs

UNION ALL

| Feature | GROUPING SETS | UNION ALL |
|---------|---------------|-----------|
|One Query|✅ Yes|❌ No|
|Multiple Aggregations|✅ Yes|⚠️ Multiple Queries|
|Readability|✅ Better|⚠️ Lower|
|Maintenance|✅ Easier|⚠️ Harder|
|Repeated Table Scans|Often Reduced|Often More|

Note

that

the optimizer

determines

the exact

execution

strategy,

but

`GROUPING SETS`

can often

avoid

the repeated

work

required

by

multiple

independent

aggregation

queries.

---

# Business

Applications

Finance

```text
Revenue

Summaries
```

---

Retail

```text
Sales

Reports
```

---

Healthcare

```text
Hospital

Statistics
```

---

Manufacturing

```text
Production

Summaries
```

---

Education

```text
Student

Analytics
```

---

# Think Like

A BI

Developer

Business asks

```
Generate

A Dashboard

Showing

Revenue

By

Product,

Region,

Department,

And

Company

Total.
```

Instead

of creating

four

separate

queries,

define

four

grouping

sets.

The

result

is easier

to maintain

and

often

more

efficient.

---

# Performance

Considerations

`GROUPING SETS`

can reduce

the need

for

multiple

independent

aggregation

queries,

potentially

reducing

I/O

and

sorting

work.

However,

large

numbers

of

grouping

sets

still

increase

processing

cost.

Appropriate

indexes

on

grouping

columns

and

reviewing

the execution

plan

with

```
EXPLAIN ANALYZE
```

remain

important.

---

# Best Practices

✅ Use `GROUPING SETS` instead of repeated aggregation queries.

✅ Group logically related summaries together.

✅ Label summary rows for reporting.

✅ Keep grouping sets readable.

✅ Verify execution plans for large datasets.

---

# Common Mistakes

❌ Replacing every simple `GROUP BY` with `GROUPING SETS`.

❌ Confusing summary `NULL`s with actual data `NULL`s.

❌ Creating unnecessary grouping combinations.

❌ Using multiple `UNION ALL` queries when `GROUPING SETS` is more appropriate.

❌ Ignoring execution plans.

---

# PostgreSQL Practice Lab

## Exercise 1

Generate

sales

by

region,

product,

and

grand

total

using

`GROUPING SETS`.

---

## Exercise 2

Rewrite

a

`UNION ALL`

aggregation

using

`GROUPING SETS`.

---

## Exercise 3

Add

an additional

grouping

for

department.

---

## Exercise 4

Identify

which

rows

represent

summary

totals.

---

## Exercise 5

Compare

the execution

plans

of

`GROUPING SETS`

and

multiple

`UNION ALL`

queries.

---

# Interview Questions

## Beginner

1. What are `GROUPING SETS`?

2. Why are they useful?

3. What does the empty grouping set `()` represent?

---

## Intermediate

1. How do `GROUPING SETS` reduce query complexity?

2. Why do summary rows contain `NULL` values?

3. Compare `GROUPING SETS` with multiple `UNION ALL` queries.

---

## Senior

1. Design an executive revenue report using multiple grouping levels.

2. Explain how `GROUPING SETS` improve maintainability.

3. How would you optimize a query containing many grouping sets?

---

# Section Summary

In this section,

you learned:

- `GROUPING SETS` allow multiple `GROUP BY` operations within a single query.
- They simplify SQL by replacing multiple aggregation queries combined with `UNION ALL`.
- The empty grouping set `()` produces the grand total.
- Summary rows contain `NULL` values for columns not included in the current grouping level.
- `GROUPING SETS` are widely used for enterprise financial reporting, dashboards, and multi-level summaries.

---

# Coming Up Next

## Section 39.8

# ROLLUP

You'll learn:

- Hierarchical aggregations.
- Automatic subtotal generation.
- Grand totals.
- Financial reporting.
- Sales hierarchy analysis.
- Enterprise dashboard use cases.


# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.9
# CUBE
# ==========================================================

# Introduction

Business

analytics

often

requires

examining

data

from

multiple

dimensions

simultaneously.

For example,

Business asks

```
Analyze

Sales

By

Region,

Product,

Department,

And

Overall

Totals.
```

Unlike

```
ROLLUP,
```

which

follows

a hierarchy,

some

reports

need

every

possible

combination

of

grouping

columns.

PostgreSQL

provides

```
CUBE
```

for

this

purpose.

---

# What Is

CUBE?

```
CUBE
```

is

an extension

to

```
GROUP BY
```

that

generates

every

possible

combination

of

the specified

grouping

columns.

This

supports

multi-dimensional

analysis,

commonly

used

in

OLAP

(On-Line

Analytical

Processing)

systems.

---

# Sample

Sales

Table

| Region | Product | Sales |
|---------|----------|------:|
|North|Laptop|100|
|North|Phone|150|
|South|Laptop|120|
|South|Phone|180|

Business asks

```
Display

Sales

By

Every

Combination

Of

Region

And

Product.
```

---

# Basic

CUBE

Query

```sql
SELECT

region,

product,

SUM(sales)

AS total_sales

FROM sales

GROUP BY

CUBE
(
    region,

    product
);
```

---

# Result

| Region | Product | Total Sales |
|---------|----------|-----------:|
|North|Laptop|100|
|North|Phone|150|
|South|Laptop|120|
|South|Phone|180|
|North|NULL|250|
|South|NULL|300|
|NULL|Laptop|220|
|NULL|Phone|330|
|NULL|NULL|550|

---

# Understanding

CUBE

For

two

columns

```sql
CUBE
(
    region,

    product
)
```

PostgreSQL

generates

all

grouping

combinations.

```text
(region, product)

↓

(region)

↓

(product)

↓

()
```

Unlike

ROLLUP,

CUBE

also

includes

grouping

by

```
product
```

alone.

---

# Visualizing

The

Combinations

```text
Detailed

Rows

↓

Region

Totals

↓

Product

Totals

↓

Grand

Total
```

Every

possible

aggregation

is

generated.

---

# Three

Columns

Suppose

Business asks

```
Analyze

Sales

By

Region,

Department,

Product.
```

```sql
GROUP BY

CUBE
(
    region,

    department,

    product
);
```

Generated

groupings

are

```text
(region, department, product)

(region, department)

(region, product)

(department, product)

(region)

(department)

(product)

()
```

There

are

```
2³ = 8
```

grouping

combinations.

---

# How

Many

Grouping

Sets?

For

```
n
```

grouping

columns,

CUBE

generates

```text
2ⁿ
```

grouping

sets.

Examples

| Columns | Grouping Sets |
|---------:|--------------:|
|1|2|
|2|4|
|3|8|
|4|16|
|5|32|

The

number

of

summary

rows

grows

rapidly

as

more

dimensions

are added.

---

# CUBE

Vs

ROLLUP

Suppose

we use

```sql
ROLLUP
(
    region,

    product
)
```

Generated

levels

```text
(region, product)

↓

(region)

↓

()
```

---

Using

```sql
CUBE
(
    region,

    product
)
```

Generated

levels

```text
(region, product)

↓

(region)

↓

(product)

↓

()
```

CUBE

creates

additional

cross-dimensional

summaries.

---

# CUBE

Vs

ROLLUP

| Feature | CUBE | ROLLUP |
|---------|------|---------|
|Hierarchy Required|❌ No|✅ Yes|
|All Combinations|✅ Yes|❌ No|
|Grand Total|✅ Yes|✅ Yes|
|Subtotals|✅ All|✅ Hierarchical|

---

# Enterprise

Example

Business asks

```
Analyze

Revenue

By

Country,

Product,

Channel,

And

Every

Possible

Combination.
```

```
CUBE
```

can

generate

all

required

summaries

inside

one query,

making

it ideal

for

multidimensional

business

analysis.

---

# OLAP

Reporting

Business

Intelligence

systems

often

allow

users

to view

data

from

different

angles.

Examples

```text
Sales

By

Region
```

```text
Sales

By

Product
```

```text
Sales

By

Region

And

Product
```

```text
Overall

Sales
```

CUBE

supports

these

analyses

efficiently.

---

# Handling

NULL

Values

Summary

rows

contain

```
NULL
```

for

columns

that

are not

part

of

the current

grouping.

Example

```text
NULL

Laptop

220
```

means

```
Total

For

Laptop

Across

All Regions
```

Later,

the

```
GROUPING()
```

function

will

identify

which

`NULL`

values

represent

summary

rows.

---

# Business

Applications

Finance

```text
Revenue

Analysis
```

---

Retail

```text
Sales

Dashboards
```

---

Healthcare

```text
Hospital

Analytics
```

---

Manufacturing

```text
Production

Analysis
```

---

Education

```text
Student

Performance
```

---

# Think Like

An Analytics

Engineer

Business asks

```
Allow

Executives

To

Analyze

Revenue

By

Every

Possible

Combination

Of

Region,

Department,

And

Product.
```

Instead

of writing

many

individual

aggregation

queries,

use

```
CUBE
```

to produce

all

summary

levels

within

a single

statement.

This

enables

flexible

multidimensional

analysis.

---

# Performance

Considerations

The

number

of

grouping

sets

generated

by

`CUBE`

grows

exponentially.

For

```
n
```

columns,

the query

creates

```
2ⁿ
```

grouping

sets.

Large

cubes

can therefore

produce

significant

CPU,

memory,

and

I/O

overhead.

Use

only

the dimensions

that

are truly

required,

and

review

execution

plans

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Use `CUBE` for multidimensional analysis.

✅ Limit the number of grouping columns.

✅ Label summary rows clearly.

✅ Combine with `GROUPING()` for readable reports.

✅ Test performance on large datasets.

---

# Common Mistakes

❌ Using `CUBE` when only hierarchical subtotals are needed.

❌ Including unnecessary dimensions.

❌ Misinterpreting summary `NULL` values.

❌ Forgetting that grouping sets grow exponentially.

❌ Ignoring execution plans.

---

# PostgreSQL Practice Lab

## Exercise 1

Generate

sales

summaries

using

`CUBE`

for

region

and

product.

---

## Exercise 2

Compare

the output

of

`ROLLUP`

and

`CUBE`.

---

## Exercise 3

Create

a

three-dimensional

cube

using

region,

department,

and

product.

---

## Exercise 4

Count

the number

of

grouping

sets

generated

for

four

dimensions.

---

## Exercise 5

Measure

the execution

plan

of

a

`CUBE`

query

using

`EXPLAIN ANALYZE`.

---

# Interview Questions

## Beginner

1. What is `CUBE`?

2. How does `CUBE` differ from `ROLLUP`?

3. Why is `CUBE` useful for analytics?

---

## Intermediate

1. Explain why `CUBE` generates `2ⁿ` grouping sets.

2. When should `CUBE` be preferred over `ROLLUP`?

3. Why do summary rows contain `NULL` values?

---

## Senior

1. Design a multidimensional sales analytics report using `CUBE`.

2. Compare `GROUPING SETS`, `ROLLUP`, and `CUBE` for enterprise reporting.

3. How would you optimize a `CUBE` query with many dimensions?

---

# Section Summary

In this section,

you learned:

- `CUBE` generates every possible combination of grouping columns.
- It is ideal for multidimensional analysis and OLAP-style reporting.
- The number of grouping sets equals `2ⁿ`, where `n` is the number of grouping columns.
- `CUBE` produces more summaries than `ROLLUP` because it is not restricted to hierarchical groupings.
- Careful dimension selection is important because the number of grouping sets grows exponentially.

---

# Coming Up Next

## Section 39.10

# GROUPING()

You'll learn:

- Identifying subtotal and grand total rows.
- Distinguishing summary `NULL`s from actual data `NULL`s.
- Labeling reports.
- Using `GROUPING()` with `ROLLUP`, `CUBE`, and `GROUPING SETS`.
- Enterprise reporting best practices.



# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.10
# GROUPING()
# ==========================================================

# Introduction

In the

previous

sections,

you learned

about

- `GROUPING SETS`

- `ROLLUP`

- `CUBE`

These

features

generate

subtotal

and

grand

total

rows.

However,

they introduce

a problem.

Summary

rows

contain

```
NULL
```

values.

Unfortunately,

real

data

may also

contain

```
NULL
```

values.

Business

reports

must be

able

to distinguish

between

```
Actual

NULL

Data
```

and

```
Summary

Rows.
```

PostgreSQL

provides

the

```
GROUPING()
```

function

to solve

this problem.

---

# What Is

GROUPING()?

`GROUPING()`

returns

whether

a column

is

being

aggregated

away

in

the current

grouping

level.

Result

```text
0

↓

Regular

Data

Row
```

```text
1

↓

Summary

Row
```

This

makes

reporting

much

clearer.

---

# Sample

Sales

Table

| Region | Product | Sales |
|---------|----------|------:|
|North|Laptop|100|
|North|Phone|150|
|South|Laptop|120|
|South|Phone|180|

---

# Using

ROLLUP

```sql
SELECT

region,

SUM(sales)

AS total_sales

FROM sales

GROUP BY

ROLLUP(region);
```

Result

| Region | Total Sales |
|---------|-----------:|
|North|250|
|South|300|
|NULL|550|

Question

Does

the last

NULL

mean

```
Unknown

Region
```

or

```
Grand

Total?
```

Without

additional

information,

we

cannot

know.

---

# Using

GROUPING()

```sql
SELECT

region,

SUM(sales)

AS total_sales,

GROUPING(region)

AS is_summary

FROM sales

GROUP BY

ROLLUP(region);
```

---

# Result

| Region | Total Sales | is_summary |
|---------|-----------:|-----------:|
|North|250|0|
|South|300|0|
|NULL|550|1|

Now

the

summary

row

is

clearly

identified.

---

# Understanding

The Values

```text
GROUPING()

↓

0

↓

Normal

Grouped

Row
```

---

```text
GROUPING()

↓

1

↓

Generated

Summary

Row
```

---

# Labeling

Summary

Rows

Business asks

```
Display

Grand Total

Instead

Of

NULL.
```

```sql
SELECT

CASE

WHEN

GROUPING(region)=1

THEN

'Grand Total'

ELSE

region

END

AS region,

SUM(sales)

AS total_sales

FROM sales

GROUP BY

ROLLUP(region);
```

---

# Result

| Region | Total Sales |
|---------|-----------:|
|North|250|
|South|300|
|Grand Total|550|

The

report

is now

much

more

readable.

---

# Multiple

Columns

```sql
SELECT

region,

product,

SUM(sales)

AS total_sales,

GROUPING(region)

AS region_group,

GROUPING(product)

AS product_group

FROM sales

GROUP BY

ROLLUP
(
    region,

    product
);
```

---

# Sample

Output

| Region | Product | Region Group | Product Group |
|---------|----------|-------------:|--------------:|
|North|Laptop|0|0|
|North|Phone|0|0|
|North|NULL|0|1|
|South|Laptop|0|0|
|South|Phone|0|0|
|South|NULL|0|1|
|NULL|NULL|1|1|

---

# Understanding

The

Flags

```text
0

↓

Actual

Column

Value
```

---

```text
1

↓

Column

Removed

By

Aggregation
```

---

# Using

GROUPING()

With

CUBE

```sql
SELECT

region,

product,

SUM(sales),

GROUPING(region),

GROUPING(product)

FROM sales

GROUP BY

CUBE
(
    region,

    product
);
```

Now

every

summary

level

can be

identified

accurately.

---

# GROUPING

Multiple

Columns

PostgreSQL

also provides

```
GROUPING_ID()
```

in

some

database

systems,

but

PostgreSQL

does

not

implement

`GROUPING_ID()`.

Instead,

use

multiple

calls

to

`GROUPING()`

to determine

which

columns

belong

to

the current

summary

level.

---

# Business

Example

Business asks

```
Generate

A Financial

Report

Showing

Department

Totals

And

Company

Total.
```

Instead

of displaying

```
NULL
```

values,

use

```
Department Total
```

and

```
Company Total
```

for

better

business

readability.

---

# Visualizing

ROLLUP

With

GROUPING()

```text
North

Laptop

↓

0

0
```

---

```text
North

NULL

↓

0

1
```

---

```text
NULL

NULL

↓

1

1
```

The

flags

identify

exactly

which

columns

were

aggregated.

---

# Business

Applications

Finance

```text
Financial

Statements
```

---

Retail

```text
Executive

Dashboards
```

---

Healthcare

```text
Hospital

Statistics
```

---

Manufacturing

```text
Production

Reports
```

---

Education

```text
Student

Analytics
```

---

# Think Like

A BI

Developer

Business asks

```
Replace

Every

Subtotal

NULL

With

Meaningful

Labels

Before

Publishing

Executive

Reports.
```

Use

`GROUPING()`

inside

a

`CASE`

expression

to

replace

technical

`NULL`

values

with

business-friendly

labels,

making

reports

clearer

for

non-technical

users.

---

# Performance

Considerations

`GROUPING()`

adds

very

little

overhead.

It simply

indicates

whether

a column

is part

of

the current

grouping

level.

Performance

is primarily

determined

by

the

underlying

`ROLLUP`,

`CUBE`,

or

`GROUPING SETS`

operation,

not

by

`GROUPING()`

itself.

---

# Best Practices

✅ Use `GROUPING()` to distinguish summary rows from actual `NULL` values.

✅ Replace summary `NULL`s with meaningful labels.

✅ Combine `GROUPING()` with `CASE` for readable reports.

✅ Use with `ROLLUP`, `CUBE`, and `GROUPING SETS`.

✅ Keep report labels consistent.

---

# Common Mistakes

❌ Assuming every `NULL` is a missing value.

❌ Publishing reports with unlabeled subtotal rows.

❌ Confusing summary `NULL`s with stored `NULL`s.

❌ Expecting PostgreSQL to support `GROUPING_ID()`.

❌ Forgetting to label grand totals.

---

# PostgreSQL Practice Lab

## Exercise 1

Generate

a

`ROLLUP`

report

and

identify

summary

rows

using

`GROUPING()`.

---

## Exercise 2

Replace

summary

`NULL`s

with

`Grand Total`

using

`CASE`.

---

## Exercise 3

Use

`GROUPING()`

with

a

two-column

`ROLLUP`.

---

## Exercise 4

Create

a

`CUBE`

report

and

identify

every

summary

level.

---

## Exercise 5

Compare

actual

`NULL`

values

with

summary

`NULL`

values

using

`GROUPING()`.

---

# Interview Questions

## Beginner

1. What does `GROUPING()` do?

2. Why is `GROUPING()` useful?

3. What values can `GROUPING()` return?

---

## Intermediate

1. Explain how `GROUPING()` distinguishes summary rows from actual `NULL` values.

2. Why is `CASE` commonly used with `GROUPING()`?

3. Can `GROUPING()` be used with both `ROLLUP` and `CUBE`?

---

## Senior

1. Design an executive financial report that replaces subtotal `NULL`s with meaningful labels.

2. Compare PostgreSQL's `GROUPING()` with `GROUPING_ID()` available in other database systems.

3. Explain how `GROUPING()` improves report usability without significantly affecting performance.

---

# Section Summary

In this section,

you learned:

- `GROUPING()` identifies whether a column value belongs to a regular data row or a generated summary row.
- It returns `0` for regular grouped rows and `1` for summary rows.
- `GROUPING()` is commonly combined with `CASE` to replace technical `NULL` values with business-friendly labels.
- It works with `ROLLUP`, `CUBE`, and `GROUPING SETS`.
- Using `GROUPING()` greatly improves the readability of enterprise reports.

---

# Coming Up Next

## Section 39.11

# Advanced Aggregation Strategies

You'll learn:

- Combining multiple aggregate functions.
- Conditional aggregation patterns.
- Nested aggregations.
- Multi-level business metrics.
- KPI calculations.
- Enterprise reporting techniques.

# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.11
# Advanced Aggregation Strategies
# ==========================================================

# Introduction

Aggregation

is one

of

the most

important

operations

in SQL.

Basic

aggregations

such as

```sql
SUM()

COUNT()

AVG()

MIN()

MAX()
```

are

sufficient

for

simple

reports.

However,

enterprise

reporting

often

requires

multiple

aggregations,

conditional

calculations,

derived

metrics,

and

Key

Performance

Indicators

(KPIs)

within

the same

query.

This

section

focuses

on

advanced

aggregation

strategies

used

in

Business

Intelligence,

Analytics,

and

Data

Engineering.

---

# Sample

Sales

Table

| Region | Product | Sales | Profit |
|---------|----------|------:|-------:|
|North|Laptop|100|30|
|North|Phone|150|50|
|South|Laptop|120|40|
|South|Phone|180|70|

---

# Multiple

Aggregates

Business asks

```
Display

Total Sales,

Average Sales,

Maximum Sale,

Minimum Sale,

And

Total Profit

For

Each Region.
```

```sql
SELECT

region,

SUM(sales)

AS total_sales,

AVG(sales)

AS avg_sales,

MAX(sales)

AS highest_sale,

MIN(sales)

AS lowest_sale,

SUM(profit)

AS total_profit

FROM sales

GROUP BY region;
```

---

# Result

| Region | Total | Average | Max | Min | Profit |
|---------|------:|--------:|---:|---:|-------:|
|North|250|125|150|100|80|
|South|300|150|180|120|110|

One

query

produces

multiple

business

metrics.

---

# Derived

Metrics

Business asks

```
Calculate

Profit

Margin.
```

Formula

```text
Profit

÷

Sales

× 100
```

```sql
SELECT

region,

SUM(profit)

AS total_profit,

SUM(sales)

AS total_sales,

ROUND
(
    SUM(profit)

    * 100.0

    /

    NULLIF
    (
        SUM(sales),

        0
    ),

    2
)

AS profit_margin

FROM sales

GROUP BY region;
```

---

# Why

Use

NULLIF()?

Suppose

total

sales

equal

```
0
```

Division

would

cause

an error.

```sql
NULLIF

(
SUM(sales),

0
)
```

returns

```
NULL
```

instead,

preventing

division

by

zero.

---

# Conditional

Aggregation

Business asks

```
Display

Sales

For

Laptops

And

Phones

Separately.
```

```sql
SELECT

region,

SUM
(
CASE

WHEN product='Laptop'

THEN sales

ELSE 0

END
)

AS laptop_sales,

SUM
(
CASE

WHEN product='Phone'

THEN sales

ELSE 0

END
)

AS phone_sales

FROM sales

GROUP BY region;
```

---

# PostgreSQL

FILTER

Clause

PostgreSQL

provides

an elegant

alternative

to

conditional

aggregation.

```sql
SELECT

region,

SUM(sales)

FILTER

(
WHERE product='Laptop'
)

AS laptop_sales,

SUM(sales)

FILTER

(
WHERE product='Phone'
)

AS phone_sales

FROM sales

GROUP BY region;
```

Compared

to

`CASE`,

the

`FILTER`

clause

is often

shorter

and

easier

to read

when

using

multiple

conditional

aggregates.

---

# Counting

With

Conditions

Business asks

```
Count

Products

Generating

More Than

150

Sales.
```

```sql
SELECT

COUNT(*)

FILTER

(
WHERE sales > 150
)

AS high_sales

FROM sales;
```

---

# Ratio

Calculations

Business asks

```
Determine

Each Region's

Contribution

To

Total Sales.
```

```sql
SELECT

region,

SUM(sales)

AS regional_sales,

ROUND
(
SUM(sales)

* 100.0

/

SUM
(
SUM(sales)
)

OVER(),

2
)

AS contribution_percent

FROM sales

GROUP BY region;
```

---

# Result

| Region | Sales | Contribution % |
|---------|------:|---------------:|
|North|250|45.45|
|South|300|54.55|

The

window

function

calculates

the

overall

sales,

while

the

aggregation

calculates

regional

sales.

---

# Nested

Aggregation

Business asks

```
Find

The

Average

Regional

Revenue.
```

Step 1

Calculate

sales

per

region.

↓

Step 2

Average

those

totals.

```sql
SELECT

AVG(total_sales)

FROM
(
    SELECT

    region,

    SUM(sales)

    AS total_sales

    FROM sales

    GROUP BY region
)

AS regional_totals;
```

---

# KPI

Dashboard

Example

Business asks

```
Display

Revenue,

Profit,

Profit Margin,

Average Order,

Maximum Order,

And

Total Orders.
```

```sql
SELECT

SUM(sales)

AS revenue,

SUM(profit)

AS profit,

ROUND
(
SUM(profit)

* 100.0

/

NULLIF
(
SUM(sales),

0
),

2
)

AS margin,

AVG(sales)

AS avg_order,

MAX(sales)

AS max_order,

COUNT(*)

AS total_orders

FROM sales;
```

---

# Aggregation

Workflow

```text
Raw Data

↓

Grouping

↓

Aggregation

↓

Derived

Metrics

↓

KPIs

↓

Dashboard
```

Most

executive

reports

follow

this

pattern.

---

# Business

Applications

Finance

```text
Profit

Margins
```

---

Retail

```text
Sales

KPIs
```

---

Healthcare

```text
Patient

Statistics
```

---

Manufacturing

```text
Production

Efficiency
```

---

Education

```text
Student

Performance
```

---

# Think Like

An Analytics

Engineer

Business asks

```
Create

A Dashboard

Showing

Revenue,

Profit,

Margins,

Growth,

Regional

Contribution,

And

Average

Order

Value.
```

Instead

of executing

many

queries,

combine

aggregations,

derived

metrics,

window

functions,

and

conditional

logic

into

a single,

efficient

report.

---

# Performance

Considerations

Multiple

aggregate

functions

can usually

be computed

during

the same

grouping

operation,

making

them

more efficient

than

running

separate

queries.

Derived

calculations

and

window

functions

may introduce

additional

processing,

especially

on

large

datasets.

Indexes

can help

filtering

and

grouping,

but

aggregation

still

requires

reading

the relevant

rows.

Always

validate

performance

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Calculate multiple metrics in a single aggregation query.

✅ Use `NULLIF()` to prevent division-by-zero errors.

✅ Prefer the `FILTER` clause for readable conditional aggregates in PostgreSQL.

✅ Build KPIs from reusable aggregate calculations.

✅ Use descriptive aliases for business metrics.

---

# Common Mistakes

❌ Running separate queries for each metric.

❌ Dividing by zero.

❌ Repeating identical aggregate expressions unnecessarily.

❌ Ignoring `NULL` handling.

❌ Creating unreadable KPI calculations.

---

# PostgreSQL Practice Lab

## Exercise 1

Calculate

total,

average,

minimum,

and

maximum

sales

for

each

region.

---

## Exercise 2

Compute

profit

margin

using

`NULLIF()`.

---

## Exercise 3

Rewrite

a

`CASE`

conditional

aggregate

using

the

`FILTER`

clause.

---

## Exercise 4

Calculate

each

region's

percentage

contribution

to

overall

sales.

---

## Exercise 5

Build

a KPI

dashboard

using

multiple

aggregate

functions

in

one query.

---

# Interview Questions

## Beginner

1. Why calculate multiple aggregates in a single query?

2. What problem does `NULLIF()` solve?

3. What is the purpose of the `FILTER` clause?

---

## Intermediate

1. Compare conditional aggregation using `CASE` and `FILTER`.

2. How do you calculate contribution percentages using window functions?

3. Explain nested aggregation with a business example.

---

## Senior

1. Design a KPI dashboard query for an executive reporting system.

2. Explain how to optimize aggregation-heavy queries processing billions of rows.

3. Discuss when to combine aggregations, window functions, and derived metrics in a single report.

---

# Section Summary

In this section,

you learned:

- Enterprise reports commonly calculate multiple business metrics in a single aggregation query.
- Derived metrics such as profit margin are built from aggregate results.
- `NULLIF()` prevents division-by-zero errors in calculations.
- PostgreSQL's `FILTER` clause provides a concise alternative to `CASE` for conditional aggregation.
- Advanced aggregation strategies form the foundation of KPI dashboards, executive reporting, and business analytics.

---

# Coming Up Next

## Section 39.12

# Combining Window Functions with CTEs

You'll learn:

- Layering complex SQL logic.
- Combining aggregation and window functions.
- Multi-stage analytics.
- Readable enterprise queries.
- Advanced reporting patterns.
- Interview-quality SQL design.


# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.12
# Combining Window Functions with CTEs
# ==========================================================

# Introduction

Enterprise

SQL

queries

rarely

use

only

one

advanced

feature.

Instead,

they often

combine

multiple

techniques

to solve

complex

business

problems.

A common

pattern

is

```
CTE

+

Window

Functions
```

The

CTE

organizes

the query

into

logical

steps,

while

Window

Functions

perform

advanced

analytics

such as

- Ranking

- Running Totals

- Moving Averages

- Percentages

- Lead/Lag

- Row Numbering

This

combination

produces

clean,

readable,

and

maintainable

enterprise

SQL.

---

# Why

Combine

CTEs

With

Window

Functions?

Suppose

Business asks

```
Calculate

Regional

Sales

↓

Rank

Regions

↓

Calculate

Contribution

↓

Display

Final

Dashboard
```

Instead

of writing

one

very long

query,

break

the work

into

logical

stages.

---

# Step-By-Step

Workflow

```text
Raw Data

↓

CTE

Aggregation

↓

Window

Functions

↓

Final

Report
```

Each

stage

has

a single

responsibility.

---

# Sample

Sales

Table

| Region | Sales |
|---------|------:|
|North|250|
|South|300|
|East|180|
|West|270|

---

# Stage 1

Aggregate

Data

```sql
WITH regional_sales AS
(
    SELECT

    region,

    SUM(sales)

    AS total_sales

    FROM sales

    GROUP BY region
)

SELECT *

FROM regional_sales;
```

---

# Result

| Region | Total Sales |
|---------|------------:|
|North|250|
|South|300|
|East|180|
|West|270|

The

CTE

creates

a clean

intermediate

result.

---

# Stage 2

Add

Ranking

```sql
WITH regional_sales AS
(
    SELECT

    region,

    SUM(sales)

    AS total_sales

    FROM sales

    GROUP BY region
)

SELECT

region,

total_sales,

RANK()

OVER

(
ORDER BY

total_sales DESC
)

AS sales_rank

FROM regional_sales;
```

---

# Result

| Region | Sales | Rank |
|---------|------:|----:|
|South|300|1|
|West|270|2|
|North|250|3|
|East|180|4|

The

aggregation

and

ranking

remain

clearly

separated.

---

# Stage 3

Calculate

Contribution

```sql
WITH regional_sales AS
(
    SELECT

    region,

    SUM(sales)

    AS total_sales

    FROM sales

    GROUP BY region
)

SELECT

region,

total_sales,

ROUND
(
total_sales

* 100.0

/

SUM(total_sales)

OVER(),

2
)

AS contribution_percent

FROM regional_sales;
```

---

# Result

| Region | Sales | Contribution % |
|---------|------:|---------------:|
|North|250|25.00|
|South|300|30.00|
|East|180|18.00|
|West|270|27.00|

The

window

function

computes

the

overall

total,

while

the CTE

provides

regional

totals.

---

# Stage 4

Combine

Multiple

Window

Functions

```sql
WITH regional_sales AS
(
    SELECT

    region,

    SUM(sales)

    AS total_sales

    FROM sales

    GROUP BY region
)

SELECT

region,

total_sales,

RANK()

OVER
(
ORDER BY total_sales DESC
)

AS sales_rank,

SUM(total_sales)

OVER
(
ORDER BY total_sales DESC
)

AS running_total,

ROUND
(
100.0

*

total_sales

/

SUM(total_sales)

OVER(),

2
)

AS contribution

FROM regional_sales;
```

---

# Result

| Region | Sales | Rank | Running Total | Contribution |
|---------|------:|----:|--------------:|-------------:|
|South|300|1|300|30.00|
|West|270|2|570|27.00|
|North|250|3|820|25.00|
|East|180|4|1000|18.00|

One

CTE

supports

multiple

window

calculations.

---

# Multiple

CTEs

Business asks

```
Calculate

Department

Sales

↓

Regional

Totals

↓

Company

Ranking
```

Use

multiple

CTEs.

```sql
WITH department_sales AS
(
    ...

),

regional_sales AS
(
    ...
)

SELECT

...

FROM regional_sales;
```

Each

CTE

represents

one

business

transformation.

---

# Visualizing

Execution

```text
Sales

↓

Department

Totals

↓

Regional

Totals

↓

Window

Functions

↓

Dashboard
```

The

query

becomes

easy

to understand

and

maintain.

---

# Enterprise

Dashboard

Business asks

```
Display

Revenue,

Rank,

Running

Total,

Contribution,

And

Growth.
```

Solution

```text
CTE

↓

Aggregation

↓

Window

Functions

↓

Dashboard
```

The

logic

is

organized

into

clear

processing

stages.

---

# Combining

FILTER

With

Window

Functions

PostgreSQL

allows

aggregates

using

`FILTER`

to appear

inside

a CTE,

followed

by

window

functions

in

the outer

query.

Example

```sql
WITH regional_sales AS
(
    SELECT

    region,

    SUM(sales)

    FILTER
    (
        WHERE product = 'Laptop'
    )

    AS laptop_sales,

    SUM(sales)

    FILTER
    (
        WHERE product = 'Phone'
    )

    AS phone_sales

    FROM sales

    GROUP BY region
)

SELECT

*,

RANK()

OVER

(
ORDER BY

laptop_sales DESC
)

AS laptop_rank

FROM regional_sales;
```

This

combines

conditional

aggregation

and

analytics

cleanly.

---

# Why

This

Pattern

Is

Popular

Large

enterprise

queries

often

contain

hundreds

of lines

of SQL.

Separating

aggregation,

filtering,

and

analytics

into

CTEs

improves

readability,

testing,

and

maintenance.

---

# Business

Applications

Finance

```text
Revenue

Dashboards
```

---

Retail

```text
Sales

Rankings
```

---

Healthcare

```text
Patient

Analytics
```

---

Manufacturing

```text
Production

KPIs
```

---

Education

```text
Performance

Dashboards
```

---

# Think Like

An Analytics

Engineer

Business asks

```
Build

An Executive

Dashboard

Showing

Revenue,

Rank,

Running

Totals,

Contribution,

And

Growth

For

Every

Region.
```

Instead

of placing

all

calculations

inside

one

complex

query,

break

the logic

into

CTEs,

then

apply

Window

Functions

to

the

prepared

dataset.

This

creates

clean,

production-ready

SQL.

---

# Performance

Considerations

Modern

versions

of

PostgreSQL

may

inline

(non-recursive)

CTEs

when

it is

beneficial,

allowing

the planner

to optimize

the query

as

a whole.

In

other

cases,

a CTE

may

be

materialized.

Window

functions

often

require

sorting,

which

can become

expensive

for

large

datasets.

Review

execution

plans

using

```
EXPLAIN ANALYZE
```

to understand

how

your

query

is executed.

---

# Best Practices

✅ Separate aggregation and analytics into different CTEs.

✅ Keep each CTE focused on one business transformation.

✅ Apply Window Functions after aggregation whenever possible.

✅ Use meaningful CTE names.

✅ Review execution plans for complex reports.

---

# Common Mistakes

❌ Writing one extremely long query without logical stages.

❌ Applying window functions before completing aggregation.

❌ Using unclear CTE names.

❌ Repeating the same calculations across multiple query sections.

❌ Ignoring query execution plans.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a CTE

that

aggregates

sales

by

region.

---

## Exercise 2

Rank

regions

using

a

Window

Function.

---

## Exercise 3

Calculate

running

totals

using

the

aggregated

CTE.

---

## Exercise 4

Calculate

percentage

contribution

for

each

region.

---

## Exercise 5

Build

an

executive

dashboard

combining

aggregation,

ranking,

and

running

totals.

---

# Interview Questions

## Beginner

1. Why combine CTEs with Window Functions?

2. Why perform aggregation before applying window functions?

3. What advantages do CTEs provide for readability?

---

## Intermediate

1. Explain a multi-stage reporting query using CTEs.

2. How can multiple Window Functions reuse the same aggregated data?

3. Why are CTEs commonly used in enterprise dashboards?

---

## Senior

1. Design a production-ready SQL query for an executive KPI dashboard using CTEs and Window Functions.

2. Explain how PostgreSQL optimizes non-recursive CTEs.

3. Discuss the trade-offs between readability and performance when layering complex SQL logic.

---

# Section Summary

In this section,

you learned:

- CTEs and Window Functions complement each other in complex reporting queries.
- CTEs organize business logic into clear processing stages, while Window Functions perform advanced analytics.
- Aggregation is typically performed before applying ranking, running totals, and contribution calculations.
- This layered approach improves readability, maintainability, and reuse of intermediate results.
- Combining CTEs with Window Functions is one of the most common enterprise SQL design patterns.

---

# Coming Up Next

## Section 39.13

# Advanced Reporting Queries

You'll learn:

- Multi-stage reporting pipelines.
- Executive KPI reports.
- Financial reporting patterns.
- Time-series dashboards.
- Enterprise SQL design.
- Real-world reporting case studies.

# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.13
# Advanced Reporting Queries
# ==========================================================

# Introduction

Enterprise

reporting

is one

of

the primary

applications

of SQL.

Unlike

simple

reports,

enterprise

reports

often

combine

multiple

data

sources,

business

rules,

aggregations,

window

functions,

and

time-based

analysis

into

a single

query.

The goal

is not

simply

to retrieve

data,

but

to provide

actionable

business

insights.

---

# Characteristics

Of

Enterprise

Reports

Enterprise

reports

typically

include

- Multiple

Tables

- Aggregations

- Window

Functions

- KPIs

- Rankings

- Time-Series

Analysis

- Running

Totals

- Percentage

Calculations

- Executive

Summaries

One

report

may

combine

all

of these.

---

# Typical

Reporting

Pipeline

```text
Raw Data

↓

Filtering

↓

Aggregation

↓

Business

Metrics

↓

Window

Functions

↓

Formatting

↓

Dashboard
```

Every

stage

adds

business

value.

---

# Business

Example

Business asks

```
Generate

Monthly

Revenue

Dashboard

Showing

Revenue,

Profit,

Growth,

Running

Totals,

And

Regional

Rankings.
```

Instead

of writing

multiple

queries,

build

the report

step

by step.

---

# Stage 1

Prepare

Data

```sql
WITH monthly_sales AS
(
    SELECT

    sales_month,

    region,

    SUM(sales)

    AS revenue,

    SUM(profit)

    AS profit

    FROM sales

    GROUP BY

    sales_month,

    region
)

SELECT *

FROM monthly_sales;
```

---

# Stage 2

Calculate

KPIs

```sql
WITH monthly_sales AS
(
    SELECT

    sales_month,

    region,

    SUM(sales)

    AS revenue,

    SUM(profit)

    AS profit

    FROM sales

    GROUP BY

    sales_month,

    region
)

SELECT

sales_month,

region,

revenue,

profit,

ROUND
(
profit

* 100.0

/

NULLIF
(
revenue,

0
),

2
)

AS profit_margin

FROM monthly_sales;
```

---

# Stage 3

Add

Ranking

```sql
WITH monthly_sales AS
(
    ...

)

SELECT

sales_month,

region,

revenue,

RANK()

OVER
(
PARTITION BY

sales_month

ORDER BY

revenue DESC
)

AS regional_rank

FROM monthly_sales;
```

Each

month

has

its own

regional

ranking.

---

# Stage 4

Running

Revenue

```sql
WITH monthly_sales AS
(
    ...

)

SELECT

sales_month,

region,

revenue,

SUM(revenue)

OVER
(
PARTITION BY region

ORDER BY

sales_month
)

AS cumulative_revenue

FROM monthly_sales;
```

This

shows

the cumulative

revenue

for

each

region

over

time.

---

# Stage 5

Regional

Contribution

```sql
WITH monthly_sales AS
(
    ...

)

SELECT

sales_month,

region,

revenue,

ROUND
(
100.0

*

revenue

/

SUM(revenue)

OVER
(
PARTITION BY sales_month
),

2
)

AS contribution

FROM monthly_sales;
```

Each

region's

percentage

of

monthly

revenue

is calculated.

---

# Complete

Dashboard

Output

| Month | Region | Revenue | Margin | Rank | Running Total |
|--------|---------|--------:|-------:|----:|--------------:|
|Jan|North|250|32.0|2|250|
|Jan|South|300|35.0|1|300|
|Feb|North|270|31.5|2|520|
|Feb|South|320|34.2|1|620|

Multiple

business

metrics

appear

inside

one

report.

---

# Time-Series

Reporting

Business asks

```
Display

Revenue

For

Every

Month,

Including

Months

Without

Sales.
```

Solution

```text
Calendar

Table

↓

LEFT JOIN

↓

Sales

↓

COALESCE()
```

Missing

months

appear

with

zero

revenue.

---

# Executive

KPI

Dashboard

Business asks

```
Display

Revenue,

Profit,

Margin,

Average

Order,

Highest

Order,

Lowest

Order,

And

Growth.
```

Typical

query

combines

- CTEs

- Aggregation

- Window

Functions

- Derived

Metrics

- Formatting

---

# Financial

Reporting

Business asks

```
Generate

Quarterly

Financial

Statements.
```

Typical

SQL

includes

```text
ROLLUP

↓

GROUPING()

↓

Conditional

Aggregation

↓

Profit

Calculations
```

---

# Operational

Dashboard

Business asks

```
Display

Today's

Orders,

Pending

Orders,

Completed

Orders,

Average

Delivery

Time,

And

Top

Customers.
```

Conditional

aggregation

using

`FILTER`

or

`CASE`

allows

multiple

KPIs

to be

returned

in

a single

row.

---

# Multi-Level

Reporting

Business asks

```
Display

Sales

By

Country,

State,

City,

Store,

And

Company

Total.
```

Possible

solution

```text
ROLLUP

↓

GROUPING()

↓

Window

Functions
```

---

# Layered

Reporting

Pattern

```text
Raw

Transactions

↓

Cleaning

↓

Aggregation

↓

Business

Metrics

↓

Ranking

↓

Formatting

↓

Dashboard
```

This

is

one

of

the most

common

enterprise

SQL

patterns.

---

# Business

Applications

Finance

```text
Executive

Financial

Reports
```

---

Retail

```text
Sales

Dashboards
```

---

Healthcare

```text
Hospital

Performance

Reports
```

---

Manufacturing

```text
Production

KPIs
```

---

Education

```text
Academic

Analytics
```

---

# Think Like

An Analytics

Engineer

Business asks

```
Create

A Single

Query

Producing

The

Entire

Executive

Dashboard.
```

Instead

of

exporting

raw

data

to another

tool,

design

the SQL

to calculate

KPIs,

rankings,

running

totals,

contribution

percentages,

and

summary

statistics

before

the data

reaches

the dashboard.

This

reduces

application

logic

and

keeps

business

rules

inside

the database.

---

# Performance

Considerations

Enterprise

reports

often

join

multiple

large

tables

and

perform

aggregation,

sorting,

and

window

processing.

Optimize

queries

by

filtering

early,

creating

appropriate

indexes,

avoiding

repeated

calculations,

and

reusing

intermediate

results

through

CTEs

when

appropriate.

Always

validate

execution

plans

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Break reports into logical processing stages.

✅ Calculate multiple KPIs in one query whenever practical.

✅ Reuse aggregated data with CTEs.

✅ Keep business rules inside SQL when appropriate.

✅ Validate performance before deploying.

---

# Common Mistakes

❌ Writing one massive unreadable query.

❌ Calculating identical metrics multiple times.

❌ Ignoring missing dates in time-series reports.

❌ Performing formatting before calculations.

❌ Ignoring execution plans.

---

# PostgreSQL Practice Lab

## Exercise 1

Build

a monthly

sales

dashboard

with

revenue

and

profit.

---

## Exercise 2

Add

regional

rankings

using

Window

Functions.

---

## Exercise 3

Calculate

running

revenue

for

each

region.

---

## Exercise 4

Display

months

without

sales

using

a Calendar

Table.

---

## Exercise 5

Create

a complete

executive

dashboard

using

CTEs,

Window

Functions,

and

aggregations.

---

# Interview Questions

## Beginner

1. What is an enterprise reporting query?

2. Why are CTEs commonly used in reporting?

3. Why are Window Functions useful in dashboards?

---

## Intermediate

1. Explain the stages of an enterprise reporting pipeline.

2. How can multiple KPIs be calculated in a single query?

3. Why are Calendar Tables useful in time-series reports?

---

## Senior

1. Design an executive dashboard query combining CTEs, Window Functions, KPIs, and advanced aggregations.

2. Explain how you would optimize a reporting query processing billions of rows.

3. Discuss where business logic should reside in an enterprise reporting architecture.

---

# Section Summary

In this section,

you learned:

- Enterprise reporting queries combine multiple SQL techniques into a single reporting pipeline.
- CTEs organize processing stages, while Window Functions and aggregations calculate KPIs and analytics.
- Time-series reports commonly use Calendar Tables to ensure complete date coverage.
- Executive dashboards often combine rankings, running totals, contribution percentages, and financial metrics.
- Well-designed reporting queries reduce application complexity and centralize business logic within the database.

---

# Coming Up Next

## Section 39.14

# SQL Design Patterns

You'll learn:

- Reusable SQL solutions.
- Layered query architecture.
- Modular SQL design.
- Enterprise query templates.
- Maintainable reporting patterns.
- Interview-ready SQL design techniques.


# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.14
# SQL Design Patterns
# ==========================================================

# Introduction

Writing

SQL

that works

is only

the first

step.

Enterprise

SQL

must also

be

- Readable

- Maintainable

- Reusable

- Performant

- Easy

to debug

This is

where

SQL

Design

Patterns

become

important.

A design

pattern

is

a proven

solution

to

a common

problem.

Instead

of writing

every

query

from

scratch,

experienced

engineers

reuse

well-tested

patterns.

---

# What Is

A SQL

Design

Pattern?

A SQL

Design

Pattern

is

a reusable

query

structure

that

solves

a recurring

business

problem.

Examples

include

- Reporting

Pipelines

- Top-N

Queries

- Running

Totals

- Slowly

Changing

Dimensions

- Calendar

Generation

- Recursive

Hierarchies

- Deduplication

These

patterns

appear

frequently

across

different

projects.

---

# Why

Use

Design

Patterns?

Suppose

Business asks

```
Build

A Monthly

Sales

Dashboard.
```

Instead

of inventing

a new

query,

reuse

a reporting

pattern.

Benefits

include

```text
Consistency

↓

Maintainability

↓

Reliability

↓

Faster

Development
```

---

# Pattern 1

Layered

CTE

Architecture

Instead

of writing

one

large

query,

break

the logic

into

stages.

```text
Raw Data

↓

Filtering

↓

Aggregation

↓

Analytics

↓

Final Report
```

Example

```sql
WITH filtered_sales AS
(
    ...
),

regional_sales AS
(
    ...
),

ranked_sales AS
(
    ...
)

SELECT *

FROM ranked_sales;
```

Each

CTE

has

one

responsibility.

---

# Pattern 2

Prepare

Then

Analyze

Bad

Approach

```text
Aggregation

↓

Ranking

↓

Aggregation

↓

Ranking
```

Repeated

logic.

---

Better

Approach

```text
Aggregation

↓

Store

↓

Window

Functions
```

Aggregate

once,

reuse

many

times.

---

# Pattern 3

Reusable

Business

Metrics

Business asks

```
Revenue

Profit

Margin

Growth
```

Calculate

the base

metrics

once.

```text
Revenue

↓

Profit

↓

Margin

↓

Growth
```

Later

queries

reuse

those

results

instead

of

recalculating

them.

---

# Pattern 4

Calendar

Dimension

Instead

of

generating

dates

inside

every

query,

store

a

Calendar

Dimension.

```text
Calendar

↓

LEFT JOIN

↓

Sales
```

One

table

supports

many

reports.

---

# Pattern 5

Ranking

After

Aggregation

Instead

of

ranking

raw

transactions,

first

aggregate.

Bad

```text
Orders

↓

Rank
```

---

Better

```text
Orders

↓

Regional

Revenue

↓

Rank

Regions
```

The

ranking

now

matches

the

business

question.

---

# Pattern 6

Conditional

Aggregation

Business asks

```
Display

Revenue

For

Every

Product

Category.
```

Use

```sql
FILTER
```

or

```sql
CASE
```

instead

of

multiple

queries.

---

# Pattern 7

Layered

Reporting

```text
Transactions

↓

Cleaning

↓

Aggregation

↓

KPIs

↓

Ranking

↓

Dashboard
```

Each

layer

performs

one

logical

task.

---

# Pattern 8

Recursive

Processing

Business asks

```
Display

Employee

Hierarchy.
```

Use

```text
Recursive

CTE
```

instead

of

procedural

loops.

---

# Pattern 9

Summary

Reporting

Business asks

```
Department

Totals

↓

Company

Total
```

Use

```sql
ROLLUP
```

or

```sql
GROUPING SETS
```

instead

of

multiple

`UNION ALL`

queries.

---

# Pattern 10

Reusable

Views

Suppose

many

reports

need

regional

sales.

Create

a

view.

```sql
CREATE VIEW

regional_sales

AS

...
```

Future

queries

become

simpler.

---

# Enterprise

Reporting

Architecture

```text
Raw Tables

↓

Views

↓

CTEs

↓

Window

Functions

↓

Dashboard
```

Each

layer

has

a

specific

responsibility.

---

# Example

Executive

Dashboard

Business asks

```
Display

Revenue,

Profit,

Margins,

Growth,

Running

Totals,

And

Ranking.
```

Pattern

```text
Sales

↓

Aggregate

↓

KPIs

↓

Window

Functions

↓

Dashboard
```

No

business

logic

is duplicated.

---

# Modular

SQL

Think

of

each

CTE

like

a function

in

programming.

Example

```text
sales_cte

↓

profit_cte

↓

ranking_cte

↓

final_report
```

Each

module

can be

tested

independently.

---

# Anti-Pattern

One

Huge

Query

```text
500

Lines

↓

Nested

Subqueries

↓

Repeated

Calculations

↓

Impossible

To

Maintain
```

Avoid

this

approach.

---

# Business

Applications

Finance

```text
Financial

Statements
```

---

Retail

```text
Sales

Dashboards
```

---

Healthcare

```text
Patient

Analytics
```

---

Manufacturing

```text
Production

Reports
```

---

Education

```text
Academic

Dashboards
```

---

# Think Like

A Senior

Data

Engineer

Business asks

```
Build

Twenty

Executive

Reports

Using

The

Same

Sales

Data.
```

Instead

of copying

SQL

twenty

times,

design

reusable

views,

CTEs,

and

aggregation

layers.

Future

changes

then

require

updating

only

one

place,

reducing

maintenance

effort

and

the risk

of

inconsistent

business

logic.

---

# Performance

Considerations

Well-designed

SQL

patterns

reduce

duplicate

calculations

and

improve

maintainability.

However,

reusability

should

not

come

at

the expense

of

performance.

Review

execution

plans,

avoid

unnecessary

materialization,

and

ensure

that

shared

views

and

CTEs

do not

introduce

unexpected

overhead.

Always

validate

using

```
EXPLAIN ANALYZE.
```

---

# Best Practices

✅ Break complex SQL into logical stages.

✅ Reuse business calculations.

✅ Separate preparation from analytics.

✅ Use meaningful CTE and view names.

✅ Design for maintainability first, then optimize.

---

# Common Mistakes

❌ Copying the same SQL into multiple reports.

❌ Mixing filtering, aggregation, analytics, and formatting in one block.

❌ Ranking raw data instead of aggregated results.

❌ Ignoring modular design.

❌ Creating unreadable nested queries.

---

# PostgreSQL Practice Lab

## Exercise 1

Refactor

a long

SQL query

into

multiple

CTEs.

---

## Exercise 2

Create

a reusable

view

for

regional

sales.

---

## Exercise 3

Design

a reporting

pipeline

using

layered

CTEs.

---

## Exercise 4

Replace

repeated

aggregations

with

reusable

metrics.

---

## Exercise 5

Compare

a modular

query

with

a deeply

nested

query

for

readability

and

maintenance.

---

# Interview Questions

## Beginner

1. What is a SQL design pattern?

2. Why are design patterns useful?

3. Why are CTEs often used in modular SQL?

---

## Intermediate

1. Explain the layered CTE architecture.

2. Why should business metrics be calculated once and reused?

3. Compare reusable views with repeated SQL code.

---

## Senior

1. Design a reusable reporting architecture for an enterprise BI platform.

2. Explain how SQL design patterns improve maintainability without sacrificing performance.

3. Describe how you would refactor a 500-line SQL query into modular, reusable components.

---

# Section Summary

In this section,

you learned:

- SQL design patterns provide reusable solutions to common business problems.
- Layered CTEs improve readability, testing, and maintenance.
- Business metrics should be calculated once and reused across reports.
- Reusable views, Calendar Dimensions, and modular query design reduce duplication and simplify enterprise reporting.
- Good SQL design balances readability, maintainability, and performance.

---

# Coming Up Next

## Section 39.15

# Enterprise Dashboard Queries

You'll learn:

- Building executive dashboards.
- Multi-KPI reporting.
- Interactive dashboard queries.
- Time-based analytics.
- BI reporting techniques.
- Production-ready SQL patterns.


# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.15
# Enterprise Dashboard Queries
# ==========================================================

# Introduction

Enterprise

dashboards

provide

decision-makers

with

real-time

business

insights.

Unlike

simple

reports,

dashboards

display

multiple

Key

Performance

Indicators

(KPIs)

within

a single

view.

A dashboard

may

include

- Revenue

- Profit

- Orders

- Growth

- Rankings

- Running Totals

- Monthly Trends

- Regional Performance

- Top Customers

SQL

is responsible

for

calculating

these

metrics

before

they

reach

the

visualization

tool.

---

# Characteristics

Of

Enterprise

Dashboards

Enterprise

dashboards

typically

provide

- Real-time

Metrics

- Historical

Trends

- KPI

Cards

- Drill-down

Analysis

- Rankings

- Time-Series

Charts

- Executive

Summaries

The SQL

query

often

combines

multiple

advanced

techniques.

---

# Dashboard

Architecture

```text
Raw Data

↓

Filtering

↓

Aggregation

↓

Business

KPIs

↓

Window

Functions

↓

Dashboard
```

The

dashboard

should

receive

business-ready

data,

not

raw

transactions.

---

# Business

Example

Business asks

```
Create

A Sales

Dashboard

Showing

Revenue,

Profit,

Profit Margin,

Orders,

And

Growth.
```

---

# Stage 1

Prepare

Sales

Data

```sql
WITH sales_summary AS
(
    SELECT

    sales_month,

    region,

    SUM(sales)

    AS revenue,

    SUM(profit)

    AS profit,

    COUNT(*)

    AS orders

    FROM sales

    GROUP BY

    sales_month,

    region
)

SELECT *

FROM sales_summary;
```

---

# Stage 2

Calculate

KPIs

```sql
WITH sales_summary AS
(
    ...
)

SELECT

sales_month,

region,

revenue,

profit,

orders,

ROUND
(
100.0

*

profit

/

NULLIF
(
revenue,

0
),

2
)

AS profit_margin

FROM sales_summary;
```

---

# Stage 3

Regional

Ranking

```sql
WITH sales_summary AS
(
    ...
)

SELECT

sales_month,

region,

revenue,

RANK()

OVER
(
PARTITION BY sales_month

ORDER BY

revenue DESC
)

AS regional_rank

FROM sales_summary;
```

---

# Stage 4

Running

Revenue

```sql
WITH sales_summary AS
(
    ...
)

SELECT

sales_month,

region,

SUM(revenue)

OVER
(
PARTITION BY region

ORDER BY sales_month
)

AS cumulative_revenue

FROM sales_summary;
```

---

# Stage 5

Monthly

Growth

```sql
WITH sales_summary AS
(
    ...
)

SELECT

sales_month,

region,

revenue,

LAG(revenue)

OVER
(
PARTITION BY region

ORDER BY sales_month
)

AS previous_month,

ROUND
(
(
revenue

-

LAG(revenue)

OVER
(
PARTITION BY region

ORDER BY sales_month
)
)

*100.0

/

NULLIF
(
LAG(revenue)

OVER
(
PARTITION BY region

ORDER BY sales_month
),

0
),

2
)

AS growth_percent

FROM sales_summary;
```

---

# Dashboard

Output

| Month | Region | Revenue | Margin | Rank | Growth % |
|--------|---------|--------:|-------:|----:|---------:|
|Jan|North|250|32.0|2|NULL|
|Jan|South|300|35.0|1|NULL|
|Feb|North|270|31.5|2|8.00|
|Feb|South|320|34.2|1|6.67|

---

# KPI

Cards

Business asks

```
Display

Executive

KPIs

At

The

Top

Of

Dashboard.
```

Example

```sql
SELECT

SUM(sales)

AS revenue,

SUM(profit)

AS profit,

COUNT(*)

AS total_orders,

AVG(sales)

AS average_order,

MAX(sales)

AS highest_order

FROM sales;
```

Each

value

can

be displayed

inside

a KPI

card.

---

# Top

Customers

Business asks

```
Display

Top

10

Customers.
```

```sql
SELECT

customer_name,

SUM(sales)

AS revenue,

RANK()

OVER
(
ORDER BY

SUM(sales)

DESC
)

AS customer_rank

FROM sales

GROUP BY customer_name;
```

---

# Regional

Contribution

```sql
SELECT

region,

SUM(sales)

AS revenue,

ROUND
(
100.0

*

SUM(sales)

/

SUM
(
SUM(sales)
)

OVER(),

2
)

AS contribution

FROM sales

GROUP BY region;
```

---

# Daily

Trend

Report

Business asks

```
Display

Daily

Revenue

Trend.
```

```sql
SELECT

sales_date,

SUM(sales)

AS revenue

FROM sales

GROUP BY sales_date

ORDER BY sales_date;
```

---

# Time-Series

Dashboard

Business asks

```
Show

Every

Day,

Even

Without

Sales.
```

Solution

```text
Calendar

↓

LEFT JOIN

↓

Sales

↓

COALESCE()
```

This

creates

continuous

charts.

---

# Executive

Dashboard

Pattern

```text
Transactions

↓

Aggregation

↓

KPIs

↓

Ranking

↓

Running

Totals

↓

Growth

↓

Dashboard
```

Nearly

every

enterprise

dashboard

follows

this

structure.

---

# Interactive

Dashboards

Modern

BI

tools

such as

Power BI,

Tableau,

and

Looker

often

pass

parameters

to SQL.

Examples

```text
Region

↓

Date

Range

↓

Product

↓

Customer
```

The

SQL

query

filters

the data

based

on

user

selections

before

returning

results.

---

# Business

Applications

Finance

```text
Executive

KPIs
```

---

Retail

```text
Sales

Dashboards
```

---

Healthcare

```text
Hospital

Performance
```

---

Manufacturing

```text
Production

Monitoring
```

---

Education

```text
Academic

Analytics
```

---

# Think Like

A BI

Developer

Business asks

```
Build

A Dashboard

Refreshing

Every

15

Minutes

Showing

Revenue,

Profit,

Growth,

Top

Customers,

And

Regional

Performance.
```

Design

the SQL

to

calculate

all

required

metrics

efficiently,

minimize

duplicate

calculations,

and

return

business-ready

results

to

the BI

tool.

---

# Performance

Considerations

Dashboard

queries

often

execute

frequently,

sometimes

every

few

minutes.

Optimize

by

- Filtering

early

- Creating

appropriate

indexes

- Reusing

aggregations

- Avoiding

duplicate

calculations

- Considering

materialized

views

for

expensive

reports

Always

monitor

performance

using

```
EXPLAIN ANALYZE
```

and

test

under

production-like

data

volumes.

---

# Best Practices

✅ Keep dashboard queries modular.

✅ Calculate KPIs once.

✅ Use Window Functions for rankings and trends.

✅ Use Calendar Tables for continuous timelines.

✅ Return dashboard-ready data.

---

# Common Mistakes

❌ Running multiple queries for each KPI.

❌ Calculating identical metrics repeatedly.

❌ Ignoring missing dates.

❌ Returning raw transactions to BI tools unnecessarily.

❌ Failing to optimize frequently executed dashboard queries.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a dashboard

showing

monthly

revenue

and

profit.

---

## Exercise 2

Add

regional

rankings

using

`RANK()`.

---

## Exercise 3

Calculate

month-over-month

growth

using

`LAG()`.

---

## Exercise 4

Display

regional

contribution

percentages.

---

## Exercise 5

Build

a complete

executive

dashboard

combining

CTEs,

aggregations,

Window

Functions,

and

KPIs.

---

# Interview Questions

## Beginner

1. What is an enterprise dashboard?

2. Why calculate KPIs inside SQL?

3. What metrics commonly appear in dashboards?

---

## Intermediate

1. Explain how Window Functions improve dashboard queries.

2. Why are Calendar Tables useful in dashboards?

3. How do KPI cards differ from detailed reports?

---

## Senior

1. Design a production-ready dashboard query for a BI platform.

2. Explain how you would optimize a dashboard refreshed every few minutes.

3. Discuss the trade-offs between computing metrics in SQL versus in the visualization layer.

---

# Section Summary

In this section,

you learned:

- Enterprise dashboards combine multiple KPIs, trends, rankings, and business metrics into a single reporting query.
- SQL prepares business-ready data before it reaches BI tools.
- Window Functions, CTEs, aggregations, and Calendar Tables work together to support interactive dashboards.
- Dashboard queries should minimize duplicate calculations and be optimized for frequent execution.
- Production dashboards balance performance, maintainability, and business requirements.

---

# Coming Up Next

## Section 39.16

# Query Refactoring Techniques

You'll learn:

- Simplifying complex SQL.
- Removing duplicated logic.
- Improving readability.
- Performance-aware refactoring.
- Enterprise SQL maintenance.
- Interview refactoring exercises.


# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.16
# Query Refactoring Techniques
# ==========================================================

# Introduction

As SQL

queries

grow larger,

they become

more difficult

to

- Read

- Maintain

- Debug

- Optimize

Enterprise

systems

often

contain

SQL queries

hundreds

of lines

long.

Simply

making

the query

work

is not

enough.

A good

SQL developer

must also

know

how

to

refactor

SQL.

Refactoring

means

improving

the structure

of a query

without

changing

its result.

---

# What Is

Query

Refactoring?

Query

Refactoring

is the

process

of

improving

SQL

by making

it

- More readable

- More maintainable

- Less repetitive

- Easier to optimize

while

producing

exactly

the same

output.

---

# Signs

That

A Query

Needs

Refactoring

A query

may need

refactoring

if

it contains

- Deeply

nested

subqueries

- Duplicate

calculations

- Long

CASE

expressions

repeated

multiple

times

- Difficult

business

logic

- Poor

formatting

- Unnecessary

joins

---

# Example

Bad

Query

```sql
SELECT

region,

SUM(sales),

SUM(profit),

SUM(profit)

/

SUM(sales)

FROM sales

GROUP BY region;
```

Problems

- Poor aliases

- Possible

division

by zero

- Difficult

to extend

---

# Refactored

Version

```sql
SELECT

region,

SUM(sales)

AS total_sales,

SUM(profit)

AS total_profit,

ROUND
(
100.0

*

SUM(profit)

/

NULLIF
(
SUM(sales),

0
),

2
)

AS profit_margin

FROM sales

GROUP BY region;
```

Now

the query

is safer,

clearer,

and

business-friendly.

---

# Refactoring

Pattern

1

Replace

Repeated

Calculations

Bad

```sql
SUM(sales)

/

SUM(quantity)

...

SUM(sales)

/

SUM(quantity)
```

Better

```sql
WITH summary AS
(
    SELECT

    SUM(sales)

AS total_sales,

    SUM(quantity)

AS total_quantity

    FROM sales
)

SELECT

total_sales,

total_quantity,

total_sales

/

NULLIF
(
total_quantity,

0
)

FROM summary;
```

Calculate

once,

reuse

many

times.

---

# Refactoring

Pattern

2

Replace

Nested

Subqueries

Bad

```text
SELECT

↓

Subquery

↓

Subquery

↓

Subquery

↓

Subquery
```

Better

```text
CTE

↓

CTE

↓

Final Query
```

Each

CTE

represents

one

business

step.

---

# Refactoring

Pattern

3

Separate

Business

Logic

Bad

```text
Filtering

+

Aggregation

+

Ranking

+

Formatting

↓

One Block
```

Better

```text
Filtering

↓

Aggregation

↓

Analytics

↓

Formatting
```

Each

stage

has

one

responsibility.

---

# Refactoring

Pattern

4

Use

Meaningful

Aliases

Bad

```sql
SELECT

SUM(sales)

AS s
```

Better

```sql
SELECT

SUM(sales)

AS total_sales
```

Business

users

understand

the result

immediately.

---

# Refactoring

Pattern

5

Replace

CASE

Duplication

Bad

```sql
CASE

...

CASE

...

CASE
```

Repeated

many

times.

Better

Create

a CTE

that

computes

the

derived

value

once.

Then

reuse

the result.

---

# Refactoring

Pattern

6

Use

Window

Functions

Instead

Of

Self

Joins

Bad

```text
Employee

↓

Self Join

↓

Running Total
```

Better

```sql
SUM()

OVER(...)
```

Window

Functions

are

usually

clearer

and

often

more

efficient.

---

# Refactoring

Pattern

7

Remove

Unnecessary

DISTINCT

Many

queries

contain

```sql
SELECT DISTINCT
```

even

though

the

JOIN

logic

already

guarantees

unique

rows.

Removing

unnecessary

`DISTINCT`

can

improve

performance.

---

# Refactoring

Pattern

8

Use

FILTER

Instead

Of

Repeated

CASE

Bad

```sql
SUM
(
CASE

WHEN product='Laptop'

THEN sales

ELSE 0

END
)
```

Repeated

for

many

products.

Better

```sql
SUM(sales)

FILTER

(
WHERE product='Laptop'
)
```

The

intent

is

clearer,

especially

when

many

conditional

aggregates

exist.

---

# Refactoring

Pattern

9

Remove

Duplicate

Joins

Sometimes

the same

table

is joined

multiple

times

without

need.

Review

whether

a single

join

can

provide

all

required

columns.

---

# Refactoring

Pattern

10

Format

SQL

Consistently

Good

formatting

helps

future

maintenance.

Example

```sql
SELECT

...

FROM

...

WHERE

...

GROUP BY

...

ORDER BY

...
```

Consistent

formatting

reduces

reading

time.

---

# Before

And

After

Refactoring

Before

```text
600

Lines

↓

Nested

Queries

↓

Duplicate

Logic

↓

Hard

To

Debug
```

After

```text
CTEs

↓

Reusable

Metrics

↓

Window

Functions

↓

Readable

SQL
```

The

business

logic

is

unchanged,

but

the query

is much

easier

to maintain.

---

# Enterprise

Example

Business asks

```
Improve

The

Performance

And

Readability

Of

An

Existing

Dashboard

Query.
```

Instead

of

rewriting

everything,

identify

repeated

calculations,

split

the query

into

logical

CTEs,

remove

duplicate

joins,

and

replace

self-joins

with

Window

Functions

where

appropriate.

---

# Refactoring

Workflow

```text
Original

Query

↓

Identify

Problems

↓

Split

Into

Stages

↓

Remove

Duplication

↓

Improve

Names

↓

Optimize

↓

Test

Results
```

Always

verify

that

the

refactored

query

returns

the

same

results

as

the original.

---

# Business

Applications

Finance

```text
Financial

Reports
```

---

Retail

```text
Sales

Dashboards
```

---

Healthcare

```text
Clinical

Analytics
```

---

Manufacturing

```text
Production

KPIs
```

---

Education

```text
Academic

Reports
```

---

# Think Like

A Senior

Data

Engineer

Business asks

```
A

700-Line

SQL

Query

Has

Become

Impossible

To

Maintain.
```

Do

not

rewrite

the

business

logic.

Instead,

refactor

the query

into

small,

well-named

CTEs,

remove

duplicate

calculations,

simplify

joins,

and

improve

formatting.

The

goal

is

maintainability

without

changing

the

output.

---

# Performance

Considerations

Refactoring

improves

readability,

but

does

not

automatically

improve

performance.

After

every

refactoring,

compare

execution

plans

using

```
EXPLAIN ANALYZE
```

to

ensure

the

new

structure

does

not

introduce

unexpected

overhead.

Always

verify

both

correctness

and

performance.

---

# Best Practices

✅ Refactor one logical problem at a time.

✅ Keep each CTE focused on a single responsibility.

✅ Remove duplicate calculations.

✅ Use meaningful aliases.

✅ Compare results before and after refactoring.

---

# Common Mistakes

❌ Changing business logic during refactoring.

❌ Refactoring without testing.

❌ Introducing unnecessary CTEs.

❌ Ignoring execution plans.

❌ Optimizing for style while harming performance.

---

# PostgreSQL Practice Lab

## Exercise 1

Refactor

a deeply

nested

query

using

CTEs.

---

## Exercise 2

Replace

repeated

calculations

with

a reusable

summary

CTE.

---

## Exercise 3

Rewrite

conditional

aggregations

using

the

`FILTER`

clause.

---

## Exercise 4

Replace

a self-join

with

a Window

Function.

---

## Exercise 5

Compare

the execution

plans

before

and

after

refactoring.

---

# Interview Questions

## Beginner

1. What is SQL refactoring?

2. Why should SQL be refactored?

3. What should remain unchanged after refactoring?

---

## Intermediate

1. Explain how CTEs improve readability.

2. Why should repeated calculations be removed?

3. When should Window Functions replace self-joins?

---

## Senior

1. Describe your approach to refactoring a 700-line production SQL query.

2. How do you ensure that refactoring has not changed the results?

3. Explain how to balance readability and performance during SQL refactoring.

---

# Section Summary

In this section,

you learned:

- Query refactoring improves readability, maintainability, and reuse without changing query results.
- Common refactoring techniques include layered CTEs, reusable calculations, meaningful aliases, and replacing self-joins with Window Functions.
- Removing unnecessary duplication simplifies future maintenance.
- Every refactoring should be validated for both correctness and performance using `EXPLAIN ANALYZE`.
- Refactoring is a core skill for maintaining large enterprise SQL codebases.

---

# Coming Up Next

## Section 39.17

# Advanced Performance Optimization

You'll learn:

- Optimizing complex reporting queries.
- Index-aware SQL design.
- Reducing sorts and scans.
- Execution plan analysis.
- PostgreSQL optimization strategies.
- Enterprise interview scenarios.

# ==========================================================
# Chapter 39
# Advanced SQL Techniques
# Section 39.17
# Advanced Performance Optimization
# ==========================================================

# Introduction

Enterprise

reporting

queries

often

process

millions

or

billions

of rows.

A query

that works

correctly

may still

be

too slow

for

production.

Performance

optimization

focuses

on

returning

correct

results

as

quickly

and

efficiently

as possible.

This

section

covers

advanced

optimization

techniques

used

by

PostgreSQL

Database

Administrators,

Data

Engineers,

Analytics

Engineers,

and

Backend

Developers.

---

# Performance

Optimization

Workflow

```text
Slow Query

↓

Measure

↓

Find

Bottleneck

↓

Optimize

↓

Measure

Again
```

Never

optimize

without

measuring

first.

---

# Rule

1

Use

EXPLAIN

ANALYZE

Before

changing

a query,

understand

how

PostgreSQL

executes

it.

```sql
EXPLAIN ANALYZE

SELECT

...

FROM sales;
```

Look for

- Sequential Scans

- Large Sorts

- Expensive Joins

- Hash Operations

- Nested Loops

- Actual Execution Time

---

# Rule

2

Filter

Early

Bad

```text
Read

Entire

Table

↓

Filter
```

Better

```text
Filter

↓

Aggregate

↓

Join
```

Reducing

rows

early

reduces

work

throughout

the query.

---

# Example

Bad

```sql
SELECT *

FROM sales

WHERE

sales_year >= 2025;
```

If

only

a few

columns

are needed,

avoid

`SELECT *`.

Better

```sql
SELECT

sales_date,

region,

sales

FROM sales

WHERE

sales_year >= 2025;
```

---

# Rule

3

Choose

The

Right

Indexes

Frequently

filtered

columns

should

be indexed.

Example

```sql
CREATE INDEX

idx_sales_region

ON sales(region);
```

Common

index

candidates

- WHERE

columns

- JOIN

columns

- ORDER BY

columns

- GROUP BY

columns

---

# Rule

4

Avoid

Repeated

Calculations

Bad

```sql
SUM(sales)

/

SUM(quantity)
```

Repeated

multiple

times.

Better

```text
Calculate

Once

↓

Reuse
```

CTEs

or

subqueries

can

eliminate

duplicate

work.

---

# Rule

5

Aggregate

Before

Joining

Suppose

Business asks

```
Display

Regional

Revenue

With

Customer

Information.
```

Instead

of

joining

millions

of rows

first,

aggregate

sales

by

region,

then

join

the

smaller

result.

---

# Rule

6

Use

Window

Functions

Instead

Of

Self

Joins

Bad

```text
Orders

↓

Self Join

↓

Running Total
```

Better

```sql
SUM()

OVER(...)
```

Window

Functions

usually

produce

clearer

SQL

and

avoid

expensive

self-joins.

---

# Rule

7

Avoid

Unnecessary

DISTINCT

Bad

```sql
SELECT DISTINCT

...
```

when

duplicate

rows

cannot

actually

occur.

Removing

unnecessary

`DISTINCT`

can

avoid

sorting

or

hashing.

---

# Rule

8

Use

Appropriate

JOIN

Types

Choose

the join

that

matches

the

business

requirement.

```text
INNER JOIN

↓

Matching

Rows
```

---

```text
LEFT JOIN

↓

Keep

Left

Rows
```

Avoid

joining

tables

that

are not

needed.

---

# Rule

9

Limit

Sorting

Sorting

is expensive.

Only

sort

when

required.

Bad

```sql
ORDER BY

customer_name
```

inside

a subquery

whose

result

is later

re-grouped.

The

sort

may be

unnecessary.

---

# Rule

10

Use

Materialized

Views

For

Heavy

Reports

Business asks

```
Dashboard

Refreshes

Every

Five

Minutes.
```

Instead

of

recalculating

millions

of rows,

consider

```sql
CREATE MATERIALIZED VIEW

monthly_sales

AS

...
```

Refresh

the view

periodically.

---

# Optimize

GROUP BY

Grouping

large

tables

is expensive.

Indexes

on

grouping

columns

may help,

especially

when

combined

with

selective

filters.

---

# Optimize

Window

Functions

Window

Functions

often

require

sorting.

Reduce

the

partition

size

whenever

possible.

Bad

```text
Entire

Table

↓

Rank
```

Better

```text
Partition

↓

Rank
```

Smaller

partitions

typically

require

less

work.

---

# Optimize

CTEs

Modern

PostgreSQL

may

inline

non-recursive

CTEs,

allowing

the planner

to optimize

them.

However,

forcing

materialization

can

sometimes

be useful

when

an expensive

intermediate

result

is reused

multiple

times.

Understand

how

your

PostgreSQL

version

handles

CTEs.

---

# Reading

Execution

Plans

Common

operators

include

```text
Seq Scan

↓

Reads

Entire

Table
```

---

```text
Index Scan

↓

Uses

Index
```

---

```text
Hash Join

↓

Hash-Based

Join
```

---

```text
Merge Join

↓

Sorted

Join
```

---

```text
Nested Loop

↓

Repeated

Lookup
```

Understanding

these

operators

helps

identify

performance

bottlenecks.

---

# Enterprise

Example

Business asks

```
Reduce

Dashboard

Execution

Time

From

20

Seconds

To

2

Seconds.
```

Possible

optimization

steps

```text
Measure

↓

Indexes

↓

Aggregation

↓

Materialized

Views

↓

Refactor

↓

Measure

Again
```

Optimization

is

an

iterative

process.

---

# Business

Applications

Finance

```text
Real-Time

Reporting
```

---

Retail

```text
Sales

Dashboards
```

---

Healthcare

```text
Patient

Analytics
```

---

Manufacturing

```text
Production

Monitoring
```

---

Education

```text
Student

Reporting
```

---

# Think Like

A Senior

Data

Engineer

Business asks

```
An

Executive

Dashboard

Processes

500

Million

Rows

Every

Hour.
```

Do

not

guess.

Measure

the query,

identify

the

largest

cost,

reduce

unnecessary

work,

improve

index

usage,

consider

pre-aggregation

or

materialized

views,

then

measure

again.

---

# Performance

Optimization

Checklist

✅ Use `EXPLAIN ANALYZE`

✅ Filter early

✅ Select only required columns

✅ Use appropriate indexes

✅ Aggregate before joining

✅ Prefer Window Functions over self-joins when appropriate

✅ Remove unnecessary `DISTINCT`

✅ Avoid unnecessary sorting

✅ Consider materialized views

✅ Re-test after every change

---

# Common Mistakes

❌ Optimizing without measuring.

❌ Adding indexes to every column.

❌ Using `SELECT *` in reporting queries.

❌ Sorting data unnecessarily.

❌ Refactoring without checking execution plans.

❌ Assuming every optimization improves performance.

---

# PostgreSQL Practice Lab

## Exercise 1

Run

`EXPLAIN ANALYZE`

on

a reporting

query

and

identify

its

most

expensive

operator.

---

## Exercise 2

Replace

`SELECT *`

with

only

the

required

columns.

---

## Exercise 3

Compare

a

Window

Function

solution

with

a

self-join

solution.

---

## Exercise 4

Create

an index

for

a

frequently

filtered

column

and

measure

its

impact.

---

## Exercise 5

Design

a

materialized

view

for

a

dashboard

that

refreshes

periodically.

---

# Interview Questions

## Beginner

1. Why should `EXPLAIN ANALYZE` be used before optimization?

2. Why is `SELECT *` discouraged in production reporting?

3. What is the purpose of an index?

---

## Intermediate

1. Why should filtering occur as early as possible?

2. When should Window Functions replace self-joins?

3. Why can unnecessary `DISTINCT` operations reduce performance?

---

## Senior

1. Describe your approach to optimizing a dashboard query processing hundreds of millions of rows.

2. Explain when a materialized view is preferable to executing a complex query repeatedly.

3. Walk through how you would analyze an execution plan and identify the primary bottleneck.

---

# Section Summary

In this section,

you learned:

- Performance optimization begins with measurement, not guesswork.
- `EXPLAIN ANALYZE` is the primary tool for understanding PostgreSQL execution plans.
- Early filtering, appropriate indexing, aggregation before joins, and avoiding duplicate work are key optimization strategies.
- Window Functions, materialized views, and careful query design can significantly improve reporting performance.
- Every optimization should be validated by comparing execution plans and execution times.

---

# Coming Up Next

## Section 39.18

# PostgreSQL Advanced SQL Interview Mastery

You'll learn:

- The most common advanced SQL interview questions.
- Enterprise reporting scenarios.
- Performance optimization discussions.
- Design and architecture questions.
- Senior Data Engineer interview strategies.
- Final chapter review and mastery checklist.