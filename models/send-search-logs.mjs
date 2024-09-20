import { getConnection,closeConnection } from "../config/db.mjs";


 async function sendSearchLogs (id){


    const connection =  await getConnection();


//     const query= `
//     SELECT 
//     CAST(dcs.click_timestamp AS DATE) as date,
//     COUNT(dcs.car_id) as value
// FROM defaultdb.daily_car_searches dcs 
// WHERE dcs.car_id = ?
// GROUP BY CAST(dcs.click_timestamp AS DATE);`

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