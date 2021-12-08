// Importing packages
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Ensble CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, DELETE, PUT,PATCH"
  );
  next();
});
// Link body parser for url reading
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "10gb",
  })
);
app.use(
  bodyParser.json({
    limit: "10gb",
  })
);

// Import routes
const { invoice, sector, ticket, customer } = require("./routes");

// Initialize routes

app.use("/invoice", invoice);
app.use("/sector", sector);
app.use("/ticket", ticket);
app.use("/customer", customer);
module.exports = app;
