import { Router } from "express";
import EditCarDetails from "../models/edit-car.mjs";


const recieveCarEditsRouter= Router();


recieveCarEditsRouter.post ("/api/EditedCars",(req,res)=>{



const data = req.body;

res.send ("Edited car data received");


EditCarDetails(data)

})


export default recieveCarEditsRouter;