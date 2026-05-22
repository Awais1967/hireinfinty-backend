const { z } = require("zod");

const objectId = /^[0-9a-fA-F]{24}$/;

const createBookingSchema = z.object({
  leadId: z.string().trim().regex(objectId, "Invalid lead id").optional().nullable(),
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  timeSlot: z.string().trim().min(1).max(80),
  timezone: z.string().trim().min(1).max(80),
});

module.exports = {
  createBookingSchema,
};
