const express = require("express");
const router = express.Router();
var cron = require("node-cron");
const { TicketController } = require("../controllers");

router.get("/getTickets", (req, res) => {
  TicketController.getSplynxTickets((err, invoices) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(invoices);
    }
  });
});

module.exports = router;
