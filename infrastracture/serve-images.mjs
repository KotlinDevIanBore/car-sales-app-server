// serve-images.mjs
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadsFolder = path.join(__dirname, '../uploads');

const serveImages = express.Router();

serveImages.use(express.static(uploadsFolder));

export default serveImages;