const { Schema, model, models } = require("mongoose");

const bookingSchema = new Schema(
  {
    lead: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      default: null,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
      trim: true,
    },
    timezone: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

bookingSchema.index({ date: 1, timeSlot: 1, timezone: 1 }, { unique: true });

module.exports = models.Booking || model("Booking", bookingSchema);
