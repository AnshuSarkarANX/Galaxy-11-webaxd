const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },


    // }, { timestamps: true })
})
const productModel = new mongoose.model('product', productSchema);
module.exports = productModel;