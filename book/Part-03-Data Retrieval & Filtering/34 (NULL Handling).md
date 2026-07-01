# ==========================================================
# Section 1
# What is NULL?
# ==========================================================

# Introduction

NULL is one of the most misunderstood concepts in SQL.

Many beginners believe NULL is simply another value stored inside a database.

It is not.

Others assume NULL means

- Zero
- Empty string
- Blank space
- False
- Missing record

All of these assumptions are incorrect.

Understanding NULL is essential because it affects almost every SQL statement you will ever write.

Whether you are filtering data, joining tables, calculating averages, writing ETL pipelines, or designing data warehouses, NULL influences the result.

In this section, we will build the correct mental model of NULL before learning how SQL handles it.

---

# Why Should You Learn NULL?

Imagine you are building software for:

- A bank
- A hospital
- An e-commerce company
- An airline
- A government agency

Will every piece of information always be available?

Of course not.

Examples include:

- Customer has not entered their phone number.
- Patient's blood group is not yet known.
- Product delivery date has not been assigned.
- Employee resignation date does not exist yet.
- Order has not been shipped.

A database must represent incomplete information.

That is the purpose of NULL.

---

# What is NULL?

NULL represents the **absence of a known value**.

Notice the wording carefully.

NULL does **not** mean that the value is zero.

NULL does **not** mean an empty string.

NULL does **not** mean "nothing."

Instead, NULL indicates that the database **does not currently know the value** or that the value is **not applicable** for that row.

A useful way to think about NULL is:

> "The value exists conceptually, but the database cannot provide it."

---

# Mental Model

Imagine a school admission form.

| Student | Phone Number |
|----------|--------------|
| Alice | 9876543210 |
| Bob | NULL |

Does Bob not have a phone?

Maybe.

Has Bob forgotten to enter it?

Maybe.

Has the school not collected it yet?

Maybe.

The database cannot distinguish between these possibilities.

It only knows one thing:

```
The value is unknown.
```

That unknown state is represented using NULL.

---

# Real-World Examples

## Banking

| Account | Closing Date |
|----------|--------------|
| A1001 | NULL |

The account is still active.

There is no closing date yet.

---

## Healthcare

| Patient | Blood Group |
|----------|-------------|
| John | NULL |

The blood group has not been recorded.

---

## Human Resources

| Employee | Resignation Date |
|-----------|------------------|
| Sarah | NULL |

Sarah is still employed.

---

## E-commerce

| Order | Delivery Date |
|--------|---------------|
| ORD-101 | NULL |

The order has not yet been delivered.

---

## Education

| Student | Graduation Date |
|----------|-----------------|
| Emma | NULL |

The student is still studying.

---

# Visual Representation

Instead of thinking

```
NULL

↓

Nothing
```

Think

```
NULL

↓

Unknown

or

Not Available

or

Not Yet Assigned

or

Not Applicable
```

---

# NULL Is a Marker, Not a Value

This is one of the most important ideas in SQL.

Suppose a table contains

| Salary |
|---------|
| 50000 |
| NULL |

Does the second employee earn ₹0?

No.

Does the employee earn nothing?

Unknown.

The database refuses to guess.

Instead, it stores NULL.

You should think of NULL as a **marker** indicating missing or unknown information, rather than as a normal data value.

---

# Why Databases Need NULL

Imagine storing employee information.

```text
Employee

↓

Joining Date

↓

Resignation Date
```

When a new employee joins,

there is no resignation date.

What should the database store?

```
0 ?

Empty String ?

1900-01-01 ?

9999-12-31 ?
```

All of these are fake values.

Instead,

SQL stores

```
NULL
```

This accurately communicates

> "No resignation date exists yet."

---

# A Practical Example

Consider the following table.

| Employee | Bonus |
|-----------|------:|
| Alice | 5000 |
| Bob | NULL |
| Charlie | 7000 |

Can we conclude that Bob received no bonus?

No.

Possible explanations include:

- Bonus has not been calculated.
- Bonus information has not been imported.
- Bonus is confidential.
- Bonus does not apply.

The database intentionally does not make assumptions.

---

# NULL Across Different Data Types

NULL can appear in almost every data type.

Examples

| Data Type | NULL Example |
|-----------|--------------|
| INTEGER | NULL |
| DECIMAL | NULL |
| VARCHAR | NULL |
| DATE | NULL |
| BOOLEAN | NULL |
| TIMESTAMP | NULL |

NULL is independent of the column's data type.

---

# Deep Dive

Internally,

the database does not store NULL as

```
0

''

FALSE
```

Most relational database systems maintain metadata that indicates whether a column contains a value or is NULL.

The exact storage implementation differs across database engines, but conceptually the database keeps track of whether a value is present.

As SQL users, what matters is the behavior, not the internal storage format.

---

# Common Misconceptions

## Misconception 1

NULL equals Zero.

❌ Incorrect.

Zero is a known numeric value.

NULL means the numeric value is unknown or missing.

---

## Misconception 2

NULL equals an empty string.

❌ Incorrect.

An empty string is a valid text value.

NULL indicates the absence of a known text value.

---

## Misconception 3

NULL equals FALSE.

❌ Incorrect.

FALSE is a Boolean value.

NULL means the Boolean value is unknown or missing.

---

## Misconception 4

NULL means the record is missing.

❌ Incorrect.

The row exists.

Only one or more column values are unknown.

---

# Enterprise Example

Suppose a customer table contains

| Customer | Email | Phone |
|-----------|-------|-------|
| Alice | alice@example.com | 9876543210 |
| Bob | NULL | 9123456789 |
| Charlie | charlie@example.com | NULL |

The customer records exist.

Only certain attributes are unknown.

This distinction becomes extremely important when filtering, joining, and validating data.

---

# Engineering Insight

As a Data Engineer, your goal is **not** to eliminate every NULL.

Some NULL values are expected and meaningful.

Instead, your responsibility is to understand:

- Why is the value NULL?
- Should it be NULL?
- Is it truly unknown?
- Is it missing because of a data quality issue?
- Should ETL replace it with a default?
- Should the business provide the missing value?

Good data engineering begins with asking these questions instead of blindly replacing NULL values.

---

# Best Practices

✅ Treat NULL as unknown information.

✅ Understand why the value is NULL before replacing it.

✅ Document business rules around nullable columns.

✅ Use appropriate constraints for mandatory fields.

---

# Common Mistakes

❌ Assuming NULL means zero.

❌ Replacing NULL with arbitrary default values without business approval.

❌ Treating NULL as an empty string.

❌ Ignoring why data is missing.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    phone_number VARCHAR(20),
    resignation_date DATE,
    bonus NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees
VALUES
(1,'Alice','9876543210',NULL,5000),

(2,'Bob',NULL,NULL,NULL),

(3,'Charlie','9988776655','2025-08-15',7000),

(4,'David',NULL,NULL,4500);
```

---

## Exercise 1

Identify all NULL values in the table.

---

## Exercise 2

Explain why each NULL might exist.

Do not write SQL.

Think from a business perspective.

---

## Exercise 3

Which NULL values are acceptable?

Which might indicate poor data quality?

Explain your reasoning.

---

# Interview Questions

## Beginner

1. What is NULL?
2. Is NULL equal to zero?
3. Is NULL equal to an empty string?
4. Can a date column contain NULL?

---

## Intermediate

1. Why do relational databases support NULL?
2. Give three real-world examples where NULL is appropriate.
3. Why is NULL considered different from a regular value?

---

## Senior

1. How would you distinguish between "unknown" and "not applicable" in a data model?
2. Should every nullable column remain nullable? Explain your approach.
3. How would you document the business meaning of NULL values in an enterprise data warehouse?

---

# Section Summary

In this section, you learned:

- NULL represents the absence of a known value.
- NULL is not zero, an empty string, FALSE, or a missing row.
- NULL exists because real-world data is often incomplete.
- Understanding the business meaning of NULL is just as important as understanding its SQL behavior.
- A Data Engineer should treat NULL as meaningful information rather than simply replacing it with default values.

In the next section, we will answer an even deeper question:

**Why was NULL introduced into relational databases in the first place, and what problems was it designed to solve?**


# ==========================================================
# Section 2
# Why NULL Exists
# ==========================================================

# Introduction

In the previous section, we learned that NULL represents the absence of a known value.

A natural question now arises:

> **Why do databases need NULL at all?**

Why couldn't database designers simply use

- Zero
- Empty string
- False
- Default dates

instead?

The answer lies in the fact that **real-world data is often incomplete, evolving, and uncertain**.

Relational databases were designed to model the real world.

Since the real world contains unknown information, databases must be able to represent it.

NULL was introduced to solve this problem.

---

# The Real World is Imperfect

Imagine you are designing a hospital database.

Every patient has

- Name
- Age
- Blood Group
- Insurance Number
- Emergency Contact

Will all of these values always be available?

No.

Examples:

- A new patient may not know their blood group.
- Insurance details may still be under verification.
- Emergency contact may not yet be collected.

The database still needs to store the patient.

Without NULL, this becomes difficult.

---

# The Problem Without NULL

Suppose NULL did not exist.

Consider the following table.

| Patient | Blood Group |
|----------|-------------|
| Alice | A+ |
| Bob | ? |

What should we store for Bob?

Option 1

```
A+
```

Wrong.

---

Option 2

```
Unknown
```

Not ideal.

Now the database mixes actual blood groups with text labels.

---

Option 3

```
''
```

Empty string.

Does that mean

- Unknown?
- Not applicable?
- Data entry error?

Nobody knows.

---

Option 4

```
0
```

Blood groups are not numbers.

Makes no sense.

---

Option 5

```
NULL
```

Perfect.

The database honestly states:

> "I do not know this value."

---

# The Philosophy Behind NULL

One of the principles of database design is

> **Never store incorrect information simply because the correct information is unavailable.**

Imagine asking

"What is Bob's blood group?"

If the answer is unknown,

the database should say

```
Unknown
```

not

```
A+
```

not

```
0
```

not

```
''
```

NULL allows the database to remain truthful.

---

# Unknown vs Not Applicable

One of the biggest misunderstandings about NULL is assuming every NULL means the same thing.

In reality, different business situations can produce NULL.

Consider the following table.

| Employee | Marriage Date |
|-----------|---------------|
| Alice | 2022-04-15 |
| Bob | NULL |

Why is Bob's marriage date NULL?

Possible reasons:

- Bob is unmarried.
- HR has not collected the information.
- The employee chose not to disclose it.

The database stores all of these as NULL.

Business documentation is required to explain the meaning.

---

# Think Like a Data Engineer

Suppose a customer record contains

```
Phone Number = NULL
```

Before writing SQL, ask:

- Did the customer refuse to provide it?
- Was the value lost during ETL?
- Is the source system incomplete?
- Is the field optional?
- Did validation fail?

The same SQL value may have completely different business meanings.

Good Data Engineers investigate the reason instead of blindly replacing NULL.

---

# Real-World Examples

## Banking

| Account | Loan Closure Date |
|----------|-------------------|
| A101 | NULL |

The loan is still active.

---

## Airline

| Flight | Actual Arrival Time |
|---------|---------------------|
| AI203 | NULL |

The flight is still in the air.

---

## E-commerce

| Order | Delivery Date |
|--------|---------------|
| ORD101 | NULL |

The package has not yet been delivered.

---

## Education

| Student | Graduation Date |
|----------|-----------------|
| Emma | NULL |

The student has not graduated.

---

## Human Resources

| Employee | Manager |
|-----------|----------|
| CEO | NULL |

The CEO has no manager.

Here, NULL means

```
Not Applicable
```

rather than

```
Unknown
```

---

# Different Reasons for NULL

A NULL value may represent

```
Unknown
```

Example

```
Blood Group
```

---

```
Not Yet Available
```

Example

```
Delivery Date
```

---

```
Not Applicable
```

Example

```
Manager of CEO
```

---

```
Confidential
```

Example

```
Employee Medical Record
```

---

```
System Error
```

Example

ETL failed to load data.

---

Although SQL stores all of these as NULL,

the business meaning is very different.

---

# Why Fake Values Are Dangerous

Some systems avoid NULL by using fake values.

Example

```
9999999999
```

instead of

```
NULL
```

for phone numbers.

Problems:

- Looks like a real number.
- Difficult to identify.
- Causes reporting errors.
- Breaks validation rules.
- Confuses downstream systems.

Using fake values often creates more problems than NULL.

---

# Enterprise Example

Suppose an online retailer stores

| Customer | Loyalty Tier |
|-----------|--------------|
| Alice | Gold |
| Bob | NULL |

Does Bob belong to

```
Bronze?
```

Maybe.

Does Bob have no loyalty account?

Maybe.

Has the nightly ETL not completed?

Maybe.

Never assume.

Investigate.

---

# Historical Background

Relational databases were developed to model business information accurately.

As database systems evolved, designers recognized that many business attributes are unknown when a record is first created.

Examples include

- Delivery Date
- Completion Date
- Approval Date
- Payment Date
- Return Date

Rather than forcing incorrect placeholder values, SQL introduced NULL to represent missing information.

This allows databases to remain consistent with the state of the real world.

---

# Engineering Insight

One of the responsibilities of a Data Engineer is to distinguish between

```
Missing Data
```

and

```
Bad Data
```

These are not the same.

Example

```
Delivery Date = NULL
```

for an order shipped yesterday

↓

Expected

---

```
Delivery Date = NULL
```

for an order delivered six months ago

↓

Potential data quality issue.

Context matters.

---

# Best Practices

✅ Understand why the value is NULL.

✅ Document the business meaning.

✅ Allow NULL only when appropriate.

✅ Validate unexpected NULL values during ETL.

✅ Use constraints for mandatory fields.

---

# Common Mistakes

❌ Replacing every NULL with zero.

❌ Assuming all NULL values indicate bad data.

❌ Using fake default values.

❌ Ignoring business context.

❌ Treating optional fields as mandatory.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE orders
(
    order_id INT PRIMARY KEY,
    customer_name VARCHAR(50),
    order_date DATE,
    shipped_date DATE,
    delivered_date DATE
);
```

---

## Insert Sample Data

```sql
INSERT INTO orders
VALUES
(101,'Alice','2026-01-01','2026-01-02','2026-01-05'),

(102,'Bob','2026-01-03',NULL,NULL),

(103,'Charlie','2026-01-04','2026-01-05',NULL),

(104,'David','2026-01-05',NULL,NULL);
```

---

## Exercise 1

For each NULL value, explain whether it is likely to mean:

- Unknown
- Not Yet Available
- Not Applicable
- Possible Data Quality Issue

---

## Exercise 2

Identify which NULL values are expected.

Which should be investigated?

Explain your reasoning.

---

## Exercise 3

Would replacing every NULL with a fixed date improve or worsen data quality?

Justify your answer.

---

# Interview Questions

## Beginner

1. Why do relational databases support NULL?

2. Why can't we simply store zero instead of NULL?

3. Give three real-world examples where NULL is appropriate.

---

## Intermediate

1. Explain the difference between Unknown and Not Applicable.

2. Why are fake default values dangerous?

3. Should every NULL be replaced during ETL?

---

## Senior

1. Design a data model that distinguishes between missing data and optional data.

2. How would you document the business meaning of NULL values across an enterprise data warehouse?

3. How would you detect unexpected NULL values in an automated data quality pipeline?

---

# Section Summary

In this section, you learned:

- NULL exists because real-world data is often incomplete.
- SQL uses NULL to represent unknown, unavailable, or inapplicable information without inventing false values.
- Different NULL values can have different business meanings.
- A Data Engineer must understand why a value is NULL before deciding how to handle it.
- Correct handling of NULL begins with understanding the business context, not just the SQL syntax.

In the next section, we will compare one of the most confusing topics in SQL:

**NULL vs Zero vs Empty String vs Blank Space**

Understanding these differences prevents many of the data quality and reporting errors found in production systems.


# ==========================================================
# Section 3
# NULL vs Zero vs Empty String vs Blank Space
# ==========================================================

# Introduction

One of the biggest mistakes SQL developers make is treating the following as equivalent:

- NULL
- 0
- Empty String (`''`)
- Blank Space (`' '`)

Although these values may appear similar when displayed in reports, they represent completely different concepts.

Understanding the difference is essential because it affects:

- Query results
- Data quality
- ETL pipelines
- Business reporting
- Aggregations
- Filtering
- Constraints
- Application behavior

Before learning NULL comparisons, we must clearly distinguish these concepts.

---

# The Four Concepts

| Value | Meaning |
|--------|----------|
| NULL | Unknown or missing value |
| 0 | Known numeric value |
| '' | Known text value with zero characters |
| ' ' | Known text value containing one or more spaces |

Notice something important.

Only one of these represents missing information.

That is

```
NULL
```

Everything else is an actual stored value.

---

# Mental Model

Imagine a customer registration form.

```
Phone Number

↓

NULL
```

Meaning

> We do not know the phone number.

---

```
Loyalty Points

↓

0
```

Meaning

> Customer has zero loyalty points.

This is completely different.

The value is known.

---

```
Middle Name

↓

''
```

Meaning

An empty string was stored.

The database knows the value.

It simply happens to contain zero characters.

---

```
Middle Name

↓

' '
```

Meaning

Someone entered one or more spaces.

This is still data.

It is poor-quality data,

but it is not NULL.

---

# Visual Comparison

```
NULL

↓

Unknown
```

```
0

↓

Known Number
```

```
''

↓

Known Empty Text
```

```
' '

↓

Known Text
(Whitespace)
```

---

# Example 1

Employee Bonus

| Employee | Bonus |
|-----------|------:|
| Alice | 5000 |
| Bob | 0 |
| Charlie | NULL |

Interpretation

Alice

↓

Received ₹5,000

---

Bob

↓

Received no bonus.

Known.

---

Charlie

↓

Bonus is unknown.

It may not yet be calculated.

---

# Example 2

Customer Email

| Customer | Email |
|-----------|-------|
| Alice | alice@example.com |
| Bob | '' |
| Charlie | NULL |

Bob

↓

Email exists as an empty string.

---

Charlie

↓

Email is unknown.

---

# Example 3

Product Description

| Product | Description |
|----------|-------------|
| Laptop | High Performance |
| Mouse | ' ' |
| Keyboard | NULL |

Mouse

↓

Contains spaces.

Poor-quality data.

---

Keyboard

↓

Description unknown.

---

# Why This Difference Matters

Imagine this report.

```
How many customers have not provided an email?
```

If some records contain

```
NULL
```

while others contain

```
''
```

your query may produce incorrect results unless both cases are handled appropriately.

Consistent data standards are important.

---

# Enterprise Example

Suppose an ETL pipeline receives customer data from three systems.

System A

```
NULL
```

System B

```
''
```

System C

```
' '
```

Business meaning

Exactly the same.

Technical values

Completely different.

Good ETL pipelines standardize these values before loading the warehouse.

---

# Data Quality Problem

Suppose HR stores employee phone numbers.

```
NULL
```

means

Unknown.

---

```
''
```

means

Application stored an empty value.

---

```
' '
```

means

User entered spaces.

---

```
0
```

means

Incorrect data.

Each requires a different data quality action.

---

# Deep Dive

Databases process these values differently.

| Value | Stored? | Data Type? |
|--------|----------|-----------|
| NULL | No actual value | Marker |
| 0 | Yes | Numeric |
| '' | Yes | Character |
| ' ' | Yes | Character |

Only NULL represents missing information.

---

# Think Like a Data Engineer

Suppose

```
salary = 0
```

Question

Should this become NULL?

Not necessarily.

Maybe the employee is an intern.

Maybe volunteers receive no salary.

Maybe zero is correct.

Never replace values without understanding the business meaning.

---

# Business Meaning Matters

Consider the column

```
delivery_date
```

Possible values

```
NULL
```

↓

Package not delivered yet.

---

```
1900-01-01
```

↓

Fake placeholder.

---

```
''
```

↓

Invalid data.

Dates should never be empty strings.

---

Correct modeling is far more important than simply avoiding NULL.

---

# Dialect Differences

Different database systems treat empty strings differently.

| Database | Empty String (`''`) | NULL |
|-----------|--------------------|------|
| PostgreSQL | Different from NULL | Supported |
| SQL Server | Different from NULL | Supported |
| MySQL | Different from NULL | Supported |
| Snowflake | Different from NULL | Supported |
| Spark SQL | Different from NULL | Supported |
| Oracle | Treated as NULL in most character contexts | Supported |

> **Important:** Oracle treats an empty string (`''`) as `NULL` for character data. This is one of the biggest portability differences between SQL dialects.

---

# Data Standardization

Good ETL pipelines often normalize incoming data.

Example

Before

```
NULL

''

' '

'    '
```

After

```
NULL
```

Now every downstream system has one consistent representation of missing text.

---

# Engineering Insight

A warehouse should have one agreed definition of missing information.

If different source systems use

- NULL
- ''
- ' '
- N/A
- UNKNOWN
- NONE

the ETL process should standardize them before loading analytical tables.

This improves reporting accuracy and simplifies SQL.

---

# Best Practices

✅ Use NULL for unknown information.

✅ Use 0 only when zero is the correct value.

✅ Trim whitespace during ETL.

✅ Standardize empty strings.

✅ Define organization-wide rules for missing data.

---

# Common Mistakes

❌ Assuming NULL equals zero.

❌ Treating empty strings as NULL without checking the database dialect.

❌ Leaving whitespace untrimmed.

❌ Mixing multiple representations of missing values.

❌ Replacing NULL with arbitrary defaults.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE customer_contact
(
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50),
    email VARCHAR(100),
    loyalty_points INT
);
```

---

## Insert Sample Data

```sql
INSERT INTO customer_contact
VALUES
(1,'Alice','alice@example.com',120),

(2,'Bob',NULL,0),

(3,'Charlie','',50),

(4,'David',' ',NULL),

(5,'Emma',NULL,200);
```

---

## Exercise 1

Identify rows containing

- NULL
- Empty strings
- Blank spaces
- Zero

---

## Exercise 2

Explain the business meaning of each value.

---

## Exercise 3

Which rows require ETL cleansing?

Explain your reasoning.

---

# Interview Questions

## Beginner

1. Is NULL equal to zero?

2. Is an empty string the same as NULL?

3. Is a blank space the same as an empty string?

---

## Intermediate

1. Why is zero considered a valid value while NULL is not?

2. Why should ETL pipelines standardize empty strings?

3. What portability issue exists with Oracle and empty strings?

---

## Senior

1. Design a data quality strategy for handling NULL, empty strings, and whitespace across multiple source systems.

2. How would you standardize missing text values during ETL?

3. Should the warehouse preserve source-system representations or normalize them? Justify your answer.

---

# Section Summary

In this section, you learned:

- NULL represents unknown or missing information.
- Zero is a valid numeric value.
- An empty string is a valid text value containing zero characters.
- A blank space is a valid text value containing whitespace.
- These values have different meanings and must not be used interchangeably.
- Enterprise ETL pipelines should standardize representations of missing information before loading analytical data.
- Oracle's treatment of empty strings differs from most other SQL databases and should be considered when writing portable SQL.

---

# Coming Up Next

In the next section, we explore one of the most fascinating concepts in SQL:

**Three-Valued Logic (TRUE, FALSE, UNKNOWN)**

You will discover why this simple query does **not** return TRUE:

```sql
SELECT NULL = NULL;
```

Understanding the answer is the key to mastering NULL behavior throughout SQL.


# ==========================================================
# Section 4
# Three-Valued Logic (TRUE, FALSE, UNKNOWN)
# ==========================================================

# Introduction

Most programming languages use **Boolean Logic**, which consists of only two values:

```
TRUE

FALSE
```

SQL is different.

Because SQL supports NULL, traditional Boolean logic is insufficient.

Suppose we ask the database:

> "Is Alice's salary greater than ₹50,000?"

If Alice's salary is NULL,

can SQL answer

```
TRUE ?
```

No.

Can SQL answer

```
FALSE ?
```

No.

The database simply **does not know**.

To solve this problem, SQL introduced a third logical value.

```
UNKNOWN
```

This concept is called

# Three-Valued Logic (3VL)

---

# Why Two-Valued Logic Is Not Enough

Imagine this table.

| Employee | Salary |
|-----------|--------|
| Alice | 75000 |
| Bob | NULL |

Question

```
Is Bob's salary greater than 50000?
```

Possible answers

```
TRUE ?
```

No.

---

```
FALSE ?
```

No.

---

Correct answer

```
UNKNOWN
```

The salary is unknown.

Therefore,

the comparison result is also unknown.

---

# The Three Logical Values

SQL uses three logical outcomes.

| Value | Meaning |
|---------|----------|
| TRUE | Condition is true |
| FALSE | Condition is false |
| UNKNOWN | SQL cannot determine the answer |

UNKNOWN is **not** an error.

It is a perfectly valid logical result.

---

# Visual Model

Traditional Programming

```
Condition

↓

TRUE

or

FALSE
```

SQL

```
Condition

↓

TRUE

FALSE

UNKNOWN
```

---

# How UNKNOWN Appears

Whenever NULL participates in most comparisons,

the result becomes

```
UNKNOWN
```

Examples

```sql
NULL = 10
```

↓

UNKNOWN

---

```sql
NULL > 100
```

↓

UNKNOWN

---

```sql
NULL < 5
```

↓

UNKNOWN

---

```sql
NULL = NULL
```

↓

UNKNOWN

Not TRUE.

---

# Why NULL = NULL Is NOT TRUE

This surprises almost everyone.

Suppose

```
Value A

↓

Unknown
```

```
Value B

↓

Unknown
```

Question

Are they equal?

Nobody knows.

Example

Suppose

Alice's salary

↓

Unknown

Bob's salary

↓

Unknown

Can we conclude

```
Alice Salary

=

Bob Salary
```

No.

Both are unknown.

Therefore

```
UNKNOWN = UNKNOWN

↓

UNKNOWN
```

---

# Truth Table

## Equality

| Expression | Result |
|------------|--------|
| 10 = 10 | TRUE |
| 10 = 20 | FALSE |
| NULL = 10 | UNKNOWN |
| NULL = NULL | UNKNOWN |

---

## Greater Than

| Expression | Result |
|------------|--------|
| 20 > 10 | TRUE |
| 10 > 20 | FALSE |
| NULL > 20 | UNKNOWN |
| NULL > NULL | UNKNOWN |

---

## Less Than

| Expression | Result |
|------------|--------|
| 5 < 10 | TRUE |
| 20 < 10 | FALSE |
| NULL < 5 | UNKNOWN |

---

# Think Like a Data Engineer

Imagine a hospital database.

Patient Weight

↓

NULL

Question

```
Weight > 100 kg ?
```

Can the database answer?

No.

The patient may weigh

- 40 kg

- 60 kg

- 120 kg

- 180 kg

The value is unknown.

Therefore

the comparison result is also unknown.

---

# UNKNOWN Is Contagious

UNKNOWN tends to propagate.

Example

```sql
salary >50000
```

↓

UNKNOWN

Then

```sql
salary>50000

AND

department='IT'
```

Even if

```
department='IT'

↓

TRUE
```

The overall result depends on the rules of three-valued logic.

We'll study those next.

---

# Three-Valued AND

| Left | Right | Result |
|------|-------|--------|
| TRUE | TRUE | TRUE |
| TRUE | FALSE | FALSE |
| TRUE | UNKNOWN | UNKNOWN |
| FALSE | TRUE | FALSE |
| FALSE | FALSE | FALSE |
| FALSE | UNKNOWN | FALSE |
| UNKNOWN | TRUE | UNKNOWN |
| UNKNOWN | FALSE | FALSE |
| UNKNOWN | UNKNOWN | UNKNOWN |

---

# Why?

Example

```
Salary >50000

↓

UNKNOWN
```

```
Department='HR'

↓

FALSE
```

Overall

```
UNKNOWN

AND

FALSE
```

↓

FALSE

Because

```
FALSE

AND

Anything

↓

FALSE
```

---

# Three-Valued OR

| Left | Right | Result |
|------|-------|--------|
| TRUE | TRUE | TRUE |
| TRUE | FALSE | TRUE |
| TRUE | UNKNOWN | TRUE |
| FALSE | TRUE | TRUE |
| FALSE | FALSE | FALSE |
| FALSE | UNKNOWN | UNKNOWN |
| UNKNOWN | TRUE | TRUE |
| UNKNOWN | FALSE | UNKNOWN |
| UNKNOWN | UNKNOWN | UNKNOWN |

---

# Three-Valued NOT

| Expression | Result |
|------------|--------|
| NOT TRUE | FALSE |
| NOT FALSE | TRUE |
| NOT UNKNOWN | UNKNOWN |

Notice

UNKNOWN remains UNKNOWN.

SQL still cannot determine the answer.

---

# Visualizing UNKNOWN

```
TRUE

↓

Definitely Yes
```

```
FALSE

↓

Definitely No
```

```
UNKNOWN

↓

Insufficient Information
```

---

# Why WHERE Behaves Strangely

Consider

```sql
SELECT *

FROM employees

WHERE salary>50000;
```

Suppose

| Salary |
|--------|
| 80000 |
| 30000 |
| NULL |

Evaluation

```
80000

↓

TRUE

↓

Returned
```

---

```
30000

↓

FALSE

↓

Ignored
```

---

```
NULL

↓

UNKNOWN

↓

Ignored
```

Important

The WHERE clause only returns rows where the condition evaluates to

```
TRUE
```

Rows evaluating to FALSE **or UNKNOWN** are filtered out.

This explains many SQL bugs.

---

# Production Story

A retail company wanted

```
High Value Customers
```

Query

```sql
WHERE

total_purchase>100000
```

Several customers disappeared from the report.

Why?

Their purchase values were NULL.

The condition evaluated to UNKNOWN,

not FALSE.

The business mistakenly believed the customers had been deleted.

In reality,

the WHERE clause filtered UNKNOWN rows.

---

# Engineering Insight

Three-Valued Logic is not merely an academic topic.

It affects

- WHERE
- JOIN
- HAVING
- CHECK Constraints
- CASE
- Aggregates
- Window Functions

Every SQL developer eventually encounters bugs caused by misunderstanding UNKNOWN.

Mastering 3VL dramatically improves debugging skills.

---

# Best Practices

✅ Remember that NULL comparisons usually return UNKNOWN.

✅ Think about UNKNOWN when writing filters.

✅ Test queries using rows that contain NULL values.

✅ Document nullable business fields.

---

# Common Mistakes

❌ Assuming NULL = NULL is TRUE.

❌ Assuming UNKNOWN behaves like FALSE.

❌ Forgetting that WHERE returns only TRUE rows.

❌ Ignoring NULL values during testing.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employee_salary
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    salary NUMERIC(10,2)
);
```

---

## Insert Data

```sql
INSERT INTO employee_salary
VALUES
(1,'Alice',80000),

(2,'Bob',30000),

(3,'Charlie',NULL),

(4,'David',120000),

(5,'Emma',NULL);
```

---

## Exercise 1

Without executing the query, predict the result.

```sql
SELECT *

FROM employee_salary

WHERE salary>50000;
```

---

## Exercise 2

Explain why employees with NULL salaries are excluded.

---

## Exercise 3

Evaluate the following expressions manually.

```sql
NULL = NULL
```

```sql
NULL > 100
```

```sql
TRUE AND UNKNOWN
```

```sql
FALSE OR UNKNOWN
```

```sql
NOT UNKNOWN
```

---

# Interview Questions

## Beginner

1. What are the three logical values in SQL?

2. Why does SQL need UNKNOWN?

3. Is NULL = NULL TRUE?

---

## Intermediate

1. Why does WHERE ignore UNKNOWN?

2. Explain TRUE, FALSE and UNKNOWN using a business example.

3. How does UNKNOWN affect filtering?

