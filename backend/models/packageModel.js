const mongoose = require("mongoose");

const backOfficeUserSchema = new mongoose.Schema({
    Destination:  {
        type: String,
        required : [true, "Destination required"]
    },
    Duration:  {
        type: String,
        required : [true, "Duration required"]
    },
    Number_of_Travelers :  {
        type: Number,
        required : [true, " Number of Travelers required"]
    },
    Specialty: {
        type: String
    },
    Price: {
        type: Number
    },
    Package_Rating:{
        type: String
    },
    Hotel:  {
        type: String
    },
    Location:  {
        type: String
    },
    package_Description:  {
        type: String
    },
    Contct_Email:  {
        type: String
    }
});

module.exports = mongoose.model("Package", packageSchema);