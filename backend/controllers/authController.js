const express = require("express");
const router = express.Router();
const { CreateBackofficeUser } = require("../services/backofficeuserService");

router.get("/", (req, res) => {
    res.sendStatus(200);
});

router.post("/signin", (req, res) => {
    res.json(res.body);
});

router.post("/backoffice/signup", async (req, res, next) => {
    console.log("bo signup", req.body);
    if (!req.body) {
        res.sendStatus(403);
    }
    try {
       var x = await CreateBackofficeUser(req.body);
       console.log("x",x)
    } catch (error) {
        res.status(400);
        next(error);
    }

    res.json(req.body);
});

router.post("/travelagent/signup", (req, res) => {
    res.json(res.body);
});

module.exports = router;
