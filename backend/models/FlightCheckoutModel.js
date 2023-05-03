const mongoose = require("mongoose");

var flightCheckoutScheme = mongoose.Schema({
    airline: String,
    fromCountry: String,
    toCountry: String,
    price: Number,
    departureDate: String,
    departureTime: String,
    landingDate: String,
    landingTime: String,
    isRefundable: Boolean,
    tripType: String,
    class: String,
    email: String,
    name: String,
    address: String,
    city: String,
    zip: Number,
    country: String,
    mealType: String,
    seatType: String,
});

module.exports = mongoose.model("flightCheckouts", flightCheckoutScheme);