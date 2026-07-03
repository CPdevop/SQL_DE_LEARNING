# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# ==========================================================

This chapter focuses on writing server-side logic inside PostgreSQL.

Unlike previous chapters that focused on querying data, this chapter teaches you how to automate business logic, encapsulate reusable code, validate data, and respond automatically to database events.

These topics are heavily used in enterprise applications and are frequently asked in PostgreSQL, Backend Developer, and Data Engineering interviews.

---

## Planned Sections

### 40.1
Introduction to Stored Procedures & Functions

### 40.2
Creating SQL Functions

### 40.3
PL/pgSQL Basics

### 40.4
Variables, Constants & Scope

### 40.5
Control Flow
- IF
- CASE
- LOOP
- WHILE
- FOR

### 40.6
Function Parameters
- IN
- OUT
- INOUT
- DEFAULT

### 40.7
Returning Values
- Scalar
- TABLE
- RECORD
- SETOF

### 40.8
Exception Handling

### 40.9
Creating Stored Procedures

### 40.10
Functions vs Procedures

### 40.11
Dynamic SQL
- EXECUTE
- format()

### 40.12
Cursors

### 40.13
Triggers

### 40.14
Trigger Functions

### 40.15
BEFORE vs AFTER Triggers

### 40.16
INSTEAD OF Triggers

### 40.17
Auditing & Logging

### 40.18
Soft Delete Pattern

### 40.19
Business Rule Enforcement

### 40.20
Performance Considerations

### 40.21
Security
- SECURITY DEFINER
- SECURITY INVOKER

### 40.22
Enterprise Trigger Patterns

### 40.23
PostgreSQL Functions & Triggers Interview Mastery

---

Topics Covered

✅ SQL Functions

✅ PL/pgSQL

✅ Variables

✅ Loops

✅ Conditions

✅ Procedures

✅ Dynamic SQL

✅ Cursors

✅ Triggers

✅ Auditing

✅ Logging

✅ Soft Deletes

✅ Business Rules

✅ Security

✅ Performance

✅ Enterprise Design

✅ Interview Preparation

---

Estimated Length

23 Sections

Approximately 450–550 pages

This is one of the most important PostgreSQL chapters for enterprise backend development and senior PostgreSQL interviews.


# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.1
# Introduction to Stored Procedures & Functions
# ==========================================================

# Introduction

Until now,

you have

used SQL

primarily

to

retrieve,

insert,

update,

and

delete

data.

However,

enterprise

applications

often

require

business

logic

to execute

inside

the database

itself.

Instead

of sending

multiple

SQL statements

from

an application,

we can

package

the logic

inside

the database.

This

is achieved

using

- Functions

- Stored Procedures

- Triggers

These

features

make

applications

more

secure,

reusable,

and

maintainable.

---

# What Is

A Function?

A

Function

is

a reusable

database

object

that

accepts

input,

performs

processing,

and

returns

a value.

Conceptually

```text
Input

↓

Processing

↓

Output
```

Example

```text
calculate_tax()

↓

Returns

Tax Amount
```

Unlike

ordinary

queries,

functions

can

be called

multiple

times

from

different

queries

and

applications.

---

# What Is

A Stored

Procedure?

A

Stored

Procedure

is

a reusable

database

program

that

performs

one

or more

operations.

Unlike

functions,

procedures

are

typically

used

for

performing

actions

rather

than

returning

a value.

Examples

include

- Processing

Orders

- Updating

Inventory

- Creating

Invoices

- Sending

Notifications

- Archiving

Data

---

# Why

Store

Logic

Inside

The Database?

Without

database

logic

```text
Application

↓

SQL

↓

Application

↓

SQL

↓

Application

↓

SQL
```

Many

database

round

trips

are required.

---

With

Functions

or

Procedures

```text
Application

↓

Function

↓

Database

Processing

↓

Result
```

Fewer

network

calls

are required,

and

the

business

logic

is

centralized.

---

# Real

Business

Example

Business asks

```
Place

An

Order.
```

This

may require

- Validate

Customer

- Check

Inventory

- Reduce

Stock

- Insert

Order

- Insert

Order Items

- Generate

Invoice

- Commit

Transaction

Instead

of sending

seven

separate

SQL statements,

the

application

can call

one

stored

procedure.

---

# Benefits

Of

Functions

✅ Reusable

Logic

---

✅ Less

Duplicate

Code

---

✅ Easier

Maintenance

---

✅ Improved

Security

---

✅ Better

Performance

In

Many

Scenarios

---

# Benefits

Of

Stored

Procedures

✅ Execute

Multiple

Operations

---

✅ Transaction

Control

---

✅ Centralized

Business

Logic

---

✅ Reduce

Network

Traffic

---

✅ Easier

Application

Development

---

# Function

Vs

Procedure

| Feature | Function | Procedure |
|---------|----------|-----------|
|Returns Value|✅ Yes|⚠️ Optional (via OUT parameters)|
|Called From SELECT|✅ Yes|❌ No|
|Used In Expressions|✅ Yes|❌ No|
|Can Modify Data|✅ Yes|✅ Yes|
|Transaction Control (`COMMIT`/`ROLLBACK`)|❌ No|✅ Yes|
|Called Using|`SELECT`|`CALL`|

---

# Example

Function

```text
Salary

↓

Bonus

Calculation

↓

Return

Bonus
```

Example

Procedure

```text
Place

Order

↓

Validate

↓

Update

Inventory

↓

Create

Invoice

↓

Commit
```

---

# PostgreSQL

Languages

Functions

and

procedures

can be

written

using

different

languages.

Common

choices

include

- SQL

- PL/pgSQL

- PL/Python

- PL/Perl

- PL/Tcl

Most

enterprise

PostgreSQL

development

uses

```
PL/pgSQL
```

which

extends

SQL

with

variables,

loops,

conditions,

and

exception

handling.

---

# When

Should

You Use

A Function?

Use

a function

when

you need

- Calculations

- Data

Transformation

- Validation

- Reusable

Business

Rules

- Derived

Values

Examples

```text
Calculate

Tax
```

```text
Calculate

Discount
```

```text
Convert

Currency
```

```text
Validate

Email
```

---

# When

Should

You Use

A Procedure?

Use

a procedure

when

you need

multiple

database

operations

executed

as

one

business

process.

Examples

```text
Payroll

Processing
```

```text
Year-End

Closing
```

```text
Bulk

Import
```

```text
Inventory

Update
```

---

# Enterprise

Architecture

```text
Application

↓

API

↓

Stored Procedure

↓

Tables
```

The

application

does

not

need

to know

the

implementation

details.

It simply

calls

the

database

routine.

---

# Function

Execution

Flow

```text
Input

↓

Variables

↓

Business

Logic

↓

Return

Value
```

---

# Procedure

Execution

Flow

```text
Input

↓

Validation

↓

Multiple

SQL

Statements

↓

Commit

↓

Finish
```

---

# Think Like

A Backend

Developer

Suppose

Business asks

```
Create

A New

Customer.
```

Instead

of

allowing

every

application

to write

its own

SQL,

create

one

database

routine

that

validates

the data,

inserts

the customer,

writes

audit

records,

and

returns

the

result.

Every

application

then

uses

the

same

business

logic.

---

# Business

Applications

Finance

```text
Interest

Calculation
```

---

Retail

```text
Order

Processing
```

---

Healthcare

```text
Patient

Registration
```

---

Manufacturing

```text
Production

Scheduling
```

---

Education

```text
Student

Enrollment
```

---

# Performance

Considerations

Moving

business

logic

closer

to

the data

can

reduce

network

round

trips

and

centralize

processing.

However,

not

all

logic

belongs

inside

the database.

Complex

application

workflows,

user

interfaces,

and

external

API

calls

are often

better

handled

by

the

application

layer.

Choose

the

right

location

for

each

responsibility.

---

# Best Practices

✅ Keep functions focused on one task.

✅ Use procedures for multi-step business operations.

✅ Write reusable business logic.

✅ Keep naming consistent.

✅ Document input and output parameters.

---

# Common Mistakes

❌ Putting all application logic inside the database.

❌ Creating extremely large procedures.

❌ Duplicating business rules in multiple functions.

❌ Confusing functions with procedures.

❌ Ignoring transaction boundaries.

---

# PostgreSQL Practice Lab

## Exercise 1

List

five

business

operations

better

suited

to

functions.

---

## Exercise 2

List

five

business

operations

better

suited

to

procedures.

---

## Exercise 3

Explain

why

moving

some

business

logic

into

the database

can

reduce

network

traffic.

---

## Exercise 4

Compare

functions

and

procedures

for

order

processing.

---

## Exercise 5

Design

a simple

customer

registration

workflow

using

a stored

procedure.

---

# Interview Questions

## Beginner

1. What is a PostgreSQL function?

2. What is a stored procedure?

3. What is the difference between a function and a procedure?

---

## Intermediate

1. When would you choose a function instead of a procedure?

2. Why do enterprise applications use database routines?

3. What advantages do stored procedures provide?

---

## Senior

1. Design an order-processing workflow using PostgreSQL procedures.

2. Discuss the trade-offs between business logic in the database versus the application layer.

3. Explain how functions and procedures improve maintainability in enterprise systems.

---

# Section Summary

In this section,

you learned:

- Functions and stored procedures encapsulate reusable business logic inside PostgreSQL.
- Functions are typically used for calculations and returning values, while procedures are designed for multi-step operations.
- Database routines reduce duplicated SQL and can reduce network round trips.
- Enterprise systems commonly use PL/pgSQL to implement server-side logic.
- Choosing whether logic belongs in the database or the application depends on the responsibility and architecture.

---

# Coming Up Next

## Section 40.2

# Creating SQL Functions

You'll learn:

- `CREATE FUNCTION`
- Function syntax
- Input parameters
- Returning values
- Calling functions
- Practical business examples


# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.2
# Creating SQL Functions
# ==========================================================

# Introduction

In the

previous

section,

you learned

what

functions

are

and

why

they

are used.

Now,

you will

learn

how

to create

your

first

PostgreSQL

function.

A function

is

a reusable

piece

of SQL

that

accepts

input,

performs

processing,

and

returns

a result.

---

# Basic

Syntax

```sql
CREATE FUNCTION

function_name
(
    parameters
)

RETURNS return_type

LANGUAGE SQL

AS

$$

SQL Statement

$$;
```

Every

function

contains

- Name

- Parameters

- Return Type

- Language

- SQL Body

---

# First

Function

Business asks

```
Return

10
```

```sql
CREATE FUNCTION

get_ten()

RETURNS INTEGER

LANGUAGE SQL

AS

$$

SELECT 10;

$$;
```

---

# Calling

A Function

Functions

are

called

using

`SELECT`.

```sql
SELECT

get_ten();
```

Result

```text
10
```

---

# Function

With

One

Parameter

Business asks

```
Double

A Number.
```

```sql
CREATE FUNCTION

double_number

(
    num INTEGER
)

RETURNS INTEGER

LANGUAGE SQL

AS

$$

SELECT

num * 2;

$$;
```

---

# Calling

The Function

```sql
SELECT

double_number(5);
```

Result

```text
10
```

---

# Multiple

Parameters

