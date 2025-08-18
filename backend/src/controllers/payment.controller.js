// import stripePackage from 'stripe';
// import {ApiError} from '../utility/ApiError.js';
// import { AsyncHandler } from '../utility/AsyncHandler.js';
// import {ApiResponse} from '../utility/ApiResponse.js';

// const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

// const createPaymentIntent = AsyncHandler(async(req, res) => {
//     const {amount} = req.body;

//     if(!amount || amount < 1) throw new ApiError(400, 'Invalid amount');

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount : amount * 100,
//         currency : 'inr',
//         automatic_payment_methods : {
//             eanbled: true
//         }
//     });

//     if(!paymentIntent) throw new ApiError(500 , 'failed to create payment intent')

//     return res.status(200).json(
//         new ApiResponse(
//             201,
//             {clientSecret : paymentIntent.client_secret},
//             'Payment intent created successfully'
//         )
//     )    
// })

// export {createPaymentIntent};


// // ## 6. Frontend Integration (High-Level)

// // Your backend is now ready. The frontend will:

// // Fetch a Payment Intent: When a user is ready to check out, the frontend will call your /api/v1/payment/create-intent endpoint with the total order amount.

// // Receive the clientSecret: Your backend will respond with the clientSecret from the Payment Intent.

// // Confirm the Payment: The frontend will use this clientSecret and your Publishable Key with Stripe's frontend library (Stripe Elements) to securely display a payment form and finalize the transaction. The actual credit card details never touch your server.