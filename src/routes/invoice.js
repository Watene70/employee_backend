const express = require("express");
const router = express.Router();
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
router.get("/getCustomers", (req, res) => {
  InvoiceController.getSplynxCustomers((err, invoices) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(invoices);
    }
  });
});
router.get("/getTickets", (req, res) => {
  InvoiceController.getSplynxTickets((err, invoices) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(invoices);
    }
  });
});
module.exports = router;
