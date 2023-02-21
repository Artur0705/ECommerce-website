const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const router = express.Router();

router.post("/", createProduct);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getAllProducts);

module.exports = router;
