-- the seeds file brings in the data 
-- the first line of code tells us what database we want to use.

use employees;
-- INSERT INTO: Will tell us what table we want to put the data into.
INSERT INTO department
-- Then we select the column or columns we want to insert into.
    (name)
-- Then we provide the values to add into the column...
values
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES 
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 7, 7);