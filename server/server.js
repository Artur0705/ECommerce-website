const express = require("express");
const db = require("./config/connection.js");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const prodCategoryRouter = require("./routes/prodCategoryRoute");
const blogCategoryRouter = require("./routes/blogCategoryRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", prodCategoryRouter);
app.use("/api/blog-category", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);

app.use(notFound);
app.use(errorHandler);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
  });
});
