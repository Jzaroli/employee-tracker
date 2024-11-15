-- Creates db
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- Connects to db
\c employees_db;

-- Creates departments table
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

-- Creates roles table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    dept_id INTEGER,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- Creates employees table
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    manager VARCHAR(30)
);