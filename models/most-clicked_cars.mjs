import { API_URL } from "../API_URL";
import { getConnection,closeConnection } from "../config/db.mjs";
import { CDN_URL } from "../API_URL";
import DatabaseModel from "./database-model.mjs";




export default async function mostClickedCars() {
  const connection = await getConnection();

  
  
  
   


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
    SUM (cl.clicks) as totalClicks
    
    
    FROM defaultdb.car_clicks cl
    LEFT JOIN defaultdb.car_schema cs ON cl.car_id = cs.id
    
    GROUP BY 
    cs.id, 
    cs.brand, 
    cs.name, 
    cs.imageIndex, 
    cs.price, 
    cs.availability, 
    cs.location    
    ORDER BY 
    totalClicks DESC;
        
          
        
        `;
      const [rows] = await connection.execute(query);
    
      const CARS = rows.map((row) => ({
        id: row.id,
        brand: row.brand,
        name: row.name,
        imageIndex: row.imageIndex,
        image: row.imageURLS.split(',').map((url) => ({
          // URL: `${API_URL}/api/images/${url}`,
          URL: `${CDN_URL}/uploads/${url}`,

        })),
        image1:row.imageURLS,
        price: row.price,
        availability: row.availability,
        location: row.location,
        clicks:row.totalClicks
      }));
    

      return CARS;

    
    }


    export class ClickedCarsModel extends DatabaseModel{

      constructor (){

        super(getConnection,closeConnection)
      }
    

      async  mostClickedCars() {
        // const connection = await getConnection();

      
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
          SUM (cl.clicks) as totalClicks
          
          
          FROM defaultdb.car_clicks cl
          LEFT JOIN defaultdb.car_schema cs ON cl.car_id = cs.id
          
          GROUP BY 
          cs.id, 
          cs.brand, 
          cs.name, 
          cs.imageIndex, 
          cs.price, 
          cs.availability, 
          cs.location    
          ORDER BY 
          totalClicks DESC;
              
                
              
              `;

          
            const mapper = (row) => ({
              id: row.id,
              brand: row.brand,
              name: row.name,
              imageIndex: row.imageIndex,
              image: row.imageURLS.split(',').map((url) => ({
                // URL: `${API_URL}/api/images/${url}`,
                URL: `${CDN_URL}/uploads/${url}`,
      
              })),
              image1:row.imageURLS,
              price: row.price,
              availability: row.availability,
              location: row.location,
              clicks:row.totalClicks
            });


            try {   const CARS = this.fetchResults (query, [],mapper)
          
      
            return CARS;
          
          }
          catch (error){

            console.error('Error fetching most clicked car model',error);
            throw error

          }
      
          
          }

      
    }
  

 
