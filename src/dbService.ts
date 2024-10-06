import pool from './connection';

export const addDepartment = async (name: string) => {
  const query = 'INSERT INTO department (name) VALUES ($1)';
  await pool.query(query, [name]);
  console.log(`Department ${name} added successfully.`);
};

export const addRole = async (title: string, salary: number, departmentId: number) => {
  const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
  await pool.query(query, [title, salary, departmentId]);
  console.log(`Role ${title} added successfully.`);
};

export const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number | null) => {
  const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
  await pool.query(query, [firstName, lastName, roleId, managerId]);
  console.log(`Employee ${firstName} ${lastName} added successfully.`);
};

export const getRoles = async () => {
  const result = await pool.query('SELECT id, title FROM role');
  return result.rows;
};

export const getDepartments = async () => {
  const result = await pool.query('SELECT id, name FROM department');
  return result.rows;
};
