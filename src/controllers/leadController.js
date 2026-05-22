const leadService = require("../services/leadService");
const { AppError } = require("../middlewares/errorMiddleware");
const { createLeadSchema, updateLeadStatusSchema } = require("../validators/leadValidator");

const createLead = async (req, res, next) => {
  try {
    const payload = createLeadSchema.parse(req.body);
    const lead = await leadService.createLead(payload);
    res.status(201).json({ data: lead });
  } catch (error) {
    next(error);
  }
};

const listLeads = async (_req, res, next) => {
  try {
    const leads = await leadService.listLeads();
    res.json({ data: leads });
  } catch (error) {
    next(error);
  }
};

const getLead = async (req, res, next) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);

    if (!lead) {
      throw new AppError("Lead not found", 404);
    }

    res.json({ data: lead });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = updateLeadStatusSchema.parse(req.body);
    const lead = await leadService.updateLeadStatus(req.params.id, status);

    if (!lead) {
      throw new AppError("Lead not found", 404);
    }

    res.json({ data: lead });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getLead,
  listLeads,
  updateStatus,
};
