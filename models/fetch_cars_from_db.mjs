import { closeConnection, getConnection } from "./db.mjs";

let cachedCARS= null;
let cacheTimeout = null;



async function fetchfromDb() {
  const connection = await getConnection();

  if (cachedCARS && cacheTimeout>Date.now()){

    // console.log(`cached cars here${cachedCARS}`)

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
        cars.car_schema cs
      LEFT JOIN
        cars.car_images ci ON cs.id = ci.car_id
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
          image: row.imageURLS.split(',').map((url) => ({ URL: `http://localhost:3000/uploads/${url}` })),
          price: row.price,
          availability: row.availability,
          location: row.location,
        };
      });
  
      // connection.release();
  
      cachedCARS = CARS;
      cacheTimeout = Date.now()+ 3600000;

      // console.log (cachedCARS)
  
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
