import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, CheckCircle2, Clock, XCircle, AlertCircle, Filter } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { BookingCard } from "../../components/bookings/BookingCard";
import { EmptyState } from "../../components/common/EmptyState";
import { Button } from "../../components/common/Button";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

export const MyJobsPage = () => {
  const { bookings, updateBookingStatus } = useApp();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState("all");

  const handleAccept = (id) => {
    updateBookingStatus(id, "Accepted");
    addToast(`Job ${id} accepted! Added to scheduled calendar.`, "success");
  };

  const handleReject = (id) => {
    updateBookingStatus(id, "Cancelled");
    addToast(`Job ${id} declined.`, "info");
  };

  const handleStatusChange = (id, nextStatus) => {
    updateBookingStatus(id, nextStatus);
    addToast(`Job ${id} updated to ${nextStatus}!`, "success");
  };

  const tabs = [
    { id: "all", label: "All Jobs", count: bookings.length },
    { id: "pending", label: "Pending Requests", count: bookings.filter((b) => b.status === "Pending").length },
    { id: "active", label: "Accepted & In Progress", count: bookings.filter((b) => b.status === "Accepted" || b.status === "In Progress").length },
    { id: "completed", label: "Completed Orders", count: bookings.filter((b) => b.status === "Completed").length },
  ];

  const filteredJobs = bookings.filter((job) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return job.status === "Pending";
    if (activeTab === "active") return job.status === "Accepted" || job.status === "In Progress";
    if (activeTab === "completed") return job.status === "Completed";
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Jobs & Work Orders"
        subtitle="Review client requests, accept orders, and manage project execution milestones."
      />

      {/* Tabs Filter Header */}
      <div className="border-b border-gray-200 bg-white rounded-t-lg px-4 pt-2">
        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs font-semibold">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-2 border-b-2 flex items-center gap-2 cursor-pointer transition ${
                activeTab === tab.id
                  ? "border-[#C1502E] text-[#C1502E]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-[#C1502E] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredJobs.map((job) => (
            <BookingCard
              key={job.id}
              booking={job}
              isProView={true}
              onAccept={handleAccept}
              onReject={handleReject}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Briefcase}
          title={`No ${activeTab.replace("_", " ")} jobs found`}
          description="You do not have any job orders in this state right now."
        />
      )}
    </div>
  );
};