Business asks

```
Add

Two

Numbers.
```

```sql
CREATE FUNCTION

add_numbers

(
    a INTEGER,

    b INTEGER
)

RETURNS INTEGER

LANGUAGE SQL

AS

$$

SELECT

a + b;

$$;
```

---

# Calling

The Function

```sql
SELECT

add_numbers

(
10,

20
);
```

Result

```text
30
```

---

# Function

Returning

Text

Business asks

```
Display

Welcome

Message.
```

```sql
CREATE FUNCTION

welcome_user

(
    username TEXT
)

RETURNS TEXT

LANGUAGE SQL

AS

$$

SELECT

'Welcome '

||

username;

$$;
```

---

# Calling

The Function

```sql
SELECT

welcome_user

(
'Alice'
);
```

Result

```text
Welcome Alice
```

---

# Function

Using

Table

Data

Suppose

Business asks

```
Return

Total

Employees.
```

```sql
CREATE FUNCTION

employee_count()

RETURNS BIGINT

LANGUAGE SQL

AS

$$

SELECT

COUNT(*)

FROM employees;

$$;
```

---

# Calling

The Function

```sql
SELECT

employee_count();
```

Result

```text
125
```

Example

value.

---

# Function

Returning

Average

Salary

```sql
CREATE FUNCTION

average_salary()

RETURNS NUMERIC

LANGUAGE SQL

AS

$$

SELECT

AVG(salary)

FROM employees;

$$;
```

---

# Using

Functions

Inside

Queries

Functions

can be

called

inside

other

queries.

Example

```sql
SELECT

employee_name,

salary,

salary

-

average_salary()

AS difference

FROM employees;
```

Every

employee

is compared

with

the

company

average.

---

# Input

And

Output

Flow

```text
Input

↓

Function

↓

Processing

↓

Return

Result
```

Example

```text
5

↓

double_number()

↓

10
```

---

# Business

Example

Business asks

```
Calculate

GST

At

18%.
```

```sql
CREATE FUNCTION

calculate_gst

(
    amount NUMERIC
)

RETURNS NUMERIC

LANGUAGE SQL

AS

$$

SELECT

amount

* 0.18;

$$;
```

---

# Calling

The Function

```sql
SELECT

calculate_gst

(
500
);
```

Result

```text
90
```

---

# Reusing

Functions

Instead

of writing

```sql
price * 0.18
```

everywhere,

reuse

the

function.

```sql
SELECT

product_name,

price,

calculate_gst(price)

AS gst

FROM products;
```

One

function

can

be used

across

many

queries.

---

# Replacing

A Function

If

you need

to modify

an existing

function,

use

```sql
CREATE OR REPLACE FUNCTION
```

instead

of

dropping

and

recreating

it.

Example

```sql
CREATE OR REPLACE FUNCTION

double_number

(
    num INTEGER
)

RETURNS INTEGER

LANGUAGE SQL

AS

$$

SELECT

num * 2;

$$;
```

---

# Removing

A Function

Use

```sql
DROP FUNCTION

function_name();
```

Example

```sql
DROP FUNCTION

get_ten();
```

If

the function

accepts

parameters,

their

types

must

also

be specified.

Example

```sql
DROP FUNCTION

add_numbers

(
INTEGER,

INTEGER
);
```

---

# Business

Applications

Finance

```text
Tax

Calculation
```

---

Retail

```text
Price

Calculation
```

---

Healthcare

```text
BMI

Calculation
```

---

Manufacturing

```text
Cost

Calculation
```

---

Education

```text
Grade

Calculation
```

---

# Think Like

A Backend

Developer

Instead

of

copying

business

formulas

into

multiple

applications,

place

them

inside

database

functions.

Every

application

uses

the

same

validated

logic,

reducing

duplication

and

maintenance.

---

# Performance

Considerations

SQL

functions

are

best

suited

for

simple,

reusable

operations.

Avoid

placing

very

complex

business

workflows

inside

SQL-language

functions.

For

procedural

logic,

variables,

loops,

or

exception

handling,

use

PL/pgSQL,

which

you will

learn

next.

---

# Best Practices

✅ Keep functions small.

✅ Give functions meaningful names.

✅ Return appropriate data types.

✅ Reuse functions instead of duplicating formulas.

✅ Use `CREATE OR REPLACE FUNCTION` during development.

---

# Common Mistakes

❌ Choosing the wrong return type.

❌ Creating very large SQL functions.

❌ Duplicating business calculations.

❌ Forgetting parameter data types.

❌ Dropping overloaded functions without specifying parameter types.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a function

that

triples

a number.

---

## Exercise 2

Create

a function

that

returns

the

square

of

a number.

---

## Exercise 3

Create

a function

that

calculates

a

10%

discount.

---

## Exercise 4

Create

a function

that

returns

the

total

number

of products.

---

## Exercise 5

Use

a function

inside

a

`SELECT`

statement

to calculate

GST

for

every

product.

---

# Interview Questions

## Beginner

1. What is a SQL function?

2. How do you create a function in PostgreSQL?

3. How do you call a function?

---

## Intermediate

1. What is the purpose of the `RETURNS` clause?

2. Why use `CREATE OR REPLACE FUNCTION`?

3. Can a function be called inside another SQL query?

---

## Senior

1. Design a reusable tax-calculation function for an e-commerce system.

2. Explain when SQL-language functions are preferable to PL/pgSQL functions.

3. Discuss the benefits of centralizing business calculations in database functions.

---

# Section Summary

In this section,

you learned:

- SQL functions are reusable database routines created with `CREATE FUNCTION`.
- Functions accept parameters, perform processing, and return a value.
- Functions are called using `SELECT` and can be used inside other SQL queries.
- `CREATE OR REPLACE FUNCTION` simplifies updating existing functions.
- SQL functions are ideal for simple reusable calculations and business rules.

---

# Coming Up Next

## Section 40.3

# PL/pgSQL Basics

You'll learn:

- What PL/pgSQL is.
- Function blocks.
- `BEGIN` and `END`.
- Variables.
- Procedural programming.
- Writing your first PL/pgSQL function.


# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.3
# PL/pgSQL Basics
# ==========================================================

# Introduction

SQL

is

excellent

for

retrieving

and

modifying

data.

However,

SQL

alone

cannot

perform

many

programming

tasks

such as

- Variables

- Loops

- Conditions

- Exception

Handling

- Complex

Business

Logic

For

these

tasks,

PostgreSQL

provides

```
PL/pgSQL
```

(PostgreSQL

Procedural

Language).

It

extends

SQL

into

a complete

programming

language.

---

# What Is

PL/pgSQL?

PL/pgSQL

is

PostgreSQL's

native

procedural

language.

It

combines

SQL

with

programming

constructs.

Example

```text
SQL

+

Variables

+

IF

+

Loops

+

Exceptions

=

PL/pgSQL
```

---

# Why

Use

PL/pgSQL?

Business

logic

often

requires

decisions.

Example

```
If

Salary

>

100000

↓

Bonus

20%

Else

↓

Bonus

10%
```

Plain

SQL

cannot

express

complex

procedural

logic

as

cleanly

as

PL/pgSQL.

---

# Basic

Function

Structure

```sql
CREATE FUNCTION

function_name()

RETURNS INTEGER

LANGUAGE plpgsql

AS

$$

BEGIN

    RETURN 10;

END;

$$;
```

Notice

the

language

changes

from

```
SQL
```

to

```
plpgsql
```

---

# Function

Anatomy

Every

PL/pgSQL

function

contains

- Function

Name

- Parameters

- Return

Type

- Language

- BEGIN

- END

- RETURN

---

# Calling

The

Function

```sql
SELECT

function_name();
```

Result

```text
10
```

---

# BEGIN

And

END

Everything

between

```sql
BEGIN
```

and

```sql
END;
```

is

the

function

body.

Example

```sql
BEGIN

    SQL Statement;

    SQL Statement;

    RETURN value;

END;
```

Think

of

it

as

the

main

program

block.

---

# First

PL/pgSQL

Function

Business asks

```
Return

Hello.
```

```sql
CREATE FUNCTION

say_hello()

RETURNS TEXT

LANGUAGE plpgsql

AS

$$

BEGIN

    RETURN

    'Hello';

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT

say_hello();
```

Result

```text
Hello
```

---

# Function

With

Parameters

Business asks

```
Square

A Number.
```

```sql
CREATE FUNCTION

square_number

(
    num INTEGER
)

RETURNS INTEGER

LANGUAGE plpgsql

AS

$$

BEGIN

    RETURN

    num * num;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT

square_number

(
8
);
```

Result

```text
64
```

---

# Multiple

Statements

Unlike

SQL

functions,

PL/pgSQL

can

execute

multiple

statements.

Example

```sql
BEGIN

    SELECT ...;

    UPDATE ...;

    INSERT ...;

    RETURN ...;

END;
```

This

makes

PL/pgSQL

suitable

for

complex

business

logic.

---

# Statement

Termination

Every

statement

inside

PL/pgSQL

ends

with

a

semicolon.

Example

```sql
BEGIN

    RETURN 5;

END;
```

Missing

semicolons

are

a common

source

of

syntax

errors.

---

# SQL

Inside

PL/pgSQL

PL/pgSQL

can

execute

ordinary

SQL.

Example

```sql
CREATE FUNCTION

employee_count()

RETURNS BIGINT

LANGUAGE plpgsql

AS

$$

BEGIN

    RETURN

    (
        SELECT

        COUNT(*)

        FROM employees
    );

END;

$$;
```

---

# Execution

Flow

```text
Call

Function

↓

BEGIN

↓

Execute

Statements

↓

RETURN

↓

END
```

The

function

ends

when

`RETURN`

is

executed.

---

# SQL

Function

Vs

PL/pgSQL

Function

| SQL Function | PL/pgSQL Function |
|--------------|-------------------|
|Simple SQL|Procedural Logic|
|Single Expression|Multiple Statements|
|No Variables|Supports Variables|
|No Loops|Supports Loops|
|No Exception Handling|Supports Exception Handling|

---

# Real

Business

Example

Business asks

```
Calculate

Employee

Bonus.
```

Business

Rule

```text
Salary

>

100000

↓

20%

Else

↓

10%
```

PL/pgSQL

can

implement

this

cleanly

using

conditions,

which

you

will

learn

in

later

sections.

---

# Enterprise

Architecture

```text
Application

↓

PL/pgSQL

Function

↓

Database

↓

Result
```

Business

logic

remains

inside

the

database,

making

it

reusable

across

multiple

applications.

---

# Business

Applications

Finance

```text
Tax

Calculation
```

---

Retail

```text
Order

Validation
```

---

Healthcare

```text
Patient

Processing
```

---

Manufacturing

```text
Production

Rules
```

---

Education

```text
Student

Evaluation
```

---

# Think Like

A Backend

Developer

Suppose

Business asks

```
Validate

An

Order

Before

Saving

It.
```

Rather

than

placing

validation

logic

inside

every

application,

implement

the

validation

inside

a

PL/pgSQL

function.

Every

application

calls

the

same

validated

logic,

ensuring

consistent

behavior.

---

# Performance

Considerations

PL/pgSQL

introduces

procedural

processing,

making

