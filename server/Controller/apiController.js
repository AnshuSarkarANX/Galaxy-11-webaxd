const Booking = require("../model/bookingModel");
const ProductModel = require("../model/productModel");
const ratingModel = require("../model/ratingModel");
const RatingModel = require("../model/ratingModel");
const BannerModel = require("../model/bannerImg");
const asyncHandler = require("express-async-handler");
const offerModel = require("../model/OfferModel");
const path = require("path");

exports.product = async (req, res) => {
  try {
    const proData = await ProductModel.find();
    res
      .status(200)
      .json({
        success: true,
        msg: " product fetch Successfully",
        data: proData,
        status: 200,
      });
  } catch (error) {
    res.status(400).json({ success: true, msg: error.message });
  }
};

exports.banner = async (req, res) => {
  try {
    const bannerimg = await BannerModel.find();
    res
      .status(200)
      .json({
        success: true,
        msg: " Banner Image show",
        data: bannerimg,
        status: 200,
      });
  } catch (error) {
    res.status(400).json({ success: true, msg: error.message });
  }
};

exports.createReating = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);
    const newRating = new ratingModel({
      name: req.body.name,
      description: req.body.description,
      ratings: req.body.ratings,
      image: images,
    });

    const result = await newRating.save();
    res
      .status(201)
      .json({ message: "Rating created successfully!", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error, Try again" });
  }
};

exports.rating = async (req, res) => {
  try {
    const ratingData = await RatingModel.find();
    res
      .status(200)
      .json({
        success: true,
        msg: " Rating fetch Successfully",
        data: ratingData,
        status: 200,
      });
  } catch (error) {
    res.status(400).json({ success: true, msg: error.message });
  }
};

exports.createBooking = asyncHandler(async (req, res, next) => {
  try {
    const booking = new Booking({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      event_Type: req.body.event_Type,
      person: req.body.person,
      date: req.body.date,
      startTime: req.body.startTime,
      // endTime: req.body.endTime
    });

    const result = await booking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully!", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating booking" });
  }
});

exports.getBookings = asyncHandler(async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ date: 1, startTime: 1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// exports.getAvailableTimeSlots = asyncHandler(async (req, res, next) => {
//     const date = req.query.date;

//     try {
//         const bookings = await Booking.find({ date });

//         const availableTimeSlots = [];
//         for (let hour = 10; hour < 23; hour++) {
//             const startTime = `${hour.toString().padStart(2, '0')}:00`;
//             const endTime = `${hour.toString().padStart(2, '0')}:59`;
//             let isAvailable = true;

//             bookings.forEach((booking) => {
//                 if (booking.startTime <= startTime && booking.endTime > startTime) {
//                     isAvailable = false;
//                 }
//             });

//             if (isAvailable) {
//                 availableTimeSlots.push({ startTime, endTime });
//             }
//         }

//         res.status(200).json(availableTimeSlots);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching available time slots' });
//     }
// });

exports.getAvailableTimeSlots = asyncHandler(async (req, res, next) => {
  const date = req.query.date;

  try {
    const bookings = await Booking.find({ date });

    const availableTimeSlots = [];
    for (let hour = 10; hour < 22; hour++) {
      const startTime = `${hour.toString().padStart(2, "0")}:00`;
      let isAvailable = true;

      bookings.forEach((booking) => {
        if (booking.startTime <= startTime && booking.endTime > startTime) {
          isAvailable = false;
        }
      });

      if (isAvailable) {
        availableTimeSlots.push({ startTime });
      }
    }

    res.status(200).json(availableTimeSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching available time slots" });
  }
});
exports.Offerzone = async (req, res) => {
  try {
    const offerData = await offerModel.find();
    res
      .status(200)
      .json({
        success: true,
        msg: " Offer fetch Successfully",
        data: offerData,
      });
  } catch (error) {
    res.status(400).json({ success: true, msg: error.message });
  }
};
