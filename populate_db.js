import mysql from 'mysql2/promise';
import CARS from './Data.js';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {

host: process.env.DB_host,
  user: process.env.DB_user,
  password: process.env_DB_PASSWORD, 
  database: process.env_DB_DATABASE,

};

async function populateDatabase (){

try {
const connection = await mysql.createConnection (dbConfig);
console.log ('connection to the database was successful')

Promise.all(CARS.map (async(car)=>{

    const {id,brand,name,imageIndex,price,availability,location}=car;

    const query = "INSERT INTO car_schema (id,brand,name,imageIndex,price,availability,location) VALUES (?,?,?,?,?,?,?)";
    await connection. execute(query, [id, brand, name, imageIndex,price, availability, location] )



}))




}
catch (error){
    console.log ('Could not make a connection to the database');

}

}

// async function populateImages (){

//     const connection = await mysql.createConnection (dbConfig);


//     await Promise.all (CARS.map (async(car)=>{

//        const {id,image}= car;

//        image.forEach (async (eachImage)=>{
//         const populateImageQuery = `INSERT INTO car_images(id,image) VALUES(?,?)`;

//         try {
//         await connection.execute (populateImageQuery, [id,eachImage.URL])
//        }
//        catch (error){
//         console.log ('Failure to populate images to the database')
//        }

//        })
        
//        }))

    
// }

populateDatabase();
// populateImages()