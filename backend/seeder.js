import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {products} from './src/data/product.js'
import {Product} from './src/models/product.model.js';
import connectDB from './src/config/database.js';

// load environment variables from .env files
dotenv.config();

const importData = async() => {
    try{
         await Product.deleteMany(); // Clear existing products

         // Prepare the data for insertion by removing the temporary 'id' field
        //  const InsertProducts = products.map(p => {
        //      const {id , ...rest} = p; // Destructure to separate 'id' from the rest of the product data
        //      return rest;
        //  });

         await Product.insertMany(products); // Insert the products into the database

         console.log("Data Imported");
         process.exit();

    }
    catch(error){
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
}

const destroyData = async() => {
    try{
        // Delete all documents from the Product collection
        await Product.deleteMany();
        console.log("Data Destroyed");
        process.exit();

    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const runSeeder = async() => {

    // Connect to the database
    await connectDB();

    // Check if the third command-line argument is '-d' (for "destroy")
    if(process.argv[2] === '-d'){
        await destroyData();
    }
    else{
        await importData();
    }
};

runSeeder();