it

more

powerful

than

SQL-language

functions.

However,

avoid

using

procedural

code

when

a

single

SQL

statement

can

solve

the

problem

efficiently.

Choose

the

simplest

tool

that

meets

the

requirement.

---

# Best Practices

✅ Keep functions focused on one responsibility.

✅ Use SQL-language functions for simple calculations.

✅ Use PL/pgSQL for procedural logic.

✅ Always include `RETURN` for non-void functions.

✅ Format function bodies consistently.

---

# Common Mistakes

❌ Forgetting `BEGIN` or `END`.

❌ Missing semicolons.

❌ Choosing PL/pgSQL for simple SQL expressions.

❌ Forgetting the `RETURN` statement.

❌ Mixing procedural logic with unnecessary SQL complexity.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a PL/pgSQL

function

that

returns

your

favorite

number.

---

## Exercise 2

Create

a function

that

returns

the

cube

of

a number.

---

## Exercise 3

Create

a function

that

returns

the

total

number

of

employees.

---

## Exercise 4

Rewrite

a SQL-language

function

using

PL/pgSQL.

---

## Exercise 5

Compare

a SQL

function

and

a PL/pgSQL

function

that

perform

the

same

calculation.

---

# Interview Questions

## Beginner

1. What is PL/pgSQL?

2. Why does PostgreSQL provide PL/pgSQL?

3. What is the purpose of `BEGIN` and `END`?

---

## Intermediate

1. When should you use PL/pgSQL instead of a SQL-language function?

2. Can PL/pgSQL execute ordinary SQL statements?

3. Why are semicolons required inside PL/pgSQL blocks?

---

## Senior

1. Explain the differences between SQL-language functions and PL/pgSQL functions.

2. Design a reusable business-validation function using PL/pgSQL.

3. Discuss when procedural logic belongs inside the database instead of the application layer.

---

# Section Summary

In this section,

you learned:

- PL/pgSQL is PostgreSQL's native procedural programming language.
- It extends SQL with procedural constructs such as blocks, variables, conditions, loops, and exception handling.
- Every PL/pgSQL function uses a `BEGIN ... END` block.
- PL/pgSQL is ideal for multi-step business logic, while SQL-language functions are best for simple SQL expressions.
- Choosing between SQL and PL/pgSQL depends on the complexity of the required logic.

---

# Coming Up Next

## Section 40.4

# Variables, Constants & Scope

You'll learn:

- Declaring variables.
- Assigning values.
- Constants.
- Variable scope.
- `%TYPE` and `%ROWTYPE`.
- Enterprise coding practices.


# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.4
# Variables, Constants & Scope
# ==========================================================

# Introduction

Most

real-world

functions

need

temporary

storage

while

processing

data.

Examples

include

- Customer Name

- Salary

- Tax

- Discount

- Total Amount

- Status

These

temporary

values

are

stored

inside

variables.

PL/pgSQL

also

supports

constants,

allowing

values

that

must

never

change

during

execution.

---

# What Is

A Variable?

A

variable

is

a named

memory

location

used

to store

a value

temporarily

during

function

execution.

Example

```text
salary

↓

50000
```

Later,

the value

may change.

```text
salary

↓

60000
```

---

# Variable

Declaration

Variables

are declared

inside

the

`DECLARE`

section.

Syntax

```sql
DECLARE

variable_name

data_type;
```

Example

```sql
DECLARE

salary NUMERIC;
```

---

# Function

Structure

```sql
CREATE FUNCTION

...

RETURNS ...

LANGUAGE plpgsql

AS

$$

DECLARE

    variable_name data_type;

BEGIN

    ...

END;

$$;
```

The

`DECLARE`

section

appears

between

`AS $$`

and

`BEGIN`.

---

# Assigning

Values

Use

`:=`

to assign

a value.

Example

```sql
DECLARE

salary NUMERIC;

BEGIN

salary := 50000;
```

---

# Returning

The

Variable

```sql
CREATE FUNCTION

sample()

RETURNS INTEGER

LANGUAGE plpgsql

AS

$$

DECLARE

number INTEGER;

BEGIN

number := 10;

RETURN number;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT

sample();
```

Result

```text
10
```

---

# Multiple

Variables

```sql
DECLARE

price NUMERIC;

tax NUMERIC;

total NUMERIC;
```

Each

variable

stores

its own

value.

---

# Variable

Calculation

```sql
DECLARE

price NUMERIC;

tax NUMERIC;

BEGIN

price := 1000;

tax := price * 0.18;

RETURN tax;
```

Result

```text
180
```

---

# Variable

Initialization

Variables

can also

be initialized

during

declaration.

```sql
DECLARE

tax_rate NUMERIC := 0.18;
```

Equivalent

to

```sql
DECLARE

tax_rate NUMERIC;

BEGIN

tax_rate := 0.18;
```

---

# Constants

Sometimes

a value

must

never

change.

Use

`CONSTANT`.

```sql
DECLARE

tax_rate

CONSTANT NUMERIC

:= 0.18;
```

Now

the value

cannot

be modified.

---

# Invalid

Constant

Assignment

```sql
tax_rate := 0.20;
```

Result

```text
Error

Cannot

Assign

To

Constant
```

---

# Variable

Scope

Variables

exist

only

inside

the

function

execution.

```text
Function Starts

↓

Variable Created

↓

Processing

↓

Function Ends

↓

Variable Destroyed
```

They

cannot

be accessed

outside

the function.

---

# Variables

Using

Table

Values

Suppose

Business asks

```
Return

Average

Salary.
```

```sql
CREATE FUNCTION

average_salary()

RETURNS NUMERIC

LANGUAGE plpgsql

AS

$$

DECLARE

avg_salary NUMERIC;

BEGIN

SELECT

AVG(salary)

INTO

avg_salary

FROM employees;

RETURN avg_salary;

END;

$$;
```

---

# Understanding

SELECT INTO

```sql
SELECT

AVG(salary)

INTO

avg_salary

FROM employees;
```

Execution

```text
Query

↓

Result

↓

Variable
```

The

query

result

is stored

inside

the variable.

---

# %TYPE

Sometimes

you

want

a variable

to use

the same

data type

as

a table

column.

Syntax

```sql
variable_name

table_name.column_name%TYPE;
```

Example

```sql
DECLARE

salary

employees.salary%TYPE;
```

Now

if

the

column

type

changes,

the

variable

automatically

matches

it.

---

# Why

Use

%TYPE?

Without

`%TYPE`

```text
Table

↓

NUMERIC

Variable

↓

INTEGER
```

Possible

type

mismatch.

---

With

`%TYPE`

```text
Table

↓

NUMERIC

↓

Variable

↓

NUMERIC
```

The

types

remain

consistent.

---

# %ROWTYPE

Sometimes

you need

an

entire

row.

Syntax

```sql
DECLARE

employee_record

employees%ROWTYPE;
```

Now

the variable

contains

every

column

of

the

`employees`

table.

---

# Example

Using

%ROWTYPE

```sql
DECLARE

emp employees%ROWTYPE;

BEGIN

SELECT *

INTO emp

FROM employees

WHERE employee_id = 1;
```

Access

columns

using

dot

notation.

```sql
emp.salary

emp.employee_name
```

---

# Variable

Lifecycle

```text
DECLARE

↓

Assign

↓

Use

↓

Return

↓

Destroyed
```

Variables

exist

only

while

the function

is running.

---

# Business

Example

Business asks

```
Calculate

Final

Price.
```

Processing

```text
Price

↓

Discount

↓

GST

↓

Final

Amount
```

Each

step

stores

its

intermediate

result

inside

variables,

making

the logic

easy

to follow.

---

# Business

Applications

Finance

```text
Interest

Calculation
```

---

Retail

```text
Invoice

Generation
```

---

Healthcare

```text
Patient

Billing
```

---

Manufacturing

```text
Production

Cost
```

---

Education

```text
Grade

Calculation
```

---

# Think Like

A Backend

Developer

Suppose

Business asks

```
Calculate

Employee

Bonus.
```

Instead

of

writing

one

long

expression,

store

salary,

bonus

percentage,

and

final

bonus

inside

separate

variables.

The

function

becomes

much

easier

to read,

debug,

and

maintain.

---

# Performance

Considerations

Variables

exist

only

during

function

execution

and

consume

memory

for

that

execution.

Use

variables

to improve

clarity,

but

avoid

creating

large

numbers

of

unused

variables.

Prefer

`%TYPE`

and

`%ROWTYPE`

to reduce

maintenance

when

table

definitions

change.

---

# Best Practices

✅ Declare variables close to their purpose.

✅ Use meaningful variable names.

✅ Prefer `%TYPE` for table-related variables.

✅ Use `%ROWTYPE` when retrieving complete rows.

✅ Use `CONSTANT` for fixed values.

---

# Common Mistakes

❌ Forgetting the `DECLARE` section.

❌ Assigning values to constants.

❌ Hardcoding data types instead of using `%TYPE`.

❌ Declaring unnecessary variables.

❌ Assuming variables exist after the function finishes.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a variable

named

`salary`

and

assign

a value.

---

## Exercise 2

Declare

a

constant

for

GST

rate.

---

## Exercise 3

Use

`SELECT INTO`

to

store

the

average

salary

inside

a variable.

---

## Exercise 4

Create

a variable

using

`%TYPE`.

---

## Exercise 5

Retrieve

an

entire

employee

row

using

`%ROWTYPE`.

---

# Interview Questions

## Beginner

1. What is a variable in PL/pgSQL?

2. Where are variables declared?

3. What does `:=` do?

---

## Intermediate

1. Explain `SELECT INTO`.

2. What is the purpose of `%TYPE`?

3. When should `%ROWTYPE` be used?

---

## Senior

1. Why are `%TYPE` and `%ROWTYPE` preferred in enterprise applications?

2. Design a bonus-calculation function using variables and constants.

3. Explain variable scope and lifecycle in PL/pgSQL.

---

# Section Summary

In this section,

you learned:

- Variables store temporary values during function execution.
- Variables are declared in the `DECLARE` section and assigned using `:=`.
- `SELECT ... INTO` stores query results in variables.
- `CONSTANT` creates immutable values.
- `%TYPE` and `%ROWTYPE` help keep functions synchronized with table definitions and improve maintainability.

---

# Coming Up Next

## Section 40.5

# Control Flow

You'll learn:

- `IF`
- `ELSIF`
- `ELSE`
- `CASE`
- `LOOP`
- `WHILE`
- `FOR`
- Enterprise control-flow patterns.


# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.5
# Control Flow
# ==========================================================

# Introduction

Real-world

business

logic

requires

making

decisions

and

repeating

tasks.

Examples

include

- Approving

Loans

- Calculating

Bonuses

- Processing

Orders

- Validating

Data

- Generating

Reports

PL/pgSQL

provides

control-flow

statements

that

allow

functions

to

make

decisions

and

execute

code

multiple

times.

---

# Control

Flow

Statements

PL/pgSQL

supports

- `IF`

- `ELSIF`

- `ELSE`

- `CASE`

- `LOOP`

- `WHILE`

- `FOR`

These

statements

allow

functions

to behave

like

traditional

programs.

---

# IF

Statement

Syntax

