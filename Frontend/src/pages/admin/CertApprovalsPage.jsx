import React, { useState } from "react";
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  UserCheck,
  FileCheck2,
  Filter,
  Eye
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

export const CertApprovalsPage = () => {
  const { certRequests, handleCertApproval } = useApp();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState("all");
  const [selectedReq, setSelectedReq] = useState(null);
  const [actionType, setActionType] = useState("approve"); // "approve" | "reject" | "view"
  const [modalOpen, setModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const filtered = certRequests.filter((req) => {
    if (activeTab === "pending") return req.status === "Pending";
    if (activeTab === "approved") return req.status === "Approved";
    if (activeTab === "rejected") return req.status === "Rejected";
    return true;
  });

  const openActionModal = (req, type) => {
    setSelectedReq(req);
    setActionType(type);
    setRejectReason("Applicant needs to log 30 additional verified on-site hours under an authorized supervisor.");
    setModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedReq) return;

    if (actionType === "approve") {
      handleCertApproval(selectedReq.id, "Approved");
      addToast(`Approved Level ${selectedReq.requestedLevel} (${selectedReq.requestedLevelTitle}) for ${selectedReq.traineeName}! Digital Skill Passport updated.`, "success");
    } else if (actionType === "reject") {
      handleCertApproval(selectedReq.id, "Rejected", rejectReason);
      addToast(`Request for ${selectedReq.traineeName} rejected. Feedback sent.`, "info");
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="NSQF Certification & Level Upgrades Queue"
        subtitle="Review trainee exam scores, verified apprenticeship logs, and supervisor endorsements."
        breadcrumb={<span>Admin &bull; Certification Approvals</span>}
      />

      {/* Tabs Filter Bar */}
      <div className="border-b border-gray-200 bg-white rounded-t-lg px-4 pt-2">
        <div className="flex gap-4 text-xs font-semibold">
          {[
            { id: "all", label: "All Requests", count: certRequests.length },
            { id: "pending", label: "Pending Approvals", count: certRequests.filter((r) => r.status === "Pending").length },
            { id: "approved", label: "Approved Upgrades", count: certRequests.filter((r) => r.status === "Approved").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-2 border-b-2 flex items-center gap-2 cursor-pointer transition ${
                activeTab === tab.id
                  ? "border-[#7C6BC4] text-[#7C6BC4]"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-[#7C6BC4] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="p-3.5">Candidate</th>
                <th className="p-3.5">Trade</th>
                <th className="p-3.5">Level Transition</th>
                <th className="p-3.5">Exam Score</th>
                <th className="p-3.5">Hours Logged</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/70 transition">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={req.traineePhoto}
                        alt={req.traineeName}
                        className="w-9 h-9 rounded-lg object-cover border border-gray-200"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{req.traineeName}</p>
                        <p className="text-gray-400 text-[11px]">Submitted {req.submittedDate}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5 font-semibold text-gray-800">{req.trade}</td>

                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px]">
                        L{req.currentLevel} {req.currentLevelTitle}
                      </span>
                      <span className="text-gray-400">&rarr;</span>
                      <span className="bg-[#7C6BC4] text-white px-2 py-0.5 rounded text-[11px] font-bold">
                        L{req.requestedLevel} {req.requestedLevelTitle}
                      </span>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className="font-bold text-[#1D8C6C] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {req.testScore}% Passed
                    </span>
                  </td>

                  <td className="p-3.5 font-semibold text-gray-900">
                    {req.apprenticeshipHoursLogged} Hours
                  </td>

                  <td className="p-3.5">
                    <StatusBadge status={req.status} size="sm" />
                  </td>

                  <td className="p-3.5 text-right whitespace-nowrap">
                    {req.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openActionModal(req, "reject")}
                          className="text-xs text-red-600 hover:bg-red-50"
                        >
                          Reject
                        </Button>
                        <Button
                          variant="purple"
                          size="sm"
                          onClick={() => openActionModal(req, "approve")}
                          className="text-xs"
                        >
                          Approve Upgrade
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Dialog Modal */}
      {selectedReq && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={
            actionType === "approve"
              ? `Approve NSQF Level ${selectedReq.requestedLevel} Certification`
              : "Decline Certification Upgrade"
          }
          subtitle={`Candidate: ${selectedReq.traineeName} &bull; Trade: ${selectedReq.trade}`}
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={actionType === "approve" ? "purple" : "danger"}
                size="sm"
                onClick={handleConfirmAction}
              >
                {actionType === "approve" ? "Confirm & Issue Official Level Upgrade" : "Confirm Rejection"}
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Requested Level:</span>
                <strong className="text-gray-900">
                  Level {selectedReq.requestedLevel} ({selectedReq.requestedLevelTitle})
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Exam Score:</span>
                <strong className="text-[#1D8C6C]">{selectedReq.testScore}% Verified Pass</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Apprenticeship Log:</span>
                <strong className="text-gray-900">{selectedReq.apprenticeshipHoursLogged} Hours Logged</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mentor Endorsement:</span>
                <strong className="text-gray-900">{selectedReq.supervisorRecommendation}</strong>
              </div>
            </div>

            {actionType === "reject" ? (
              <div>
                <label className="block font-bold text-gray-800 mb-1">
                  Reason for Rejection / Corrective Guidance *
                </label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
            ) : (
              <p className="text-gray-600 leading-relaxed">
                By approving, this candidate's <strong>Digital Skill Passport</strong> will be upgraded to <strong>Level {selectedReq.requestedLevel} ({selectedReq.requestedLevelTitle})</strong> on the national registry, and they will be eligible for customer bookings.
              </p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
