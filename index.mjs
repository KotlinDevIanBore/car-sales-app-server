
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

// app.use(cors({
//   origin: ['http://10.50.90.120:3001', 'http://localhost:3001', 'http://localhost:9000', `http://10.50.70.108:9000`, 'https://c228-105-161-86-88.ngrok-free.app'],
//   credentials: true
// }));

// app.use(cors({
//   origin: '*',
//   credentials: true
// }));


const app = express();

const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));



app.use(cors({
  origin: ['http://10.50.90.120:9000', 'http://localhost:3001', 'http://localhost:9000', `http://10.50.70.108:9000`],
  credentials: true
}));



app.use(express.static(path.join(__dirname, "../car-sales-project/car-sales-app1/car-sales-app/build/index.html")));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get('/', (req, res) => {
  res.redirect('/api/cars');
});


app.use (uploadImageRouter)
app.use(fetchAllCarsRouter)
app.use(clickRouter);
app.use(analyticsRouter)
app.use(fetchSearchedCars)
app.use (sendSearchedCarsRouter)
app.use(sendClickLogsRouter)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://10.50.90.120:${port}`);
});

