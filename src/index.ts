// index.ts

import inquirer from 'inquirer';
import { pool } from './connection.js'; // Correctly importing pool
import {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} from './dbService.js'; // Import all necessary functions

// Function to display formatted tables
const displayTable = (data: any[]) => {
  console.table(data);
};

// Main function to run the application
async function main() {
  const { action }: { action: string } = await inquirer.prompt([
    {
      name: 'action',
      message: 'What would you like to do?',
      type: 'list',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View All Departments':
      const departments = await getDepartments();
      displayTable(departments);
      break;

    case 'View All Roles':
      const roles = await getRoles();
      displayTable(roles);
      break;

    case 'View All Employees':
      const employees = await getEmployees();
      displayTable(employees);
      break;

    case 'Add Department':
      const { deptName } = await inquirer.prompt([
        {
          name: 'deptName',
          message: 'Enter the name of the department:',
          type: 'input',
        },
      ]);
      await addDepartment(deptName);
      console.log(`Department "${deptName}" added successfully.`);
      break;

    case 'Add Role':
      const { roleTitle, roleSalary, roleDeptId } = await inquirer.prompt([
        {
          name: 'roleTitle',
          message: 'Enter the title of the role:',
          type: 'input',
        },
        {
          name: 'roleSalary',
          message: 'Enter the salary for this role:',
          type: 'number',
        },
        {
          name: 'roleDeptId',
          message: 'Enter the department ID for this role:',
          type: 'number',
        },
      ]);
      await addRole(roleTitle, roleSalary, roleDeptId);
      console.log(`Role "${roleTitle}" added successfully.`);
      break;

    case 'Add Employee':
      const rolesList = await getRoles(); // Fetch roles for selection
      const employeeRoleChoices = rolesList.map((role) => ({
        name: role.title,
        value: role.role_id,
      }));
      const { firstName, lastName, employeeRoleId, managerId } = await inquirer.prompt([
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
          name: 'employeeRoleId',
          message: 'Select the role for this employee:',
          type: 'list',
          choices: employeeRoleChoices,
        },
        {
          name: 'managerId',
          message: "Enter the ID of the employee's manager (leave blank if none):",
          type: 'input',
          default: 'null',
        },
      ]);
      await addEmployee(firstName, lastName, employeeRoleId, managerId ? Number(managerId) : null);
      console.log(`Employee ${firstName} ${lastName} added successfully.`);
      break;

    case 'Update Employee Role':
      const employeesList = await getEmployees(); // Fetch employees for selection
      const employeeChoices = employeesList.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.employee_id,
      }));

      const rolesForUpdateList = await getRoles(); // Fetch roles for selection
      const updateRoleChoices = rolesForUpdateList.map((role) => ({
        name: role.title,
        value: role.role_id,
      }));

      const { selectedEmployeeId, newRoleId } = await inquirer.prompt([
        {
          name: 'selectedEmployeeId',
          message: 'Select an employee to update:',
          type: 'list',
          choices: employeeChoices,
        },
        {
          name: 'newRoleId',
          message: 'Select the new role for this employee:',
          type: 'list',
          choices: updateRoleChoices,
        },
      ]);
      await updateEmployeeRole(selectedEmployeeId, newRoleId);
      console.log(`Employee's role updated successfully.`);
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
