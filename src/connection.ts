import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,      // Use environment variables for sensitive information
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME,   // Name of the database
    password: process.env.DB_PASSWORD, // Database password
    port: Number(process.env.DB_PORT) || 5432, // Default PostgreSQL port
});

// Export the pool instance to use it in other modules
export { pool };
