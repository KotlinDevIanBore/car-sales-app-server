import { closeConnection, getConnection } from "../config/db.mjs";
import DatabaseModel from "./database-model.mjs";

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


export default deleteCar;

export class DeleteCarModel extends DatabaseModel  {

    async  deleteCar (id) {

        console.log (`Your deleted car id is ${id}`);

        const query = ` call deleteCar(?)`
        const params = [id];

    
    
        try {
           
      
    
this.executeQuery (query,params);    
    
        }
    
    catch (error){
    
        console.error ('Error Deleting from car', error);
        throw error;
    }
   
    
    
    }


}