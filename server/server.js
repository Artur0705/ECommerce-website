const express = require("express");
const db = require("./config/connection.js");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.use("/", (req, res) => {
  res.send("Test from server side");
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  });
});
