const express = require("express");
const router = express.Router();
const { passwordController } = require("../controllers");

router.get("/changePassword", (req, res) => {
  passwordController.updatePassword((err, sectors) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(sectors);
    }
  });
});

module.exports = router;
