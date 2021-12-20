const express = require("express");
const router = express.Router();
var cron = require("node-cron");
const { InvoiceController } = require("../controllers");

router.get("/getAddInvoices", (req, res) => {
  InvoiceController.getNavInvoices((err, invoices) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(invoices);
    }
  });
});
router.get("/getAddLines", (req, res) => {
  InvoiceController.getNavSaleLines((err, invoices) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(invoices);
    }
  });
});

//cron to fetch invoices every 1 hour
var getInvoicesCron = cron.schedule("0 * * * *", () => {
  InvoiceController.getNavInvoices((err, invoices) => {
    if (err) {
      console.log("invoice error ",err);
    } else {
      console.log("sales invoices today ",invoices);
    }
  });
});
getInvoicesCron.start();

module.exports = router;
