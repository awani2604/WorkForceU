import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { PublicNavbar } from "../../components/navigation/PublicNavbar";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithPhonePassword, initiateOtpFlow, switchRole } = useAuth();
  const { addToast } = useToast();

  const [authMethod, setAuthMethod] = useState("password"); // "password" | "otp"
  const [phone, setPhone] = useState("9845011223");
  const [password, setPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      switchRole(selectedRole);
      addToast(`Logged in successfully as ${selectedRole.toUpperCase()}`, "success");
      if (selectedRole === "customer") navigate("/customer/dashboard");
      else if (selectedRole === "professional") navigate("/professional/dashboard");
      else if (selectedRole === "trainee") navigate("/trainee/dashboard");
      else navigate("/admin/dashboard");
    }, 600);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
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
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#141821] text-white font-black text-sm mb-3">
              WF
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#141821]">Sign in to WorkForce</h1>
            <p className="text-xs text-gray-500 mt-1">
              Access your Digital Skill Passport & workforce orders
            </p>
          </div>

          {/* Role selector tab */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Select Account Role
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-gray-100 rounded-lg border border-gray-200 text-xs">
              {[
                { id: "customer", label: "Customer" },
                { id: "professional", label: "Worker" },
                { id: "trainee", label: "Trainee" },
                { id: "admin", label: "Admin" },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`py-1.5 rounded font-medium transition cursor-pointer text-center ${
                    selectedRole === r.id
                      ? "bg-[#141821] text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auth Method Switcher Tabs */}
          <div className="flex border-b border-gray-200 mb-5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthMethod("password");
                setError("");
              }}
              className={`flex-1 py-2 text-center border-b-2 transition ${
                authMethod === "password"
                  ? "border-[#C1502E] text-[#C1502E]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod("otp");
                setError("");
              }}
              className={`flex-1 py-2 text-center border-b-2 transition ${
                authMethod === "otp"
                  ? "border-[#C1502E] text-[#C1502E]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Instant OTP Login
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Area */}
          {authMethod === "password" ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
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
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className="w-full pl-14 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#141821] focus:border-[#141821]"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthMethod("otp")}
                    className="text-[11px] text-[#2E6FB0] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#141821] focus:border-[#141821]"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="rust"
                size="md"
                disabled={loading}
                className="w-full font-semibold"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mobile Number for OTP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-xs font-medium border-r border-gray-200 pr-2 my-1">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className="w-full pl-14 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#141821] focus:border-[#141821]"
                    required
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  We will send a 6-digit one-time code to this number.
                </p>
              </div>

              <Button
                type="submit"
                variant="rust"
                size="md"
                className="w-full font-semibold"
              >
                Send 6-Digit OTP &rarr;
              </Button>
            </form>
          )}

          {/* Quick Demo Switcher helper */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-[#C1502E] font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
