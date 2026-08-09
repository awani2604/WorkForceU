import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Award,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { StatCard } from "../../components/common/StatCard";
import { Button } from "../../components/common/Button";
import { LevelLadder } from "../../components/passport/LevelLadder";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

export const TraineeDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { traineeProfile, modules, apprenticeshipLogs } = useApp();

  const completedModules = modules.filter((m) => m.status === "Completed");
  const inProgressModules = modules.filter((m) => m.status === "In Progress");

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${traineeProfile.name}!`}
        subtitle={`${traineeProfile.trade} Apprentice &bull; Current Level: ${traineeProfile.currentLevelTitle}`}
        action={
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="md"
              icon={FileText}
              onClick={() => navigate("/trainee/apprenticeship")}
              className="bg-white text-xs sm:text-sm"
            >
              Log Work Hours
            </Button>
            <Button
              variant="teal"
              size="md"
              icon={BookOpen}
              onClick={() => navigate("/trainee/learning")}
              className="text-xs sm:text-sm"
            >
              Continue Learning
            </Button>
          </div>
        }
      />

      {/* Target Level Upgrade Goal Banner */}
      <div className="bg-[#141821] text-white rounded-lg p-6 sm:p-7 border border-gray-800 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D8C6C] bg-[#1e2330] px-2.5 py-0.5 rounded border border-gray-700">
            <Sparkles className="w-3.5 h-3.5 text-[#F2B705]" />
            Level Upgrade Pipeline
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Level {traineeProfile.currentLevel} ({traineeProfile.currentLevelTitle}) &rarr; Level {traineeProfile.targetLevel} ({traineeProfile.targetLevelTitle})
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Complete the remaining 60 on-site apprenticeship hours and pass the certification quiz to unlock Level 2 Assistant status on the national registry.
          </p>

          {/* Progress bar */}
          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-300 font-semibold mb-1">
              <span>Overall Apprenticeship Progress</span>
              <span className="text-[#1D8C6C]">{traineeProfile.completedHours} / {traineeProfile.requiredHours} Hours ({traineeProfile.overallProgress}%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-gray-700 overflow-hidden">
              <div
                className="h-full bg-[#1D8C6C] rounded-full transition-all duration-500"
                style={{ width: `${traineeProfile.overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link to="/trainee/quiz">
            <Button variant="rust" size="md" className="font-bold">
              Take Level 2 Quiz &rarr;
            </Button>
          </Link>
          <Link to="/trainee/passport">
            <Button variant="teal" size="md">
              View Trainee Passport
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Skill Level"
          value={`Level ${traineeProfile.currentLevel}`}
          subtitle={traineeProfile.currentLevelTitle}
          icon={Award}
          color="teal"
        />
        <StatCard
          title="Apprenticeship Hours"
          value={`${traineeProfile.completedHours} hrs`}
          subtitle={`${traineeProfile.approvedHours} hrs supervisor approved`}
          icon={Clock}
          color="dark"
        />
        <StatCard
          title="Modules Completed"
          value={`${completedModules.length} / ${modules.length}`}
          subtitle="Digital curriculum"
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Course Subscription"
          value="Active PMKVY"
          subtitle="Govt subsidized plan"
          icon={ShieldCheck}
          color="rust"
        />
      </div>

      {/* National Skill Ladder */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#141821]">Trainee NSQF Skill Ladder</h3>
            <p className="text-xs text-gray-500">Your current qualification step on the official national framework</p>
          </div>
          <Link to="/trainee/passport">
            <span className="text-xs font-semibold text-[#1D8C6C] hover:underline">
              Inspect Passport &rarr;
            </span>
          </Link>
        </div>
        <LevelLadder currentLevel={traineeProfile.currentLevel} />
      </div>

      {/* Active Learning & Apprenticeship Logs Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Next Modules to Complete (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-[#141821]">Active Digital Learning Modules</h3>
              <p className="text-xs text-gray-500">Continue where you left off</p>
            </div>
            <Link to="/trainee/learning">
              <span className="text-xs font-semibold text-[#1D8C6C] hover:underline">
                View All &rarr;
              </span>
            </Link>
          </div>

          <div className="space-y-3">
            {modules.slice(0, 3).map((mod) => (
              <div
                key={mod.id}
                onClick={() => navigate("/trainee/learning")}
                className="p-3.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-[#1D8C6C] transition cursor-pointer text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-gray-900 text-sm">{mod.title}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      mod.status === "Completed"
                        ? "bg-emerald-100 text-[#1D8C6C]"
                        : mod.status === "In Progress"
                        ? "bg-blue-100 text-[#2E6FB0]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {mod.status}
                  </span>
                </div>
                <p className="text-gray-500 text-[11px] line-clamp-1">{mod.description}</p>
                <div className="flex items-center justify-between text-[11px] text-gray-600 pt-1">
                  <span>{mod.duration}</span>
                  <span className="font-bold">{mod.progress}% Progress</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Apprenticeship Logs (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-[#141821]">Recent On-Site Logs</h3>
              <p className="text-xs text-gray-500">Supervised work records</p>
            </div>
            <Link to="/trainee/apprenticeship">
              <span className="text-xs font-semibold text-[#1D8C6C] hover:underline">
                Full Log &rarr;
              </span>
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {apprenticeshipLogs.slice(0, 3).map((log) => (
              <div key={log.id} className="p-3 rounded-lg border border-gray-200 bg-gray-50/70 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">{log.hours} Hours Logged</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      log.status === "Approved"
                        ? "bg-emerald-100 text-[#1D8C6C]"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
                <p className="text-gray-600 text-[11px] truncate">{log.jobTitle}</p>
                <p className="text-gray-400 text-[10px]">Mentor: {log.supervisorName} &bull; {log.date}</p>
              </div>
            ))}

            <Link to="/trainee/apprenticeship" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full text-xs">
                + Add New Log Entry
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
