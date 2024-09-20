import express from 'express'
import { Router } from 'express'
import fetchfromDb from '../models/fetch_cars_from_db.mjs';
import fetchfromDbv1 from '../models/fetch_cars_from_db v1.mjs';
import * as controllers from "../controllers/controllers.mjs"

const fetchAllCarsRouter = Router()
const fetchAllCarsRouterV1 = Router ()

fetchAllCarsRouter.get("/api/cars", 
  
  controllers.fetchAllCarsController

);


  fetchAllCarsRouterV1.get("/api/v1/cars", controllers.fetchAllCarsControllerv1


);
export {fetchAllCarsRouterV1};

  export default fetchAllCarsRouter;