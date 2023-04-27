const mongoose = require("mongoose");

const backOfficeUserSchema = new mongoose.Schema({
    id: {
        type: String,
        required : [true, "id required"]
    },
    firstName:  {
        type: String,
        required : [true, "FirstName required"]
    },
    lastName :  {
        type: String,
        required : [true, "LastName required"]
    },
    phoeNumber :  {
        type: String,
        required : [true, "PhoeNumber required"]
    },
    createdDate: {
        type: Date,
        required : [true, "CreatedDate required"]
    },
    updatedDate: {
        type: Date
    }
});

module.exports = mongoose.model("BackOfficeUserSchema", backOfficeUserSchema);
