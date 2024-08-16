import { API_URL } from "../API_URL";
import { getConnection,closeConnection } from "./db.mjs";

let cachedCars = null

let cacheTimeOut = null


export default async function mostClickedCars() {
  const connection = await getConnection();

  if (cachedCars && Date.now() <cacheTimeOut){

    return cachedCars
  }
  
  else {
   


    const query = `
   
    SELECT 
    cs.id,
    cs.brand,
    cs.name,
    cs.imageIndex,
    (SELECT GROUP_CONCAT(DISTINCT ci.URL) FROM defaultdb.car_images ci WHERE ci.car_id = cs.id) AS imageURLS,
    cs.price,
    cs.availability,
    cs.location,
    cl.clicks
    
    FROM defaultdb.car_clicks cl
    LEFT JOIN defaultdb.car_schema cs ON cl.car_id = cs.id
    
    GROUP BY 
    cs.id, 
    cs.brand, 
    cs.name, 
    cs.imageIndex, 
    cs.price, 
    cs.availability, 
    cs.location, 
    cl.clicks
    
    ORDER BY 
    cl.clicks DESC;
        
          
        
        `;
      const [rows] = await connection.execute(query);
    
      const CARS = rows.map((row) => ({
        id: row.id,
        brand: row.brand,
        name: row.name,
        imageIndex: row.imageIndex,
        image: row.imageURLS.split(',').map((url) => ({
          URL: `${API_URL}/api/images/${url}`,

        })),
        price: row.price,
        availability: row.availability,
        location: row.location,
        clicks:row.clicks
      }));
    
      console.log (`timer reset at ${Date.now()}`)

      cachedCars = CARS;

      cacheTimeOut = Date.now()+3600000
    
    }

  }

 
