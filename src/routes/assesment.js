const express = require("express");
const router = express.Router();
const { assesmentController } = require("../controllers");

router.get("/getAllAssesment", (req, res) => {
  assesmentController.getUserAssesment((err, test) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(test);
    }
  });
});
// router.post("/postAssesment", (req, res) => {
//   assesmentController.postAssesment((err, test) => {
//     if (err) {
//       res.status(400).json(err);
//     } else {
//       res.status(200).json(test);
//     }
//   });
// });
router.post(
  "/postAssesment",

  (req, res) => {
    console.log(req.body)
    assesmentController.postAssesment(req.body, (err, assesments) => {
      if (err) {
        console.log(err)
        res.status(400).json(err);
      } else {
        res.status(200).json(assesments);
      }
    });
  }
);
router.get(
  "/assessmentResult/:id",
  (req, res) => {
    const userId = req.params.id;
    assesmentController.getLatestResult(userId, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }
);
router.get(
  "/failedTopics/:id",
  (req, res) => {
    const userId = req.params.id;
    assesmentController.getFailedTopics(userId, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }
);
module.exports = router;
