import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  Users,
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Briefcase
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { StatCard } from "../../components/common/StatCard";
import { Button } from "../../components/common/Button";
import { WorkerCard } from "../../components/workers/WorkerCard";
import { BookingCard } from "../../components/bookings/BookingCard";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

export const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { workers, bookings } = useApp();

  const activeBookings = bookings.filter((b) => b.status === "Accepted" || b.status === "In Progress" || b.status === "Pending");
  const completedBookings = bookings.filter((b) => b.status === "Completed");
  const upcomingBooking = activeBookings[0] || bookings[0];

  return (
    <div className="space-y-8">
      {/* Page Title Header */}
      <PageHeader
        title={`Welcome back, ${currentUser?.name || "Pooja Reddy"}!`}
        subtitle="Manage your technical workforce bookings, discover certified trades, and build crews."
        action={
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="md"
              icon={Search}
              onClick={() => navigate("/customer/search")}
              className="bg-white"
            >
              Search Workers
            </Button>
            <Button
              variant="blue"
              size="md"
              icon={Users}
              onClick={() => navigate("/customer/team-builder")}
            >
              Build a Team
            </Button>
          </div>
        }
      />

      {/* Quick Action CTA Banner */}
      <div className="bg-[#141821] text-white rounded-lg p-6 sm:p-7 border border-gray-800 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F2B705] bg-[#252b3b] px-2.5 py-0.5 rounded">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Verified Technical Labor
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Need skilled hands for an upcoming project?
          </h2>
          <p className="text-xs text-gray-300">
            Book certified electricians, masons, plumbers, and painters or customize a turnkey building crew with escrow payment protection.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link to="/customer/search">
            <Button variant="rust" size="md" className="font-semibold">
              Book a Worker
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link to="/customer/team-builder">
            <Button variant="blue" size="md">
              Assemble Multi-trade Crew
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Bookings"
          value={activeBookings.length.toString()}
          subtitle="Orders currently in pipeline"
          icon={CalendarCheck}
          color="blue"
        />
        <StatCard
          title="Total Spent"
          value="₹7,450"
          subtitle="Secured in escrow"
          icon={DollarSign}
          color="dark"
        />
        <StatCard
          title="Completed Jobs"
          value={completedBookings.length.toString()}
          subtitle="100% verified execution"
          icon={CheckCircle2}
          color="teal"
        />
        <StatCard
          title="Available Crew Trades"
          value="8 Core"
          subtitle="Electrician, Mason, Plumber..."
          icon={Briefcase}
          color="rust"
        />
      </div>

      {/* Upcoming / Active Booking Card */}
      {upcomingBooking && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-subtle">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-[#141821]">Upcoming Scheduled Job</h3>
              <p className="text-xs text-gray-500">Next confirmed worker arrival</p>
            </div>
            <Link to="/customer/bookings">
              <span className="text-xs font-semibold text-[#2E6FB0] hover:underline flex items-center gap-1">
                View all bookings &rarr;
              </span>
            </Link>
          </div>

          <BookingCard booking={upcomingBooking} />
        </div>
      )}

      {/* Recommended Verified Workers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#141821]">Top-Rated Verified Workers</h3>
            <p className="text-xs text-gray-500">Certified Level 3 to Level 6 professionals available in your area</p>
          </div>
          <Link to="/customer/search">
            <Button variant="outline" size="sm" className="text-xs">
              View All Workers &rarr;
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workers.slice(0, 3).map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </div>
    </div>
  );
};
