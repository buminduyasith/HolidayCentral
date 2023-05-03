const express = require("express");
const router = express.Router();
const cors = require("cors");
const { getAllFlights, getSearchAllFlights, createFlightCheckoutRecord } = require("../services/flightService");
const fs = require("fs");
const path = require("path");
const { logger } = require("../middlewares/loggerMiddleware");

const logFilePath = path.join(__dirname, "../logs/api.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

router.use(cors());

router.use(logger);

router.get("/allflights", async (req, res, next) => {
    try {
        const response = await getAllFlights();
        console.log("res", response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }
});

router.get("/searchflights", async (req, res, next) => {
    try {
        const response = await getSearchAllFlights(req)
        console.log("res", response);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: "Invalid input" });
        next(error);
    }
});

router.post("/checkout", async (req, res, next) => {
    try {
        const response = await createFlightCheckoutRecord(req)
        console.log("res", response);
        res.status(201).send("Flight checkout record created successfully");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }
});

module.exports = router;