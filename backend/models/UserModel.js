const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    hashPassword: String,
    role: Number,
    createdDate: Date,
    updatedDate: Date,
    createdBy: String,
    isDefaultPwdChanged:Boolean
});

module.exports = mongoose.model("Users", userSchema);
