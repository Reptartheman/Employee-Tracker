-- LINE 3: makes sure that we create the only copy of the database we want to access.
-- LINE 4: creates the database.
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

-- USE will let us know what database we want to use in order to create tables.
-- The database will have three tables.
USE employees;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- UNSIGNED: stores only positive values
-- AUTO INCREMENT: will generate a unique number when a new record is inserted into the table.
-- NOT NULL: will let us know that we cannot use NULL values.


-- All of the tables we make will have a primary key which will let us uniquely identify each record.
    --This will also allow us to retrieve all of the data and join tables easier.

-- The index cannot be seen by the user but they help retrieve data quicker.
    -- This happens by setting up the column data of our search conditions to be sorted in order.
    -- In our case we will create an index of our department_id

-- Constraints: These are rules for the data in the table.
    -- This will prevent action that would destroy links between tables that we will create using foreign keys.
    -- Constraints also limit the type of data that can go into the table.

-- Foreign key: This is where two tables will link...
    -- The table with the primary key is the parent table.
    -- The table with the foreign key is the child table.
-- The foreignkey() function will create a foreign key. Inside of the parenthesis is where we specify where we want the link to happen.
-- In this case we want FOREIGN KEY (department_id). We are referencing the department table, specifically the id column.


CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_ind (department_id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);



-- ON DELETE CASCADE: Allows us to delete the parent key record and its children records without having to delete all of the children records first.
    -- This is an example of a many-to-many relationship!!

-- The table flow is as follows: 
    -- DEPARTMENT (id = PRIMARY KEY) --> ROLE (id = PRIMARY KEY)(department_id = FOREIGN KEY) -> EMPLOYEE (id = PRIMARY KEY)(role_id = FOREIGN KEY)(manager_id = FOREIGN KEY)

        -- The DEPARTMENT table contains the department id column
        -- The ROLE table contains each department which can have multiple roles.
        -- The EMPLOYEE table contains each role which can have multiple employees.

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_ind (role_id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    INDEX man_ind (manager_id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);