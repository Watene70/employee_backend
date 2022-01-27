const express = require("express");
const router = express.Router();
const { questionsController } = require("../controllers");

router.get("/getAllQuestions", (req, res) => {
  questionsController.getQuestions((err, questions) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(questions);
    }
  });
});

module.exports = router;
