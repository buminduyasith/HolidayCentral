const express = require("express")
const router = express.Router();
const {createHotel, getAllHotels, getSearchAllHotels, createHotelCheckoutRecord} = require("../services/hotelService")


//CREATE HOTEL
router.post("/createhotel",async (req,res)=>{
    try {
        const response = await createHotel(req)
        console.log("res", response);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        next(error);
    }
})

//GET ALL HOTELS
router.get("/allhotels", async (req, res, next) => {
    try {
        const response = await getAllHotels();
        console.log("res", response);
        res.send(response).status(200);
    } catch (error) {
        res.status(500);
        next(error);
    }
});

//GET SEARCH HOTELS
router.get("/searchhotels", async (req, res, next) => {
    try {
        const response = await getSearchAllHotels(req)
        console.log("res", response);
        res.send(response).status(200);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        next(error);
    }
});

//BOOKING HOTEL
router.post("/checkout", async (req, res, next) => {
    try {
        const response = await createHotelCheckoutRecord(req)
        console.log("res", response);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        next(error);
    }
});

module.exports = router;