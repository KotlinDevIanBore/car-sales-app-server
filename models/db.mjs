import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: './car.env' });

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync('./client-cert.pem'),
    key: fs.readFileSync('./client-key.pem'),
    rejectUnauthorized: false, 
  },
};

const connectionPool = mysql.createPool(dbConfig);


async function getConnection() {
  try {
    
    const connection = await connectionPool.getConnection();
    return connection;
  } catch (error) {
    console.error('Connection to database failed:', error);
    throw new Error('Failed to get connection from pool');
  }
}

async function closeConnection(connection) {
  try {
    await connection.release();
  } catch (error) {
    console.error('Error releasing connection:', error);
    throw error;
  }
}

export { getConnection, closeConnection }; 