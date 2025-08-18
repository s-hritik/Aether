import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from '../utility/ApiResponse.js';
import { AsyncHandler } from "../utility/AsyncHandler.js";
import {User} from '../models/user.model.js'
import {Order} from '../models/order.model.js'
import {Product} from '../models/product.model.js'

const addToCart = AsyncHandler(async(req, res) => {
     const {productId , quantity = 1} = req.body;
     const userId = req.user._id;

     const userData = await User.findById(userId)

     const cartItemIndex = userData.cart.findIndex(item => item.product.toString() === productId);

     if(cartItemIndex > -1) {
            userData.cart[cartItemIndex].quantity += quantity;
     }
     else {
        userData.cart.push({product : productId , quantity})
     }

     await userData.save();

     return res.status(200).json(
        new ApiResponse(200,userData.cart,'items added to cart')
     )
})

const removeFromCart = AsyncHandler(async(req, res) => {
    
    const {productId} = req.params;
    const userId = req.user._id;

    const userData = await User.findById(userId)

    userData.cart = userData.cart.filter(item => item.product.toString() != productId)

    await userData.save();

    return res.status(200).json(
        new ApiResponse(200,userData.cart,'items removed from cart')
    )
})

const updateCartItemQuantity = AsyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);

    if (!productId || !quantity || quantity < 1) {
        throw new ApiError(400, "Product ID and a valid quantity are required");
    }

    const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (cartItemIndex > -1) {
        // If the item exists, update its quantity
        user.cart[cartItemIndex].quantity = quantity;
    } else {
        throw new ApiError(404, "Item not found in cart");
    }

    await user.save();
    
    // Populate product details before sending the response
    const updatedCart = await User.findById(req.user._id).populate('cart.product');

    return res.status(200).json(
        new ApiResponse(200, updatedCart.cart, "Cart quantity updated successfully")
    );
});

const getCart = AsyncHandler(async(req, res) => {

    const userData = await User.findById(req.user._id).populate('cart.product');

    if(!userData) throw new ApiError (404, 'user not found');

    return res.status(200).json(
        new ApiResponse(200, userData.cart , 'cart data is retrieved')
    )

})

const placeOrder = AsyncHandler(async(req , res) => {

    // Get user ID and shipping address
      const {shippingAddress} = req.body
      const userId = req.user._id

    // Fetch the user's current cart data
      const userData = await User.findById(userId).populate('cart.product')

      if( !userData || userData.cart.length === 0) {
        throw new ApiError(404, 'cart is empty , cannot be placed')
      }

    // prepare to build the order
      let totalAmount = 0;
      
    // loop through items in the cart
      const orderItems = userData.cart.map(cartItem => {

         totalAmount += cartItem.product.price * cartItem.quantity;

         return {
            productId : cartItem.product._id,
            quantity : cartItem.quantity
         }
      });
    
    // create the new order 
    const newOrder = await Order.create({
        userId : req.user._id,
        products : orderItems,
        amount  : totalAmount,
        address : shippingAddress
    }) 
    
    // clear the user cart
    userData.cart = [];
    await userData.save();
         

    return res.status(201).json(
        new ApiResponse(201, newOrder , 'order placed successfully')
    )
})

const AllpreviousAndCurrentOrders = AsyncHandler(async(req, res) => {
    
    const orders = await Order.find({userId : req.user._id}).populate("products.productId", "name price image");

    if(!orders) throw new ApiError(404, 'No orders found for the user')

    // return the list of orders
    return res.status(200).json(
        new ApiResponse(200, orders , 'user orders retrived successfully')
    )    
})

const getAllordersToAdmin = AsyncHandler(async(req, res) => {

    //find all orders and sort them by creation date (newest first)
    const orders = await Order.find({}).populate("userId","name email").sort({createdAt : -1})

    if(!orders) throw new ApiError(404, 'No orders Found');

    return res.status(200).json(
        new ApiResponse(200, orders, 'All orders retrieved successfully')
    )
})

const updateOrderStatus = AsyncHandler(async(req, res) => {
    const {orderId} = req.params;
    const {status} = req.body

    const validStatus = ['Pending', 'Processing', 'Shipped','Delivered','Cancelled']

    if(!validStatus.includes(status)) throw new ApiError(404, 'Invalid order status')

    // find the order by its id and update status
    const updateOrder = await Order.findByIdAndUpdate(orderId , {status}, {new : true})  // returns updated document

    if(!updateOrder) throw new ApiError(404 , 'order not found')

    return res.status(200).json(
        new ApiResponse(200, updateOrder , 'order status updated successfully')
    )    
})


export {addToCart , removeFromCart ,updateCartItemQuantity, getCart , placeOrder , AllpreviousAndCurrentOrders , getAllordersToAdmin , updateOrderStatus}