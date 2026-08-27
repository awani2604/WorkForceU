import React, { useState, useMemo } from "react";
import { Users, HardHat, Zap, Hammer, Wrench, Paintbrush, Star, Check } from "lucide-react";

const ROLES = [
  { id: "contractor", name: "Project Contractor", level: "Level 6", rate: 2500, icon: HardHat },
  { id: "mason", name: "Lead Mason", level: "Level 5", rate: 1400, icon: Hammer },
  { id: "labourer", name: "General Labourer", level: "Level 1", rate: 500, icon: Users },
  { id: "electrician", name: "Electrician", level: "Level 4", rate: 900, icon: Zap },
  { id: "plumber", name: "Plumber", level: "Level 4", rate: 800, icon: Wrench },
  { id: "painter", name: "Painter", level: "Level 3", rate: 700, icon: Paintbrush },
];

// Pool of actual bookable workers per role — pick exactly who you want
const WORKER_POOL = {
  contractor: [
    { id: "c1", name: "Vikram Singh Rathore", rating: 4.9 },
    { id: "c2", name: "Anil Kumar Verma", rating: 4.7 },
  ],
  mason: [
    { id: "m1", name: "Suresh Yadav", rating: 4.8 },
    { id: "m2", name: "Ramlal Chaudhary", rating: 4.6 },
    { id: "m3", name: "Devendra Prasad", rating: 4.7 },
    { id: "m4", name: "Mahesh Bhagat", rating: 4.5 },
  ],
  labourer: [
    { id: "l1", name: "Bablu Paswan", rating: 4.5 },
    { id: "l2", name: "Sunil Mahato", rating: 4.4 },
    { id: "l3", name: "Ravi Oraon", rating: 4.6 },
    { id: "l4", name: "Sanjay Kumar", rating: 4.3 },
    { id: "l5", name: "Dilip Manjhi", rating: 4.5 },
    { id: "l6", name: "Ashok Turi", rating: 4.4 },
    { id: "l7", name: "Birendra Rai", rating: 4.6 },
    { id: "l8", name: "Naresh Kisku", rating: 4.5 },
  ],
  electrician: [
    { id: "e1", name: "Rameshwar Sharma", rating: 4.9 },
    { id: "e2", name: "Mohammad Arif", rating: 4.7 },
  ],
  plumber: [
    { id: "p1", name: "Ganesh Pillai", rating: 4.8 },
    { id: "p2", name: "Irfan Sheikh", rating: 4.6 },
  ],
  painter: [
    { id: "pt1", name: "Deepak Rawat", rating: 4.6 },
    { id: "pt2", name: "Salim Ansari", rating: 4.5 },
  ],
};

// Default pre-selected workers (so the page isn't empty on load)
const DEFAULT_SELECTED = {
  contractor: ["c1"],
  mason: ["m1", "m2"],
  labourer: ["l1", "l2", "l3", "l4", "l5"],
  electrician: ["e1"],
  plumber: ["p1"],
  painter: [],
};

const JOB_TYPES = ["House Construction", "Renovation", "Commercial Fit-out", "Factory Setup"];

const getInitials = (name) => name.split(" ").map((n) => n[0]).slice(0, 2).join("");

export const TeamBuilderPage = () => {
  const [jobType, setJobType] = useState("House Construction");
  const [jobSize, setJobSize] = useState("");
  const [selected, setSelected] = useState(DEFAULT_SELECTED);

  const toggleWorker = (roleId, workerId) => {
    setSelected((prev) => {
      const current = prev[roleId] || [];
      const isSelected = current.includes(workerId);
      return {
        ...prev,
        [roleId]: isSelected
          ? current.filter((id) => id !== workerId)
          : [...current, workerId],
      };
    });
  };

  const totalWorkers = useMemo(
    () => Object.values(selected).reduce((sum, arr) => sum + arr.length, 0),
    [selected]
  );

  const totalCost = useMemo(
    () =>
      ROLES.reduce(
        (sum, role) => sum + role.rate * (selected[role.id]?.length || 0),
        0
      ),
    [selected]
  );

  return (
    <div className="px-4 sm:px-6 lg:px-6 py-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#141821]">Team &amp; Crew Builder</h1>
        <p className="text-sm text-slate-500 mt-1">
          Building or renovating? Pick exactly which workers you want on your crew.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Job details + worker picker */}
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

          {/* Worker picker per role */}
          <div className="space-y-4">
            {ROLES.map((role) => {
              const Icon = role.icon;
              const pool = WORKER_POOL[role.id] || [];
              const selectedIds = selected[role.id] || [];

              return (
                <div
                  key={role.id}
                  className="bg-white rounded-xl border border-orange-100 overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-orange-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedIds.length > 0
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#141821]">{role.name}</div>
                        <div className="text-xs text-slate-500">
                          {role.level} &middot; ₹{role.rate}/day each
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full">
                      {selectedIds.length} selected
                    </span>
                  </div>

                  <div className="p-4 flex flex-wrap gap-2">
                    {pool.map((worker) => {
                      const isSelected = selectedIds.includes(worker.id);
                      return (
                        <button
                          key={worker.id}
                          onClick={() => toggleWorker(role.id, worker.id)}
                          className={`flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-lg border text-left transition ${
                            isSelected
                              ? "bg-orange-600 border-orange-600 text-white"
                              : "bg-white border-orange-100 text-[#141821] hover:border-orange-300"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {isSelected ? <Check className="w-3 h-3" /> : getInitials(worker.name)}
                          </div>
                          <span className="text-xs font-medium">{worker.name}</span>
                          <span
                            className={`flex items-center gap-0.5 text-[11px] ${
                              isSelected ? "text-orange-100" : "text-slate-500"
                            }`}
                          >
                            <Star
                              className={`w-3 h-3 ${
                                isSelected ? "fill-white text-white" : "fill-orange-400 text-orange-400"
                              }`}
                            />
                            {worker.rating}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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

            <div className="space-y-3 mb-4 max-h-80 overflow-y-auto pr-1">
              {ROLES.filter((r) => (selected[r.id]?.length || 0) > 0).map((role) => {
                const pool = WORKER_POOL[role.id] || [];
                const chosen = pool.filter((w) => selected[role.id].includes(w.id));
                return (
                  <div key={role.id} className="bg-white/5 rounded-lg px-3 py-2.5">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="font-semibold text-orange-400">{role.name}</span>
                      <span className="font-mono text-slate-300">
                        ₹{(role.rate * chosen.length).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {chosen.map((worker) => (
                        <div
                          key={worker.id}
                          className="flex justify-between items-center text-[11px] text-slate-300"
                        >
                          <span>{worker.name}</span>
                          <span className="flex items-center gap-0.5 text-slate-400">
                            <Star className="w-2.5 h-2.5 fill-orange-400 text-orange-400" />
                            {worker.rating}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {totalWorkers === 0 && (
                <p className="text-xs text-slate-400 py-4 text-center">
                  Select workers from the left to build your crew.
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