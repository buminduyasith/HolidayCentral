const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    hashPassword: String,
    Role: Number,
    CreatedDate: Date,
    UpdatedDate: Date,
    CreatedBy: String,
});

module.exports = mongoose.model("Users", userSchema);
