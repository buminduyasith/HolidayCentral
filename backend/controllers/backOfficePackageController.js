const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { GetAllPackages, GetPackageById, DeletePackageById, UpdatePackageById, InsertPackageDetails } = require("../services/backofficePackageService")

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
        var data = await InsertPackageDetails(filePath);
        res.sendStatus(201);
    } catch (error) {
        console.log("packages details save failed", error)
        res.status(400)
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {

        var packages = await GetAllPackages()
        if(!packages){
            res.status(404).json({ message: 'packages not found' });
            return;
        }
        res.status(200).json(packages);
     
    } catch (error) {
        console.log("packages details get failed", error)
        res.status(400)
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {

        if(!req.params.id){
            throw new Error("query string should include id")
        }
        var package = await GetPackageById(req.params.id)
        if(!package){
            res.status(404).json({ message: 'package not found' });
            return;
        }
        res.status(200).json(package);
     
    } catch (error) {
        console.log("package details get failed", error)
        res.status(400)
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {

        if(!req.params.id){
            throw new Error("query string should include id")
        }
        var package = await DeletePackageById(req.params.id)
        if(!package){
            res.status(404).json({ message: 'package not found' });
            return;
        }
        res.sendStatus(200);
     
    } catch (error) {
        console.log("package delete by id failed", error)
        res.sendStatus(400)
    }
});

router.put("/:id", async (req, res, next) => {
    try {

        if(!req.params.id){
            throw new Error("query string should include id")
        }

        var package = await UpdatePackageById(req.params.id, req.body)
        console.log(package)
        if(!package){
            res.status(404).json({ message: 'package not found' });
            return;
        }
        res.sendStatus(200);
     
    } catch (error) {
        console.log("package detail update by id failed", error)
        res.sendStatus(400)
    }
});

module.exports = router;
