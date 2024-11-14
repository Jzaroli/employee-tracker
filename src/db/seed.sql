-- Connects to the database
\c employees_db;

-- Inserts seed data into departments table

INSERT INTO departments (dept_name) VALUES
('Engineering'),
('Finance'),
('Procurement'),
('Legal'),
('Sales'),
('Marketing'),
('HR');

-- Inserts seed data into roles table
INSERT INTO roles (title, salary, dept_id) VALUES
('Engineer', 150000, 1),
('Finance Manager', 130000, 2),
('Procurement Specialist', 90000, 3),
('VP of Legal', 200000, 4),
('Account Executive', 120000, 5),
('Marketing Manager', 140000, 6),
('HR Representative', 90000, 7);

-- Inserts seed data into employees table
INSERT INTO employees (first_name, last_name, role_id, manager) VALUES
('John', 'Smith', 1, 'None'),
('Jane', 'Dylan', 2, 'None'),
('Lebron', 'James', 3, 'Jane Dylan'),
('Nancy', 'Jordan', 4, 'None'),
('Elena', 'Wattles', 5, 'Bobby Thorogood'),
('Bobby', 'Thorogood', 6, 'None'),
('Maya', 'Ceprnic', 7, 'None');

