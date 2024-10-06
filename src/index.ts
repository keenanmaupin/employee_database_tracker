import express from 'express';
import { connectDatabase } from './connection';
import dbService from './dbService';
import departmentRoutes from './departmentRoutes';
import roleRoutes from './roleRoutes';
import employeeRoutes from './employeeRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Connect to the database
connectDatabase();

// Routes
app.use('/api/departments', departmentRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/employees', employeeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
