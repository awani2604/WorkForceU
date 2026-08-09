import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Calendar,
  ShieldCheck
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

export const ApprenticeshipLogPage = () => {
  const { apprenticeshipLogs, addApprenticeshipLog, traineeProfile } = useApp();
  const { addToast } = useToast();

  const [logModalOpen, setLogModalOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("Concealed Conduit Wall Groove Cutting & PVC Piping");
  const [supervisorName, setSupervisorName] = useState("Mohammad Arif");
  const [supervisorLevel, setSupervisorLevel] = useState("Level 5 Supervisor");
  const [logDate, setLogDate] = useState("2026-08-09");
  const [hours, setHours] = useState(8);
  const [remarks, setRemarks] = useState("Assisted senior supervisor in 12-module metal box alignment and cutting conduit chases.");

  const supervisors = [
    { name: "Mohammad Arif", level: "Level 5 Supervisor", trade: "Masonry & Civil" },
    { name: "Rameshwar Sharma", level: "Level 4 Senior Worker", trade: "Electrician" },
    { name: "Gurpreet Singh", level: "Level 4 Senior Worker", trade: "Carpentry" },
  ];

  const handleSupervisorSelect = (sup) => {
    setSupervisorName(sup.name);
    setSupervisorLevel(sup.level);
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!jobTitle.trim() || !hours) return;

    addApprenticeshipLog({
      jobTitle,
      supervisorName,
      supervisorLevel,
      supervisorId: "w-sup",
      trade: "Electrical Assistance",
      hours: Number(hours),
      date: logDate,
      remarks,
    });

    addToast(`Logged ${hours} hours under mentor ${supervisorName}!`, "success");
    setLogModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="On-Site Apprenticeship Hours Log"
        subtitle="Record verified field work under licensed Level 4 & 5 mentors toward your Level 2 upgrade."
        breadcrumb={<span>Trainee &bull; Apprenticeship Log</span>}
        action={
          <Button
            variant="teal"
            size="md"
            icon={Plus}
            onClick={() => setLogModalOpen(true)}
          >
            Log New On-Site Hours
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-subtle">
          <span className="text-gray-500 block font-medium">Total Hours Logged</span>
          <span className="text-2xl font-bold text-[#141821] mt-1 block">
            {traineeProfile.completedHours} hrs
          </span>
          <span className="text-gray-400 mt-1 block">Target: 300 Hours</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-emerald-200 bg-emerald-50/30 shadow-subtle">
          <span className="text-emerald-800 block font-medium">Supervisor Approved</span>
          <span className="text-2xl font-bold text-[#1D8C6C] mt-1 block">
            {traineeProfile.approvedHours} hrs
          </span>
          <span className="text-emerald-700 mt-1 block">Verified on national registry</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-amber-200 bg-amber-50/30 shadow-subtle">
          <span className="text-amber-800 block font-medium">Pending Mentor Review</span>
          <span className="text-2xl font-bold text-amber-700 mt-1 block">
            {traineeProfile.pendingHours} hrs
          </span>
          <span className="text-amber-600 mt-1 block">Awaiting supervisor signature</span>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-subtle">
          <span className="text-gray-500 block font-medium">Hours for Level 2</span>
          <span className="text-2xl font-bold text-[#C1502E] mt-1 block">
            {Math.max(0, traineeProfile.requiredHours - traineeProfile.completedHours)} hrs
          </span>
          <span className="text-gray-400 mt-1 block">{traineeProfile.overallProgress}% Completed</span>
        </div>
      </div>

      {/* Apprenticeship Log Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-subtle overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#141821]">Verified Work History Entries</h3>
          <span className="text-xs text-gray-500">{apprenticeshipLogs.length} total recorded sessions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100/75 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Task Description</th>
                <th className="p-3.5">Supervisor Mentor</th>
                <th className="p-3.5">Hours</th>
                <th className="p-3.5">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {apprenticeshipLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/70 transition">
                  <td className="p-3.5 font-medium text-gray-900 whitespace-nowrap">{log.date}</td>
                  <td className="p-3.5 max-w-xs">
                    <p className="font-bold text-gray-900">{log.jobTitle}</p>
                    <p className="text-gray-500 text-[11px] mt-0.5">{log.remarks}</p>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <p className="font-semibold text-gray-900">{log.supervisorName}</p>
                    <p className="text-gray-400 text-[10px]">{log.supervisorLevel}</p>
                  </td>
                  <td className="p-3.5 font-bold text-[#141821] whitespace-nowrap">
                    {log.hours} Hours
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <StatusBadge status={log.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Hours Modal */}
      <Modal
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        title="Log On-Site Apprenticeship Hours"
        subtitle="Submit your supervised practical shift for mentor review"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLogModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="teal"
              size="sm"
              onClick={handleAddLog}
            >
              Submit Hours for Approval
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddLog} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-800 mb-1">Select Licensed Mentor / Supervisor *</label>
            <div className="space-y-2">
              {supervisors.map((sup) => (
                <button
                  key={sup.name}
                  type="button"
                  onClick={() => handleSupervisorSelect(sup)}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition cursor-pointer ${
                    supervisorName === sup.name
                      ? "border-[#1D8C6C] bg-emerald-50 text-emerald-950 font-bold"
                      : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div>
                    <span className="block font-bold">{sup.name}</span>
                    <span className="text-[10px] text-gray-500">{sup.level} &bull; {sup.trade}</span>
                  </div>
                  {supervisorName === sup.name && <CheckCircle2 className="w-4 h-4 text-[#1D8C6C]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-800 mb-1">Work Date *</label>
              <input
                type="date"
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-[#1D8C6C]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-1">Hours Worked *</label>
              <input
                type="number"
                min="1"
                max="12"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-[#1D8C6C]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Practical Task Description *</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Copper Earth Plate Grouting & Bentonite Slurry"
              className="w-full p-2 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-[#1D8C6C]"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Work Notes & Site Learnings</label>
            <textarea
              rows={2}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="What techniques and safety procedures did you observe?"
              className="w-full p-2 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-[#1D8C6C]"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
