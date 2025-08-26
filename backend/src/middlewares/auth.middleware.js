import {ApiError} from '../utility/ApiError.js';
import { AsyncHandler } from '../utility/AsyncHandler.js';
import jwt from 'jsonwebtoken';
import { User} from '../models/user.model.js';

export const verifyJWT = AsyncHandler (async (req, res, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token) throw new ApiError(401, 'Unauthorized access');

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user) throw new ApiError(401 , ' Invalid Access Token');

        req.user = user;
        next(); // Proceed to the next middleware or route handler

    }
    catch (error) {
        throw new ApiError(401, 'Unauthorized access');
    }
})

export const isAdmin = (req, res, next) => {
    
    if(req.user && req.user.role === 'admin') next();

    else res.status(403).json({message : 'Not authorized as an admin'})
}