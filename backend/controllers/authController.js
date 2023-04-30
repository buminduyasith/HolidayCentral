const express = require("express");
const router = express.Router();
const { CreateBackofficeUser } = require("../services/backofficeuserService");
const { CreateUserAccount, Signin } = require("../services/userBaseService");
const { CreateTravelAgenteUser} = require("../services/travelAgentUserService");
const userRoles = require("../enums/userRoles");

router.get("/", (req, res) => {
    res.sendStatus(200);
});

router.post("/signin", async (req, res, next) => {
    try {
        const user = await Signin(req.body.email, req.body.password);
        res.status(200).json(user);
    } catch (error) {
        console.log("user sign in failed", req.body, error);
        res.status(401);
        next(error);
    }
});

router.post("/backoffice/signup", async (req, res, next) => {
    try {
        const response = await CreateUserAccount(req.body.email, userRoles.BACKOFFICEUSER);
        console.log("res", response);

        if (response.isError) {
            console.log("backoffice user sign up failed", req.body, response.msg);
            const error = new Error(response.msg);
            res.status(409);
            return next(error);
        }
        await CreateBackofficeUser(req.body, response.data);
        res.sendStatus(201);
    } catch (error) {
        console.log("backoffice user sign up failed", req.body, error);
        res.status(400);
        next(error);
    }
});

router.post("/travelagent/signup", async (req, res, next) => {
    try {
        const createUserResponse = await CreateUserAccount(req.body.email, userRoles.TRAVELAGENT);

        if (createUserResponse.isError) {
            console.log("travel agent user sign up failed", req.body, createUserResponse.msg);
            const error = new Error(createUserResponse.msg);
            res.status(409);
            return next(error);
        }
        await CreateTravelAgenteUser(req.body, createUserResponse.data);
        res.sendStatus(201);
    } catch (error) {
        console.log("travel agent user sign up failed", req.body, error);
        res.status(400);
        next(error);
    }
});

module.exports = router;
