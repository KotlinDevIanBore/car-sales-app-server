import express from 'express'
import { Router } from 'express'
import mostClickedCars from '../models/most-clicked_cars.mjs'

const analyticsRouter = Router ()



analyticsRouter. get('/api/mostClicked', async (req,res)=>{

    const cars =await mostClickedCars();

    try{
        res.json({cars:cars,message: 'car payload dispatched'})
    }catch(error){

        console.error ('error in get request for mostClicked', error)
        throw error
    }

    



})

export default  analyticsRouter;