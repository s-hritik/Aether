import mongoose from 'mongoose';
const imageSchema = new mongoose.Schema({
    url :{
        type:String,
        required:true
    }
})

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true , 'Please enter product name'],
        trim: true
    },
    description : {
        type : String,
        required : false
    },
    price:{
        type : Number,
        required : [true, ' please enter a price'],
        min : [0,'price cannot be negative']
    },
    stock:{
        type: Number,
        required : [true, 'please enter stock'],
        min: 0,
        default : 0
    },
    category : {
        type : String,
        required : [true, 'please enter a category'],
    },
    image : [imageSchema],
},
{
    timestamps:true
}
);

export const Product = mongoose.model('Product', productSchema);
