import { closeConnection, getConnection } from "../config/db.mjs";




async function createImage(modifiedFormData, fileNames) {
  const connection = await getConnection();

  

  await Promise.all(
    fileNames.map(async (filename) => {
      const { id } = modifiedFormData;

      try {
        const query = `INSERT INTO car_images (car_id, URL) VALUES(?,?)`;
        const values = [id, filename];

        await connection.execute(query, values);

        
      } catch (error) {
        console.error(`Failed to insert image for car ${id}:`, error);
      }

      finally {

        await closeConnection(connection)
      }
    })
  );
}



export default createImage;
