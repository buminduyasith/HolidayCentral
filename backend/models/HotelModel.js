const mongoose = require("mongoose")
const  {schema} = mongoose;

const HotelSchema = new mongoose.Schema({
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
    desc:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min:0,
        max:5
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
    facilities:{
        type: String,
    },
    featured:{
        type: Boolean,
        default: false,
    },

});
module.exports=mongoose.model("Hotels", HotelSchema); // Hotel => DB collection name