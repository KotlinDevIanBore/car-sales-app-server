import { getConnection, closeConnection } from "../config/db.mjs";

async function sendClickLogs() {
  const connection = await getConnection();

  const query = `
   SELECT 
'2024' as 'group',
DATE(click_timestamp) as DAY,
COUNT(*) as count



FROM 

 defaultdb.car_click_log ck  
 
 
 GROUP by DAY
 
 order by DAY DESC;
    `;

  try {
    const [rows] = await connection.execute(query);
    const data = rows.map((row) => ({
      group: row.group,
      date: row.DAY,
      value: row.count,
    }));

    return data;
  } catch (error) {
    console.error("Failed to fetch click logs", error);

    throw error;
  } finally {
    await closeConnection(connection);
  }
}

export default sendClickLogs;
