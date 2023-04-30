const flightModel = require('../models/FlightModel')
const userRoles = require("../enums/userRoles");
const { v4: uuidv4 } = require('uuid');
const reader = require('xlsx')
const path = require('path')

async function getAllFlights(res, req) {
    flightModel.find({})
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

async function getSearchAllFlights(params) {
    const filter = {}
    const allFlightData = await flightModel.find(filter);
    return allFlightData
}

module.exports = {
    getAllFlights
};