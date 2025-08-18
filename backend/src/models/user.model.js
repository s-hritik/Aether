import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // This creates a link to your Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
});

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [true,'Please enter your name'],
    },
    email :{
        type: String,
        required : [true,'please enter your email'],
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type: String,
        required : [true,'please enter your password']
    },
    role : {
        type: String,
        enum : ['user', 'admin'],
        default : 'user'
    },
    cart : [cartItemSchema],
    refreshToken : {
        type : String
    }
},
{
    timestamps : true
});


// This function runs right before a user document is saved
userSchema.pre('save', async function(next){
     // Only hash the password if it has been modified (or is new)
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password ,10);
})

//custom method to compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//custom method to generate  access token
userSchema.methods.generateAccessToken = function () {
        return jwt.sign( {
            _id : this._id,
            role : this.role,
            email : this.email,
            name : this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn :process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {_id : this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export const User = mongoose.model('User',userSchema);


