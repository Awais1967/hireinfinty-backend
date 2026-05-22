const { Schema, model, models } = require("mongoose");

const engineerSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    background: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    monthlyRate: Number,
    hourlyRate: Number,
    availabilityStatus: {
      type: String,
      enum: ["AVAILABLE", "LIMITED", "UNAVAILABLE"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true },
);

module.exports = models.Engineer || model("Engineer", engineerSchema);
