// connection.ts

import pkg from 'pg'; // Import the entire pg package
const { Pool } = pkg; // Destructure Pool from the package

// Create a new instance of Pool
const pool = new Pool({
  user: process.env.DB_USER || 'your_user', // Replace with your database user
  host: 'localhost',
  database: process.env.DB_NAME || 'companyX_db', // Replace with your database name
  password: process.env.DB_PASSWORD || 'your_password', // Replace with your database password
  port: 5432,
});

// Function to connect to the database
const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

export { pool, connectToDb }; // Exporting pool and connectToDb
