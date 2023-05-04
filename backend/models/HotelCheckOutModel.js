const mongoose = require("mongoose")
const  {schema} = mongoose;

const hotelCheckOutSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    aName:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    rooms:{
        type: Number,
    },
    Price:{
        type: Number,
        //required: true
    },
    checkInDate:{
        type: String,
        required: true
    },
    checkOutDate:{
        type: String,
        required: true
    },
    featured:{
        type: Boolean,
        default: true,
    },
    email:{
        type: String,
    },
    country:{
        type: String,
    },
    zip:{
        type: String,
    },
    roomType:{
        type: String,
    },
    boardType:{
        type: String,
    },

});
module.exports=mongoose.model("HotelCheckOuts", hotelCheckOutSchema); // HotelCheckOuts => DB collection name


