const packageModel = require("../models/packageModel");
const userRoles = require("../enums/userRoles");
const { v4: uuidv4 } = require("uuid");

async function getallPackages() {
  let results;

  await packageModel
    .find({})
    .then((docs) => {
      console.log("docs-->", docs);
      results = docs;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

  return results;
}

async function getSearchallpackages(req) {
  let results;
  const searchCriteria = {};

  const queryFields = [
    'destination',
    'numberOfTravelers',
    'duration',
    'specialty'
  ];
  
  for (const field of queryFields) {
    if (req.query[field]) {
        
            searchCriteria[field] = req.query[field];
            console.log(field);
    }}

  await packageModel
    .find(searchCriteria)
    .then((Package) => {
      console.log(
        `${Package.length} Package found matching the search criteria:`
      );
      console.log(Package);
      results = Package;
    })
    .catch((error) => {
      console.error(`Error while searching for Packages: ${error.message}`);
      return error;
    });

  return results;
}



async function getallPackages() {
  let results;

  await packageModel
    .find({})
    .then((docs) => {
      console.log("docs-->", docs);
      results = docs;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

  return results;
}

async function createPackageCheckoutRecord(req) {
  let results;
  console.log("req--->", req)
  try {
      const newpackageCheckout = new packageCheckoutModel({
        destination: req.body.destination,
        duration: req.body.duration,
        numberOfTravelers: req.body.numberOfTravelers,
        specialty: req.body.specialty,
        packageName: req.body.packageName,
        price: req.body.price,
        tourLocation: req.body.tourLocation,
        packageRating: req.body.packageRating,
        packageDescription: req.body.packageDescription,
        contactEmail: req.body.contactEmail,
         
      });

      const result = await newPackageCheckout.save();
      results = result
      console.log("New package checkout record created:", result);

  } catch (err) {
      console.error("Error creating package checkout record:", err);
      return err;
  }

  return results
}


module.exports = {
  getallPackages,
  getSearchallpackages,
  createPackageCheckoutRecord,
};