```sql
IF condition THEN

    statements;

END IF;
```

The

statements

execute

only

when

the

condition

is

true.

---

# Example

Business asks

```
Return

Bonus

If

Salary

>

100000.
```

```sql
CREATE FUNCTION

bonus_status

(
    salary NUMERIC
)

RETURNS TEXT

LANGUAGE plpgsql

AS

$$

BEGIN

    IF salary > 100000 THEN

        RETURN 'Eligible';

    END IF;

    RETURN 'Not Eligible';

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT

bonus_status
(
120000
);
```

Result

```text
Eligible
```

---

# IF

ELSE

Syntax

```sql
IF condition THEN

    ...

ELSE

    ...

END IF;
```

---

# Example

```sql
IF salary > 100000 THEN

    RETURN '20% Bonus';

ELSE

    RETURN '10% Bonus';

END IF;
```

---

# ELSIF

Sometimes

multiple

conditions

must

be checked.

Syntax

```sql
IF condition1 THEN

    ...

ELSIF condition2 THEN

    ...

ELSIF condition3 THEN

    ...

ELSE

    ...

END IF;
```

---

# Example

Grade

Calculation

```sql
IF marks >= 90 THEN

    RETURN 'A';

ELSIF marks >= 75 THEN

    RETURN 'B';

ELSIF marks >= 60 THEN

    RETURN 'C';

ELSE

    RETURN 'Fail';

END IF;
```

---

# CASE

Statement

`CASE`

provides

another

way

to

handle

multiple

conditions.

Syntax

```sql
CASE

WHEN condition1 THEN

    ...

WHEN condition2 THEN

    ...

ELSE

    ...

END CASE;
```

---

# Example

```sql
CASE

WHEN salary > 100000 THEN

    RETURN 'High';

WHEN salary > 50000 THEN

    RETURN 'Medium';

ELSE

    RETURN 'Low';

END CASE;
```

---

# LOOP

Statement

`LOOP`

creates

an

infinite

loop

until

it is

explicitly

exited.

Syntax

```sql
LOOP

    ...

    EXIT;

END LOOP;
```

---

# Example

```sql
DECLARE

counter INTEGER := 1;

BEGIN

LOOP

    EXIT

    WHEN counter > 5;

    counter := counter + 1;

END LOOP;
```

The

loop

runs

five

times.

---

# WHILE

Loop

`WHILE`

continues

executing

while

a condition

remains

true.

Syntax

```sql
WHILE condition LOOP

    ...

END LOOP;
```

---

# Example

```sql
DECLARE

counter INTEGER := 1;

BEGIN

WHILE counter <= 5 LOOP

    counter := counter + 1;

END LOOP;
```

---

# FOR

Loop

`FOR`

is

used

when

the

number

of

iterations

is known.

Syntax

```sql
FOR i IN 1..5 LOOP

    ...

END LOOP;
```

---

# Example

```sql
FOR i IN 1..5 LOOP

    RAISE NOTICE

    '%',

    i;

END LOOP;
```

Output

```text
1

2

3

4

5
```

---

# FOR

Loop

Over

Query

Business asks

```
Process

Every

Employee.
```

```sql
FOR emp IN

SELECT *

FROM employees

LOOP

    RAISE NOTICE

    '%',

    emp.employee_name;

END LOOP;
```

Each

row

returned

by

the query

is processed

one

at

a time.

---

# EXIT

Statement

Use

`EXIT`

to

leave

a loop.

Example

```sql
EXIT

WHEN

counter > 10;
```

The

loop

stops

immediately.

---

# CONTINUE

Statement

Use

`CONTINUE`

to

skip

the

current

iteration

and

move

to

the next.

Example

```sql
CONTINUE

WHEN

salary < 50000;
```

The

remaining

statements

for

that

iteration

are skipped.

---

# Control

Flow

Visualization

```text
Start

↓

IF

↓

True

↓

Execute

↓

End
```

---

```text
FOR

↓

Iteration

1

↓

Iteration

2

↓

Iteration

3

↓

End
```

---

# Real

Business

Example

Business asks

```
Process

Monthly

Bonuses.
```

Workflow

```text
Employees

↓

FOR Loop

↓

IF

Eligible

↓

Update

Bonus

↓

Next

Employee
```

This

combines

loops

and

conditions

inside

one

function.

---

# Nested

Control

Flow

PL/pgSQL

allows

control

statements

inside

other

control

statements.

Example

```text
FOR

↓

IF

↓

CASE

↓

LOOP
```

Although

supported,

deeply

nested

logic

should

be kept

readable.

---

# Business

Applications

Finance

```text
Loan

Approval
```

---

Retail

```text
Order

Validation
```

---

Healthcare

```text
Patient

Processing
```

---

Manufacturing

```text
Inventory

Updates
```

---

Education

```text
Grade

Evaluation
```

---

# Think Like

A Backend

Developer

Suppose

Business asks

```
Increase

Salary

By

10%

Only

For

Employees

Who

Have

Worked

More

Than

Five

Years.
```

A

`FOR`

loop

can

process

each

employee,

an

`IF`

statement

checks

eligibility,

and

an

`UPDATE`

statement

applies

the

salary

increase.

This

combination

models

real

enterprise

business

workflows.

---

# Performance

Considerations

Procedural

loops

execute

row

by

row.

Whenever

possible,

prefer

set-based

SQL

operations

because

they

allow

PostgreSQL

to

optimize

processing.

Use

loops

only

when

the

business

logic

cannot

be expressed

efficiently

with

a

single

SQL

statement.

---

# Best Practices

✅ Prefer set-based SQL over loops when practical.

✅ Keep conditional logic readable.

✅ Use `CASE` for many related conditions.

✅ Use `FOR` when the number of iterations is known.

✅ Use `EXIT` and `CONTINUE` intentionally.

---

# Common Mistakes

❌ Writing unnecessary loops.

❌ Forgetting `END IF` or `END LOOP`.

❌ Creating infinite loops.

❌ Deeply nesting many control-flow statements.

❌ Using procedural code where a single SQL query would be simpler.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a function

that

returns

`Pass`

or

`Fail`

using

`IF`.

---

## Exercise 2

Calculate

grades

using

`ELSIF`.

---

## Exercise 3

Rewrite

the

grading

logic

using

`CASE`.

---

## Exercise 4

Print

numbers

from

1

to

10

using

a

`FOR`

loop.

---

## Exercise 5

Process

all

employees

using

a

`FOR`

loop

over

a query.

---

# Interview Questions

## Beginner

1. What is the purpose of the `IF` statement?

2. What is the difference between `IF` and `CASE`?

3. When would you use a `FOR` loop?

---

## Intermediate

1. Compare `LOOP`, `WHILE`, and `FOR`.

2. What is the purpose of `EXIT` and `CONTINUE`?

3. Why should set-based SQL often be preferred over loops?

---

## Senior

1. Design a PL/pgSQL function that processes monthly bonuses using loops and conditions.

2. Explain when procedural control flow is appropriate in PostgreSQL.

3. Discuss the performance implications of row-by-row processing versus set-based SQL.

---

# Section Summary

In this section,

you learned:

- PL/pgSQL provides procedural control-flow statements such as `IF`, `CASE`, `LOOP`, `WHILE`, and `FOR`.
- `IF` and `CASE` allow business decisions, while loops support repeated processing.
- `EXIT` stops a loop, and `CONTINUE` skips to the next iteration.
- `FOR` loops can iterate over ranges or query results.
- Whenever possible, prefer set-based SQL over row-by-row loops for better performance.

---

# Coming Up Next

## Section 40.6

# Function Parameters

You'll learn:

- `IN`
- `OUT`
- `INOUT`
- `DEFAULT`
- Named arguments
- Enterprise parameter design.


# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.6
# Function Parameters
# ==========================================================

# Introduction

Functions

become

powerful

when

they

can

accept

different

inputs.

Instead

of creating

many

functions,

we write

one

reusable

function

that

works

with

different

parameter

values.

PostgreSQL

supports

four

parameter

modes.

- `IN`

- `OUT`

- `INOUT`

- `DEFAULT`

These

allow

functions

to receive,

return,

and

modify

data

in

different

ways.

---

# What Are

Function

Parameters?

Parameters

are

values

passed

to

a function

when

it

is called.

Conceptually

```text
Input

↓

Function

↓

Output
```

Example

```text
500

↓

calculate_tax()

↓

90
```

---

# IN

Parameters

`IN`

parameters

provide

input

to

the function.

This

is

the

default

parameter

mode.

Syntax

```sql
CREATE FUNCTION

function_name

(
    IN amount NUMERIC
)
```

The

keyword

`IN`

may

be omitted

because

it

is

the

default.

---

# Example

```sql
CREATE FUNCTION

square

(
    IN num INTEGER
)

RETURNS INTEGER

LANGUAGE plpgsql

AS

$$

BEGIN

    RETURN

    num * num;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT

square
(
9
);
```

Result

```text
81
```

---

# Multiple

IN

Parameters

```sql
CREATE FUNCTION

multiply

(
    a INTEGER,

    b INTEGER
)

RETURNS INTEGER

LANGUAGE plpgsql

AS

$$

BEGIN

    RETURN

    a * b;

END;

$$;
```

---

# OUT

Parameters

`OUT`

parameters

return

values

instead

of

using

an

explicit

`RETURN`

expression.

Syntax

```sql
CREATE FUNCTION

...

(
    OUT total NUMERIC
)
```

---

# Example

```sql
CREATE FUNCTION

get_bonus

(
    salary NUMERIC,

    OUT bonus NUMERIC
)

LANGUAGE plpgsql

AS

$$

BEGIN

    bonus := salary * 0.10;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT

get_bonus
(
50000
);
```

Result

```text
5000
```

The

`OUT`

parameter

is

returned

automatically.

---

# INOUT

Parameters

`INOUT`

parameters

act

as

both

input

and

output.

The

function

receives

the

parameter,

modifies

it,

and

returns

the

new

value.

---

# Example

```sql
CREATE FUNCTION

increase_value

(
    INOUT amount NUMERIC
)

LANGUAGE plpgsql

AS

$$

BEGIN

    amount := amount + 100;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT

increase_value
(
500
);
```

Result

```text
600
```

---

# DEFAULT

Parameters

Sometimes

a parameter

should

have

a default

value.

Syntax

```sql
parameter_name

data_type

DEFAULT value
```

---

# Example

```sql
CREATE FUNCTION

calculate_tax

(
    amount NUMERIC,

    tax_rate NUMERIC

    DEFAULT 0.18
)

RETURNS NUMERIC

LANGUAGE plpgsql

AS

$$

BEGIN

    RETURN

    amount * tax_rate;

END;

$$;
```

---

# Calling

With

Default

Value

```sql
SELECT

calculate_tax
(
1000
);
```

Result

```text
180
```

The

default

tax

rate

is

used.

---

# Calling

With

Custom

Value

```sql
SELECT

calculate_tax
(
1000,

0.12
);
```

Result

```text
120
```

---

# Named

Arguments

Arguments

may

also

be passed

using

their

parameter

names.

Syntax

```sql
SELECT

calculate_tax
(
amount => 1000,

tax_rate => 0.12
);
```

