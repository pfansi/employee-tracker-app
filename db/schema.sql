-- this will build database and create table 
DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE DEPARTMENT (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE ROLES (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
        REFERENCES DEPARTMENT (id)
        ON DELETE SET NULL
);


CREATE TABLE EMPLOYEE (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (roles_id)
        REFERENCES ROLES(id)
        ON DELETE RESTRICT 
        ON UPDATE CASCADE,
  FOREIGN KEY (manager_id)
        REFERENCES EMPLOYEE(id)
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);