const packageModel =  require('../models/packageModel')
const userRoles = require("../enums/userRoles");
const { v4: uuidv4 } = require('uuid');

async function getallPackages(res, req) {
    packageModel.find({})
    .then((docs) => {
        console.log(docs);
        res.sendStatus(200);
        return docs
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
        return [];
    });
}