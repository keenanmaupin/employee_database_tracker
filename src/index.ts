import inquirer from 'inquirer';
import { Pool } from 'pg';

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'your_username', // Replace with your actual database username
  host: 'localhost',
  database: 'companyX_db', // Make sure this database exists
  password: 'your_password', // Replace with your actual database password
  port: 5432,
});

// Function to add a department
async function addDepartment() {
  const { name }: { name: string } = await inquirer.prompt([
    {
      name: 'name',
      message: 'Enter the name of the department:',
      type: 'input',
    },
  ]);

  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Department ${name} added successfully.`);
}

// Function to add a role
async function addRole() {
  const departments = await pool.query('SELECT id, name FROM department');
  const departmentChoices = departments.rows.map(dept => ({
    name: dept.name,
    value: dept.id,
  }));

  const { title, salary, departmentId }: { title: string; salary: number; departmentId: number } = await inquirer.prompt([
    {
      name: 'title',
      message: 'Enter the title of the role:',
      type: 'input',
    },
    {
      name: 'salary',
      message: 'Enter the salary for the role:',
      type: 'input', // Use 'input' for salary to allow decimal input
    },
    {
      name: 'departmentId',
      message: 'Select the department for this role:',
      type: 'list',
      choices: departmentChoices,
    },
  ]);

  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  console.log(`Role ${title} added successfully.`);
}

// Function to add an employee
async function addEmployee() {
  const roles = await pool.query('SELECT id, title FROM role');
  const roleChoices = roles.rows.map(role => ({
    name: role.title,
    value: role.id,
  }));

  // Prompt for employee details
  const { firstName, lastName, roleId, managerId }: { firstName: string; lastName: string; roleId: number; managerId: number | null } = await inquirer.prompt([
    {
      name: 'firstName',
      message: 'Enter the first name of the employee:',
      type: 'input',
    },
    {
      name: 'lastName',
      message: 'Enter the last name of the employee:',
      type: 'input',
    },
    {
      name: 'roleId',
      message: 'Select the role for this employee:',
      type: 'list',
      choices: roleChoices,
    },
    {
      name: 'managerId',
      message: 'Enter the ID of the employee\'s manager (leave blank if none):',
      type: 'input',
      default: null,
    },
  ]);

  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [
    firstName,
    lastName,
    roleId,
    managerId ? Number(managerId) : null,
  ]);
  console.log(`Employee ${firstName} ${lastName} added successfully.`);
}

// Main function to run the application
async function main() {
  const { action }: { action: string } = await inquirer.prompt([
    {
      name: 'action',
      message: 'What would you like to do?',
      type: 'list',
      choices: [
        'Add Department',
        'Add Role',
        'Add Employee',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'Add Department':
      await addDepartment();
      break;
    case 'Add Role':
      await addRole();
      break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Exit':
      console.log('Goodbye!');
      await pool.end(); // Ensure the pool is closed before exiting
      return;
  }

  // Run the main function again for the next action
  await main();
}

// Start the application
main()
  .catch(err => console.error('Error running the application:', err))
  .finally(() => pool.end());
