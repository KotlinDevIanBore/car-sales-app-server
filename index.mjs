
import express from "express";
import cors from "cors"; 
import path, { dirname } from "path"; 
import { fileURLToPath } from 'url';
import clickRouter from "./routes/fetch_clicks.mjs";
import analyticsRouter from "./routes/analytics.mjs";
import fetchSearchedCars from "./routes/fetch_searched_cars.mjs";
import fetchAllCarsRouter from "./routes/fetch_all_cars.mjs";
import uploadImageRouter from "./routes/upload_images.mjs";
import sendSearchedCarsRouter from "./routes/send-searched-cars.mjs";
import sendClickLogsRouter from "./routes/send_click_logs.mjs";
import recieveCarEditsRouter from "./routes/editcar.mjs";



const app = express();

const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));



app.use(cors({
  origin: ['https://car-sales-app-server.onrender.com',
    'https://car-sales-app-server.onrender.com/api/cars',
    'https://car-sales-app-pl98-6jteqku5m-ian-bores-projects.vercel.app/',
    'https://car-sales-app-server.onrender.com/api/cars',
    'http://10.50.90.120:3000', 
    'http://localhost:9000',
     `http://localhost:5173`,
     'https://car-sales-app-pl98.vercel.app'],
  credentials: true
}));



//app.use(express.static(path.join(__dirname, "../car-sales-project/car-sales-app1/car-sales-app/build/index.html")));
app.use(express.json());
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.static(path.join(__dirname, "./uploads")));
app.use((req, res, next) => {
  console.log(`Serving static file from ${req.url}`);
  next();
});


app.get('/', (req, res) => {
  res.redirect('/api/cars');
});


app.use(fetchAllCarsRouter)
app.use (uploadImageRouter)

app.use(clickRouter);
app.use(analyticsRouter)
app.use(fetchSearchedCars)
app.use (sendSearchedCarsRouter)
app.use(sendClickLogsRouter)
app.use (recieveCarEditsRouter)

app.listen(port, '0.0.0.0', () => {

  console.log(`App listening on port ${port}`);
});

