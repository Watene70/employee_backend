const express = require("express");
const router = express.Router();
var cron = require("node-cron");
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

var getLocationsCron = cron.schedule("0 1 * * *", () => {
  LocationController.getSplynxLocation((err, locations) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(locations);
    }
  });
});
getLocationsCron.start(); //getNavSaleLines

module.exports = router;
