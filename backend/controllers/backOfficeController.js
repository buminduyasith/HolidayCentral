const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const userRoles = require("../enums/userRoles");
const { InsertFlightDetails } = require("../services/backofficeuserService");

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

router.post("/flights", upload.single("file"), async (req, res, next) => {
    try {
        //const csvPath = req.file.path
        const filePath = path.join(process.cwd(), req.file.path);
        console.log("csvPath", filePath);
        await InsertFlightDetails(filePath);
        res.send(filePath);
    } catch (error) {
        console.log("flights details save", error)
        res.status(400)
        next(error);
    }
});

module.exports = router;
