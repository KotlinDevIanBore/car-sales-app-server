import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config()
// config({ path: './.env' }); 
import fs from 'fs'; // Add this line to import the 'fs' module





const dbConfig = {

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port: process.env.DB_PORT ,
    ssl: {
        ca: fs.readFileSync('./client-cert.pem'), 
        key: fs.readFileSync('./client-key.pem') ,
        rejectUnauthorized: false 
    }

}

console.log(dbConfig);

const connectionPool = mysql.createPool(dbConfig);


async function getConnection (){

    try {
        const res = await connectionPool.getConnection();
        return res;
    
    }catch (error){
    
        console.error ('connection to database failed', error)
        throw error;
    }

    
}

async function closeConnection (connection){
    connection.release();
}

export { getConnection, closeConnection };