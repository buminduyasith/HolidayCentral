const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    hashPassword: String,
    Role: Number,
    CreatedDate: Date,
    UpdatedDate: Date,
    CreatedBy: String,
});

module.exports = mongoose.model("User", userSchema);
