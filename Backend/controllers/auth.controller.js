import Customer from "../models/Customer.js";
import Professional from "../models/Professional.js";
import Admin from "../models/Admin.js";
import Otp from "../models/Otp.js";
import { generateOtp, hashOtp } from "../utils/otp.js";
import { normalizeIndianMobile } from "../utils/phone.js";
import { sendGeneratedOtpSms, startSmsVerification, checkSmsVerification } from "../services/sms.service.js";
import { createAccessToken } from "../services/token.service.js";

const OTP_EXPIRES_MINUTES = Number(process.env.OTP_EXPIRES_MINUTES || 5);
const OTP_MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS || 5);
const OTP_RESEND_SECONDS = Number(process.env.OTP_RESEND_SECONDS || 30);

function getModel(role) {
  if (role === "customer") return Customer;
  if (role === "professional") return Professional;
  if (role === "admin") return Admin;
  return null;
}

async function findUser(role, mobile) {
  const Model = getModel(role);
  return Model ? Model.findOne({ mobile }) : null;
}

function publicUser(user, role) {
  return {
    id: user._id,
    name: user.name,
    mobile: user.mobile,
    role,
    mobileVerified: user.mobileVerified ?? true,
    profileCompleted: user.profileCompleted ?? false
  };
}

async function issueOtp({ mobile, role, purpose }) {
  const provider = process.env.SMS_PROVIDER || "console";

  if (provider === "twilio-verify") {
    const result = await startSmsVerification({ mobile });
    return {
      expiresInSeconds: OTP_EXPIRES_MINUTES * 60,
      provider: result.provider
    };
  }

  const recent = await Otp.findOne({
    mobile,
    role,
    purpose,
    createdAt: { $gt: new Date(Date.now() - OTP_RESEND_SECONDS * 1000) },
    consumedAt: null
  }).sort({ createdAt: -1 });

  if (recent) {
    const error = new Error("Please wait before requesting another OTP.");
    error.statusCode = 429;
    throw error;
  }

  const otp = generateOtp();

  await Otp.updateMany(
    { mobile, role, purpose, consumedAt: null },
    { $set: { consumedAt: new Date() } }
  );

  await Otp.create({
    mobile,
    role,
    purpose,
    otpHash: hashOtp(otp),
    expiresAt: new Date(Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000)
  });

  await sendGeneratedOtpSms({ mobile, otp });

  return {
    expiresInSeconds: OTP_EXPIRES_MINUTES * 60,
    provider: "console"
  };
}

export async function register(req, res) {
  try {
    const { name, mobile, role } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!["customer", "professional"].includes(role)) {
      return res.status(400).json({ message: "Only customer and professional can register" });
    }

    const normalizedMobile = normalizeIndianMobile(mobile);

    if (!normalizedMobile) {
      return res.status(400).json({ message: "Enter a valid 10-digit Indian mobile number" });
    }

    const Model = getModel(role);
    const existing = await Model.findOne({ mobile: normalizedMobile });

    if (existing?.mobileVerified) {
      return res.status(409).json({
        message: "An account already exists with this mobile number. Please sign in."
      });
    }

    const user =
      existing ||
      new Model({
        name: name.trim(),
        mobile: normalizedMobile
      });

    user.name = name.trim();
    user.mobile = normalizedMobile;
    user.mobileVerified = false;

    await user.save();

    const otpResult = await issueOtp({
      mobile: normalizedMobile,
      role,
      purpose: "signup"
    });

    return res.status(201).json({
      message: "Account created. OTP sent for mobile verification.",
      role,
      mobile: normalizedMobile,
      ...otpResult
    });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "Registration failed"
    });
  }
}

