// connection.ts

import pg from 'pg'; // Import the entire pg package
const { Pool } = pg; // Destructure Pool from the package

// Create a new instance of Pool
const pool = new Pool({
  user: process.env.DB_USER || 'your_user', // Replace with your database user
  host: 'localhost',
  database: process.env.DB_NAME || 'companyx_db', // Replace with your database name
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
// connection.ts

// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Create a new pool instance with the connection parameters
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: Number(process.env.DB_PORT), // Ensure port is a number
// });

// // Export the pool for use in other modules
// export { pool };
