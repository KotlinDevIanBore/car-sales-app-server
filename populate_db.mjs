import { getConnection } from "./db.mjs";
import CARS from "./Data.js";


async function populateDatabase() {
  try {
    const connection = await getConnection();

    await Promise.all(
      CARS.map(async (car) => {
        const { id, brand, name, imageIndex, price, availability, location } = car;

        const query = `
          INSERT INTO car_schema (id, brand, name, imageIndex, price, availability, location)
          VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
          brand = VALUES(brand),
          name = VALUES(name),
          imageIndex = VALUES(imageIndex),
          price = VALUES(price),
          availability = VALUES(availability),
          location = VALUES(location)
        `;

        try {
          await connection.execute(query, [
            brand,
            name,
            imageIndex,
            price,
            availability,
            location,
          ]);
        } catch (error) {
          console.error("Error inserting or updating car:", error);
        }
      })
    );

    console.log("Cars successfully populated into the database");
  } catch (error) {
    console.error("Could not populate cars to the database:", error);
  }
}


// export async function createCar(car) {
//   const {brand, name, price} =car;
//   try {
//     const connection = await dbConnection();
//     const query = `INSERT INTO car_schema (brand,name,price) VALUES (?,?,?) 
    
//     ON DUPLICATE KEY UPDATE
//     brand = VALUES(brand),
//     name = VALUES(name),
//     price = VALUES(price),
    
//     `;
//         const response = await connection.execute(query, [
//           brand,
//           name,
//           price,
//         ]);

//         return response;
//   } catch (error) {
//     console.log("Could not populate carsto the database");
//   }
// }

async function populateImages() {
  const connection = await getConnection();

  await Promise.all(
    CARS.map(async (car) => {
      const { id, image } = car;

      await Promise.all(
        image.map(async (eachImage) => {
          const populateImageQuery = `INSERT INTO car_images(car_id,URL) VALUES(?,?)
            
            
            `;

          try {
            await connection.execute(populateImageQuery, [id, eachImage.URL]);
          } catch (error) {
            console.error(`Failed to insert image for car ${id}:`, error);
          }
        })
      );
    })
  );
  return "Populate Images Successful";
}

(async () => {
  try {
    // await populateImages();
    // await populateDatabase();
  } catch (error) {
    console.error("Error in populating images:", error);
  } finally {
    const connection = await getConnection();
    connection.end;
  }
})();
