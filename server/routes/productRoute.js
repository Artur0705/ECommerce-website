const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
} = require("../controller/productController");
const router = express.Router();

router.post("/", createProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);

module.exports = router;
