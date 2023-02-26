const express = require("express");
const {
  createBlog,
  updateBlog,
  geteBlog,
} = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", geteBlog);

module.exports = router;
