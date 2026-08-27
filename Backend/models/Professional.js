import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    mobileVerified: {
      type: Boolean,
      default: false
    },
    profileCompleted: {
      type: Boolean,
      default: false
    },
    trade: {
      type: String,
      trim: true,
      default: ""
    },
    skillLevel: {
      type: Number,
      min: 0,
      max: 6,
      default: 0
    },
    experienceYears: {
      type: Number,
      min: 0,
      default: 0
    },
    address: {
      type: String,
      trim: true,
      default: ""
    },
    city: {
      type: String,
      trim: true,
      default: ""
    },
    state: {
      type: String,
      trim: true,
      default: ""
    },
    pincode: {
      type: String,
      trim: true,
      default: ""
    },
    avatarUrl: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Professional", professionalSchema);
