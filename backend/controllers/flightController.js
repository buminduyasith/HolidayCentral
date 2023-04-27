const express = require("express");
const router = express.Router();

router.get("/allflights", (req, res) => {
    res.sendStatus(200);
});

router.get("/getflights", (req, res) => {
    res.sendStatus(200);
});

module.exports = router;