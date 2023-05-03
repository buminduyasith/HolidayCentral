const mongoose = require("mongoose")
const  {schema} = mongoose;

const HotelCheckOutSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
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
    title:{
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
    agentname:{
        type: String,
    },
    email:{
        type: String,
    },
    zip:{
        type: String,
    },

});
module.exports=mongoose.model("HotelCheckOuts", HotelCheckOutSchema); // Hotel => DB collection name