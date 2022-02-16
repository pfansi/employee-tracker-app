-- this will populate the tables in the database with dummy data 

INSERT INTO DEPARTMENT (name)
VALUES ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

SELECT * FROM DEPARTMENT;

INSERT INTO ROLES (title, salary, department_id)
VALUES ('Sales Lead', 100000, 3), 
  ('Salesperson', 80000, 3),
  ('Lead Engineer', 150000, 1),
  ('Software Engineer', 120000, 1),
  ('Account Manager', 160000, 2),
  ('Accountant', 125000, 2),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

SELECT * FROM ROLES;

INSERT INTO EMPLOYEE (first_name, last_name, roles_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);

SELECT * FROM EMPLOYEE;