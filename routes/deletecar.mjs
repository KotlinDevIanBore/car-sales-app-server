import { Router } from "express";
import { API_URL } from "../API_URL";
import deleteCar from "../models/delete_car.mjs";
import * as controllers from "../controllers/controllers.mjs"

const deleteCarRouter = Router()




deleteCarRouter. delete (`/api/v1/car/:id`, controllers.deleteCarController )


export default deleteCarRouter;