import { getConnection, closeConnection } from "../config/db.mjs";

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
