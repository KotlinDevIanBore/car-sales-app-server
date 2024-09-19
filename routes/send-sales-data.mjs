import sendSearchLogs from "../models/send-sales-data.mjs";
import { Router } from "express";
import { API_URL } from "../API_URL";


const searchLogsRouter = Router ();

const url = `/api/searchlogs`

// searchLogsRouter.get (url, async(req,res)=>{

//     const id = req.query.id;

//     if (!id) {
//         return res.status(400).json({ error: 'No ID provided' });
//     }


//     const data = await sendSearchLogs (id);


//     try{

//         res.json (data)

//     }
//     catch (error){

//         console.error ('issue sending search logs', error)
//     }

// } )

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