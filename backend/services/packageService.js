const packageModel =  require('../models/packageModel')
const userRoles = require("../enums/userRoles");
const { v4: uuidv4 } = require('uuid');

async function getallPackages(params) {
    const allPackages = await packageModel.find({});
    return allPackages
}