---

## Senior

1. Explain how Three-Valued Logic affects query correctness.

2. How would you teach UNKNOWN to a junior engineer?

3. Describe a production issue caused by misunderstanding NULL comparisons.

---

# Section Summary

In this section, you learned:

- SQL uses **Three-Valued Logic** because NULL introduces uncertainty.
- SQL conditions can evaluate to **TRUE**, **FALSE**, or **UNKNOWN**.
- Comparisons involving NULL usually produce **UNKNOWN**.
- `NULL = NULL` is **not TRUE**; it evaluates to **UNKNOWN**.
- The `WHERE` clause returns only rows where the condition is **TRUE**, filtering out both **FALSE** and **UNKNOWN**.
- Understanding Three-Valued Logic is the foundation for mastering NULL behavior in every SQL clause.

---

# Coming Up Next

Now that you understand **UNKNOWN**, the next section explores something that surprises almost every SQL developer:

# NULL Comparisons

Why do these expressions all behave differently?

```sql
NULL = NULL
```

```sql
NULL <> NULL
```

```sql
NULL > 10
```

```sql
NULL BETWEEN 1 AND 100
```

```sql
NULL IN (1,2,3)
```

You'll learn the rules behind each comparison and why SQL behaves this way.


# ==========================================================
# Section 5
# NULL Comparisons
# ==========================================================

# Introduction

One of the biggest surprises for SQL developers is that NULL behaves differently from every other value.

Consider these expressions.

```sql
5 = 5
```

Result

```
TRUE
```

---

```sql
5 = 10
```

Result

```
FALSE
```

---

Now consider

```sql
NULL = 5
```

Many beginners expect

```
FALSE
```

Wrong.

SQL returns

```
UNKNOWN
```

This section explains why every comparison involving NULL behaves this way.

---

# The Fundamental Rule

Remember this rule throughout your SQL career.

> **Any comparison involving NULL usually evaluates to UNKNOWN.**

This applies to

- =
- <>
- >
- <
- >=
- <=

The database cannot compare a value that it does not know.

---

# Equality (=)

Example

```sql
SELECT
NULL = 10;
```

Evaluation

```
Unknown

=

Known Value

↓

UNKNOWN
```

---

Example

```sql
SELECT
NULL = NULL;
```

Evaluation

```
Unknown

=

Unknown

↓

UNKNOWN
```

Notice

The result is **not TRUE**.

---

# Why Isn't NULL = NULL TRUE?

Imagine asking two questions.

```
Employee A Salary

↓

Unknown
```

```
Employee B Salary

↓

Unknown
```

Question

```
Are both salaries equal?
```

The database cannot answer.

Maybe both salaries are

```
₹80,000
```

Maybe

```
₹50,000

and

₹100,000
```

Since the values are unknown,

the answer is

```
UNKNOWN
```

---

# Not Equal (<>)

Example

```sql
SELECT
NULL <> 100;
```

Does SQL know whether

```
Unknown

≠

100
```

No.

Result

```
UNKNOWN
```

---

Example

```sql
SELECT
NULL <> NULL;
```

Result

```
UNKNOWN
```

Again,

SQL refuses to guess.

---

# Greater Than (>)

```sql
SELECT
NULL > 100;
```

Question

Is the unknown value greater than 100?

Impossible to determine.

Result

```
UNKNOWN
```

---

# Less Than (<)

```sql
SELECT
NULL < 50;
```

Result

```
UNKNOWN
```

---

# Greater Than or Equal (>=)

```sql
NULL >= 100
```

↓

UNKNOWN

---

# Less Than or Equal (<=)

```sql
NULL <= 100
```

↓

UNKNOWN

---

# Comparison Summary

| Expression | Result |
|------------|--------|
| NULL = 5 | UNKNOWN |
| NULL = NULL | UNKNOWN |
| NULL <> 5 | UNKNOWN |
| NULL <> NULL | UNKNOWN |
| NULL > 5 | UNKNOWN |
| NULL < 5 | UNKNOWN |
| NULL >= 5 | UNKNOWN |
| NULL <= 5 | UNKNOWN |

Notice the pattern.

The database simply does not have enough information.

---

# BETWEEN

Consider

```sql
SELECT

NULL BETWEEN 1 AND 10;
```

Think about what BETWEEN means.

```
NULL >=1

AND

NULL <=10
```

Both comparisons become

```
UNKNOWN
```

Therefore

```
UNKNOWN

AND

UNKNOWN

↓

UNKNOWN
```

---

# NOT BETWEEN

```sql
NULL NOT BETWEEN 1 AND 10
```

Result

```
UNKNOWN
```

---

# IN

Example

```sql
SELECT

NULL IN (1,2,3);
```

Equivalent to

```sql
NULL=1

OR

NULL=2

OR

NULL=3
```

Every comparison

↓

UNKNOWN

Overall result

↓

UNKNOWN

---

# NOT IN

Example

```sql
SELECT

NULL NOT IN (1,2,3);
```

Many beginners expect

```
TRUE
```

Wrong.

Result

```
UNKNOWN
```

Later in this chapter we will see why `NOT IN` and NULL together often produce unexpected results.

---

# LIKE

Suppose

```sql
NULL LIKE 'A%'
```

Can SQL determine whether an unknown value starts with A?

No.

Result

```
UNKNOWN
```

---

# IS NULL

Notice

This is **not** a comparison operator.

Example

```sql
salary IS NULL
```

This asks

```
Is the value missing?
```

This expression returns

```
TRUE

or

FALSE
```

It never returns UNKNOWN.

We will study this in detail in the next section.

---

# Execution Trace

Example

```sql
salary >50000
```

Suppose

```
salary

↓

NULL
```

Execution

```
Read Row

↓

salary = NULL

↓

Compare with 50000

↓

Comparison Result

↓

UNKNOWN

↓

WHERE keeps only TRUE

↓

Row Removed
```

This explains why NULL rows disappear during filtering.

---

# Think Like a Data Engineer

Suppose a banking table contains

| Loan ID | Closure Date |
|----------|--------------|
|101|NULL|

Business asks

```
closure_date<'2025-01-01'
```

Can SQL answer?

No.

The loan may still be active.

The closure date is unknown.

Result

```
UNKNOWN
```

---

# Business Meaning Matters

Imagine

```
discount_percentage=NULL
```

Question

```
discount>10
```

Does that mean

"No Discount"?

No.

Maybe

- Discount not calculated.
- Promotion not yet assigned.
- ETL failed.
- Business rule pending.

The comparison remains

```
UNKNOWN
```

---

# Deep Dive

Internally,

the optimizer cannot transform

```sql
NULL = 100
```

into

```
TRUE

or

FALSE
```

because there is insufficient information.

Instead,

the logical expression propagates

```
UNKNOWN
```

through the execution plan until another SQL construct (such as `WHERE`, `CASE`, or `COALESCE`) determines how to handle it.

---

# Best Practices

✅ Assume NULL comparisons return UNKNOWN.

✅ Use `IS NULL` to test for missing values.

✅ Consider UNKNOWN when designing filters.

✅ Test queries with NULL data.

---

# Common Mistakes

❌ Using

```sql
WHERE column = NULL
```

❌ Using

```sql
WHERE column <> NULL
```

❌ Assuming NULL comparisons return FALSE.

❌ Ignoring UNKNOWN during debugging.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE products
(
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50),
    price NUMERIC(10,2)
);
```

---

## Insert Data

```sql
INSERT INTO products
VALUES
(1,'Laptop',85000),

(2,'Mouse',1500),

(3,'Keyboard',NULL),

(4,'Monitor',25000),

(5,'Speaker',NULL);
```

---

## Exercise 1

Without executing the query, predict the output.

```sql
SELECT *

FROM products

WHERE price>20000;
```

---

## Exercise 2

Predict the result.

```sql
SELECT

NULL=10,

NULL<>10,

NULL>10,

NULL<10;
```

---

## Exercise 3

Evaluate

```sql
NULL BETWEEN 1 AND 10
```

```sql
NULL IN (1,2,3)
```

```sql
NULL LIKE 'A%'
```

Explain every result.

---

# Interview Questions

## Beginner

1. What does `NULL = NULL` return?

2. Why does `NULL > 100` return UNKNOWN?

3. Why doesn't SQL treat NULL as zero?

---

## Intermediate

1. Explain why `BETWEEN` with NULL returns UNKNOWN.

2. Why is `IN` affected by NULL?

3. Why is `WHERE column = NULL` incorrect?

---

## Senior

1. Explain how NULL comparisons affect query correctness.

2. Describe a production issue caused by incorrect NULL comparisons.

3. How would you teach Three-Valued Logic to new SQL developers?

---

# Section Summary

In this section, you learned:

- Any comparison involving NULL generally evaluates to **UNKNOWN**.
- This behavior applies to equality, inequality, relational operators, `BETWEEN`, `IN`, and `LIKE`.
- `NULL = NULL` is **not TRUE** because SQL cannot determine whether two unknown values are equal.
- The `WHERE` clause returns only rows where the condition evaluates to **TRUE**, which is why NULL rows are often excluded from query results.
- To check whether a value is missing, use `IS NULL` rather than comparison operators.

---

# Coming Up Next

Now that you understand why comparisons fail, we'll learn the **correct way** to test for NULL values.

# Section 6

**IS NULL & IS NOT NULL**

You'll learn:

- Why `column = NULL` never works.
- Why `IS NULL` is a special SQL predicate.
- How databases evaluate `IS NULL`.
- Real-world filtering examples.
- Performance considerations.
- Enterprise best practices.

# ==========================================================
# Section 6
# IS NULL & IS NOT NULL
# ==========================================================

# Introduction

In the previous section, we learned an important rule:

> Any comparison involving NULL usually evaluates to **UNKNOWN**.

This leads to one of the most common beginner mistakes.

Developers naturally write

```sql
WHERE salary = NULL;
```

or

```sql
WHERE salary <> NULL;
```

Unfortunately, both queries are incorrect.

SQL provides two special predicates specifically designed for testing NULL values:

- `IS NULL`
- `IS NOT NULL`

Unlike comparison operators (`=`, `<>`, `>`, `<`), these predicates correctly determine whether a value is NULL.

---

# Why Doesn't `= NULL` Work?

Suppose we have the following table.

| Employee | Bonus |
|-----------|-------|
| Alice | 5000 |
| Bob | NULL |
| Charlie | 8000 |

A beginner might write

```sql
SELECT *
FROM employees
WHERE bonus = NULL;
```

Expected

```
Bob
```

Actual Result

```
No Rows Returned
```

Why?

Because SQL evaluates

```
bonus = NULL
```

as

```
UNKNOWN
```

and the `WHERE` clause only returns rows where the condition evaluates to **TRUE**.

---

# Wrong SQL vs Correct SQL

## Example 1

❌ Wrong

```sql
SELECT *
FROM employees
WHERE bonus = NULL;
```

---

✅ Correct

```sql
SELECT *
FROM employees
WHERE bonus IS NULL;
```

---

## Example 2

❌ Wrong

```sql
SELECT *
FROM employees
WHERE resignation_date <> NULL;
```

---

✅ Correct

```sql
SELECT *
FROM employees
WHERE resignation_date IS NOT NULL;
```

---

# What Is `IS NULL`?

`IS NULL` is a **predicate**, not a comparison operator.

It asks a simple question:

> **Is this value NULL?**

Possible results

```
TRUE

FALSE
```

Notice

`IS NULL` never returns

```
UNKNOWN
```

because it is testing the state of the value rather than comparing it to another value.

---

# How `IS NULL` Works

Consider

| Employee | Bonus |
|-----------|------:|
| Alice | 5000 |
| Bob | NULL |
| Charlie | 8000 |
| David | NULL |

Query

```sql
SELECT
employee_name,
bonus
FROM employees
WHERE bonus IS NULL;
```

Result

| Employee | Bonus |
|-----------|-------|
| Bob | NULL |
| David | NULL |

---

# Execution Trace

```
Read Row

↓

bonus

↓

Is value NULL?

↓

YES

↓

TRUE

↓

Row Returned
```

---

For Alice

```
bonus

↓

5000

↓

Is value NULL?

↓

NO

↓

FALSE

↓

Row Filtered
```

---

# What Is `IS NOT NULL`?

`IS NOT NULL` performs the opposite test.

It returns rows containing actual values.

Example

```sql
SELECT
employee_name,
bonus
FROM employees
WHERE bonus IS NOT NULL;
```

Result

| Employee | Bonus |
|-----------|-------|
| Alice | 5000 |
| Charlie | 8000 |

---

# Execution Trace

```
Read Row

↓

bonus

↓

NULL?

↓

NO

↓

TRUE

↓

Return Row
```

---

# Think Like a Data Engineer

Suppose your ETL pipeline loads customer email addresses.

Business Rule

```
Every Premium Customer

must

have an Email Address.
```

Data Quality Query

```sql
SELECT *
FROM customers
WHERE customer_type='Premium'
AND email IS NULL;
```

This query identifies customers violating business rules.

Notice

We are not searching for

```
email = NULL
```

We are asking

```
Is the email missing?
```

---

# Business Meaning Matters

Consider

```
delivery_date IS NULL
```

Business interpretation

```
Order not delivered yet.
```

Now consider

```
manager_id IS NULL
```

Business interpretation

```
Employee has no manager.
```

The SQL syntax is identical.

The business meaning is different.

Always interpret NULL within the business context.

---

# NULL in Multiple Columns

Suppose

| Employee | Phone | Email |
|-----------|-------|-------|
| Alice | NULL | alice@example.com |
| Bob | NULL | NULL |
| Charlie | 9876543210 | NULL |

Find employees missing both phone and email.

```sql
SELECT *
FROM employees
WHERE phone IS NULL
AND email IS NULL;
```

---

Find employees missing either phone or email.

```sql
SELECT *
FROM employees
WHERE phone IS NULL
OR email IS NULL;
```

---

# NULL in UPDATE

Replace unknown bonus with zero.

```sql
UPDATE employees
SET bonus=0
WHERE bonus IS NULL;
```

⚠️

Do this only if the business confirms that NULL truly means "no bonus."

Otherwise,

you may destroy meaningful information.

---

# NULL in DELETE

Delete incomplete records.

```sql
DELETE
FROM customers
WHERE email IS NULL;
```

Be careful.

Missing data does not always mean invalid data.

---

# NULL in CASE

```sql
SELECT

employee_name,

CASE

WHEN bonus IS NULL

THEN 'Pending'

ELSE 'Calculated'

END

FROM employees;
```

Notice

CASE also uses

```
IS NULL
```

rather than

```
= NULL
```

---

# Deep Dive

Why is `IS NULL` special?

Comparison operators evaluate relationships between two values.

Example

```
salary = 50000
```

`IS NULL` does not compare two values.

Instead,

it asks whether a value exists.

Conceptually

```
Value Present?

↓

YES

↓

FALSE

Value Missing?

↓

TRUE
```

This is why `IS NULL` behaves differently from `=`.

---

# Performance Notes

Most modern database systems optimize `IS NULL` efficiently.

If a nullable column is indexed, the optimizer may use that index depending on:

- Database engine
- Index type
- Data distribution
- Percentage of NULL values

Always verify with an execution plan instead of assuming.

---

# Best Practices

✅ Use `IS NULL` to test for missing values.

✅ Use `IS NOT NULL` when filtering known values.

✅ Understand the business meaning before replacing NULL.

✅ Test SQL with both NULL and non-NULL data.

---

# Common Mistakes

❌ Using

```sql
WHERE salary = NULL
```

---

❌ Using

```sql
WHERE salary <> NULL
```

---

❌ Assuming NULL means zero.

---

❌ Updating NULL values without business approval.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    bonus NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','alice@example.com','9876543210',5000),

(2,'Bob',NULL,'9988776655',NULL),

(3,'Charlie','charlie@example.com',NULL,3000),

(4,'David',NULL,NULL,NULL),

(5,'Emma','emma@example.com','9123456789',7000);
```

---

# Exercise 1

Find employees whose bonus has not yet been calculated.

---

# Exercise 2

Find employees whose email address is missing.

---

# Exercise 3

Find employees missing both email and phone.

---

# Exercise 4

Find employees having both email and phone.

---

# Exercise 5

Write a CASE expression that returns

```
Email Available

or

Email Missing
```

---

# Interview Questions

## Beginner

1. Why does `column = NULL` not work?

2. What is the difference between `IS NULL` and `= NULL`?

3. What does `IS NOT NULL` return?

---

## Intermediate

1. Why is `IS NULL` considered a predicate instead of a comparison operator?

2. How does `IS NULL` interact with the WHERE clause?

3. When should NULL values be preserved instead of replaced?

---

## Senior

1. Design a data quality validation process using `IS NULL`.

2. How would you monitor unexpected NULL values in production ETL pipelines?

3. Explain why replacing every NULL with a default value may introduce reporting errors.

---

# Section Summary

In this section, you learned:

- `IS NULL` and `IS NOT NULL` are the correct SQL predicates for testing missing values.
- `= NULL` and `<> NULL` are incorrect because comparisons involving NULL evaluate to **UNKNOWN**.
- `IS NULL` checks whether a value is missing rather than comparing two values.
- `IS NULL` is widely used in filtering, ETL validation, data quality checks, and CASE expressions.
- Before replacing NULL values, always understand their business meaning.

---

# Coming Up Next

Now that you know how to identify NULL values, the next section introduces one of the most useful SQL functions:

# Section 7

**COALESCE()**

You'll learn:

- What `COALESCE()` does.
- How it evaluates multiple expressions.
- Replacing NULL with default values.
- Real-world ETL transformations.
- Performance considerations.
- Enterprise design patterns.


# ==========================================================
# Section 7
# COALESCE()
# ==========================================================

# Introduction

In the previous section, we learned how to identify NULL values using

- `IS NULL`
- `IS NOT NULL`

However, identifying NULL values is only the first step.

In real-world applications, we often need to **replace NULL with another value** before displaying reports, performing calculations, or loading data into downstream systems.

SQL provides the `COALESCE()` function for this purpose.

It returns the **first non-NULL value** from a list of expressions.

---

# Why Do We Need COALESCE?

Imagine an employee report.

| Employee | Bonus |
|-----------|-------:|
| Alice | 5000 |
| Bob | NULL |
| Charlie | 8000 |

If management wants to display

```
0
```

instead of

```
NULL
```

we need a way to replace missing values.

That's exactly what COALESCE does.

---

# Syntax

```sql
COALESCE(expression1,
         expression2,
         expression3,
         ...,
         expressionN)
```

The function evaluates expressions from left to right.

The **first expression that is not NULL** is returned.

If every expression is NULL,

the result is NULL.

---

# Mental Model

Imagine someone asking

> "What phone number should I call?"

Try

```
Office Number

↓

NULL
```

Try

```
Mobile Number

↓

9876543210
```

Stop.

Return

```
9876543210
```

COALESCE follows exactly this logic.

---

# Visual Representation

```
COALESCE

↓

Expression 1

↓

NULL ?

↓

YES

↓

Expression 2

↓

NULL ?

↓

YES

↓

Expression 3

↓

NULL ?

↓

NO

↓

Return Value
```

---

# Example 1

```sql
SELECT
COALESCE(NULL,10);
```

Result

```
10
```

---

# Execution Trace

```
Expression 1

↓

NULL

↓

Continue

↓

Expression 2

↓

10

↓

Return 10
```

---

# Example 2

```sql
SELECT
COALESCE(NULL,NULL,'SQL');
```

Result

```
SQL
```

---

# Example 3

```sql
SELECT
COALESCE(NULL,NULL,NULL);
```

Result

```
NULL
```

Every expression is NULL.

Therefore,

COALESCE returns NULL.

---

# Using COALESCE with Table Columns

Suppose

| Employee | Bonus |
|-----------|-------:|
| Alice | 5000 |
| Bob | NULL |
| Charlie | 7000 |

Query

```sql
SELECT

employee_name,

COALESCE(bonus,0) AS bonus

FROM employees;
```

Result

| Employee | Bonus |
|-----------|-------:|
| Alice | 5000 |
| Bob | 0 |
| Charlie | 7000 |

Notice

The table itself is **not modified**.

Only the query result changes.

---

# Think Like a Data Engineer

Suppose an ETL pipeline loads customer loyalty points.

Source System

```
NULL
```

Business Rule

Missing loyalty points should be treated as

```
0
```

Transformation

```sql
SELECT

customer_id,

COALESCE(loyalty_points,0)

FROM customers;
```

Now every downstream system receives a valid numeric value.

---

# Business Meaning Matters

Before using

```sql
COALESCE(column,0)
```

ask yourself

Does NULL really mean zero?

Example

```
Bonus

↓

NULL
```

Could mean

- Bonus not calculated
- Bonus pending approval
- Bonus confidential

Replacing NULL with zero may produce misleading reports.

Always confirm the business meaning first.

---

# Multiple Expressions

Suppose a customer has multiple contact numbers.

Priority

1. Mobile
2. Home
3. Office

Query

```sql
SELECT

customer_name,

COALESCE(mobile_phone,
         home_phone,
         office_phone)

AS contact_number

FROM customers;
```

COALESCE returns the first available phone number.

---

# COALESCE with Text

```sql
SELECT

customer_name,

COALESCE(email,
         'Email Not Available')

FROM customers;
```

Result

Missing email addresses become

```
Email Not Available
```

---

# COALESCE with Dates

```sql
SELECT

order_id,

COALESCE(delivery_date,
         expected_delivery_date)

FROM orders;
```

If the order has not yet been delivered,

the expected delivery date is displayed instead.

---

# COALESCE in Calculations

Suppose

| Salary | Bonus |
|--------:|------:|
|50000|5000|
|70000|NULL|

Incorrect

```sql
salary+bonus
```

Second row becomes

```
NULL
```

Correct

```sql
salary+

COALESCE(bonus,0)
```

Now

```
70000+0

↓

70000
```

---

# COALESCE in Concatenation

```sql
SELECT

first_name ||

' ' ||

COALESCE(middle_name,'')

||

last_name

FROM employees;
```

Without COALESCE,

the entire concatenation may become NULL in many SQL dialects.

---

# COALESCE vs CASE

The following two queries produce the same result.

Using COALESCE

```sql
COALESCE(bonus,0)
```

Using CASE

```sql
CASE

WHEN bonus IS NULL

THEN 0

ELSE bonus

END
```

COALESCE is shorter and usually easier to read.

---

# Execution Flow

```
COALESCE

↓

bonus

↓

NULL ?

↓

YES

↓

Return 0
```

---

# Deep Dive

`COALESCE()` is part of the SQL standard.

Conceptually,

it behaves like a series of nested CASE expressions.

Many database optimizers internally transform simple COALESCE expressions into equivalent conditional logic during query optimization.

Understanding this helps explain why COALESCE and CASE often have similar execution characteristics.

---

# Performance Notes

COALESCE is generally inexpensive.

However,

avoid wrapping indexed columns in COALESCE inside highly selective WHERE clauses without verifying the execution plan.

Example

```sql
WHERE

COALESCE(status,'Pending')

='Approved'
```

Depending on the database and indexes, this may prevent efficient index usage.

Prefer checking the execution plan for performance-critical queries.

---

# Best Practices

✅ Use COALESCE for presentation logic.

✅ Confirm business meaning before replacing NULL.

✅ Keep default values consistent.

✅ Prefer COALESCE over lengthy CASE expressions when simply selecting the first non-NULL value.

---

# Common Mistakes

❌ Assuming NULL always means zero.

❌ Replacing every NULL blindly.

❌ Using COALESCE without understanding downstream business rules.

❌ Using unrealistic default values.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    salary NUMERIC(10,2),
    bonus NUMERIC(10,2),
    mobile_phone VARCHAR(20),
    home_phone VARCHAR(20)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice',50000,5000,'9876543210',NULL),

(2,'Bob',70000,NULL,NULL,'9988776655'),

(3,'Charlie',80000,NULL,NULL,NULL),

(4,'David',60000,4000,'9123456789','9988112233');
```

---

# Exercise 1

Display bonus.

Replace NULL with

```
0
```

---

# Exercise 2

Display the first available phone number.

Priority

- Mobile
- Home

---

# Exercise 3

Calculate

```
Salary + Bonus
```

Treat missing bonuses as zero.

---

# Exercise 4

Replace missing phone numbers with

```
'Not Available'
```

---

# Interview Trap

What does the following query return?

```sql
SELECT

COALESCE(NULL,NULL,NULL,25,NULL);
```

Many candidates overthink it.

Correct Answer

```
25
```

COALESCE stops at the **first non-NULL value**.

---

# Interview Questions

## Beginner

1. What does COALESCE do?

2. What happens if all arguments are NULL?

3. Does COALESCE modify table data?

---

## Intermediate

1. How is COALESCE different from IS NULL?

2. Why is COALESCE useful in calculations?

3. How does COALESCE evaluate multiple expressions?

---

## Senior

1. When would you avoid using COALESCE in a WHERE clause?

2. How does COALESCE affect query optimization?

3. Design an ETL transformation using COALESCE for optional customer attributes.

---

# Section Summary

In this section, you learned:

- `COALESCE()` returns the first non-NULL expression.
- It is commonly used to replace NULL values for reporting, ETL, and calculations.
- COALESCE does not modify stored data; it only affects query results.
- It can evaluate multiple expressions in priority order.
- Before replacing NULL values, always understand their business meaning.
- COALESCE is often a cleaner alternative to a simple CASE expression.

---

# Coming Up Next

In the next section, we'll study another powerful SQL function:

# Section 8

**NULLIF()**

You'll learn:

- What NULLIF does.
- How it prevents divide-by-zero errors.
- How it simplifies conditional logic.
- Enterprise ETL use cases.
- Performance considerations.
- Interview questions and PostgreSQL practice.

# ==========================================================
# Section 8
# NULLIF()
# ==========================================================

# Introduction

In the previous section, we learned how `COALESCE()` replaces NULL values with meaningful alternatives.

This section introduces another powerful SQL function:

```
NULLIF()
```

Unlike `COALESCE()`, which finds the first non-NULL value,

`NULLIF()` does the opposite.

It compares two expressions.

If they are equal,

it returns

```
NULL
```

Otherwise,

it returns the first expression.

Although the syntax is simple, NULLIF is widely used in

- Financial calculations
- ETL pipelines
- Data cleansing
- Data Warehouses
- Reporting systems
- Divide-by-zero prevention

---

# Why Do We Need NULLIF?

Imagine a table containing product discounts.

| Product | Discount |
|----------|----------|
| Laptop | 10 |
| Mouse | 0 |
| Keyboard | 15 |

Business Rule

```
0

↓

No Discount
```

Instead of storing

```
0
```

you want to treat it as

```
NULL
```

NULLIF makes this simple.

---

# Syntax

```sql
NULLIF(expression1, expression2)
```

Rules

If

```
expression1 = expression2
```

↓

Return

```
NULL
```

Otherwise

↓

Return

```
expression1
```

---

# Mental Model

Imagine a quality check.

```
Compare

↓

Same?

↓

YES

↓

Return NULL

↓

NO

↓

Return Original Value
```

---

# Example 1

```sql
SELECT
NULLIF(10,10);
```

Result

```
NULL
```

---

# Execution Trace

```
10

↓

Compare

↓

10

↓

Equal?

↓

YES

↓

Return NULL
```

---

# Example 2

```sql
SELECT
NULLIF(10,20);
```

Result

```
10
```

---

# Execution Trace

```
10

↓

Compare

↓

20

↓

Equal?

↓

NO

↓

Return 10
```

---

# Example 3

```sql
SELECT
NULLIF('SQL','SQL');
```

Result

```
NULL
```

---

# Example 4

```sql
SELECT
NULLIF('SQL','Python');
```

Result

```
SQL
```

---

# Using NULLIF with Table Columns

Suppose

| Employee | Bonus |
|-----------|-------:|
| Alice | 5000 |
| Bob | 0 |
| Charlie | 7000 |

Query

```sql
SELECT

employee_name,

NULLIF(bonus,0)

AS bonus

FROM employees;
```

Result

| Employee | Bonus |
|-----------|-------:|
| Alice | 5000 |
| Bob | NULL |
| Charlie | 7000 |

Notice

Only the query result changes.

The underlying table remains unchanged.

---

# Think Like a Data Engineer

Suppose an ETL pipeline receives data from an old system.

The source system stores

```
0
```

instead of

```
NULL
```

for missing commission values.

Transformation

```sql
SELECT

employee_id,

NULLIF(commission,0)

AS commission

FROM employees;
```

Now

```
0

↓

NULL
```

which correctly represents missing information.

---

# The Most Common Use Case

## Preventing Divide-by-Zero Errors

Suppose

```sql
SELECT

sales/

quantity

FROM orders;
```

What happens if

```
quantity = 0
```

The database raises a divide-by-zero error.

Solution

```sql
SELECT

sales/

NULLIF(quantity,0)

FROM orders;
```

Now

```
quantity=0

↓

NULLIF

↓

NULL

↓

sales/NULL

↓

NULL
```

No error occurs.

Instead,

SQL safely returns NULL.

---

# Business Example

Suppose

| Sales | Quantity |
|-------:|---------:|
|1000|10|
|500|0|
|700|7|

Query

```sql
SELECT

sales/

NULLIF(quantity,0)

AS average_price

FROM sales;
```

Results

| Sales | Quantity | Average |
|--------|----------|---------|
|1000|10|100|
|500|0|NULL|
|700|7|100|

---

# Combining NULLIF and COALESCE

Suppose management wants

```
0
```

instead of

```
NULL
```

Query

```sql
SELECT

COALESCE(

sales/

NULLIF(quantity,0),

0

)

FROM sales;
```

Flow

```
Quantity

↓

0

↓

NULLIF

↓

NULL

↓

Division

↓

NULL

↓

COALESCE

↓

0
```

---

# NULLIF vs CASE

The following are equivalent.

Using NULLIF

```sql
NULLIF(quantity,0)
```

Using CASE

```sql
CASE

WHEN quantity=0

THEN NULL

ELSE quantity

END
```

NULLIF is shorter and easier to read.

---

# Behind the Scenes

Conceptually,

NULLIF behaves like

```sql
CASE

WHEN expression1=expression2

THEN NULL

ELSE expression1

END
```

Many database optimizers internally rewrite simple NULLIF expressions into equivalent conditional logic.

---

# NULLIF in Data Cleansing

Legacy systems often use placeholder values.

Examples

```
0

-1

999999

9999-12-31

UNKNOWN
```

These are not always meaningful.

Example

```sql
SELECT

NULLIF(phone_number,'')

FROM customers;
```

or

```sql
NULLIF(score,-1)
```

This converts placeholder values into proper NULLs before loading the warehouse.

---

# Business Meaning Matters

Never assume

```
0

↓

NULL
```

Some columns legitimately allow zero.

Example

```
Account Balance

↓

0
```

This means

"No money."

It does **not** mean

"Unknown."

Always confirm business meaning before using NULLIF.

---

# Performance Notes

NULLIF is lightweight and usually inexpensive.

However,

avoid wrapping indexed columns inside functions within highly selective predicates unless you have verified the execution plan.

Example

```sql
WHERE

NULLIF(status,'')

='ACTIVE'
```

This may reduce index efficiency in some database engines.

---

# Best Practices

✅ Use NULLIF to normalize placeholder values.

✅ Use NULLIF to prevent divide-by-zero errors.

✅ Combine NULLIF and COALESCE when appropriate.

✅ Understand the business meaning before converting values to NULL.

---

# Common Mistakes

❌ Converting legitimate zero values into NULL.

❌ Assuming NULLIF changes stored data.

❌ Forgetting that NULLIF returns the first expression when values differ.

❌ Using NULLIF without understanding placeholder conventions.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE sales
(
    sale_id INT PRIMARY KEY,
    total_sales NUMERIC(10,2),
    quantity INT,
    discount NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO sales VALUES
(1,1000,10,100),

(2,500,0,0),

(3,750,5,50),

(4,900,0,0),

(5,1200,12,150);
```

