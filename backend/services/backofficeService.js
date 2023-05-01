const flightModel = require("../models/FlightModel");

async function GetAllFlights() {
    const flights = await flightModel.find({});
    return flights;
}

async function GetFlightById(id) {
    const flight = await flightModel.findById(id);
    return flight;
}

async function GetFlightById(id) {
    const flight = await flightModel.findById(id);
    return flight;
}

async function DeleteFlightById(id) {
    const deletedFlight = await flightModel.findByIdAndDelete(id);
    return deletedFlight;
}

async function UpdateFlightById(id, data) {
    const updatedFlight = await flightModel.findByIdAndUpdate(id, data, {
        new: true, // return the updated document
    });
    return updatedFlight;
}

module.exports = {
    GetAllFlights,
    GetFlightById,
    DeleteFlightById,
    UpdateFlightById
};
