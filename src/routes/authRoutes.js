const express = require("express");

const authController = require("../controllers/authController");
const { requireAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", requireAdmin, authController.me);

module.exports = router;
