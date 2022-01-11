const express = require("express");
const router = express.Router();
var cron = require("node-cron");
const { SectorController } = require("../controllers");

router.get("/getSectors", (req, res) => {
  SectorController.getSplynxSectors((err, sectors) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(sectors);
    }
  });
});

// Sector cron update
var getSectorCron = cron.schedule("0 1 * * *", () => {
  SectorController.getSplynxSectors((err, sectors) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(sectors);
    }
  });
});
getSectorCron.start(); //getNavSaleLines

module.exports = router;
