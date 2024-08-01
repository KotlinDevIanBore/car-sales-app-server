import testFetchFromDb from "./test.mjs/test-fetch-from-db.mjs";
import testConnection from "./test-connection.mjs";
import testMostClickedCars from "./test.mjs/test-mostClickedCars.mjs";
import testsendClickLogs from "./test.mjs/testsendClickLogs.mjs";


async function runTest (){


    try{

        await testFetchFromDb();
        await testConnection();
        await testMostClickedCars ();
        await testsendClickLogs ();


    }

    catch(error){

        console.error ('Test failed', error);
        throw error;
    }
}

runTest();