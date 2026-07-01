# Chapter 2: Relational Databases

> **Part:** SQL Foundations
>
> **Chapter:** 2
>
> **Difficulty:** 🟢 Beginner
>
> **Estimated Reading Time:** 35–45 minutes
>
> **Prerequisites:** Chapter 1 – What is SQL?
>
> **Target Audience:** Beginners, Data Analysts, ETL Developers, Data Engineers
>
> **Version:** 1.0
>
> **Last Updated:** YYYY-MM-DD

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand what a database is.
- Understand the difference between data and information.
- Explain what a relational database is.
- Explain why relational databases were invented.
- Understand tables, rows, columns, and relationships.
- Explain why SQL is designed specifically for relational databases.
- Understand where relational databases are used in real-world systems.

---

# Quick Revision

- A database is an organized collection of data.
- A relational database stores data in related tables.
- Tables are connected using keys.
- SQL is designed to query and manage relational databases.
- Most business applications still rely on relational databases.

---

# Introduction

Before learning SQL syntax, we must understand **what SQL is querying**.

SQL is not executed against random files or spreadsheets.

It is executed against a **Relational Database Management System (RDBMS)**.

Understanding relational databases makes every SQL concept easier to understand.

---

# What Is Data?

Data is a collection of raw facts that, by themselves, may not have much meaning.

Examples:

| CustomerID | Name | Balance |
|------------|------|---------|
| 101 | Alice | 45000 |
| 102 | Bob | 12000 |

These are raw values.

By themselves, they are data.

---

# What Is Information?

Information is data that has been processed into something meaningful.

Example:

> The bank has 25,000 active customers.

> Today's total transaction value is ₹8.2 Crore.

> Alice has the highest account balance in her branch.

These are no longer raw values—they are useful business information derived from data.

---

# What Is a Database?

A database is an organized system for storing, managing, and retrieving data efficiently.

Instead of storing thousands or millions of records in spreadsheets or text files, organizations use databases because they provide:

- Fast retrieval
- Secure storage
- Concurrent access
- Data consistency
- Backup and recovery
- Scalability

Without databases, managing modern applications would be nearly impossible.

---

# Why Were Databases Invented?

Imagine a bank storing customer information in Excel files.

One spreadsheet contains customer details.

Another contains account details.

Another contains transactions.

As the bank grows:

- Files become larger.
- Duplicate data appears.
- Multiple employees overwrite each other's changes.
- Searching becomes slow.
- Relationships become difficult to maintain.

Databases solve these problems by providing a structured, centralized way to store and manage data.

---

# What Is a Relational Database?

A relational database stores data in **tables** and connects those tables using **relationships**.

Instead of keeping everything in one massive table, related information is divided into multiple smaller tables.

For example:

```
Customers
──────────────
CustomerID
Name
Phone

Accounts
──────────────
AccountID
CustomerID
AccountType
Balance

Transactions
──────────────────
TransactionID
AccountID
Amount
TransactionDate
```

Notice that the `Accounts` table does not repeat customer details such as name or phone number.

Instead, it stores only the `CustomerID`, creating a relationship back to the `Customers` table.

This approach reduces duplication and improves data integrity.

---

# Understanding Relationships

The word **Relational** comes from the relationships between tables.

For example:

```
Customers
    │
    │ CustomerID
    ▼
Accounts
    │
    │ AccountID
    ▼
Transactions
```

One customer can own multiple accounts.

One account can have thousands of transactions.

These relationships allow us to answer complex business questions efficiently.

---

# Why Not Store Everything in One Table?

Imagine a single table like this:

| Customer | Phone | Account | Balance | Transaction |
|----------|--------|----------|----------|-------------|

Every transaction would repeat:

- Customer Name
- Phone Number
- Address
- Email

Thousands of times.

This leads to:

- Data duplication
- Increased storage
- Inconsistent updates
- Difficult maintenance
- Poor performance

Relational databases avoid these problems by separating related information into multiple tables.

---

# Real-World Banking Example

Suppose Alice has:

- One savings account
- One salary account

Each account records thousands of transactions.

Instead of storing Alice's personal details in every transaction, the database stores them once in the `Customers` table.

The `Accounts` table references Alice using `CustomerID`.

The `Transactions` table references each account using `AccountID`.

This design minimizes redundancy and ensures consistency.

---

# Why Relational Databases Became Popular

Relational databases introduced several major advantages:

- Reduced data duplication
- Improved consistency
- Easier maintenance
- Better security
- Efficient querying
- Strong support for transactions
- Data integrity through constraints and relationships

These advantages made relational databases the standard choice for business applications.

---

# Common Relational Database Systems

Some of the most widely used relational database systems include:

| Database | Typical Use Cases |
|-----------|-------------------|
| PostgreSQL | Open-source applications, analytics, enterprise systems |
| SQL Server | Enterprise applications, business intelligence |
| Oracle Database | Large-scale enterprise systems |
| MySQL | Web applications, e-commerce |
| Snowflake | Cloud-native data warehousing |
| SQLite | Mobile apps, embedded systems |

Although these systems differ in features and syntax, they all follow the relational model.

---

# Deep Dive

## Why Is It Called the Relational Model?

Many people believe the word *relational* refers simply to relationships between tables.

That explanation is useful for beginners but is incomplete.

The relational model, proposed by **Edgar F. Codd** in 1970, is based on mathematical concepts from **set theory** and **predicate logic**.

In this model:

- A table is formally called a **relation**.
- A row is a **tuple**.
- A column is an **attribute**.
- The complete collection of valid values for an attribute is its **domain**.

These formal definitions allow databases to reason about data consistently and support powerful operations such as joins, projections, and selections.

You do not need to master the mathematics to use SQL effectively, but understanding that SQL is built on a rigorous theoretical foundation helps explain why relational databases behave the way they do.

---

# Real-World Data Engineering Perspective

As a Data Engineer, you'll work with relational databases every day.

Typical tasks include:

- Reading operational data
- Joining multiple tables
- Building ETL pipelines
- Creating fact tables
- Building dimension tables
- Performing data quality checks
- Loading data into warehouses
- Supporting dashboards and analytics

A strong understanding of relational design makes these tasks much easier.

---

# Common Misconceptions

### "A database is the same as a table."

Incorrect.

A database contains many objects, including tables, views, indexes, stored procedures, functions, and more.

---

### "Relational databases are outdated."

Incorrect.

Modern cloud platforms such as Snowflake, Azure SQL Database, Amazon RDS, and Google Cloud SQL all rely on relational concepts.

Even distributed SQL engines such as Spark SQL and Databricks SQL use relational principles.

---

### "Excel is a database."

Excel can store data, but it does not provide the robust transactional, relational, concurrency, and integrity features of a relational database management system.

---

# Chapter Summary

- Data consists of raw facts.
- Information is processed, meaningful data.
- A database stores and manages data efficiently.
- A relational database organizes data into related tables.
- Relationships reduce duplication and improve consistency.
- SQL is specifically designed to work with relational databases.
- Understanding the relational model is essential before learning SQL syntax.

---

# What's Next?

In the next chapter, we'll explore **Database Architecture**, where we'll answer questions such as:

- What is an RDBMS?
- What are database instances?
- What are schemas?
- How are databases organized internally?
- Where do tables actually live?
- How do users connect to a database?