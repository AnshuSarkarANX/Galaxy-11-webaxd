const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookingSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    event_Type: {
      type: String
    },
    person: {
      type: String,
    },
    date: {
      type: Date,
      // default:new Date(GMT),
      required: true

    },
    startTime: {
      type: String,
      required: true

    },
    // endTime: {
    //   type: String,
    //   required: true

    // },

    // }, { timestamps: true })
  })
const BookingModel = new mongoose.model('booking', BookingSchema);
module.exports = BookingModel;