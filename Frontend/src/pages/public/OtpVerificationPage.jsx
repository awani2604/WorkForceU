import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { PublicNavbar } from "../../components/navigation/PublicNavbar";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const OtpVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyOtp, authPendingPhone, authPendingRole } = useAuth();
  const { addToast } = useToast();

  const phone = searchParams.get("phone") || authPendingPhone || "9845011223";
  const role = searchParams.get("role") || authPendingRole || "customer";

  const [digits, setDigits] = useState(["1", "2", "3", "4", "5", "6"]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleDigitChange = (index, value) => {
    const val = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);
    setError("");

    // Auto-advance
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits of the verification code.");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      const res = verifyOtp(code);
      if (res.success) {
        setIsSuccess(true);
        addToast("Mobile verified! Welcome to SkillBridge India.", "success");
        setTimeout(() => {
          if (role === "customer") navigate("/customer/dashboard");
          else if (role === "professional") navigate("/professional/dashboard");
          else if (role === "trainee") navigate("/trainee/dashboard");
          else navigate("/admin/dashboard");
        }, 800);
      } else {
        setError(res.message);
      }
    }, 600);
  };

  const handleResend = () => {
    setDigits(["", "", "", "", "", ""]);
    setTimer(30);
    setCanResend(false);
    setError("");
    addToast("New 6-digit OTP sent to +91 " + phone, "info");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-[#F7F4EA] flex flex-col">
      <PublicNavbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-card p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#E6F4EA] text-[#1D8C6C] mb-3 border border-[#1D8C6C]/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#141821]">Verify Mobile Number</h1>
            <p className="text-xs text-gray-500 mt-1">
              Enter the 6-digit OTP code sent to <strong className="text-gray-900">+91 {phone}</strong>
            </p>
            <div className="mt-2 inline-block bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded text-[11px] font-medium">
              Demo Code: <span className="font-bold tracking-widest">123456</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-800 flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Verification Successful! Redirecting to {role.toUpperCase()} workspace...</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            {/* 6 Digit Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-lg border focus:outline-none transition-all ${
                    digit
                      ? "border-[#141821] bg-gray-50 text-[#141821]"
                      : "border-gray-300 bg-white"
                  } focus:ring-2 focus:ring-[#C1502E] focus:border-[#C1502E]`}
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="rust"
              size="md"
              disabled={loading || isSuccess}
              className="w-full font-semibold"
            >
              {loading ? "Verifying..." : "Verify OTP & Continue"}
            </Button>
          </form>

          {/* Resend Timer */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <Link to="/login" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-3.5 h-3.5" />
              Change Number
            </Link>

            <div>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-bold text-[#C1502E] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Resend OTP
                </button>
              ) : (
                <span>Resend in <strong>{timer}s</strong></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
