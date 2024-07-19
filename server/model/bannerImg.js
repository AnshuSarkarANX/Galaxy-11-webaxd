const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bannerSchema = new Schema({

    image: {
        type: String,
        required: true
    },
    mobileImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },

}, { timestamps: true })

const bannerModel = new mongoose.model('banner', bannerSchema);
module.exports = bannerModel;