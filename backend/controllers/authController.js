const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("done");
  res.json({
    message: "auth",
  });
});

router.post("/", (req, res) => {
  // Add code to handle POST requests here

  var s = req;
});

module.exports = router;
