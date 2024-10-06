// dbService.ts

import { pool } from './connection.js'; // Ensure the correct import with .js extension

// Function to get all departments from the database
export const getDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  return result.rows;
};

// Function to get all roles from the database
export const getRoles = async () => {
  const result = await pool.query(`
    SELECT role.id AS role_id, role.title, role.salary, department.name AS department_name 
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return result.rows;
};

// Function to get all employees along with their department and role information
export const getEmployees = async () => {
  const result = await pool.query(`
    SELECT employee.id AS employee_id, 
           employee.first_name, 
           employee.last_name, 
           role.title AS role_title, 
           department.name AS department_name, 
           role.salary, 
           employee.manager_id 
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
  `);
  return result.rows;
};

// Function to add a new department to the database
export const addDepartment = async (name: string) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Function to add a new role to the database
export const addRole = async (title: string, salary: number, departmentId: number) => {
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
};

// Function to add a new employee to the database
export const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number | null) => {
  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [firstName, lastName, roleId, managerId]
  );
};

// Function to update an employee's role
export const updateEmployeeRole = async (employeeId: number, newRoleId: number) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
};
