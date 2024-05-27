import mysql from "mysql2/promise";
import CARS from "./Data.js";
async function dbConnection() {
  const dbConfig = {
    host: "localhost",
    user: "root",
    password: "ianbore12",
    database: "cars",
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error("connection to the database failed", error);
    throw error;
  }
}

async function populateDatabase() {
  try {
    const connection = await dbConnection();

    Promise.all(
      CARS.map(async (car) => {
        const { id, brand, name, imageIndex, price, availability, location } =
          car;

        const query = `INSERT INTO car_schema (id,brand,name,imageIndex,price,availability,location) VALUES (?,?,?,?,?,?,?) 
    
    ON DUPLICATE KEY UPDATE
    brand = VALUES(brand),
    name = VALUES(name),
    imageIndex = VALUES(imageIndex),
    price = VALUES(price),
    availability = VALUES(availability),
    location = VALUES(location)
    `;
        await connection.execute(query, [
          id,
          brand,
          name,
          imageIndex,
          price,
          availability,
          location,
        ]);
      })
    );
  } catch (error) {
    console.log("Could not populate carsto the database");
  }
}

async function populateImages() {
  const connection = await dbConnection();

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
    await populateImages();
    await populateDatabase();
  } catch (error) {
    console.error("Error in populating images:", error);
  } finally {
    const connection = await dbConnection();
    connection.end;
  }
})();
