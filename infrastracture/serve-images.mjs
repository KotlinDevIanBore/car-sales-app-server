// serve-images.mjs
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadsFolder = path.join(__dirname, '../uploads');

const serveImages = express.Router();

serveImages.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(uploadsFolder, filename));
});

export default serveImages;