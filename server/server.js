const express = require("express");
const db = require("./config/connection.js");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoute");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  });
});
