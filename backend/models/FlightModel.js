const mongoose = require("mongoose");

var flightScheme = mongoose.Schema({
    airline: String,
    fromTerminal: String,
    toTerminal: String,
    fromCountry: String,
    toCountry: String,
    roundBackfromTerminal: String,
    roundBackToTerminal: String,
    price: Number,
    departureDate: String,
    departureTime: String,
    landingDate: String,
    landingTime: String,
    flightDuration: Number,
    stops: Number,
    allowedMaxBaggageWeight: Number,
    isRefundable: Boolean,
    tripType: String,
    class: String,
});

module.exports = mongoose.model("flights", flightScheme);