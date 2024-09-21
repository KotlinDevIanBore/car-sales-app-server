import sendSearchLogs from "../models/send-search-logs.mjs";
import mostClickedCars from "../models/most-clicked_cars.mjs";
import deleteCar, { DeleteCarModel } from "../models/delete_car.mjs";
import EditCarDetails from "../models/edit-car.mjs";
import updateClicks from "../models/track-clicks.mjs";
import getSales from "../models/fetch_sales_data.mjs";
import populateCarSearches from "../models/count-searched-cars.mjs";
import sendSearchedCars from "../models/send-searched-cars.mjs";
import fetchfromDb from "../models/fetch_cars_from_db.mjs";
import fetchfromDbv1 from "../models/fetch_cars_from_db v1.mjs";
// import { getSearchedCar } from "../models/fetch_searched_cars.mjs";
import { fetchfromDbModel } from "../models/fetch_cars_from_db.mjs";
import { fetchFromDbModelv1 } from "../models/fetch_cars_from_db v1.mjs";
import { SearchedCarsModel } from "../models/send-searched-cars.mjs";
import { getSearchedCarModel } from "../models/fetch_searched_cars.mjs";
import { populateCarSearchesModel } from "../models/count-searched-cars.mjs";
import { GetSalesModel } from "../models/fetch_sales_data.mjs";
import { updateClicksModel } from "../models/track-clicks.mjs";
import { EditCarDetailsModel } from "../models/edit-car.mjs";
import { ClickedCarsModel } from "../models/most-clicked_cars.mjs";
import { SearchLogsModels } from "../models/send-search-logs.mjs";
import { closeConnection, getConnection } from "../config/db.mjs";

export const SearchLogsController = async (req,res)=>{


   
        // const data = await sendSearchLogs ();

        const SearchLogsModelsInstance = new  SearchLogsModels (getConnection,closeConnection);

        const data = await SearchLogsModelsInstance.sendSearchLogs();

    
    
    
        try{
    
            res.json (data)
    
        }
        catch (error){
    
            console.error ('issue sending search logs', error)
        }
    
    
}

export const mostClickedCarsController = async (req,res)=>{
    

        // const cars = await mostClickedCars();

        const ClickedCarsModelInstance = new ClickedCarsModel((getConnection,closeConnection));


        const cars = await  ClickedCarsModelInstance.mostClickedCars()
    
        try{
            res.json({cars:cars,message: 'car payload dispatched'})
        }catch(error){
    
            console.error ('error in get request for mostClicked', error)
            throw error
        }
    
        
    
    
    
    }

    export const deleteCarController = async (req,res)=>{

        

           

            // try {
            //     const carId = req.params.id;
            
            //     deleteCar(carId);

            // }
            // catch (error){
            //     console.error ('Error in deleting car', error);
            //     throw error;
            // }

            try {
                const carId = req.params.id;

                const DeleteCarModelInstance = new DeleteCarModel(getConnection,closeConnection);

                DeleteCarModelInstance.deleteCar(carId)
            

            }
            catch (error){
                console.error ('Error in deleting car', error);
                throw error;
            }
            
            
            


    }


    export const editCarController = async (req,res)=>{

            // try 
            // {  
            //     const data = req.body;
                
            //     res.send ("Edited car data received");
            
            
            // EditCarDetails(data)}
            // catch (error){

            //     console.error ('Issue in the editCarController',error);
            //     throw error
            // }

            try 
            {  
                const data = req.body;
                
                res.send ("Edited car data received");

                const EditCarDetailsModelInstance = new EditCarDetailsModel(getConnection,closeConnection);
                EditCarDetailsModelInstance.EditCarDetails (data)
                    }
            catch (error){

                console.error ('Issue in the editCarController',error);
                throw error
            }
            
            

    }

    export const fetchClicksController = async (req,res)=>{
          
          
            const carId = req.body.carid
          
            // updateClicks(carId)
            // res.json({ message: "Click received!" });

            try{

                const updateClicksModelInstance = new updateClicksModel(getConnection,closeConnection);

                 updateClicksModelInstance.updateClicks (carId)

            res.json({ message: "Click received!" });


            }
            catch (error){

                console.error ('eror updating the clicks',error);
                throw error

            }
          
    }

    export const fetchSalesControllers = async (req,res)=>{



        //     try {
        
        //         const CARS = await getSales();
        
        //         res.json (CARS);
        
        
        //     }
        //     catch (error) {
        //         console.error ("Error fetching sales data")
        // res.status(500).json ({error: "Internal Server Error"})
        //     }

        try {

                const GetSalesModelInstance = new GetSalesModel(getConnection,closeConnection);
                const CARS = await GetSalesModelInstance.getSales();
        
        
                res.json (CARS);
        
        
            }
            catch (error) {
                console.error ("Error fetching sales data")
        res.status(500).json ({error: "Internal Server Error"})
            }
        
        
    }

    export const fetchSearchedCarsControllers = async (req,res) =>{

        //     try {
        //       const requestBody= req.body;
          
        //       const searchTerm = requestBody.Text;
          
        //        const cars = await getSearchedCar(searchTerm);
          
        //        populateCarSearches(cars);
          
             
             
              
          
        //       res.json({ message: "Search request received", cars: cars });
          
              
        //     }
        //     catch(error){
        //       console.error ('error in search post method',error);
        //       throw error;
        //     }
          
        try {
                const requestBody= req.body;
            
                const searchTerm = requestBody.Text;
            

                 const getSearchedCarModelInstance = new getSearchedCarModel(getConnection,closeConnection);
                 const cars = await getSearchedCarModelInstance.getSearchedCar(searchTerm);

                 const populateCarSearchesModelInstance = new populateCarSearchesModel(getConnection,closeConnection);

                 populateCarSearchesModelInstance.populateCarSearches (cars)
                        
                res.json({ message: "Search request received", cars: cars });
            
                
              }
              catch(error){
                console.error ('error in search post method',error);
                throw error;
              }
           
          
          


    }


    export const sendSearchCarsControllers = async(req,res)=>{



        //     try {
        //         const cars = await sendSearchedCars();
                
            
            
        //         res.json ({cars:cars,message:'Here are searched cars'})
            
            
        //     }
        //     catch(error){
            
        //         console.error ('internal servevr error',error);
        //         throw error;
        //     }
            
        try {
                 
                const SearchedCarsModelInstance = new SearchedCarsModel(getConnection,closeConnection);
                const cars =  await SearchedCarsModelInstance.sendSearchedCars()                
            
            
                res.json ({cars:cars,message:'Here are searched cars'})
            
            
            }
            catch(error){
            
                console.error ('internal servevr error',error);
                throw error;
            }
            
            


    }

    export const fetchAllCarsController = async (req,res)=>{

        try {


                const fetchfromDbInstance = new fetchfromDbModel(getConnection,closeConnection);

                
                const CARS = await fetchfromDbInstance.fetchfromDb();
          
                const limit = req.params.limit;
                const offset = req.params.page;
          
                res.json(CARS);
              } catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
              }
          



    }

    export const fetchAllCarsControllerv1 = async (req, res)=>{

        try {
              
        
                const limit = req. query.limit;
                const offset = req.query.offset;

                const fetchFromDbModelv1Instance = new fetchFromDbModelv1(getConnection,closeConnection)


                const CARS = await fetchFromDbModelv1Instance.fetchfromDbv1(limit,offset);
          
                res.json(CARS);
              } catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
              }
          

    }


