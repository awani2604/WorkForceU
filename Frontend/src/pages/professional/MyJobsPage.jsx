import React, { useState } from "react";
import {
  Briefcase,
  History,
  AlertCircle,
  MapPin,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ChevronRight,
  IndianRupee,
} from "lucide-react";

import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Button } from "../../components/common/Button";

export const MyJobsPage = () => {
  const { bookings, updateBookingStatus } = useApp();
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState("active");

  const activeJobs = bookings.filter(
    (booking) =>
      booking.status === "Accepted" ||
      booking.status === "In Progress" ||
      booking.status === "Pending"
  );

  const completedJobs = bookings.filter(
    (booking) => booking.status === "Completed"
  );

  const problemJobs = bookings.filter(
    (booking) =>
      booking.status === "Cancelled" ||
      booking.status === "Problem"
  );

  const getCurrentJobs = () => {
    if (activeTab === "active") return activeJobs;
    if (activeTab === "history") return completedJobs;
    if (activeTab === "problems") return problemJobs;

    return [];
  };

  const handleStartJob = (id) => {
    updateBookingStatus(id, "In Progress");

    addToast("Job marked as In Progress.", "success");
  };

  const handleCompleteJob = (id) => {
    updateBookingStatus(id, "Completed");

    addToast("Job marked as Completed.", "success");
  };

  const jobsToShow = getCurrentJobs();

  const proName = currentUser?.name || "Rameshwar Sharma";

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg border border-[#E6C79B] bg-[#FFF9F0] flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#C1502E]" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#141821]">
                  My Work
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Manage your active jobs, work history and job issues
                </p>
              </div>
            </div>

            <div className="w-24 h-1 bg-[#C1502E] rounded-full mt-5" />
          </div>

          {/* JOB COUNTERS */}
          <div className="flex gap-3">
            <div className="bg-white border border-gray-200 rounded-lg px-5 py-3 min-w-[145px] shadow-subtle">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                Active Jobs
              </p>

              <p className="text-2xl font-bold text-[#141821] mt-1">
                {activeJobs.length}
              </p>
            </div>

            <div className="bg-[#C1502E] border border-[#C1502E] rounded-lg px-5 py-3 min-w-[145px] shadow-subtle">
              <p className="text-xs uppercase tracking-wider text-orange-100">
                Completed
              </p>

              <p className="text-2xl font-bold text-white mt-1">
                {completedJobs.length || 24}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-4xl">
        <div className="grid grid-cols-3 bg-white border border-gray-200 rounded-xl p-1.5">

          <button
            onClick={() => setActiveTab("active")}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition ${
              activeTab === "active"
                ? "bg-[#2B3442] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Active
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition ${
              activeTab === "history"
                ? "bg-[#2B3442] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <History className="w-4 h-4" />
            History
          </button>

          <button
            onClick={() => setActiveTab("problems")}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition ${
              activeTab === "problems"
                ? "bg-[#2B3442] text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            Problems
          </button>
        </div>
      </div>

      {/* ACTIVE JOBS */}
      {activeTab === "active" && (
        <div>
          <div className="flex items-center justify-between mb-4">

            <div>
              <h2 className="text-lg font-bold text-[#141821]">
                Active Jobs
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Jobs currently assigned to you
              </p>
            </div>

            <span className="text-sm font-semibold text-[#C1502E]">
              {activeJobs.length} Jobs
            </span>
          </div>

          {jobsToShow.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {jobsToShow.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onStartJob={handleStartJob}
                  onCompleteJob={handleCompleteJob}
                />
              ))}

            </div>
          ) : (
            <EmptyState
              icon={<Briefcase className="w-7 h-7 text-gray-400" />}
              title="No Active Jobs"
              message="You don't have any active jobs at the moment."
            />
          )}
        </div>
      )}

      {/* HISTORY */}
      {activeTab === "history" && (
        <div>
          <div className="flex items-center justify-between mb-4">

            <div>
              <h2 className="text-lg font-bold text-[#141821]">
                Work History
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View your completed jobs and earnings
              </p>
            </div>

            <span className="text-sm font-semibold text-[#C1502E]">
              {completedJobs.length || 24} Completed
            </span>
          </div>

          {completedJobs.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {completedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  history
                />
              ))}

            </div>
          ) : (
            <EmptyState
              icon={<History className="w-7 h-7 text-gray-400" />}
              title="No Completed Jobs"
              message="Your completed work history will appear here."
            />
          )}
        </div>
      )}

      {/* PROBLEMS */}
      {activeTab === "problems" && (
        <div>
          <div className="flex items-center justify-between mb-4">

            <div>
              <h2 className="text-lg font-bold text-[#141821]">
                Job Problems
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Jobs that require attention or resolution
              </p>
            </div>

            <span className="text-sm font-semibold text-[#C1502E]">
              {problemJobs.length} Issues
            </span>
          </div>

          {problemJobs.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {problemJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  problem
                />
              ))}

            </div>
          ) : (
            <EmptyState
              icon={<CheckCircle2 className="w-7 h-7 text-[#1D8C6C]" />}
              title="No Issues"
              message="All your jobs are running smoothly."
            />
          )}
        </div>
      )}
    </div>
  );
};


