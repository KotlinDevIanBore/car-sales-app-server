import express from "express";
import updateClicks from "../models/track-clicks.mjs";

import * as controllers from "../controllers/controllers.mjs"
const clickRouter = express.Router();



// Define a route to handle clicks
clickRouter.post("/api/clicked", controllers.fetchClicksController

);

export default clickRouter;
