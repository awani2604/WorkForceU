import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    professional: { type: mongoose.Schema.Types.ObjectId, ref: "Professional", required: true },
    trade: { type: String, required: true }, // e.g. "Electrician"
    status: {
      type: String,
      enum: ["Pending", "Accepted", "In Progress", "Completed", "Cancelled"],
      default: "Pending"
    },
    scheduledDate: { type: Date },
    rating: { type: Number, min: 1, max: 5, default: null },
    review: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);