Named

arguments

improve

readability,

especially

for

functions

with

many

parameters.

---

# Mixing

Positional

And

Named

Arguments

Positional

arguments

must

come

before

named

arguments.

Example

```sql
SELECT

calculate_tax
(
1000,

tax_rate => 0.12
);
```

Avoid

placing

a positional

argument

after

a named

argument.

---

# Parameter

Flow

```text
Input

↓

IN

↓

Processing

↓

OUT

↓

Result
```

---

# Business

Example

Business asks

```
Calculate

Employee

Bonus.
```

Requirements

- Salary

Input

- Bonus

Percentage

Optional

- Return

Bonus

Amount

Solution

```text
Salary

↓

Bonus Rate

↓

Calculation

↓

Bonus
```

`DEFAULT`

allows

the

bonus

rate

to

be omitted

when

the

standard

rate

is

used.

---

# Combining

Parameter

Modes

```sql
CREATE FUNCTION

sample

(
    IN salary NUMERIC,

    IN bonus_rate NUMERIC,

    OUT bonus NUMERIC
)
```

This

receives

inputs

and

returns

the

calculated

bonus.

---

# Choosing

The

Right

Parameter

Mode

| Mode | Purpose |
|------|---------|
|`IN`|Receive input|
|`OUT`|Return output|
|`INOUT`|Receive and modify|
|`DEFAULT`|Provide optional values|

---

# Enterprise

Example

Business asks

```
Create

A Shipping

Calculator.
```

Inputs

```text
Weight

↓

Destination

↓

Optional

Express

Fee
```

Output

```text
Shipping

Cost
```

Using

`DEFAULT`

for

the

express

fee

keeps

the

function

simple

for

common

cases

while

allowing

customization.

---

# Business

Applications

Finance

```text
Interest

Calculation
```

---

Retail

```text
Discount

Calculation
```

---

Healthcare

```text
Insurance

Premium
```

---

Manufacturing

```text
Shipping

Cost
```

---

Education

```text
Grade

Calculation
```

---

# Think Like

A Backend

Developer

Suppose

Business asks

```
Calculate

Invoice

Amount.
```

Instead

of creating

multiple

functions

for

different

tax

rates,

shipping

charges,

or

discounts,

design

one

function

with

`DEFAULT`

parameters.

Applications

can

override

only

the

values

they

need,

making

the

API

simpler

and

more

maintainable.

---

# Performance

Considerations

Parameter

modes

have

minimal

performance

impact.

Choose

parameter

types

based

on

clarity

and

maintainability,

not

performance.

Using

`DEFAULT`

values

can

reduce

the

need

for

multiple

overloaded

functions,

simplifying

maintenance.

---

# Best Practices

✅ Use `IN` for input values.

✅ Use `OUT` when returning multiple values naturally.

✅ Use `INOUT` only when both input and output behavior is required.

✅ Use `DEFAULT` for optional parameters.

✅ Choose meaningful parameter names.

---

# Common Mistakes

❌ Using `INOUT` when `IN` is sufficient.

❌ Creating multiple functions instead of using `DEFAULT` values.

❌ Using unclear parameter names.

❌ Mixing named and positional arguments incorrectly.

❌ Forgetting that `IN` is the default parameter mode.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a function

that

accepts

two

`IN`

parameters

and

returns

their

sum.

---

## Exercise 2

Create

a function

using

an

`OUT`

parameter

to

return

a

10%

discount.

---

## Exercise 3

Create

a function

using

an

`INOUT`

parameter

to

increase

a value

by

50.

---

## Exercise 4

Create

a function

with

a

`DEFAULT`

tax

rate.

---

## Exercise 5

Call

a function

using

named

arguments.

---

# Interview Questions

## Beginner

1. What is the default parameter mode in PostgreSQL?

2. What is an `OUT` parameter?

3. Why are `DEFAULT` parameters useful?

---

## Intermediate

1. Compare `IN`, `OUT`, and `INOUT` parameters.

2. When should named arguments be used?

3. Can positional and named arguments be mixed?

---

## Senior

1. Design a reusable pricing function using `DEFAULT` parameters.

2. Explain how parameter modes improve function flexibility.

3. Discuss API design considerations when creating enterprise database functions.

---

# Section Summary

In this section,

you learned:

- PostgreSQL supports `IN`, `OUT`, `INOUT`, and `DEFAULT` parameter modes.
- `IN` receives input, `OUT` returns output, and `INOUT` both receives and returns a value.
- `DEFAULT` parameters make functions flexible by allowing optional arguments.
- Named arguments improve readability, especially for functions with many parameters.
- Well-designed parameter lists make database functions easier to reuse and maintain.

---

# Coming Up Next

## Section 40.7

# Returning Values

You'll learn:

- Returning scalar values.
- Returning tables.
- Returning records.
- `SETOF`.
- `RETURNS TABLE`.
- Enterprise result patterns.


# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.7
# Returning Values
# ==========================================================

# Introduction

Every

PostgreSQL

function

returns

something.

Sometimes

it

returns

a

single

value.

Sometimes

it

returns

an

entire

row.

Sometimes

it

returns

multiple

rows.

PostgreSQL

supports

several

ways

to

return

data,

allowing

functions

to

solve

many

different

business

requirements.

---

# Types

Of

Return

Values

Functions

can

return

- Scalar

Value

- Record

- Table

- `SETOF`

Rows

Each

return

type

serves

a

different

purpose.

---

# Returning

A

Scalar

Value

A

scalar

is

a

single

value.

Examples

```text
10

100

'John'

TRUE

99.5
```

---

# Example

```sql
CREATE FUNCTION

square

(
    num INTEGER
)

RETURNS INTEGER

LANGUAGE plpgsql

AS

$$

BEGIN

    RETURN

    num * num;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT

square
(
8
);
```

Result

```text
64
```

---

# Returning

Text

```sql
CREATE FUNCTION

greet

(
    username TEXT
)

RETURNS TEXT

LANGUAGE plpgsql

AS

$$

BEGIN

    RETURN

    'Welcome '

    ||

    username;

END;

$$;
```

---

# Returning

A

Record

Sometimes

Business

needs

multiple

related

values.

Instead

of

returning

one

column,

return

an

entire

record.

Example

```text
Employee

↓

ID

Name

Salary
```

---

# Example

```sql
CREATE FUNCTION

get_employee

(
    emp_id INTEGER
)

RETURNS employees

LANGUAGE plpgsql

AS

$$

DECLARE

emp employees%ROWTYPE;

BEGIN

SELECT *

INTO emp

FROM employees

WHERE employee_id = emp_id;

RETURN emp;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT *

FROM

get_employee
(
1
);
```

Result

```text
Entire

Employee

Row
```

---

# RETURNS

TABLE

Sometimes

a function

should

return

multiple

columns

without

returning

an

existing

table

type.

Syntax

```sql
RETURNS TABLE
(
    column_name data_type,

    ...
)
```

---

# Example

```sql
CREATE FUNCTION

employee_summary()

RETURNS TABLE
(
    employee_name TEXT,

    salary NUMERIC
)

LANGUAGE plpgsql

AS

$$

BEGIN

RETURN QUERY

SELECT

employee_name,

salary

FROM employees;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT *

FROM employee_summary();
```

Result

| Employee | Salary |
|----------|--------:|
|John|50000|
|Alice|70000|

---

# RETURN

QUERY

Notice

the

statement

```sql
RETURN QUERY
```

Instead

of

returning

one

value,

it

returns

the

result

of

an

entire

query.

---

# SETOF

`SETOF`

returns

multiple

rows

of

the

same

type.

Example

```sql
CREATE FUNCTION

high_salary()

RETURNS SETOF employees

LANGUAGE plpgsql

AS

$$

BEGIN

RETURN QUERY

SELECT *

FROM employees

WHERE salary > 100000;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT *

FROM high_salary();
```

Result

```text
All

Employees

With

Salary

>

100000
```

---

# RETURNS

TABLE

Vs

SETOF

| RETURNS TABLE | SETOF |
|---------------|-------|
|Custom Columns|Existing Row Type|
|Flexible Output|Returns Table Rows|
|Define Columns|Uses Existing Structure|

---

# Returning

No

Value

Some

functions

perform

actions

without

returning

useful

data.

They

can

return

`VOID`.

Example

```sql
CREATE FUNCTION

log_message()

RETURNS VOID

LANGUAGE plpgsql

AS

$$

BEGIN

    RAISE NOTICE

    'Log Entry';

END;

$$;
```

---

# Calling

VOID

Functions

```sql
SELECT

log_message();
```

The

function

runs,

but

no

meaningful

value

is

returned.

---

# Choosing

The

Right

Return

Type

```text
Single

Value

↓

Scalar
```

---

```text
One

Row

↓

Record
```

---

```text
Many

Rows

↓

SETOF
```

---

```text
Custom

Columns

↓

RETURNS TABLE
```

---

# Business

Example

Business asks

```
Display

Top

10

Customers.
```

A

`SETOF`

or

`RETURNS TABLE`

function

can

return

all

matching

customers

instead

of

a

single

value.

---

# Enterprise

Example

Business asks

```
Create

An

Employee

Directory

API.
```

Instead

of

allowing

applications

to

query

multiple

tables,

create

a

`RETURNS TABLE`

function

that

returns

only

the

required

columns.

Applications

receive

a

stable,

well-defined

result

set.

---

# Execution

Flow

```text
Call

Function

↓

Processing

↓

RETURN

or

RETURN QUERY

↓

Result
```

---

# Business

Applications

Finance

```text
Account

Summaries
```

---

Retail

```text
Product

Catalogs
```

---

Healthcare

```text
Patient

Lists
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

Directories
```

---

# Think Like

A Backend

Developer

Suppose

Business asks

```
Return

Customer

Details

To

A

REST

API.
```

If

only

one

customer

is

required,

return

a

single

record.

If

multiple

customers

match

the

request,

return

`SETOF`

or

`RETURNS TABLE`

to

provide

a

structured

result

set

that

the

application

can

consume

directly.

---

# Performance

Considerations

Choose

the

smallest

return

type

that

meets

the

business

requirement.

Avoid

returning

entire

rows

when

only

a

few

columns

are

needed.

`RETURNS TABLE`

can

help

limit

data

transfer

by

returning

only

the

required

columns.

---

# Best Practices

✅ Return only the required data.

✅ Use scalar returns for calculations.

✅ Use `RETURNS TABLE` for custom result sets.

✅ Use `SETOF` for collections of rows.

✅ Keep return types stable for application compatibility.

---

# Common Mistakes

❌ Returning entire rows when only one column is needed.

❌ Choosing `SETOF` for a single result.

❌ Forgetting `RETURN QUERY` in table-returning functions.

❌ Returning inconsistent column types.

❌ Using `VOID` when a useful result should be returned.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a function

that

returns

the

cube

of

a number.

---

## Exercise 2

Create

a function

that

returns

an

entire

employee

record.

---

## Exercise 3

Create

a

`RETURNS TABLE`

function

displaying

employee

names

and

salaries.

---

## Exercise 4

Create

a

`SETOF`

function

returning

all

employees

earning

more

than

₹75,000.

---

## Exercise 5

Create

