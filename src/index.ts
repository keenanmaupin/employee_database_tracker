import express from 'express';
import { connectDatabase } from './connection.js';  // Import the database connection

// Create an express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data for departments
const departments = [
  { id: 1, name: 'Kitchen' },
  { id: 2, name: 'Cashier' },
  { id: 3, name: 'Janitor' }
];

// Sample data for roles
const roles = [
  { id: 1, title: 'Chef', salary: 5000, department_id: 1 },
  { id: 2, title: 'Main Cashier', salary: 10000, department_id: 2 },
  { id: 3, title: 'Mast Custodian', salary: 50000, department_id: 3 }
];

// Sample data for employees
const employees = [
  { id: 1, first_name: 'Silly', last_name: 'Goose', role_id: 1, manager_id: null },
  { id: 2, first_name: 'Quick', last_name: 'Quack', role_id: 2, manager_id: null },
  { id: 3, first_name: 'Mallard', last_name: 'Zucklberg', role_id: 3, manager_id: null }
];

// Connect to the database
const startApp = async () => {
  await connectDatabase();
  
  // Sample endpoint to get all employees
  app.get('/employees', (_req, res) => {
    res.json(employees.map(emp => ({
      id: emp.id,
      name: `${emp.first_name} ${emp.last_name}`,
      role: roles.find(role => role.id === emp.role_id)?.title,
      department: departments.find(dept => dept.id === roles.find(role => role.id === emp.role_id)?.department_id)?.name
    })));
  });

  // Sample endpoint to get all departments
  app.get('/departments', (_req, res) => {
    res.json(departments);
  });

  // Sample endpoint to get all roles
  app.get('/roles', (_req, res) => {
    res.json(roles);
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

// Start the application
startApp().catch((error) => {
  console.error('Error starting the application:', error);
});
