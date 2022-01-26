const express = require("express");
const router = express.Router();
const { assesmentController } = require("../controllers");

router.get("/getAllAssesment", (req, res) => {
  assesmentController.getAssesment((err, test) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(test);
    }
  });
});
router.post("/postAssesment", (req, res) => {
  assesmentController.postAssesment((err, test) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(test);
    }
  });
});
module.exports = router;
