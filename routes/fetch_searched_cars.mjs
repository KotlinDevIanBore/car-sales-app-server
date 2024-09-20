import express from 'express';
import { Router } from 'express';
import { getSearchedCar } from '../models/fetch_searched_cars.mjs';
import populateCarSearches from '../models/count-searched-cars.mjs';
import * as controllers from '../controllers/controllers.mjs'

const fetchSearchedCars = Router();



fetchSearchedCars.post("/api/search", controllers.fetchSearchedCarsControllers
  
  

)
  export default fetchSearchedCars;