import express from 'express';
import { pool } from './connection.js'; // Ensure this path is correct

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to get all departments
app.get('/departments', async (_req, res) => {
    try {
        const result = await pool.query('SELECT * FROM department');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a new department
app.post('/departments', async (req, res) => {
    const { name } = req.body; // Correctly destructuring req.body
    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        res.status(201).json({ message: 'Department added successfully' });
    } catch (error) {
        console.error('Error adding department:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all roles
app.get('/roles', async (_req, res) => {
    try {
        const result = await pool.query('SELECT * FROM role');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a new role
app.post('/roles', async (req, res) => {
    const { title, salary, departmentId } = req.body; // Correctly destructuring req.body
    try {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
        res.status(201).json({ message: 'Role added successfully' });
    } catch (error) {
        console.error('Error adding role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all employees
app.get('/employees', async (_req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employee');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a new employee
app.post('/employees', async (req, res) => {
    const { firstName, lastName, roleId, managerId } = req.body; // Correctly destructuring req.body
    try {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
