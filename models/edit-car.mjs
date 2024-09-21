import { getConnection, closeConnection } from "../config/db.mjs";
import DatabaseModel from "./database-model.mjs";

export default async function EditCarDetails(formData) {


  const connection = await getConnection();


  console.log (`form data includes the folloing`, formData)

  try {
    const query1 = `

    UPDATE defaultdb.car_schema

    SET 
  brand = ?,
  name = ?,
  price = ?,
  availability = ?,
  location = ?

  WHERE id = ?;
    
    
    `

    const query = ` call edit_all_cars (?,?,?,?,?,?,?,?,?)`
    const values = [
      formData.brand,
      formData.name,
      formData.price,
      formData.availability,
      formData.location,
      formData.cohort,
      formData.year,
      formData.description,
      formData.id,
      
    ]

         
     await connection.execute (query, values)  ;
     console.log ('Editing cars successful');

  } catch (error) {
    console.error(`could not edit cars in database `, error);

    throw error;
  } finally {
    await closeConnection(connection);
  }
}


export class EditCarDetailsModel extends DatabaseModel{

  async  EditCarDetails(formData) {


  
  
    console.log (`form data includes the folloing`, formData)
  
    try {
      const query = ` call edit_all_cars (?,?,?,?,?,?,?,?,?)`
      const params = [
        formData.brand,
        formData.name,
        formData.price,
        formData.availability,
        formData.location,
        formData.cohort,
        formData.year,
        formData.description,
        formData.id,
        
      ]
  
           

       this.executeQuery(query,params)
       console.log ('Editing cars successful');
  
    } catch (error) {
      console.error(`could not edit cars in database `, error);
  
      throw error;
    } 
  }


}