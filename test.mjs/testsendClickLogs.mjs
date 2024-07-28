import sendClickLogs from "../models/send-click-logs.mjs";

  export default async function testsendClickLogs (){
    try{

        const data = await sendClickLogs();

        console.log (`test passed here is the data ${data}`)



    }

    catch(error){
        console.error (`testsendclickLogs failed `, error);

        throw error;
    }
  }

  testsendClickLogs();