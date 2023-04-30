const express = require("express");
const dotenv = require("dotenv").config({ path: "./.env.prod" });
const cookieParser = require("cookie-parser");
const authController = require("./controllers/authController");
const flightController = require("./controllers/flightController")
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res, next) => {
    console.log("Cookies: ", req.cookies.token);
    res.sendStatus(200);
});

app.use("/auth", authController);
app.use("/flights", flightController);

function errorHandlers(err, req, res, next) {
    res.status(res.statusCode || 500);
    console.log("e", process.env.ERRORSTACK);
    res.json({
        message: err.message,
        stack: process.env.ERRORSTACK === "true" ? err.stack : "",
    });
}

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

app.listen(5500)