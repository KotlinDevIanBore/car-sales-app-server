import { getConnection, closeConnection } from "../config/db.mjs";
import DatabaseModel from "./database-model.mjs";

async function createCar(fetchData,modifiedFormData) {
  const connection = await getConnection();
  const {brand, name, price, availability, location,cohort } =
    fetchData;

    const {id,imageIndex}= modifiedFormData;
    



    
  const query = `
   CALL sp_create_car(?,?,?,?,?,?,?,?);
  `;

  try {
    await connection.execute(query, [
      id,
      brand,
      name,
      imageIndex,
      price,
      availability,
      location,
      cohort
    ]);
    return "connection executed";
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }

  finally {

     await closeConnection(connection)
  }
}

export default createCar;


class CarModel extends DatabaseModel {


  constructor (){

    super(getConnection,closeConnection)
  }

  async createCar (fetchData,modifiedFormData){

    const {brand, name, price, availability, location,cohort } =
    fetchData;

    const {id,imageIndex}= modifiedFormData;

    const query = `   CALL sp_create_car(?,?,?,?,?,?,?,?);

    `
    const params = [
      id,
      brand,
      name,
      imageIndex,
      price,
      availability,
      location,
      cohort
    ]


    try {

      await this.executeQuery(query,params);

    }
    catch (error){

      console.error ("Error in the CarModel", error)
    }


  }



}
