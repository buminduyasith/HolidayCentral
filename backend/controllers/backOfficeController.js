const express = require("express");
const router = express.Router();
const multer = require('multer');

const userRoles = require("../enums/userRoles");
const { InsertFlightDetails } = require("../services/backofficeuserService");

const upload = multer({ dest: 'uploads/' });

router.get("/", (req, res) => {
    res.send("admin bo");
});

router.post("/flights", upload.single(""), async (req, res) => {
    const csvPath = req.file;
    console.log("csvPath", csvPath);
    res.send(csvPath);
});

module.exports = router;
