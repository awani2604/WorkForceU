import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CalendarCheck, Filter, Star, CheckCircle2, Search, ArrowRight } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { BookingCard } from "../../components/bookings/BookingCard";
import { EmptyState } from "../../components/common/EmptyState";
import { Modal } from "../../components/common/Modal";
import { Button } from "../../components/common/Button";
import { RatingStars } from "../../components/common/RatingStars";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

export const MyBookingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { bookings, rateBooking } = useApp();
  const { addToast } = useToast();

  const activeTabParam = searchParams.get("tab") || "all";
  const [activeTab, setActiveTab] = useState(activeTabParam);

  // Rating Modal State
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedBookingForRating, setSelectedBookingForRating] = useState(null);
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingComment, setRatingComment] = useState("");

  const tabs = [
    { id: "all", label: "All Bookings", count: bookings.length },
    { id: "pending", label: "Pending", count: bookings.filter((b) => b.status === "Pending").length },
    { id: "accepted", label: "Accepted", count: bookings.filter((b) => b.status === "Accepted").length },
    { id: "in_progress", label: "In Progress", count: bookings.filter((b) => b.status === "In Progress").length },
    { id: "completed", label: "Completed", count: bookings.filter((b) => b.status === "Completed").length },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams(tabId === "all" ? {} : { tab: tabId });
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return booking.status === "Pending";
    if (activeTab === "accepted") return booking.status === "Accepted";
    if (activeTab === "in_progress") return booking.status === "In Progress";
    if (activeTab === "completed") return booking.status === "Completed";
    return true;
  });

  const openRatingModal = (booking) => {
    setSelectedBookingForRating(booking);
    setRatingScore(5);
    setRatingComment("Worker was punctual, professional, and completed work with high quality.");
    setRatingModalOpen(true);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (!selectedBookingForRating) return;

    rateBooking(selectedBookingForRating.id, ratingScore, ratingComment);
    addToast(`Rating of ${ratingScore} Stars submitted for ${selectedBookingForRating.workerName}!`, "success");
    setRatingModalOpen(false);
    setSelectedBookingForRating(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Bookings & Orders"
        subtitle="Track active work orders, scheduled technicians, and rate completed jobs."
        action={
          <Button
            variant="rust"
            size="md"
            icon={Search}
            onClick={() => navigate("/customer/search")}
          >
            Find Another Worker
          </Button>
        }
      />

      {/* Tabs Filter Bar */}
      <div className="border-b border-gray-200 bg-white rounded-t-lg px-4 pt-2">
        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs font-semibold">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`pb-3 px-2 border-b-2 flex items-center gap-2 cursor-pointer transition ${
                activeTab === tab.id
                  ? "border-[#2E6FB0] text-[#2E6FB0]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-[#2E6FB0] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isProView={false}
              onRateClick={openRatingModal}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CalendarCheck}
          title={`No ${activeTab.replace("_", " ")} bookings found`}
          description="You do not have any job orders in this state right now."
          actionText="Explore Verified Workers"
          onAction={() => navigate("/customer/search")}
        />
      )}

      {/* Interactive Rating Modal */}
      <Modal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        title="Rate & Review Worker"
        subtitle={`Share your feedback for ${selectedBookingForRating?.workerName} (${selectedBookingForRating?.jobTitle})`}
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRatingModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="rust"
              size="sm"
              onClick={handleRatingSubmit}
            >
              Submit Verified Review
            </Button>
          </>
        }
      >
        <form onSubmit={handleRatingSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Select Quality Rating
            </label>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <RatingStars
                rating={ratingScore}
                interactive={true}
                size="lg"
                onRate={(score) => setRatingScore(score)}
              />
              <span className="text-sm font-bold text-[#C1502E]">
                {ratingScore} out of 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Feedback & Comments
            </label>
            <textarea
              rows={3}
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder="How was the worker's punctuality, technical skill, and cleanliness?"
              className="w-full p-2.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2E6FB0]"
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
