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

// Define an interface for the expected response
interface EmployeePromptAnswers {
  firstName: string;
  lastName: string;
  roleId: number;
  managerId: number | null;
}

// Function to add an employee
async function addEmployee() {
  const roles = await pool.query('SELECT id, title FROM role');
  const roleChoices = roles.rows.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  // Prompt for employee details
  const answers: EmployeePromptAnswers = await inquirer.prompt<EmployeePromptAnswers>([
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
      message: "Enter the ID of the employee's manager (leave blank if none):",
      type: 'input',
      default: null,
    },
  ]);

  // Insert employee into the database
  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [answers.firstName, answers.lastName, answers.roleId, answers.managerId ? Number(answers.managerId) : null]
  );

  console.log(`Employee ${answers.firstName} ${answers.lastName} added successfully.`);
}

// Main function to run the application
async function main() {
  const { action }: { action: string } = await inquirer.prompt([
    {
      name: 'action',
      message: 'What would you like to do?',
      type: 'list',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'Exit'],
    },
  ]);

  switch (action) {
    case 'Add Department':
      // Call your addDepartment function
      break;
    case 'Add Role':
      // Call your addRole function
      break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Exit':
      console.log('Goodbye!');
      await pool.end();
      return;
  }

  await main();
}

// Start the application
main()
  .catch((err) => console.error('Error running the application:', err))
  .finally(() => pool.end());
