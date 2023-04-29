const boUserModel = require("../models/BackOfficeUserModel");
const userRoles = require("../enums/userRoles");

async function CreateBackofficeUser(boUser, userId) {
    boUser.createdDate = Date.now();
    boUser.userId = userId;
    const newBOUser = new boUserModel(boUser);
    return await newBOUser.save();
}

module.exports = {
    CreateBackofficeUser,
};
