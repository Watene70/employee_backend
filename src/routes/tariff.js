const express = require("express");
const router = express.Router();
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

module.exports = router;
