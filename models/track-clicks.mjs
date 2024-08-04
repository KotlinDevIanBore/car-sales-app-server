import { getConnection, closeConnection } from "./db.mjs";

export default async function updateClicks(carid) {

    const connection = await getConnection();
    try {
        
        

        const query = `
      INSERT INTO cars.car_clicks (car_id, clicks)
      VALUES (?, 1)
      ON DUPLICATE KEY UPDATE clicks = clicks + 1;

      INSERT INTO defaultdb.car_click_log (car_id, click_timestamp)
      VALUES (?, NOW());
    `;

        
        await connection.execute(query, [carid,carid]);
        
    } catch (error) {
        console.error('Error updating clicks:', error);
    }


    finally {
        await closeConnection(connection);
    }
}