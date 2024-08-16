 import { closeConnection, getConnection } from "./db.mjs";


 async function fetchHomePage (cohort_id){


    const connection = await getConnection();

    try {
        const query1 = `
    SELECT * FROM defaultdb.car_schema dcs
inner join defaultdb.car_id_cohort dcc

on dcs.id = dcc.car_id
 where dcc.cohort_id = ?;
`

const query = `
SELECT 

dcs.id,
dcs.brand,
dcs.name,
dcs.imageIndex,
GROUP_CONCAT (dci.URL) AS URL,
dcs.price,
dcs.availability

 FROM defaultdb.car_schema dcs
inner join defaultdb.car_id_cohort dcc

on dcs.id = dcc.car_id

inner join defaultdb.car_images dci 
on dcs.id = dci.car_id
 where dcc.cohort_id = 'muscle' group by dcs.id;
`

const result = await connection.execute (query,[cohort_id]);

return result;
    }

    catch (error){


        console.error ('error fetchingHomePage details from the database')

    }

    finally {

         await closeConnection(connection);
    }

 }

 export default fetchHomePage;