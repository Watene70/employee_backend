const express = require("express");
const router = express.Router();
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

module.exports = router;
