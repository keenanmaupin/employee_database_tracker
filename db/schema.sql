DROP DATABASE IF EXISTS companyX_db;
CREATE DATABASE companyX_db;
-- DROP TABLE IF EXISTS employee ;
-- DROP TABLE IF EXISTS role;
-- DROP TABLE IF EXISTS department ;


CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL

);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL
);
