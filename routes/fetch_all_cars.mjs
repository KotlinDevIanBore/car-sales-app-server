import express from 'express'
import { Router } from 'express'
import fetchfromDb from '../models/fetch_cars_from_db.mjs';
import fetchfromDbv1 from '../models/fetch_cars_from_db v1.mjs';

const fetchAllCarsRouter = Router()
const fetchAllCarsRouterV1 = Router ()

fetchAllCarsRouter.get("/api/cars", async (req, res) => {
    try {
      const CARS = await fetchfromDb();

      const limit = req.params.limit;
      const offset = req.params.page;

      res.json(CARS);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  fetchAllCarsRouterV1.get("/api/v1/cars", async (req, res) => {
    try {
      

      const limit = req. query.limit;
      const offset = req.query.page;
      const CARS = await fetchfromDbv1(limit,offset);

      res.json(CARS);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
export {fetchAllCarsRouterV1};

  export default fetchAllCarsRouter;