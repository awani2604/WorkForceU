import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Award,
  ShieldCheck,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { StatCard } from "../../components/common/StatCard";
import { Button } from "../../components/common/Button";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { adminStats, certRequests } = useApp();

  const pendingCertsCount = certRequests.filter((r) => r.status === "Pending").length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Platform Operations Console"
        subtitle="National workforce governance, NSQF certification approvals, and escrow ledger monitoring."
        action={
          <Button
            variant="purple"
            size="md"
            icon={Award}
            onClick={() => navigate("/admin/certifications")}
          >
            Review Certification Queue ({pendingCertsCount})
          </Button>
        }
      />

      {/* Pending Certifications Action Callout */}
      {pendingCertsCount > 0 && (
        <div className="bg-[#141821] text-white rounded-lg p-5 border border-gray-800 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7C6BC4] text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {pendingCertsCount} Trainee Skill Level Upgrades Pending Approval
              </h3>
              <p className="text-xs text-gray-300">
                Trainees have passed exam requirements and logged required supervised on-site hours.
              </p>
            </div>
          </div>
          <Link to="/admin/certifications">
            <Button variant="purple" size="sm" className="shrink-0 text-xs">
              Open Approval Queue &rarr;
            </Button>
          </Link>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Users"
          value={adminStats.totalUsers.toLocaleString()}
          subtitle="8,650 Workers &bull; 4,920 Clients"
          icon={Users}
          color="purple"
          trend="+18.4%"
        />
        <StatCard
          title="Pending Certifications"
          value={pendingCertsCount.toString()}
          subtitle="Level 2 to Level 6 upgrades"
          icon={Award}
          color="rust"
        />
        <StatCard
          title="Aadhaar e-KYC Queue"
          value={adminStats.pendingVerifications.toString()}
          subtitle="Identity validation"
          icon={ShieldCheck}
          color="teal"
        />
        <StatCard
          title="Active Live Bookings"
          value={adminStats.activeBookings.toString()}
          subtitle={adminStats.totalPlatformVolume}
          icon={CalendarCheck}
          color="blue"
        />
      </div>

      {/* Two Column Layout: Recent Users & Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Registrations Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-gray-200 shadow-subtle overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#141821]">Recent User Registrations</h3>
            <span className="text-xs text-gray-500">Live platform feed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Joined</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adminStats.recentUsers.map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50/70 transition">
                    <td className="p-3 font-bold text-gray-900">{user.name}</td>
                    <td className="p-3 font-semibold text-gray-700">{user.role}</td>
                    <td className="p-3 text-gray-500">{user.location}</td>
                    <td className="p-3 text-gray-400">{user.joined}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          user.status === "Active"
                            ? "bg-emerald-100 text-[#1D8C6C]"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Log / Platform Activity (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-4">
          <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#141821] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#7C6BC4]" />
              Platform Audit Stream
            </h3>
            <span className="text-xs text-gray-400">System Logs</span>
          </div>

          <div className="space-y-3 text-xs">
            {adminStats.auditActivity.map((act, i) => (
              <div key={i} className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">{act.action}</span>
                  <span className="text-gray-400 text-[10px]">{act.time}</span>
                </div>
                <p className="text-gray-600 text-[11px]">{act.user}</p>
                <p className="text-gray-400 text-[10px]">Actor: {act.admin}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
