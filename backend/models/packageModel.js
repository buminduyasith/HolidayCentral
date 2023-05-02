const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    destination:  {
        type: String,
        required : [true, "Destination required"]
    },
    travelStartDate:  {
        type: String,
        required : [true, "Travel Star date required"]
    },
    travelEndDate:  {
        type: String,
        required : [true, "Travel end date required"]
    },
    numberOfTravelers :  {
        type: Number,
        required : [true, " Number of Travelers required"]
    },
    specialty: {
        type: String,
        required : [true, " specialty required"]
    },
    packageName: {
        type: String
    },
    price: {
        type: Number
    },
    tourLocation: {
        type: String
    },
    packageRating:{
        type: Number
    },
    packageDescription:  {
        type: String
    },
    contactEmail:  {
        type: String
    }
});

module.exports = mongoose.model("Package", packageSchema);