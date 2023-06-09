const mongoose = require("mongoose");

const backOfficeUserSchema = new mongoose.Schema({
    firstName:  {
        type: String,
        required : [true, "FirstName required"]
    },
    lastName :  {
        type: String,
        required : [true, "LastName required"]
    },
    phoneNumber :  {
        type: String,
        required : [true, "Phone Number required"]
    },
    createdDate: {
        type: Date,
        required : [true, "CreatedDate required"]
    },
    updatedDate: {
        type: Date
    },
    userId:{
        type: String,
        required : [true, "user id required"]
    }
});

module.exports = mongoose.model("BackOfficeUsers", backOfficeUserSchema);
