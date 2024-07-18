

import { Router } from "express";
import sendClickLogs from "../models/send-click-logs.mjs";

const sendClickLogsRouter = Router();





sendClickLogsRouter.get ('/api/click-logs', async(req,res)=>{

const data = await sendClickLogs();

res.json ({data, message:'Click logs sent successfuly'});




})

 export default sendClickLogsRouter