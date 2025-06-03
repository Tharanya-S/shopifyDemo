const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp } = require("../controllers/authController");
const { userAuth } = require("../middlewares/authMiddleware")

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/check-auth", userAuth, (req, res) => {
  res.json({ email: req.user.email });
});

module.exports = router;
