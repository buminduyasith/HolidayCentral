const express = require("express");
const router = express.Router();
const { getAllFlights } = require("../services/flightService")

router.get("/allflights", async (req, res) => {
    try {
        const response = await getAllFlights(req, res);
        console.log("res", response);
        res.send(response).sendStatus(200);
    } catch (error) {
        res.status(400);
        next(error);
    }
});

router.get("/getflights", (req, res) => {
    res.sendStatus(200);
});

module.exports = router;