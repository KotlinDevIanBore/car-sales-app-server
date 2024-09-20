import getSales from "../models/fetch_sales_data.mjs";
import { Router } from "express";
import * as controllers from "../controllers/controllers.mjs"


const salesRouter = Router();
const url = "/api/sales"


salesRouter.get (url, controllers.fetchSalesControllers
)


export default salesRouter;

