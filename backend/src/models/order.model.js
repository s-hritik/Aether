import mongoose from 'mongoose';
 
const Orderschema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    products: [
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required: true
            },
             quantity :{
                 type: Number,
                 required: true,
                 min: 1
            },
            // name: {
            //     type : String,
            //     required: true
            // },
            // image :{
            //     type : String,
            //     required: true  
            // },
            // price :{
            //     type : Number,
            //     required: true
            // }
           
        }],
        amount :{
            type : Number,
            required: true
        },
        address :{
            type : String,
            required : true
        },
        payment : {
            type : Boolean,
            default : false
        },
        status :{
            type : String,
            enum : ['Pending', 'Processing', 'Shipped','Delivered','Cancelled'],
            default : 'Pending'

        }
},
{
    timestamps:true
});

export const Order = mongoose.model('Order',Orderschema)
