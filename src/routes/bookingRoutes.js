const express = require("express");

const bookingController = require("../controllers/bookingController");
const { requireAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", bookingController.createBooking);
router.get("/", requireAdmin, bookingController.listBookings);

module.exports = router;
