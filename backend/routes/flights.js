const mongoose = require("mongoose")
var express = require('express');

// tripType -> one way | round trip
// roundBackfromTerminal -> can be empty if one way
// roundBackToTerminal -> can be empty if one way

var flightScheme = mongoose.Schema({
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