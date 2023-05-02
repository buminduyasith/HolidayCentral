const mongoose = require("mongoose");

const backOfficeUserSchema = new mongoose.Schema({
    Destination:  {
        type: String,
        required : [true, "Destination required"]
    },
    check_in:  {
        type: Date,
        required : [true, "check-in date required"]
    },
    check_out:  {
        type: Date,
        required : [true, "check-out date required"]
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
        type: Number
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
    Contact_Email:  {
        type: String
    }
});

module.exports = mongoose.model("Package", packageSchema);