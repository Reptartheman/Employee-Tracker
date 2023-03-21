-- LINE 3: makes sure that we create the only copy of the database we want to access.
-- LINE 4: creates the database.
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees; 


USE employees;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
);