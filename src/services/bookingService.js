const Booking = require("../models/Booking");

const normalizeDate = (date) => new Date(`${date}T00:00:00.000Z`);

const createBooking = (input) =>
  Booking.create({
    lead: input.leadId || null,
    date: normalizeDate(input.date),
    timeSlot: input.timeSlot,
    timezone: input.timezone,
  });

const listBookings = () =>
  Booking.find().sort({ date: 1, timeSlot: 1 }).populate("lead").lean();

module.exports = {
  createBooking,
  listBookings,
};
