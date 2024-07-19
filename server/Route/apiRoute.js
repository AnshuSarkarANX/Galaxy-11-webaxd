const express = require("express");
const Route = express.Router();
const ApiController = require("../Controller/apiController");
const multiImage = require("../middleware/mutiImg");

Route.get("/api/products", ApiController.product);

Route.get("/api/banner", ApiController.banner);

Route.post("/api/create-Ratings", multiImage, ApiController.createReating);

Route.get("/api/ratings", ApiController.rating);

Route.post("/api/bookings", ApiController.createBooking);

Route.get("/api/getbookings", ApiController.getBookings);

Route.get("/api/available-time-slots", ApiController.getAvailableTimeSlots);

Route.get("/api/offer", ApiController.Offerzone);

module.exports = Route;
