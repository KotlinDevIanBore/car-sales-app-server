import { getConnection, closeConnection } from "./db.mjs";
import { API_URL } from "../API_URL";
import { CDN_URL } from "../API_URL";

async function getSales() {
  const  connection = await getConnection();
    try {

        const query1 = `
        SELECT 
            cs.id,
            cs.brand,
            cs.name,
            cs.imageIndex,
            GROUP_CONCAT(DISTINCT ci.URL) AS image,
            cs.price,
            cs.availability,
            cs.location,
            (SELECT COUNT(*) FROM defaultdb.car_schema WHERE availability = 'sold') AS sales
        FROM defaultdb.car_schema cs
        inner JOIN defaultdb.car_images ci ON cs.id = ci.car_id
        GROUP BY cs.id, cs.brand, cs.name, cs.imageIndex, cs.price, cs.availability, cs.location;
        `;

        const query = `
        SELECT 
            cs.id,
            cs.brand,
            cs.name,
            cs.imageIndex,
            GROUP_CONCAT(DISTINCT ci.URL) AS image,
            cs.price,
            cs.availability,
            cs.location,
            (SELECT COUNT(*) FROM defaultdb.car_schema WHERE availability = 'sold') AS sales
        FROM defaultdb.car_schema cs
        inner JOIN defaultdb.car_images ci ON cs.id = ci.car_id
        where cs.availability = 'sold'
        GROUP BY cs.id, cs.brand, cs.name, cs.imageIndex, cs.price, cs.availability, cs.location;`

        const [rows] = await connection.execute(query);

        const CARS = rows.map ((row)=>(
            {
            id: row.id,
            brand: row.brand,
            name: row.name,
            imageIndex: row.imageIndex,
            // image: row.image.split(',').map((url) => ({ URL: `${API_URL}/api/images/${url}` })),
            image: row.image.split(',').map((url) => ({
                // URL: `${API_URL}/api/images/${url}`,
                URL: `${CDN_URL}/uploads/${url}`,
      
              })),
            image1:row.image,
            price:row.price,
            availability:row.availability,
            location:row.location,
            clicks: row.clicks,
            sales:row.sales
                
            }

        ))
        return CARS;
    } catch (error) {
        console.error('Error in getSales:', error);
        throw error;
    } finally {
        if (connection) {
            await closeConnection(connection);
        }
    }
}


export default getSales;