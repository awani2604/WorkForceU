import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  DollarSign,
  Star,
  Users,
  Calendar,
  Award,
  AlertCircle,
} from "lucide-react";

import { PageHeader } from "../../components/common/PageHeader";
import { StatCard } from "../../components/common/StatCard";
import { Button } from "../../components/common/Button";
import { BookingCard } from "../../components/bookings/BookingCard";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

export const ProDashboard = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { bookings, updateBookingStatus } = useApp();
  const { addToast } = useToast();

  // Full name of the professional
  const proName = currentUser?.name || "Rameshwar Sharma";

  // Find pending booking requests
  const pendingJobs = bookings.filter(
    (b) => b.status === "Pending"
  );

  // Find accepted and active jobs
  const upcomingJobs = bookings.filter(
    (b) =>
      b.status === "Accepted" ||
      b.status === "In Progress"
  );

  // Accept a job
  const handleAcceptJob = (bookingId) => {
    updateBookingStatus(bookingId, "Accepted");

    addToast(
      `Job ${bookingId} accepted! Client notified.`,
      "success"
    );
  };

  // Reject a job
  const handleRejectJob = (bookingId) => {
    updateBookingStatus(bookingId, "Cancelled");

    addToast(
      `Job ${bookingId} declined.`,
      "info"
    );
  };

  return (
    <div className="space-y-8">

      {/* =========================================
          PAGE HEADER
      ========================================== */}
      <PageHeader
        title={proName}
        action={
          <div className="flex items-center gap-2.5">

            {/* Update Availability */}
            <Button
              variant="outline"
              size="md"
              icon={Calendar}
              onClick={() =>
                navigate("/professional/availability")
              }
              className="bg-white"
            >
              Update Availability
            </Button>

            {/* My Skill Passport */}
            <Button
              variant="rust"
              size="md"
              icon={Award}
              onClick={() =>
                navigate("/professional/passport")
              }
            >
              My Skill Passport
            </Button>

          </div>
        }
      />

      {/* =========================================
          PENDING JOB REQUEST ALERT
      ========================================== */}
      {pendingJobs.length > 0 && (
        <div className="bg-[#FEF3D6] border border-[#F2B705] rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          <div className="flex items-start gap-3">

            <AlertCircle
              className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5"
            />

            <div>

              <h3 className="text-sm font-bold text-amber-900">
                You have {pendingJobs.length} new booking request awaiting confirmation!
              </h3>

              <p className="text-xs text-amber-800 mt-0.5">
                Review client details and accept to secure your scheduled daily wage into escrow.
              </p>

            </div>

          </div>

          <Link to="/professional/jobs">

            <Button
              variant="rust"
              size="sm"
              className="shrink-0 text-xs"
            >
              Review Job Requests &rarr;
            </Button>

          </Link>

        </div>
      )}

      {/* =========================================
          METRICS ROW
      ========================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Earnings This Month */}
        <StatCard
          title="Earnings This Month"
          value="₹28,500"
          subtitle="Payouts released to bank"
          icon={DollarSign}
          color="rust"
          trend="+22%"
        />

        {/* Jobs Completed */}
        <StatCard
          title="Jobs Completed"
          value="24"
          subtitle="310 lifetime total"
          icon={Briefcase}
          color="dark"
        />

        {/* Quality Rating */}
        <StatCard
          title="Quality Rating"
          value="4.88 / 5"
          subtitle="142 client reviews"
          icon={Star}
          color="teal"
        />

        {/* Apprentices Supervised */}
        <StatCard
          title="Apprentices Supervised"
          value="3 Active"
          subtitle="Bablu Paswan & 2 others"
          icon={Users}
          color="blue"
        />

      </div>

      {/* =========================================
          SCHEDULED & ACTIVE JOBS
      ========================================== */}
      <div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">

          <div>

            <h3 className="text-lg font-bold text-[#141821]">
              Scheduled & Active Jobs
            </h3>

            <p className="text-xs text-gray-500">
              Manage client orders in your current work queue
            </p>

          </div>

          <Link to="/professional/jobs">

            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              View All Jobs &rarr;
            </Button>

          </Link>

        </div>

        {/* Active Jobs */}
        {upcomingJobs.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {upcomingJobs.map((booking) => (

              <BookingCard
                key={booking.id}
                booking={booking}
                isProView={true}
                onAccept={handleAcceptJob}
                onReject={handleRejectJob}
                onStatusChange={updateBookingStatus}
              />

            ))}

          </div>

        ) : (

          /* No Active Jobs */
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center text-xs text-gray-500">

            No active jobs right now. Check your availability calendar to open slots for new clients!

          </div>

        )}

      </div>

    </div>
  );
};