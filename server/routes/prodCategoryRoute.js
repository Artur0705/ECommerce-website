const express = require("express");
const { createCategory } = require("../controller/prodCategoryController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);

module.exports = router;
