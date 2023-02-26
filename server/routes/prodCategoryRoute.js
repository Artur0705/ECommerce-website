const express = require("express");
const {
  createCategory,
  updateCategory,
} = require("../controller/prodCategoryController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);

module.exports = router;
