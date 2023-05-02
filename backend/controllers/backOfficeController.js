const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const userRoles = require("../enums/userRoles");
const { InsertFlightDetails } = require("../services/backofficeuserService");
const { GetAllFlights, GetFlightById, DeleteFlightById, UpdateFlightById } = require("../services/backofficeService")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Change the upload directory as needed
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
        cb(null, fileName + fileExt);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes("csv")) {
            cb(null, true);
        } else {
           // cb(new Error("Only CSV files are allowed."));
            const error = new Error('Only CSV files are allowed.');
            error.status = 400;
            cb(error);
        }
    },
});

router.get("/", (req, res) => {
    res.send("admin bo");
});

router.post("/product/flights", upload.single("file"), async (req, res, next) => {
    try {
        //const csvPath = req.file.path
        const filePath = path.join(process.cwd(), req.file.path);
        console.log("csvPath", filePath);
        var data = await InsertFlightDetails(filePath);
        res.sendStatus(201);
    } catch (error) {
        console.log("flights details save failed", error)
        res.status(400)
        next(error);
    }
});

router.get("/product/flights", async (req, res, next) => {
    try {

        var flights = await GetAllFlights()
        if(!flights){
            res.status(404).json({ message: 'Flights not found' });
            return;
        }
        res.status(200).json(flights);
     
    } catch (error) {
        console.log("flights details get failed", error)
        res.status(400)
        next(error);
    }
});

router.get("/product/flights/:id", async (req, res, next) => {
    try {

        if(!req.params.id){
            throw new Error("query string should include id")
        }
        var flight = await GetFlightById(req.params.id)
        if(!flight){
            res.status(404).json({ message: 'Flight not found' });
            return;
        }
        res.status(200).json(flight);
     
    } catch (error) {
        console.log("flights details get failed", error)
        res.status(400)
        next(error);
    }
});

router.delete("/product/flights/:id", async (req, res, next) => {
    try {

        if(!req.params.id){
            throw new Error("query string should include id")
        }
        var flight = await DeleteFlightById(req.params.id)
        if(!flight){
            res.status(404).json({ message: 'Flight not found' });
            return;
        }
        res.sendStatus(200);
     
    } catch (error) {
        console.log("flight delete by id failed", error)
        res.sendStatus(400)
    }
});

router.put("/product/flights/:id", async (req, res, next) => {
    try {

        if(!req.params.id){
            throw new Error("query string should include id")
        }

        var flight = await UpdateFlightById(req.params.id, req.body)
        console.log(flight)
        if(!flight){
            res.status(404).json({ message: 'Flight not found' });
            return;
        }
        res.sendStatus(200);
     
    } catch (error) {
        console.log("flight detail update by id failed", error)
        res.sendStatus(400)
    }
});

module.exports = router;
