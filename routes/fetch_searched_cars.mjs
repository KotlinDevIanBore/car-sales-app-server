import express from 'express';
import { Router } from 'express';
import { getSearchedCar } from '../models/fetch_searched_cars.mjs';
import populateCarSearches from '../models/count-searched-cars.mjs';

const fetchSearchedCars = Router();



fetchSearchedCars.post("/api/search", async (req,res)=>{


    try {
      const requestBody= req.body;
  
      const searchTerm = requestBody.Text;
  
       const cars = await getSearchedCar(searchTerm);
  
       populateCarSearches(cars);
  
     
     
      
  
      res.json({ message: "Search request received", cars: cars });
  
      
    }
    catch(error){
      console.error ('error in search post method',error);
      throw error;
    }
  
   
  
  })
  export default fetchSearchedCars;