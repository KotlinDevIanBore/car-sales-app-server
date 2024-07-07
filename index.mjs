
import express from "express";
import cors from "cors"; 
import fetchfromDb from "./models/fetch_cars_from_db.mjs";
import createCar from "./models/create_car.mjs";
import path, { dirname } from "path"; 
import { fileURLToPath } from 'url';
import createImage from "./models/createImage.mjs";
import { getSearchedCar } from "./dist/models/fetch_searched_cars.mjs";

import { v4 as uuidv4 } from "uuid";
import upload from "./infrastracture/upload.mjs";

const app = express();

const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// app.use(cors({
//   origin: ['http://10.50.90.120:3001', 'http://localhost:3001'],
//   credentials: true
// }));

app.use(cors());

app.use(express.static(path.join(__dirname, "../car-sales-project/car-sales-app1/car-sales-app/build/index.html")));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/api/cars", async (req, res) => {
  try {
    const CARS = await fetchfromDb();
    res.json(CARS);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/', (req, res) => {
  res.redirect('/api/cars');
});

app.post("/api/search", async (req,res)=>{


  try {
    const requestBody= req.body;

    const searchTerm = requestBody.Text;

     const cars = await getSearchedCar(searchTerm);

   
   
    console.log (`this is search term at index.mjs ${searchTerm}`);

    res.json({ message: "Search request received", cars: cars });

    
  }
  catch(error){
    console.error ('error in search post method',error);
    throw error;
  }

 

})

app.post("/api/addCar", upload.array("uploadedCarFile", 30), async (req, res) => {
  const fetchData = req.body;

  let modifiedFormData = {
    ...fetchData,
    id: uuidv4(),
    imageIndex: 0,
  };
  console.log(`This is modified form data ${JSON.stringify(modifiedFormData)}`);

  try {
    let fileName= req.files.map((file) => (file.filename));
    console.log (`Filename at index.mjs is ${fileName}`)
  

      await createCar(fetchData, modifiedFormData);
      await createImage(modifiedFormData,fileName);

    
    res.status(201).json({ message: "Car added successfully!" });
  } catch (error) {
    console.error("Error in POST method", error);
    res.status(500).json({ error: "Failed to add car" });
  } finally {
    modifiedFormData = {};
  }
});



// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server is running on http://10.50.90.120:${port}`);
// });

app.listen(port, () => {
  console.log(`Server is running on http://10.50.90.120:${port}`);
});