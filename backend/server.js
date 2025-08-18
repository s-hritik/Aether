import dotenv from 'dotenv';
dotenv.config(
     { path: './.env'}
);

import connectDB from './src/config/database.js';
import {app} from './src/app.js';

connectDB()
.then(() => {

    const port = process.env.PORT || 8000;
    app.listen(port , () => {
        console.log(`Server is running on port : ${port}`);
    })
})
.catch ((error) => {
    console.log('MongoDB connection failed:', error.message);
    process.exit(1);
})
