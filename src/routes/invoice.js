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
router.get("/getAddCustomer", (req, res) => {
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
router.get("/getSectors", (req, res) => {
  InvoiceController.getSplynxSectors((err, sectors) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(sectors);
    }
  });
});
router.get("/updateRouter", (req, res) => {
  InvoiceController.getCustomers((err, cust) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (cust.length > 0) {
        InvoiceController.updateInternetServices(cust, (err, updated) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json(updated);
          }
        });
      } else {
        res.status(200).json("no records to process");
      }
    }
  });
});
var Updateservices = cron.schedule("*/10 * * * * *", () => {
  InvoiceController.getCustomers((err, cust) => {
    if (err) {
      console.log(err);
    } else {
      if (cust.length > 0) {
        InvoiceController.updateInternetServices(cust, (err, updated) => {
          if (err) {
            console.log(err);
          } else {
            console.log(updated);
          }
        });
      } else {
        console.log("no records to process");
      }
    }
  });
});
Updateservices.start();
module.exports = router;
