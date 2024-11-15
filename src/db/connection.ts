// Packages needed for connecting to db:
import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const { Pool } = pg;

// Set ups parameters for connection:
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
  });

// Sets up connection to db:
  const connectToDb = async () => {
    try {
      await pool.connect();
      console.log('Connected to the database.');
    } catch (err) {
      console.error('Error connecting to database:', err);
      process.exit(1);
    }
  };

// Exports for connecting in ./index.js
  export { pool, connectToDb };