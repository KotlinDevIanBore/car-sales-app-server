import { getConnection,closeConnection } from "./db.mjs";


 async function sendSearchLogs (){


    const connection =  await getConnection();


    const query= `
    SELECT 
    CAST(dcs.click_timestamp AS DATE) as date,
    COUNT(dcs.car_id) as value
FROM defaultdb.daily_car_searches dcs 
WHERE dcs.car_id = ?
GROUP BY CAST(dcs.click_timestamp AS DATE);`
    try{

const dummyvalues = '75157036-2f6d-4866-bf01-68d0c9f6ec71'

        const [rows] = await  connection.execute (query, [dummyvalues]);


       const data=  rows.map ((row)=>(

            {
                group: 'Dataset 1',
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