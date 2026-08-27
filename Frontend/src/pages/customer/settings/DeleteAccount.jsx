import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { AlertTriangle, ArrowLeft } from "lucide-react";

const DELETE_REASONS = [
  "I found a better alternative",
  "I no longer need this service",
  "I'm not satisfied with the platform",
  "Too many notifications / emails",
  "Privacy concerns",
  "Other",
];

export const DeleteAccount = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = reason, 2 = final confirm
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const canContinue = reason && (reason !== "Other" || otherReason.trim().length > 0);

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleDelete = () => {
    setDeleting(true);
    // TODO: call your delete-account API here, sending { reason, otherReason }
    setTimeout(() => {
      logout();
      navigate("/");
    }, 600);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* ============ STEP 1: Reason ============ */}
      {step === 1 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-gray-900 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h1 className="text-sm font-bold">Delete Account</h1>
          </div>
          <p className="text-xs text-gray-500 mb-5">
            We're sorry to see you go. Please tell us why you're leaving —
            this helps us improve.
          </p>

          <form onSubmit={handleContinue} className="space-y-3">
            {DELETE_REASONS.map((r) => (
              <label
                key={r}
                className={`flex items-center gap-2.5 border rounded-lg px-3 py-2.5 text-xs cursor-pointer transition ${
                  reason === r
                    ? "border-red-400 bg-red-50 text-red-700"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={r}
                  checked={reason === r}
                  onChange={(e) => setReason(e.target.value)}
                  className="accent-red-600"
                />
                {r}
              </label>
            ))}

            {reason === "Other" && (
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Please tell us more..."
                rows={3}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
              />
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 flex items-center justify-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-semibold py-2 rounded-lg hover:bg-gray-50 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canContinue}
                className="flex-1 bg-red-600 text-white text-xs font-semibold py-2 rounded-lg disabled:opacity-40 hover:bg-red-700 transition"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============ STEP 2: Final confirmation ============ */}
      {step === 2 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">
          <div className="flex items-center gap-2 text-red-700 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <h1 className="text-sm font-bold">Confirm Account Deletion</h1>
          </div>

          <p className="text-xs text-red-700 mb-3 leading-relaxed">
            This action is <span className="font-bold">permanent and cannot be undone</span>.
            All your bookings, profile data, certificates, and history will be
            erased.
          </p>

          <div className="bg-white/70 border border-red-100 rounded-lg px-3 py-2 mb-4">
            <p className="text-[11px] text-gray-500 mb-0.5">Reason provided</p>
            <p className="text-xs text-gray-800 font-medium">
              {reason === "Other" ? otherReason : reason}
            </p>
          </div>

          <p className="text-xs text-red-700 mb-2">
            Type <span className="font-mono font-bold">DELETE</span> below to confirm.
          </p>
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE"
            className="w-full px-3 py-2 text-sm border border-red-300 rounded-lg mb-3 focus:outline-none focus:border-red-500"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 flex items-center justify-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-semibold py-2 rounded-lg hover:bg-gray-50 transition bg-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              disabled={confirmText !== "DELETE" || deleting}
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white text-xs font-semibold py-2 rounded-lg disabled:opacity-40 hover:bg-red-700 transition"
            >
              {deleting ? "Deleting..." : "Permanently Delete My Account"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};