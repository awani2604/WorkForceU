import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import { RatingStars } from "../../components/common/RatingStars";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const BookWorkerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workers, createBooking } = useApp();
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const worker = workers.find((w) => w.id === id) || workers[0];

  // Booking Form State
  const [jobTitle, setJobTitle] = useState("Conduit Electrical Wiring & MCB Distribution Setup");
  const [jobDescription, setJobDescription] = useState("Install 63A distribution board, run concealed conduit lines in 2 bedrooms, and balance single phase load.");
  const [bookingDate, setBookingDate] = useState("2026-08-14");
  const [timeSlot, setTimeSlot] = useState("Full Day (08:00 AM - 05:00 PM)");
  const [duration, setDuration] = useState("1 Day");
  const [multiplier, setMultiplier] = useState(1);
  const [locationAddress, setLocationAddress] = useState("Flat 402, Sunshine Heights, Koramangala 4th Block, Bengaluru, KA 560034");
  const [agreeEscrow, setAgreeEscrow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDurationChange = (dur, mult) => {
    setDuration(dur);
    setMultiplier(mult);
  };

  const baseRate = worker.dailyRate || 950;
  const subtotal = baseRate * multiplier;
  const platformFee = 50;
  const totalAmount = subtotal + platformFee;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setError("");

    if (!jobTitle.trim() || !jobDescription.trim() || !locationAddress.trim()) {
      setError("Please complete all required job details.");
      return;
    }
    if (!agreeEscrow) {
      setError("Please agree to the escrow safety protocol.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const newBooking = createBooking({
        workerId: worker.id,
        workerName: worker.name,
        workerTrade: worker.trade,
        workerLevel: `Level ${worker.level} (${worker.levelTitle})`,
        workerPhoto: worker.photo,
        customerName: currentUser?.name || "Pooja Reddy",
        jobTitle,
        jobDescription,
        date: bookingDate,
        timeSlot,
        duration,
        price: totalAmount,
        location: locationAddress
      });

      addToast(`Booking ${newBooking.id} confirmed! Escrow secured.`, "success");
      navigate("/customer/bookings");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to={`/customer/worker/${worker.id}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to {worker.name}'s Passport
      </Link>

      <PageHeader
        title={`Book ${worker.name}`}
        subtitle={`Schedule ${worker.trade} (${worker.levelTitle}) with Escrow Protection.`}
      />

      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-lg border border-gray-200 shadow-subtle">
          <form onSubmit={handleConfirmBooking} className="space-y-5">
            {/* Job Title */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Job Title / Scope Summary *
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Master Bathroom Diverter Replacement"
                className="w-full p-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E6FB0] focus:border-[#2E6FB0]"
                required
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Detailed Job Description & Requirements *
              </label>
              <textarea
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Describe the problem, materials available on site, special tools needed..."
                className="w-full p-2.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E6FB0] focus:border-[#2E6FB0]"
                required
              />
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Scheduled Start Date *
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full p-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E6FB0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Arrival Shift / Time Slot *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E6FB0]"
                >
                  <option value="Full Day (08:00 AM - 05:00 PM)">Full Day (08:00 AM - 05:00 PM)</option>
                  <option value="Morning Shift (09:00 AM - 01:00 PM)">Morning Shift (09:00 AM - 01:00 PM)</option>
                  <option value="Afternoon Shift (02:00 PM - 06:00 PM)">Afternoon Shift (02:00 PM - 06:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Expected Job Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { label: "Half Day (4h)", mult: 0.5, name: "Half Day" },
                  { label: "1 Full Day", mult: 1, name: "1 Day" },
                  { label: "2 Days", mult: 2, name: "2 Days" },
                  { label: "3 Days", mult: 3, name: "3 Days" },
                ].map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => handleDurationChange(d.name, d.mult)}
                    className={`p-2 rounded-lg border text-center font-medium transition cursor-pointer ${
                      duration === d.name
                        ? "border-[#2E6FB0] bg-[#EAF1FB] text-[#2E6FB0] font-bold"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-white"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Site Address */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Site Work Address *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <textarea
                  rows={2}
                  value={locationAddress}
                  onChange={(e) => setLocationAddress(e.target.value)}
                  placeholder="Complete flat / house address, landmark, and pincode"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E6FB0]"
                  required
                />
              </div>
            </div>

            {/* Escrow Agreement */}
            <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="escrow"
                checked={agreeEscrow}
                onChange={(e) => setAgreeEscrow(e.target.checked)}
                className="mt-0.5 rounded text-[#1D8C6C] focus:ring-[#1D8C6C]"
              />
              <label htmlFor="escrow" className="text-xs text-emerald-900 leading-tight">
                <strong>WorkForceU Escrow Protection:</strong> Funds remain securely locked in escrow and are only released to the worker once you approve job completion.
              </label>
            </div>

            <Button
              type="submit"
              variant="rust"
              size="lg"
              disabled={loading}
              className="w-full font-bold text-base"
            >
              {loading ? "Securing Booking..." : `Confirm Booking & Lock ₹${totalAmount}`}
            </Button>
          </form>
        </div>

        {/* Right Summary Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Worker Snapshot */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Selected Professional
            </h4>
            <div className="flex items-center gap-3.5">
              <img
                src={worker.photo}
                alt={worker.name}
                className="w-14 h-14 rounded-lg object-cover border border-gray-200"
              />
              <div>
                <h5 className="text-sm font-bold text-[#141821]">{worker.name}</h5>
                <p className="text-xs font-semibold text-[#C1502E]">
                  {worker.trade} &bull; {worker.levelTitle}
                </p>
                <div className="mt-1">
                  <RatingStars rating={worker.rating} count={worker.reviewsCount} size="sm" />
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-600 space-y-1.5 pt-3 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Verification:</span>
                <span className="font-semibold text-[#1D8C6C]">Aadhaar + NSQF Level {worker.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed Jobs:</span>
                <span className="font-semibold text-gray-900">{worker.jobsCompleted}+ verified</span>
              </div>
            </div>
          </div>

          {/* Pricing Calculation Breakdown */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-3 text-xs">
            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">
              Price Calculation Breakdown
            </h4>

            <div className="flex justify-between text-gray-600">
              <span>Base Rate (₹{baseRate} &times; {multiplier} duration):</span>
              <span className="font-medium text-gray-900">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Platform Insurance & Escrow Fee:</span>
              <span className="font-medium text-gray-900">₹{platformFee}</span>
            </div>

            <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm font-bold text-[#141821]">
              <span>Total Payable</span>
              <span className="text-[#C1502E] text-lg">₹{totalAmount}</span>
            </div>
            <p className="text-[11px] text-gray-400">Includes all GST & safety protection charges.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
