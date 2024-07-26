import express from 'express';
import { Router } from 'express';
import sendSearchedCars from '../models/send-searched-cars.mjs';


const sendSearchedCarsRouter = Router();




sendSearchedCarsRouter.get ('/api/searchedCars', async(req,res)=>{


try {
    const cars = await sendSearchedCars();
    


    res.json ({cars:cars,message:'Here are searched cars'})


}
catch(error){

    console.error ('internal servevr error',error);
    throw error;
}


})

export default sendSearchedCarsRouter;