---

# Exercise 1

Calculate

```
Average Selling Price
```

without generating divide-by-zero errors.

---

# Exercise 2

Convert

```
Discount = 0
```

to

```
NULL
```

using NULLIF.

---

# Exercise 3

Combine

```
NULLIF

+

COALESCE
```

to display

```
0
```

instead of NULL.

---

# Interview Trap

Predict the result.

```sql
SELECT

NULLIF(100,100);
```

Answer

```
NULL
```

---

Predict

```sql
SELECT

NULLIF(100,200);
```

Answer

```
100
```

---

# Interview Questions

## Beginner

1. What does NULLIF do?

2. When does NULLIF return NULL?

3. Does NULLIF modify stored data?

---

## Intermediate

1. Why is NULLIF commonly used to prevent divide-by-zero errors?

2. Explain the relationship between NULLIF and CASE.

3. When should placeholder values be converted into NULL?

---

## Senior

1. Design an ETL pipeline that replaces legacy placeholder values using NULLIF.

2. Explain why converting all zero values into NULL could produce incorrect reports.

3. How would you combine NULLIF and COALESCE to build resilient reporting queries?

---

# Section Summary

In this section, you learned:

- `NULLIF()` compares two expressions.
- If the expressions are equal, it returns NULL.
- Otherwise, it returns the first expression.
- NULLIF is commonly used to normalize placeholder values and prevent divide-by-zero errors.
- It behaves similarly to a simple CASE expression.
- Always understand the business meaning before converting values into NULL.

---

# Coming Up Next

In the next section, we'll study a PostgreSQL and ANSI SQL feature that many developers overlook:

# Section 9

**IS DISTINCT FROM**

You'll learn:

- Why `NULL = NULL` returns UNKNOWN.
- How `IS DISTINCT FROM` treats NULL values.
- How it differs from standard comparison operators.
- Practical PostgreSQL examples.
- Enterprise use cases.
- Performance considerations.
- Interview questions.



# ==========================================================
# Section 9
# IS DISTINCT FROM
# ==========================================================

# Introduction

Throughout this chapter, we have learned an important rule:

```sql
NULL = NULL
```

does **not** return

```
TRUE
```

Instead,

it returns

```
UNKNOWN
```

This creates challenges when comparing nullable columns.

Fortunately, SQL provides a NULL-safe comparison operator called

```
IS DISTINCT FROM
```

Its companion operator is

```
IS NOT DISTINCT FROM
```

These operators treat NULL as a comparable value, making equality checks much easier and more intuitive.

> **Note:** `IS DISTINCT FROM` is part of the SQL standard and is supported by PostgreSQL, Snowflake, DB2, and several other databases. Some databases use different syntax or provide equivalent functionality.

---

# Why Do We Need IS DISTINCT FROM?

Suppose we have two values.

```
NULL

NULL
```

Question

Are they different?

Using

```sql
NULL = NULL
```

SQL says

```
UNKNOWN
```

But in many business situations,

we actually want

```
Not Different
```

This is exactly what

```
IS DISTINCT FROM
```

was designed to solve.

---

# Syntax

## IS DISTINCT FROM

```sql
expression1 IS DISTINCT FROM expression2
```

Returns

```
TRUE
```

if the two expressions are different.

Otherwise,

returns

```
FALSE
```

---

## IS NOT DISTINCT FROM

```sql
expression1 IS NOT DISTINCT FROM expression2
```

Returns

```
TRUE
```

if both expressions represent the same value,

including when **both are NULL**.

---

# Mental Model

Instead of asking

```
Are these equal?
```

ask

```
Are these meaningfully different?
```

Unlike `=`,

this operator understands NULL.

---

# Example 1

```sql
SELECT

10 IS DISTINCT FROM 20;
```

Result

```
TRUE
```

---

# Example 2

```sql
SELECT

10 IS DISTINCT FROM 10;
```

Result

```
FALSE
```

---

# Example 3

```sql
SELECT

NULL IS DISTINCT FROM 10;
```

Result

```
TRUE
```

One value exists.

The other does not.

They are different.

---

# Example 4

```sql
SELECT

NULL IS DISTINCT FROM NULL;
```

Result

```
FALSE
```

Unlike

```sql
NULL = NULL
```

this operator considers two NULL values to be **not distinct**.

---

# IS NOT DISTINCT FROM

Example

```sql
SELECT

NULL IS NOT DISTINCT FROM NULL;
```

Result

```
TRUE
```

Because

both values represent the same state.

---

# Comparison Table

| Expression | Result |
|------------|--------|
| 10 IS DISTINCT FROM 10 | FALSE |
| 10 IS DISTINCT FROM 20 | TRUE |
| NULL IS DISTINCT FROM 10 | TRUE |
| NULL IS DISTINCT FROM NULL | FALSE |

---

| Expression | Result |
|------------|--------|
| 10 IS NOT DISTINCT FROM 10 | TRUE |
| 10 IS NOT DISTINCT FROM 20 | FALSE |
| NULL IS NOT DISTINCT FROM 10 | FALSE |
| NULL IS NOT DISTINCT FROM NULL | TRUE |

---

# Comparing '=' with IS NOT DISTINCT FROM

Standard comparison

```sql
NULL = NULL
```

↓

UNKNOWN

---

NULL-safe comparison

```sql
NULL IS NOT DISTINCT FROM NULL
```

↓

TRUE

This is the major difference.

---

# Execution Trace

Example

```sql
NULL

IS DISTINCT FROM

NULL
```

Execution

```
Expression 1

↓

NULL

↓

Expression 2

↓

NULL

↓

Both NULL?

↓

YES

↓

Not Distinct

↓

FALSE
```

---

# Think Like a Data Engineer

Suppose you are building a Change Data Capture (CDC) pipeline.

Yesterday

| Customer | Phone |
|----------|-------|
| Alice | NULL |

Today

| Customer | Phone |
|----------|-------|
| Alice | NULL |

Has the value changed?

Using

```sql
old_phone <> new_phone
```

Result

```
UNKNOWN
```

Not helpful.

Using

```sql
old_phone IS DISTINCT FROM new_phone
```

Result

```
FALSE
```

Correct.

No change occurred.

This makes `IS DISTINCT FROM` extremely useful for synchronization and data comparison.

---

# Business Meaning Matters

Imagine a customer profile.

Yesterday

```
Email

↓

NULL
```

Today

```
Email

↓

john@example.com
```

These values are clearly different.

```
IS DISTINCT FROM
```

correctly returns

```
TRUE
```

making it ideal for audit logging and ETL change detection.

---

# Real-World Use Cases

## Change Data Capture (CDC)

Detect changed rows.

---

## Slowly Changing Dimensions (SCD)

Compare old and new values.

---

## Data Synchronization

Identify updates between systems.

---

## Audit Tables

Track modified fields.

---

## ETL Validation

Compare staging and warehouse data.

---

# IS DISTINCT FROM vs COALESCE

Some developers write

```sql
COALESCE(col1,'')

=

COALESCE(col2,'')
```

to compare nullable text columns.

Although this sometimes works,

it changes NULL into another value.

Using

```sql
col1

IS NOT DISTINCT FROM

col2
```

is clearer and preserves the original semantics.

---

# Behind the Scenes

Conceptually,

the database evaluates

```sql
IS DISTINCT FROM
```

using logic similar to

```sql
CASE

WHEN value1 IS NULL
AND value2 IS NULL

THEN FALSE

WHEN value1 IS NULL
OR value2 IS NULL

THEN TRUE

ELSE value1 <> value2

END
```

The actual implementation depends on the database engine, but the logical behavior is equivalent.

---

# Performance Notes

`IS DISTINCT FROM` is generally optimized efficiently in PostgreSQL.

For performance-critical workloads,

always verify execution plans rather than assuming identical behavior to other comparison operators.

---

# Best Practices

✅ Use `IS DISTINCT FROM` when comparing nullable values.

✅ Prefer it over complicated NULL-handling logic.

✅ Use it in ETL, CDC, and synchronization pipelines.

---

# Common Mistakes

❌ Using `=` for nullable comparisons.

❌ Replacing NULL with fake values before comparison.

