import React from "react";
import { CheckCircle2, Clock, PlayCircle, Check, XCircle, ShieldCheck } from "lucide-react";

export const StatusBadge = ({ status, size = "md", className = "" }) => {
  const normalized = (status || "").toLowerCase().trim();

  let styles = "bg-gray-100 text-gray-700 border-gray-200";
  let icon = null;

  if (normalized.includes("accepted") || normalized.includes("approved") || normalized.includes("verified")) {
    styles = "bg-[#E6F4EA] text-[#1D8C6C] border-[#1D8C6C]/30";
    icon = <ShieldCheck className="w-3.5 h-3.5" />;
  } else if (normalized.includes("pending")) {
    styles = "bg-[#FEF3D6] text-[#B45309] border-[#F2B705]/40";
    icon = <Clock className="w-3.5 h-3.5" />;
  } else if (normalized.includes("progress") || normalized.includes("active")) {
    styles = "bg-[#EAF1FB] text-[#2E6FB0] border-[#2E6FB0]/30";
    icon = <PlayCircle className="w-3.5 h-3.5" />;
  } else if (normalized.includes("completed")) {
    styles = "bg-emerald-50 text-emerald-800 border-emerald-300";
    icon = <CheckCircle2 className="w-3.5 h-3.5" />;
  } else if (normalized.includes("rejected") || normalized.includes("cancelled")) {
    styles = "bg-red-50 text-red-700 border-red-200";
    icon = <XCircle className="w-3.5 h-3.5" />;
  }

  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-md border ${sizeClass} ${styles} ${className}`}>
      {icon}
      {status}
    </span>
  );
};
