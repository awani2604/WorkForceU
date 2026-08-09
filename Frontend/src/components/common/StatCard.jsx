import React from "react";

export const StatCard = ({ title, value, subtitle, icon: Icon, color = "dark", trend = null, className = "" }) => {
  const colorMap = {
    dark: {
      bg: "bg-white",
      border: "border-gray-200",
      iconBg: "bg-gray-100 text-[#141821]",
    },
    blue: {
      bg: "bg-white",
      border: "border-blue-200",
      iconBg: "bg-[#EAF1FB] text-[#2E6FB0]",
    },
    teal: {
      bg: "bg-white",
      border: "border-emerald-200",
      iconBg: "bg-[#E6F4EA] text-[#1D8C6C]",
    },
    rust: {
      bg: "bg-white",
      border: "border-orange-200",
      iconBg: "bg-orange-50 text-[#C1502E]",
    },
    purple: {
      bg: "bg-white",
      border: "border-purple-200",
      iconBg: "bg-purple-50 text-[#7C6BC4]",
    },
  };

  const scheme = colorMap[color] || colorMap.dark;

  return (
    <div className={`p-5 rounded-lg border ${scheme.border} ${scheme.bg} shadow-subtle ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-[#141821] mt-1">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {(subtitle || trend) && (
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          {subtitle && <span>{subtitle}</span>}
          {trend && (
            <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
