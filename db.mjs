import mysql from 'mysql2/promise';

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "ianbore12",
    database: "cars"
}

const connectionPool = mysql.createPool(dbConfig);
async function getConnection (){

    return connectionPool.getConnection();
}

async function closeConnection (connection){
    connection.release();
}

export { getConnection, closeConnection };