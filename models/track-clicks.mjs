import { getConnection, closeConnection } from "./db.mjs";

export default async function updateClicks(carid) {
    try {
        const connection = await getConnection();
        const query = `
            INSERT INTO cars.car_clicks (car_id, clicks)
            VALUES (?, 1)
            ON DUPLICATE KEY UPDATE clicks = clicks + 1
        `;
        await connection.execute(query, [carid]);
        await closeConnection(connection);
    } catch (error) {
        console.error('Error updating clicks:', error);
    }
}