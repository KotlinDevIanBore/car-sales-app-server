import { API_URL } from "../API_URL";
import { closeConnection, getConnection } from "./db.mjs";
import { CDN_URL } from "../API_URL";

async function fetchHomePage(cohort_id) {
  const connection = await getConnection();

  try {
    const query = `
SELECT 

dcs.id,
dcs.brand,
dcs.name,
dcs.imageIndex,
GROUP_CONCAT ( DISTINCT dci.URL) AS URL,
dcs.price,
dcs.availability,
dcs.location

 FROM defaultdb.car_schema dcs
inner join defaultdb.car_id_cohort dcc

on dcs.id = dcc.car_id

inner join defaultdb.car_images dci 
on dcs.id = dci.car_id
 where dcc.cohort_id = ? 
 group by dcs.id;
`;

    const [rows] = await connection.execute(query, [cohort_id]);


    const cars = rows.map((row) => ({
      id: row.id,
      brand: row.brand,
      name: row.name,
      imageIndex: row.imageIndex,
      // image: row.URL.split(",").map((url) => ({URL:`${API_URL}/api/images/${url}`})),
      image: row.URL.split(",").map((url) => ({URL:`${CDN_URL}/uploads/${url}`})),
      price: row.price,
      availability: row.availability,
      location: row.location,
    }));

    return cars;
  } catch (error) {
    throw error;
  } finally {
    await closeConnection(connection);
  }
}

export default fetchHomePage;
