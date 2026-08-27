import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { PublicNavbar } from "../../components/navigation/PublicNavbar";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { initiateOtpFlow } = useAuth();
  const { addToast } = useToast();

  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [error, setError] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError("");

    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    initiateOtpFlow(phone, selectedRole);
    addToast(`6-digit OTP sent to +91 ${phone}`, "info");
    navigate(`/verify-otp?phone=${phone}&role=${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EA] flex flex-col">
      <PublicNavbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-card p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#141821] text-white font-black text-sm mb-3">
              WF
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#141821]">
              Sign in to WorkForce
            </h1>

            <p className="text-xs text-gray-500 mt-1">
              Sign in securely using your mobile number and OTP
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Select Account Role
            </label>

            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg border border-gray-200 text-xs">
              {[
                { id: "customer", label: "Customer" },
                { id: "professional", label: "Worker" },
                { id: "admin", label: "Admin" },
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`py-2 rounded font-medium transition cursor-pointer text-center ${
                    selectedRole === role.id
                      ? "bg-[#141821] text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 border-b border-gray-200 pb-3">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#C1502E]">
              <ShieldCheck className="w-4 h-4" />
              OTP Login
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Mobile Number
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-xs font-medium border-r border-gray-200 pr-2 my-1">
                  +91
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="98765 43210"
                  className="w-full pl-14 pr-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#141821] focus:border-[#141821]"
                  required
                  maxLength={10}
                />
              </div>

              <p className="text-[11px] text-gray-500 mt-1">
                We will send a 6-digit OTP to this mobile number.
              </p>
            </div>

            <Button
              type="submit"
              variant="rust"
              size="md"
              className="w-full font-semibold"
            >
              Send 6-Digit OTP
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account yet?{" "}
              <Link
                to="/signup"
                className="text-[#C1502E] font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
