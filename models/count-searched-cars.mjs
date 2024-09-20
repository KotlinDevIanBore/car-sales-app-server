import { getConnection, closeConnection } from "../config/db.mjs";

async function populateCarSearches(searchedCars) {
  if (!Array.isArray(searchedCars) || searchedCars.length === 0) {
    return {error:"searchedCars should be a non-empty array"} ;
  }

  const connection = await getConnection();
  

  try {
    for (const car of searchedCars) {
      if (!car || !car.id) {
        console.error("Invalid car object:", car);
        continue;
      }

      const { id } = car;


      const query = ` CALL populate_car_search_data (?)`

      try {
        await connection.execute(query, [id]);
        console.log (`The id ${id} is of type ${typeof(id)}`)
      } catch (error) {
        console.error('Could not populate car_searches for car_id:', id, error);
      }
    }
  } catch (error) {
    console.error('Error in populateCarSearches:', error);
    throw error;
  } finally {
    await closeConnection(connection);
  }
}

export default populateCarSearches;
