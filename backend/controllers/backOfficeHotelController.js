const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const userRoles = require("../enums/userRoles");

const { GetAllHotels, GetHotelById, DeleteHotelById, UpdateHotelById, InsertHotelDetails } = require("../services/backofficeHotelService")

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

router.post("/", upload.single("file"), async (req, res, next) => {
    try {
        //const csvPath = req.file.path
        const filePath = path.join(process.cwd(), req.file.path);
        console.log("csvPath", filePath);
        var data = await InsertHotelDetails(filePath);
        res.sendStatus(201);
    } catch (error) {
        console.log("hotels details save failed", error)
        res.status(400)
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {

        var hotels = await GetAllHotels()
        if(!hotels){
            res.status(404).json({ message: 'hotels not found' });
            return;
        }
        res.status(200).json(hotels);
     
    } catch (error) {
        console.log("hotels details get failed", error)
        res.status(400)
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {

        if(!req.params.id){
            throw new Error("query string should include id")
        }
        var hotel = await GetHotelById(req.params.id)
        if(!hotel){
            res.status(404).json({ message: 'hotels not found' });
            return;
        }
        res.status(200).json(hotel);
     
    } catch (error) {
        console.log("hotels details get failed", error)
        res.status(400)
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {

        if(!req.params.id){
            throw new Error("query string should include id")
        }
        var hotel = await DeleteHotelById(req.params.id)
        if(!hotel){
            res.status(404).json({ message: 'hotels not found' });
            return;
        }
        res.sendStatus(200);
     
    } catch (error) {
        console.log("hotels delete by id failed", error)
        res.sendStatus(400)
    }
});

router.put("/:id", async (req, res, next) => {
    try {

        if(!req.params.id){
            throw new Error("query string should include id")
        }

        var hotel = await UpdateHotelById(req.params.id, req.body)
        console.log(hotel)
        if(!hotel){
            res.status(404).json({ message: 'hotels not found' });
            return;
        }
        res.sendStatus(200);
     
    } catch (error) {
        console.log("hotels detail update by id failed", error)
        res.sendStatus(400)
    }
});

module.exports = router;
