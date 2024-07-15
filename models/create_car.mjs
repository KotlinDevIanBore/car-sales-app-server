import { getConnection, closeConnection } from "./db.mjs";

async function createCar(fetchData,modifiedFormData) {
  const connection = await getConnection();
  const {brand, name, price, availability, location } =
    fetchData;

    const {id,imageIndex}= modifiedFormData;
    



    console.log (`Your car details that go into car schema for id ${JSON.stringify(id)} are ${JSON.stringify(modifiedFormData)}`)
  const query = `
    INSERT INTO car_schema (id, brand, name, imageIndex, price, availability, location)
    VALUES (?, ?, ?, ?, ?, ?, ?)
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
      id,
      brand,
      name,
      imageIndex,
      price,
      availability,
      location,
    ]);
    return "connection executed";
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }

  finally {

     await closeConnection(connection)
  }
}

export default createCar;
