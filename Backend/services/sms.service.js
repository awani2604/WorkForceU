import twilio from "twilio";
import { toE164IndianMobile } from "../utils/phone.js";

let twilioClient = null;

function getTwilioClient() {
  if (!twilioClient) {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
  return twilioClient;
}

function requireTwilioConfig() {
  if (
    !process.env.TWILIO_ACCOUNT_SID ||
    !process.env.TWILIO_AUTH_TOKEN ||
    !process.env.TWILIO_VERIFY_SERVICE_SID
  ) {
    throw new Error(
      "Twilio Verify is not configured. Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_VERIFY_SERVICE_SID to .env"
    );
  }
}

export async function startSmsVerification({ mobile }) {
  const provider = process.env.SMS_PROVIDER || "console";

  if (provider === "console") {
    return { provider: "console" };
  }

  if (provider !== "twilio-verify") {
    throw new Error("Unsupported SMS_PROVIDER");
  }

  requireTwilioConfig();

  const client = getTwilioClient();

  const verification = await client.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID)
    .verifications.create({
      to: toE164IndianMobile(mobile),
      channel: "sms"
    });

  return {
    provider: "twilio-verify",
    status: verification.status
  };
}

export async function checkSmsVerification({ mobile, otp }) {
  const provider = process.env.SMS_PROVIDER || "console";

  if (provider !== "twilio-verify") {
    return null;
  }

  requireTwilioConfig();

  const client = getTwilioClient();

  const result = await client.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: toE164IndianMobile(mobile),
      code: otp
    });

  return result.status === "approved";
}

export async function sendGeneratedOtpSms({ mobile, otp }) {
  const provider = process.env.SMS_PROVIDER || "console";

  if (provider === "console") {
    console.log(`\n[DEV OTP] +91${mobile} -> ${otp}\n`);
    return { provider: "console" };
  }

  if (provider === "twilio-verify") {
    throw new Error(
      "Do not generate/store your own OTP when using Twilio Verify. Use startSmsVerification()."
    );
  }

  throw new Error("Unsupported SMS_PROVIDER");
}