/* =====================================================
   JOB CARD
===================================================== */

const JobCard = ({
  job,
  onStartJob,
  onCompleteJob,
  history = false,
  problem = false,
}) => {
  const status = job.status || "Pending";

  const clientName =
    job.customerName ||
    job.clientName ||
    job.customer ||
    "Client";

  const jobTitle =
    job.serviceName ||
    job.title ||
    job.service ||
    "Professional Service";

  const location =
    job.location ||
    job.address ||
    "Location not available";

  const date =
    job.date ||
    job.scheduledDate ||
    "Schedule pending";

  const time =
    job.time ||
    job.scheduledTime ||
    "Time not specified";

  const amount =
    job.total ||
    job.amount ||
    job.price ||
    "0";

  const description =
    job.description ||
    "Job details will be available here.";

  const getStatusStyle = () => {
    if (status === "In Progress") {
      return "bg-[#E8F3F1] text-[#1D8C6C] border-[#B7DDD3]";
    }

    if (status === "Accepted") {
      return "bg-blue-50 text-[#2E6FB0] border-blue-200";
    }

    if (status === "Pending") {
      return "bg-[#FFF7E6] text-[#A66A12] border-[#EBCB8B]";
    }

    if (status === "Completed") {
      return "bg-[#E8F3F1] text-[#1D8C6C] border-[#B7DDD3]";
    }

    return "bg-red-50 text-red-600 border-red-200";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-subtle overflow-hidden">

      {/* TOP */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-4">

          <div className="flex gap-3 min-w-0">

            <div className="w-11 h-11 shrink-0 rounded-lg bg-[#FFF9F0] border border-[#E6C79B] flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#C1502E]" />
            </div>

            <div className="min-w-0">

              <h3 className="text-base font-bold text-[#141821] leading-6">
                {jobTitle}
              </h3>

              <div className="flex items-center gap-2 mt-1">

                <User className="w-3.5 h-3.5 text-[#C1502E]" />

                <span className="text-sm text-gray-500 truncate">
                  {clientName}
                </span>

              </div>

            </div>

          </div>

          <span
            className={`shrink-0 px-3 py-1.5 rounded-md border text-xs font-semibold ${getStatusStyle()}`}
          >
            {status}
          </span>

        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="mx-5 mb-4 bg-gray-50 border border-gray-200 rounded-lg p-4">

        <p className="text-sm font-semibold text-[#141821] mb-1">
          Job Details
        </p>

        <p className="text-sm text-gray-600 leading-6">
          {description}
        </p>

      </div>

      {/* JOB INFO */}
      <div className="border-t border-gray-100 px-5 py-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="flex items-start gap-2">

            <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Location
              </p>

              <p className="text-sm text-[#141821] mt-1">
                {location}
              </p>
            </div>

          </div>

          <div className="flex items-start gap-2">

            <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Schedule
              </p>

              <p className="text-sm text-[#141821] mt-1">
                {date}
              </p>

            </div>

          </div>

          <div className="flex items-start gap-2">

            <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Time
              </p>

              <p className="text-sm text-[#141821] mt-1">
                {time}
              </p>
            </div>

          </div>

          <div className="flex items-start gap-2">

            <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
              <IndianRupee className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Earnings
              </p>

              <p className="text-sm font-semibold text-[#141821] mt-1">
                ₹{amount}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ACTIONS */}
      {!history && !problem && (
        <div className="border-t border-gray-100 px-5 py-4 flex items-center justify-between gap-3">

          <span className="text-xs text-gray-500">
            Status:
            <span className="font-semibold text-[#141821] ml-1">
              {status}
            </span>
          </span>

          <div className="flex gap-2">

            {status === "Accepted" && (
              <Button
                variant="rust"
                size="sm"
                className="text-xs"
                onClick={() => onStartJob(job.id)}
              >
                Start Job
              </Button>
            )}

            {status === "In Progress" && (
              <Button
                variant="rust"
                size="sm"
                className="text-xs"
                onClick={() => onCompleteJob(job.id)}
              >
                Complete Job
              </Button>
            )}

            {status === "Pending" && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
              >
                View Request
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            )}

          </div>

        </div>
      )}

      {history && (
        <div className="border-t border-gray-100 px-5 py-4 flex items-center justify-between">

          <span className="text-xs text-gray-500">
            Job Status:
            <span className="font-semibold text-[#1D8C6C] ml-1">
              Completed
            </span>
          </span>

          <CheckCircle2 className="w-5 h-5 text-[#1D8C6C]" />

        </div>
      )}

      {problem && (
        <div className="border-t border-gray-100 px-5 py-4 flex items-center justify-between">

          <span className="text-xs text-red-600 font-medium">
            This job requires attention
          </span>

          <Button
            variant="outline"
            size="sm"
            className="text-xs"
          >
            View Issue
          </Button>

        </div>
      )}

    </div>
  );
};


/* =====================================================
   EMPTY STATE
===================================================== */

const EmptyState = ({ icon, title, message }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg py-16 text-center">

      <div className="w-14 h-14 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-4">
        {icon}
      </div>

      <h3 className="text-base font-bold text-[#141821]">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        {message}
      </p>

    </div>
  );
};