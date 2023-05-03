const hotelModel = require("../models/HotelModel");

async function GetAllHotels() {
    const hotels = await hotelModel.find({});
    return hotels;
}

async function GetHotelById(id) {
    const hotel = await hotelModel.findById(id);
    return hotel;
}

async function DeleteHotelById(id) {
    const deletedHotel = await hotelModel.findByIdAndDelete(id);
    return deletedHotel;
}

async function UpdateHotelById(id, data) {
    const updatedHotel = await hotelModel.findByIdAndUpdate(id, data, {
        new: true, // return the updated document
    });
    return updatedHotel;
}

async function InsertHotelDetails(csvPath) {
    console.log("csvPath", csvPath);
    const hotelRecords = await new Promise((resolve, reject) => {
        const parser = parse({ columns: true }, (err, records) => {
            if (err) {
                reject(err);
            } else {
                resolve(records);
            }
        });
        fs.createReadStream(csvPath).pipe(parser);
    });

    const hotelModels = hotelRecords.map((hotelRecord) => new hotelModel(hotelRecord));
    const results = await hotelModel.insertMany(hotelModels);

    console.log("hotels detail results", results);
    return results;
}

module.exports = {
    GetAllHotels,
    GetHotelById,
    DeleteHotelById,
    UpdateHotelById,
    InsertHotelDetails
};
