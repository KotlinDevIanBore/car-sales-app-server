import { API_URL } from "./API_URL";
import { getConnection,closeConnection } from "./models/db.mjs";

export async function getSearchedCar() {
//   const connection = await getConnection();


  const testsearchTerm= "mazda axela"

  const splitSearchTerm= testsearchTerm.split( " ");
  const params =[ ];
  const conditions = [];


  splitSearchTerm.forEach(element => {



    params.push (`%${element}%`,`%${element}%`)

    conditions.push (`WHERE cs.brand LIKE ? 
OR 
cs.name LIKE ? 
`)


    
  });

  console.log (params, conditions)


}

getSearchedCar();