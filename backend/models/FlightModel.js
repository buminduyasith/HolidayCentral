const mongoose = require("mongoose");

// tripType -> one way | round trip
// roundBackfromTerminal -> can be empty if one way
// roundBackToTerminal -> can be empty if one way

var flightScheme = mongoose.Schema({
    id: String,
    airline:  String,
    fromTerminal: String,
    toTerminal: String,
    fromCountry: String,
    toCountry: String,
    roundBackfromTerminal: String,
    roundBackToTerminal: String,
    price: String,
    departureDateTime: String,
    landingDateTime: String,
    flightDuration: String,
    stops: String,
    allowedMaxBaggageWeight: String,
    isRefundable: Boolean,
    tripType: String,
});

module.exports = mongoose.model("flights", flightScheme);