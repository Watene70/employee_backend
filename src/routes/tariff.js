const express = require("express");
const router = express.Router();
var cron = require("node-cron");
const { tariffController } = require("../controllers");

router.get("/getTariffs", (req, res) => {
  tariffController.getTariffInternet((err, sectors) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(sectors);
    }
  });
});

// Tarrif cron update
var getTariffCron = cron.schedule("0 1 * * *", () => {
  tariffController.getTariffInternet((err, sectors) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(sectors);
    }
  });
});
getTariffCron.start(); 

module.exports = router;
