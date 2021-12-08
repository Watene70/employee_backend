const express = require("express");
const router = express.Router();
var cron = require("node-cron");
const { InvoiceController } = require("../controllers");

router.get("/", (req, res) => {
  InvoiceController.getNavInvoices((err, invoices) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(invoices);
    }
  });
});

module.exports = router;
