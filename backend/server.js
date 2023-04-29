const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authController = require("./controllers/authController");
const { verifyTokenAndSetUser, isLoggedIn } = require("./middlewares/authenticationMiddleware");
const {errorHandlers, notFound} = require("./middlewares/commonMiddleware");
const userRoles = require('./enums/userRoles')

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use(verifyTokenAndSetUser);

app.get("/", (req, res, next) => {
    console.log("Cookies: ", req.cookies.token);

    res.sendStatus(200);
});

app.get("/protected", isLoggedIn(userRoles.BACKOFFICEUSER), (req, res, next) => {
    res.status(201).json(req.user);
});

app.use("/auth", authController);

app.use(notFound);
app.use(errorHandlers);

mongoose
    .connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("connected to db");
        app.listen(port, async () => {
            console.log(`server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log("not connected to db", error);
    });
