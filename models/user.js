const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: [true, "User Name is required"]
    },
    email: {
        type:String,
        required: [true, "Email is required"]
    },
    password: {
        type:String,
        required: [true, "Password required"]
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    orders: [{
        products: {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }

        },
        totalAmount: {
            type: Number,
            required: true
        },
        purchasedOn: {
            type: Date,
            default: new Date()
        }
    }]

})

module.exports = mongoose.model("User", userSchema)