import fetchHomePage from "./models/fetch-homepage-cars.mjs";



 async function testfetchHomePage(){

const result = await fetchHomePage ('muscle')


try {
    if (result){
        console.log ('fetch home page function works')
    
        console.log(result) ;
    }
    else {
        console.log ('fetch home page function failed')
    }

}

catch (error) {
    console.error('error fetchingHomePage details from the database');
    throw error
  }


 
}

testfetchHomePage();