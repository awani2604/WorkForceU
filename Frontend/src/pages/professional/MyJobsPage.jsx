import React, { useState } from "react";
import {
  Check,
  AlertTriangle,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
  ChevronRight,
  CircleCheck,
  History,
  CircleAlert,
  User,
} from "lucide-react";

export const MyJobsPage = () => {
  const [activeTab, setActiveTab] = useState("active");

  const activeJobs = [
    {
      id: 1,
      title: "Residential Electrical Wiring",
      customer: "Arjun Mehta",
      location: "Patia, Bhubaneswar",
      date: "Today",
      time: "09:00 AM – 06:00 PM",
      status: "In Progress",
      amount: "₹2,500",
    },
    {
      id: 2,
      title: "Office Electrical Maintenance",
      customer: "Priya Enterprises",
      location: "Chandrasekharpur, Bhubaneswar",
      date: "Tomorrow",
      time: "10:00 AM – 05:00 PM",
      status: "Upcoming",
      amount: "₹3,200",
    },
    {
      id: 3,
      title: "Ceiling Fan & Switchboard Repair",
      customer: "Rahul Das",
      location: "Kalinga Nagar, Bhubaneswar",
      date: "24 Aug 2026",
      time: "11:00 AM – 02:00 PM",
      status: "Confirmed",
      amount: "₹1,200",
    },
  ];

  const historyJobs = [
    {
      id: 1,
      title: "Complete House Wiring",
      customer: "Amit Kumar",
      location: "Bhubaneswar",
      completedDate: "18 Aug 2026",
      amount: "₹4,500",
    },
    {
      id: 2,
      title: "Electrical Panel Repair",
      customer: "Sanjay Das",
      location: "Cuttack",
      completedDate: "15 Aug 2026",
      amount: "₹2,800",
    },
    {
      id: 3,
      title: "Commercial Lighting Installation",
      customer: "TechPark Solutions",
      location: "Patia, Bhubaneswar",
      completedDate: "10 Aug 2026",
      amount: "₹6,200",
    },
  ];

  return (
    <div className="min-h-full bg-[#f5f3ee]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-11 py-8 lg:py-10">

        {/* ================= HEADER ================= */}
        <div className="border-b border-[#ddd8ce] pb-7">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#fff7ed] border border-[#edc38d] flex items-center justify-center">
                  <BriefcaseBusiness className="w-5 h-5 text-[#b94e28]" />
                </div>

                <div>
                  <h1 className="text-3xl lg:text-[34px] font-bold tracking-tight text-[#202936]">
                    My Work
                  </h1>

                  <p className="text-[#617083] text-sm lg:text-base mt-1">
                    Manage your active jobs, work history and job issues
                  </p>
                </div>
              </div>

              {/* Orange underline */}
              <div className="w-16 h-1.5 bg-[#c1502e] rounded-full mt-5" />
            </div>

            {/* Summary */}
            <div className="flex items-center gap-3">
              <div className="bg-white border border-[#ddd8ce] rounded-lg px-5 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-[#617083]">
                  Active Jobs
                </p>

                <p className="text-2xl font-bold text-[#202936] mt-1">
                  {activeJobs.length}
                </p>
              </div>

              <div className="bg-[#c1502e] text-white rounded-lg px-5 py-3 shadow-[4px_4px_0_#202936]">
                <p className="text-xs uppercase tracking-wider text-white/80">
                  Completed
                </p>

                <p className="text-2xl font-bold mt-1">
                  24
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="mt-8">
          <div className="bg-[#ece9e2] border border-[#ddd8ce] p-1.5 rounded-xl flex w-full max-w-2xl">

            {/* ACTIVE */}
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                activeTab === "active"
                  ? "bg-[#202936] text-white shadow-md"
                  : "text-[#617083] hover:text-[#202936]"
              }`}
            >
              <BriefcaseBusiness className="w-4 h-4" />
              Active
            </button>

            {/* HISTORY */}
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                activeTab === "history"
                  ? "bg-[#202936] text-white shadow-md"
                  : "text-[#617083] hover:text-[#202936]"
              }`}
            >
              <History className="w-4 h-4" />
              History
            </button>

            {/* PROBLEMS */}
            <button
              onClick={() => setActiveTab("problems")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                activeTab === "problems"
                  ? "bg-[#202936] text-white shadow-md"
                  : "text-[#617083] hover:text-[#202936]"
              }`}
            >
              <CircleAlert className="w-4 h-4" />
              Problems
            </button>
          </div>
        </div>

        {/* ================= ACTIVE JOBS ================= */}
        {activeTab === "active" && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#202936]">
                  Active Jobs
                </h2>

                <p className="text-sm text-[#617083] mt-1">
                  Jobs currently assigned to you
                </p>
              </div>

              <span className="text-sm font-semibold text-[#b94e28]">
                {activeJobs.length} Jobs
              </span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-[#ddd8ce] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between p-5 border-b border-[#eee9df]">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#fff4e8] border border-[#edc38d] flex items-center justify-center shrink-0">
                        <BriefcaseBusiness className="w-5 h-5 text-[#b94e28]" />
                      </div>

                      <div>
                        <h3 className="font-bold text-[#202936] text-base sm:text-lg">
                          {job.title}
                        </h3>

                        <div className="flex items-center gap-2 mt-1">
                          <User className="w-3.5 h-3.5 text-[#b94e28]" />

                          <p className="text-sm text-[#617083]">
                            {job.customer}
                          </p>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-md border ${
                        job.status === "In Progress"
                          ? "bg-[#eef8f4] text-[#27735f] border-[#b8dfd1]"
                          : job.status === "Upcoming"
                          ? "bg-[#fff8e8] text-[#a66a12] border-[#efd9a7]"
                          : "bg-[#eef3fb] text-[#41688e] border-[#c8d9ec]"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  {/* Job Information */}
                  <div className="p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#f3f5f7] flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-[#617083]" />
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-[#8a94a2]">
                            Location
                          </p>

                          <p className="text-sm font-medium text-[#202936] mt-1">
                            {job.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#f3f5f7] flex items-center justify-center">
                          <CalendarDays className="w-4 h-4 text-[#617083]" />
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-[#8a94a2]">
                            Schedule
                          </p>

                          <p className="text-sm font-medium text-[#202936] mt-1">
                            {job.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#f3f5f7] flex items-center justify-center">
                          <Clock3 className="w-4 h-4 text-[#617083]" />
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-[#8a94a2]">
                            Time
                          </p>

                          <p className="text-sm font-medium text-[#202936] mt-1">
                            {job.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#fff4e8] flex items-center justify-center">
                          <span className="text-[#b94e28] font-bold">₹</span>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-[#8a94a2]">
                            Estimated Earnings
                          </p>

                          <p className="text-sm font-bold text-[#b94e28] mt-1">
                            {job.amount}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <button className="w-full mt-6 flex items-center justify-center gap-2 bg-[#c1502e] hover:bg-[#a94124] text-white font-semibold py-3 rounded-lg shadow-[3px_3px_0_#202936] transition-all">
                      View Job Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= HISTORY ================= */}
        {activeTab === "history" && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#202936]">
                  Work History
                </h2>

                <p className="text-sm text-[#617083] mt-1">
                  Your recently completed jobs
                </p>
              </div>

              <span className="text-sm font-semibold text-[#b94e28]">
                24 Completed
              </span>
            </div>

            <div className="bg-white border border-[#ddd8ce] rounded-xl overflow-hidden shadow-sm">
              {historyJobs.map((job, index) => (
                <div
                  key={job.id}
                  className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
                    index !== historyJobs.length - 1
                      ? "border-b border-[#eee9df]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#eef8f4] border border-[#b8dfd1] flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#27735f]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#202936]">
                        {job.title}
                      </h3>

                      <p className="text-sm text-[#617083] mt-1">
                        {job.customer} • {job.location}
                      </p>

                      <p className="text-xs text-[#8a94a2] mt-1">
                        Completed on {job.completedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase tracking-wide text-[#8a94a2]">
                        Earnings
                      </p>

                      <p className="text-lg font-bold text-[#b94e28]">
                        {job.amount}
                      </p>
                    </div>

                    <button className="w-10 h-10 rounded-lg border border-[#ddd8ce] hover:bg-[#f5f3ee] flex items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-[#617083]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PROBLEMS ================= */}
        {activeTab === "problems" && (
          <div className="mt-8">
            <div className="bg-white border border-[#ddd8ce] rounded-xl min-h-[500px] sm:min-h-[580px] flex flex-col items-center justify-center text-center shadow-sm px-6">

              {/* Icon */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#f1f3f5] border border-[#e1e5e9] flex items-center justify-center mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[4px] border-[#8a94a2] flex items-center justify-center">
                  <CircleCheck className="w-11 h-11 sm:w-14 sm:h-14 text-[#617083]" />
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#202936]">
                No Issues
              </h2>

              <p className="text-base sm:text-xl text-[#7b8593] mt-4 max-w-md">
                All your jobs are running smoothly.
              </p>

              <div className="mt-8 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#eef8f4] border border-[#b8dfd1] text-[#27735f] text-sm font-semibold">
                <Check className="w-4 h-4" />
                Everything looks good
              </div>
            </div>
          </div>
        )}

        {/* ================= QUICK STATUS ================= */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#ddd8ce] rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-[#7b8593]">
              Active Jobs
            </p>

            <p className="text-3xl font-bold text-[#202936] mt-2">
              {activeJobs.length}
            </p>

            <p className="text-sm text-[#617083] mt-2">
              Currently scheduled
            </p>
          </div>

          <div className="bg-white border border-[#ddd8ce] rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-[#7b8593]">
              Completed
            </p>

            <p className="text-3xl font-bold text-[#202936] mt-2">
              24
            </p>

            <p className="text-sm text-[#617083] mt-2">
              Jobs completed successfully
            </p>
          </div>

          <div className="bg-white border border-[#b8dfd1] rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-[#7b8593]">
              Job Health
            </p>

            <div className="flex items-center gap-2 mt-2">
              <Check className="w-6 h-6 text-[#27735f]" />

              <p className="text-2xl font-bold text-[#202936]">
                Excellent
              </p>
            </div>

            <p className="text-sm text-[#617083] mt-2">
              No unresolved issues
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};