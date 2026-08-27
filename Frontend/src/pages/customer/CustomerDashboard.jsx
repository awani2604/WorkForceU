import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  CalendarCheck,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  Hammer,
  Wrench,
  Paintbrush,
  Car,
  Sprout,
  Package,
  Layers,
  Sparkles,
  Droplets,
  Wind,
  Cog,
  Shirt,
  Brush,
  Ruler,
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

const SERVICES = [
  { name: "Electrician", icon: Zap, workerCount: 340, startingPrice: 700 },
  { name: "Mason", icon: Hammer, workerCount: 512, startingPrice: 900 },
  { name: "Plumber", icon: Wrench, workerCount: 268, startingPrice: 650 },
  { name: "Painter", icon: Paintbrush, workerCount: 190, startingPrice: 550 },
  { name: "Carpenter", icon: Ruler, workerCount: 224, startingPrice: 750 },
  { name: "Driver", icon: Car, workerCount: 150, startingPrice: 600 },
  { name: "Gardener", icon: Sprout, workerCount: 88, startingPrice: 450 },
  { name: "Labourer", icon: Users, workerCount: 610, startingPrice: 400 },
  { name: "Bathroom Cleaner", icon: Droplets, workerCount: 176, startingPrice: 350 },
  { name: "AC Repair & Install", icon: Wind, workerCount: 142, startingPrice: 500 },
  { name: "Mechanic", icon: Cog, workerCount: 96, startingPrice: 550 },
  { name: "Laundry", icon: Shirt, workerCount: 64, startingPrice: 300 },
  { name: "Room Cleaner", icon: Brush, workerCount: 208, startingPrice: 350 },
];

export const CustomerDashboard = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
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

      {/* Book by Service */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#141821]">Book by Service</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pick a trade — see verified, rated workers ready to book.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/customer/search"
              className="text-xs font-semibold text-orange-600 flex items-center gap-1 hover:text-orange-700"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scrollByAmount(-330)}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full border border-orange-200 bg-white flex items-center justify-center text-slate-500 hover:bg-orange-50 hover:text-orange-700 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollByAmount(330)}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full border border-orange-200 bg-white flex items-center justify-center text-slate-500 hover:bg-orange-50 hover:text-orange-700 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="overflow-x-auto scroll-smooth -mx-1 px-1 pb-2">
          <div className="grid grid-rows-2 grid-flow-col auto-cols-[150px] gap-3 w-max">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.name}
                  onClick={() => navigate(`/customer/search?trade=${service.name}`)}
                  className="w-[150px] bg-white border border-orange-100 rounded-xl p-4 text-left hover:border-orange-400 hover:shadow-sm transition group"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-3 group-hover:bg-orange-600 group-hover:text-white transition">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-sm font-bold text-[#141821]">{service.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {service.workerCount}+ verified &middot; from ₹{service.startingPrice}/day
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contractual Team Booking — advertised feature */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span className="text-xs font-bold uppercase tracking-wide text-orange-600">
            New: Contractual Team Booking
          </span>
        </div>
        <h2 className="text-lg font-extrabold text-[#141821] mb-1">
          Bigger job? Book a whole team, not just one worker.
        </h2>
        <p className="text-xs text-slate-500 mb-4 max-w-2xl">
          For construction, renovation, or multi-trade projects — choose how you want your crew built.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: Self-made team */}
          <div className="bg-white border border-orange-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1">
                Option 1 &middot; Build It Yourself
              </div>
              <h3 className="text-base font-bold text-[#141821] mb-1.5">Self-Made Team</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Choose exactly which roles and how many of each you need — 2 masons, 1 electrician,
                5 labourers, whatever your job requires. Full control over your crew.
              </p>
            </div>
            <Link
              to="/customer/team-builder"
              className="inline-flex items-center justify-center gap-1.5 bg-[#141821] text-white text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition"
            >
              Build My Own Team <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Option 2: Ready-made team */}
          <div className="bg-white border border-orange-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center mb-3">
                <Package className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1">
                Option 2 &middot; Ready In Minutes
              </div>
              <h3 className="text-base font-bold text-[#141821] mb-1.5">Ready-Made Team</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Skip the planning — pick from pre-assembled, already-rated crews for common jobs like
                house construction or office renovation. Fixed composition, fixed price.
              </p>
            </div>
            <Link
              to="/customer/ready-made-teams"
              className="inline-flex items-center justify-center gap-1.5 bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-orange-700 transition"
            >
              Browse Ready-Made Teams <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
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