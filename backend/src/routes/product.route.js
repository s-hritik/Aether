import {Router} from 'express'
import {verifyJWT ,isAdmin} from '../middlewares/auth.middleware.js'
import { addProduct, deleteproduct, getAllproduct, getproductById, updateproduct } from '../controllers/product.controller.js'
import {upload} from '../middlewares/multer.middleware.js'

const ProductRouter = Router();

// Admin only Routes
ProductRouter.route('/add').post(verifyJWT, isAdmin,upload.single('image'), addProduct)
ProductRouter.route('/:id').put(verifyJWT, isAdmin, updateproduct)
ProductRouter.route('/:id').delete(verifyJWT, isAdmin, deleteproduct)

// Public Routes
ProductRouter.route('/').get(getAllproduct)
ProductRouter.route('/:id').get(getproductById)

export default ProductRouter;