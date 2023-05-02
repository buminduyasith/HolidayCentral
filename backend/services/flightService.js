const flightModel = require('../models/FlightModel')
const FlightCheckoutModel = require('../models/FlightCheckoutModel')
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

    const queryFields = ['fromCountry', 'toCountry', 'departureDate', 'landingDate', 'class'];
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

async function createFlightCheckoutRecord(req) {
    let results;
    console.log("req--->", req)
    try {
        const newFlightCheckout = new FlightCheckoutModel({
            airline: req.body.airline,
            fromCountry: req.body.fromCountry,
            toCountry: req.body.toCountry,
            price: req.body.price,
            departureDate: req.body.departureDate,
            departureTime: req.body.departureTime,
            landingDate: req.body.landingDate,
            landingTime: req.body.landingTime,
            isRefundable: req.body.isRefundable,
            tripType: req.body.tripType,
            class: req.body.class,
            email: req.body.email,
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            mealType: req.body.mealType,
            seatType: req.body.seatType,
        });

        const result = await newFlightCheckout.save();
        results = result
        console.log("New flight checkout record created:", result);

    } catch (err) {
        console.error("Error creating flight checkout record:", err);
        return err;
    }

    return results
}

module.exports = {
    getAllFlights,
    getSearchAllFlights,
    createFlightCheckoutRecord
};