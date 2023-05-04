const express = require("express");
const router = express.Router();
const cors = require("cors");
const { getAllFlights, getSearchAllFlights, createFlightCheckoutRecord } = require("../services/flightService");
const { logger } = require("../middlewares/loggerMiddleware");

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