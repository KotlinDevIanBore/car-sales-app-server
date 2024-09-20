import express from 'express'
import { Router } from 'express'
import mostClickedCars from '../models/most-clicked_cars.mjs'
import * as controllers from '../controllers/controllers.mjs'

const analyticsRouter = Router ()



analyticsRouter. get('/api/mostClicked', controllers.mostClickedCarsController

)

export default  analyticsRouter;