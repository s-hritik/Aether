import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const uploadOnCloudinary = async (source) => {

     try{
          if(!source) return null;

          const response  = await cloudinary.uploader.upload(source,{resource_type : 'auto'});

          return response ; 
     }
     catch(error){
        if(typeof source === 'string' && fs.existsSync(source)){
            fs.unlinkSync(source);
        }
        console.error("Error uploading image to Cloudinary:", error);
        return null;
     }
}

export {uploadOnCloudinary};