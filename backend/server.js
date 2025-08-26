import dotenv from 'dotenv';
dotenv.config(
     { path: './.env'}
);

import https from 'https';
import fs from 'fs';
import connectDB from './src/config/database.js';
import {app} from './src/app.js';

// Read the certificate files 
const httpsOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
};

connectDB()
.then(() => {

    const port = process.env.PORT || 8000;
    https.createServer(httpsOptions , app).listen(port , () => {
        console.log(`Server is running on port : ${port}`);
    })
})
.catch ((error) => {
    console.log('MongoDB connection failed:', error.message);
    process.exit(1);
})
