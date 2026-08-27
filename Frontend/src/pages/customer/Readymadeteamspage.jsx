import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Users, ArrowLeft, ShieldCheck } from "lucide-react";

const READY_TEAMS = [
  {
    id: "team-house-construction",
    name: "House Construction Crew",
    description: "Complete crew for a standard 1,200–1,800 sq. ft. residential build.",
    rating: 4.7,
    reviews: 86,
    dailyPrice: 9500,
    composition: [
      { role: "Project Contractor", count: 1, level: "Level 6" },
      { role: "Lead Mason", count: 2, level: "Level 5" },
      { role: "General Labourer", count: 5, level: "Level 1" },
      { role: "Electrician", count: 1, level: "Level 4" },
      { role: "Plumber", count: 1, level: "Level 4" },
    ],
  },
  {
    id: "team-office-renovation",
    name: "Office Renovation Crew",
    description: "Ideal for commercial fit-outs, false ceiling, wiring, and painting.",
    rating: 4.6,
    reviews: 52,
    dailyPrice: 6200,
    composition: [
      { role: "Supervisor", count: 1, level: "Level 5" },
      { role: "Carpenter", count: 2, level: "Level 4" },
      { role: "Electrician", count: 1, level: "Level 4" },
      { role: "Painter", count: 2, level: "Level 3" },
    ],
  },
  {
    id: "team-home-wiring-plumbing",
    name: "Home Wiring & Plumbing Duo",
    description: "Quick two-person team for small home electrical + plumbing jobs.",
    rating: 4.9,
    reviews: 134,
    dailyPrice: 1500,
    composition: [
      { role: "Electrician", count: 1, level: "Level 4" },
      { role: "Plumber", count: 1, level: "Level 4" },
    ],
  },
];

export const ReadyMadeTeamsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 lg:px-6 py-6 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#141821] mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#141821]">Ready-Made Teams</h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Pre-assembled, already-rated crews for common job types. Fixed composition, fixed daily
          price — book instantly without configuring anything.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {READY_TEAMS.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-xl border border-orange-100 overflow-hidden flex flex-col"
          >
            <div className="bg-[#141821] text-white px-5 py-4">
              <div className="flex items-center justify-between mb-1">
                <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  {team.composition.reduce((s, c) => s + c.count, 0)} WORKERS
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-orange-400">
                  <Star className="w-3.5 h-3.5 fill-orange-400" />
                  {team.rating} ({team.reviews})
                </span>
              </div>
              <h3 className="text-base font-bold">{team.name}</h3>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">{team.description}</p>

                <div className="space-y-1.5 mb-4">
                  {team.composition.map((c, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-xs bg-orange-50 rounded-lg px-3 py-2"
                    >
                      <span className="text-[#141821] font-medium">
                        {c.count} &times; {c.role}
                      </span>
                      <span className="text-slate-500">{c.level}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1D8C6C]" />
                  All members verified &amp; Skill Passport backed
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-3 pt-3 border-t border-orange-100">
                  <span className="text-xs font-semibold text-slate-500">Daily Total</span>
                  <span className="text-lg font-extrabold text-orange-600">
                    ₹{team.dailyPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2.5 rounded-lg transition">
                  Book This Team
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white border border-orange-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#141821]">Don't see the right fit?</p>
            <p className="text-xs text-slate-500">Build a custom crew with exactly the roles you need.</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/customer/team-builder")}
          className="text-sm font-semibold text-orange-600 hover:text-orange-700 whitespace-nowrap"
        >
          Build My Own Team →
        </button>
      </div>
    </div>
  );
};