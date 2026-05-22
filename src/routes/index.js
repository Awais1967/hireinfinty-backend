const express = require("express");

const authRoutes = require("./authRoutes");
const bookingRoutes = require("./bookingRoutes");
const leadRoutes = require("./leadRoutes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "hireinfinity-api",
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/bookings", bookingRoutes);
router.use("/leads", leadRoutes);

module.exports = router;
