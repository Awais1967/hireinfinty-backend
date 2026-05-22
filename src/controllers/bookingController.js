const bookingService = require("../services/bookingService");
const { createBookingSchema } = require("../validators/bookingValidator");

const createBooking = async (req, res, next) => {
  try {
    const payload = createBookingSchema.parse(req.body);
    const booking = await bookingService.createBooking(payload);
    res.status(201).json({ data: booking });
  } catch (error) {
    next(error);
  }
};

const listBookings = async (_req, res, next) => {
  try {
    const bookings = await bookingService.listBookings();
    res.json({ data: bookings });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  listBookings,
};
