import { Pool } from 'pg';

// Create a new pool instance to manage connections
const pool = new Pool({
  user: process.env.DB_USER,          // Your database user
  host: process.env.DB_HOST || 'localhost', // Database host
  database: process.env.DB_NAME || 'companyX_db', // Database name
  password: process.env.DB_PASSWORD,   // Your database password
  port: Number(process.env.DB_PORT) || 5432, // Database port
});

// Function to connect to the database and return the client
export const connectDatabase = async () => {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    throw error;
  }
};

// Export the pool for querying
export default pool;
