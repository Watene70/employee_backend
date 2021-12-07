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
router.get("/getCustomerSector", (req, res) => {
  InvoiceController.getSplynxCustomerSector((err, invoices) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(invoices);
    }
  });
});
router.get("/getAllCustomer", (req, res) => {
  InvoiceController.getSplynxCustomers((err, custs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(custs);
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
router.get("/getSectors", (req, res) => {
  InvoiceController.getSplynxSectors((err, sectors) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(sectors);
    }
  });
});
module.exports = router;