❌ Writing unnecessarily complex CASE expressions for NULL-safe equality.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employee_history
(
    employee_id INT PRIMARY KEY,
    old_salary NUMERIC(10,2),
    new_salary NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employee_history VALUES
(1,50000,50000),

(2,NULL,NULL),

(3,60000,NULL),

(4,NULL,70000),

(5,80000,90000);
```

---

# Exercise 1

Find rows where the salary changed using

```
IS DISTINCT FROM
```

---

# Exercise 2

Find rows where the old and new salary are effectively the same using

```
IS NOT DISTINCT FROM
```

---

# Exercise 3

Rewrite the comparison using CASE.

Compare readability.

---

# Interview Trap

Predict the result.

```sql
SELECT

NULL IS DISTINCT FROM NULL;
```

Answer

```
FALSE
```

---

Predict

```sql
SELECT

NULL IS NOT DISTINCT FROM NULL;
```

Answer

```
TRUE
```

---

# Interview Questions

## Beginner

1. What problem does `IS DISTINCT FROM` solve?

2. How is it different from `=`?

3. What does `NULL IS DISTINCT FROM NULL` return?

---

## Intermediate

1. Why is `IS DISTINCT FROM` useful in ETL pipelines?

2. Compare `IS DISTINCT FROM` with `COALESCE()` for nullable comparisons.

3. Explain when `IS NOT DISTINCT FROM` is preferable to `=`.

---

## Senior

1. Design a CDC process using `IS DISTINCT FROM`.

2. Explain how NULL-safe comparisons improve Slowly Changing Dimension implementations.

3. How would you compare two large datasets containing many nullable columns?

---

# Section Summary

In this section, you learned:

- `IS DISTINCT FROM` provides NULL-safe comparisons.
- `IS NOT DISTINCT FROM` treats two NULL values as equal.
- These operators eliminate many problems caused by standard comparison operators.
- They are especially valuable in ETL, Change Data Capture, auditing, and data synchronization.
- Using these operators often results in simpler and more reliable SQL.

---

# NULL Function Comparison Matrix

After completing the first nine sections, you now understand the core tools for working with NULL.

| Feature | Purpose | Returns | Typical Use Case |
|---------|---------|---------|------------------|
| `IS NULL` | Check if a value is NULL | TRUE/FALSE | Filtering missing values |
| `IS NOT NULL` | Check if a value exists | TRUE/FALSE | Validation |
| `COALESCE()` | Return first non-NULL value | Any data type | Reporting, ETL, calculations |
| `NULLIF()` | Return NULL when two values are equal | First value or NULL | Divide-by-zero prevention, normalization |
| `IS DISTINCT FROM` | NULL-safe inequality | TRUE/FALSE | CDC, auditing, ETL comparisons |
| `IS NOT DISTINCT FROM` | NULL-safe equality | TRUE/FALSE | Synchronization, SCD, data validation |

---

# Coming Up Next

You now understand the core NULL operators and functions.

Next, we begin **Part 2 — NULL in SQL Queries**.

# Section 10

**NULL inside WHERE**

You will learn:

- Why rows disappear unexpectedly.
- How WHERE evaluates TRUE, FALSE, and UNKNOWN.
- Predicate evaluation with NULL.
- Query optimization considerations.
- Enterprise filtering patterns.
- Common production bugs caused by NULL in WHERE clauses.


# ==========================================================
# Part 2 — NULL in SQL Queries
# ==========================================================

# ==========================================================
# Section 10
# NULL inside WHERE
# ==========================================================

# Introduction

The `WHERE` clause is one of the most frequently used parts of a SQL query.

It determines **which rows should be returned**.

Most SQL developers assume the WHERE clause behaves like this:

```
Condition

↓

TRUE

↓

Return Row

--------------------

Condition

↓

FALSE

↓

Discard Row
```

This is only partially correct.

Because SQL supports NULL, the WHERE clause actually evaluates **three possible outcomes**:

```
TRUE

FALSE

UNKNOWN
```

This seemingly small difference is responsible for countless bugs in SQL applications.

Understanding how WHERE interacts with NULL is one of the most important SQL skills.

---

# How WHERE Really Works

The WHERE clause follows one simple rule.

> **Only rows whose condition evaluates to TRUE are returned.**

Rows evaluating to

```
FALSE
```

are discarded.

Rows evaluating to

```
UNKNOWN
```

are **also discarded**.

This is the rule every SQL developer should memorize.

---

# WHERE Evaluation Flow

```
Evaluate Condition

        │

        ▼

 ┌───────────────┐
 │ TRUE ?        │
 └──────┬────────┘
        │
      YES
        │
        ▼
 Return Row

        NO
        │
        ▼

Is Result FALSE?

        │

     YES      NO
      │        │
      ▼        ▼

Discard   UNKNOWN

              │
              ▼

          Discard
```

Notice

Only

```
TRUE
```

returns rows.

---

# Example Table

Suppose we have

| Employee | Salary |
|-----------|--------:|
| Alice | 90000 |
| Bob | 45000 |
| Charlie | NULL |
| David | 120000 |

---

# Example 1

```sql
SELECT *

FROM employees

WHERE salary > 50000;
```

Evaluation

| Employee | Salary | Condition |
|-----------|--------|-----------|
| Alice | 90000 | TRUE |
| Bob | 45000 | FALSE |
| Charlie | NULL | UNKNOWN |
| David | 120000 | TRUE |

Returned Rows

| Employee |
|-----------|
| Alice |
| David |

Charlie disappears.

Not because the row is deleted.

Because

```
UNKNOWN

↓

Not Returned
```

---

# Execution Trace

For Charlie

```
salary

↓

NULL

↓

salary >50000

↓

UNKNOWN

↓

WHERE keeps only TRUE

↓

Row Filtered
```

---

# Think Like a Data Engineer

Suppose your company wants

```
High Salary Employees
```

You write

```sql
WHERE salary>50000
```

Later,

HR complains that

some employees are missing.

Investigation reveals

```
salary

↓

NULL
```

The employees were never excluded intentionally.

The WHERE clause simply filtered UNKNOWN rows.

---

# Example 2

Incorrect Query

```sql
SELECT *

FROM employees

WHERE salary=NULL;
```

Expected

```
Employees having NULL salary.
```

Actual

```
No Rows
```

---

# Why?

Evaluation

```
salary

=

NULL

↓

UNKNOWN

↓

WHERE

↓

Discard
```

---

# Correct Query

```sql
SELECT *

FROM employees

WHERE salary IS NULL;
```

Result

| Employee |
|-----------|
| Charlie |

---

# Wrong SQL vs Correct SQL

❌ Wrong

```sql
WHERE salary=NULL
```

---

✅ Correct

```sql
WHERE salary IS NULL
```

---

❌ Wrong

```sql
WHERE salary<>NULL
```

---

✅ Correct

```sql
WHERE salary IS NOT NULL
```

---

# Example 3

Find employees without bonuses.

```sql
SELECT

employee_name

FROM employees

WHERE bonus IS NULL;
```

Evaluation

```
Bonus Missing?

↓

TRUE

↓

Return Row
```

---

# Combining Conditions

Suppose

```sql
WHERE

department='IT'

AND

salary>50000
```

Employee

| Department | Salary |
|------------|--------|
| IT | NULL |

Evaluation

```
department='IT'

↓

TRUE

salary>50000

↓

UNKNOWN

TRUE

AND

UNKNOWN

↓

UNKNOWN

↓

Discard
```

---

# OR Conditions

Example

```sql
WHERE

department='IT'

OR

salary>50000
```

Employee

| Department | Salary |
|------------|--------|
| IT | NULL |

Evaluation

```
department='IT'

↓

TRUE

OR

UNKNOWN

↓

TRUE

↓

Return Row
```

Notice

The result changes because OR follows different truth-table rules.

---

# NULL Inside BETWEEN

```sql
WHERE

salary BETWEEN

50000

AND

100000
```

Employee

```
salary=NULL
```

Evaluation

```
UNKNOWN

↓

Discard
```

---

# NULL Inside IN

```sql
WHERE

salary IN

(50000,60000)
```

Salary

↓

NULL

Evaluation

```
UNKNOWN

↓

Discard
```

---

# NULL Inside LIKE

```sql
WHERE

email LIKE

'%gmail.com'
```

Email

↓

NULL

Evaluation

```
UNKNOWN

↓

Discard
```

---

# Business Meaning Matters

Imagine

```
delivery_date IS NULL
```

Business meaning

```
Order not delivered yet.
```

Now imagine

```sql
WHERE

delivery_date<'2026-01-01'
```

Undelivered orders disappear.

Not because SQL is wrong.

Because

```
NULL<'2026-01-01'

↓

UNKNOWN

↓

Discard
```

Understanding business meaning prevents incorrect reports.

---

# Common Production Bug

A retail company generated a report of overdue deliveries.

Query

```sql
SELECT *

FROM orders

WHERE delivery_date<CURRENT_DATE;
```

Management expected

undelivered orders to appear.

Instead,

they disappeared.

Reason

```
delivery_date=NULL

↓

UNKNOWN

↓

Filtered
```

Correct solution

```sql
SELECT *

FROM orders

WHERE

delivery_date<CURRENT_DATE

OR

delivery_date IS NULL;
```

Now

both

- overdue deliveries
- undelivered orders

appear.

---

# Behind the Scenes

The optimizer evaluates the WHERE predicate for every candidate row.

Conceptually

```
Read Row

↓

Evaluate Predicate

↓

TRUE?

↓

Return

↓

FALSE

or

UNKNOWN

↓

Discard
```

The execution engine never treats UNKNOWN as TRUE.

---

# Performance Notes

Filtering on nullable columns is common.

Some databases maintain statistics describing the number of NULL values.

These statistics help the optimizer estimate

- selectivity
- row counts
- execution cost

Good statistics often lead to better execution plans.

---

# Best Practices

✅ Always remember that WHERE returns only TRUE rows.

✅ Use `IS NULL` and `IS NOT NULL` for NULL checks.

✅ Test queries using NULL values.

✅ Consider UNKNOWN when combining conditions with AND and OR.

---

# Common Mistakes

❌ Using

```sql
WHERE column=NULL
```

---

❌ Forgetting that UNKNOWN rows are filtered.

---

❌ Assuming NULL behaves like zero.

---

❌ Ignoring NULL during testing.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    salary NUMERIC(10,2),
    bonus NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT',90000,5000),

(2,'Bob','HR',45000,NULL),

(3,'Charlie','IT',NULL,3000),

(4,'David','Finance',120000,NULL),

(5,'Emma','IT',NULL,NULL);
```

---

# Exercise 1

Predict the output.

```sql
SELECT *

FROM employees

WHERE salary>50000;
```

---

# Exercise 2

Find employees whose salary is unknown.

---

# Exercise 3

Find employees whose bonus has been calculated.

---

# Exercise 4

Return employees who either

- belong to IT

or

- have an unknown salary.

---

# Exercise 5

Rewrite

```sql
WHERE salary=NULL
```

correctly.

---

# Interview Trap

What does this query return?

```sql
SELECT *

FROM employees

WHERE NULL;
```

Answer

No rows.

Because

```
WHERE

↓

UNKNOWN

↓

No TRUE rows
```

---

# Interview Questions

## Beginner

1. Which rows does the WHERE clause return?

2. Why does `WHERE salary = NULL` fail?

3. Why are NULL rows filtered?

---

## Intermediate

1. Explain the difference between FALSE and UNKNOWN in the WHERE clause.

2. Why does `salary > 50000` exclude NULL salaries?

3. How does `AND` behave when one condition evaluates to UNKNOWN?

---

## Senior

1. Describe a production issue caused by misunderstanding NULL in WHERE.

2. How would you validate filtering logic in an ETL pipeline containing nullable columns?

3. How do optimizer statistics on NULL values influence query planning?

---

# Section Summary

In this section, you learned:

- The WHERE clause returns only rows where the condition evaluates to TRUE.
- Rows evaluating to FALSE or UNKNOWN are filtered out.
- Comparisons involving NULL generally produce UNKNOWN.
- `IS NULL` and `IS NOT NULL` are the correct predicates for filtering NULL values.
- Understanding how WHERE handles UNKNOWN is essential for writing correct SQL and avoiding production reporting errors.

---

# Coming Up Next

In the next section, we'll explore another subtle but important topic:

# Section 11

**NULL inside CASE**

You'll learn:

- How CASE evaluates NULL.
- WHEN NULL vs WHEN IS NULL.
- ELSE behavior with NULL.
- Short-circuit evaluation.
- Enterprise ETL patterns.
- Common interview questions.


# ==========================================================
# Section 11
# NULL inside CASE
# ==========================================================

# Introduction

The CASE expression is one of SQL's most powerful conditional constructs.

It allows us to perform different actions based on different conditions.

However,

when NULL enters a CASE expression,

many developers become confused.

Questions such as

- Why doesn't `WHEN NULL` work?
- Should I use `WHEN NULL` or `WHEN IS NULL`?
- What happens if ELSE is omitted?
- Does CASE use Three-Valued Logic?

are very common.

Understanding how CASE evaluates NULL is essential because CASE is heavily used in

- ETL pipelines
- Data Warehouses
- BI dashboards
- Data Quality Rules
- Reporting
- Production SQL

---

# How CASE Evaluates Conditions

Recall from Chapter 33 that SQL supports two types of CASE.

## Simple CASE

```sql
CASE expression

WHEN value1 THEN ...

WHEN value2 THEN ...

ELSE ...

END
```

---

## Searched CASE

```sql
CASE

WHEN condition1 THEN ...

WHEN condition2 THEN ...

ELSE ...

END
```

Only one of these works correctly with NULL.

---

# The Common Beginner Mistake

Suppose

| Employee | Bonus |
|-----------|-------|
| Alice | 5000 |
| Bob | NULL |

A beginner writes

```sql
SELECT

employee_name,

CASE bonus

WHEN NULL

THEN 'Pending'

ELSE 'Calculated'

END

FROM employees;
```

Expected

```
Bob

↓

Pending
```

Actual

```
Calculated
```

Why?

Because

```
CASE bonus

WHEN NULL
```

is equivalent to

```sql
bonus = NULL
```

And

```
bonus = NULL

↓

UNKNOWN
```

Therefore,

the WHEN clause never matches.

---

# Execution Trace

```
bonus

↓

NULL

↓

Compare with NULL

↓

bonus = NULL

↓

UNKNOWN

↓

WHEN Failed

↓

ELSE Executed
```

---

# Correct Solution

Use a searched CASE.

```sql
SELECT

employee_name,

CASE

WHEN bonus IS NULL

THEN 'Pending'

ELSE 'Calculated'

END

FROM employees;
```

Now

```
bonus

↓

NULL

↓

IS NULL

↓

TRUE

↓

Pending
```

---

# Wrong SQL vs Correct SQL

❌ Wrong

```sql
CASE bonus

WHEN NULL

THEN 'Pending'
```

---

✅ Correct

```sql
CASE

WHEN bonus IS NULL

THEN 'Pending'
```

---

# Why Does This Happen?

Simple CASE performs equality comparisons.

Conceptually

```sql
CASE bonus

WHEN 100

THEN ...
```

becomes

```sql
bonus = 100
```

Similarly

```sql
WHEN NULL
```

becomes

```sql
bonus = NULL
```

Which evaluates to

```
UNKNOWN
```

Therefore,

it never matches.

---

# Example 1

Table

| Bonus |
|--------|
|5000|
|NULL|
|7000|

Query

```sql
SELECT

CASE

WHEN bonus IS NULL

THEN 'Missing'

ELSE 'Available'

END

FROM employees;
```

Result

| Bonus | Status |
|--------|---------|
|5000|Available|
|NULL|Missing|
|7000|Available|

---

# Example 2

Classifying Orders

```sql
SELECT

CASE

WHEN delivery_date IS NULL

THEN 'In Transit'

ELSE 'Delivered'

END

FROM orders;
```

Business Meaning

```
NULL

↓

Order not delivered yet.
```

---

# Multiple NULL Checks

Suppose

| Email | Phone |
|-------|-------|
|NULL|NULL|
|abc@test.com|NULL|
|NULL|9876543210|

Query

```sql
CASE

WHEN email IS NULL

AND

phone IS NULL

THEN 'Incomplete'

WHEN email IS NULL

OR

phone IS NULL

THEN 'Partial'

ELSE 'Complete'

END
```

This is a common ETL validation pattern.

---

# ELSE and NULL

Suppose

```sql
CASE

WHEN salary>100000

THEN 'Executive'

END
```

Employee

```
salary

↓

NULL
```

Evaluation

```
salary>100000

↓

UNKNOWN

↓

WHEN Failed

↓

No ELSE

↓

Return NULL
```

Notice

CASE itself returns NULL.

---

# Execution Flow

```
CASE

↓

Evaluate WHEN

↓

TRUE ?

↓

YES

↓

Return Result

↓

NO

↓

Next WHEN

↓

No Match?

↓

ELSE Exists?

↓

YES

↓

Return ELSE

↓

NO

↓

Return NULL
```

---

# Think Like a Data Engineer

Suppose your ETL pipeline classifies customer records.

Business Rule

```
Email Missing

↓

Incomplete Record
```

Implementation

```sql
CASE

WHEN email IS NULL

THEN 'Incomplete'

ELSE 'Complete'

END
```

Using

```sql
WHEN NULL
```

would silently misclassify thousands of records.

---

# Business Meaning Matters

Suppose

```
termination_date IS NULL
```

Business meaning

```
Employee still active.
```

CASE can convert technical data into business-friendly labels.

```sql
CASE

WHEN termination_date IS NULL

THEN 'Active'

ELSE 'Former Employee'

END
```

This is one of the most common reporting patterns.

---

# CASE with COALESCE

Instead of

```sql
CASE

WHEN bonus IS NULL

THEN 0

ELSE bonus

END
```

you can often write

```sql
COALESCE(bonus,0)
```

Choose the simpler solution when the logic is straightforward.

---

# CASE with NULLIF

Example

```sql
CASE

WHEN NULLIF(discount,0) IS NULL

THEN 'No Discount'

ELSE 'Discount Applied'

END
```

This combines two NULL-related functions elegantly.

---

# Behind the Scenes

A searched CASE evaluates each WHEN condition independently.

If a condition evaluates to

```
TRUE
```

the corresponding THEN expression is returned.

If a condition evaluates to

```
FALSE

or

UNKNOWN
```

CASE proceeds to the next WHEN.

Only a TRUE condition stops evaluation.

---

# Performance Notes

CASE expressions are generally inexpensive.

However,

avoid repeating identical NULL checks multiple times.

Instead of

```sql
WHEN email IS NULL ...

WHEN email IS NULL ...
```

evaluate the condition once where possible.

Keep CASE expressions readable and maintainable.

---

# Best Practices

✅ Use searched CASE when testing NULL.

✅ Always use `IS NULL` or `IS NOT NULL`.

✅ Include ELSE whenever appropriate.

✅ Keep CASE expressions simple.

---

# Common Mistakes

❌ Using

```sql
WHEN NULL
```

inside a simple CASE.

---

❌ Omitting ELSE unintentionally.

---

❌ Repeating complex NULL checks.

---

❌ Assuming UNKNOWN behaves like FALSE.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE orders
(
    order_id INT PRIMARY KEY,
    customer_name VARCHAR(50),
    delivery_date DATE,
    payment_date DATE
);
```

---

## Insert Sample Data

```sql
INSERT INTO orders VALUES
(101,'Alice','2026-01-05','2026-01-02'),

(102,'Bob',NULL,'2026-01-03'),

(103,'Charlie',NULL,NULL),

(104,'David','2026-01-08','2026-01-04');
```

---

# Exercise 1

Display

```
Delivered

or

In Transit
```

based on

```
delivery_date
```

---

# Exercise 2

Display

```
Payment Pending
```

if

```
payment_date IS NULL
```

---

# Exercise 3

Classify orders as

- Complete
- Partially Complete
- Incomplete

based on

```
delivery_date

payment_date
```

---

# Interview Trap

Predict the output.

```sql
SELECT

CASE NULL

WHEN NULL

THEN 'Matched'

ELSE 'Not Matched'

END;
```

Answer

```
Not Matched
```

Reason

```
NULL = NULL

↓

UNKNOWN

↓

WHEN Fails

↓

ELSE Executes
```

---

# Interview Questions

## Beginner

1. Why does `WHEN NULL` not work?

2. Which CASE type should be used for NULL checks?

3. What happens if ELSE is omitted?

---

## Intermediate

1. Explain the difference between Simple CASE and Searched CASE with NULL values.

2. Why does CASE continue after UNKNOWN?

3. When is COALESCE a better choice than CASE?

---

## Senior

1. Design an ETL transformation that classifies records based on multiple NULL checks.

2. How would you review CASE expressions for NULL-related bugs during a code review?

3. Explain how CASE evaluation interacts with Three-Valued Logic.

---

# Section Summary

In this section, you learned:

- Simple CASE cannot reliably match NULL because it performs equality comparisons.
- `WHEN NULL` is effectively `= NULL`, which evaluates to UNKNOWN.
- Searched CASE with `IS NULL` is the correct approach for testing NULL values.
- CASE continues evaluating WHEN clauses until one evaluates to TRUE.
- If no WHEN matches and ELSE is omitted, CASE returns NULL.
- Understanding NULL inside CASE helps build reliable ETL transformations, reports, and business classifications.

---

# Coming Up Next

Next, we'll explore another area where NULL often surprises SQL developers:

# Section 12

**NULL inside ORDER BY**

You'll learn:

- How NULL values are sorted.
- `NULLS FIRST` and `NULLS LAST`.
- PostgreSQL default behavior.
- Differences across SQL databases.
- Performance considerations.
- Enterprise reporting examples.


# ==========================================================
# Section 12
# NULL inside ORDER BY
# ==========================================================

# Introduction

Sorting data is one of the most common operations in SQL.

We use the `ORDER BY` clause to arrange rows in ascending or descending order.

However, when a column contains NULL values, an important question arises:

> **Where should NULL values appear?**

Should they appear

- At the beginning?
- At the end?
- Be ignored?

Different database systems answer this question differently.

Understanding NULL sorting is important because it affects

- Reports
- Dashboards
- ETL validation
- Pagination
- User interfaces
- Analytical queries

---

# How ORDER BY Works

Normally,

sorting is straightforward.

Example

| Salary |
|---------|
|30000|
|50000|
|70000|

Ascending

```
30000

↓

50000

↓

70000
```

Descending

```
70000

↓

50000

↓

30000
```

But what happens when one value is NULL?

---

# Example Table

| Employee | Salary |
|-----------|--------:|
| Alice | 90000 |
| Bob | NULL |
| Charlie | 45000 |
| David | 120000 |
| Emma | NULL |

---

# The Important Question

Ascending Order

Should the result be

```
NULL
NULL
45000
90000
120000
```

or

```
45000
90000
120000
NULL
NULL
```

SQL databases differ.

---

# PostgreSQL Default Behavior

## ORDER BY ASC

```sql
SELECT

employee_name,
salary

FROM employees

ORDER BY salary ASC;
```

Result

| Employee | Salary |
|-----------|--------:|
| Charlie | 45000 |
| Alice | 90000 |
| David |120000 |
| Bob | NULL |
| Emma | NULL |

PostgreSQL treats NULL as larger than any non-NULL value when sorting ascending.

---

## ORDER BY DESC

```sql
ORDER BY salary DESC;
```

Result

| Employee | Salary |
|-----------|--------:|
| Bob | NULL |
| Emma | NULL |
| David |120000 |
| Alice |90000 |
| Charlie |45000 |

NULL values appear first.

---

# Explicit Control

Instead of relying on defaults,

PostgreSQL allows explicit control.

## NULLS FIRST

```sql
SELECT

employee_name,
salary

FROM employees

ORDER BY salary ASC NULLS FIRST;
```

Result

| Employee | Salary |
|-----------|--------:|
| Bob | NULL |
| Emma | NULL |
| Charlie |45000 |
| Alice |90000 |
| David |120000 |

---

## NULLS LAST

```sql
SELECT

employee_name,
salary

FROM employees

ORDER BY salary DESC NULLS LAST;
```

Result

| Employee | Salary |
|-----------|--------:|
| David |120000 |
| Alice |90000 |
| Charlie |45000 |
| Bob |NULL |
| Emma |NULL |

---

# Execution Trace

```
Read Rows

↓

Sort Key

↓

salary

↓

NULL?

↓

Apply ORDER BY Rules

↓

Return Sorted Rows
```

---

# Think Like a Data Engineer

Suppose your company displays

```
Upcoming Deliveries
```

Query

```sql
ORDER BY

delivery_date;
```

Some orders have

```
delivery_date = NULL
```

Business Meaning

```
Not Delivered Yet
```

Should undelivered orders appear first?

Or last?

The answer depends on the business requirement.

Never rely on database defaults without confirming the expected behavior.

---

# Business Meaning Matters

Suppose

```
termination_date
```

contains NULL.

Business Meaning

```
Employee Still Active
```

Report Requirement

```
Show Active Employees First
```

Solution

```sql
ORDER BY

termination_date

NULLS FIRST;
```

The technical sorting matches the business expectation.

---

# Dialect Differences

Different databases sort NULL differently by default.

| Database | ASC Default | DESC Default | Supports `NULLS FIRST/LAST` |
|----------|-------------|--------------|-----------------------------|
| PostgreSQL | NULLS LAST | NULLS FIRST | ✅ Yes |
| Oracle | NULLS LAST | NULLS FIRST | ✅ Yes |
| SQL Server | NULLS FIRST | NULLS LAST | ❌ No (use expressions) |
| MySQL | NULLS FIRST | NULLS LAST | ❌ No (use expressions) |
| Snowflake | NULLS FIRST* | NULLS LAST* | ✅ Yes |
| Spark SQL | Configurable / version-dependent | Configurable | ✅ Yes |

> **Note:** SQL dialect behavior can vary by version and configuration. Always verify the behavior for the database platform you are using.

---

# Ordering NULL with CASE

If your database does not support

```
NULLS FIRST

NULLS LAST
```

you can simulate the behavior.

Example

```sql
ORDER BY

CASE

WHEN salary IS NULL

THEN 0

ELSE 1

END,

salary;
```

This places NULL values before non-NULL values.

---

# Ordering with COALESCE

Another approach

```sql
ORDER BY

COALESCE(salary,999999999);
```

Be careful.

This assumes

```
999999999
```

is never a real salary.

Using unrealistic placeholder values can be risky.

---

# Real-World Example

Hospital Dashboard

Requirement

```
Patients waiting for surgery

↓

First
```

Column

```
surgery_date
```

Meaning

```
NULL

↓

Surgery not yet scheduled.
```

Ordering

```sql
ORDER BY

surgery_date

NULLS FIRST;
```

Immediately highlights pending cases.

---

# Pagination Considerations

Suppose an application displays

```
Top 100 Customers
```

using

```sql
ORDER BY

last_purchase_date DESC
LIMIT 100;
```

If NULL ordering is not considered,

customers with unknown purchase dates may unexpectedly appear on the first page.

Explicit NULL handling makes pagination predictable.

---

# Behind the Scenes

During sorting,

the database assigns every row a sort key.

For nullable columns,

the database must decide where NULL belongs in that ordering.

The exact implementation differs by database engine,

but the concept remains the same:

```
Determine Sort Key

↓

Apply NULL Ordering Rules

↓

Sort

↓

Return Result
```

---

# Performance Notes

Sorting large datasets is expensive.

Adding `NULLS FIRST` or `NULLS LAST` usually has minimal overhead compared to the sort itself.

However,

sorting on expressions like

```sql
COALESCE()

CASE
```

may prevent efficient use of indexes for ordering in some situations.

Always examine the execution plan for performance-critical queries.

---

# Best Practices

✅ Specify `NULLS FIRST` or `NULLS LAST` explicitly when supported.

✅ Understand your database's default behavior.

✅ Match NULL ordering with business requirements.

✅ Test reports containing NULL values.

---

# Common Mistakes

❌ Assuming all databases sort NULL the same way.

❌ Relying on default ordering.

❌ Using unrealistic placeholder values with COALESCE.

❌ Forgetting NULL ordering during pagination.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    salary NUMERIC(10,2),
    termination_date DATE
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice',90000,NULL),

(2,'Bob',NULL,'2025-06-01'),

(3,'Charlie',45000,NULL),

(4,'David',120000,'2024-12-15'),

(5,'Emma',NULL,NULL);
```

---

# Exercise 1

Sort employees by salary in ascending order.

Observe where NULL values appear.

---

# Exercise 2

Sort employees by salary using

```
NULLS FIRST
```

---

# Exercise 3

Sort employees by salary descending using

```
NULLS LAST
```

---

# Exercise 4

Display active employees (NULL termination date) before former employees.

---

# Exercise 5

Rewrite the sorting logic using a CASE expression instead of `NULLS FIRST`.

---

# Interview Trap

Predict the result in PostgreSQL.

```sql
SELECT

employee_name,
salary

FROM employees

ORDER BY salary ASC;
```

Many candidates expect NULL values first.

**Correct Answer**

By default,

PostgreSQL places NULL values **last** in ascending order.

---

# Interview Questions

## Beginner

1. How does PostgreSQL sort NULL values by default in ascending order?

2. What does `NULLS FIRST` do?

3. Why is explicit NULL ordering useful?

---

## Intermediate

1. Compare PostgreSQL and SQL Server default NULL ordering.

2. How can CASE simulate `NULLS FIRST`?

3. Why can COALESCE-based sorting be risky?

---

## Senior

1. Design a reporting strategy that keeps active records at the top using NULL ordering.

2. How does NULL ordering affect pagination and user experience?

3. When might sorting expressions reduce index efficiency?

---

# Section Summary

In this section, you learned:

- NULL values participate in sorting but their position depends on the database.
- PostgreSQL sorts NULL values last for ascending order and first for descending order by default.
- `NULLS FIRST` and `NULLS LAST` provide explicit control over NULL placement.
- Different SQL dialects have different default behaviors.
- Explicit NULL ordering improves report accuracy, portability, and maintainability.

---

# Coming Up Next

The next section explores another subtle topic:

# Section 13

**NULL inside GROUP BY**

You'll learn:

- Do NULL values form a group?
- How GROUP BY treats NULL.
- Aggregate behavior with NULL groups.
- Reporting examples.
- Data warehouse implications.
- Enterprise interview questions.

# ==========================================================
# Section 13
# NULL inside GROUP BY
# ==========================================================

# Introduction

The `GROUP BY` clause groups rows that have the same value.

For example,

suppose we have employees from different departments.

| Employee | Department |
|-----------|------------|
| Alice | IT |
| Bob | HR |
| Charlie | IT |

Using

```sql
GROUP BY department
```

creates two groups.

```
IT

↓

Alice
Charlie

----------------

HR

↓

Bob
```

But what happens when the department is NULL?

Does SQL

- Ignore the row?
- Create multiple NULL groups?
- Create one NULL group?

The answer is extremely important for reporting and analytics.

---

# The Fundamental Rule

Unlike the `WHERE` clause,

the `GROUP BY` clause **does not discard NULL values**.

Instead,

all NULL values are placed into **one single group**.

This behavior is defined by the SQL standard and is supported by PostgreSQL and most relational databases.

---

# Example Table

| Employee | Department |
|-----------|------------|
| Alice | IT |
| Bob | HR |
| Charlie | NULL |
| David | IT |
| Emma | NULL |
| Frank | HR |
| Grace | NULL |

---

# Query

```sql
SELECT

department,

COUNT(*)

FROM employees

GROUP BY department;
```

Result

| Department | Count |
|------------|------:|
| IT | 2 |
| HR | 2 |
| NULL | 3 |

Notice

All NULL values become

```
One Group
```

Not

```
Three Groups
```

---

# Visual Representation

Input

```
IT

HR

NULL

IT

NULL

HR

NULL
```

Grouping

```
IT

↓

Alice
David

----------------

HR

↓

Bob
Frank

----------------

NULL

↓

Charlie
Emma
Grace
```

---

# Why Does GROUP BY Treat NULL This Way?

This is one of SQL's special rules.

Earlier in this chapter,

we learned

```sql
NULL = NULL
```

↓

UNKNOWN

Yet

```
GROUP BY
```

places all NULL values into one group.

This is **not** because NULL values are considered equal.

Instead,

the SQL standard defines that rows with NULL in the grouping column belong to the same grouping bucket.

Think of GROUP BY as organizing data into categories rather than performing equality comparisons.

---

# Think Like a Data Engineer

Suppose you work for a hospital.

Patients are grouped by

```
Blood Group
```

Some patients have not yet been tested.

Table

| Patient | Blood Group |
|----------|-------------|
| Alice | A+ |
| Bob | NULL |
| Charlie | O+ |
| David | NULL |

Management asks

> "How many patients still have an unknown blood group?"

The query

```sql
SELECT

blood_group,

COUNT(*)

FROM patients

GROUP BY blood_group;
```

automatically creates a single NULL group.

This makes reporting straightforward.

---

# GROUP BY with COUNT(*)

Example

```sql
SELECT

department,

COUNT(*)

FROM employees

GROUP BY department;
```

Result

| Department | COUNT(*) |
|------------|----------|
| IT | 2 |
| HR | 2 |
| NULL | 3 |

Remember

`COUNT(*)` counts every row,

including rows where the grouping column is NULL.

---

# GROUP BY with COUNT(column)

Example

```sql
SELECT

department,

COUNT(department)

FROM employees

GROUP BY department;
```

Result

| Department | COUNT(department) |
|------------|------------------:|
| IT | 2 |
| HR | 2 |
| NULL | 0 |

Why?

Because

```
COUNT(column)
```

ignores NULL values.

The NULL group still exists,

but the aggregate function does not count NULL values.

This distinction is extremely important.

---

# GROUP BY with SUM

Suppose

| Department | Salary |
|------------|-------:|
| IT | 90000 |
| IT | 70000 |
| NULL | 50000 |
| NULL | NULL |

Query

```sql
SELECT

department,

SUM(salary)

FROM employees

GROUP BY department;
```

Result

| Department | SUM |
|------------|----:|
| IT |160000|
| NULL |50000|

The NULL salary is ignored,

but the NULL department group still exists.

---

# GROUP BY with AVG

```sql
SELECT

department,

AVG(salary)

FROM employees

GROUP BY department;
```

Average is calculated using only non-NULL salary values within each group.

---

# GROUP BY with Multiple Columns

Suppose

| Department | City |
|------------|------|
| IT | Mumbai |
| IT | NULL |
| NULL | Mumbai |
| NULL | NULL |

Query

```sql
SELECT

department,
city,
COUNT(*)

FROM employees

GROUP BY
department,
city;
```

Possible Groups

```
IT
Mumbai

---------------

IT
NULL

---------------

NULL
Mumbai

---------------

NULL
NULL
```

Each unique combination forms its own group.

---

# Replacing NULL Labels

Reports often should not display

```
NULL
```

Instead

```
Unknown Department
```

Query

```sql
SELECT

COALESCE(department,'Unknown'),

COUNT(*)

FROM employees

GROUP BY department;
```

Notice

We group by the original column,

but display a friendlier label.

---

# Business Meaning Matters

Suppose

```
department = NULL
```

This could mean

- Employee not assigned yet.
- Department information missing.
- ETL failure.
- Contractor not linked to a department.

Although GROUP BY creates one NULL group,

business users should understand what that group actually represents.

---

# SQL Standard vs Database Behavior

According to the SQL standard,

rows with NULL in the grouping column are grouped together.

This behavior is consistent across major relational databases including

- PostgreSQL
- SQL Server
- Oracle
- MySQL
- Snowflake

The presentation of NULL may differ,

but the grouping behavior is generally the same.

---

# Behind the Scenes

Conceptually,

GROUP BY works like this.

```
Read Row

↓

Determine Group Key

↓

department

↓

NULL?

↓

Create or Reuse NULL Group

↓

Update Aggregate
```

Notice

The engine does not compare

```
NULL = NULL
```

Instead,

it assigns rows to grouping buckets.

---

# Performance Notes

Grouping on nullable columns is common in analytical workloads.

Database optimizers maintain statistics about NULL values,

which help estimate

- Number of groups
- Cardinality
- Memory requirements
- Execution strategy

Good statistics improve aggregation performance.

---

# Best Practices

✅ Expect NULL values to form one group.

✅ Use `COALESCE()` for user-friendly report labels.

✅ Understand the difference between `COUNT(*)` and `COUNT(column)`.

✅ Validate the business meaning of NULL groups.

---

# Common Mistakes

❌ Assuming NULL rows are ignored by GROUP BY.

❌ Confusing GROUP BY behavior with `NULL = NULL`.

❌ Forgetting that `COUNT(column)` ignores NULL values.

❌ Displaying raw NULL values in business reports.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    salary NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT',90000),

(2,'Bob','HR',60000),

(3,'Charlie',NULL,50000),

(4,'David','IT',70000),

(5,'Emma',NULL,NULL),

(6,'Frank','HR',65000),

(7,'Grace',NULL,55000);
```

---

# Exercise 1

Count employees in each department.

---

# Exercise 2

Replace NULL department names with

```
'Unknown Department'
```

using COALESCE.

---

# Exercise 3

Compare

```sql
COUNT(*)
```

and

```sql
COUNT(department)
```

Explain why the results differ.

---

# Exercise 4

Calculate the average salary by department.

Observe how NULL salaries affect the result.

---

# Exercise 5

Group by

```
department,
salary
```

Predict how NULL combinations are grouped.

---

# Interview Trap

Predict the output.

```sql
SELECT

department,

COUNT(*)

FROM employees

GROUP BY department;
```

Many candidates answer

> NULL rows are ignored.

Correct Answer

All NULL department values form **one group**.

---

# Interview Questions

## Beginner

1. Does GROUP BY ignore NULL values?

2. How many NULL groups are created?

3. Why is GROUP BY different from `NULL = NULL`?

---

## Intermediate

1. Explain the difference between `COUNT(*)` and `COUNT(column)` inside NULL groups.

2. How can COALESCE improve grouped reports?

3. How does GROUP BY handle multiple nullable columns?

---

## Senior

1. Explain why GROUP BY groups NULL values even though `NULL = NULL` returns UNKNOWN.

2. How would you design analytical reports containing large NULL groups?

3. How do optimizer statistics influence grouping performance on nullable columns?

---

# Section Summary

In this section, you learned:

- GROUP BY does **not** ignore NULL values.
- All NULL values in a grouping column form a **single group**.
- This behavior differs from comparison operators because GROUP BY creates grouping buckets rather than evaluating equality.
- `COUNT(*)` counts every row, while `COUNT(column)` ignores NULL values.
- `COALESCE()` is commonly used to display meaningful labels instead of NULL in grouped reports.

---

# Coming Up Next

The next section explores another subtle interaction between NULL and aggregation:

# Section 14

**NULL inside HAVING**

You'll learn:

- How HAVING filters grouped data containing NULL values.
- The interaction between HAVING, aggregates, and Three-Valued Logic.
- Common reporting mistakes.
- Enterprise dashboard examples.
- Performance considerations.
- Interview questions.


# ==========================================================
# Section 14
# NULL inside HAVING
# ==========================================================

# Introduction

In the previous section, we learned that

```
GROUP BY

↓

Creates Groups
```

The next logical step is filtering those groups.

SQL provides the

```
HAVING
```

clause for this purpose.

Many beginners ask

- Does HAVING ignore NULL?
- Does HAVING use Three-Valued Logic?
- Can HAVING use IS NULL?
- How do aggregates behave with NULL?

This section answers these questions from both an SQL and Data Engineering perspective.

---

# Logical Query Processing Order

Before understanding HAVING,

remember the logical execution order of a SQL query.

```
FROM

↓

WHERE

↓

GROUP BY

↓

HAVING

↓

SELECT

↓

ORDER BY
```

Notice

HAVING executes **after** grouping.

This means

HAVING filters

```
Groups

NOT

Individual Rows
```

---

# WHERE vs HAVING

| WHERE | HAVING |
|---------|---------|
| Filters rows | Filters groups |
| Executes before GROUP BY | Executes after GROUP BY |
| Cannot use aggregate functions (normally) | Designed for aggregate functions |
| Affects rows entering groups | Affects groups returned |

---

# Example Table

| Employee | Department | Salary |
|-----------|------------|-------:|
| Alice | IT |90000|
| Bob | IT |NULL|
| Charlie | HR |50000|
| David | HR |60000|
| Emma | NULL |70000|
| Frank | NULL |NULL|

---

# Example 1

```sql
SELECT

department,

COUNT(*)

FROM employees

GROUP BY department

HAVING COUNT(*)>=2;
```

Result

| Department | Employees |
|------------|----------:|
| IT |2|
| HR |2|
| NULL |2|

The NULL department group is treated exactly like any other group.

---

# Execution Pipeline

```
Read Rows

↓

WHERE

↓

GROUP BY

↓

Create NULL Group

↓

Calculate COUNT

↓

HAVING

↓

Return Qualified Groups
```

---

# Example 2

```sql
SELECT

department,

AVG(salary)

FROM employees

GROUP BY department

HAVING AVG(salary)>60000;
```

Evaluation

| Department | AVG Salary | HAVING |
|------------|-----------:|---------|
| IT |90000|TRUE|
| HR |55000|FALSE|
| NULL |70000|TRUE|

Returned

```
IT

NULL
```

Notice

The NULL department group is not ignored.

---

# Aggregate Functions Ignore NULL

Remember

```
AVG()

SUM()

MIN()

MAX()
```

ignore NULL values.

For

```
Department=NULL
```

Salary values

```
70000

NULL
```

Average

```
70000
```

Only non-NULL salaries participate.

---

# HAVING with COUNT(column)

Query

```sql
SELECT

department,

COUNT(salary)

FROM employees

GROUP BY department

HAVING COUNT(salary)>1;
```

Evaluation

| Department | COUNT(salary) |
|------------|--------------:|
| IT |1|
| HR |2|
| NULL |1|

Result

```
HR
```

Notice

NULL salary values are ignored,

even though the NULL department group still exists.

---

# HAVING with COUNT(*)

```sql
HAVING COUNT(*)>1
```

Evaluation

| Department | COUNT(*) |
|------------|----------:|
| IT |2|
| HR |2|
| NULL |2|

Result

```
All Groups
```

COUNT(*) counts rows,

not values.

---

# HAVING with IS NULL

Suppose we want groups where

the department itself is NULL.

Query

```sql
SELECT

department,

COUNT(*)

FROM employees

GROUP BY department

HAVING department IS NULL;
```

Result

| Department | Count |
|------------|------:|
| NULL |2|

Notice

HAVING can evaluate NULL conditions directly.

---

# Think Like a Data Engineer

Suppose a warehouse contains millions of sales records.

Business asks

> "Show product categories with more than 100 sales."

Some products have

```
Category=NULL
```

These products still belong to a valid NULL group.

HAVING evaluates that group exactly like every other category.

Understanding this prevents missing categories in reports.

---

# Business Meaning Matters

Suppose

```
department=NULL
```

Business meaning

```
Department Not Assigned
```

Query

```sql
GROUP BY department

HAVING COUNT(*)>10
```

The result may show

```
NULL

↓

150 Employees
```

This is not a database problem.

It is valuable business information indicating many employees have no assigned department.

---

# HAVING with Multiple Conditions

Example

```sql
HAVING

COUNT(*)>5

AND

AVG(salary)>50000
```

Evaluation

```
COUNT

↓

TRUE

AVG

↓

UNKNOWN ?

↓

No

↓

TRUE

AND

TRUE

↓

TRUE
```

If one aggregate expression evaluates to UNKNOWN,

Three-Valued Logic still applies.

---

# HAVING and UNKNOWN

Suppose

```sql
HAVING

AVG(bonus)>5000
```

Group

```
Bonus

↓

NULL

NULL

NULL
```

Average

↓

NULL

Comparison

```
NULL>5000

↓

UNKNOWN
```

HAVING keeps only

```
TRUE
```

Therefore,

this group is filtered out.

---

# Execution Trace

```
Group Created

↓

AVG(bonus)

↓

NULL

↓

NULL>5000

↓

UNKNOWN

↓

HAVING keeps only TRUE

↓

Group Removed
```

---

# SQL Standard vs Database Behavior

The SQL standard specifies that HAVING evaluates search conditions using Three-Valued Logic.

Therefore

```
TRUE

↓

Keep Group

FALSE

↓

Discard Group

UNKNOWN

↓

Discard Group
```

This behavior is consistent across PostgreSQL, SQL Server, Oracle, MySQL, and Snowflake.

---

# Behind the Scenes

Conceptually

HAVING executes like this.

```
Read Groups

↓

Calculate Aggregates

↓

Evaluate HAVING Predicate

↓

TRUE ?

↓

Return Group

↓

FALSE / UNKNOWN

↓

Discard Group
```

---

# Performance Notes

HAVING executes **after aggregation**.

Whenever possible,

move row-level filters into the WHERE clause.

Example

Better

```sql
WHERE salary>0

GROUP BY department
```

instead of

```sql
GROUP BY department

HAVING AVG(salary)>0
```

Reducing rows before grouping often improves performance.

---

# Best Practices

✅ Use WHERE for row filtering.

✅ Use HAVING for aggregate filtering.

✅ Remember that aggregate functions usually ignore NULL values.

✅ Test HAVING queries with NULL groups.

---

# Common Mistakes

❌ Confusing WHERE and HAVING.

❌ Assuming NULL groups are ignored.

❌ Forgetting that HAVING also follows Three-Valued Logic.

❌ Using HAVING when WHERE would be more efficient.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    salary NUMERIC(10,2),
    bonus NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT',90000,5000),

(2,'Bob','IT',NULL,NULL),

(3,'Charlie','HR',50000,3000),

(4,'David','HR',60000,NULL),

(5,'Emma',NULL,70000,4000),

(6,'Frank',NULL,NULL,NULL);
```

---

# Exercise 1

Display departments having at least two employees.

---

# Exercise 2

Display departments whose average salary exceeds ₹60,000.

---

# Exercise 3

Display only the NULL department group.

---

# Exercise 4

Compare

```sql
COUNT(*)
```

and

```sql
COUNT(salary)
```

inside HAVING.

---

# Exercise 5

Explain why a group with all NULL bonuses disappears when using

```sql
HAVING AVG(bonus)>5000;
```

---

# Interview Trap

Predict the result.

```sql
SELECT

department,

AVG(bonus)

FROM employees

GROUP BY department

HAVING AVG(bonus)>5000;
```

Many candidates expect the NULL department to appear.

Correct Answer

If every bonus in that group is NULL,

```
AVG(bonus)

↓

NULL

↓

NULL>5000

↓

UNKNOWN

↓

Group Removed
```

---

# Interview Questions

## Beginner

1. What is the difference between WHERE and HAVING?

2. Does HAVING ignore NULL groups?

3. Does HAVING execute before or after GROUP BY?

---

## Intermediate

1. Explain why `AVG(NULL)` leads to UNKNOWN in HAVING comparisons.

2. Compare `COUNT(*)` and `COUNT(column)` inside HAVING.

3. Why should row-level filters usually be placed in WHERE?

---

## Senior

1. Design a dashboard query that filters departments based on aggregated metrics while handling NULL values correctly.

2. Explain how Three-Valued Logic affects HAVING.

3. How would you optimize a slow HAVING query over a billion-row fact table?

---

# Section Summary

In this section, you learned:

- HAVING filters groups, not individual rows.
- It executes after GROUP BY.
- Aggregate functions generally ignore NULL values, but NULL groups still exist.
- HAVING evaluates predicates using Three-Valued Logic, keeping only groups where the condition is TRUE.
- Moving row-level filters into WHERE can significantly improve query performance.

---

# Coming Up Next

Next, we'll examine another subtle interaction:

# Section 15

**NULL inside DISTINCT**

You'll learn:

- Does DISTINCT remove duplicate NULL values?
- How DISTINCT compares NULL.
- DISTINCT vs GROUP BY.
- COUNT(DISTINCT column) with NULL.
- Database-specific behavior.
- Enterprise reporting examples.


# ==========================================================
# Section 15
# NULL inside DISTINCT
# ==========================================================

# Introduction

The `DISTINCT` keyword removes duplicate values from a query result.

For example,

Suppose we have

| Department |
|------------|
| IT |
| IT |
| HR |
| HR |

Query

```sql
SELECT DISTINCT department
FROM employees;
```

Result

| Department |
|------------|
| IT |
| HR |

Simple enough.

But what happens when NULL values exist?

Consider

| Department |
|------------|
| IT |
| NULL |
| NULL |
| HR |
| NULL |

Will SQL return

- One NULL?
- Three NULLs?
- No NULL?

The answer surprises many SQL developers.

---

# The Fundamental Rule

`DISTINCT` returns **only one NULL value**, regardless of how many NULL values exist.

Although

```sql
NULL = NULL
```

returns

```
UNKNOWN
```

the SQL standard specifies that `DISTINCT` treats all NULL values as one duplicate set for the purpose of eliminating duplicate rows.

---

# Example Table

| Employee | Department |
|-----------|------------|
| Alice | IT |
| Bob | NULL |
| Charlie | HR |
| David | NULL |
| Emma | IT |
| Frank | NULL |

---

# Query

```sql
SELECT DISTINCT department
FROM employees;
```

Result

| Department |
|------------|
| IT |
| HR |
| NULL |

Notice

Three NULL values become

```
One NULL
```

---

# Visual Representation

Input

```
IT

NULL

HR

NULL

IT

NULL
```

After DISTINCT

```
IT

HR

NULL
```

---

# Why Doesn't DISTINCT Return Three NULLs?

This seems contradictory.

Earlier we learned

```sql
NULL = NULL
```

↓

UNKNOWN

Yet DISTINCT removes duplicate NULL values.

Why?

Because DISTINCT is **not performing equality comparisons row by row**.

Instead,

its purpose is to eliminate duplicate result values.

The SQL standard defines that all NULL values belong to the same distinct set.

Think of DISTINCT as producing a unique list of values rather than evaluating logical equality.

---

# Think Like a Data Engineer

Suppose you're preparing a report showing

```
Departments Present
```

Some employees have no department assigned.

Business users don't want

```
NULL

NULL

NULL
```

They simply want to know

```
There are employees with no department assigned.
```

Returning one NULL communicates exactly that.

---

# DISTINCT on Multiple Columns

Suppose

| Department | City |
|------------|------|
| IT | Mumbai |
| IT | Mumbai |
| IT | NULL |
| IT | NULL |
| NULL | Mumbai |
| NULL | Mumbai |
| NULL | NULL |
| NULL | NULL |

Query

```sql
SELECT DISTINCT
department,
city
FROM employees;
```

Result

| Department | City |
|------------|------|
| IT | Mumbai |
| IT | NULL |
| NULL | Mumbai |
| NULL | NULL |

Each unique combination appears once.

---

# DISTINCT vs GROUP BY

Many beginners think

```sql
SELECT DISTINCT department
```

and

```sql
SELECT department
GROUP BY department
```

are identical.

For this query,

they usually produce the same rows.

However,

their purposes differ.

| DISTINCT | GROUP BY |
|-----------|----------|
| Removes duplicate rows | Creates groups |
| Usually used without aggregates | Designed for aggregates |
| Simpler syntax | Supports aggregation |

---

# COUNT(DISTINCT column)

This is one of the most common interview questions.

Suppose

| Department |
|------------|
| IT |
| IT |
| HR |
| NULL |
| NULL |

Query

```sql
SELECT
COUNT(DISTINCT department)
FROM employees;
```

Result

```
2
```

Why?

Because

```
COUNT(column)
```

ignores NULL values.

Distinct values

```
IT

HR
```

Only.

NULL does **not** contribute to the count.

---

# COUNT(*) vs COUNT(DISTINCT)

Example

| Department |
|------------|
| IT |
| IT |
| HR |
| NULL |
| NULL |

Results

| Function | Result |
|----------|-------:|
| COUNT(*) | 5 |
| COUNT(department) | 3 |
| COUNT(DISTINCT department) | 2 |

Understanding this distinction is essential for writing correct reports.

---

# Business Meaning Matters

Suppose

```
department=NULL
```

means

```
Department Not Assigned
```

A report showing

```sql
SELECT DISTINCT department
```

returns

```
IT

HR

NULL
```

Business interpretation

There are employees without assigned departments.

The NULL value itself conveys useful information.

---

# SQL Standard vs Database Behavior

According to the SQL standard,

`DISTINCT` returns only one NULL for duplicate elimination.

This behavior is consistent across major relational databases including

- PostgreSQL
- SQL Server
- Oracle
- MySQL
- Snowflake

---

# Behind the Scenes

Conceptually,

DISTINCT operates like this.

```
Read Row

↓

Create Result Set

↓

Already Seen?

↓

YES

↓

Discard

↓

NO

↓

Keep Row
```

All NULL values share one distinct bucket for duplicate elimination.

---

# Performance Notes

`DISTINCT` often requires

- Sorting

or

- Hashing

to identify duplicate rows.

Large DISTINCT operations can be expensive,

especially on wide tables.

Whenever possible,

remove unnecessary columns before applying DISTINCT.

---

# Best Practices

✅ Use DISTINCT only when duplicate elimination is required.

✅ Understand that NULL appears only once.

✅ Remember that `COUNT(DISTINCT column)` ignores NULL values.

✅ Test DISTINCT queries with nullable columns.

---

# Common Mistakes

❌ Assuming every NULL appears separately.

❌ Confusing DISTINCT with GROUP BY.

❌ Expecting `COUNT(DISTINCT)` to count NULL.

❌ Using DISTINCT to hide duplicate data problems instead of fixing the underlying issue.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT'),

(2,'Bob',NULL),

(3,'Charlie','HR'),

(4,'David',NULL),

(5,'Emma','IT'),

(6,'Frank',NULL);
```

---

# Exercise 1

Return distinct department names.

---

# Exercise 2

Calculate

```sql
COUNT(DISTINCT department)
```

Predict the answer before executing.

---

# Exercise 3

Compare

```sql
COUNT(*)

COUNT(department)

COUNT(DISTINCT department)
```

Explain why the results differ.

---

# Exercise 4

Replace NULL with

```
'Unknown Department'
```

using COALESCE before displaying distinct values.

---

# Exercise 5

Rewrite the DISTINCT query using GROUP BY.

Compare the outputs.

---

# Interview Trap

Predict the output.

```sql
SELECT DISTINCT department
FROM employees;
```

Departments

```
IT

NULL

NULL

HR

NULL
```

Many candidates answer

```
IT

NULL

NULL

HR

NULL
```

Correct Answer

```
IT

HR

NULL
```

Only one NULL is returned.

---

# Interview Questions

## Beginner

1. Does DISTINCT remove duplicate NULL values?

2. Why does DISTINCT return only one NULL?

3. Does `COUNT(DISTINCT column)` count NULL?

---

## Intermediate

1. Compare DISTINCT and GROUP BY.

2. Explain why DISTINCT behaves differently from `NULL = NULL`.

3. Why is DISTINCT often expensive on large datasets?

---

## Senior

1. How would you optimize a DISTINCT query over a billion-row fact table?

2. Explain why DISTINCT should not be used to mask poor data quality.

3. Compare hash-based and sort-based implementations of DISTINCT.

---

# Concept Comparison

| Feature | DISTINCT | GROUP BY |
|----------|----------|----------|
| Purpose | Remove duplicate rows | Create groups |
| Aggregates | Not required | Commonly used |
| NULL Handling | One NULL returned | One NULL group created |
| Typical Use | Deduplication | Reporting & aggregation |

---

# Section Summary

In this section, you learned:

- `DISTINCT` removes duplicate values, including duplicate NULL values.
- All NULL values are treated as one distinct value for duplicate elimination.
- `COUNT(DISTINCT column)` ignores NULL values because COUNT ignores NULLs.
- DISTINCT and GROUP BY may produce similar outputs in simple cases but serve different purposes.
- DISTINCT can be computationally expensive and should be used intentionally.

---

# Coming Up Next

The next section explores one of the most important topics in SQL:

# Section 16

**NULL inside Aggregate Functions**

You'll learn:

- How `COUNT()`, `SUM()`, `AVG()`, `MIN()`, and `MAX()` handle NULL values.
- Why `COUNT(*)` behaves differently from `COUNT(column)`.
- Aggregate calculations with all-NULL groups.
- Enterprise reporting pitfalls.
- Optimizer behavior.
- PostgreSQL practice lab.


# ==========================================================
# Section 16
# NULL inside Aggregate Functions
# ==========================================================

# Introduction

Aggregate functions summarize data.

They transform multiple rows into a single value.

Common aggregate functions include

- COUNT()
- SUM()
- AVG()
- MIN()
- MAX()

Every SQL developer uses these functions daily.

However, one important question arises.

> **What happens when some rows contain NULL values?**

Many beginners assume NULL is treated as

- Zero
- Empty value
- Missing row

These assumptions are incorrect.

Understanding how aggregate functions handle NULL is essential for writing correct reports, dashboards, ETL pipelines, and analytical queries.

---

# Learning Objectives

After completing this section, you will be able to

✓ Explain how each aggregate function treats NULL.

✓ Understand why COUNT(*) differs from COUNT(column).

✓ Predict aggregate results containing NULL values.

✓ Handle all-NULL datasets correctly.

✓ Write enterprise-quality aggregation queries.

✓ Avoid reporting mistakes caused by NULL.

---

# Execution Pipeline

Before studying individual aggregate functions, let's understand where aggregation occurs.

```
FROM

↓

WHERE

↓

GROUP BY

↓

Aggregate Functions

↓

HAVING

↓

SELECT

↓

ORDER BY
```

Notice

Aggregate functions execute **after grouping** and **before HAVING**.

---

# The Fundamental Rule

One rule explains most aggregate behavior.

> **Except for `COUNT(*)`, aggregate functions ignore NULL values.**

This means

```
COUNT(column)

SUM()

AVG()

MIN()

MAX()
```

consider only non-NULL values.

---

# Example Dataset

| Employee | Salary | Bonus |
|-----------|--------:|------:|
| Alice | 90000 | 5000 |
| Bob | 60000 | NULL |
| Charlie | NULL | 3000 |
| David | 70000 | NULL |
| Emma | NULL | NULL |

We'll use this table throughout the section.

---

# Aggregate Function Overview

| Function | Ignores NULL? | Counts NULL? |
|----------|---------------|--------------|
| COUNT(*) | ❌ No | ✅ Yes |
| COUNT(column) | ✅ Yes | ❌ No |
| SUM() | ✅ Yes | ❌ No |
| AVG() | ✅ Yes | ❌ No |
| MIN() | ✅ Yes | ❌ No |
| MAX() | ✅ Yes | ❌ No |

This table summarizes the behavior we'll explore in detail.

---

# Mental Model

Imagine five employees.

```
90000

60000

NULL

70000

NULL
```

Aggregate functions behave like this.

```
Ignore NULL

↓

Work only with

90000

60000

70000
```

The NULL values are skipped.

They do not become zero.

They simply do not participate in the calculation.

---

# Think Like a Data Engineer

Imagine a sales warehouse receiving daily transactions.

Some rows have

```
discount_amount = NULL
```

Business meaning

```
Discount not recorded.
```

If SQL treated NULL as zero,

financial reports would silently change.

Instead,

aggregate functions ignore NULL values,

preserving the integrity of calculations.

---

# Business Meaning Matters

Consider

```
commission = NULL
```

Possible meanings

- Commission not yet calculated.
- Commission does not apply.
- Source system failed.
- Commission pending approval.

Ignoring NULL during aggregation is often the correct business behavior because SQL avoids making assumptions.

---

# Roadmap

The remaining part of this section contains the following subsections.

---

## Section 16.1

COUNT(*)

---

## Section 16.2

COUNT(column)

---

## Section 16.3

COUNT(DISTINCT)

---

## Section 16.4

SUM()

---

## Section 16.5

AVG()

---

## Section 16.6

MIN()

---

## Section 16.7

MAX()

---

## Section 16.8

Aggregate Functions on All-NULL Data

---

## Section 16.9

Aggregate Functions with GROUP BY

---

## Section 16.10

Enterprise Reporting Pitfalls

---

# SQL Standard vs Database Behavior

The SQL standard specifies that

- `COUNT(*)` counts rows.
- Other aggregate functions ignore NULL values.

This behavior is consistent across

- PostgreSQL
- SQL Server
- Oracle
- MySQL
- Snowflake
- Spark SQL

Although implementation details vary,

the logical behavior is largely portable.

---

# Behind the Scenes

Conceptually,

every aggregate function processes rows like this.

```
Read Row

↓

Value NULL?

↓

YES

↓

Ignore

↓

NO

↓

Update Aggregate

↓

Repeat
```

Except

```
COUNT(*)
```

which counts every row regardless of NULL values.

---

# Why This Section Matters

Incorrect understanding of NULL and aggregates causes

- Wrong dashboards
- Incorrect KPIs
- Financial reporting errors
- Data warehouse inconsistencies
- Failed interview questions

By mastering this section, you'll be able to reason about aggregate behavior confidently in both interviews and production environments.

---

# Coming Up Next

We begin with the most commonly misunderstood aggregate function:

## Section 16.1

# COUNT(*)

You'll learn

- Why COUNT(*) counts NULL rows.
- Difference between rows and values.
- Internal execution.
- PostgreSQL examples.
- Enterprise reporting use cases.

# ==========================================================
# Section 16.1
# COUNT(*)
# ==========================================================

# Introduction

`COUNT(*)` is one of the simplest SQL functions.

Unfortunately,

it is also one of the most misunderstood.

Many developers incorrectly believe

```
COUNT(*)

↓

Counts Values
```

It does not.

`COUNT(*)` counts

```
Rows
```

Whether a row contains

- NULL
- Zero
- Empty String
- Blank Spaces

does not matter.

If the row exists,

it is counted.

This distinction is fundamental to understanding SQL aggregation.

---

# Mental Model

Think of `COUNT(*)` as asking

> **"How many rows exist?"**

It never asks

> **"How many values exist?"**

This is why NULL values have absolutely no effect on `COUNT(*)`.

---

# Example Table

| Employee | Salary | Bonus |
|-----------|--------:|------:|
| Alice |90000|5000|
| Bob |60000|NULL|
| Charlie |NULL|3000|
| David |70000|NULL|
| Emma |NULL|NULL|

Total Rows

```
5
```

---

# Example 1

```sql
SELECT

COUNT(*)

FROM employees;
```

Result

```
5
```

Notice

Even though

```
Salary

↓

NULL

NULL
```

and

```
Bonus

↓

NULL

NULL

NULL
```

every row is counted.

---

# Execution Trace

```
Row 1

↓

Exists?

↓

YES

↓

Count = 1

----------------

Row 2

↓

Exists?

↓

YES

↓

Count = 2

----------------

Row 3

↓

Exists?

↓

YES

↓

Count = 3

----------------

Continue...

↓

Final Count

↓

5
```

Observe

The database never checks whether individual column values are NULL.

---

# Why Doesn't NULL Matter?

Suppose

| Employee | Salary |
|-----------|--------:|
| Alice |90000|
| Bob |NULL|

Question

How many employee records exist?

Answer

```
2
```

Whether salary is known is irrelevant.

The rows exist.

Therefore,

`COUNT(*)`

returns

```
2
```

---

# Think Like a Data Engineer

Suppose an ETL pipeline loads customer records.

Some optional attributes are missing.

| Customer | Email |
|-----------|--------|
| Alice |alice@test.com|
| Bob |NULL|
| Charlie |NULL|

Business asks

> "How many customer records were loaded?"

Correct query

```sql
SELECT

COUNT(*)

FROM customers;
```

Answer

```
3
```

Not

```
1
```

Because the question concerns

rows,

not values.

---

# Business Meaning Matters

Suppose

```
bonus=NULL
```

does **not** mean

the employee record is invalid.

It simply means

```
Bonus Not Yet Calculated
```

The employee still exists.

Therefore,

COUNT(*) correctly counts that employee.

---

# COUNT(*) vs COUNT(column)

This is one of the most common interview questions.

Table

| Employee | Bonus |
|-----------|------:|
| Alice |5000|
| Bob |NULL|
| Charlie |3000|
| David |NULL|
| Emma |NULL|

Query

```sql
SELECT

COUNT(*),

COUNT(bonus)

FROM employees;
```

Result

| Function | Result |
|----------|--------:|
| COUNT(*) | 5 |
| COUNT(bonus) | 2 |

Why?

COUNT(*)

↓

Counts Rows

COUNT(column)

↓

Counts Non-NULL Values

We'll study `COUNT(column)` in the next subsection.

---

# COUNT(*) with WHERE

Suppose

```sql
SELECT

COUNT(*)

FROM employees

WHERE salary>50000;
```

Evaluation

| Employee | Salary | WHERE |
|-----------|--------|-------|
| Alice |90000|TRUE|
| Bob |60000|TRUE|
| Charlie |NULL|UNKNOWN|
| David |70000|TRUE|
| Emma |NULL|UNKNOWN|

Rows Returned

```
Alice

Bob

David
```

COUNT(*)

↓

3

Notice

The NULL salary rows are filtered by the WHERE clause,

not by COUNT(*).

---

# COUNT(*) with GROUP BY

```sql
SELECT

department,

COUNT(*)

FROM employees

GROUP BY department;
```

Result

| Department | Employees |
|------------|----------:|
| IT |3|
| HR |2|
| NULL |4|

Every row contributes to its group's count,

including NULL rows.

---

# COUNT(*) with LEFT JOIN

Suppose

```
Customers

LEFT JOIN

Orders
```

A customer with no orders still produces one output row after the LEFT JOIN.

`COUNT(*)` counts that row because it exists in the result set.

This is why `COUNT(*)` and `COUNT(order_id)` often produce different answers after joins.

We'll revisit this in the JOIN section.

---

# SQL Standard vs Database Behavior

According to the SQL standard,

`COUNT(*)`

counts

every row.

This behavior is identical in

- PostgreSQL
- SQL Server
- Oracle
- MySQL
- Snowflake
- Spark SQL

It is one of the most portable SQL functions.

---

# Behind the Scenes

Conceptually,

the execution engine performs

```
Initialize Counter

↓

Read Row

↓

Increment Counter

↓

Repeat

↓

Return Counter
```

Notice

There is no NULL check.

The row itself is what matters.

---

# Performance Notes

Modern query optimizers implement COUNT(*) efficiently.

However,

on very large tables,

the database usually still needs to determine which rows satisfy the query.

Do not assume

```sql
COUNT(*)
```

is always instantaneous.

Performance depends on

- Filters
- Indexes
- Table size
- Visibility rules (such as MVCC in PostgreSQL)

Always review the execution plan for critical workloads.

---

# Best Practices

✅ Use `COUNT(*)` when counting rows.

✅ Use `COUNT(column)` when counting known values.

✅ Always think about whether you are counting rows or values.

✅ Test aggregate queries with NULL data.

---

# Common Mistakes

❌ Believing COUNT(*) ignores NULL.

❌ Confusing rows with values.

❌ Using COUNT(column) when the requirement is to count records.

❌ Forgetting that WHERE executes before COUNT(*).

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    salary NUMERIC(10,2),
    bonus NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT',90000,5000),

(2,'Bob','IT',60000,NULL),

(3,'Charlie','HR',NULL,3000),

(4,'David','HR',70000,NULL),

(5,'Emma',NULL,NULL,NULL);
```

---

# Exercise 1

Predict the result.

```sql
SELECT

COUNT(*)

FROM employees;
```

---

# Exercise 2

Predict

```sql
SELECT

COUNT(*)

FROM employees

WHERE salary>50000;
```

Explain why.

---

# Exercise 3

Compare

```sql
COUNT(*)

COUNT(bonus)
```

Explain the difference.

---

# Exercise 4

Count employees in each department.

Include the NULL department.

---

# Interview Trap

Predict the result.

```sql
SELECT

COUNT(*)

FROM employees;
```

Table

| Salary |
|---------|
|NULL|
|NULL|
|NULL|

Many candidates answer

```
0
```

Correct Answer

```
3
```

Because

`COUNT(*)`

counts rows,

not values.

---

# Interview Questions

## Beginner

1. What does COUNT(*) count?

2. Does COUNT(*) ignore NULL values?

3. Why is COUNT(*) different from COUNT(column)?

---

## Intermediate

1. Explain why COUNT(*) returns 5 even when several columns contain NULL.

2. How does WHERE affect COUNT(*)?

3. Compare COUNT(*) after INNER JOIN and LEFT JOIN.

---

## Senior

1. Explain how COUNT(*) is executed internally.

2. Why can COUNT(*) still be expensive on very large tables?

3. Design a reporting query that correctly counts records while handling NULL values.

---

# Section Summary

In this subsection, you learned:

- `COUNT(*)` counts rows, not values.
- NULL values inside a row do not affect `COUNT(*)`.
- WHERE filters rows before `COUNT(*)` executes.
- `COUNT(*)` behaves consistently across major SQL databases.
- Understanding the difference between counting rows and counting values is essential for writing correct reports.

---

# Coming Up Next

## Section 16.2

# COUNT(column)

You'll learn:

- Why `COUNT(column)` ignores NULL values.
- How it differs from `COUNT(*)`.
- Common reporting mistakes.
- JOIN-related counting issues.
- Enterprise interview questions.

# ==========================================================
# Section 16.2
# COUNT(column)
# ==========================================================

# Introduction

In the previous section, we learned that

```
COUNT(*)

↓

Counts Rows
```

Now we'll study

```
COUNT(column)
```

Although the syntax differs by only one word,

its behavior is completely different.

This difference is one of the most frequently tested SQL interview topics and a common source of reporting errors.

---

# The Fundamental Rule

> **COUNT(column) counts only non-NULL values in the specified column.**

If the value in that column is NULL,

that row is ignored.

Notice

The row still exists.

Only the NULL value is skipped.

---

# Mental Model

Think of

```sql
COUNT(column)
```

as asking

> **"How many known values exist in this column?"**

It does **not** ask

> **"How many rows exist?"**

---

# Example Table

| Employee | Salary | Bonus |
|-----------|--------:|------:|
| Alice |90000|5000|
| Bob |60000|NULL|
| Charlie |NULL|3000|
| David |70000|NULL|
| Emma |NULL|NULL|

---

# Example 1

```sql
SELECT

COUNT(salary)

FROM employees;
```

Evaluation

| Employee | Salary | Counted? |
|-----------|--------|----------|
| Alice |90000|✅ Yes |
| Bob |60000|✅ Yes |
| Charlie |NULL|❌ No |
| David |70000|✅ Yes |
| Emma |NULL|❌ No |

Result

```
3
```

---

# Execution Trace

```
Row 1

↓

salary = 90000

↓

NULL?

↓

NO

↓

Count = 1

----------------

Row 2

↓

salary = 60000

↓

NULL?

↓

NO

↓

Count = 2

----------------

Row 3

↓

salary = NULL

↓

NULL?

↓

YES

↓

Ignore

----------------

Row 4

↓

salary = 70000

↓

NULL?

↓

NO

↓

Count = 3

----------------

Row 5

↓

salary = NULL

↓

NULL?

↓

YES

↓

Ignore
```

Final Result

```
3
```

---

# Example 2

```sql
SELECT

COUNT(bonus)

FROM employees;
```

Evaluation

| Bonus | Counted? |
|-------:|----------|
|5000|✅|
|NULL|❌|
|3000|✅|
|NULL|❌|
|NULL|❌|

Result

```
2
```

---

# COUNT(*) vs COUNT(column)

Using the same table

| Function | Result |
|----------|--------:|
| COUNT(*) | 5 |
| COUNT(salary) | 3 |
| COUNT(bonus) | 2 |

Notice

```
COUNT(*)

↓

Counts Rows

COUNT(column)

↓

Counts Known Values
```

This is the most important distinction.

---

# Why Doesn't COUNT(column) Count NULL?

Suppose

```
Salary

↓

NULL
```

Question

Can SQL count a salary that does not exist?

No.

Since the value is unknown,

it is excluded from the aggregate.

The employee still exists,

but the salary value does not contribute to the count.

---

# Think Like a Data Engineer

Suppose an ETL pipeline loads customer records.

| Customer | Email |
|-----------|-------|
| Alice |alice@test.com|
| Bob |NULL|
| Charlie |NULL|
| David |david@test.com|

Business asks

> "How many customers have provided an email address?"

Correct query

```sql
SELECT

COUNT(email)

FROM customers;
```

Result

```
2
```

Notice

We are counting

```
Known Email Addresses

NOT

Customer Records
```

---

# Business Meaning Matters

Suppose

```
commission=NULL
```

Business meaning

```
Commission Pending
```

Query

```sql
SELECT

COUNT(commission)

FROM employees;
```

This does **not** count employees.

It counts employees whose commission has been calculated.

Understanding this distinction prevents reporting errors.

---

# COUNT(column) with WHERE

Query

```sql
SELECT

COUNT(salary)

FROM employees

WHERE department='IT';
```

Execution

```
WHERE

↓

Filter Rows

↓

COUNT(salary)

↓

Ignore NULL Salary Values

↓

Return Count
```

Remember

WHERE executes **before**

COUNT.

---

# COUNT(column) with GROUP BY

Suppose

| Department | Salary |
|------------|--------:|
| IT |90000|
| IT |NULL|
| HR |60000|
| HR |70000|
| NULL |NULL|

Query

```sql
SELECT

department,

COUNT(salary)

FROM employees

GROUP BY department;
```

Result

| Department | COUNT(salary) |
|------------|--------------:|
| IT |1|
| HR |2|
| NULL |0|

Notice

The NULL department group still exists,

but every NULL salary is ignored.

---

# COUNT(column) with LEFT JOIN

Consider

```
Customers

LEFT JOIN

Orders
```

Customers

| Customer |
|----------|
| Alice |
| Bob |

Orders

| Customer | Order ID |
|----------|----------|
| Alice |101|

Query

```sql
SELECT

customers.customer_name,

COUNT(orders.order_id)

FROM customers

LEFT JOIN orders

ON ...

GROUP BY customers.customer_name;
```

Result

| Customer | COUNT(order_id) |
|----------|----------------:|
| Alice |1|
| Bob |0|

Why?

Bob still has one output row from the LEFT JOIN,

but

```
order_id

↓

NULL
```

Therefore,

COUNT(order_id)

↓

0

This is one of the most common reporting patterns in SQL.

---

# SQL Standard vs Database Behavior

The SQL standard specifies

```
COUNT(column)

↓

Ignore NULL
```

This behavior is consistent across

- PostgreSQL
- SQL Server
- Oracle
- MySQL
- Snowflake
- Spark SQL

---

# Behind the Scenes

Conceptually,

the execution engine performs

```
Initialize Counter

↓

Read Row

↓

Column NULL?

↓

YES

↓

Ignore

↓

NO

↓

Increment Counter

↓

Repeat
```

Unlike COUNT(*),

a NULL check occurs for every row.

---

# Performance Notes

`COUNT(column)` performs a NULL check on the specified column while processing rows.

In most workloads,

the performance difference between `COUNT(*)` and `COUNT(column)` is small.

The overall cost is usually dominated by

- Reading rows
- Filtering
- Grouping
- Joins

Always evaluate execution plans for large datasets instead of assuming one form is always faster.

---

# Best Practices

✅ Use `COUNT(*)` when counting rows.

✅ Use `COUNT(column)` when counting known values.

✅ Choose the column carefully.

✅ Understand the business meaning of NULL.

---

# Common Mistakes

❌ Assuming COUNT(column) counts rows.

❌ Forgetting that NULL values are ignored.

❌ Using COUNT(column) when the requirement is to count records.

❌ Confusing missing values with missing rows.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    salary NUMERIC(10,2),
    bonus NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT',90000,5000),

(2,'Bob','IT',60000,NULL),

(3,'Charlie','HR',NULL,3000),

(4,'David','HR',70000,NULL),

(5,'Emma',NULL,NULL,NULL);
```

---

# Exercise 1

Predict

```sql
SELECT

COUNT(salary)

FROM employees;
```

---

# Exercise 2

Compare

```sql
COUNT(*)

COUNT(salary)

COUNT(bonus)
```

Explain every result.

---

# Exercise 3

Count known salaries by department.

---

# Exercise 4

Using a LEFT JOIN between customers and orders,

count how many orders each customer has.

Why does a customer with no orders return

```
0
```

instead of

```
1
```

---

# Exercise 5

Write a query that counts employees whose bonus has been calculated.

---

# Interview Trap

Table

| Bonus |
|-------:|
|NULL|
|NULL|
|NULL|

Predict

```sql
SELECT

COUNT(bonus)

FROM employees;
```

Many candidates answer

```
3
```

Correct Answer

```
0
```

Because

```
COUNT(column)

↓

Ignores NULL Values
```

---

# Interview Questions

## Beginner

1. What does `COUNT(column)` count?

2. Does `COUNT(column)` include NULL values?

3. What is the difference between `COUNT(*)` and `COUNT(column)`?

---

## Intermediate

1. Why does `COUNT(column)` return zero for a group containing only NULL values?

2. Explain how `COUNT(column)` behaves after a LEFT JOIN.

3. How does WHERE affect `COUNT(column)`?

---

## Senior

1. Design a reporting query that distinguishes between total employees and employees with recorded bonuses.

2. Explain why using `COUNT(column)` instead of `COUNT(*)` can produce incorrect KPIs if the business requirement is misunderstood.

3. How would you validate aggregate counts in a large ETL pipeline containing nullable fields?

---

# Section Summary

In this subsection, you learned:

- `COUNT(column)` counts only non-NULL values in the specified column.
- Rows with NULL in that column are ignored, even though the rows themselves still exist.
- `COUNT(column)` is fundamentally different from `COUNT(*)`, which counts every row.
- `COUNT(column)` is especially useful for measuring data completeness and optional attributes.
- Understanding the distinction between counting rows and counting known values is critical for accurate reporting and analytics.

---

# Coming Up Next

## Section 16.3

# COUNT(DISTINCT)

You'll learn:

- How `COUNT(DISTINCT)` combines duplicate elimination with NULL handling.
- Why NULL values are not included in the count.
- Multi-column DISTINCT counting.
- Performance considerations.
- Enterprise reporting patterns.
- PostgreSQL practice and interview questions.

# ==========================================================
# Section 16.3
# COUNT(DISTINCT)
# ==========================================================

# Introduction

In the previous sections, we learned

```
COUNT(*)

↓

Counts Rows
```

and

```
COUNT(column)

↓

Counts Non-NULL Values
```

Now we'll combine counting with duplicate elimination.

SQL provides

```sql
COUNT(DISTINCT column)
```

This function answers a different question.

Instead of asking

> "How many rows exist?"

or

> "How many known values exist?"

it asks

> **"How many unique non-NULL values exist?"**

This makes it extremely useful in reporting, analytics, and business intelligence.

---

# The Fundamental Rule

> **COUNT(DISTINCT column) counts unique, non-NULL values.**

Two important operations happen.

Step 1

```
Remove Duplicate Values
```

Step 2

```
Ignore NULL Values
```

Only after both steps does SQL calculate the count.

---

# Mental Model

Think of

```sql
COUNT(DISTINCT department)
```

as asking

> "How many different departments do we actually have?"

Not

> "How many employees exist?"

---

# Example Table

| Employee | Department |
|-----------|------------|
| Alice | IT |
| Bob | HR |
| Charlie | IT |
| David | NULL |
| Emma | HR |
| Frank | NULL |
| Grace | Finance |

---

# Example 1

```sql
SELECT

COUNT(DISTINCT department)

FROM employees;
```

Evaluation

Original Values

```
IT

HR

IT

NULL

HR

NULL

Finance
```

Remove Duplicates

```
IT

HR

NULL

Finance
```

Ignore NULL

```
IT

HR

Finance
```

Final Count

```
3
```

---

# Execution Trace

```
Read Values

↓

IT

HR

IT

NULL

HR

NULL

Finance

↓

Remove Duplicates

↓

IT

HR

NULL

Finance

↓

Ignore NULL

↓

IT

HR

Finance

↓

Count

↓

3
```

---

# COUNT(*) vs COUNT(column) vs COUNT(DISTINCT)

Using the same table

| Function | Result |
|----------|--------:|
| COUNT(*) | 7 |
| COUNT(department) | 5 |
| COUNT(DISTINCT department) | 3 |

Notice

```
COUNT(*)

↓

Rows

----------------

COUNT(column)

↓

Known Values

----------------

COUNT(DISTINCT)

↓

Unique Known Values
```

---

# Why Isn't NULL Counted?

Suppose

```
Department

↓

NULL
```

Can SQL determine

which department it represents?

No.

Since NULL represents an unknown value,

COUNT ignores it,

just as it does with other aggregate functions.

---

# Think Like a Data Engineer

Suppose you maintain a customer warehouse.

Business asks

> "How many different cities do our customers belong to?"

Table

| Customer | City |
|----------|------|
| Alice | Mumbai |
| Bob | Delhi |
| Charlie | Mumbai |
| David | NULL |
| Emma | Pune |

Correct Query

```sql
SELECT

COUNT(DISTINCT city)

FROM customers;
```

Answer

```
3
```

Cities

- Mumbai
- Delhi
- Pune

The unknown city is excluded.

---

# Business Meaning Matters

Suppose

```
department = NULL
```

Business meaning

```
Department Not Assigned
```

Business asks

> "How many departments exist?"

Employees without a department should not create a new department.

Therefore,

excluding NULL is exactly the correct behavior.

---

# COUNT(DISTINCT) with GROUP BY

Example

```sql
SELECT

location,

COUNT(DISTINCT department)

FROM employees

GROUP BY location;
```

Each group performs

```
Duplicate Removal

↓

NULL Removal

↓

Count
```

independently.

---

# COUNT(DISTINCT) with Multiple Columns

Some databases,

including PostgreSQL,

allow distinct combinations using row expressions.

Example

```sql
SELECT

COUNT(DISTINCT (department, city))

FROM employees;
```

This counts unique

```
(department, city)
```

pairs.

For example

| Department | City |
|------------|------|
| IT | Mumbai |
| IT | Mumbai |
| IT | Pune |
| HR | Mumbai |

Result

```
3
```

because there are three distinct combinations.

> **PostgreSQL Note:** Multi-column distinct counting uses row value expressions. Syntax differs across SQL databases, so always verify your database's implementation.

---

# COUNT(DISTINCT) after LEFT JOIN

Suppose

Customers

| Customer |
|----------|
| Alice |
| Bob |

Orders

| Customer | Product |
|----------|---------|
| Alice | Laptop |
| Alice | Mouse |

Query

```sql
SELECT

customer_name,

COUNT(DISTINCT product)

FROM customers

LEFT JOIN orders

ON ...

GROUP BY customer_name;
```

Result

| Customer | Products Purchased |
|----------|-------------------:|
| Alice |2|
| Bob |0|

Bob has one joined row,

but

```
product

↓

NULL
```

NULL is ignored,

therefore

```
0
```

---

# SQL Standard vs Database Behavior

The SQL standard specifies

```
COUNT(DISTINCT)

↓

Remove Duplicates

↓

Ignore NULL

↓

Count
```

This behavior is consistent across major relational databases.

Support for multiple-column DISTINCT counting varies by vendor and syntax.

---

# Behind the Scenes

Conceptually,

the execution engine performs

```
Initialize Set

↓

Read Value

↓

NULL?

↓

YES

↓

Ignore

↓

NO

↓

Already Seen?

↓

YES

↓

Ignore

↓

NO

↓

Insert into Set

↓

Repeat

↓

Return Size of Set
```

Internally,

databases often use either

- Hash-based aggregation

or

- Sort-based aggregation

depending on the optimizer's execution plan.

---

# Performance Notes

`COUNT(DISTINCT)` is usually more expensive than

- COUNT(*)
- COUNT(column)

because the database must identify duplicate values before counting.

Depending on the optimizer,

this may require

- Sorting
- Hash aggregation
- Temporary memory
- Disk spill for large datasets

Large DISTINCT aggregations can become one of the most expensive operations in analytical workloads.

Always review execution plans for high-volume queries.

---

# Best Practices

✅ Use `COUNT(DISTINCT)` only when unique values are required.

✅ Remember that NULL values are ignored.

✅ Be aware that DISTINCT adds computational cost.

✅ Verify business requirements before using DISTINCT.

---

# Common Mistakes

❌ Assuming NULL contributes to the count.

❌ Confusing unique values with total rows.

❌ Using DISTINCT to compensate for incorrect joins.

❌ Forgetting the performance cost of duplicate elimination.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    city VARCHAR(30)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT','Mumbai'),

(2,'Bob','HR','Delhi'),

(3,'Charlie','IT','Mumbai'),

(4,'David',NULL,'Pune'),

(5,'Emma','Finance','Mumbai'),

(6,'Frank',NULL,NULL),

(7,'Grace','HR','Delhi');
```

---

# Exercise 1

Predict

```sql
SELECT

COUNT(DISTINCT department)

FROM employees;
```

---

# Exercise 2

Compare

```sql
COUNT(*)

COUNT(department)

COUNT(DISTINCT department)
```

Explain every result.

---

# Exercise 3

Count distinct cities.

Explain why NULL is not included.

---

# Exercise 4

Count unique

```
(department, city)
```

combinations.

---

# Exercise 5

Compare the performance of

```sql
COUNT(city)
```

and

```sql
COUNT(DISTINCT city)
```

using

```sql
EXPLAIN ANALYZE
```

Discuss why one query requires more work.

---

# Interview Trap

Table

| Department |
|------------|
| IT |
| IT |
| HR |
| NULL |
| NULL |
| Finance |

Predict

```sql
SELECT

COUNT(DISTINCT department)

FROM employees;
```

Many candidates answer

```
4
```

Correct Answer

```
3
```

Because

```
NULL

↓

Ignored
```

Distinct Departments

```
IT

HR

Finance
```

---

# Interview Questions

## Beginner

1. What does `COUNT(DISTINCT column)` count?

2. Are NULL values included?

3. Why is the result different from `COUNT(column)`?

---

## Intermediate

1. Explain the execution order of `COUNT(DISTINCT)`.

2. Compare `COUNT(*)`, `COUNT(column)`, and `COUNT(DISTINCT)`.

3. Why is `COUNT(DISTINCT)` usually slower than `COUNT(column)`?

---

## Senior

1. How do hash aggregation and sort aggregation implement `COUNT(DISTINCT)`?

2. How would you optimize a `COUNT(DISTINCT)` query on a billion-row fact table?

3. When would an approximate distinct counting algorithm (such as HyperLogLog) be more appropriate than an exact `COUNT(DISTINCT)`?

---

# Section Summary

In this subsection, you learned:

- `COUNT(DISTINCT column)` counts unique, non-NULL values.
- Duplicate values are removed before counting.
- NULL values are ignored, just like in `COUNT(column)`.
- `COUNT(DISTINCT)` is more computationally expensive because it must eliminate duplicates.
- Understanding when to use `COUNT(*)`, `COUNT(column)`, and `COUNT(DISTINCT)` is essential for writing accurate analytical and reporting queries.

---

# Coming Up Next

## Section 16.4

# SUM()

You'll learn:

- Why `SUM()` ignores NULL values.
- How NULL affects arithmetic calculations.
- Behavior with all-NULL datasets.
- SUM with GROUP BY.
- Financial reporting pitfalls.
- Enterprise ETL examples.


# ==========================================================
# Section 16.4
# SUM()
# ==========================================================

# Introduction

The `SUM()` function calculates the total of numeric values.

It is one of the most frequently used aggregate functions in SQL and appears in almost every reporting system.

Typical use cases include

- Total Sales
- Total Revenue
- Total Salary
- Total Tax
- Total Profit
- Total Quantity

But an important question arises.

> **What happens when some values are NULL?**

Does SQL

- Treat NULL as zero?
- Skip the row?
- Return NULL?

Understanding this behavior is essential for writing accurate financial and analytical reports.

---

# The Fundamental Rule

> **SUM() ignores NULL values.**

NULL values do **not**

- become zero
- contribute to the total
- generate an error

They are simply ignored.

---

# Mental Model

Think of

```sql
SUM(salary)
```

as asking

> **"Add together every known salary."**

Unknown salaries cannot be added,

so SQL skips them.

---

# Example Table

| Employee | Salary |
|-----------|--------:|
| Alice |90000|
| Bob |60000|
| Charlie |NULL|
| David |70000|
| Emma |NULL|

---

# Example 1

```sql
SELECT

SUM(salary)

FROM employees;
```

Evaluation

```
90000

+

60000

+

70000

=

220000
```

Result

```
220000
```

Notice

The NULL salaries are ignored.

---

# Aggregation Walkthrough

```
Running Total = 0

↓

Row 1

Salary = 90000

Running Total = 90000

--------------------

Row 2

Salary = 60000

Running Total = 150000

--------------------

Row 3

Salary = NULL

Ignored

Running Total = 150000

--------------------

Row 4

Salary = 70000

Running Total = 220000

--------------------

Row 5

Salary = NULL

Ignored

Running Total = 220000

--------------------

Final SUM

↓

220000
```

---

# Execution Trace

```
Initialize Total

↓

Read Value

↓

NULL?

↓

YES

↓

Ignore

↓

NO

↓

Add to Running Total

↓

Repeat

↓

Return Final Total
```

---

# Why Doesn't NULL Become Zero?

Suppose

```
Salary

↓

NULL
```

Business Meaning

```
Salary Not Recorded
```

If SQL silently treated NULL as

```
0
```

then reports would imply

```
Employee earns ₹0
```

which is incorrect.

Instead,

SQL avoids making assumptions.

---

# Think Like a Data Engineer

Suppose a retail warehouse stores

```
discount_amount
```

Some rows contain

```
NULL
```

because discounts have not yet been calculated.

Using

```sql
SUM(discount_amount)
```

returns the total of all known discounts,

without incorrectly assuming missing discounts are zero.

This preserves data accuracy.

---

# Business Meaning Matters

Consider

```
commission = NULL
```

Possible meanings

- Pending approval
- Not calculated
- Missing source data

None of these necessarily mean

```
0
```

Ignoring NULL is usually the safest behavior.

---

# SUM() with WHERE

Query

```sql
SELECT

SUM(salary)

FROM employees

WHERE department='IT';
```

Execution

```
WHERE

↓

Filter Rows

↓

SUM()

↓

Ignore NULL Values

↓

Return Total
```

Remember

WHERE executes before SUM.

---

# SUM() with GROUP BY

Suppose

| Department | Salary |
|------------|--------:|
| IT |90000|
| IT |NULL|
| HR |60000|
| HR |70000|
| NULL |NULL|

Query

```sql
SELECT

department,

SUM(salary)

FROM employees

GROUP BY department;
```

Result

| Department | SUM(salary) |
|------------|------------:|
| IT |90000|
| HR |130000|
| NULL |NULL|

Notice

The NULL department forms a group.

However,

its only salary value is NULL,

so the SUM result is NULL.

---

# SUM() on an All-NULL Dataset

Suppose

| Salary |
|--------|
|NULL|
|NULL|
|NULL|

Query

```sql
SELECT

SUM(salary)

FROM employees;
```

Result

```
NULL
```

This surprises many beginners.

SQL does **not** return

```
0
```

because no known values exist to add together.

---

# SUM() with COALESCE

Business Requirement

Display

```
0
```

instead of

```
NULL
```

Query

```sql
SELECT

COALESCE(

SUM(salary),

0

)

FROM employees;
```

Now

```
NULL

↓

0
```

This is a very common reporting pattern.

---

# SUM() vs Arithmetic Operators

Many beginners think

```sql
100 + NULL
```

and

```sql
SUM(column)
```

behave the same.

They do not.

Example

```sql
SELECT

100 + NULL;
```

Result

```
NULL
```

But

```sql
SELECT

SUM(salary);
```

ignores NULL values.

This difference is fundamental.

| Expression | Result |
|------------|--------|
| `100 + NULL` | NULL |
| `SUM(100, NULL)` *(conceptually over rows)* | 100 |

Aggregate functions have special NULL handling rules.

---

# SQL Standard vs Database Behavior

According to the SQL standard,

`SUM()`

- ignores NULL values
- returns NULL if every input value is NULL

This behavior is consistent across

- PostgreSQL
- SQL Server
- Oracle
- MySQL
- Snowflake
- Spark SQL

---

# Behind the Scenes

Conceptually,

the execution engine performs

```
Running Total = 0

↓

Read Value

↓

NULL?

↓

YES

↓

Ignore

↓

NO

↓

Add Value

↓

Repeat

↓

Were Any Values Added?

↓

YES

↓

Return Total

↓

NO

↓

Return NULL
```

Notice

The engine tracks whether at least one non-NULL value was encountered.

---

# Performance Notes

`SUM()` is computationally inexpensive.

The main performance cost usually comes from

- Reading rows
- Filtering
- Grouping
- Sorting
- Joins

For large analytical queries,

optimizing the overall execution plan has a much greater impact than the SUM calculation itself.

---

# Best Practices

✅ Understand that SUM ignores NULL values.

✅ Use `COALESCE(SUM(...), 0)` when reports require zero instead of NULL.

✅ Verify the business meaning before replacing NULL with zero.

✅ Test aggregate queries using all-NULL datasets.

---

# Common Mistakes

❌ Assuming NULL is treated as zero.

❌ Forgetting that SUM returns NULL for all-NULL inputs.

❌ Confusing arithmetic addition with aggregate behavior.

❌ Blindly using COALESCE without business approval.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    salary NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT',90000),

(2,'Bob','IT',NULL),

(3,'Charlie','HR',60000),

(4,'David','HR',70000),

(5,'Emma',NULL,NULL);
```

---

# Exercise 1

Predict

```sql
SELECT

SUM(salary)

FROM employees;
```

---

# Exercise 2

Predict

```sql
SELECT

SUM(salary)

FROM employees

WHERE department='IT';
```

---

# Exercise 3

Calculate the total salary by department.

Explain why the NULL department returns NULL.

---

# Exercise 4

Modify the query so that departments with no known salaries display

```
0
```

instead of

```
NULL
```

---

# Exercise 5

Explain why

```sql
100 + NULL
```

returns NULL,

while

```sql
SUM(salary)
```

ignores NULL values.

---

# Interview Trap

Table

| Salary |
|--------|
|NULL|
|NULL|
|NULL|

Predict

```sql
SELECT

SUM(salary)

FROM employees;
```

Many candidates answer

```
0
```

Correct Answer

```
NULL
```

Because there are **no non-NULL values** to sum.

---

# Interview Questions

## Beginner

1. Does SUM() include NULL values?

2. What does SUM() return if every value is NULL?

3. Why doesn't SQL treat NULL as zero?

---

## Intermediate

1. Explain the difference between `100 + NULL` and `SUM(column)`.

2. Why is `COALESCE(SUM(column), 0)` common in reporting?

3. How does GROUP BY affect SUM with NULL values?

---

## Senior

1. Design a financial reporting query that handles missing transaction amounts correctly.

2. Explain why replacing every NULL with zero may produce misleading financial reports.

3. How would you validate aggregated financial data in an ETL pipeline containing nullable numeric fields?

---

# Section Summary

In this subsection, you learned:

- `SUM()` ignores NULL values.
- Unknown values are skipped rather than treated as zero.
- If every input value is NULL, `SUM()` returns NULL.
- `COALESCE(SUM(column), 0)` is a common pattern for presentation when the business requires zero instead of NULL.
- Aggregate functions and arithmetic operators handle NULL differently, so understanding the distinction is essential.

---

# Coming Up Next

## Section 16.5

# AVG()

You'll learn:

- How AVG() calculates averages while ignoring NULL values.
- Why the denominator excludes NULL values.
- Average calculations on all-NULL datasets.
- Financial and analytical reporting pitfalls.
- Enterprise ETL examples.

# ==========================================================
# Section 16.5
# AVG()
# ==========================================================

# Introduction

The `AVG()` function calculates the arithmetic mean of numeric values.

It is widely used in

- Salary reports
- Sales dashboards
- Financial analysis
- Customer analytics
- Business intelligence
- Data warehouses

At first glance,

`AVG()` appears simple.

However,

one question causes confusion.

> **How does AVG() treat NULL values?**

Does SQL

- Count NULL as zero?
- Ignore NULL?
- Return NULL?

The answer is more interesting than most developers expect.

---

# The Fundamental Rule

> **AVG() ignores NULL values.**

Only non-NULL values participate in

- Total Calculation
- Count Calculation

Both the numerator and denominator ignore NULL values.

---

# Mathematical Formula

Conceptually,

SQL calculates

```
AVG(column)

=

SUM(column)

/

COUNT(column)
```

Notice

```
COUNT(column)

NOT

COUNT(*)
```

This is why NULL values do not affect the denominator.

---

# Mental Model

Think of

```sql
AVG(salary)
```

as asking

> **"What is the average of all known salaries?"**

Unknown salaries are excluded completely.

---

# Example Table

| Employee | Salary |
|-----------|--------:|
| Alice |90000|
| Bob |60000|
| Charlie |NULL|
| David |70000|
| Emma |NULL|

---

# Example 1

```sql
SELECT

AVG(salary)

FROM employees;
```

Calculation

```
Known Salaries

↓

90000

60000

70000
```

SUM

```
220000
```

COUNT

```
3
```

Average

```
220000

/

3

=

73333.33
```

Result

```
73333.33
```

---

# Aggregation Walkthrough

```
Running Sum = 0

Known Values = 0

----------------

Row 1

90000

↓

Sum = 90000

Count = 1

----------------

Row 2

60000

↓

Sum = 150000

Count = 2

----------------

Row 3

NULL

↓

Ignored

----------------

Row 4

70000

↓

Sum = 220000

Count = 3

----------------

Row 5

NULL

↓

Ignored

----------------

Average

↓

220000 / 3

↓

73333.33
```

---

# Execution Trace

```
Initialize

↓

Running Sum = 0

Running Count = 0

↓

Read Value

↓

NULL?

↓

YES

↓

Ignore

↓

NO

↓

Add to Sum

↓

Increment Count

↓

Repeat

↓

Return

Sum / Count
```

---

# Why Doesn't NULL Become Zero?

Suppose

```
Salary

↓

NULL
```

If SQL treated NULL as

```
0
```

The calculation would become

```
90000

+

60000

+

0

+

70000

+

0

=

220000

/

5

=

44000
```

This average is completely different.

It incorrectly assumes

Unknown Salary

=

₹0

SQL refuses to make that assumption.

---

# Think Like a Data Engineer

Suppose your company measures

```
Average Delivery Time
```

Some deliveries are still in progress.

```
delivery_days

↓

NULL
```

Business Meaning

```
Delivery Not Completed
```

Including those rows as

```
0 Days
```

would dramatically lower the reported average.

Ignoring NULL produces the correct business metric.

---

# Business Meaning Matters

Suppose

```
exam_score=NULL
```

Possible meanings

- Student absent
- Paper not evaluated
- Result pending

None of these imply

```
Score = 0
```

Ignoring NULL values prevents misleading analytics.

---

# AVG() with GROUP BY

Suppose

| Department | Salary |
|------------|--------:|
| IT |90000|
| IT |NULL|
| HR |60000|
| HR |70000|
| NULL |NULL|

Query

```sql
SELECT

department,

AVG(salary)

FROM employees

GROUP BY department;
```

Result

| Department | AVG(salary) |
|------------|------------:|
| IT |90000|
| HR |65000|
| NULL |NULL|

The NULL department exists,

but its average is NULL because no known salary exists.

---

# AVG() on an All-NULL Dataset

Table

| Salary |
|--------|
|NULL|
|NULL|
|NULL|

Query

```sql
SELECT

AVG(salary)

FROM employees;
```

Result

```
NULL
```

No valid values exist,

therefore no average can be calculated.

---

# AVG() with COALESCE

Business Requirement

Display

```
0
```

instead of

```
NULL
```

Query

```sql
SELECT

COALESCE(

AVG(salary),

0

)

FROM employees;
```

Result

```
0
```

Remember

This changes only the presentation,

not the stored data.

---

# AVG() vs Manual Calculation

Correct

```sql
AVG(salary)
```

Equivalent

```sql
SUM(salary)

/

COUNT(salary)
```

Incorrect

```sql
SUM(salary)

/

COUNT(*)
```

Using the sample data

```
220000

/

5

=

44000
```

Wrong

Because

NULL salaries should not increase the denominator.

---

# SQL Standard vs Database Behavior

According to the SQL standard,

`AVG()`

- ignores NULL values
- returns NULL when all values are NULL

This behavior is consistent across

- PostgreSQL
- SQL Server
- Oracle
- MySQL
- Snowflake
- Spark SQL

---

# Behind the Scenes

Conceptually,

the execution engine performs

```
Running Sum = 0

Running Count = 0

↓

Read Value

↓

NULL?

↓

YES

↓

Ignore

↓

NO

↓

Running Sum += Value

Running Count++

↓

Repeat

↓

Running Count = 0?

↓

YES

↓

Return NULL

↓

NO

↓

Return

Running Sum / Running Count
```

---

# Performance Notes

`AVG()` is internally implemented using logic similar to maintaining

- Running Sum
- Running Count

The overall query cost is usually dominated by

- Table scans
- Filtering
- Joins
- Grouping

rather than the average calculation itself.

---

# Best Practices

✅ Remember that AVG ignores NULL values.

✅ Use `AVG()` instead of manually dividing `SUM()` by `COUNT(*)`.

✅ Use `COALESCE()` only when the business requires a display value.

✅ Test averages using datasets containing NULL values.

---

# Common Mistakes

❌ Assuming NULL equals zero.

❌ Dividing SUM by COUNT(*).

❌ Forgetting that AVG returns NULL for all-NULL inputs.

❌ Replacing NULL with zero without understanding business meaning.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    salary NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT',90000),

(2,'Bob','IT',NULL),

(3,'Charlie','HR',60000),

(4,'David','HR',70000),

(5,'Emma',NULL,NULL);
```

---

# Exercise 1

Predict

```sql
SELECT

AVG(salary)

FROM employees;
```

---

# Exercise 2

Calculate the average salary for each department.

---

# Exercise 3

Rewrite AVG using

```sql
SUM()

COUNT()
```

Compare the results.

---

# Exercise 4

Explain why

```sql
SUM(salary)/COUNT(*)
```

produces the wrong answer.

---

# Exercise 5

Modify the query so that departments with no known salaries display

```
0
```

instead of

```
NULL
```

---

# Interview Trap

Table

| Salary |
|--------:|
|90000|
|60000|
|NULL|
|70000|
|NULL|

Predict

```sql
SELECT

AVG(salary)

FROM employees;
```

Many candidates calculate

```
220000

/

5

=

44000
```

Correct Answer

```
220000

/

3

=

73333.33
```

Because

```
AVG()

↓

SUM()

/

COUNT(column)
```

---

# Interview Questions

## Beginner

1. Does AVG() include NULL values?

2. What happens if every value is NULL?

3. Why doesn't AVG() divide by COUNT(*)?

---

## Intermediate

1. Explain how AVG() is calculated internally.

2. Compare `AVG(column)` with `SUM(column)/COUNT(column)`.

3. Why is treating NULL as zero dangerous in reporting?

---

## Senior

1. Design an ETL validation that checks average transaction amounts while handling NULL values correctly.

2. Explain why incorrect denominator selection can produce misleading KPIs.

3. How would you validate AVG calculations across multiple data sources?

---

# Section Summary

In this subsection, you learned:

- `AVG()` ignores NULL values in both the numerator and denominator.
- Conceptually, `AVG(column)` behaves like `SUM(column) / COUNT(column)`.
- If every input value is NULL, `AVG()` returns NULL.
- Using `COUNT(*)` instead of `COUNT(column)` produces incorrect averages.
- Understanding how AVG treats NULL is essential for accurate analytical and financial reporting.

---

# Coming Up Next

## Section 16.6

# MIN() and MAX()

You'll learn:

- How MIN() and MAX() handle NULL values.
- Behavior with all-NULL datasets.
- MIN/MAX with GROUP BY.
- Index optimization for MIN/MAX.
- Enterprise reporting examples.
- PostgreSQL practice and interview questions.


# ==========================================================
# Section 16.6
# MIN() and MAX()
# ==========================================================

# Introduction

The `MIN()` and `MAX()` functions return the

- Smallest value
- Largest value

from a set of rows.

They are widely used in

- Sales Reporting
- Financial Dashboards
- Healthcare Systems
- Inventory Management
- Time-Series Analysis
- ETL Validation

A common question is

> **What happens when some values are NULL?**

Do NULL values become

- Zero?
- Smallest value?
- Largest value?

No.

Like most aggregate functions,

`MIN()` and `MAX()` simply ignore NULL values.

---

# The Fundamental Rule

> **MIN() and MAX() ignore NULL values.**

Only non-NULL values participate in determining

- Minimum
- Maximum

If every value is NULL,

both functions return

```
NULL
```

---

# Mental Model

Imagine a competition.

```
Participants

↓

90000

60000

NULL

70000

NULL
```

The judges can compare

```
90000

60000

70000
```

But they cannot compare

```
Unknown Value
```

Therefore,

NULL values are skipped.

---

# Example Table

| Employee | Salary |
|-----------|--------:|
| Alice |90000|
| Bob |60000|
| Charlie |NULL|
| David |70000|
| Emma |NULL|

---

# Example 1

```sql
SELECT

MIN(salary)

FROM employees;
```

Evaluation

```
Known Values

↓

90000

60000

70000

↓

Minimum

↓

60000
```

Result

```
60000
```

---

# Example 2

```sql
SELECT

MAX(salary)

FROM employees;
```

Evaluation

```
Known Values

↓

90000

60000

70000

↓

Maximum

↓

90000
```

Result

```
90000
```

---

# Aggregation Walkthrough

## MIN()

```
Current Minimum = NULL

↓

Row 1

90000

↓

Minimum = 90000

--------------------

Row 2

60000

↓

60000 < 90000

↓

Minimum = 60000

--------------------

Row 3

NULL

↓

Ignored

--------------------

Row 4

70000

↓

70000 > 60000

↓

No Change

--------------------

Row 5

NULL

↓

Ignored

--------------------

Final Minimum

↓

60000
```

---

## MAX()

```
Current Maximum = NULL

↓

Row 1

90000

↓

Maximum = 90000

--------------------

Row 2

60000

↓

60000 < 90000

↓

No Change

--------------------

Row 3

NULL

↓

Ignored

--------------------

Row 4

70000

↓

70000 < 90000

↓

No Change

--------------------

Row 5

NULL

↓

Ignored

--------------------

Final Maximum

↓

90000
```

---

# Why Doesn't NULL Become the Minimum?

Suppose

```
Salary

↓

NULL
```

Does SQL know whether the salary is

- ₹20,000
- ₹80,000
- ₹2,00,000

No.

Therefore,

SQL cannot compare NULL with known values.

Ignoring NULL is the only logical choice.

---

# Think Like a Data Engineer

Suppose you're building a warehouse dashboard.

Business asks

```
Earliest Delivery Date
```

Some orders have

```
delivery_date = NULL
```

Meaning

```
Delivery Not Completed
```

Query

```sql
SELECT

MIN(delivery_date)

FROM orders;
```

The earliest completed delivery is returned.

Undelivered orders are ignored.

---

# Business Meaning Matters

Suppose

```
joining_date=NULL
```

Business meaning

```
Employee Record Imported

Joining Date Pending
```

Using

```sql
MIN(joining_date)
```

correctly ignores incomplete records,

avoiding incorrect conclusions.

---

# MIN() and MAX() with GROUP BY

Example

| Department | Salary |
|------------|--------:|
| IT |90000|
| IT |NULL|
| HR |60000|
| HR |70000|
| NULL |NULL|

Query

```sql
SELECT

department,

MIN(salary),

MAX(salary)

FROM employees

GROUP BY department;
```

Result

| Department | MIN | MAX |
|------------|----:|----:|
| IT |90000|90000|
| HR |60000|70000|
| NULL |NULL|NULL|

The NULL department exists,

but no known salary values exist,

so both aggregates return NULL.

---

# MIN() and MAX() on an All-NULL Dataset

Table

| Salary |
|--------|
|NULL|
|NULL|
|NULL|

Query

```sql
SELECT

MIN(salary),

MAX(salary)

FROM employees;
```

Result

| MIN | MAX |
|-----|-----|
|NULL|NULL|

No known values exist.

---

# MIN() and MAX() with COALESCE

Business Requirement

Display

```
Not Available
```

or

```
0
```

instead of NULL.

Example

```sql
SELECT

COALESCE(

MIN(salary),

0

)

FROM employees;
```

Now

```
NULL

↓

0
```

Again,

this affects only the query output.

---

# MIN()/MAX() vs ORDER BY

Some beginners think

```sql
SELECT

MIN(salary)
```

is equivalent to

```sql
SELECT

salary

FROM employees

ORDER BY salary

LIMIT 1;
```

They often produce the same result,

but they are **not conceptually identical**.

| MIN() | ORDER BY ... LIMIT 1 |
|--------|----------------------|
| Aggregate function | Row retrieval |
| Returns one value | Returns one row |
| Ignores NULL | Depends on ORDER BY NULL handling |

Understanding this distinction is important.

---

# SQL Standard vs Database Behavior

According to the SQL standard,

`MIN()` and `MAX()`

- ignore NULL values
- return NULL if every value is NULL

This behavior is consistent across

- PostgreSQL
- SQL Server
- Oracle
- MySQL
- Snowflake
- Spark SQL

---

# Behind the Scenes

Conceptually,

the execution engine performs

```
Current Value = NULL

↓

Read Value

↓

NULL?

↓

YES

↓

Ignore

↓

NO

↓

Current Empty?

↓

YES

↓

Store Value

↓

NO

↓

Compare

↓

Update if Smaller (MIN)

or

Update if Larger (MAX)

↓

Repeat

↓

Return Final Value
```

---

# Performance Notes

`MIN()` and `MAX()` have an important optimization.

If an appropriate index exists,

many databases can retrieve the smallest or largest value directly from the index,

without scanning every row.

For example,

PostgreSQL can often optimize

```sql
SELECT

MIN(salary)

FROM employees;
```

using an index on `salary`.

This makes `MIN()` and `MAX()` among the fastest aggregate functions in many scenarios.

Always confirm using

```sql
EXPLAIN ANALYZE
```

---

# Best Practices

✅ Remember that MIN() and MAX() ignore NULL values.

✅ Use indexes on frequently queried MIN/MAX columns.

✅ Use COALESCE only for presentation.

✅ Test with all-NULL datasets.

---

# Common Mistakes

❌ Assuming NULL is the smallest value.

❌ Assuming NULL is the largest value.

❌ Forgetting that all-NULL datasets return NULL.

❌ Confusing MIN() with ORDER BY LIMIT 1.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    salary NUMERIC(10,2),
    joining_date DATE
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT',90000,'2021-01-10'),

(2,'Bob','IT',NULL,NULL),

(3,'Charlie','HR',60000,'2022-06-15'),

(4,'David','HR',70000,'2020-03-20'),

(5,'Emma',NULL,NULL,NULL);
```

---

# Exercise 1

Predict

```sql
SELECT

MIN(salary),

MAX(salary)

FROM employees;
```

---

# Exercise 2

Calculate the earliest joining date.

Explain why NULL dates are ignored.

---

# Exercise 3

Calculate the minimum and maximum salary for each department.

---

# Exercise 4

Display

```
0
```

instead of NULL for departments with no known salary.

---

# Exercise 5

Run

```sql
EXPLAIN ANALYZE

SELECT

MIN(salary)

FROM employees;
```

Create an index on

```sql
salary
```

Compare the execution plans.

---

# Interview Trap

Table

| Salary |
|--------|
|NULL|
|NULL|
|NULL|

Predict

```sql
SELECT

MIN(salary),

MAX(salary)

FROM employees;
```

Many candidates answer

```
0

0
```

Correct Answer

```
NULL

NULL
```

Because there are no known values to compare.

---

# Interview Questions

## Beginner

1. Do MIN() and MAX() include NULL values?

2. What happens when every value is NULL?

3. Why doesn't SQL treat NULL as the smallest value?

---

## Intermediate

1. Compare MIN() with ORDER BY ... LIMIT 1.

2. Explain how GROUP BY affects MIN() and MAX().

3. Why are NULL values ignored?

---

## Senior

1. Explain how database indexes optimize MIN() and MAX() queries.

2. Design a reporting query that finds the earliest transaction date while handling NULL values correctly.

3. How would you verify whether PostgreSQL is using an index for MIN() or MAX()?

---

# Section Summary

In this subsection, you learned:

- `MIN()` and `MAX()` ignore NULL values.
- They return NULL when every input value is NULL.
- They work independently within each GROUP BY group.
- Unlike ORDER BY, they are aggregate functions that return a single value.
- Database indexes can significantly improve the performance of MIN() and MAX() queries.

---

# Coming Up Next

## Section 16.7

# Aggregate Functions on All-NULL Data

You'll learn:

- What every aggregate function returns when **every value is NULL**.
- Why `COUNT(*)` behaves differently.
- A complete comparison matrix.
- Enterprise reporting implications.
- PostgreSQL practice lab.


# ==========================================================
# Section 16.7
# Aggregate Functions on All-NULL Data
# ==========================================================

# Introduction

Throughout this chapter, we have learned that most aggregate functions ignore NULL values.

But what happens if

> **every value in the dataset is NULL?**

For example

| Salary |
|---------|
| NULL |
| NULL |
| NULL |

Can SQL calculate

- SUM?
- AVG?
- MIN?
- MAX?

Should the answer be

```
0
```

or

```
NULL
```

This section answers one of the most common SQL interview questions.

---

# The Fundamental Rule

When **all input values are NULL**,

aggregate functions behave as follows.

| Function | Result |
|----------|--------|
| COUNT(*) | Counts Rows |
| COUNT(column) | 0 |
| COUNT(DISTINCT column) | 0 |
| SUM(column) | NULL |
| AVG(column) | NULL |
| MIN(column) | NULL |
| MAX(column) | NULL |

This table is worth memorizing.

---

# Example Dataset

| Salary |
|---------|
| NULL |
| NULL |
| NULL |

---

# COUNT(*)

Query

```sql
SELECT

COUNT(*)

FROM employees;
```

Result

```
3
```

Why?

Because

```
COUNT(*)

↓

Counts Rows
```

The rows exist,

even though every value is NULL.

---

# COUNT(column)

Query

```sql
SELECT

COUNT(salary)

FROM employees;
```

Evaluation

```
Row 1

↓

NULL

↓

Ignore

----------------

Row 2

↓

NULL

↓

Ignore

----------------

Row 3

↓

NULL

↓

Ignore
```

Final Result

```
0
```

No known values exist.

---

# COUNT(DISTINCT)

Query

```sql
SELECT

COUNT(DISTINCT salary)

FROM employees;
```

Evaluation

```
NULL

NULL

NULL

↓

Ignore NULL

↓

No Values

↓

Count = 0
```

Result

```
0
```

---

# SUM()

Query

```sql
SELECT

SUM(salary)

FROM employees;
```

Result

```
NULL
```

Why not zero?

Because

```
No Known Values Exist
```

SQL cannot calculate a meaningful total.

---

# AVG()

Query

```sql
SELECT

AVG(salary)

FROM employees;
```

Result

```
NULL
```

Reason

Average requires

```
SUM

and

COUNT
```

Both are based on non-NULL values.

Since there are none,

the average is unknown.

---

# MIN()

Query

```sql
SELECT

MIN(salary)

FROM employees;
```

Result

```
NULL
```

No smallest value exists.

---

# MAX()

Query

```sql
SELECT

MAX(salary)

FROM employees;
```

Result

```
NULL
```

No largest value exists.

---

# Master Comparison Table

| Aggregate | All Values NULL | Reason |
|------------|----------------|--------|
| COUNT(*) | Number of Rows | Counts rows, not values |
| COUNT(column) | 0 | No non-NULL values |
| COUNT(DISTINCT column) | 0 | No unique non-NULL values |
| SUM(column) | NULL | Nothing to add |
| AVG(column) | NULL | No values to average |
| MIN(column) | NULL | No smallest known value |
| MAX(column) | NULL | No largest known value |

---

# Aggregation Walkthrough

Dataset

```
NULL

NULL

NULL
```

Execution

```
COUNT(*)

↓

3

----------------

COUNT(column)

↓

Ignore

Ignore

Ignore

↓

0

----------------

SUM()

↓

Ignore

Ignore

Ignore

↓

NULL

----------------

AVG()

↓

Ignore

Ignore

Ignore

↓

NULL

----------------

MIN()

↓

Ignore

↓

NULL

----------------

MAX()

↓

Ignore

↓

NULL
```

---

# Think Like a Data Engineer

Suppose a hospital system stores

```
discharge_date
```

A new ward has admitted patients,

but nobody has been discharged yet.

Every value is

```
NULL
```

Query

```sql
SELECT

MIN(discharge_date),

MAX(discharge_date)

FROM patients;
```

Result

```
NULL

NULL
```

This correctly communicates

```
No discharge dates exist yet.
```

---

# Business Meaning Matters

Suppose

```
sales_amount = NULL
```

for every record.

Business Meaning

```
Sales Not Yet Loaded
```

Returning

```
0
```

would falsely imply

```
No Sales
```

Returning

```
NULL
```

correctly indicates

```
Unknown
```

---

# Why COUNT(*) Is Different

Every other aggregate works with

```
Values
```

COUNT(*) works with

```
Rows
```

Rows exist,

even if every column contains NULL.

That is why

```
COUNT(*)

↓

3
```

while

```
COUNT(salary)

↓

0
```

---

# SQL Standard vs Database Behavior

The SQL standard specifies

- COUNT(*) counts rows.
- COUNT(column) counts non-NULL values.
- SUM, AVG, MIN, and MAX return NULL when no non-NULL values exist.

This behavior is consistent across

- PostgreSQL
- SQL Server
- Oracle
- MySQL
- Snowflake
- Spark SQL

---

# Behind the Scenes

Conceptually,

the database processes

```
Read Row

↓

Read Value

↓

NULL?

↓

YES

↓

Ignore Value

↓

Repeat

↓

Any Valid Values?

↓

NO

↓

Return NULL

(Except COUNT)
```

For

```
COUNT(*)
```

the value itself is never examined.

Only the row is counted.

---

# Performance Notes

All-NULL datasets do not require special optimization.

The database still scans the qualifying rows,

but aggregate state changes differently.

For example,

`SUM()` never updates its running total because no non-NULL values are encountered.

---

# Best Practices

✅ Expect SUM, AVG, MIN, and MAX to return NULL when no valid values exist.

✅ Use `COALESCE()` only when the business requires a display value.

✅ Understand the difference between "no data" and "zero."

✅ Test reports using all-NULL datasets.

---

# Common Mistakes

❌ Expecting SUM() to return 0.

❌ Expecting AVG() to return 0.

❌ Forgetting that COUNT(*) counts rows.

❌ Confusing "unknown" with "zero."

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE salaries
(
    employee_id INT PRIMARY KEY,
    salary NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO salaries VALUES
(1,NULL),

(2,NULL),

(3,NULL);
```

---

# Exercise 1

Predict

```sql
SELECT

COUNT(*)

FROM salaries;
```

---

# Exercise 2

Predict

```sql
SELECT

COUNT(salary)

FROM salaries;
```

---

# Exercise 3

Predict

```sql
SELECT

SUM(salary),

AVG(salary),

MIN(salary),

MAX(salary)

FROM salaries;
```

---

# Exercise 4

Rewrite the previous query so that

```
0
```

is displayed instead of

```
NULL
```

where appropriate.

---

# Exercise 5

Explain why

```sql
COUNT(*)
```

returns

```
3
```

while

```sql
COUNT(salary)
```

returns

```
0
```

---

# Interview Trap

Table

| Salary |
|---------|
| NULL |
| NULL |
| NULL |

Predict

```sql
SELECT

COUNT(*),

COUNT(salary),

SUM(salary),

AVG(salary),

MIN(salary),

MAX(salary)

FROM salaries;
```

Correct Answer

| Function | Result |
|----------|--------|
| COUNT(*) | 3 |
| COUNT(salary) | 0 |
| SUM(salary) | NULL |
| AVG(salary) | NULL |
| MIN(salary) | NULL |
| MAX(salary) | NULL |

---

# Interview Questions

## Beginner

1. Which aggregate function still returns a value when every column value is NULL?

2. Why does `COUNT(*)` behave differently?

3. What does `SUM()` return for an all-NULL dataset?

---

## Intermediate

1. Explain why `AVG()` returns NULL instead of 0.

2. Compare `COUNT(*)` and `COUNT(column)` using an all-NULL dataset.

3. Why is returning NULL more accurate than returning zero?

---

## Senior

1. Design a reporting strategy that distinguishes between "no data" and "zero."

2. Explain how aggregate functions maintain correctness in the presence of all-NULL datasets.

3. How would you validate KPI calculations when source systems frequently contain all-NULL columns?

---

# Section Summary

In this subsection, you learned:

- Aggregate functions behave differently when every value is NULL.
- `COUNT(*)` counts rows regardless of column values.
- `COUNT(column)` and `COUNT(DISTINCT column)` return 0 because no non-NULL values exist.
- `SUM()`, `AVG()`, `MIN()`, and `MAX()` return NULL because there are no known values to aggregate.
- Distinguishing between **"unknown"** and **"zero"** is essential for accurate reporting and analytics.

---

# Coming Up Next

## Section 16.8

# Aggregate Functions with GROUP BY

You'll learn:

- How aggregate functions behave independently within each group.
- NULL handling inside grouped aggregates.
- Mixed NULL and non-NULL groups.
- Real-world reporting examples.
- Query execution flow.
- Enterprise ETL scenarios.

# ==========================================================
# Section 16.8
# Aggregate Functions with GROUP BY
# ==========================================================

# Introduction

So far, we have learned how aggregate functions work on an entire table.

However,

most real-world SQL queries do **not** aggregate the entire dataset.

Instead,

they calculate aggregates **for each group**.

For example,

- Total salary per department
- Average sales per region
- Highest order amount per customer
- Number of employees in each office

This is where

```sql
GROUP BY
```

works together with aggregate functions.

Understanding how NULL behaves **inside each group** is critical for writing accurate reports.

---

# Logical Query Processing

Before studying examples,

remember the logical execution order.

```
FROM

↓

WHERE

↓

GROUP BY

↓

Aggregate Functions

↓

HAVING

↓

SELECT

↓

ORDER BY
```

Notice

Aggregate functions operate **after** groups have been created.

Each group is processed independently.

---

# Example Dataset

| Employee | Department | Salary |
|-----------|------------|--------:|
| Alice | IT |90000|
| Bob | IT |NULL|
| Charlie | HR |60000|
| David | HR |70000|
| Emma | Finance |NULL|
| Frank | Finance |NULL|
| Grace | NULL |50000|
| Henry | NULL |NULL|

---

# Step 1 — GROUP BY Creates Groups

The database first creates groups.

```
IT

↓

90000

NULL

----------------

HR

↓

60000

70000

----------------

Finance

↓

NULL

NULL

----------------

NULL Department

↓

50000

NULL
```

No aggregation has happened yet.

Only grouping.

---

# Step 2 — Aggregate Functions Execute

Each group is processed independently.

SQL does **not** mix rows between groups.

Think of each group as its own mini table.

---

# COUNT(*)

Query

```sql
SELECT

department,

COUNT(*)

FROM employees

GROUP BY department;
```

Result

| Department | COUNT(*) |
|------------|----------:|
| IT |2|
| HR |2|
| Finance |2|
| NULL |2|

Explanation

Every row contributes,

even when salary is NULL.

---

# COUNT(column)

```sql
SELECT

department,

COUNT(salary)

FROM employees

GROUP BY department;
```

Result

| Department | COUNT(salary) |
|------------|--------------:|
| IT |1|
| HR |2|
| Finance |0|
| NULL |1|

Notice

Finance contains two rows,

but both salaries are NULL.

Therefore

```
COUNT(salary)

↓

0
```

---

# SUM()

```sql
SELECT

department,

SUM(salary)

FROM employees

GROUP BY department;
```

Result

| Department | SUM |
|------------|-----:|
| IT |90000|
| HR |130000|
| Finance |NULL|
| NULL |50000|

Finance returns

```
NULL
```

because there are no known salary values.

---

# AVG()

```sql
SELECT

department,

AVG(salary)

FROM employees

GROUP BY department;
```

Result

| Department | AVG |
|------------|----:|
| IT |90000|
| HR |65000|
| Finance |NULL|
| NULL |50000|

Remember

```
AVG

↓

SUM

/

COUNT(column)
```

Each group performs this calculation independently.

---

# MIN() and MAX()

```sql
SELECT

department,

MIN(salary),

MAX(salary)

FROM employees

GROUP BY department;
```

Result

| Department | MIN | MAX |
|------------|----:|----:|
| IT |90000|90000|
| HR |60000|70000|
| Finance |NULL|NULL|
| NULL |50000|50000|

---

# Aggregation Walkthrough

For the

```
Finance
```

group

```
Rows

↓

NULL

NULL

----------------

COUNT(*)

↓

2

----------------

COUNT(salary)

↓

0

----------------

SUM()

↓

NULL

----------------

AVG()

↓

NULL

----------------

MIN()

↓

NULL

----------------

MAX()

↓

NULL
```

Notice

Every aggregate works **only inside the Finance group**.

---

# Independent Group Processing

Think of SQL doing this.

```
Group 1

↓

Run COUNT

Run SUM

Run AVG

Run MIN

Run MAX

----------------

Group 2

↓

Run COUNT

Run SUM

Run AVG

Run MIN

Run MAX

----------------

Repeat
```

Each group is completely independent.

---

# Think Like a Data Engineer

Suppose a company wants a departmental dashboard.

Metrics

- Number of employees
- Employees with recorded salaries
- Total payroll
- Average salary

One SQL query can produce everything.

```sql
SELECT

department,

COUNT(*)                 AS total_employees,

COUNT(salary)            AS known_salaries,

SUM(salary)              AS payroll,

AVG(salary)              AS average_salary

FROM employees

GROUP BY department;
```

This is one of the most common reporting queries in enterprise systems.

---

# Business Meaning Matters

Finance Department

```
Payroll

↓

NULL
```

Does this mean

```
₹0 Payroll?
```

No.

It means

```
Payroll Unknown
```

If the business wants to display

```
₹0
```

that decision should be made explicitly using

```sql
COALESCE()
```

---

# Using COALESCE

Example

```sql
SELECT

department,

COALESCE(

SUM(salary),

0

) AS payroll

FROM employees

GROUP BY department;
```

Result

| Department | Payroll |
|------------|--------:|
| IT |90000|
| HR |130000|
| Finance |0|
| NULL |50000|

Only the presentation changes.

The stored data remains unchanged.

---

# SQL Standard vs Database Behavior

Aggregate functions behave the same inside GROUP BY across major SQL databases.

Each group is processed independently,

and NULL handling follows the same rules discussed in earlier sections.

This behavior is consistent in

- PostgreSQL
- SQL Server
- Oracle
- MySQL
- Snowflake
- Spark SQL

---

# Behind the Scenes

Conceptually,

the execution engine performs

```
Read Rows

↓

Create Groups

↓

For Each Group

↓

Initialize Aggregates

↓

Read Every Row

↓

Ignore NULL Where Required

↓

Update Aggregate State

↓

Return One Result Row

↓

Repeat
```

---

# Performance Notes

Grouping large datasets is expensive.

Performance depends on

- Number of rows
- Number of groups
- Available memory
- Indexes
- Hash vs Sort Aggregation

NULL values themselves usually contribute very little overhead.

The number of groups has a much larger impact on performance.

---

# Best Practices

✅ Understand that every group is processed independently.

✅ Remember that NULL handling rules remain unchanged inside groups.

✅ Use COALESCE only for presentation.

✅ Test grouped queries with all-NULL groups.

---

# Common Mistakes

❌ Assuming NULL groups are ignored.

❌ Confusing COUNT(*) with COUNT(column).

❌ Treating NULL as zero without business approval.

❌ Forgetting that AVG uses COUNT(column).

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(30),
    salary NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'Alice','IT',90000),

