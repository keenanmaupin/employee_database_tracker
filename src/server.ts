import express from 'express';
import { json } from 'body-parser';
import { connectDatabase } from './database';
import { getAllDepartments, addDepartment } from './department';
import { getAllRoles, addRole } from './role';
import { getAllEmployees, addEmployee } from './employee';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());

// Connect to the database
connectDatabase();

// Routes

// Department Routes
app.get('/departments', async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

app.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = await addDepartment(name);
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add department' });
  }
});

// Role Routes
app.get('/roles', async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

app.post('/roles', async (req, res) => {
  try {
    const { title, salary, departmentId } = req.body;
    const newRole = await addRole(title, salary, departmentId);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add role' });
  }
});

// Employee Routes
app.get('/employees', async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

app.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, roleId, managerId } = req.body;
    const newEmployee = await addEmployee(firstName, lastName, roleId, managerId);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
