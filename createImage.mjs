import { getConnection } from "./db.mjs";
let storedFileName = [];

export async function getFileName(fileName) {
  storedFileName = fileName;

}

async function createImage(modifiedFormData) {

  console.log (storedFileName);



  await Promise.all(
    storedFileName.map(async (filename) => {
      const { id } = modifiedFormData;
  
      try {
        const query = `INSERT INTO car_images (car_id, URL) VALUES(?,?)`;
        const values = [id, filename];
  
        const connection = await getConnection();
        await connection.execute(query, values);

        // storedFileName = [];

      } catch (error) {
        console.error(`Failed to insert image for car ${id}:`, error);
      }
    })
  );
}
export default createImage;
