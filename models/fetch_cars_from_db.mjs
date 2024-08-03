import { closeConnection, getConnection } from "./db.mjs";
import { API_URL } from "../API_URL";

let cachedCARS= null;
let cacheTimeout = null;



async function fetchfromDb() {
  const connection = await getConnection();
  if (cachedCARS && cacheTimeout>Date.now()){


return cachedCARS;
  } 
  
  
  
  else {
    cachedCARS= null;
 cacheTimeout = null;

    try {
      
        const query = `
        SELECT
        cs.id AS id,
        cs.brand AS brand,
        cs.name AS name,
        cs.price AS price,
          GROUP_CONCAT(DISTINCT ci.URL) AS imageURLS,
  
        cs.availability AS availability,
        cs.location AS location
      FROM
        defaultdb.car_schema cs
      LEFT JOIN
        defaultdb.car_images ci ON cs.id = ci.car_id
      WHERE
        ci.URL IS NOT NULL
      GROUP BY
        cs.id, cs.brand, cs.name, cs.price, cs.availability, cs.location;`
  
      const [rows] = await connection.execute(query);
  
      const CARS = rows.map((row) => {
        return {
          id: row.id.toString(),
          brand: row.brand,
          name: row.name,
          imageIndex: "0",
          image: row.imageURLS.split(',').map((url) => ({ URL: `${API_URL}/api/images/${url}` })),
          price: row.price,
          availability: row.availability,
          location: row.location,
        };
      });
  
  
      cachedCARS = CARS;
      cacheTimeout = Date.now()+ 3600000;

      // throw new Error("Test error");

      console.log (CARS[1]);

  
      return CARS;

    } catch (error) {
      console.error("Error fetching cars:", error);
      throw error;
    }

    finally{

      await closeConnection(connection)
    }

  }



 
}


export default fetchfromDb;
