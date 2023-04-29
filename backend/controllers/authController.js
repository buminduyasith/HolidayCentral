const express = require("express");
const router = express.Router();
const { CreateBackofficeUser } = require("../services/backofficeuserService");
const { CreateUserAccount, Signin } = require("../services/userBaseService");

router.get("/", (req, res) => {
    res.sendStatus(200);
});

router.post("/signin", async (req, res, next) => {
    try {
        const user = await Signin(req.body.email, req.body.password);
        res.status(200).json(user);
    } catch (error) {
        res.status(401);
        next(error);
    }
});

router.post("/backoffice/signup", async (req, res, next) => {
    try {
        const response = await CreateUserAccount(req.body.email);
        console.log("res", response);

        if (response.isError) {
            const error = new Error(response.msg);
            res.status(409);
            return next(error);
        }
        await CreateBackofficeUser(req.body, response.data);
        res.sendStatus(201);
    } catch (error) {
        res.status(400);
        next(error);
    }
});

router.post("/travelagent/signup", (req, res) => {
    res.json(res.body);
});

module.exports = router;
