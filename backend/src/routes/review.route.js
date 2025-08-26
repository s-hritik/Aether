import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createReview, getReview } from '../controllers/review.controller.js';

const reviewRouter = Router();

reviewRouter.route("/:productId").get(getReview);
reviewRouter.route("/:productId").post(verifyJWT, createReview);

export default reviewRouter;