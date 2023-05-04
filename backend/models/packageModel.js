const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    destination:  {
        type: String,
        required : [true, "Destination required"]
    },
    duration:  {
        type: String,
        required : [true, "Travel Star date required"]
    },
    numberOfTravelers :  {
        type: String,
        required : [true, "Number of Travelers required"]
    },
    specialty: {
        type: String,
        required : [true, "specialty required"]
    },
    packageName: {
        type: String
    },
    price: {
        type: String
    },
    tourLocation: {
        type: String
    },
    packageRating:{
        type: String
    },
    packageDescription:  {
        type: String
    },
    contactEmail:  {
        type: String
    }
});

module.exports = mongoose.model("Package", packageSchema);