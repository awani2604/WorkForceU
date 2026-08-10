import React from "react";
import {
  ShieldCheck,
  Clock,
  Briefcase,
  Award,
  CheckCircle2,
  QrCode,
  MapPin,
  FileCheck2,
} from "lucide-react";
import { LevelLadder } from "./LevelLadder";
import { RatingStars } from "../common/RatingStars";
import { Button } from "../common/Button";

export const SkillPassport = ({
  worker,
  showActions = true,
  onBook = null,
  isOwnPassport = false,
  className = ""
}) => {
  if (!worker) return null;

  return (
    <div className={`bg-white rounded-lg border-2 border-gray-300 shadow-card overflow-hidden ${className}`}>
      {/* Passport National Header Bar */}
      <div className="bg-[#141821] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#C1502E] flex items-center justify-center font-black text-white text-xs tracking-wider">
            WF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                Digital Skill Passport
              </span>
              <span className="text-[10px] bg-[#1D8C6C] text-white px-2 py-0.5 rounded font-semibold">
                GOVT RECOGNIZED
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              National Skills Qualifications Framework (NSQF) Aligned
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-gray-300 bg-[#252b3b] px-3 py-1 rounded border border-gray-700">
          <QrCode className="w-3.5 h-3.5 text-[#F2B705]" />
          <span>ID: WF-{worker.id?.toUpperCase() || "W-101"}</span>
        </div>
      </div>

      {/* Main Passport Content */}
      <div className="p-6 space-y-6">
        {/* Worker Identity Section */}
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="relative">
            <img
              src={worker.photo}
              alt={worker.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover border-2 border-gray-200 shadow-sm"
            />
            {worker.verified && (
              <div
                className="absolute -bottom-2 -right-2 bg-[#1D8C6C] text-white p-1 rounded-full shadow-sm"
                title="Verified Skill Identity"
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#141821] flex items-center gap-2">
                  {worker.name}
                </h2>
                <p className="text-sm font-semibold text-[#C1502E] mt-0.5">
                  {worker.trade} &bull; {worker.levelTitle}
                </p>
              </div>

              {worker.dailyRate && (
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Daily Standard Rate</span>
                  <span className="text-lg font-bold text-[#141821]">₹{worker.dailyRate}/day</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{worker.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <RatingStars rating={worker.rating} count={worker.reviewsCount} />
              </div>
              {worker.availability && (
                <span className="inline-flex items-center gap-1 bg-[#E6F4EA] text-[#1D8C6C] font-semibold px-2 py-0.5 rounded border border-[#1D8C6C]/20">
                  <Clock className="w-3 h-3" />
                  {worker.availability}
                </span>
              )}
            </div>

            {worker.bio && (
              <p className="text-xs text-gray-600 mt-3 leading-relaxed border-t border-gray-100 pt-2">
                {worker.bio}
              </p>
            )}
          </div>
        </div>

        {/* Level Ladder Component */}
        <div className="bg-[#F7F4EA] p-4 rounded-lg border border-amber-200">
          <LevelLadder currentLevel={worker.level || 3} />
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 text-center">
            <span className="text-[11px] text-gray-500 font-medium block">Jobs Completed</span>
            <span className="text-lg font-bold text-[#141821] mt-0.5 block">
              {worker.jobsCompleted || 0}+
            </span>
          </div>

          <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 text-center">
            <span className="text-[11px] text-gray-500 font-medium block">Experience</span>
            <span className="text-lg font-bold text-[#141821] mt-0.5 block">
              {worker.experienceYears || 1} Years
            </span>
          </div>

          <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 text-center">
            <span className="text-[11px] text-gray-500 font-medium block">Apprenticeship</span>
            <span className="text-lg font-bold text-[#1D8C6C] mt-0.5 block">
              {worker.apprenticeshipHours || 300} hrs
            </span>
          </div>

          <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 text-center">
            <span className="text-[11px] text-gray-500 font-medium block">Quality Rating</span>
            <span className="text-lg font-bold text-[#C1502E] mt-0.5 block">
              {worker.rating} / 5.0
            </span>
          </div>
        </div>

        {/* Verified Skills */}
        {worker.skills && worker.skills.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-[#141821] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1D8C6C]" />
              Verified Competencies & Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {worker.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs font-medium bg-white text-gray-800 px-3 py-1 rounded-md border border-gray-300 shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications History */}
        {worker.certifications && worker.certifications.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-[#141821] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#C1502E]" />
              Official Certifications & Licenses
            </h4>
            <div className="space-y-2">
              {worker.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-gray-200 bg-white flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-[#1D8C6C] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900 block">{cert.name}</span>
                      <span className="text-gray-500 text-[11px]">
                        Issued by {cert.issuer} &bull; {cert.year || cert.date}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1D8C6C] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job History / Experience Log */}
        {worker.jobHistory && worker.jobHistory.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-[#141821] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#2E6FB0]" />
              Recent Verified Job History
            </h4>
            <div className="space-y-2">
              {worker.jobHistory.map((job, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs"
                >
                  <div>
                    <span className="font-semibold text-gray-900 block">{job.title}</span>
                    <span className="text-gray-500 text-[11px]">
                      Client: {job.client} &bull; {job.date} ({job.duration})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <RatingStars rating={job.rating} showScore={true} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Digital Verification Security Footer */}
        <div className="p-4 bg-[#EAF1FB] rounded-lg border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#2E6FB0]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded border border-blue-300">
              <QrCode className="w-8 h-8 text-[#141821]" />
            </div>
            <div>
              <p className="font-bold text-[#141821]">Tamper-Proof Digital Verification</p>
              <p className="text-gray-600 text-[11px]">
                Scan QR or lookup ID <span className="font-mono font-bold">WF-{worker.id?.toUpperCase()}</span> to verify certificates on the national registry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {showActions && !isOwnPassport && onBook && (
              <Button variant="rust" size="md" onClick={onBook} className="w-full sm:w-auto">
                Book This Worker
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};