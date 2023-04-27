const flightModel =  require('../models/FlightModel')
const userRoles = require("../enums/userRoles");
const { v4: uuidv4 } = require('uuid');

async function getAllFlights(params) {
    const allFlightData = await flightModel.find({});
    return allFlightData
}

async function getSearchAllFlights(params) {
    const filter = {}
    const allFlightData = await flightModel.find(filter);
    return allFlightData
}

