import express from "express";
import updateClicks from "../models/track-clicks.mjs";
const clickRouter = express.Router();



// Define a route to handle clicks
clickRouter.post("/api/clicked", (req, res) => {
  // Handle click logic here


  const carId = req.body.carid

  updateClicks(carId)
  res.json({ message: "Click received!" });
});

export default clickRouter;
