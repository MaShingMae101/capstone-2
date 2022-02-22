const mongoose = require("mongoose");

//create the schema that each product must follow
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required."]
    },
    description: {
        type: String,
        required: [true, "Product description is required."]
    },
    price:{
        type: String,
        required: [true, "Price is required."]
    },
    isActive:{
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Product", productSchema)