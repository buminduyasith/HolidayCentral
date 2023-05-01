const express = require("express");
const router = express.Router();
const cors = require("cors");
const { getAllFlights, getSearchAllFlights } = require("../services/flightService");

router.use(cors());

router.get("/allflights", async (req, res, next) => {
    try {
        const response = await getAllFlights();
        console.log("res", response);
        res.send(response).status(200);
    } catch (error) {
        res.status(500);
        next(error);
    }
});

router.get("/searchflights", async (req, res, next) => {
    try {
        const response = await getSearchAllFlights(req)
        console.log("res", response);
        res.send(response).status(200);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        next(error);
    }
});

module.exports = router;