const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const authController = require("./controllers/authController");
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

function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
  }

function errorHandlers(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: process.env.ERRORSTACK === "true" ? err.stack : "",
    });
}

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
