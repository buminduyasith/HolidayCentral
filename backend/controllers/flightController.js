const express = require("express");
const router = express.Router();
const multer = require("multer"); // can handle multipart/form-data
const { setFlightData } = require("../services/flightService")
const storage = multer.diskStorage({ // Save the file with the extention
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        let customFileName = "flightData",
            fileExtension = file.originalname.split('.')[1]
        cb(null, customFileName + '.' + fileExtension)
    }
})
const upload = multer({ storage: storage });



router.post("/upload_flight_Data", upload.single("file"), setFlightData);

router.get("/allflights", (req, res) => {
    res.send("flight Connected").sendStatus(201);
});

router.get("/getflights", (req, res) => {
    res.sendStatus(200);
});

module.exports = router;