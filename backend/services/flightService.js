const flightModel = require('../models/FlightModel')
const userRoles = require("../enums/userRoles");
const { v4: uuidv4 } = require('uuid');

async function getAllFlights() {
    let results;

    await flightModel.find({})
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

async function getSearchAllFlights(req) {
    let results;
    const searchCriteria = {};

    const queryFields = ['fromCountry', 'fromTerminal', 'toCountry', 'toTerminal', 'departureDate', 'landingDate'];
    for (const field of queryFields) {
        if (req.query[field]) {
            if (field === 'departureDate' || field === 'landingDate') {
                searchCriteria[field] = new Date(req.query[field]);
            } else {
                searchCriteria[field] = req.query[field];
            }
        }
    }

    await flightModel.find(searchCriteria)
        .then((flights) => {
            console.log(`${flights.length} flights found matching the search criteria:`);
            console.log(flights);
            results = flights
        })
        .catch((error) => {
            console.error(`Error while searching for flights: ${error.message}`);
            return error;
        });

    return results

}

module.exports = {
    getAllFlights,
    getSearchAllFlights
};