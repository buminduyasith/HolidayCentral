const flightModel = require("../models/FlightModel");
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

async function GetAllFlights() {
    const flights = await flightModel.find({});
    return flights;
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

async function InsertFlightDetails(csvPath) {
    console.log("csvPath", csvPath);
    const flightRecords = await new Promise((resolve, reject) => {
        const parser = parse({ columns: true }, (err, records) => {
            if (err) {
                reject(err);
            } else {
                resolve(records);
            }
        });
        fs.createReadStream(csvPath).pipe(parser);
    });

    const flightModels = flightRecords.map((flightRecord) => new flightModel(flightRecord));
    const results = await flightModel.insertMany(flightModels);

    console.log("flight detail results", results);
    return results;
}

module.exports = {
    GetAllFlights,
    GetFlightById,
    DeleteFlightById,
    UpdateFlightById,
    InsertFlightDetails
};
