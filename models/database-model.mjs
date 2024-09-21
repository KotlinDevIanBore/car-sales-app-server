// import { getConnection,closeConnection } from "../config/db.mjs";

// class DatabaseModel {

//     async executeQuery (query,params = []){
//         const connection = await getConnection();
//         try {

//            const [rows] = await connection.execute (query, params);

//            return rows;

//         }
//         catch  (error){

//             console.error ("Error executing query",error)

//         }
//         finally {

//             await closeConnection (connection)

//         }
//     }


//     async fetchResults (query,params=[],mapper){
//         const rows = await this.executeQuery (query,params);

//         return rows.map (mapper)
//     }
// }

// export default DatabaseModel;


import { getConnection,closeConnection } from "../config/db.mjs";

class DatabaseModel {

    constructor (getConnectionFunc,closeConnectionFunc) {

         this.getConnection =   getConnectionFunc ;
          this.closeConnection = closeConnectionFunc ;

        

    }

    async executeQuery (query,params = []){
        const connection = await this.getConnection() 
        try {

           const [rows] = await connection.execute (query, params);

           return rows;

        }
        catch  (error){

            console.error ("Error executing query",error)

        }
        finally {

            await this.closeConnection (connection)

        }
    }


    async fetchResults (query,params=[],mapper){
        const rows = await this.executeQuery (query,params);

        return rows.map (mapper)
    }
}

export default DatabaseModel;