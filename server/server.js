const express = require("express");
const db = require("./config/connection.js");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoute");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", authRouter);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  });
});
