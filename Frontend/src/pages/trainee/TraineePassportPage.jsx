import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Award,
  ShieldCheck,
  QrCode,
  CheckCircle2,
  FileCheck2,
  Clock,
  BookOpen,
  HelpCircle,
  Download,
  Share2
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { LevelLadder } from "../../components/passport/LevelLadder";
import { Button } from "../../components/common/Button";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

export const TraineePassportPage = () => {
  const navigate = useNavigate();
  const { traineeProfile } = useApp();
  const { addToast } = useToast();

  const handleDownload = () => {
    addToast("Trainee Skill Passport PDF generated for download!", "success");
  };

  const handleShare = () => {
    addToast("Passport verification link copied to clipboard!", "info");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Trainee Digital Skill Passport"
        subtitle="National NSQF-aligned credentials, logged apprenticeship hours, and exam scores."
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Share2}
              onClick={handleShare}
              className="bg-white text-xs"
            >
              Share
            </Button>
            <Button
              variant="teal"
              size="sm"
              icon={Download}
              onClick={handleDownload}
              className="text-xs"
            >
              Download PDF Passport
            </Button>
          </div>
        }
      />

      {/* Main Trainee Passport Container */}
      <div className="bg-white rounded-lg border-2 border-gray-300 shadow-card overflow-hidden">
        {/* Passport Header Bar */}
        <div className="bg-[#141821] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1D8C6C] flex items-center justify-center font-black text-white text-xs tracking-wider">
              SBI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                  Trainee Digital Skill Passport
                </span>
                <span className="text-[10px] bg-[#1D8C6C] text-white px-2 py-0.5 rounded font-semibold">
                  GOVT PMKVY ALIGNED
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                National Apprenticeship Training Scheme (NATS) Registered
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-300 bg-[#252b3b] px-3 py-1 rounded border border-gray-700">
            <QrCode className="w-3.5 h-3.5 text-[#F2B705]" />
            <span>ID: SBI-TR-901</span>
          </div>
        </div>

        {/* Identity & Progress Body */}
        <div className="p-6 space-y-6">
          {/* Identity */}
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <img
              src={traineeProfile.photo}
              alt={traineeProfile.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover border-2 border-gray-200 shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#141821] flex items-center gap-2">
                    {traineeProfile.name}
                    <ShieldCheck className="w-5 h-5 text-[#1D8C6C]" />
                  </h2>
                  <p className="text-sm font-semibold text-[#1D8C6C] mt-0.5">
                    {traineeProfile.trade} Apprentice &bull; {traineeProfile.currentLevelTitle} (Level {traineeProfile.currentLevel})
                  </p>
                </div>

                <span className="text-xs bg-[#E6F4EA] text-[#1D8C6C] font-bold px-3 py-1 rounded border border-[#1D8C6C]/30">
                  {traineeProfile.verificationStatus}
                </span>
              </div>

              <div className="mt-3 text-xs text-gray-600 space-y-1">
                <p>Phone: <strong>{traineeProfile.phone}</strong> &bull; Email: <strong>{traineeProfile.email}</strong></p>
                <p>Subscription: <strong className="text-[#1D8C6C]">{traineeProfile.subscriptionStatus}</strong> (Valid till {traineeProfile.subscriptionExpiry})</p>
              </div>
            </div>
          </div>

          {/* Level Ladder */}
          <div className="bg-[#F7F4EA] p-4 rounded-lg border border-amber-200">
            <LevelLadder currentLevel={traineeProfile.currentLevel} />
          </div>

          {/* Apprenticeship Hours Meter */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#141821] uppercase tracking-wider">
                  Apprenticeship Hours Progress (Target Level 2)
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Requires 300 verified on-site hours under licensed supervisors
                </p>
              </div>
              <span className="text-sm font-bold text-[#1D8C6C]">
                {traineeProfile.completedHours} / {traineeProfile.requiredHours} Hours
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-[#1D8C6C] rounded-full transition-all duration-500"
                style={{ width: `${traineeProfile.overallProgress}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="p-2 bg-white rounded border border-gray-200">
                <span className="text-gray-400 text-[10px] block">Approved Hours</span>
                <strong className="text-emerald-700 text-sm font-bold">{traineeProfile.approvedHours} hrs</strong>
              </div>
              <div className="p-2 bg-white rounded border border-gray-200">
                <span className="text-gray-400 text-[10px] block">Pending Review</span>
                <strong className="text-amber-700 text-sm font-bold">{traineeProfile.pendingHours} hrs</strong>
              </div>
              <div className="p-2 bg-white rounded border border-gray-200">
                <span className="text-gray-400 text-[10px] block">Hours Remaining</span>
                <strong className="text-[#141821] text-sm font-bold">{traineeProfile.requiredHours - traineeProfile.completedHours} hrs</strong>
              </div>
            </div>
          </div>

          {/* Exam Scores & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#141821] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C1502E]" />
                Issued Certifications
              </h4>
              <div className="space-y-2">
                {traineeProfile.certifications.map((cert) => (
                  <div key={cert.id} className="p-3 bg-white rounded-lg border border-gray-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{cert.name}</span>
                      <span className="text-[10px] bg-emerald-100 text-[#1D8C6C] px-2 py-0.5 rounded font-bold">
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-[11px]">
                      {cert.issuer} &bull; Cert No: {cert.certNo}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Results */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#141821] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#2E6FB0]" />
                NSQF Examination Records
              </h4>
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">Level 2 Safety & Fundamentals</span>
                  <span className="font-bold text-[#1D8C6C] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    PASSED ({traineeProfile.quizScore}%)
                  </span>
                </div>
                <p className="text-gray-500 text-[11px]">
                  Evaluated on 5 technical safety standards under Indian Code IS 732.
                </p>
                <Link to="/trainee/quiz" className="block pt-1">
                  <span className="text-[#2E6FB0] font-semibold hover:underline">
                    Retake or Review Exam &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* QR Verification Security Box */}
          <div className="p-4 bg-[#EAF1FB] rounded-lg border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2E6FB0]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded border border-blue-300">
                <QrCode className="w-8 h-8 text-[#141821]" />
              </div>
              <div>
                <p className="font-bold text-[#141821]">Digital Verification QR</p>
                <p className="text-gray-600 text-[11px]">
                  Any prospective employer or supervisor can scan to verify Bablu's logged hours and certs on the national database.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="bg-white text-xs whitespace-nowrap"
            >
              Copy Verification URL
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
