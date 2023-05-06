const express = require("express");
const router = express.Router();
const cors = require("cors");
const { getallPackages, getSearchallpackages, createPackageCheckoutRecord } = 
 require('../services/packageService')

 router.use(cors());

router.get("/allPackages",async (req, res, next) => {
    try {
        const response = await getallPackages();
        console.log("res", response);
        res.send(response).status(200);
    } catch (error) {
        res.status(500);
        next(error);
    }
});

router.get("/searchPackages", async (req, res, next) => {
    try {
        const response = await getSearchallpackages(req)
        console.log("res", response);
        res.send(response).status(200);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        next(error);
    }
});

router.post("/checkoutPackage", async (req, res, next) => {
    try {
        const response = await createPackageCheckoutRecord(req)
        console.log("res", response);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        next(error);
    }
});

module.exports = router;