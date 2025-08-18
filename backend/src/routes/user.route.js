import {Router} from 'express';
import {refreshAccessToken , registerUser ,loginUser ,logoutUser , getMyProfile , updateProfile , changePassword , getAllUsers , updateUserRole } from '../controllers/user.controller.js';
import {isAdmin, verifyJWT} from '../middlewares/auth.middleware.js'

const userRouter = Router();

userRouter.route('/refresh-token').post(refreshAccessToken);

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post( verifyJWT, logoutUser)
userRouter.route('/profile').get(verifyJWT,getMyProfile).put(verifyJWT,updateProfile)
userRouter.route('/change-password').post(verifyJWT,changePassword)
userRouter.route('/').get(verifyJWT,isAdmin,getAllUsers)
userRouter.route('/update-role/:userId').put(verifyJWT,isAdmin,updateUserRole)

export default userRouter;