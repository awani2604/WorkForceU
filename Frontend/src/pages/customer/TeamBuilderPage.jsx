import React, { useState, useMemo } from "react";
import { Users, Minus, Plus, HardHat, Zap, Hammer, Wrench, Paintbrush } from "lucide-react";

const ROLES = [
  { id: "contractor", name: "Project Contractor", level: "Level 6", rate: 2500, icon: HardHat },
  { id: "mason", name: "Lead Mason", level: "Level 5", rate: 1400, icon: Hammer },
  { id: "labourer", name: "General Labourer", level: "Level 1", rate: 500, icon: Users },
  { id: "electrician", name: "Electrician", level: "Level 4", rate: 900, icon: Zap },
  { id: "plumber", name: "Plumber", level: "Level 4", rate: 800, icon: Wrench },
  { id: "painter", name: "Painter", level: "Level 3", rate: 700, icon: Paintbrush },
];

const JOB_TYPES = ["House Construction", "Renovation", "Commercial Fit-out", "Factory Setup"];

export const TeamBuilderPage = () => {
  const [jobType, setJobType] = useState("House Construction");
  const [jobSize, setJobSize] = useState("");
  const [counts, setCounts] = useState({
    contractor: 1,
    mason: 2,
    labourer: 5,
    electrician: 1,
    plumber: 1,
    painter: 0,
  });

  const updateCount = (id, delta) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }));
  };

  const totalWorkers = useMemo(
    () => Object.values(counts).reduce((sum, c) => sum + c, 0),
    [counts]
  );

  const totalCost = useMemo(
    () =>
      ROLES.reduce((sum, role) => sum + role.rate * counts[role.id], 0),
    [counts]
  );

  return (
    <div className="px-4 sm:px-6 lg:px-6 py-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#141821]">Team &amp; Crew Builder</h1>
        <p className="text-sm text-slate-500 mt-1">
          Building or renovating? Compose your crew and request everyone in one booking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Job details + crew composer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job details */}
          <div className="bg-white rounded-xl border border-orange-100 p-5">
            <h2 className="text-sm font-bold text-[#141821] mb-4">Job Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">
                  Job Type
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full text-sm border border-orange-100 rounded-lg px-3 py-2.5 text-[#141821] focus:outline-none focus:border-orange-400"
                >
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">
                  Approx. Size (sq. ft.)
                </label>
                <input
                  type="text"
                  value={jobSize}
                  onChange={(e) => setJobSize(e.target.value)}
                  placeholder="e.g. 1200"
                  className="w-full text-sm border border-orange-100 rounded-lg px-3 py-2.5 text-[#141821] placeholder:text-slate-400 focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Crew composer */}
          <div className="bg-white rounded-xl border border-orange-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-orange-100">
              <h2 className="text-sm font-bold text-[#141821]">Compose Your Crew</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Set how many of each role you need — remove roles you don't.
              </p>
            </div>

            <div className="divide-y divide-orange-50">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const count = counts[role.id];
                return (
                  <div
                    key={role.id}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          count > 0
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#141821]">
                          {role.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {role.level} &middot; ₹{role.rate}/day
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCount(role.id, -1)}
                        className="w-7 h-7 rounded-lg border border-orange-200 flex items-center justify-center text-slate-500 hover:bg-orange-50 disabled:opacity-30"
                        disabled={count === 0}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-[#141821]">
                        {count}
                      </span>
                      <button
                        onClick={() => updateCount(role.id, 1)}
                        className="w-7 h-7 rounded-lg border border-orange-200 flex items-center justify-center text-slate-500 hover:bg-orange-50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#141821] text-white rounded-xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wide">
                {jobType}
              </span>
              <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                {totalWorkers} WORKERS
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {ROLES.filter((r) => counts[r.id] > 0).map((role) => (
                <div
                  key={role.id}
                  className="flex justify-between items-center text-xs bg-white/5 rounded-lg px-3 py-2"
                >
                  <span>
                    {counts[role.id]} &times; {role.name}
                  </span>
                  <span className="font-mono text-slate-300">
                    ₹{(role.rate * counts[role.id]).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
              {totalWorkers === 0 && (
                <p className="text-xs text-slate-400 py-4 text-center">
                  Add roles from the left to build your crew.
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center mb-5">
              <span className="text-sm font-bold">Estimated Daily Total</span>
              <span className="text-lg font-extrabold text-orange-400">
                ₹{totalCost.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              disabled={totalWorkers === 0}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-lg transition"
            >
              Request This Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};