const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controller/user");
const { authMiddlware } = require("../middleware/authMiddlware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUser);
router.get("/:id", authMiddlware, getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
