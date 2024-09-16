import getSales from "../models/fetch_sales_data.mjs";
import { Router } from "express";


const salesRouter = Router();
const url = "/api/sales"


salesRouter.get (url, async(req,res)=>{


    try {

        const CARS = await getSales();

        res.json (CARS);


    }
    catch (error) {
        console.error ("Error fetching sales data")
res.status(500).json ({error: "Internal Server Error"})
    }

})


export default salesRouter;

