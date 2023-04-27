const express = require("express");
const router = express.Router();

router.get("/flights", (req, res) => {
    res.sendStatus(200);
});