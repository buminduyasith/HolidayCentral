const boUserModel = require("../models/BackOfficeUserModel");
const userRoles = require("../enums/userRoles");
const {SendBOUserAccountCreationEmail} = require('../services/emailService')

async function CreateBackofficeUser(boUser, identiyUser) {
    boUser.createdDate = Date.now();
    boUser.userId = identiyUser.userId;
    const newBOUserModel = new boUserModel(boUser);
    const newBoUser =  await newBOUserModel.save();
    await SendBOUserAccountCreationEmail(identiyUser.email, boUser.firstName, identiyUser.password)
    return newBoUser

}

module.exports = {
    CreateBackofficeUser,
};
