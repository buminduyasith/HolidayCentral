const express = require("express");
const router = express.Router();
const packageModel =  require('../models/packageModel')

router.get("/allPackages", (req, res) => {
    res.sendStatus(200);
});

router.get("/getPackages", (req, res) => {
    res.sendStatus(200);
});

module.exports = router;