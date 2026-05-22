const { Schema, model, models } = require("mongoose");

const pricingPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    term: {
      type: String,
      trim: true,
    },
    monthly: Number,
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = models.PricingPlan || model("PricingPlan", pricingPlanSchema);
