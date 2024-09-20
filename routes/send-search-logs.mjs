import { Router } from "express";
import * as controllers from '../controllers/controllers.mjs'


const searchLogsRouter = Router ();

const url = `/api/searchlogs`


searchLogsRouter.get (url, controllers.SearchLogsController )


export default searchLogsRouter;