a

`VOID`

function

that

writes

a

simple

log

message.

---

# Interview Questions

## Beginner

1. What is a scalar return value?

2. What is `RETURNS TABLE`?

3. What does `RETURN QUERY` do?

---

## Intermediate

1. Compare `RETURNS TABLE` and `SETOF`.

2. When should a function return `VOID`?

3. Why should functions return only the required columns?

---

## Senior

1. Design a reusable API function returning customer details using `RETURNS TABLE`.

2. Explain the trade-offs between returning table rows and custom result sets.

3. Discuss how return types affect application compatibility and maintainability.

---

# Section Summary

In this section,

you learned:

- PostgreSQL functions can return scalar values, records, tables, sets of rows, or `VOID`.
- `RETURN` returns a single value, while `RETURN QUERY` returns the result of a query.
- `RETURNS TABLE` defines custom output columns, whereas `SETOF` returns rows of an existing type.
- Selecting the appropriate return type improves clarity, efficiency, and API design.
- Returning only the required data reduces unnecessary data transfer and simplifies application development.

---

# Coming Up Next

## Section 40.8

# Exception Handling

You'll learn:

- `EXCEPTION`
- `WHEN`
- Handling runtime errors
- Custom error messages
- `RAISE`
- Enterprise error-handling patterns.

# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.8
# Exception Handling
# ==========================================================

# Introduction

No

matter

how

carefully

we write

functions,

errors

can

still

occur.

Examples

include

- Division

By Zero

- Duplicate

Primary

Keys

- Missing

Rows

- Invalid

Data

- Constraint

Violations

- Permission

Errors

Instead

of allowing

the function

to fail

unexpectedly,

PL/pgSQL

allows

us

to

handle

errors

gracefully.

---

# What Is

Exception

Handling?

Exception

handling

allows

a function

to

detect

runtime

errors

and

execute

alternative

logic.

Conceptually

```text
Normal

Execution

↓

Error?

↓

No

↓

Continue
```

---

```text
Normal

Execution

↓

Error?

↓

Yes

↓

EXCEPTION

Block
```

---

# Basic

Syntax

```sql
BEGIN

    statements;

EXCEPTION

    WHEN condition THEN

        statements;

END;
```

The

`EXCEPTION`

block

executes

only

when

an

error

occurs.

---

# First

Example

```sql
CREATE FUNCTION

safe_divide()

RETURNS NUMERIC

LANGUAGE plpgsql

AS

$$

BEGIN

    RETURN

    10 / 0;

EXCEPTION

    WHEN division_by_zero THEN

        RETURN NULL;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT

safe_divide();
```

Result

```text
NULL
```

Instead

of

terminating

with

an

error,

the

function

returns

`NULL`.

---

# Common

Exception

Types

| Exception | Meaning |
|-----------|---------|
|`division_by_zero`|Division by zero|
|`unique_violation`|Duplicate unique value|
|`foreign_key_violation`|Foreign key constraint failed|
|`not_null_violation`|NULL inserted into NOT NULL column|
|`check_violation`|CHECK constraint failed|
|`too_many_rows`|Query returned more than one row|
|`no_data_found`|Expected row not found|

---

# Handling

Duplicate

Values

Business asks

```
Insert

Customer.
```

```sql
BEGIN

INSERT INTO customers

VALUES (...);

EXCEPTION

WHEN unique_violation THEN

RETURN

'Customer Already Exists';

END;
```

Instead

of

displaying

a database

error,

the function

returns

a

business-friendly

message.

---

# Handling

Missing

Rows

Suppose

Business asks

```
Find

Employee.
```

```sql
BEGIN

SELECT *

INTO emp

FROM employees

WHERE employee_id = 100;

EXCEPTION

WHEN no_data_found THEN

RETURN NULL;

END;
```

---

# Multiple

Exceptions

```sql
BEGIN

...

EXCEPTION

WHEN

division_by_zero

THEN

...

WHEN

unique_violation

THEN

...

WHEN

others

THEN

...

END;
```

Different

errors

can

be handled

independently.

---

# WHEN

OTHERS

`WHEN OTHERS`

handles

any

exception

not

matched

earlier.

Example

```sql
EXCEPTION

WHEN OTHERS THEN

RETURN

'Unexpected Error';
```

It

should

generally

appear

last,

after

more

specific

handlers.

---

# RAISE

Statement

Use

`RAISE`

to

display

messages

or

generate

errors.

Example

```sql
RAISE NOTICE

'Processing Complete';
```

---

# RAISE

NOTICE

```sql
RAISE NOTICE

'Employee ID: %',

employee_id;
```

Output

```text
NOTICE

Employee ID: 10
```

Useful

for

debugging.

---

# RAISE

EXCEPTION

Sometimes

Business

rules

must

stop

execution.

```sql
IF salary < 0 THEN

RAISE EXCEPTION

'Salary Cannot Be Negative';

END IF;
```

The

function

terminates

immediately

with

the

specified

error.

---

# Custom

Business

Validation

Business asks

```
Age

Cannot

Be

Negative.
```

```sql
IF age < 0 THEN

RAISE EXCEPTION

'Invalid Age';

END IF;
```

Applications

receive

a

clear,

meaningful

error

instead

of

continuing

with

invalid

data.

---

# SQLSTATE

PostgreSQL

associates

every

error

with

a

five-character

SQLSTATE

code.

Example

```sql
RAISE EXCEPTION

USING

ERRCODE = '22012',

MESSAGE = 'Division By Zero';
```

Using

standard

error

codes

can

help

applications

handle

errors

consistently.

---

# Execution

Flow

```text
BEGIN

↓

Statements

↓

Error?

↓

No

↓

RETURN
```

---

```text
BEGIN

↓

Statements

↓

Error?

↓

Yes

↓

EXCEPTION

↓

Recovery
```

---

# Business

Example

Business asks

```
Transfer

Money

Between

Accounts.
```

Workflow

```text
Debit

↓

Credit

↓

Error?

↓

Rollback

↓

Display

Message
```

Proper

exception

handling

helps

prevent

inconsistent

business

operations.

---

# Logging

Errors

Instead

of

ignoring

errors,

many

enterprise

systems

record

them.

Example

```text
Function

↓

Error

↓

Log Table

↓

Administrator
```

This

makes

troubleshooting

much

easier.

---

# Business

Applications

Finance

```text
Payment

Validation
```

---

Retail

```text
Order

Processing
```

---

Healthcare

```text
Patient

Registration
```

---

Manufacturing

```text
Inventory

Validation
```

---

Education

```text
Enrollment

Checks
```

---

# Think Like

A Backend

Developer

Suppose

Business asks

```
Register

A

New

Customer.
```

If

the

email

already

exists,

do

not

allow

the

database

to

return

a

technical

constraint

error.

Catch

the

`unique_violation`

exception

and

return

a

clear

business

message

such

as

```
Email

Already

Registered.
```

This

provides

a

better

user

experience

and

simplifies

application

error

handling.

---

# Performance

Considerations

Exception

handling

should

be

used

for

unexpected

or

exceptional

situations,

not

as

a

replacement

for

normal

control

flow.

Whenever

possible,

validate

input

before

an

error

occurs,

reducing

the

need

for

exceptions.

---

# Best Practices

✅ Handle expected database errors gracefully.

✅ Catch specific exceptions before `WHEN OTHERS`.

✅ Use `RAISE NOTICE` for debugging.

✅ Use `RAISE EXCEPTION` for business-rule violations.

✅ Log important errors for troubleshooting.

---

# Common Mistakes

❌ Catching every error with `WHEN OTHERS` without investigation.

❌ Using exceptions for ordinary program logic.

❌ Ignoring database constraint violations.

❌ Returning vague error messages.

❌ Forgetting to log important failures.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a function

that

handles

`division_by_zero`.

---

## Exercise 2

Catch

a

`unique_violation`

when

inserting

a customer.

---

## Exercise 3

Raise

a custom

exception

if

salary

is

negative.

---

## Exercise 4

Display

a debugging

message

using

`RAISE NOTICE`.

---

## Exercise 5

Create

a function

that

logs

errors

before

returning

a

business-friendly

message.

---

# Interview Questions

## Beginner

1. What is exception handling?

2. What is the purpose of the `EXCEPTION` block?

3. What does `RAISE NOTICE` do?

---

## Intermediate

1. Explain the difference between `RAISE NOTICE` and `RAISE EXCEPTION`.

2. Why should specific exceptions be handled before `WHEN OTHERS`?

3. What is `unique_violation`?

---

## Senior

1. Design a robust order-processing function with proper exception handling.

2. Explain how database exceptions improve data integrity.

3. Discuss error logging strategies for enterprise PostgreSQL applications.

---

# Section Summary

In this section,

you learned:

- PL/pgSQL uses `EXCEPTION` blocks to handle runtime errors.
- Specific exceptions such as `division_by_zero` and `unique_violation` can be handled individually.
- `RAISE NOTICE` displays informational messages, while `RAISE EXCEPTION` stops execution with a custom error.
- Proper exception handling improves reliability, user experience, and data integrity.
- Enterprise applications often combine exception handling with logging for easier troubleshooting.

---

# Coming Up Next

## Section 40.9

# Creating Stored Procedures

You'll learn:

- `CREATE PROCEDURE`
- `CALL`
- Multi-step transactions
- Input and output parameters
- Business workflow automation
- Enterprise procedure design.

# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.9
# Creating Stored Procedures
# ==========================================================

# Introduction

In

the previous

sections,

you learned

how

functions

return

values.

However,

many

enterprise

operations

are

not

simple

calculations.

Instead,

they perform

multiple

database

operations

as

one

business

process.

Examples

include

- Order Processing

- Payroll

- Inventory Updates

- Bank Transfers

- Invoice Generation

These

operations

are

typically

implemented

using

Stored

Procedures.

---

# What Is

A Stored

Procedure?

A

Stored

Procedure

is

a reusable

database

program

that

executes

one

or more

SQL

statements.

Unlike

functions,

procedures

are

primarily

designed

for

performing

actions,

not

for

being

used

inside

SQL

expressions.

---

# Basic

Syntax

```sql
CREATE PROCEDURE

procedure_name
(
    parameters
)

LANGUAGE plpgsql

AS

$$

BEGIN

    statements;

END;

$$;
```

Unlike

functions,

procedures

do

not

use

a

`RETURNS`

clause.

---

# Calling

A Procedure

Procedures

are

executed

using

`CALL`.

```sql
CALL

procedure_name();
```

Unlike

functions,

they

cannot

be called

using

`SELECT`.

---

# First

Procedure

Business asks

```
Display

Processing

Message.
```

```sql
CREATE PROCEDURE

show_message()

LANGUAGE plpgsql

AS

$$

BEGIN

    RAISE NOTICE

    'Processing Complete';

END;

$$;
```

---

# Calling

The

Procedure

```sql
CALL

show_message();
```

Output

```text
NOTICE

Processing Complete
```

---

# Procedure

With

Input

Parameters

Business asks

```
Insert

A

Department.
```

```sql
CREATE PROCEDURE

add_department
(
    dept_name TEXT
)

LANGUAGE plpgsql

AS

$$

BEGIN

    INSERT INTO departments
    (
        department_name
    )

    VALUES
    (
        dept_name
    );

END;

$$;
```

