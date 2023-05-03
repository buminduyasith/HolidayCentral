const express = require("express");
const router = express.Router();
const { getallPackages, getSearchallpackages } = 
 require('../services/packageService')

 router.use(cors());

router.get("/allPackages",async (req, res, next) => {
    try {
        const response = await getallPackages();
        console.log("res", response);
        res.send(response).Status(200);
    } catch (error) {
        res.status(500);
        next(error);
    }
});

router.get("/searchpackages", async (req, res, next) => {
    try {
        const response = await getSearchallpackages(req)
        console.log("res", response);
        res.send(response).status(200);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        next(error);
    }
});


module.exports = router;