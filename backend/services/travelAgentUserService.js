const taUserModel = require("../models/TravelAgentUserModel");
const {SendTAUserAccountCreationEmail} = require('../services/emailService')

async function CreateTravelAgenteUser(taUserRequest, identiyUser) {
    taUserRequest.createdDate = Date.now();
    taUserRequest.userId = identiyUser.userId;
    const newTAUserModel = new taUserModel(taUserRequest);
    const newTAUser =  await newTAUserModel.save();
    await SendTAUserAccountCreationEmail(identiyUser.email, taUserRequest.firstName, identiyUser.password)
    return newTAUser

}

module.exports = {
    CreateTravelAgenteUser,
};
