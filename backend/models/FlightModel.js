const mongoose = require("mongoose");

// tripType -> one way | round trip
// roundBackfromTerminal -> can be empty if one way
// roundBackToTerminal -> can be empty if one way

var flightScheme = mongoose.Schema({
    airline: String,
    fromTerminal: String,
    toTerminal: String,
    fromCountry: String,
    toCountry: String,
    roundBackfromTerminal: String,
    roundBackToTerminal: String,
    price: Number,
    departureDateTime: String,
    landingDateTime: String,
    flightDuration: Number,
    stops: Number,
    allowedMaxBaggageWeight: Number,
    isRefundable: Boolean,
    tripType: String,
    class: String,
});

module.exports = mongoose.model("flights", flightScheme);