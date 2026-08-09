import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  DollarSign,
  Star,
  Users,
  Calendar,
  Award,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { StatCard } from "../../components/common/StatCard";
import { Button } from "../../components/common/Button";
import { BookingCard } from "../../components/bookings/BookingCard";
import { LevelLadder } from "../../components/passport/LevelLadder";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

export const ProDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { bookings, updateBookingStatus } = useApp();
  const { addToast } = useToast();

  const proName = currentUser?.name || "Rameshwar Sharma";
  const proTrade = currentUser?.trade || "Electrician";
  const proLevel = currentUser?.level || 4;

  const pendingJobs = bookings.filter((b) => b.status === "Pending");
  const upcomingJobs = bookings.filter((b) => b.status === "Accepted" || b.status === "In Progress");

  const handleAcceptJob = (bookingId) => {
    updateBookingStatus(bookingId, "Accepted");
    addToast(`Job ${bookingId} accepted! Client notified.`, "success");
  };

  const handleRejectJob = (bookingId) => {
    updateBookingStatus(bookingId, "Cancelled");
    addToast(`Job ${bookingId} declined.`, "info");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${proName}`}
        subtitle={`${proTrade} &bull; Level ${proLevel} Senior Professional Workspace`}
        action={
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="md"
              icon={Calendar}
              onClick={() => navigate("/professional/availability")}
              className="bg-white"
            >
              Update Availability
            </Button>
            <Button
              variant="rust"
              size="md"
              icon={Award}
              onClick={() => navigate("/professional/passport")}
            >
              My Skill Passport
            </Button>
          </div>
        }
      />

      {/* Pending Job Requests Urgent Alert Banner */}
      {pendingJobs.length > 0 && (
        <div className="bg-[#FEF3D6] border border-[#F2B705] rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
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
            <Button variant="rust" size="sm" className="shrink-0 text-xs">
              Review Job Requests &rarr;
            </Button>
          </Link>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Earnings This Month"
          value="₹28,500"
          subtitle="Payouts released to bank"
          icon={DollarSign}
          color="rust"
          trend="+22%"
        />
        <StatCard
          title="Jobs Completed"
          value="24"
          subtitle="310 lifetime total"
          icon={Briefcase}
          color="dark"
        />
        <StatCard
          title="Quality Rating"
          value="4.88 / 5"
          subtitle="142 client reviews"
          icon={Star}
          color="teal"
        />
        <StatCard
          title="Apprentices Supervised"
          value="3 Active"
          subtitle="Bablu Paswan & 2 others"
          icon={Users}
          color="blue"
        />
      </div>

      {/* Skill Ladder Snapshot */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#141821]">National Skill Qualification Level</h3>
            <p className="text-xs text-gray-500">Authorized for independent high-voltage execution & apprenticeship verification</p>
          </div>
          <Link to="/professional/passport">
            <span className="text-xs font-semibold text-[#C1502E] hover:underline">
              View Full Passport &rarr;
            </span>
          </Link>
        </div>
        <LevelLadder currentLevel={proLevel} />
      </div>

      {/* Upcoming & In Progress Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#141821]">Scheduled & Active Jobs</h3>
            <p className="text-xs text-gray-500">Manage client orders in your current work queue</p>
          </div>
          <Link to="/professional/jobs">
            <Button variant="outline" size="sm" className="text-xs">
              View All Jobs &rarr;
            </Button>
          </Link>
        </div>

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
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center text-xs text-gray-500">
            No active jobs right now. Check your availability calendar to open slots for new clients!
          </div>
        )}
      </div>
    </div>
  );
};
