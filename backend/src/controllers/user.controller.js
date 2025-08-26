import {AsyncHandler} from '../utility/AsyncHandler.js';
import {ApiError} from '../utility/ApiError.js';
import {ApiResponse} from '../utility/ApiResponse.js';
import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';


const refreshAccessToken = AsyncHandler(async (req , res)=>{
   
    // Refreshes the access token for a user. This controller handles the process of verifying an incoming refresh token, generating a new pair of access and refresh tokens, and sending them back  to the client to maintain the user's session.


    const incoming_RToken = req.cookies.refreshToken || req.body.refreshToken ;
    if(!incoming_RToken) throw new ApiError(401 , "Unathorized Access");

    try{
        
         const decodeToken = jwt.verify(
            incoming_RToken,
            process.env.REFRESH_TOKEN_SECRET)
      

         const user = await User.findById(decodeToken?._id)
         if(!user) throw new ApiError(401,'Invalid Refresh Token')


        console.log("Token from request:", incoming_RToken);
         console.log("Token from database:", user.refreshToken);

         if(incoming_RToken !== user.refreshToken) throw new ApiError(401, 'Refresh token is expired or has been used already')  
            
         const accessToken = user.generateAccessToken();
         const newRefreshToken = user.generateRefreshToken();

         user.refreshToken = newRefreshToken;
         await user.save({validateBeforeSave :false});

         const options = {
            httpOnly :true,
            secure : true
         }

         return res.status(200)
                    .cookie("accessToken", accessToken,options)
                    .cookie("refreshToken", newRefreshToken,options)
                    .json(
                        new ApiResponse(200,{accessToken,refreshToken: newRefreshToken},'Access token refresh successfully')
                    )

    }
    catch(error){
        throw new ApiError(401, 'Refresh is expired or invalid');
    };
    
})

const registerUser = AsyncHandler (async (req , res) => {

    //Get user deatils from request body 
    const {name, email, password} = req.body;
    if( !name || !email || !password) {
        throw new ApiError(400, 'Please provide all required fields');
    }

    const existedUser = await User.findOne({email});
    
    if(existedUser) {
        throw new ApiError(400, 'User already exists with this email');
    }

    const user = await User.create({
        name, email , password
    });

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    if(!createdUser) {
        throw new ApiError(500, 'User not created');
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, 'User created successfully' )
    )
})

const loginUser = AsyncHandler(async(req, res) => {
        
    const { email ,password} = req.body;

    if(!email || !password) throw new ApiError(400, 'Email and password required')

    const user = await User.findOne({email})
    
    if(!user) throw new ApiError(404, 'user does not exist')

    const ispassValid = await user.isPasswordCorrect(password)

    if(!ispassValid) throw new ApiError(401,'Invalid user credentials')

     const accessToken = user.generateAccessToken();
     const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
     
     const loggedInuser = await User.findById(user._id).select("-password -refreshToken")

     const options = {
        httpOnly :true,
        secure :true
     }

     return res
       .status(200)
       .cookie("accessToken",accessToken,options)
       .cookie("refreshToken",refreshToken, options)
       .json(
        new ApiResponse(
            200,
            {
                user :loggedInuser,
                accessToken , refreshToken
            },
            'user logged in successfully'

        )
       )
})

const logoutUser = AsyncHandler(async (req, res)=>{

    await User.findByIdAndUpdate(
        req.user._id,{
            $set : {
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true,
    };

    return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken',options)
    .json(new ApiResponse(200, {}, 'user logged out successfully'))
})

const getMyProfile = AsyncHandler(async(req, res) => {

    // because of verifyJWT middleware, the full user document (minus password) is already attached to the request object as req.user.
    // just need to return it.

    return res.status(200).json(
        new ApiResponse(200, req.user , 'user profile retrived successfully')
    )
})

const updateProfile = AsyncHandler(async(req, res) => {

    const {name} = req.body;

    const updateUser = await User.findByIdAndUpdate(req.user._id, {name:name} , {new :true}).select('-password -refreshToken') // exclude sensitive feilds

    if(!updateUser) throw new ApiError(404, 'user not found')

    return res.status(200).json(
        new ApiResponse(200,updateUser, 'Profile updated successfully')
    )    
})

const changePassword = AsyncHandler(async(req, res) => {
    const {oldPassword , newPassword} = req.body;
    const user = await User.findById(req.user._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect) throw new ApiError(401 , 'invalid old password')

    // set the new password    
     user.password = newPassword;

     // it Save the user document. The .pre('save') hook in user.model.js it will automatically hash the new password before it's saved.
    await user.save({validateBeforeSave :false})

    return res.status(200).json(
        new ApiResponse(200, {}, 'password changed successfully')
     )

})

const getAllUsers = AsyncHandler(async(req, res)=> {
    const users = await User.find({}).select('-password -refreshToken')

    if(!users) throw new ApiError(404, 'No user found')

    return res.status(200).json(
        new ApiResponse(200,users, 'All users retrived successfully ')
    )    
})

const updateUserRole = AsyncHandler(async(req, res) => {
   const {userId} = req.params;
   const {role} = req.body

   if(role && !['user','admin'].includes(role)){
     throw new ApiError(400,'Invalid role specified')}

    const updatedUser = await User.findByIdAndUpdate(userId,{role:role},{new :true}).select('-password -refreshToken')

    if(!updatedUser) throw new ApiError(404,'user not found')

    return res.status(200).json(
        new ApiResponse(200,updatedUser,'user role updated')
     )   

})

const getWishlist = AsyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).populate('wishlist');
    if(!user)  throw new ApiError(404,'User not found') ;

    res.status(200).json(
        new ApiResponse(200, user.wishlist , 'Wishlist fetched successfully')
    );

})

const addToWishlist = AsyncHandler(async (req, res) => {
    const {productId} = req.body;

    await User.findByIdAndUpdate(req.user._id , {
         $addToSet : {
               wishlist : productId
           }
        });

     res.status(200).json(
        new ApiResponse (200 ,null , 'Product added to wishlist')
     );   
})

const removeFromWishlist = AsyncHandler(async(req, res) => {
    const {productId} = req.params;
    if (!productId) {
        throw new ApiError(400, 'Product ID is required');
    }
    await User.findByIdAndUpdate(req.user._id , {
        $pull : {
            wishlist : productId
        }
    });

    res.status(200).json(
        new ApiResponse(200, null , 'Product removed from wishlist')
    )
})


export {refreshAccessToken , registerUser ,loginUser ,logoutUser , getMyProfile , updateProfile , changePassword , getAllUsers , updateUserRole ,addToWishlist ,getWishlist ,removeFromWishlist};

