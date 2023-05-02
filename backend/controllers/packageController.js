const express = require("express");
const router = express.Router();
const packageModel =  require('../models/packageModel')

router.get("/allPackages",async (req, res) => {
    try {
        const response = await getallPackages(req, res);
        console.log("res", response);
        res.send(response).sendStatus(200);
    } catch (error) {
        res.status(400);
        next(error);
    }
});

router.get("/getPackages", (req, res) => {
    res.sendStatus(200);
});

module.exports = router;