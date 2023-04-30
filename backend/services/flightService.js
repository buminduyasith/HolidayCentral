const flightModel = require('../models/FlightModel')
const userRoles = require("../enums/userRoles");
const { v4: uuidv4 } = require('uuid');
const reader = require('xlsx')
const path = require('path')

async function getAllFlights(params) {
    const allFlightData = await flightModel.find({});
    return allFlightData
}

async function getSearchAllFlights(params) {
    const filter = {}
    const allFlightData = await flightModel.find(filter);
    return allFlightData
}

async function setFlightData(req, res, next) {
    const results = [];
    if (!req.file.path) {
        res.sendStatus(403);
    }
    try {
        const filePath = path.join(__dirname, '../uploads/flightData.xlsx')
        const file = reader.readFile(filePath)
        let data = []
        const sheets = file.SheetNames

        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            })
        }

        // Printing data
        console.log(data)

        res.sendStatus(201);


    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }

    // res.sendStatus(201).send("Created");
}

module.exports = {
    setFlightData
};