---

# Calling

The

Procedure

```sql
CALL

add_department
(
'Finance'
);
```

A

new

department

is

inserted.

---

# Procedure

With

Multiple

Statements

```sql
CREATE PROCEDURE

update_salary
(
    emp_id INTEGER,

    increase NUMERIC
)

LANGUAGE plpgsql

AS

$$

BEGIN

    UPDATE employees

    SET

    salary = salary + increase

    WHERE employee_id = emp_id;

    INSERT INTO salary_log
    (
        employee_id,

        increase_amount
    )

    VALUES
    (
        emp_id,

        increase
    );

END;

$$;
```

One

procedure

updates

salary

and

creates

an

audit

record.

---

# Procedure

Execution

Flow

```text
CALL

↓

Validation

↓

SQL Statement

↓

SQL Statement

↓

SQL Statement

↓

Finish
```

Multiple

operations

execute

as

one

business

workflow.

---

# OUT

Parameters

Procedures

can

return

values

using

`OUT`

parameters.

Example

```sql
CREATE PROCEDURE

calculate_bonus
(
    IN salary NUMERIC,

    OUT bonus NUMERIC
)

LANGUAGE plpgsql

AS

$$

BEGIN

    bonus := salary * 0.10;

END;

$$;
```

---

# Calling

Procedures

With

OUT

Parameters

```sql
CALL

calculate_bonus
(
50000,

NULL
);
```

The

second

argument

receives

the

calculated

bonus.

---

# Transaction

Control

One

major

advantage

of

procedures

is

that

they

can

manage

transactions.

Example

```sql
COMMIT;

ROLLBACK;
```

Functions

cannot

issue

transaction

control

commands.

Procedures

can,

subject

to

how

they

are

invoked

and

the

current

transaction

context.

---

# Business

Example

Order

Processing

Business asks

```
Place

Order.
```

Procedure

workflow

```text
Validate

Customer

↓

Check

Inventory

↓

Create

Order

↓

Reduce

Stock

↓

Generate

Invoice

↓

Commit
```

One

procedure

performs

the

entire

business

process.

---

# Procedure

Vs

Function

| Feature | Function | Procedure |
|---------|----------|-----------|
|Called Using|`SELECT`|`CALL`|
|Returns Value|Yes|Optional (`OUT`)|
|Used In SQL Expressions|Yes|No|
|Transaction Control|No|Yes*|
|Primary Purpose|Calculation|Business Process|

\*Transaction

control

depends

on

the

transaction

context

in

which

the

procedure

is

executed.

---

# Nested

Procedure

Calls

One

procedure

may

call

another.

Example

```text
Create

Order

↓

Update

Inventory

↓

Generate

Invoice

↓

Send

Notification
```

Breaking

large

workflows

into

smaller

procedures

improves

maintainability.

---

# Enterprise

Architecture

```text
Application

↓

CALL

Procedure

↓

Business

Logic

↓

Tables
```

Applications

perform

one

database

call,

while

the

database

handles

the

complete

workflow.

---

# Business

Applications

Finance

```text
Payment

Processing
```

---

Retail

```text
Order

Management
```

---

Healthcare

```text
Patient

Admission
```

---

Manufacturing

```text
Inventory

Updates
```

---

Education

```text
Student

Enrollment
```

---

# Think Like

A Backend

Developer

Suppose

Business asks

```
Register

A

New

Employee.
```

Instead

of

sending

multiple

SQL

statements

from

the

application,

create

one

procedure

that

validates

the

employee,

inserts

the

record,

creates

default

permissions,

writes

an

audit

entry,

and

commits

the

transaction.

The

application

needs

only

one

`CALL`

statement.

---

# Performance

Considerations

Stored

procedures

can

reduce

network

round

trips

by

executing

multiple

operations

inside

the

database.

However,

very

large

procedures

can

become

difficult

to

maintain.

Keep

procedures

focused

on

a

single

business

workflow

and

split

complex

logic

into

smaller,

reusable

procedures

when

appropriate.

---

# Best Practices

✅ Use procedures for business workflows.

✅ Keep procedures focused on one business process.

✅ Use meaningful parameter names.

✅ Validate input before modifying data.

✅ Create audit records for important operations.

---

# Common Mistakes

❌ Using procedures for simple calculations.

❌ Calling procedures with `SELECT`.

❌ Writing extremely large procedures.

❌ Ignoring transaction boundaries.

❌ Mixing unrelated business processes in one procedure.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a procedure

that

inserts

a

new

department.

---

## Exercise 2

Create

a procedure

that

updates

an

employee's

salary.

---

## Exercise 3

Create

a procedure

that

updates

inventory

and

writes

to

an

audit

table.

---

## Exercise 4

Create

a procedure

using

an

`OUT`

parameter

to

calculate

a

bonus.

---

## Exercise 5

Design

an

order-processing

procedure

containing

multiple

database

operations.

---

# Interview Questions

## Beginner

1. What is a stored procedure?

2. How do you execute a procedure?

3. Why doesn't a procedure use `RETURNS`?

---

## Intermediate

1. When should you choose a procedure instead of a function?

2. Why are procedures useful for business workflows?

3. What is the purpose of `CALL`?

---

## Senior

1. Design a production-ready order-processing procedure.

2. Explain transaction management inside PostgreSQL procedures.

3. Discuss how stored procedures improve maintainability in enterprise applications.

---

# Section Summary

In this section,

you learned:

- Stored procedures execute multi-step business workflows inside PostgreSQL.
- Procedures are created with `CREATE PROCEDURE` and executed using `CALL`.
- Unlike functions, procedures do not use a `RETURNS` clause and are not used inside SQL expressions.
- Procedures can coordinate multiple SQL statements and, under appropriate transaction contexts, manage transactions.
- Well-designed procedures centralize business logic and reduce application complexity.

---

# Coming Up Next

## Section 40.10

# Functions vs Procedures

You'll learn:

- Key differences.
- When to choose each.
- Performance considerations.
- Enterprise design decisions.
- Common interview questions.

# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.10
# Functions vs Procedures
# ==========================================================

# Introduction

Functions

and

Stored

Procedures

are

both

reusable

database

objects,

but

they

are

designed

for

different

purposes.

Choosing

the

correct

one

improves

maintainability,

performance,

and

application

design.

Understanding

their

differences

is

also

a

very

common

PostgreSQL

interview

topic.

---

# Similarities

Both

Functions

and

Procedures

can

- Accept

Parameters

- Execute

SQL

Statements

- Use

PL/pgSQL

- Contain

Variables

- Use

Conditions

- Use

Loops

- Handle

Exceptions

- Be

Reused

Across

Applications

---

# Primary

Difference

Functions

exist

to

compute

and

return

values.

Procedures

exist

to

perform

business

operations.

Think

of

them

as

```text
Function

↓

Calculation
```

---

```text
Procedure

↓

Workflow
```

---

# Calling

Functions

Functions

are

called

using

```sql
SELECT

function_name();
```

Example

```sql
SELECT

calculate_tax
(
1000
);
```

The

function

returns

a

value

that

can

be

used

inside

SQL.

---

# Calling

Procedures

Procedures

are

called

using

```sql
CALL

procedure_name();
```

Example

```sql
CALL

process_order
(
1001
);
```

The

procedure

executes

its

business

workflow.

---

# Functions

Inside

Queries

Functions

can

appear

inside

ordinary

SQL

statements.

Example

```sql
SELECT

employee_name,

calculate_bonus
(
salary
)

FROM employees;
```

Each

row

calls

the

function.

---

# Procedures

Cannot

Appear

Inside

Queries

Invalid

Example

```sql
SELECT

process_order();
```

Procedures

cannot

be

used

inside

SQL

expressions

or

queries.

---

# Return

Values

Functions

always

have

a

declared

return

type.

Examples

```text
INTEGER

TEXT

NUMERIC

BOOLEAN

TABLE

SETOF
```

---

Procedures

do

not

have

a

`RETURNS`

clause.

If

they

need

to

return

data,

they

typically

use

`OUT`

or

`INOUT`

parameters.

---

# Transaction

Control

Functions

cannot

execute

transaction

control

statements

such

as

```sql
COMMIT;

ROLLBACK;
```

---

Procedures

may

manage

transactions,

depending

on

how

they

are

called

and

their

transaction

context.

---

# Business

Examples

Function

```text
Calculate

GST
```

↓

Returns

Tax

Amount

---

Procedure

```text
Place

Order

↓

Validate

↓

Reduce

Inventory

↓

Generate

Invoice

↓

Commit
```

---

# Feature

Comparison

| Feature | Function | Procedure |
|---------|----------|-----------|
|Created Using|`CREATE FUNCTION`|`CREATE PROCEDURE`|
|Executed Using|`SELECT`|`CALL`|
|Returns Value|Always|Optional (`OUT`)|
|Used In SQL Expressions|✅ Yes|❌ No|
|Transaction Control|❌ No|✅ Yes*|
|Purpose|Calculation|Workflow|
|Can Return Tables|✅ Yes|No (`RETURNS TABLE` not supported)|

\*Subject

to

transaction

context.

---

# Decision

Flow

```text
Need

A

Calculation?

↓

Function
```

---

```text
Need

A

Business

Workflow?

↓

Procedure
```

---

# Real

Business

Scenario

Business asks

```
Calculate

Invoice

Total.
```

Choose

```text
Function
```

because

the

result

is

a

calculation.

---

Business asks

```
Create

Invoice.
```

Choose

```text
Procedure
```

because

multiple

database

operations

must

be

performed.

---

# Combining

Functions

And

Procedures

Large

applications

often

use

both.

Example

```text
Procedure

↓

Calls

Function

↓

Calculation

↓

Continue

Workflow
```

A

procedure

may

call

one

or

more

functions

to

perform

reusable

calculations.

---

# Enterprise

Architecture

```text
Application

↓

Procedure

↓

Function

↓

Tables
```

The

procedure

orchestrates

the

workflow,

while

functions

perform

individual

calculations.

---

# Business

Applications

Finance

```text
Interest

Calculation

↓

Function
```

```text
Payment

Processing

↓

Procedure
```

---

Retail

```text
Discount

Calculation

↓

Function
```

```text
Order

Fulfillment

↓

Procedure
```

---

Healthcare

```text
BMI

Calculation

↓

Function
```

```text
Patient

Admission

↓

Procedure
```

---

Manufacturing

```text
Cost

Calculation

↓

Function
```

```text
Production

Scheduling

↓

Procedure
```

---

Education

```text
Grade

Calculation

↓

Function
```

```text
Student

Enrollment

↓

Procedure
```

---

# Think Like

A Backend

Developer

Suppose

Business asks

```
Create

A

Checkout

System.
```

Design

it

using

both

database

objects.

Use

functions

to

calculate

tax,

discount,

shipping,

and

totals.

Use

a

procedure

to

validate

inventory,

create

the

order,

update

stock,

generate

the

invoice,

and

record

audit

entries.

This

separation

keeps

the

system

modular

and

easy

to

maintain.

---

# Performance

Considerations

Functions

are

often

better

for

small,

reusable

