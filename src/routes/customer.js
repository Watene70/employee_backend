const express = require("express");
const router = express.Router();
var cron = require("node-cron");
const { CustomerController } = require("../controllers");

router.get("/getAddCustomer", (req, res) => {
  CustomerController.getSplynxCustomers((err, invoices) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(invoices);
    }
  });
});

router.get("/updateCustomerRouter", (req, res) => {
  CustomerController.getCustomers((err, cust) => {
    if (err) {
      res.status(400).json(err);
      console.log("me")
    } else {
      if (cust.length > 0) {
        CustomerController.updateInternetServices(cust, (err, updated) => {
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
var Updateservices = cron.schedule("*/30 * * * * *", () => {
  CustomerController.getCustomers((err, cust) => {
    if (err) {
      console.log(err);
    } else {
      if (cust.length > 0) {
        CustomerController.updateInternetServices(cust, (err, updated) => {
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
// var AddCustomer = cron.schedule("*/5 * * * * ", () => {
//   CustomerController.getSplynxCustomers((err, invoices) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(invoices);
//     }
//   });
// });
// AddCustomer.start();
module.exports = router;
