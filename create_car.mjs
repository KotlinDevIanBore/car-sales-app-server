import { getConnection } from "./db.mjs";

async function createCar(modifiedFormData) {
  const connection = await getConnection();
  let { id, brand, name, imageIndex, price, availability, location } =
    modifiedFormData;
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
}

export default createCar;
