import { getConnection, closeConnection } from "../config/db.mjs";

export default async function updateClicks(carid) {

    if(!carid){
        throw new Error ("Carid is required");
        return;
    }

    const connection = await getConnection();
    try {
        
        
 
        const query = `
      CALL PopulateCarClicks1(?)
    `;

        
        await connection.execute(query, [carid]);
        
    } catch (error) {
        console.error('Error updating clicks:', error);
        throw error;
    }


    finally {
        await closeConnection(connection);
    }
}

const storedProcedure = `
DELIMITER //

CREATE PROCEDURE PopulateCarClicks1(IN car_id varchar(128))
BEGIN
    INSERT INTO defaultdb.car_clicks (car_id, clicks)
      VALUES (car_id, 1)
      ON DUPLICATE KEY UPDATE clicks = clicks + 1;

      INSERT INTO defaultdb.car_click_log (car_id, click_timestamp)
      VALUES (car_id, NOW());
END //

DELIMITER ;

`