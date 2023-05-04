const mongoose = require("mongoose");
const  {schema} = mongoose;
var packageCheckoutScheme = mongoose.Schema({
    destination: String,
    duration: String,
    numberOfTravelers: String,
    specialty: String,
    packageName: String,
    price: String,
    tourLocation: String,
    packageDescription: String,
    contactEmail: String,
    Gender:String,
    ageBetween:String,
    email: String,
    name: String,
    address: String,
    city: String,
    zip: Number,
    country: String,
});

module.exports = mongoose.model("packageCheckouts", packageCheckoutScheme);