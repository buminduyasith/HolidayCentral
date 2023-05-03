const packageModel =  require('../models/packageModel')
const userRoles = require("../enums/userRoles");
const { v4: uuidv4 } = require('uuid');

async function getallPackages() {
    let results;

   await packageModel.find({})
    .then((docs) => {
        console.log("docs-->", docs);
        results = docs
    })
    .catch((error) => {
        console.error(error);
        return error;
    });

    return results

}

async function getSearchallpackages(req) {
    let results;
    const searchCriteria = {};

     const queryFields = ['package_Name', 'price', 'tour_Location', 'package_Rating', 'package_Description','contact_Email','travelStartDate','travelEndDate'];
     for (const field of queryFields) {
        if (req.query[field]) {
             if (field === 'travelStartDate' || field === 'travelEndDate') {
                 searchCriteria[field] = new Date(req.query[field]);
            } else {
                 searchCriteria[field] = req.query[field];
             }
        }
     }

    await packageModel.find(searchCriteria)
        .then((Package) => {
            console.log(`${Package.length} Package found matching the search criteria:`);
            console.log(Package);
            results = Package
        })
        .catch((error) => {
            console.error(`Error while searching for Packages: ${error.message}`);
            return error;
        });

    return results

}

async function getallPackages() {
    let results;

   await packageModel.find({})
    .then((docs) => {
        console.log("docs-->", docs);
        results = docs
    })
    .catch((error) => {
        console.error(error);
        return error;
    });

    return results

}

module.exports = {
    getallPackages,
    getSearchallpackages
   
};
