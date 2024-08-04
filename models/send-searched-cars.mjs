import { getConnection, closeConnection } from "./db.mjs";
import { API_URL } from "../API_URL";

async function sendSearchedCars() {
  const connection = await getConnection();

  const query = `
SELECT 
cs.brand,
cs.name,
cs.imageIndex ,

(SELECT group_concat(ci.URL) FROM defaultdb.car_images ci WHERE  csc.car_id= ci.car_id   ) as URL,
cs.price,
cs.availability,
cs.location, 
csc.searches
FROM defaultdb.car_searches csc
left join defaultdb.car_schema cs 

on cs.id = csc.car_id
group by  cs.brand,cs.name,cs.imageIndex,cs.price,cs.availability,cs.location, csc.searches, csc.car_id
order by searches DESC;

`;

  try {
    const [rows] = await connection.execute(query);

    const searchedCars = rows.map((row) => ({
      id: row.id,
      brand: row.brand,
      name: row.name,
      imageIndex: row.imageIndex,
      image: row.URL.split(",").map((url) => ({
        URL: `${API_URL}/api/images/${url}`,
        // { URL: `${API_URL}/api/images/${url}` }
      })),
      price: row.price,
      availability: row.availability,
      location: row.location,
      searches: row.searches,
    }));

    

    return searchedCars;

  } catch (error) {
    console.error(
      "Problem in sending searched cars at fetch-searched-cars.mjs",
      error
    );
    throw error;
  } finally {
    await closeConnection(connection);
  }
}

export default sendSearchedCars;
