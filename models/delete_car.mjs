import { closeConnection, getConnection } from "./db.mjs";

async function deleteCar (id) {

    console.log (`Your deleted car id is ${id}`);
    const connection = await getConnection();


    try {
       
  
      const query = ` call deleteCar(?)`

  connection.execute (query, [id])


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