export function normalizeIndianMobile(value) {
  const digits = String(value ?? "").replace(/\D/g, "");

  if (digits.startsWith("91") && digits.length === 12) {
    return digits.slice(2);
  }

  if (digits.length === 10) {
    return digits;
  }

  return null;
}

export function toE164IndianMobile(mobile) {
  return `+91${mobile}`;
}
