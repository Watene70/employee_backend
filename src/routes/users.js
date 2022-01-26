const express = require("express");
const router = express.Router();
const { usersController } = require("../controllers");

router.get("/getAllUsers", (req, res) => {
  usersController.getUsers((err, personage) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(personage);
    }
  });
});
router.post("/login", (req, res) => {
  usersController.login(req.body, (err, admin) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.status(200).json(admin);
    }
  });
});

module.exports = router;
