import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  CalendarCheck,
  Star,
  ArrowRight,
  Clock,
} from "lucide-react";

const STATS = [
  { label: "Active Bookings", value: "3", icon: CalendarCheck },
  { label: "Completed Jobs", value: "12", icon: Star },
  { label: "Saved Workers", value: "7", icon: Users },
];

const RECENT_BOOKINGS = [
  { name: "Rameshwar Sharma", trade: "Electrician", date: "12 Aug", status: "In Progress" },
  { name: "Suresh Yadav", trade: "Mason", date: "9 Aug", status: "Completed" },
  { name: "Team — House Wiring", trade: "5 Workers", date: "5 Aug", status: "Completed" },
];

const STATUS_STYLES = {
  "In Progress": "bg-orange-100 text-orange-700",
  "Completed": "bg-emerald-100 text-emerald-700",
  "Pending": "bg-slate-100 text-slate-600",
};

export const CustomerDashboard = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-6 py-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#141821]">Hey, Ramesh Kumar</h1>
        <p className="text-sm text-slate-500 mt-1">
          Here's what's happening with your bookings today.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/customer/search"
          className="bg-[#141821] text-white rounded-xl p-5 flex items-center justify-between hover:opacity-95 transition"
        >
          <div>
            <div className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-1">
              Find someone reliable
            </div>
            <div className="text-lg font-bold">Search Verified Workers</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
        </Link>

        <Link
          to="/customer/team-builder"
          className="bg-white border border-orange-200 rounded-xl p-5 flex items-center justify-between hover:border-orange-400 hover:shadow-sm transition"
        >
          <div>
            <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">
              Big job? Build a crew
            </div>
            <div className="text-lg font-bold text-[#141821]">Team &amp; Crew Builder</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-orange-100 p-5 flex items-center justify-between"
            >
              <div>
                <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
                <div className="text-2xl font-extrabold text-[#141821]">{stat.value}</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-xl border border-orange-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100">
          <h2 className="text-base font-bold text-[#141821]">Recent Bookings</h2>
          <Link
            to="/customer/bookings"
            className="text-xs font-semibold text-orange-600 flex items-center gap-1 hover:text-orange-700"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-orange-50">
          {RECENT_BOOKINGS.map((b, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-xs">
                  {b.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#141821]">{b.name}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    {b.trade}
                    <span className="mx-1">&middot;</span>
                    <Clock className="w-3 h-3" /> {b.date}
                  </div>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[b.status]}`}
              >
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};