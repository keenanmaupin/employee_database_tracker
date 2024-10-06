import express from 'express';
import { addDepartment, addRole, addEmployee } from './dbService';

const app = express();
app.use(express.json());

app.post('/departments', async (req, res) => {
  const { name } = req.body;
  await addDepartment(name);
  res.status(201).send(`Department ${name} added successfully.`);
});

app.post('/roles', async (req, res) => {
  const { title, salary, departmentId } = req.body;
  await addRole(title, salary, departmentId);
  res.status(201).send(`Role ${title} added successfully.`);
});

app.post('/employees', async (req, res) => {
  const { firstName, lastName, roleId, managerId } = req.body;
  await addEmployee(firstName, lastName, roleId, managerId);
  res.status(201).send(`Employee ${firstName} ${lastName} added successfully.`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
