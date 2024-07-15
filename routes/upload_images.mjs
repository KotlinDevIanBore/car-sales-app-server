import express from 'express';
import upload from '../infrastracture/upload.mjs';
import createCar from '../models/create_car.mjs';
import createImage from '../models/createImage.mjs';
import { v4 as uuidv4 } from "uuid";


import { Router } from 'express';

const uploadImageRouter = Router ();

uploadImageRouter.post("/api/addCar", upload.array("uploadedCarFile", 30), async (req, res) => {
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

  export default uploadImageRouter;