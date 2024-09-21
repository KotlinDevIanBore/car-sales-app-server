import { closeConnection, getConnection } from "../config/db.mjs";
import { API_URL } from "../API_URL";
import { CDN_URL } from "../API_URL";
import DatabaseModel from "./database-model.mjs";



async function fetchfromDbv1(limit, offset) {
  const connection = await getConnection();

  try {
    const query = `

        

        

        SELECT
        cs.id AS id,
        cs.brand AS brand,
        cs.name AS name,
        cs.price AS price,
          GROUP_CONCAT(DISTINCT ci.URL) AS imageURLS,
  
        cs.availability AS availability,
        cs.location AS location,
        dci.cohort_id AS cohort,
        cmy.manufacture_year AS year,
        dcd.car_description AS description
      FROM
        defaultdb.car_schema cs
      LEFT JOIN
        defaultdb.car_images ci ON cs.id = ci.car_id
        
	LEFT JOIN defaultdb.car_id_cohort dci on cs.id = dci.car_id
    
    LEFT JOIN defaultdb.car_manufacture_year cmy on cs.id = cmy.car_id
    
    LEFT JOIN defaultdb.car_description dcd on dcd.car_id = cs.id
  
      WHERE
        ci.URL IS NOT NULL
      GROUP BY
        cs.id, cs.brand, cs.name, cs.price, cs.availability, cs.location

        LIMIT ?
        OFFSET ?;

        
        
        `;
    const values = [limit, offset];

    const [rows] = await connection.execute(query, values);

    const CARS = rows.map((row) => {
      return {
        id: row.id.toString(),
        brand: row.brand,
        name: row.name,
        imageIndex: "0",
        image: row.imageURLS
          .split(",")
          .map((url) => ({ URL: `${CDN_URL}/uploads/${url}` })),
        price: row.price,
        availability: row.availability,
        location: row.location,
        cohort: row.cohort,
        year: row.year,
        description: row.description,
      };
    });

    

    return CARS;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  } finally {
    await closeConnection(connection);
  }
}


export default fetchfromDbv1;


export class fetchFromDbModelv1 extends DatabaseModel {

  constructor () {
    super(getConnection,closeConnection)
  }

  async  fetchfromDbv1(limit, offset) {

    const query = `
  
          
  
          
  
    SELECT
    cs.id AS id,
    cs.brand AS brand,
    cs.name AS name,
    cs.price AS price,
      GROUP_CONCAT(DISTINCT ci.URL) AS imageURLS,

    cs.availability AS availability,
    cs.location AS location,
    dci.cohort_id AS cohort,
    cmy.manufacture_year AS year,
    dcd.car_description AS description
  FROM
    defaultdb.car_schema cs
  LEFT JOIN
    defaultdb.car_images ci ON cs.id = ci.car_id
    
LEFT JOIN defaultdb.car_id_cohort dci on cs.id = dci.car_id

LEFT JOIN defaultdb.car_manufacture_year cmy on cs.id = cmy.car_id

LEFT JOIN defaultdb.car_description dcd on dcd.car_id = cs.id

  WHERE
    ci.URL IS NOT NULL
  GROUP BY
    cs.id, cs.brand, cs.name, cs.price, cs.availability, cs.location

    LIMIT ?
    OFFSET ?;

    
    
    `;
const params = [limit, offset];

const mapper = (row) => {
  return {
    id: row.id.toString(),
    brand: row.brand,
    name: row.name,
    imageIndex: "0",
    image: row.imageURLS
      .split(",")
      .map((url) => ({ URL: `${CDN_URL}/uploads/${url}` })),
    price: row.price,
    availability: row.availability,
    location: row.location,
    cohort: row.cohort,
    year: row.year,
    description: row.description,
  };
};


  
    try {
    
  

      

      const CARS = this.fetchResults (query,params,mapper)
      
  
      return CARS;
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw error;
    } 
  }




}


