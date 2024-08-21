import { closeConnection, getConnection } from "./db.mjs";

async function deleteCar (id) {

    console.log (`Your deleted car id is ${id}`);
    const connection = await getConnection();


    try {
       
  
      const query = ` call deleteCar(?)`

const result = await connection.execute (query, [id])


if (result.length===0){

    return {status:200 , message : `Car with ID ${id} already deleted`}
}

    }

catch (error){

    console.error ('Error Deleting from car', error);
    throw error;
}
finally {

     await closeConnection (connection)
}


}


export default deleteCar