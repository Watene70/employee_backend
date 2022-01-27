const express = require("express");
const router = express.Router();
const { topicsController } = require("../controllers");

router.get("/getAllTopics", (req, res) => {
  topicsController.getPolicies((err, policies) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(policies);
    }
  });
});

module.exports = router;
