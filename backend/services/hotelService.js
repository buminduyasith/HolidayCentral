const hotelModel = require('../models/HotelModel')
const HotelCheckoutModel = require('../models/HotelCheckOutModel')

//CREATE HOTEL
async function createHotel(req) {
    let results;
    console.log("req--->", req)
    try {
        const newhotel = new hotelModel({
                name: req.body.name,
                type: req.body.type,
                city: req.body.city,
                address: req.body.address,
                title: req.body.title,
                desc: req.body.desc,
                rating: req.body.rating,
                rooms: req.body.rooms,
                price: req.body.price,
                checkInDate: req.body.checkInDate,
                checkOutDate: req.body.checkOutDate,
        });

        const result = await newhotel.save();
        results = result
        console.log("New hotel record created:", result);

    } catch (err) {
        console.error("Error creating hotel record:", err);
        return err;
    }

    return results
}

//GET ALL HOTELS
async function getAllHotels() {
    let results;

    await hotelModel.find({})
        .then((docs) => {
            console.log("docs-->", docs);
            results = docs
        })
        .catch((error) => {
            console.error(error);
            return error;
        });

    return results

}

//GET SEARCH HOTELS
async function getSearchAllHotels(req) {
    let results;
    const searchCriteria = {};

    const queryFields = ['city', 'checkInDate', 'checkOutDate', 'rating', 'price', 'facilities'];
    for (const field of queryFields) {
        if (req.query[field]) {
            if (field === 'departureDate' || field === 'landingDate') {
                searchCriteria[field] = new Date(req.query[field]);
            } else {
                searchCriteria[field] = req.query[field];
            }
        }
    }

    await hotelModel.find(searchCriteria)
        .then((hotels) => {
            console.log(`${hotels.length} hotels found matching the search criteria:`);
            console.log(hotels);
            results = hotels
        })
        .catch((error) => {
            console.error(`Error while searching for hotels: ${error.message}`);
            return error;
        });

    return results

}

//BOOKING HOTEL
async function createHotelCheckoutRecord(req) {
    let results;
    console.log("req--->", req)
    try {
        const newFlightCheckout = new HotelCheckoutModel({
            name: req.body.name,
            type: req.body.type,
            city: req.body.city,
            address: req.body.address,
            title: req.body.title,
            rooms: req.body.rooms,
            price: req.body.price,
            checkInDate: req.body.checkInDate,
            checkOutDate: req.body.checkOutDate,
            featured: req.body.featured,
            agentname: req.body.agentname,
            email: req.body.email,
            zip: req.body.zip,
        });

        const result = await newFlightCheckout.save();
        results = result
        console.log("New booking checkout record created:", result);

    } catch (err) {
        console.error("Error creating booking checkout record:", err);
        return err;
    }

    return results
}

module.exports = {
    createHotel, 
    getAllHotels,
    getSearchAllHotels,
    createHotelCheckoutRecord,
};