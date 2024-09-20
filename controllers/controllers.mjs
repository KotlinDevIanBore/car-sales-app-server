import sendSearchLogs from "../models/send-search-logs.mjs";
import mostClickedCars from "../models/most-clicked_cars.mjs";
import deleteCar from "../models/delete_car.mjs";
import EditCarDetails from "../models/edit-car.mjs";
import updateClicks from "../models/track-clicks.mjs";
import getSales from "../models/fetch_sales_data.mjs";
import populateCarSearches from "../models/count-searched-cars.mjs";
import sendSearchedCars from "../models/send-searched-cars.mjs";
import fetchfromDb from "../models/fetch_cars_from_db.mjs";
import fetchfromDbv1 from "../models/fetch_cars_from_db v1.mjs";
import { getSearchedCar } from "../models/fetch_searched_cars.mjs";

export const SearchLogsController = async (req,res)=>{


   
        const data = await sendSearchLogs ();
    
    
    
        try{
    
            res.json (data)
    
        }
        catch (error){
    
            console.error ('issue sending search logs', error)
        }
    
    
}

export const mostClickedCarsController = async (req,res)=>{
    

        const cars = await mostClickedCars();
    
        try{
            res.json({cars:cars,message: 'car payload dispatched'})
        }catch(error){
    
            console.error ('error in get request for mostClicked', error)
            throw error
        }
    
        
    
    
    
    }

    export const deleteCarController = async (req,res)=>{

        

            const carId = req.params.id;
            
            deleteCar(carId);
            
            
            


    }

    export const editCarController = async (req,res)=>{



            const data = req.body;
            
            res.send ("Edited car data received");
            
            
            EditCarDetails(data)
            
            

    }

    export const fetchClicksController = async (req,res)=>{
          
          
            const carId = req.body.carid
          
            updateClicks(carId)
            res.json({ message: "Click received!" });
          
    }

    export const fetchSalesControllers = async (req,res)=>{

            try {
        
                const CARS = await getSales();
        
                res.json (CARS);
        
        
            }
            catch (error) {
                console.error ("Error fetching sales data")
        res.status(500).json ({error: "Internal Server Error"})
            }
        
        
    }

    export const fetchSearchedCarsControllers = async (req,res) =>{

            try {
              const requestBody= req.body;
          
              const searchTerm = requestBody.Text;
          
               const cars = await getSearchedCar(searchTerm);
          
               populateCarSearches(cars);
          
             
             
              
          
              res.json({ message: "Search request received", cars: cars });
          
              
            }
            catch(error){
              console.error ('error in search post method',error);
              throw error;
            }
          
           
          
          


    }


    export const sendSearchCarsControllers = async(req,res)=>{



            try {
                const cars = await sendSearchedCars();
                
            
            
                res.json ({cars:cars,message:'Here are searched cars'})
            
            
            }
            catch(error){
            
                console.error ('internal servevr error',error);
                throw error;
            }
            
            
            


    }

    export const fetchAllCarsController = async (req,res)=>{

        
            try {
              const CARS = await fetchfromDb();
        
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
              const CARS = await fetchfromDbv1(limit,offset);
        
              res.json(CARS);
            } catch (error) {
              res.status(500).json({ error: "Internal Server Error" });
            }
          

    }


