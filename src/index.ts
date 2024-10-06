// index.ts

import inquirer from 'inquirer';
import { pool } from './connection.js'; // Correctly importing pool
import { getRoles } from './dbService.js'; // Adjusted to import getRoles correctly

interface EmployeePromptAnswers {
  firstName: string;
  lastName: string;
  roleId: number;
  managerId: number | null;
}

// Function to add a new employee to the database
async function addEmployee() {
  const roles = await getRoles(); // Fetch roles from the database
  const roleChoices = roles.map((role: { id: number; title: string }) => ({
    name: role.title,
    value: role.id,
  }));

  const answers: EmployeePromptAnswers = await inquirer.prompt([
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
      default: 'null', // Changed from 'null' to null
    },
  ]) as EmployeePromptAnswers;

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
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Exit':
      console.log('Goodbye!');
      await pool.end(); // Properly closing the database connection
      return;
  }

  await main(); // Recursively call main for the next action
}

// Run the main function and handle errors
main()
  .catch((err) => console.error('Error running the application:', err))
  .finally(() => pool.end()); // Ensure the pool is closed when finished
