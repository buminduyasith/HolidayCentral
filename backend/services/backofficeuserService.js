
const boUserModel = require('../models/BackOfficeUserModel')
const userRoles = require("../enums/userRoles");
const { v4: uuidv4 } = require('uuid');

async function CreateBackofficeUser(boUser){
    boUser.id = uuidv4();
    boUser.createdDate = Date.now()
    const newBOUser = new boUserModel(boUser)
    return await newBOUser.save();
}

module.exports = {
    CreateBackofficeUser
};