// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import { Order } from '../models/order.model.js';
// import { ApiResponse } from '../utility/ApiResponse.js';
// import { AsyncHandler } from '../utility/AsyncHandler.js';

// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const createOrder = AsyncHandler(async (req, res) => {
//     const { amount } = req.body;

//     const options = {
//         amount: Number(amount * 100),
//         currency: "INR",
//         receipt: `receipt_order_${new Date().getTime()}`
//     };

//     const order = await razorpay.orders.create(options);

//     res.status(200).json(new ApiResponse(200, order, "Order created successfully"));
// });

// const verifyPayment = AsyncHandler(async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//         .update(body.toString())
//         .digest('hex');

//     const isAuthentic = expectedSignature === razorpay_signature;

//     if (isAuthentic) {
//         // Signature is authentic, update the order in the database
//         await Order.findByIdAndUpdate(orderId, {
//             payment: true,
//             status: "Processing"
//         });

//         res.status(200).json(new ApiResponse(200, { verified: true }, "Payment verified successfully"));
//     } else {
//         res.status(400).json(new ApiResponse(400, { verified: false }, "Payment verification failed"));
//     }
// });

// export { createOrder, verifyPayment };