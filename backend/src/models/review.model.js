import mongoose , {mongo, Schema} from 'mongoose';

const reviewSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required :true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    rating : {
        type : Number,
        required :true,
        min:1,
        max:5
    },
    comment:{
        type: String,
        required : true,
        trim : true
    }
},
{
    timestamps: true
})

export const Review = mongoose.model('Review', reviewSchema)