import { Router } from "express";

import fetchHomePage from "../models/fetch-homepage-cars.mjs";

const fetchhomePageCarsRouter = Router();

fetchhomePageCarsRouter.post("/api/homepage/cars", async (req, res) => {
  try {
    const data =  req.body;

    const buttonID = data.ButtonID;
    const cars = await fetchHomePage(buttonID);


    res.json ({data:cars,message:"Sending homepage cars successful"})
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default fetchhomePageCarsRouter;