export async function requestLoginOtp(req, res) {
  try {
    const { mobile, role } = req.body;

    if (!["customer", "professional", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const normalizedMobile = normalizeIndianMobile(mobile);

    if (!normalizedMobile) {
      return res.status(400).json({ message: "Enter a valid 10-digit Indian mobile number" });
    }

    const user = await findUser(role, normalizedMobile);

    if (!user) {
      return res.status(404).json({
        message: "No account exists for this mobile number and role."
      });
    }

    if (role !== "admin" && !user.mobileVerified) {
      return res.status(403).json({
        message: "Mobile number is not verified. Please complete signup first."
      });
    }

    if (role === "admin" && !user.active) {
      return res.status(403).json({ message: "Admin account is inactive" });
    }

    const otpResult = await issueOtp({
      mobile: normalizedMobile,
      role,
      purpose: "login"
    });

    return res.json({
      message: "Login OTP sent.",
      role,
      mobile: normalizedMobile,
      ...otpResult
    });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "Could not send login OTP"
    });
  }
}

export async function verifyOtp(req, res) {
  try {
    const { mobile, role, purpose, otp } = req.body;

    if (!["customer", "professional", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!["signup", "login"].includes(purpose)) {
      return res.status(400).json({ message: "Invalid OTP purpose" });
    }

    if (!/^\d{6}$/.test(String(otp || ""))) {
      return res.status(400).json({ message: "OTP must contain exactly 6 digits" });
    }

    const normalizedMobile = normalizeIndianMobile(mobile);

    if (!normalizedMobile) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    if (process.env.SMS_PROVIDER === "twilio-verify") {
      const approved = await checkSmsVerification({
        mobile: normalizedMobile,
        otp: String(otp)
      });

      if (!approved) {
        return res.status(400).json({ message: "Incorrect or expired OTP" });
      }

      const user = await findUser(role, normalizedMobile);

      if (!user) {
        return res.status(404).json({ message: "Account not found" });
      }

      if (purpose === "signup" && "mobileVerified" in user) {
        user.mobileVerified = true;
        await user.save();
      }

      const token = createAccessToken({
        userId: user._id.toString(),
        role
      });

      return res.json({
        message: "OTP verified successfully",
        token,
        user: publicUser(user, role)
      });
    }

    const record = await Otp.findOne({
      mobile: normalizedMobile,
      role,
      purpose,
      consumedAt: null
    }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({ message: "OTP is invalid or already used" });
    }

    if (record.expiresAt <= new Date()) {
      return res.status(400).json({ message: "OTP has expired. Request a new OTP." });
    }

    if (record.attempts >= OTP_MAX_ATTEMPTS) {
      return res.status(429).json({
        message: "Too many incorrect attempts. Request a new OTP."
      });
    }

    const incomingHash = hashOtp(String(otp));

    if (incomingHash !== record.otpHash) {
      record.attempts += 1;
      await record.save();

      return res.status(400).json({
        message: "Incorrect OTP",
        attemptsRemaining: Math.max(0, OTP_MAX_ATTEMPTS - record.attempts)
      });
    }

    record.consumedAt = new Date();
    await record.save();

    const user = await findUser(role, normalizedMobile);

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (purpose === "signup" && "mobileVerified" in user) {
      user.mobileVerified = true;
      await user.save();
    }

    const token = createAccessToken({
      userId: user._id.toString(),
      role
    });

    return res.json({
      message: "OTP verified successfully",
      token,
      user: publicUser(user, role)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "OTP verification failed"
    });
  }
}

export async function bootstrapAdmin(req, res) {
  try {
    const name = process.env.ADMIN_NAME;
    const mobile = normalizeIndianMobile(process.env.ADMIN_MOBILE);

    if (!name || !mobile) {
      return res.status(500).json({
        message: "ADMIN_NAME or ADMIN_MOBILE missing in .env"
      });
    }

    const existing = await Admin.findOne({ mobile });

    if (existing) {
      return res.json({
        message: "Admin already exists",
        admin: publicUser(existing, "admin")
      });
    }

    const admin = await Admin.create({
      name,
      mobile,
      active: true
    });

    return res.status(201).json({
      message: "Admin created",
      admin: publicUser(admin, "admin")
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not bootstrap admin" });
  }
}
