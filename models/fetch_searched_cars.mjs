import { API_URL } from "../API_URL";
import { getConnection,closeConnection } from "../config/db.mjs";
import { CDN_URL } from "../API_URL";
import DatabaseModel from "./database-model.mjs";

export async function getSearchedCar(searchTerm) {
  const connection = await getConnection();




  const splitSearchTerm= searchTerm.split( " ");
  const params =[ ];
  const conditions = [];


  splitSearchTerm.forEach(element => {



    params.push (`%${element}%`);
    params.push (`%${element}%`);

    conditions.push (`cs.brand LIKE ? `);
    conditions.push (`cs.name LIKE ? `);



    
  });

  console.log (params, conditions)


  const query = `
  SELECT 
  cs.id,
  cs.brand,
  cs.name,
  cs.price,
  GROUP_CONCAT(ci.URL) AS imageURLS,
  cs.availability,
  cs.location 
FROM defaultdb.car_schema cs
LEFT JOIN defaultdb.car_images ci ON cs.id = ci.car_id 

WHERE ${conditions.join(" OR ")}


GROUP BY
  cs.id, cs.brand, cs.name, cs.price, cs.availability, cs.location;
  `;

  try {
    const [rows] = await connection.execute(query, params);


    const CARS = rows.map((row) => {
      return {
        id: row.id.toString(),
        brand: row.brand,
        name: row.name,
        imageIndex: "0",
        // image: row.imageURLS.split(',').map((url) => ({ URL: `${API_URL}/api/images/${url}` })),
        image: row.imageURLS.split(',').map((url) => ({ URL: `${CDN_URL}/uploads/${url}` })),

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


export class getSearchedCarModel extends DatabaseModel {

  constructor (){

    super(getConnection,closeConnection)
  }


  async  getSearchedCar(searchTerm) {
  
  
  
  
    const splitSearchTerm= searchTerm.split( " ");
    const params =[ ];
    const conditions = [];
  
  
    splitSearchTerm.forEach(element => {
  
  
  
      params.push (`%${element}%`);
      params.push (`%${element}%`);
  
      conditions.push (`cs.brand LIKE ? `);
      conditions.push (`cs.name LIKE ? `);
  
  
  
      
    });
  
    console.log (params, conditions)
  
  
    const query = `
    SELECT 
    cs.id,
    cs.brand,
    cs.name,
    cs.price,
    GROUP_CONCAT(ci.URL) AS imageURLS,
    cs.availability,
    cs.location 
  FROM defaultdb.car_schema cs
  LEFT JOIN defaultdb.car_images ci ON cs.id = ci.car_id 
  
  WHERE ${conditions.join(" OR ")}
  
  
  GROUP BY
    cs.id, cs.brand, cs.name, cs.price, cs.availability, cs.location;
    `;
  
    try {      
     const mapper =  (row) => {
        return {
          id: row.id.toString(),
          brand: row.brand,
          name: row.name,
          imageIndex: "0",
          // image: row.imageURLS.split(',').map((url) => ({ URL: `${API_URL}/api/images/${url}` })),
          image: row.imageURLS?.split(',').map((url) => ({ URL: `${CDN_URL}/uploads/${url}` })),
  
          price: row.price,
          availability: row.availability,
          location: row.location,
        };
      };


      const CARS = this.fetchResults (query,params,mapper)

      
      return CARS;

    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    } 
  }




}