import { closeConnection, getConnection } from "./db.mjs";




async function createImage(modifiedFormData, fileNames) {
  const connection = await getConnection();

  console.log(`Your filenames at createImage.mjs is ${JSON.stringify(fileNames)}`);
  console.log(`This is modified form data at createImage.mjs ${JSON.stringify(modifiedFormData)}`);

  await Promise.all(
    fileNames.map(async (filename) => {
      const { id } = modifiedFormData;

      try {
        const query = `INSERT INTO car_images (car_id, URL) VALUES(?,?)`;
        const values = [id, filename];

        await connection.execute(query, values);

        // console.log(`Your car id at create image.js is ${id}`);
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
