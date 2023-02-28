const express = require("express");
const router = express.Router();

const { createCoupon } = require("../controller/couponController");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, isAdmin, createCoupon);

module.exports = router;
