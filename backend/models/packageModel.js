const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    destination:  {
        type: String,
        required : [true, "Destination required"]
    },
    duration:  {
        type: String,
        required : [true, "Duration required"]
    },
    numberOfTravelers :  {
        type: Number,
        required : [true, " Number of Travelers required"]
    },
    specialty: {
        type: String
    },
    price: {
        type: Number
    },
    package_Rating:{
        type: Number
    },
    hotel:  {
        type: String
    },
    location:  {
        type: String
    },
    package_Description:  {
        type: String
    },
    contact_Email:  {
        type: String
    }
});

module.exports = mongoose.model("Package", packageSchema);