(2,'Bob','IT',NULL),

(3,'Charlie','HR',60000),

(4,'David','HR',70000),

(5,'Emma','Finance',NULL),

(6,'Frank','Finance',NULL),

(7,'Grace',NULL,50000),

(8,'Henry',NULL,NULL);
```

---

# Exercise 1

Calculate

- COUNT(*)
- COUNT(salary)

for every department.

---

# Exercise 2

Calculate

- SUM
- AVG
- MIN
- MAX

for every department.

---

# Exercise 3

Rewrite the query using

```sql
COALESCE()
```

to display zero instead of NULL.

---

# Exercise 4

Explain why the Finance department has

```
COUNT(*) = 2

COUNT(salary) = 0
```

---

# Exercise 5

Use

```sql
EXPLAIN ANALYZE
```

to observe how PostgreSQL performs grouping and aggregation.

---

# Interview Trap

Predict the result.

```sql
SELECT

department,

COUNT(*),

COUNT(salary),

SUM(salary)

FROM employees

GROUP BY department;
```

Finance Department

| Salary |
|--------|
|NULL|
|NULL|

Correct Result

| COUNT(*) | COUNT(salary) | SUM(salary) |
|----------|--------------:|------------:|
|2|0|NULL|

Many candidates incorrectly answer

```
SUM = 0
```

---

# Interview Questions

## Beginner

1. Does GROUP BY change how aggregate functions treat NULL?

2. Why can COUNT(*) and COUNT(column) differ within the same group?

3. Why does SUM() return NULL for a group containing only NULL values?

---

## Intermediate

1. Explain how AVG() is calculated independently for each group.

2. Why does GROUP BY still create a NULL department group?

3. How does COALESCE affect grouped aggregate results?

---

## Senior

1. Design a departmental KPI query that distinguishes between missing data and zero values.

2. Explain how aggregate state is maintained independently for each GROUP BY key.

3. Compare hash aggregation and sort aggregation for grouped aggregate queries in PostgreSQL.

---

# Section Summary

In this subsection, you learned:

- Aggregate functions execute independently within each GROUP BY group.
- NULL handling rules remain unchanged inside groups.
- COUNT(*), COUNT(column), SUM(), AVG(), MIN(), and MAX() can all produce different results for the same group depending on its data.
- Groups containing only NULL values are still returned, but most aggregates (except COUNT(*)) reflect the absence of known values.
- Understanding grouped aggregation is essential for building reliable dashboards, reports, and ETL pipelines.

---

# Coming Up Next

## Section 16.9

# Enterprise Reporting Pitfalls

You'll learn:

- Real production bugs caused by NULL values.
- Financial reporting mistakes.
- KPI calculation errors.
- Dashboard design guidelines.
- ETL validation strategies.
- Best practices used by enterprise data engineering teams.

# ==========================================================
# Section 16.9
# Enterprise Reporting Pitfalls
# ==========================================================

# Introduction

Writing a SQL query that executes successfully is only the first step.

The real challenge is ensuring that the query produces the correct business result.

Many production reporting errors are not caused by SQL syntax mistakes.

Instead, they are caused by misunderstanding

- NULL values
- Aggregate functions
- Missing data
- Business meaning

A technically correct SQL query can still produce a completely incorrect business report.

This section explores real-world scenarios where improper NULL handling leads to incorrect KPIs, dashboards, and business decisions.

---

# The Golden Rule

Before writing any aggregate query, ask yourself

> **Does NULL mean Zero, Unknown, Not Applicable, or Not Yet Available?**

The answer determines whether SQL's default behavior is appropriate.

Never assume.

Always verify the business meaning.

---

# Case Study 1
# Banking — Total Loan Amount

A bank stores approved loan amounts.

| Customer | Loan Amount |
|----------|------------:|
| Alice | 500000 |
| Bob | NULL |
| Charlie | 300000 |

Business Meaning

```
NULL

