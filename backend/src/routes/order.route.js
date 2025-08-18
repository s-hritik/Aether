import {Router} from 'express'
import {verifyJWT , isAdmin} from '../middlewares/auth.middleware.js'
import { addToCart, AllpreviousAndCurrentOrders, getAllordersToAdmin, getCart, placeOrder, removeFromCart, updateCartItemQuantity, updateOrderStatus } from '../controllers/order.controller.js';

const orderRouter = Router();

// protected routes
orderRouter.route('/add-to-cart').post(verifyJWT, addToCart)
orderRouter.route('/remove-from-cart/:productId').delete(verifyJWT, removeFromCart)
orderRouter.route('/update-cart').put(verifyJWT,updateCartItemQuantity)
orderRouter.route('/get-cart').get(verifyJWT,getCart)
orderRouter.route('/place-orders').post(verifyJWT,placeOrder)
orderRouter.route('/my-orders').get(verifyJWT,AllpreviousAndCurrentOrders)

// admin routes
orderRouter.route('/all-orders').get(verifyJWT,isAdmin , getAllordersToAdmin)
orderRouter.route('/update-status/:orderId').put(verifyJWT,isAdmin, updateOrderStatus)


export default orderRouter;