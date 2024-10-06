import client from './database';
import { Department, Role, Employee } from './types';

class DbService {
  // Fetch all departments
  async getAllDepartments(): Promise<Department[]> {
    const res = await client.query('SELECT * FROM department');
    return res.rows;
  }

  // Add a new department
  async addDepartment(name: string): Promise<Department> {
    const res = await client.query(
      'INSERT INTO department (name) VALUES ($1) RETURNING *',
      [name]
    );
    return res.rows[0];
  }

  // Fetch all roles
  async getAllRoles(): Promise<Role[]> {
    const res = await client.query('SELECT * FROM role');
    return res.rows;
  }

  // Add a new role
  async addRole(title: string, salary: number, departmentId: number): Promise<Role> {
    const res = await client.query(
      'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
      [title, salary, departmentId]
    );
    return res.rows[0];
  }

  // Fetch all employees
  async getAllEmployees(): Promise<Employee[]> {
    const res = await client.query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id
      FROM employee
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id
    `);
    return res.rows;
  }

  // Add a new employee
  async addEmployee(
    firstName: string,
    lastName: string,
    roleId: number,
    managerId: number | null
  ): Promise<Employee> {
    const res = await client.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, roleId, managerId]
    );
    return res.rows[0];
  }
}

export default new DbService();
