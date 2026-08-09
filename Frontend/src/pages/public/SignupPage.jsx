import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Phone, Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { PublicNavbar } from "../../components/navigation/PublicNavbar";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, initiateOtpFlow } = useAuth();
  const { addToast } = useToast();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to SkillBridge terms and code of conduct.");
      return;
    }

    signup(fullName, phone, password, role);
    initiateOtpFlow(phone, role);
    addToast("Account created! Verify with 6-digit OTP code.", "info");
    navigate(`/verify-otp?phone=${phone}&role=${role}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EA] flex flex-col">
      <PublicNavbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-card p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#C1502E] text-white font-black text-sm mb-3">
              SBI
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#141821]">Create SkillBridge Account</h1>
            <p className="text-xs text-gray-500 mt-1">
              Join India's verified technical workforce ecosystem
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "customer", label: "Customer", sub: "Hire workers" },
                  { id: "professional", label: "Professional", sub: "Find work" },
                  { id: "trainee", label: "Trainee", sub: "Learn a skill" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    className={`p-2.5 rounded-lg border text-left transition cursor-pointer ${
                      role === item.id
                        ? "border-[#C1502E] bg-orange-50/50 ring-1 ring-[#C1502E]"
                        : "border-gray-200 bg-gray-50 hover:bg-white"
                    }`}
                  >
                    <span className="text-xs font-bold text-gray-900 block">{item.label}</span>
                    <span className="text-[10px] text-gray-500 block mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rameshwar Sharma"
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#141821] focus:border-[#141821]"
                  required
                />
              </div>
            </div>

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
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#141821] focus:border-[#141821]"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded text-[#C1502E] focus:ring-[#C1502E]"
              />
              <label htmlFor="terms" className="text-xs text-gray-600 leading-tight">
                I agree to the SkillBridge India Code of Conduct, Aadhaar verification consent & Terms of Service.
              </label>
            </div>

            <Button
              type="submit"
              variant="rust"
              size="md"
              className="w-full font-semibold"
            >
              Continue to OTP Verification &rarr;
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-600">
              Already registered?{" "}
              <Link to="/login" className="text-[#2E6FB0] font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
