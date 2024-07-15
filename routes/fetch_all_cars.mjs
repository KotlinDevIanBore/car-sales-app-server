import express from 'express'
import { Router } from 'express'
import fetchfromDb from '../models/fetch_cars_from_db.mjs';


const fetchAllCarsRouter = Router()


fetchAllCarsRouter.get("/api/cars", async (req, res) => {
    try {
      const CARS = await fetchfromDb();
      res.json(CARS);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  export default fetchAllCarsRouter;