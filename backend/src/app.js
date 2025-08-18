import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { User } from './models/user.model.js';
import { Product } from './models/product.model.js';
import { Order } from './models/order.model.js';
import userRouter from './routes/user.route.js';
import ProductRouter from './routes/product.route.js';
import orderRouter from './routes/order.route.js';
// import paymentRouter from './routes/payment.route.js';



const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : '20kb'}));
app.use(express.urlencoded({extended : true , limit : '16kb'}));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products',ProductRouter);
app.use('/api/v1/orders', orderRouter)
// app.use('/api/v1/payments', paymentRouter);

export {app};