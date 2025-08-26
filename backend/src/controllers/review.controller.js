import { Review } from '../models/review.model.js';
import { ApiError } from '../utility/ApiError.js';
import { ApiResponse } from '../utility/ApiResponse.js';
import { AsyncHandler } from '../utility/AsyncHandler.js';

const createReview = AsyncHandler(async(req, res) => {
    const {productId} = req.params;
    const {rating, comment} = req.body;

    const review = await Review.create({
        product : productId,
        userId : req.user._id,
        rating,
        comment
    })

    if(!review){
        throw new ApiError(500,'Failed to create review');
    }
    const populatedReview = await Review.findById(review._id).populate("userId", "name");

    return res.status(201).json(
        new ApiResponse(201, populatedReview ,'Review added successfully')
    )
});

const getReview = AsyncHandler(async (req, res)=>{
    const {productId} = req.params;
    const reviews = await Review.find({product : productId}).populate('userId', 'name')

    return res.status(200).json(
        new ApiResponse(200, reviews ,'Reviews fetched successfuly')
    )
});

export {createReview, getReview}