↓

Loan Under Review
```

Query

```sql
SELECT

SUM(loan_amount)

FROM loans;
```

Result

```
800000
```

Correct?

Yes.

The pending loan should not contribute to the approved loan total.

---

# Production Bug

A developer writes

```sql
SELECT

SUM(

COALESCE(loan_amount,0)

)

FROM loans;
```

Today,

the answer is still

```
800000
```

No visible problem exists.

Months later,

management asks

> "How many customers currently have a zero-value loan?"

The report becomes impossible to interpret because

```
0

and

Unknown

have been merged together.
```

The distinction has been lost.

---

# Lesson

Never replace NULL with zero unless the business explicitly defines them as equivalent.

---

# Case Study 2
# HR Dashboard — Average Salary

Table

| Employee | Salary |
|----------|--------:|
| Alice |90000|
| Bob |NULL|
| Charlie |60000|

Business Meaning

```
NULL

↓

Salary Not Finalized
```

Correct Query

```sql
SELECT

AVG(salary)

FROM employees;
```

Result

```
75000
```

---

# Incorrect Query

```sql
SELECT

AVG(

COALESCE(salary,0)

)

FROM employees;
```

Calculation

```
90000

+

0

+

60000

=

150000

/

3

=

50000
```

Management now believes

Average Salary

↓

₹50,000

Reality

↓

₹75,000

One incorrect COALESCE changed an executive KPI.

---

# Lesson

COALESCE inside an aggregate changes the calculation.

COALESCE outside the aggregate changes only the presentation.

Correct

```sql
COALESCE(

AVG(salary),

0

)
```

Incorrect

```sql
AVG(

COALESCE(salary,0)

)
```

---

# Case Study 3
# E-commerce Dashboard

Business asks

> "How many products have a selling price?"

Table

| Product | Price |
|---------|------:|
| Laptop |70000|
| Mouse |NULL|
| Keyboard |2000|

Correct Query

```sql
SELECT

