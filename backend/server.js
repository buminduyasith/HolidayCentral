const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const flightController = require("./controllers/flightController");
const mongoose = require("mongoose");
const cors = require('cors');
const authController = require("./controllers/authController");
const backOfficeFlightController = require("./controllers/backOfficeFlightController");
const backOfficeHotelController = require("./controllers/backOfficeHotelController");
const backOfficePackageController = require("./controllers/backOfficePackageController");
const { verifyTokenAndSetUser, isLoggedIn } = require("./middlewares/authenticationMiddleware");
const { errorHandlers, notFound } = require("./middlewares/commonMiddleware");
const userRoles = require('./enums/userRoles')
const hotelController = require('./controllers/hotelController.js');
const {swaggerOptions} = require("./utils/swagger");
const swaggerJsdoc  = require('swagger-jsdoc')
const swaggerUi  = require('swagger-ui-express')


const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

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
app.use("/flights", flightController);
app.use('/hotels', require('./controllers/hotelController.js'));

app.use('/api/v1/backoffice/product/flights',isLoggedIn(userRoles.BACKOFFICEUSER), backOfficeFlightController);
app.use('/api/v1/backoffice/product/hotels',isLoggedIn(userRoles.BACKOFFICEUSER), backOfficeHotelController);
app.use('/api/v1/backoffice/product/packages',isLoggedIn(userRoles.BACKOFFICEUSER), backOfficePackageController); 

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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


app.listen(5500)