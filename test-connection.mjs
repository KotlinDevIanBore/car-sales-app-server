import { getConnection, closeConnection } from './models/db.mjs';

export default async function testConnection() {
  try {
    const connection = await getConnection();
    console.log('Connected to database successfully!');
    closeConnection(connection);
  } catch (error) {
    console.error('Error testing connection:', error);
  }
}

testConnection();