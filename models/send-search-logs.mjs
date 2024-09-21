import { getConnection,closeConnection } from "../config/db.mjs";
import DatabaseModel from "./database-model.mjs";


 async function sendSearchLogs (id){


    const connection =  await getConnection();


const query= `
SELECT 
    dcs.car_id, 
    CAST(dcs.click_timestamp AS DATE) as date, 
    COUNT(*) as value 
FROM defaultdb.car_schema cs 
INNER JOIN defaultdb.daily_car_searches dcs ON (dcs.car_id = cs.id) 
GROUP BY dcs.car_id, CAST(dcs.click_timestamp AS DATE)
`


    try{




        // const [rows] = await  connection.execute (query, [id]);

        const [rows] = await  connection.execute (query);



       const data=  rows        
       .map ((row)=>(

            {
                id: row.car_id,
                date: row.date, 
                value: row.value
              }


        
        ))


       return data;

    }

    catch(error){

console.error ('error sending searchLogs', error);
throw error

    }
    finally {
await closeConnection (connection)
    }

}

export default sendSearchLogs

export class SearchLogsModels extends DatabaseModel {

    async  sendSearchLogs (id){


    
    
    const query= `
    SELECT 
        dcs.car_id, 
        CAST(dcs.click_timestamp AS DATE) as date, 
        COUNT(*) as value 
    FROM defaultdb.car_schema cs 
    INNER JOIN defaultdb.daily_car_searches dcs ON (dcs.car_id = cs.id) 
    GROUP BY dcs.car_id, CAST(dcs.click_timestamp AS DATE)
    `
    
    
        try{
    
    
    
    
    
    
    
    
           const mapper=  
            
            (row)=>(
    
                {
                    id: row.car_id,
                    date: row.date, 
                    value: row.value
                  }
    
    
            
            )
        ;

            const data = this.fetchResults (query,[],mapper)
    
    
           return data;
    
        }
    
        catch(error){
    
    console.error ('error sending searchLogs', error);
    throw error
    
        }
        
    
    }

}