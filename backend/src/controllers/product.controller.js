import { AsyncHandler } from '../utility/AsyncHandler.js'
import {ApiError} from '../utility/ApiError.js'
import {ApiResponse} from '../utility/ApiResponse.js'
import {Product} from '../models/product.model.js'
import {uploadOnCloudinary} from '../utility/Cloudinary.js'
import DataURIParser from 'datauri/parser.js'
import path from 'path'

const addProduct = AsyncHandler (async (req, res) => {

    const {name, description, price, category, stock , image} = req.body;

    if(!name || !price || !category || !stock) throw new ApiError(400, "Details are required.")
    
    if(!req.file) throw new ApiError(400, "Product Image is Required")   
    
    // Convert the buffer from multer into a data URI string
    const parser = new DataURIParser();
    const fileExtension = path.extname(req.file.originalname).toString();
    const dataUri = parser.format(fileExtension, req.file.buffer );
    
    // Upload the data URI content to Cloudinary
    const response_image = await uploadOnCloudinary(dataUri.content);
    if(!response_image) throw new ApiError(500, 'Somethong went wrong while uploding the image to cloudinary')

    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        image:[{url : response_image.secure_url}]
    })

    if(!product) throw new ApiError(500, 'Something went wrong creating the product')

    return res.status(201)
    .json(
        new ApiResponse(201, product, 'product created successfully')
    )    
})

const getAllproduct = AsyncHandler (async (req, res) => {

     const products = await Product.find({});

     if(!products) throw new ApiError(404, 'No products found')

     return res.status(200).json(
        new ApiResponse (200, products , 'products retrived sucessfully')
     ) ;  

})

const getproductById = AsyncHandler(async(req, res)=>{

    const product = await Product.findById(req.params.id)

    if(!product) throw new ApiError (404, 'product not found')

    return res.status(200).json(
        new ApiResponse(200, product, 'product retrived successfully')
    )    

})

const updateproduct = AsyncHandler(async(req, res) => {
    
    const product = await Product.findByIdAndUpdate(req.params.id, req.body,{new: true , runValidators :true})
    
    if(!product) throw new ApiError(404, 'product not found')
    
    return res.status(200).json(
        new ApiResponse(200,product,'products updated successfully')
    ) ;   
})

const deleteproduct = AsyncHandler(async(req, res) =>{

    const product = await Product.findByIdAndDelete(req.params.id)

    if(!product) throw new ApiError(404, 'product not found')

    return res.status(200).json(
        new ApiResponse(200,{},'product deleted successfuly')
    )    
})

export {addProduct , getAllproduct , getproductById , updateproduct, deleteproduct}