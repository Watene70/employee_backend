// Importing packages
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

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

// Initialize passport for authenticated routes
app.use(passport.initialize());
require("./passport")(passport);

// Import routes
const { assesment, topics, users, questions } = require("./routes");

// Initialize routes

app.use("/assesment", assesment);
app.use("/topics", topics);
app.use("/users", users);
app.use("/questions", questions);

module.exports = app;
