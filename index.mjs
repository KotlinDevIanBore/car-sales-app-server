import express, { response } from 'express';
import cors from 'cors'; // Import the cors middleware
import fetchfromDb from './fetch_cars_from_db.mjs';
import  createCar  from './create_car.mjs'
import path from 'path'; // Import the path moduler
import createImage from './createImage.mjs';
import { getFileName } from './createImage.mjs';

import {v4 as uuidv4} from 'uuid';
import upload from './upload.mjs'

const app = express();

const port = 3000;

app.use(cors()); // Use cors middleware
app.use (express.json());
app.use ('/uploads' ,express.static(path.join(process.cwd(),'uploads')));


app.get('/api/cars', async (req, res) => {
 
  try {
    const CARS = await fetchfromDb();
    res.json(CARS);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post ('/api/addCar', async(req,res)=>{ 

  const fetchData= req.body;

  const modifiedFormData = {
    ...fetchData,
    id: uuidv4(), 
    imageIndex: 0 
  };
  try {

    const result = await createCar (modifiedFormData);
    const imageResult = await createImage (modifiedFormData);
    console.log(result);
    res.status(201).json({ message: 'Car added successfully!', result });



  }catch(error){
    console.error ("Error in POST method",error);
    res.status(500).json({ error: 'Failed to add car' });

  }
} )

// app.post('/api/uploadCar',upload.array('uploadedCarFile',30), (req,res)=>{


//    let fileName=req.files[0].filename
//   getFileName (fileName);
//   res.send ('Car File uploaded successfully');
// })

app.post('/api/uploadCar',upload.array('uploadedCarFile',30), (req,res)=>{


  let fileName=[];

  req.files.map  ((file)=>(

    fileName.push (file.filename)
  ))

 getFileName (fileName);
 res.send ('Car File uploaded successfully');
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
