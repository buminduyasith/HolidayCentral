const express = require("express");
const router = express.Router();
const { CreateBackofficeUser } = require("../services/backofficeuserService");
const { CreateUserAccount, Signin, GetUserByEmail, GenerateResetPasswordOneTimeLink, ResetPassword } = require("../services/userBaseService");
const { CreateTravelAgenteUser} = require("../services/travelAgentUserService");
const userRoles = require("../enums/userRoles");
const { ResetPasswordEmail } = require("../services/emailService");
const boSignupSchema = require("../schemas/boSignupSchema");
const taSignupSchema = require("../schemas/travelAdgentSignupSchema");
const userSigninSchema = require("../schemas/userSigninSchema");

router.get("/", (req, res) => {
    res.sendStatus(200);
});

router.post("/signin", async (req, res, next) => {
    try {
        
        console.log("signin request", req.body)
        const validationResult = await userSigninSchema.validateAsync( req.body);
        console.log("user signin validation Result", validationResult)

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


        const validationResult = await boSignupSchema.validateAsync( req.body);
        console.log("bo signup validation Result", validationResult)

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

        const validationResult = await taSignupSchema.validateAsync( req.body);
        console.log("travelagent signup validation Result", validationResult)

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

router.post("/password_reset", async (req, res, next) => {
    try {
        console.log("password_reset", req.body)

        const user = await GetUserByEmail(req.body.email)

        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        const oneTimeLink = await GenerateResetPasswordOneTimeLink("http://localhost:3000/",user)
        console.log("oneTimeLink", oneTimeLink)
        const emailStatus = await ResetPasswordEmail(user.email, oneTimeLink)

        res.sendStatus(200)
        
    } catch (error) {
        console.log("user sign in failed", req.body, error);
        res.status(401);
        next(error);
    }
});


router.post("/password_reset/:token", async (req, res, next) => {
    try {

        const token = req.params.token

        if(!token){
            console.log("token not found")
            return res.sendStatus(400)
        }

        await ResetPassword(token, req.body.email, req.body.password)

        res.sendStatus(200)
        
    } catch (error) {
        console.log("user sign in failed", req.body, error);
        res.status(400);
        next(error);
    }
});


module.exports = router;
