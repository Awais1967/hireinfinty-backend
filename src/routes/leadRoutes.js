const express = require("express");

const leadController = require("../controllers/leadController");
const { requireAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", leadController.createLead);
router.get("/", requireAdmin, leadController.listLeads);
router.get("/:id", requireAdmin, leadController.getLead);
router.patch("/:id/status", requireAdmin, leadController.updateStatus);

module.exports = router;
