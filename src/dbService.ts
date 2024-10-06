import { pool } from './connection.js';

// Define the types for better type safety
type Department = {
    id: number;
    name: string;
};

type Role = {
    id: number;
    title: string;
    salary: number;
    department_id: number;
};

type Employee = {
    id: number;
    first_name: string;
    last_name: string;
    role_id: number;
    manager_id: number | null;
};

// Function to get all departments
const getAllDepartments = async (): Promise<Department[]> => {
    const result = await pool.query('SELECT * FROM department');
    return result.rows;
};

// Function to add a new department
const addDepartment = async (name: string): Promise<void> => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Function to get all roles
const getAllRoles = async (): Promise<Role[]> => {
    const result = await pool.query('SELECT * FROM role');
    return result.rows;
};

// Function to add a new role
const addRole = async (title: string, salary: number, departmentId: number): Promise<void> => {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
};

// Function to get all employees
const getAllEmployees = async (): Promise<Employee[]> => {
    const result = await pool.query('SELECT * FROM employee');
    return result.rows;
};

// Function to add a new employee
const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number | null): Promise<void> => {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
};

// Function to update an employee's role
const updateEmployeeRole = async (employeeId: number, newRoleId: number): Promise<void> => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
};

// Exporting the functions for use in other modules
export { 
    getAllDepartments, 
    addDepartment, 
    getAllRoles, 
    addRole, 
    getAllEmployees, 
    addEmployee, 
    updateEmployeeRole 
};
