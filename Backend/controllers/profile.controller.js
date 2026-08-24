import Customer from "../models/Customer.js";
import Professional from "../models/Professional.js";

function getModel(role) {
  if (role === "customer") return Customer;
  if (role === "professional") return Professional;
  return null;
}

const allowedCustomerFields = [
  "name",
  "address",
  "city",
  "state",
  "pincode",
  "avatarUrl"
];

const allowedProfessionalFields = [
  "name",
  "trade",
  "skillLevel",
  "experienceYears",
  "address",
  "city",
  "state",
  "pincode",
  "avatarUrl"
];

export async function updateMyProfile(req, res) {
  try {
    const Model = getModel(req.auth.role);

    if (!Model) {
      return res.status(403).json({
        message: "This profile endpoint is only for customer/professional accounts"
      });
    }

    const allowed =
      req.auth.role === "customer"
        ? allowedCustomerFields
        : allowedProfessionalFields;

    const updates = {};

    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    updates.profileCompleted = true;

    const user = await Model.findByIdAndUpdate(
      req.auth.userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.json({
      message: "Profile updated",
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: req.auth.role,
        profileCompleted: user.profileCompleted,
        ...updates
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not update profile" });
  }
}

export async function getMyProfile(req, res) {
  try {
    const Model = getModel(req.auth.role);

    if (!Model) {
      return res.status(403).json({ message: "Unsupported profile role" });
    }

    const user = await Model.findById(req.auth.userId).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.json({
      user: {
        ...user.toObject(),
        role: req.auth.role
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not fetch profile" });
  }
}
