import { Router } from "express";
import { API_URL } from "../API_URL";
import deleteCar from "../models/delete_car.mjs";

const deleteCarRouter = Router()




deleteCarRouter. delete (`/api/v1/car/:id`, async (req, res) =>{

const carId = req.params.id;

deleteCar(carId);


} )


export default deleteCarRouter;