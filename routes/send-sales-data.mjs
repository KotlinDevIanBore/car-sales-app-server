import sendSearchLogs from "../models/send-sales-data.mjs";
import { Router } from "express";
import { API_URL } from "../API_URL";


const searchLogsRouter = Router ();

const url = `/api/searchlogs`

searchLogsRouter.get (url, async(req,res)=>{
    const data = await sendSearchLogs ();


    try{

        res.json (data)

    }
    catch (error){

        console.error ('issue sending search logs', error)
    }

} )


export default searchLogsRouter;