calculations

that

can

be

embedded

inside

queries.

Procedures

reduce

network

round

trips

by

grouping

multiple

operations

into

one

database

call.

Choose

the

database

object

that

best

matches

the

business

requirement,

rather

than

trying

to

use

one

for

every

task.

---

# Best Practices

✅ Use functions for reusable calculations.

✅ Use procedures for business workflows.

✅ Keep calculations separate from workflow orchestration.

✅ Keep functions small and deterministic where possible.

✅ Keep procedures focused on one business process.

---

# Common Mistakes

❌ Using procedures inside `SELECT` statements.

❌ Writing business workflows as functions.

❌ Creating procedures for simple calculations.

❌ Mixing unrelated responsibilities.

❌ Forgetting that procedures are executed with `CALL`.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a function

that

calculates

GST.

---

## Exercise 2

Create

a procedure

that

creates

a

new

order.

---

## Exercise 3

Modify

the

procedure

to

call

the

GST

function.

---

## Exercise 4

List

five

business

tasks

best

suited

to

functions

and

five

best

suited

to

procedures.

---

## Exercise 5

Draw

an

architecture

showing

an

application

calling

a

procedure

that

internally

uses

multiple

functions.

---

# Interview Questions

## Beginner

1. What is the primary difference between a function and a procedure?

2. How are functions executed?

3. How are procedures executed?

---

## Intermediate

1. When should you use a function instead of a procedure?

2. Why can't procedures be used inside `SELECT` statements?

3. Can a procedure call a function?

---

## Senior

1. Design an enterprise checkout system using both functions and procedures.

2. Explain how transaction management differs between functions and procedures.

3. Discuss architectural benefits of separating calculations from workflows.

---

# Section Summary

In this section,

you learned:

- Functions return values and are designed for reusable calculations.
- Procedures execute multi-step business workflows and are called using `CALL`.
- Functions can be used inside SQL queries, while procedures cannot.
- Procedures may coordinate transactions and orchestrate complex operations.
- Enterprise systems commonly combine procedures for workflows with functions for reusable business calculations.

---

# Coming Up Next

## Section 40.11

# Dynamic SQL

You'll learn:

- `EXECUTE`
- `format()`
- Dynamic queries
- Dynamic table names
- Dynamic filtering
- SQL injection prevention
- Enterprise use cases.
# ==========================================================
# Chapter 40
# PostgreSQL Stored Procedures, Functions & Triggers
# Section 40.11
# Dynamic SQL
# ==========================================================

# Introduction

Most

SQL

queries

are

written

before

the

application

runs.

Example

```sql
SELECT *

FROM employees

WHERE department_id = 10;
```

The

table

name,

column

names,

and

conditions

are

fixed.

However,

some

business

requirements

are

not

known

until

runtime.

Examples

include

- User-selected

Tables

- Dynamic

Sorting

- Optional

Filters

- Dynamic

Columns

- Administrative

Utilities

For

these

situations,

PostgreSQL

provides

Dynamic

SQL.

---

# What Is

Dynamic

SQL?

Dynamic

SQL

is

SQL

that

is

constructed

and

executed

at

runtime.

Instead

of

writing

the

entire

query

beforehand,

the

function

builds

the

query

as

a

string

and

executes

it.

Conceptually

```text
User Input

↓

Build SQL

↓

EXECUTE

↓

Result
```

---

# EXECUTE

Statement

The

`EXECUTE`

statement

runs

a

SQL

string.

Syntax

```sql
EXECUTE

query_string;
```

Example

```sql
EXECUTE

'SELECT COUNT(*)

FROM employees';
```

---

# Building

A Query

```sql
DECLARE

sql_query TEXT;

BEGIN

sql_query :=

'SELECT *

FROM employees';

EXECUTE sql_query;

END;
```

The

query

is

stored

inside

a

variable

before

execution.

---

# Dynamic

Table

Names

Business asks

```
Display

Data

From

Any

Table.
```

```sql
CREATE FUNCTION

count_rows

(
    table_name TEXT
)

RETURNS BIGINT

LANGUAGE plpgsql

AS

$$

DECLARE

total BIGINT;

BEGIN

EXECUTE

format
(
'SELECT COUNT(*)

FROM %I',

table_name
)

INTO total;

RETURN total;

END;

$$;
```

---

# Calling

The

Function

```sql
SELECT

count_rows
(
'employees'
);
```

Result

```text
125
```

Example

value.

---

# Why

Use

format()?

Never

build

SQL

by

simple

string

concatenation

when

identifiers

or

literals

come

from

outside

the

function.

Bad

```sql
sql_query :=

'SELECT *

FROM '

||

table_name;
```

This

is

unsafe

and

error-prone.

---

# format()

Function

Syntax

```sql
format
(
format_string,

arguments
)
```

Example

```sql
format
(
'SELECT *

FROM %I',

table_name
);
```

---

# Common

Placeholders

| Placeholder | Purpose |
|-------------|---------|
|`%I`|Identifier (table, column, schema)|
|`%L`|Literal value|
|`%s`|Plain text substitution|

---

# %I

Identifier

Example

```sql
format
(
'SELECT *

FROM %I',

'employees'
);
```

Result

```sql
SELECT *

FROM employees;
```

`%I`

properly

quotes

identifiers

when

needed.

---

# %L

Literal

Example

```sql
format
(
'SELECT *

FROM employees

WHERE city = %L',

'Mumbai'
);
```

Result

```sql
SELECT *

FROM employees

WHERE city = 'Mumbai';
```

`%L`

properly

quotes

literal

values.

---

# EXECUTE

... INTO

Dynamic

queries

can

store

their

result

inside

variables.

Example

```sql
EXECUTE

format
(
'SELECT AVG(salary)

FROM %I',

table_name
)

INTO avg_salary;
```

---

# Dynamic

Filtering

Business asks

```
Search

Employees

By

Department.
```

```sql
EXECUTE

format
(
'SELECT *

FROM employees

WHERE department_id = %L',

dept_id
);
```

The

condition

is

built

at

runtime.

---

# USING

Clause

Instead

of

embedding

values

inside

the

SQL

string,

parameterize

them

using

`USING`.

Example

```sql
EXECUTE

'SELECT *

FROM employees

WHERE salary > $1'

USING

minimum_salary;
```

The

parameter

is

bound

safely

at

execution

time.

---

# Why

Use

USING?

Benefits

```text
Safer

↓

Cleaner

↓

Avoids

SQL

Injection
```

Whenever

only

the

values

change,

prefer

`USING`

instead

of

placing

the

values

directly

inside

the

SQL

string.

---

# SQL

Injection

Risk

Suppose

Business

accepts

a

table

name

from

a

user.

Unsafe

construction

may

allow

malicious

SQL

to

execute.

Always

use

- `format()`

with

`%I`

for

identifiers

- `USING`

or

`%L`

for

values

Never

concatenate

untrusted

input

directly

into

SQL

strings.

---

# Dynamic

ORDER BY

Business asks

```
Sort

Employees

By

A

Selected

Column.
```

```sql
EXECUTE

format
(
'SELECT *

FROM employees

ORDER BY %I',

column_name
);
```

The

column

is

chosen

at

runtime.

---

# Dynamic

Column

Selection

Business asks

```
Display

Only

The

Selected

Column.
```

```sql
EXECUTE

format
(
'SELECT %I

FROM employees',

column_name
);
```

Useful

for

administrative

tools

and

generic

reporting

utilities.

---

# Execution

Flow

```text
Input

↓

Build SQL

↓

format()

↓

EXECUTE

↓

Result
```

---

# Business

Example

Business asks

```
Build

A

Generic

Search

Tool.
```

Requirements

```text
Table

↓

Column

↓

Value

↓

Result
```

Dynamic

SQL

allows

one

function

to

search

different

tables

without

creating

separate

functions

for

each

table.

---

# Enterprise

Applications

Database

Administration

```text
Generic

Utilities
```

---

Reporting

```text
Dynamic

Reports
```

---

Analytics

```text
Flexible

Filtering
```

---

ETL

```text
Metadata-

Driven

Processing
```

---

Maintenance

```text
Dynamic

Maintenance

Scripts
```

---

# Think Like

A Backend

Developer

Suppose

Business asks

```
Build

An

Admin

Dashboard

That

Can

View

Any

Table.
```

Instead

of

writing

one

function

per

table,

create

a

single

dynamic

function

that

accepts

the

table

name,

validates

it,

builds

the

query

using

`format()`,

and

executes

it

safely.

This

reduces

duplicate

code

while

maintaining

security.

---

# Performance

Considerations

Dynamic

SQL

is

compiled

and

planned

at

runtime,

which

may

introduce

additional

planning

overhead

compared

to

static

SQL.

Use

dynamic

SQL

only

when

the

query

structure

must

change

at

runtime.

If

only

parameter

values

change,

prefer

static

SQL

with

parameters

or

`EXECUTE

...

USING`.

---

# Best Practices

✅ Use `format()` for dynamic SQL.

✅ Use `%I` for identifiers.

✅ Use `%L` or `USING` for values.

✅ Validate dynamic object names when possible.

✅ Keep dynamic SQL as simple as possible.

---

# Common Mistakes

❌ Building SQL using string concatenation.

❌ Embedding untrusted user input directly into SQL.

❌ Using `%s` for identifiers or literals.

❌ Using dynamic SQL when static SQL is sufficient.

❌ Forgetting to validate dynamic table or column names.

---

# PostgreSQL Practice Lab

## Exercise 1

Create

a function

that

counts

rows

for

a

table

name

provided

at

runtime.

---

## Exercise 2

Build

a

dynamic

`ORDER BY`

query

using

`format()`.

---

## Exercise 3

Rewrite

a

dynamic

query

using

`EXECUTE

...

USING`.

---

## Exercise 4

Create

a

generic

search

function

using

dynamic

filtering.

---

## Exercise 5

Compare

unsafe

string

concatenation

with

a

safe

`format()`

implementation.

---

# Interview Questions

## Beginner

1. What is dynamic SQL?

2. What does `EXECUTE` do?

3. Why is `format()` preferred over string concatenation?

---

## Intermediate

1. Explain the difference between `%I`, `%L`, and `%s`.

2. What is the purpose of the `USING` clause?

3. When should dynamic SQL be used?

---

## Senior

1. Design a secure metadata-driven reporting function using dynamic SQL.

2. Explain how PostgreSQL protects against SQL injection when using `format()` and `USING`.

3. Discuss the performance trade-offs between static SQL and dynamic SQL.

---

# Section Summary

In this section,

you learned:

- Dynamic SQL allows PostgreSQL to build and execute queries at runtime.
- `EXECUTE` runs SQL stored in a string.
- `format()` safely constructs dynamic SQL using placeholders such as `%I` and `%L`.
- The `USING` clause safely passes parameter values to dynamic queries.
- Dynamic SQL is powerful for administrative tools, generic reporting, and metadata-driven systems, but should be used only when query structure must change at runtime.

---

# Coming Up Next

## Section 40.12

# Cursors

You'll learn:

- What cursors are.
- Explicit vs implicit cursors.
- Opening, fetching, and closing cursors.
- Processing large result sets.
- Enterprise cursor patterns.