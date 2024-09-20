import { Router } from "express";
import EditCarDetails from "../models/edit-car.mjs";
import *  as controllers from "../controllers/controllers.mjs"


const recieveCarEditsRouter= Router();


recieveCarEditsRouter.post ("/api/EditedCars",controllers.editCarController

)


export default recieveCarEditsRouter;