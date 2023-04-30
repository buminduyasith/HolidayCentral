const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const boUserModel = require("../models/BackOfficeUserModel");
const flightModel = require("../models/FlightModel");
const { SendBOUserAccountCreationEmail } = require("../services/emailService");

async function CreateBackofficeUser(boUser, identiyUser) {
    boUser.createdDate = Date.now();
    boUser.userId = identiyUser.userId;
    const newBOUserModel = new boUserModel(boUser);
    const newBoUser = await newBOUserModel.save();
    await SendBOUserAccountCreationEmail(identiyUser.email, boUser.firstName, identiyUser.password);
    return newBoUser;
}

async function InsertFlightDetails() {
    try {
        const csvPath = path.join(__dirname, "..", "resources", "testData", "CSVflightDetails.csv");
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
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    CreateBackofficeUser,
    InsertFlightDetails,
};
