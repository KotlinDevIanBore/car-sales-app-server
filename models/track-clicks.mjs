import { getConnection, closeConnection } from "../config/db.mjs";
import DatabaseModel from "./database-model.mjs";

export default async function updateClicks(carid) {

    if(!carid){
        throw new Error ("Carid is required");
        return;
    }

    const connection = await getConnection();
    try {
        
        
 
        const query = `
      CALL PopulateCarClicks1(?)
    `;

        
        await connection.execute(query, [carid]);
        
    } catch (error) {
        console.error('Error updating clicks:', error);
        throw error;
    }


    finally {
        await closeConnection(connection);
    }
}

export class updateClicksModel extends DatabaseModel {

    async  updateClicks(carid) {

        if(!carid){
            throw new Error ("Carid is required");
            return;
        }

        const query = `
        CALL PopulateCarClicks1(?)
      `;

     const params = [carid]
  
    
        
        try {


            this.executeQuery (query,params)
                        
        } catch (error) {
            console.error('Error updating clicks:', error);
            throw error;
        }
    
    }


}