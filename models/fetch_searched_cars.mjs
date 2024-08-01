import { API_URL } from "../API_URL";
import { getConnection,closeConnection } from "./db.mjs";

export async function getSearchedCar(searchTerm) {
  const connection = await getConnection();

  const query = `
  SELECT 
  cs.id,
  cs.brand,
  cs.name,
  cs.price,
  GROUP_CONCAT(ci.URL) AS imageURLS,
  cs.availability,
  cs.location
FROM cars_sq.car_schema cs
LEFT JOIN cars_sq.car_images ci ON cs.id = ci.car_id 
WHERE cs.brand LIKE ? 
OR 
cs.name LIKE ? 
GROUP BY
  cs.id, cs.brand, cs.name, cs.price, cs.availability, cs.location;
  `;

  try {
    const [rows] = await connection.execute(query, [`%${searchTerm}%`,`%${searchTerm}%`]);


    const CARS = rows.map((row) => {
      return {
        id: row.id.toString(),
        brand: row.brand,
        name: row.name,
        imageIndex: "0",
        image: row.imageURLS.split(',').map((url) => ({ URL: `${API_URL}/${url}` })),
        price: row.price,
        availability: row.availability,
        location: row.location,
      };
    });

    
    return CARS;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    await closeConnection(connection);
  }
}