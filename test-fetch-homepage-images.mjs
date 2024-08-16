import fetchHomePage from "./models/fetch-homepage-cars.mjs";



 async function testfetchHomePage(){

const result = await fetchHomePage ('muscle')

if (result){
    console.log ('fetch home page function works')

    console.log(result) ;
}
else {
    console.log ('fetch home page function failed')
}

}

testfetchHomePage();