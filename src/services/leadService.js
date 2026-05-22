const Booking = require("../models/Booking");
const Lead = require("../models/Lead");
const { sendEmail } = require("../utils/email");

const createLead = async (input) => {
  const lead = await Lead.create(input);

  await Promise.allSettled([
    sendEmail({
      to: lead.email,
      subject: "We received your HireInfinity request",
      text: `Hi ${lead.name},\n\nThanks for reaching out to HireInfinity. Our team will review your request and get back to you shortly.\n\n-HireInfinity`,
    }),
    sendEmail({
      to: process.env.HIREINFINITY_TEAM_EMAIL,
      subject: `New HireInfinity lead: ${lead.name}`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Company: ${lead.company || "-"}`,
        `Phone: ${lead.phone || "-"}`,
        `Role needed: ${lead.roleNeeded || "-"}`,
        `Budget: ${lead.budget || "-"}`,
        `Timeline: ${lead.timeline || "-"}`,
        "",
        lead.message || "",
      ].join("\n"),
    }),
  ]);

  return lead;
};

const listLeads = () =>
  Lead.find().sort({ createdAt: -1 }).lean();

const getLeadById = async (id) => {
  const [lead, bookings] = await Promise.all([
    Lead.findById(id).lean(),
    Booking.find({ lead: id }).sort({ date: 1, timeSlot: 1 }).lean(),
  ]);

  if (!lead) {
    return null;
  }

  return {
    ...lead,
    bookings,
  };
};

const updateLeadStatus = (id, status) =>
  Lead.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).lean();

module.exports = {
  createLead,
  getLeadById,
  listLeads,
  updateLeadStatus,
};
