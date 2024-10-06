import pool from './connection.js';

// Function to add a department
export const addDepartmentToDb = async (name: string) => {
  try {
    const result = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *;', [name]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding department:', error);
    throw error;
  }
};

// Function to add a role
export const addRoleToDb = async (title: string, salary: number, departmentId: number) => {
  try {
    const result = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;', [title, salary, departmentId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding role:', error);
    throw error;
  }
};

// Function to add an employee
export const addEmployeeToDb = async (firstName: string, lastName: string, roleId: number, managerId: number | null) => {
  try {
    const result = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;', [firstName, lastName, roleId, managerId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

// Function to update an employee's role
export const updateEmployeeRoleInDb = async (employeeId: number, newRoleId: number) => {
  try {
    const result = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *;', [newRoleId, employeeId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating employee role:', error);
    throw error;
  }
};

// Export functions for use in index.ts
export default {
  addDepartmentToDb,
  addRoleToDb,
  addEmployeeToDb,
  updateEmployeeRoleInDb,
};
