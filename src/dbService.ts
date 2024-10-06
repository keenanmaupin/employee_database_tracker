// dbService.ts

import { pool } from './connection.js'; // Ensure the correct import with .js extension

// Function to get all departments from the database
export const getDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  return result.rows;
};

// Function to get all roles from the database
export const getRoles = async () => {
  const result = await pool.query('SELECT * FROM role');
  return result.rows;
};

// Function to get all employees along with their department and role information
export const getEmployees = async () => {
  const result = await pool.query(`
    SELECT department.name AS department_name, 
           role.title AS role_title, 
           role.salary, 
           employee.first_name, 
           employee.last_name, 
           employee.manager_id 
    FROM department
    INNER JOIN role ON department.id = role.department_id
    INNER JOIN employee ON role.id = employee.role_id
  `);
  return result.rows;
};
