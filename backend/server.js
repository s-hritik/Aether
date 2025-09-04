import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import http from 'http'; 
import https from 'https';
import fs from 'fs';
import connectDB from './src/config/database.js';
import { app } from './src/app.js';

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;

    if (process.env.NODE_ENV === 'production') {
      http.createServer(app).listen(port, () => {
        console.log(`Server is running on port: ${port}`);
      });
    } else {
      const httpsOptions = {
        key: fs.readFileSync('./localhost-key.pem'),
        cert: fs.readFileSync('./localhost.pem')
      };
      https.createServer(httpsOptions, app).listen(port, () => {
        console.log(`Server is running securely on: https://localhost:${port}`);
      });
    }
  })
  .catch((error) => {
    console.log('MongoDB connection failed:', error.message);
    process.exit(1);
  });