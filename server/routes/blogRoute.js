const express = require("express");
const {
  createBlog,
  updateBlog,
  geteBlog,
  getAllBlogs,
} = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", geteBlog);
router.get("/", getAllBlogs);

module.exports = router;
