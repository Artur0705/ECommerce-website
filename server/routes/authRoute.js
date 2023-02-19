const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controller/user");
const { authMiddlware, isAdmin } = require("../middleware/authMiddlware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUser);
router.get("/:id", authMiddlware, isAdmin, getUser);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddlware, updateUser);

module.exports = router;
