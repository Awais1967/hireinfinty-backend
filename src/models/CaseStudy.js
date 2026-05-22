const { Schema, model, models } = require("mongoose");

const caseStudySchema = new Schema(
  {
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    client: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    metric: {
      type: String,
      trim: true,
    },
    quote: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = models.CaseStudy || model("CaseStudy", caseStudySchema);
