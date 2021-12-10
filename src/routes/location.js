const express = require("express");
const router = express.Router();
const { LocationController } = require("../controllers");

router.get("/getLocations", (req, res) => {
  LocationController.getSplynxLocation((err, locations) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(locations);
    }
  });
});

module.exports = router;
