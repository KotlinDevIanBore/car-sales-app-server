import { getConnection } from "./db.mjs";


export default async function transactionRapper(callback){
    const connection = await getConnection();

    try{
        await connection.beginTransaction();
    await callback(connection);
    await connection.commit();

    }
    catch(error){

        await connection.rollback();

    }
    finally {
        connection.release();
    }

    



}