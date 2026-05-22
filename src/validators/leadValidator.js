const { z } = require("zod");

const createLeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(160).optional().nullable(),
  phone: z.string().trim().max(40).optional().nullable(),
  roleNeeded: z.string().trim().max(160).optional().nullable(),
  budget: z.string().trim().max(120).optional().nullable(),
  timeline: z.string().trim().max(120).optional().nullable(),
  message: z.string().trim().max(5000).optional().nullable(),
});

const updateLeadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "LOST"]),
});

module.exports = {
  createLeadSchema,
  updateLeadStatusSchema,
};
