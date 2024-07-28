import { getConnection, closeConnection } from "./db.mjs";

async function populateCarSearches(searchedCars) {
  if (!Array.isArray(searchedCars) || searchedCars.length === 0) {
    throw new Error("searchedCars should be a non-empty array");
  }

  const connection = await getConnection();
  if (!connection) {
    throw new Error("Failed to get a connection");
  }

  try {
    for (const car of searchedCars) {
      if (!car || !car.id) {
        console.error("Invalid car object:", car);
        continue;
      }

      const { id } = car;
      const query = `
        INSERT INTO cars_sq.car_searches (car_id, searches)
        VALUES (?, 1)
        ON DUPLICATE KEY UPDATE searches = searches + 1
      `;

      try {
        await connection.execute(query, [id]);
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