COUNT(price)

FROM products;
```

Result

```
2
```

---

# Incorrect Query

```sql
SELECT

COUNT(*)

FROM products;
```

Result

```
3
```

The dashboard now reports

```
Products with Price

↓

3
```

Incorrect.

---

# Lesson

Understand whether you are counting

Rows

or

Known Values.

---

# Case Study 4
# Healthcare Analytics

Table

| Patient | Discharge Date |
|----------|----------------|
| Alice |2026-05-10|
| Bob |NULL|
| Charlie |2026-05-12|

Business Meaning

```
NULL

↓

Still Admitted
```

Correct Query

```sql
SELECT

MIN(discharge_date)

FROM patients;
```

Result

```
2026-05-10
```

SQL ignores patients who have not yet been discharged.

This is exactly what the hospital expects.

---

# Case Study 5
# Logistics Dashboard

Table

| Shipment | Delivery Days |
|----------|--------------:|
| A |5|
| B |7|
| C |NULL|

Business Meaning

```
NULL

↓

Delivery In Progress
```

Correct Query

```sql
SELECT

AVG(delivery_days)

FROM shipments;
```

Result

```
6
```

Incorrect Query

```sql
AVG(

COALESCE(delivery_days,0)

)
```

Result

```
4
```

The logistics team now believes deliveries are improving,

when in reality,

unfinished deliveries distorted the KPI.

---

# Case Study 6
# Sales Reporting

Monthly Sales

| Month | Sales |
|-------|------:|
| January |250000|
| February |NULL|
| March |310000|

Business Meaning

```
February Data

↓

Not Yet Loaded
```

Correct Dashboard

```
February

↓

Pending
```

Incorrect Dashboard

```
February

↓

₹0
```

Management concludes

Sales collapsed.

The ETL simply had not completed.

---

# Think Like a Data Engineer

Every NULL tells a story.

Possible meanings include

- Unknown
- Pending
- Not Applicable
- Not Collected
- Not Yet Calculated
- Source System Failure

Treating all of them as

```
0
```

destroys valuable information.

---

# Common Production Mistakes

## Mistake 1

Using

```sql
AVG(COALESCE(column,0))
```

instead of

```sql
COALESCE(

AVG(column),

0

)
```

---

## Mistake 2

Using

```sql
COUNT(*)
```

when the requirement is

```
Known Values
```

---

## Mistake 3

Replacing NULL with

```
0
```

inside financial reports.

---

## Mistake 4

Assuming NULL always means

```
Zero
```

---

## Mistake 5

Ignoring all-NULL groups during dashboard testing.

---

# Enterprise Best Practices

Before writing any aggregate query,

ask these questions.

### Question 1

What does NULL mean?

---

### Question 2

Should NULL participate in calculations?

---

### Question 3

Should NULL be displayed to users?

---

### Question 4

If not,

what should replace it?

- Zero?
- Pending?
- Unknown?
- N/A?

---

### Question 5

Should replacement happen

During Calculation

or

During Presentation?

These questions prevent most reporting bugs.

---

# Data Quality Checklist

Before releasing a production report,

verify

✅ Are NULL values expected?

✅ What is their business meaning?

✅ Are aggregate functions behaving correctly?

✅ Have all-NULL datasets been tested?

✅ Have mixed NULL/non-NULL datasets been tested?

✅ Does the report distinguish Unknown from Zero?

---

# Performance Considerations

Using

```sql
COALESCE()
```

inside aggregates can increase expression evaluation,

but the greater concern is usually correctness rather than performance.

Always optimize for

1. Correct Business Logic

2. Readability

3. Performance

Never sacrifice correctness for a tiny performance gain.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE sales
(
    sale_id INT PRIMARY KEY,
    region VARCHAR(30),
    sales_amount NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO sales VALUES
(1,'North',250000),

(2,'North',NULL),

(3,'South',175000),

(4,'South',NULL),

(5,'West',NULL);
```

---

# Exercise 1

Calculate total sales by region.

Observe regions containing only NULL values.

---

# Exercise 2

Compare

```sql
SUM(sales_amount)
```

and

```sql
SUM(COALESCE(sales_amount,0))
```

Explain when each is appropriate.

---

# Exercise 3

Calculate the average sales amount.

Compare

```sql
AVG(sales_amount)
```

and

```sql
AVG(COALESCE(sales_amount,0))
```

---

# Exercise 4

Design a dashboard that displays

```
Pending
```

instead of

```
NULL
```

for regions with no reported sales.

---

# Exercise 5

Identify three business scenarios where replacing NULL with zero would produce misleading reports.

---

# Interview Scenario

An executive reports that the average customer balance has dropped sharply.

Investigation reveals that a developer changed

```sql
AVG(balance)
```

to

```sql
AVG(COALESCE(balance,0))
```

Questions

1. Why did the KPI change?

2. Which query is correct?

3. How would you explain the issue to a non-technical stakeholder?

---

# Interview Questions

## Beginner

1. Why is NULL different from zero?

2. Why can COALESCE change aggregate results?

3. When should COUNT(column) be preferred over COUNT(*)?

---

## Intermediate

1. Explain why `AVG(COALESCE(column,0))` is often incorrect.

2. Describe a reporting bug caused by misunderstanding NULL.

3. How do you distinguish missing data from valid zero values?

---

## Senior

1. Design a KPI framework that correctly handles NULL values across multiple business domains.

2. Explain how you would validate aggregate reports before releasing them to executives.

3. What coding standards would you establish to prevent NULL-related reporting bugs in an enterprise data warehouse?

---

# Section Summary

In this subsection, you learned:

- Most production reporting bugs involving aggregates are caused by misunderstanding the business meaning of NULL rather than SQL syntax.
- Replacing NULL with zero inside aggregate functions can dramatically change KPIs.
- The placement of `COALESCE()`—inside or outside an aggregate—changes the semantics of the calculation.
- Data engineers should distinguish between **Unknown**, **Pending**, **Not Applicable**, and **Zero** before writing aggregation logic.
- Correct SQL is not enough; correct business interpretation is equally important.

---

# Coming Up Next

## Section 16.10

# Performance & Optimizer

You'll learn:

- How databases execute aggregate functions internally.
- Hash Aggregation vs Sort Aggregation.
- How indexes affect MIN() and MAX().
- Why `COUNT(DISTINCT)` is expensive.
- Reading PostgreSQL execution plans with `EXPLAIN ANALYZE`.
- Optimization techniques used in enterprise data warehouses.


# ==========================================================
# Section 16.10
# Performance & Query Optimizer
# ==========================================================

# Introduction

So far, we have learned what aggregate functions return.

Now we'll answer a different question.

> **How does the database actually compute aggregate functions?**

Understanding execution strategies helps you

- Write faster SQL
- Read execution plans
- Design better indexes
- Optimize ETL jobs
- Improve dashboard performance

This section focuses on PostgreSQL while also discussing concepts common across modern relational databases.

---

# Logical Query Processing

Recall the logical order of execution.

```
FROM

↓

WHERE

↓

GROUP BY

↓

Aggregate Functions

↓

HAVING

↓

SELECT

↓

ORDER BY
```

Notice

The optimizer is free to change the **physical execution plan** while preserving the same logical result.

---

# Logical vs Physical Execution

Logical execution

```
Read Rows

↓

Create Groups

↓

Calculate SUM()

↓

Return Result
```

Physical execution may instead use

```
Index Scan

↓

Hash Aggregate

↓

Output
```

or

```
Parallel Scan

↓

Sort

↓

Group Aggregate

↓

Output
```

Different plans,

same result.

---

# Aggregate State

Aggregate functions do not calculate the final answer immediately.

Instead,

they maintain an internal state while scanning rows.

Example

```
SUM()

↓

Running Total

----------------

COUNT()

↓

Running Counter

----------------

AVG()

↓

Running Total

+

Running Counter

----------------

MIN()

↓

Current Minimum

----------------

MAX()

↓

Current Maximum
```

After the final row,

the aggregate state becomes the final result.

---

# Example

Table

| Salary |
|--------:|
|90000|
|60000|
|70000|

Running SUM

```
0

↓

90000

↓

150000

↓

220000

↓

Return
```

Running COUNT

```
0

↓

1

↓

2

↓

3

↓

Return
```

Running AVG

```
Running Sum = 220000

Running Count = 3

↓

220000 / 3

↓

73333.33
```

Notice

AVG is internally much closer to

```
SUM()

+

COUNT()
```

than most developers realize.

---

# Hash Aggregation

For GROUP BY queries,

PostgreSQL often chooses

```
Hash Aggregate
```

Execution

```
Read Row

↓

Calculate Group Key

↓

Hash Function

↓

Locate Bucket

↓

Update Aggregate State

↓

Repeat
```

Example

```
Department

↓

IT

↓

Hash Bucket

↓

Update SUM

Update COUNT

Update AVG
```

Hash aggregation is generally very efficient when all groups fit into memory.

---

# Sort Aggregation

Sometimes PostgreSQL chooses

```
Group Aggregate
```

instead.

Execution

```
Read Rows

↓

Sort by Group Key

↓

Scan Sorted Data

↓

Update Aggregate

↓

Return Groups
```

Example

Before Sort

```
HR

IT

Finance

HR

IT
```

After Sort

```
Finance

HR

HR

IT

IT
```

Grouping becomes straightforward because identical keys are adjacent.

---

# Hash Aggregate vs Group Aggregate

| Feature | Hash Aggregate | Group Aggregate |
|---------|----------------|-----------------|
| Requires Sort | No | Yes |
| Memory Usage | Higher | Lower (streaming possible) |
| Best For | Many unsorted rows | Already sorted data |
| Performance | Usually faster | Better when input is ordered |

The optimizer chooses the strategy based on estimated cost.

---

# COUNT(DISTINCT)

Why is

```sql
COUNT(DISTINCT department)
```

usually slower?

Because SQL must first identify duplicate values.

Conceptually

```
Read Value

↓

Already Seen?

↓

YES

↓

Ignore

↓

NO

↓

Store Value

↓

Continue
```

Internally,

the optimizer may use

- Hash Tables
- Sorting
- Temporary Disk Files

depending on data size.

---

# Index Optimization

Some aggregate functions can use indexes efficiently.

Example

```sql
SELECT

MIN(salary)

FROM employees;
```

If an index exists on

```
salary
```

PostgreSQL may retrieve

the first index entry

instead of scanning the entire table.

Similarly

```sql
MAX(salary)
```

may read

the last index entry.

This can reduce execution time dramatically.

---

# Why SUM() Usually Reads Every Row

Consider

```sql
SELECT

SUM(salary)

FROM employees;
```

Every salary contributes to the result.

Therefore,

the database usually must examine every qualifying row.

Unlike MIN or MAX,

there is no shortcut.

---

# Parallel Aggregation

Large analytical queries often use multiple CPU cores.

Example

```
Table

↓

Split into Chunks

↓

Worker 1

↓

Partial SUM

----------------

Worker 2

↓

Partial SUM

----------------

Worker 3

↓

Partial SUM

↓

Combine Partial Results

↓

Final SUM
```

This is called

```
Parallel Aggregation
```

and is common in PostgreSQL, Snowflake, SQL Server, and other modern databases.

---

# Think Like a Data Engineer

Suppose your fact table contains

```
2 Billion Rows
```

Query

```sql
SELECT

SUM(sales_amount)

FROM fact_sales;
```

Optimization opportunities include

- Table partitioning
- Parallel workers
- Predicate pushdown
- Compression
- Materialized aggregates

Not rewriting SUM itself.

---

# Reading EXPLAIN ANALYZE

Example

```sql
EXPLAIN ANALYZE

SELECT

department,

SUM(salary)

FROM employees

GROUP BY department;
```

Possible output

```
HashAggregate

↓

Seq Scan

↓

employees
```

Interpretation

```
Sequential Scan

↓

Read Rows

↓

Hash Aggregate

↓

Produce Groups
```

---

# Common Execution Plans

```
Seq Scan

↓

Aggregate
```

Whole-table aggregate.

---

```
Index Scan

↓

Aggregate
```

Uses an index.

---

```
Seq Scan

↓

Hash Aggregate
```

Typical GROUP BY query.

---

```
Parallel Seq Scan

↓

Partial Aggregate

↓

Gather

↓

Finalize Aggregate
```

Large analytical workload.

---

# Performance Tips

✅ Create indexes for frequently queried MIN() and MAX() columns.

✅ Filter rows early using WHERE.

✅ Avoid unnecessary DISTINCT.

✅ Review execution plans with

```sql
EXPLAIN ANALYZE
```

✅ Keep PostgreSQL statistics up to date using

```sql
ANALYZE;
```

---

# Common Mistakes

❌ Assuming every aggregate uses the same execution strategy.

❌ Ignoring execution plans.

❌ Using COUNT(DISTINCT) unnecessarily.

❌ Expecting indexes to accelerate SUM() over entire tables.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    department VARCHAR(30),
    salary NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'IT',90000),

(2,'IT',60000),

(3,'HR',70000),

(4,'Finance',50000),

(5,'HR',65000);
```

---

## Create Index

```sql
CREATE INDEX idx_salary

ON employees(salary);
```

---

# Exercise 1

Run

```sql
EXPLAIN ANALYZE

SELECT

MIN(salary)

FROM employees;
```

Observe whether PostgreSQL chooses an index scan.

---

# Exercise 2

Run

```sql
EXPLAIN ANALYZE

SELECT

SUM(salary)

FROM employees;
```

Compare the plan with Exercise 1.

---

# Exercise 3

Run

```sql
EXPLAIN ANALYZE

SELECT

department,

SUM(salary)

FROM employees

GROUP BY department;
```

Identify whether PostgreSQL uses

- Hash Aggregate
- Group Aggregate

---

# Exercise 4

Run

```sql
EXPLAIN ANALYZE

SELECT

COUNT(DISTINCT department)

FROM employees;
```

Explain why the plan is more complex than

```sql
COUNT(department)
```

---

# Exercise 5

Add more rows to the table.

Observe how execution plans change as data volume increases.

---

# Interview Questions

## Beginner

1. What is an aggregate state?

2. Why does AVG require both a sum and a count?

3. Why must SUM usually read every qualifying row?

---

## Intermediate

1. Compare Hash Aggregate and Group Aggregate.

2. Why is COUNT(DISTINCT) generally more expensive?

3. How can an index improve MIN() and MAX()?

---

## Senior

1. Explain PostgreSQL's aggregate execution pipeline.

2. How would you optimize a GROUP BY query over a multi-billion-row fact table?

3. When would you choose partitioning or materialized aggregates instead of relying solely on query optimization?

---

# Section Summary

In this subsection, you learned:

- Aggregate functions maintain internal state while scanning rows.
- PostgreSQL commonly uses Hash Aggregate or Group Aggregate for grouped queries.
- `COUNT(DISTINCT)` is more expensive because it must eliminate duplicates before counting.
- `MIN()` and `MAX()` can often leverage indexes efficiently, while `SUM()` and `AVG()` usually require scanning all qualifying rows.
- Reading `EXPLAIN ANALYZE` is an essential skill for understanding and optimizing aggregate queries.

---

# Coming Up Next

## Section 16.11

# PostgreSQL Hands-on Lab

You'll build a realistic dataset with thousands of rows and practice:

- Every aggregate function
- NULL handling
- GROUP BY
- HAVING
- DISTINCT
- EXPLAIN ANALYZE
- Performance comparisons
- Real interview-style exercises


# ==========================================================
# Section 16.10
# Performance & Query Optimizer
# ==========================================================

# Introduction

So far, we have learned what aggregate functions return.

Now we'll answer a different question.

> **How does the database actually compute aggregate functions?**

Understanding execution strategies helps you

- Write faster SQL
- Read execution plans
- Design better indexes
- Optimize ETL jobs
- Improve dashboard performance

This section focuses on PostgreSQL while also discussing concepts common across modern relational databases.

---

# Logical Query Processing

Recall the logical order of execution.

```
FROM

