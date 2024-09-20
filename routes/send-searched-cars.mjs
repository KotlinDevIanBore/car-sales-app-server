import express from 'express';
import { Router } from 'express';
import sendSearchedCars from '../models/send-searched-cars.mjs';
import * as controllers from '../controllers/controllers.mjs'


const sendSearchedCarsRouter = Router();




sendSearchedCarsRouter.get ('/api/searchedCars', controllers.sendSearchCarsControllers

    
   

)

export default sendSearchedCarsRouter;