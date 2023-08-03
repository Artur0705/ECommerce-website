const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./config/connection.js");
const app = express();
app.timeout = 300000; // 5 minutes

require("dotenv").config();
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const prodCategoryRouter = require("./routes/prodCategoryRoute");
const blogCategoryRouter = require("./routes/blogCategoryRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const couponRouter = require("./routes/couponRoute");
const enquiryRouter = require("./routes/enquiryRoute");
const uploadRouter = require("./routes/uploadRoute");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors());
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
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enquiryRouter);
app.use("/api/upload", uploadRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.use(express.static(path.join(__dirname, "../admin/build")));

  app.get("/admin", (req, res) => {
    console.log("Admin route accessed");
    res.sendFile(path.join(`${__dirname}/../admin/build/index.html`));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
  });

  const publicDir = path.join(__dirname, "public");
  const imagesDir = path.join(publicDir, "images");
  const blogsDir = path.join(imagesDir, "blogs");
  const productsDir = path.join(imagesDir, "products");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  if (!fs.existsSync(blogsDir)) {
    fs.mkdirSync(blogsDir);
  }

  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir);
  }
}

app.use(notFound);
app.use(errorHandler);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on PORT:${PORT}`);
  });
});