↓

WHERE

↓

GROUP BY

↓

Aggregate Functions

↓

HAVING

↓

SELECT

↓

ORDER BY
```

Notice

The optimizer is free to change the **physical execution plan** while preserving the same logical result.

---

# Logical vs Physical Execution

Logical execution

```
Read Rows

↓

Create Groups

↓

Calculate SUM()

↓

Return Result
```

Physical execution may instead use

```
Index Scan

↓

Hash Aggregate

↓

Output
```

or

```
Parallel Scan

↓

Sort

↓

Group Aggregate

↓

Output
```

Different plans,

same result.

---

# Aggregate State

Aggregate functions do not calculate the final answer immediately.

Instead,

they maintain an internal state while scanning rows.

Example

```
SUM()

↓

Running Total

----------------

COUNT()

↓

Running Counter

----------------

AVG()

↓

Running Total

+

Running Counter

----------------

MIN()

↓

Current Minimum

----------------

MAX()

↓

Current Maximum
```

After the final row,

the aggregate state becomes the final result.

---

# Example

Table

| Salary |
|--------:|
|90000|
|60000|
|70000|

Running SUM

```
0

↓

90000

↓

150000

↓

220000

↓

Return
```

Running COUNT

```
0

↓

1

↓

2

↓

3

↓

Return
```

Running AVG

```
Running Sum = 220000

Running Count = 3

↓

220000 / 3

↓

73333.33
```

Notice

AVG is internally much closer to

```
SUM()

+

COUNT()
```

than most developers realize.

---

# Hash Aggregation

For GROUP BY queries,

PostgreSQL often chooses

```
Hash Aggregate
```

Execution

```
Read Row

↓

Calculate Group Key

↓

Hash Function

↓

Locate Bucket

↓

Update Aggregate State

↓

Repeat
```

Example

```
Department

↓

IT

↓

Hash Bucket

↓

Update SUM

Update COUNT

Update AVG
```

Hash aggregation is generally very efficient when all groups fit into memory.

---

# Sort Aggregation

Sometimes PostgreSQL chooses

```
Group Aggregate
```

instead.

Execution

```
Read Rows

↓

Sort by Group Key

↓

Scan Sorted Data

↓

Update Aggregate

↓

Return Groups
```

Example

Before Sort

```
HR

IT

Finance

HR

IT
```

After Sort

```
Finance

HR

HR

IT

IT
```

Grouping becomes straightforward because identical keys are adjacent.

---

# Hash Aggregate vs Group Aggregate

| Feature | Hash Aggregate | Group Aggregate |
|---------|----------------|-----------------|
| Requires Sort | No | Yes |
| Memory Usage | Higher | Lower (streaming possible) |
| Best For | Many unsorted rows | Already sorted data |
| Performance | Usually faster | Better when input is ordered |

The optimizer chooses the strategy based on estimated cost.

---

# COUNT(DISTINCT)

Why is

```sql
COUNT(DISTINCT department)
```

usually slower?

Because SQL must first identify duplicate values.

Conceptually

```
Read Value

↓

Already Seen?

↓

YES

↓

Ignore

↓

NO

↓

Store Value

↓

Continue
```

Internally,

the optimizer may use

- Hash Tables
- Sorting
- Temporary Disk Files

depending on data size.

---

# Index Optimization

Some aggregate functions can use indexes efficiently.

Example

```sql
SELECT

MIN(salary)

FROM employees;
```

If an index exists on

```
salary
```

PostgreSQL may retrieve

the first index entry

instead of scanning the entire table.

Similarly

```sql
MAX(salary)
```

may read

the last index entry.

This can reduce execution time dramatically.

---

# Why SUM() Usually Reads Every Row

Consider

```sql
SELECT

SUM(salary)

FROM employees;
```

Every salary contributes to the result.

Therefore,

the database usually must examine every qualifying row.

Unlike MIN or MAX,

there is no shortcut.

---

# Parallel Aggregation

Large analytical queries often use multiple CPU cores.

Example

```
Table

↓

Split into Chunks

↓

Worker 1

↓

Partial SUM

----------------

Worker 2

↓

Partial SUM

----------------

Worker 3

↓

Partial SUM

↓

Combine Partial Results

↓

Final SUM
```

This is called

```
Parallel Aggregation
```

and is common in PostgreSQL, Snowflake, SQL Server, and other modern databases.

---

# Think Like a Data Engineer

Suppose your fact table contains

```
2 Billion Rows
```

Query

```sql
SELECT

SUM(sales_amount)

FROM fact_sales;
```

Optimization opportunities include

- Table partitioning
- Parallel workers
- Predicate pushdown
- Compression
- Materialized aggregates

Not rewriting SUM itself.

---

# Reading EXPLAIN ANALYZE

Example

```sql
EXPLAIN ANALYZE

SELECT

department,

SUM(salary)

FROM employees

GROUP BY department;
```

Possible output

```
HashAggregate

↓

Seq Scan

↓

employees
```

Interpretation

```
Sequential Scan

↓

Read Rows

↓

Hash Aggregate

↓

Produce Groups
```

---

# Common Execution Plans

```
Seq Scan

↓

Aggregate
```

Whole-table aggregate.

---

```
Index Scan

↓

Aggregate
```

Uses an index.

---

```
Seq Scan

↓

Hash Aggregate
```

Typical GROUP BY query.

---

```
Parallel Seq Scan

↓

Partial Aggregate

↓

Gather

↓

Finalize Aggregate
```

Large analytical workload.

---

# Performance Tips

✅ Create indexes for frequently queried MIN() and MAX() columns.

✅ Filter rows early using WHERE.

✅ Avoid unnecessary DISTINCT.

✅ Review execution plans with

```sql
EXPLAIN ANALYZE
```

✅ Keep PostgreSQL statistics up to date using

```sql
ANALYZE;
```

---

# Common Mistakes

❌ Assuming every aggregate uses the same execution strategy.

❌ Ignoring execution plans.

❌ Using COUNT(DISTINCT) unnecessarily.

❌ Expecting indexes to accelerate SUM() over entire tables.

---

# PostgreSQL Practice Lab

## Create Table

```sql
CREATE TABLE employees
(
    employee_id INT PRIMARY KEY,
    department VARCHAR(30),
    salary NUMERIC(10,2)
);
```

---

## Insert Sample Data

```sql
INSERT INTO employees VALUES
(1,'IT',90000),

(2,'IT',60000),

(3,'HR',70000),

(4,'Finance',50000),

(5,'HR',65000);
```

---

## Create Index

```sql
CREATE INDEX idx_salary

ON employees(salary);
```

---

# Exercise 1

Run

```sql
EXPLAIN ANALYZE

SELECT

MIN(salary)

FROM employees;
```

Observe whether PostgreSQL chooses an index scan.

---

# Exercise 2

Run

```sql
EXPLAIN ANALYZE

SELECT

SUM(salary)

FROM employees;
```

Compare the plan with Exercise 1.

---

# Exercise 3

Run

```sql
EXPLAIN ANALYZE

SELECT

department,

SUM(salary)

FROM employees

GROUP BY department;
```

Identify whether PostgreSQL uses

- Hash Aggregate
- Group Aggregate

---

# Exercise 4

Run

```sql
EXPLAIN ANALYZE

SELECT

COUNT(DISTINCT department)

FROM employees;
```

Explain why the plan is more complex than

```sql
COUNT(department)
```

---

# Exercise 5

Add more rows to the table.

Observe how execution plans change as data volume increases.

---

# Interview Questions

## Beginner

1. What is an aggregate state?

2. Why does AVG require both a sum and a count?

3. Why must SUM usually read every qualifying row?

---

## Intermediate

1. Compare Hash Aggregate and Group Aggregate.

2. Why is COUNT(DISTINCT) generally more expensive?

3. How can an index improve MIN() and MAX()?

---

## Senior

1. Explain PostgreSQL's aggregate execution pipeline.

2. How would you optimize a GROUP BY query over a multi-billion-row fact table?

3. When would you choose partitioning or materialized aggregates instead of relying solely on query optimization?

---

# Section Summary

In this subsection, you learned:

- Aggregate functions maintain internal state while scanning rows.
- PostgreSQL commonly uses Hash Aggregate or Group Aggregate for grouped queries.
- `COUNT(DISTINCT)` is more expensive because it must eliminate duplicates before counting.
- `MIN()` and `MAX()` can often leverage indexes efficiently, while `SUM()` and `AVG()` usually require scanning all qualifying rows.
- Reading `EXPLAIN ANALYZE` is an essential skill for understanding and optimizing aggregate queries.

---

# Coming Up Next

## Section 16.11

# PostgreSQL Hands-on Lab

You'll build a realistic dataset with thousands of rows and practice:

- Every aggregate function
- NULL handling
- GROUP BY
- HAVING
- DISTINCT
- EXPLAIN ANALYZE
- Performance comparisons
- Real interview-style exercises


# ==========================================================
# Section 16.12
# Interview Mastery
# ==========================================================

# Introduction

Aggregate functions are among the most frequently asked SQL interview topics.

Questions involving

- COUNT()
- SUM()
- AVG()
- GROUP BY
- HAVING
- NULL handling

appear in interviews for

- Data Analyst
- Business Intelligence Engineer
- ETL Developer
- Data Engineer
- Analytics Engineer
- SQL Developer

This section prepares you to answer these questions confidently while explaining the reasoning behind every answer.

---

# Interview Strategy

Don't memorize answers.

Instead,

follow this thinking process.

```
Step 1

↓

Understand the Question

↓

Step 2

↓

Identify NULL Values

↓

Step 3

↓

Determine Which Aggregate Is Used

↓

Step 4

↓

Remember the NULL Rule

↓

Step 5

↓

Predict the Result

↓

Step 6

↓

Explain WHY
```

Interviewers care more about your reasoning than your final answer.

---

# Question 1

Table

| Salary |
|--------:|
|90000|
|60000|
|NULL|
|70000|

Predict

```sql
SELECT

COUNT(*)

FROM employees;
```

Think

```
COUNT(*)

↓

Counts Rows

↓

4
```

Correct Answer

```
4
```

---

# Question 2

Same table

Predict

```sql
SELECT

COUNT(salary)

FROM employees;
```

Think

```
Known Salaries

↓

90000

60000

70000

↓

3
```

Correct Answer

```
3
```

---

# Question 3

Predict

```sql
SELECT

SUM(salary)

FROM employees;
```

Think

```
NULL Ignored

↓

90000

+

60000

+

70000

↓

220000
```

Correct Answer

```
220000
```

---

# Question 4

Predict

```sql
SELECT

AVG(salary)

FROM employees;
```

Think

```
SUM

↓

220000

COUNT(column)

↓

3

↓

73333.33
```

Correct Answer

```
73333.33
```

---

# Question 5

Predict

```sql
SELECT

MIN(salary),

MAX(salary)

FROM employees;
```

Correct Answer

| MIN | MAX |
|----:|----:|
|60000|90000|

NULL values are ignored.

---

# Question 6

Table

| Salary |
|--------|
|NULL|
|NULL|
|NULL|

Predict

```sql
SELECT

COUNT(*),

COUNT(salary),

SUM(salary),

AVG(salary),

MIN(salary),

MAX(salary)

FROM employees;
```

Correct Answer

| Function | Result |
|----------|--------|
| COUNT(*) |3|
| COUNT(salary)|0|
| SUM()|NULL|
| AVG()|NULL|
| MIN()|NULL|
| MAX()|NULL|

---

# Question 7

Predict

```sql
SELECT

COUNT(DISTINCT department)

FROM employees;
```

Departments

```
IT

IT

HR

NULL

Finance

NULL
```

Reasoning

```
Remove Duplicates

↓

IT

HR

Finance

NULL

↓

Ignore NULL

↓

3
```

Correct Answer

```
3
```

---

# Question 8

Predict

```sql
SELECT

department,

COUNT(*)

FROM employees

GROUP BY department;
```

Question

Does NULL create its own group?

Answer

Yes.

Every NULL department belongs to one NULL group.

---

# Question 9

Predict

```sql
SELECT

department,

COUNT(salary)

FROM employees

GROUP BY department;
```

Finance

```
NULL

NULL
```

Answer

```
Finance

↓

0
```

Rows exist,

but every salary is NULL.

---

# Question 10

Predict

```sql
SELECT

department,

SUM(salary)

FROM employees

GROUP BY department;
```

Finance

```
NULL

NULL
```

Answer

```
SUM

↓

NULL
```

---

# Question 11

Which query is correct?

Option A

```sql
AVG(

COALESCE(salary,0)

)
```

Option B

```sql
COALESCE(

AVG(salary),

0

)
```

Correct Answer

Usually

```
Option B
```

Reason

Option A changes the calculation.

Option B changes only the displayed result.

---

# Question 12

Which query counts employees?

Option A

```sql
COUNT(*)
```

Option B

```sql
COUNT(employee_id)
```

Answer

Usually

```
COUNT(*)
```

Although `employee_id` is often NOT NULL, `COUNT(*)` expresses the intent more clearly: count rows.

---

# Whiteboard Challenge

Without executing SQL,

predict the result.

| Department | Salary |
|------------|--------:|
| IT |90000|
| IT |NULL|
| HR |60000|
| HR |70000|
| Finance |NULL|

Query

```sql
SELECT

department,

COUNT(*),

COUNT(salary),

SUM(salary),

AVG(salary)

FROM employees

GROUP BY department;
```

Expected Answer

| Department | COUNT(*) | COUNT(salary) | SUM | AVG |
|------------|----------:|--------------:|----:|----:|
| IT |2|1|90000|90000|
| HR |2|2|130000|65000|
| Finance |1|0|NULL|NULL|

---

# Debugging Scenario 1

Dashboard

```
Average Salary

↓

Unexpectedly Low
```

Investigation

Developer changed

```sql
AVG(salary)
```

to

```sql
AVG(

COALESCE(salary,0)

)
```

Question

What happened?

Expected Discussion

Unknown salaries became zero,

reducing the average.

---

# Debugging Scenario 2

Dashboard

```
Employee Count

↓

Incorrect
```

Query

```sql
COUNT(salary)
```

Business Requirement

```
Total Employees
```

Problem

Rows with NULL salary were excluded.

Solution

```sql
COUNT(*)
```

---

# Senior Data Engineer Discussion

Suppose

```
5 Billion Rows
```

Question

Would you optimize

```
SUM()

or

Table Scan?
```

Expected Answer

Optimize

- Partitioning
- Filtering
- Indexing (where applicable)
- Parallel Execution

The aggregate calculation itself is inexpensive.

---

# Communication Interview

An executive asks

> "Why does the report show NULL instead of ₹0?"

Good Answer

> "NULL means the system does not know the value yet. Displaying zero would imply a confirmed value of ₹0, which changes the business meaning."

Notice

This explains the issue without technical jargon.

---

# Rapid Fire Questions

1. Does COUNT(*) ignore NULL?

Answer

No.

---

2. Does COUNT(column) ignore NULL?

Answer

Yes.

---

3. Does SUM() ignore NULL?

Answer

Yes.

---

4. Does AVG() divide by COUNT(*)?

Answer

No.

---

5. Does MIN() ignore NULL?

Answer

Yes.

---

6. Does GROUP BY ignore NULL?

Answer

No.

It creates one NULL group.

---

7. Does DISTINCT return multiple NULL values?

Answer

No.

Only one.

---

8. Does COUNT(DISTINCT) count NULL?

Answer

No.

---

9. Can SUM() return NULL?

Answer

Yes.

If every value is NULL.

---

10. Is NULL the same as zero?

Answer

Never.

---

# Common Interview Mistakes

❌ Assuming NULL equals zero.

❌ Confusing COUNT(*) with COUNT(column).

❌ Forgetting that AVG ignores NULL values.

❌ Treating GROUP BY and DISTINCT as identical.

❌ Explaining syntax without explaining business impact.

---

# Senior Interview Tips

When answering aggregate questions,

always explain

1. SQL behavior.

2. NULL handling.

3. Business meaning.

4. Performance considerations.

5. Alternative approaches.

This demonstrates senior-level thinking.

---

# Master Checklist

Before answering any aggregate interview question,

verify

✓ Am I counting rows or values?

✓ Are NULL values ignored?

✓ Is GROUP BY involved?

✓ Does DISTINCT change the result?

✓ Does the business want Unknown or Zero?

✓ Is the question about correctness or performance?

---

# Interview Master Summary

After completing this section, you should be able to

✅ Predict aggregate results without executing SQL.

✅ Explain NULL behavior confidently.

✅ Debug incorrect reports.

✅ Communicate technical concepts to business stakeholders.

✅ Answer aggregate-function interview questions at Beginner, Intermediate, and Senior levels.

---

# Coming Up Next

## Section 16.13

# Aggregate Functions Cheat Sheet

A one-page reference containing

- Every aggregate function
- NULL behavior
- Return values
- Common mistakes
- Performance notes
- Interview tips

This will serve as your quick revision guide before interviews.


# ==========================================================
# Section 16.13
# Aggregate Functions Cheat Sheet
# ==========================================================

# Introduction

This cheat sheet summarizes everything covered in the Aggregate Functions section.

Use it for

- Interview Revision
- Daily SQL Development
- Dashboard Development
- ETL Validation
- Data Engineering
- BI Reporting

---

# Aggregate Function Summary

| Function | Purpose | Ignores NULL | All NULL Result |
|----------|---------|--------------|-----------------|
| `COUNT(*)` | Count rows | ❌ No | Number of rows |
| `COUNT(column)` | Count known values | ✅ Yes | 0 |
| `COUNT(DISTINCT column)` | Count unique known values | ✅ Yes | 0 |
| `SUM(column)` | Total | ✅ Yes | NULL |
| `AVG(column)` | Average | ✅ Yes | NULL |
| `MIN(column)` | Smallest value | ✅ Yes | NULL |
| `MAX(column)` | Largest value | ✅ Yes | NULL |

---

# What Each Function Counts

```
COUNT(*)

↓

Rows

----------------

COUNT(column)

↓

Known Values

----------------

COUNT(DISTINCT)

↓

Unique Known Values

----------------

SUM()

↓

Known Numeric Values

----------------

AVG()

↓

Known Numeric Values

----------------

MIN()

↓

Smallest Known Value

----------------

MAX()

↓

Largest Known Value
```

---

# NULL Behavior Summary

| Situation | Result |
|-----------|--------|
| NULL inside COUNT(*) | Counted |
| NULL inside COUNT(column) | Ignored |
| NULL inside SUM() | Ignored |
| NULL inside AVG() | Ignored |
| NULL inside MIN() | Ignored |
| NULL inside MAX() | Ignored |
| NULL inside DISTINCT | One NULL returned |
| NULL inside COUNT(DISTINCT) | Ignored |

---

# All-NULL Dataset

Dataset

```
NULL

NULL

NULL
```

Results

| Query | Result |
|--------|--------|
| COUNT(*) | 3 |
| COUNT(column) | 0 |
| COUNT(DISTINCT column) | 0 |
| SUM(column) | NULL |
| AVG(column) | NULL |
| MIN(column) | NULL |
| MAX(column) | NULL |

---

# GROUP BY Summary

```
GROUP BY

↓

Create Groups

↓

Each Group

↓

Independent Aggregation
```

Every group has its own

- COUNT
- SUM
- AVG
- MIN
- MAX

NULL groups are **not ignored**.

---

# COUNT Comparison

| Query | Meaning |
|--------|---------|
| `COUNT(*)` | Number of rows |
| `COUNT(salary)` | Employees with known salaries |
| `COUNT(DISTINCT salary)` | Unique salary values |

Always ask

```
Rows?

or

Values?
```

---

# AVG Formula

Conceptually

```
AVG(column)

=

SUM(column)

/

COUNT(column)
```

Never

```
SUM(column)

/

COUNT(*)
```

---

# COALESCE Placement

Correct

```sql
COALESCE(

SUM(salary),

0

)
```

Changes only the displayed result.

---

Incorrect

```sql
SUM(

COALESCE(salary,0)

)
```

Changes the calculation.

---

Correct

```sql
COALESCE(

AVG(salary),

0

)
```

---

Incorrect

```sql
AVG(

COALESCE(salary,0)

)
```

---

# GROUP BY Example

```sql
SELECT

department,

COUNT(*),

COUNT(salary),

SUM(salary),

AVG(salary),

MIN(salary),

MAX(salary)

FROM employees

GROUP BY department;
```

One query,

multiple KPIs.

---

# Logical Query Processing

```
FROM

↓

WHERE

↓

GROUP BY

↓

Aggregate Functions

↓

HAVING

↓

SELECT

↓

ORDER BY
```

Remember

WHERE filters rows.

HAVING filters groups.

---

# Performance Cheat Sheet

| Aggregate | Can Use Index Efficiently? |
|-----------|----------------------------|
| COUNT(*) | Sometimes |
| COUNT(column) | Sometimes |
| SUM() | Usually scans qualifying rows |
| AVG() | Usually scans qualifying rows |
| MIN() | ✅ Often |
| MAX() | ✅ Often |
| COUNT(DISTINCT) | Usually expensive |

---

# PostgreSQL Execution Plans

Common plans

```
Seq Scan

↓

Aggregate
```

---

```
Seq Scan

↓

HashAggregate
```

---

```
Sort

↓

GroupAggregate
```

---

```
Index Scan

↓

Aggregate
```

---

```
Parallel Seq Scan

↓

Partial Aggregate

↓

Finalize Aggregate
```

---

# Business Rules

Before writing an aggregate query,

ask

```
Does NULL mean

Unknown?

Pending?

Not Applicable?

Missing?

Zero?
```

Never assume.

---

# Common Mistakes

❌ Using COUNT(column) instead of COUNT(*).

❌ Dividing by COUNT(*).

❌ Replacing NULL with zero inside aggregates.

❌ Forgetting that SUM() returns NULL for all-NULL datasets.

❌ Confusing GROUP BY with DISTINCT.

---

# Best Practices

✅ Count rows with COUNT(*).

✅ Count values with COUNT(column).

✅ Use COALESCE for presentation when appropriate.

✅ Test all-NULL datasets.

✅ Test mixed NULL/non-NULL datasets.

✅ Verify business meaning before replacing NULL.

---

# Interview One-Liners

Question

Does COUNT(*) ignore NULL?

Answer

```
No.

It counts rows.
```

---

Question

Does SUM() ignore NULL?

Answer

```
Yes.
```

---

Question

Can SUM() return NULL?

Answer

```
Yes.

When every value is NULL.
```

---

Question

Does AVG() divide by COUNT(*)?

Answer

```
No.

It divides by COUNT(column).
```

---

Question

Does GROUP BY ignore NULL?

Answer

```
No.

It creates one NULL group.
```

---

Question

Does DISTINCT return multiple NULL values?

Answer

```
No.

Only one.
```

---

Question

Does COUNT(DISTINCT) include NULL?

Answer

```
No.
```

---

# Quick Decision Tree

```
Need Number of Rows?

↓

COUNT(*)

----------------

Need Number of Known Values?

↓

COUNT(column)

----------------

Need Number of Unique Values?

↓

COUNT(DISTINCT column)

----------------

Need Total?

↓

SUM()

----------------

Need Average?

↓

AVG()

----------------

Need Lowest Value?

↓

MIN()

----------------

Need Highest Value?

↓

MAX()
```

---

# Senior Data Engineer Checklist

Before deploying an aggregate query

✓ Verify NULL meaning.

✓ Test all-NULL datasets.

✓ Test mixed datasets.

✓ Validate business calculations.

✓ Review EXPLAIN ANALYZE.

✓ Verify indexes.

✓ Review execution plan.

✓ Confirm KPI correctness with stakeholders.

---

# Memory Tricks

```
COUNT(*)

↓

Rows

----------------

COUNT(column)

↓

Values

----------------

SUM

AVG

MIN

MAX

↓

Ignore NULL

----------------

GROUP BY

↓

NULL Creates Group

----------------

DISTINCT

↓

One NULL

----------------

COUNT(DISTINCT)

↓

Ignore NULL
```

---

# Final Takeaway

If you remember only five rules from this chapter,

remember these:

1. `COUNT(*)` counts rows.

2. `COUNT(column)` ignores NULL values.

3. `AVG(column)` behaves like `SUM(column) / COUNT(column)`.

4. `SUM()`, `AVG()`, `MIN()`, and `MAX()` return **NULL** when every input value is NULL.

5. Never replace NULL with zero unless the business explicitly defines them as equivalent.

---

# Coming Up Next

## Section 16.14

# Aggregate Functions Summary

We'll conclude this mini-chapter by reviewing the key concepts, connecting them to real-world data engineering, and preparing for the next major topic in Chapter 34.


# ==========================================================
# Section 16.14
# Aggregate Functions Summary
# ==========================================================

# Introduction

Congratulations!

You have completed one of the most important sections in SQL.

Aggregate functions are used in almost every SQL application, including

- Reporting
- Business Intelligence
- ETL Pipelines
- Data Warehouses
- Data Engineering
- Analytics
- Machine Learning Data Preparation

Understanding how aggregate functions interact with NULL values is essential for writing reliable SQL.

This section summarizes everything you've learned.

---

# The Big Picture

Aggregate functions answer questions about a collection of rows.

Examples

```
How many?

↓

COUNT()

----------------

How much?

↓

SUM()

----------------

What is the average?

↓

AVG()

----------------

What is the smallest?

↓

MIN()

----------------

What is the largest?

↓

MAX()
```

Instead of returning one row for every input row,

aggregate functions summarize an entire dataset or a group of rows into meaningful business metrics.

---

# The Most Important Rule

If you remember only one rule,

remember this.

> **Except for `COUNT(*)`, aggregate functions ignore NULL values.**

This single rule explains the behavior of almost every aggregate function.

---

# Master Comparison

| Function | Counts Rows | Ignores NULL | All NULL Result |
|----------|-------------|--------------|-----------------|
| COUNT(*) | ✅ | ❌ | Number of Rows |
| COUNT(column) | ❌ | ✅ | 0 |
| COUNT(DISTINCT column) | ❌ | ✅ | 0 |
| SUM(column) | ❌ | ✅ | NULL |
| AVG(column) | ❌ | ✅ | NULL |
| MIN(column) | ❌ | ✅ | NULL |
| MAX(column) | ❌ | ✅ | NULL |

This table should become second nature.

---

# How NULL Changes Aggregation

Imagine

```
90000

60000

NULL

70000

NULL
```

SQL evaluates this as

```
Known Values

↓

90000

60000

70000
```

The NULL values do not become

```
0
```

They simply do not participate in the calculation.

---

# COUNT Family Summary

Three COUNT functions answer three different questions.

| Question | Function |
|----------|----------|
| How many rows exist? | COUNT(*) |
| How many known values exist? | COUNT(column) |
| How many unique known values exist? | COUNT(DISTINCT column) |

Choosing the wrong COUNT function produces incorrect reports.

---

# AVG Formula

Conceptually,

SQL calculates

```
AVG(column)

=

SUM(column)

/

COUNT(column)
```

Notice

```
COUNT(column)

NOT

COUNT(*)
```

This explains why NULL values do not reduce the average.

---

# GROUP BY Summary

Remember

```
GROUP BY

↓

Creates Groups

↓

Each Group

↓

Independent Aggregation
```

Every group has its own

- COUNT
- SUM
- AVG
- MIN
- MAX

NULL groups are valid groups.

---

# All-NULL Dataset

Dataset

```
NULL

NULL

NULL
```

Results

| Aggregate | Result |
|-----------|--------|
| COUNT(*) | 3 |
| COUNT(column) | 0 |
| COUNT(DISTINCT column) | 0 |
| SUM() | NULL |
| AVG() | NULL |
| MIN() | NULL |
| MAX() | NULL |

Understanding this table prevents many production bugs.

---

# The COALESCE Rule

Presentation

```sql
COALESCE(

SUM(salary),

0

)
```

↓

Usually Safe

---

Calculation

```sql
SUM(

COALESCE(salary,0)

)
```

↓

Changes Business Logic

Always understand the difference.

---

# Performance Summary

Some aggregate functions can leverage indexes.

| Function | Typical Optimization |
|----------|----------------------|
| MIN() | Index Scan |
| MAX() | Index Scan |
| COUNT(*) | May benefit from indexes, but often depends on filters and execution plan |
| SUM() | Reads qualifying rows |
| AVG() | Reads qualifying rows |
| COUNT(DISTINCT) | Hashing or Sorting |

Performance depends on

- Table size
- Filtering
- Grouping
- Available indexes
- Optimizer decisions

Always verify using

```sql
EXPLAIN ANALYZE
```

---

# Think Like a Data Engineer

Every aggregate query should begin with one question.

> **What does NULL mean?**

Possible meanings

- Unknown
- Pending
- Not Applicable
- Missing
- Not Yet Calculated
- Source System Error

The answer determines whether SQL's default behavior is correct.

---

# Real-World Lessons

Throughout this chapter,

we encountered reporting scenarios from

- Banking
- Healthcare
- Human Resources
- E-commerce
- Logistics

The lesson was always the same.

A SQL query can be technically correct,

yet still produce the wrong business result.

Understanding the business meaning of NULL is just as important as understanding SQL syntax.

---

# Key Takeaways

After completing this chapter,

you should be able to

✅ Explain how every aggregate function handles NULL.

✅ Predict query output without executing SQL.

✅ Understand why COUNT(*) differs from COUNT(column).

✅ Explain why AVG ignores NULL values.

✅ Handle all-NULL datasets correctly.

✅ Build grouped aggregate reports.

✅ Read PostgreSQL execution plans involving aggregates.

✅ Avoid common enterprise reporting mistakes.

---

# Common Mistakes to Avoid

❌ Assuming NULL equals zero.

❌ Choosing COUNT(column) when COUNT(*) is required.

❌ Using AVG(COALESCE(column,0)) without understanding the business impact.

❌ Forgetting that SUM() returns NULL for all-NULL datasets.

❌ Ignoring execution plans for large aggregation queries.

---

# Final Interview Checklist

Before answering an aggregate function interview question,

ask yourself

✓ Am I counting rows or values?

✓ Does NULL participate in this calculation?

✓ Does GROUP BY change the result?

✓ Is DISTINCT involved?

✓ Does the business want Unknown or Zero?

✓ Can I explain my reasoning?

---

# What You've Mastered

You can now confidently work with

✓ COUNT(*)

✓ COUNT(column)

✓ COUNT(DISTINCT)

✓ SUM()

✓ AVG()

✓ MIN()

✓ MAX()

✓ GROUP BY

✓ HAVING

✓ COALESCE

✓ NULL Handling

✓ Execution Plans

✓ Aggregate Performance

These concepts form the foundation of analytical SQL.

---

# Preparing for the Next Section

Aggregate functions summarize data.

The next major topic focuses on something different.

Instead of reducing many rows into one,

we'll calculate values **across rows while keeping every row visible.**

This introduces one of the most powerful features in modern SQL.

# Next Section

## Window Functions

You'll learn

- What window functions are
- How they differ from aggregate functions
- OVER() clause
- PARTITION BY
- ORDER BY inside windows
- Running totals
- Moving averages
- Ranking functions
- LEAD() and LAG()
- Real-world analytical queries

Window functions are one of the most frequently used features in modern Data Engineering, Analytics, and Business Intelligence.

---

# Final Words

Aggregate functions may appear simple,

but they are the foundation of analytical SQL.

Mastering

- NULL handling
- Aggregate behavior
- GROUP BY
- HAVING
- Performance optimization

will help you build reliable reports, write production-quality SQL, and perform confidently in technical interviews.

This concludes the Aggregate Functions mini-chapter.