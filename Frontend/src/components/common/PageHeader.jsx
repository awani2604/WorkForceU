import React from "react";

export const LoadingSkeleton = ({ count = 3, type = "card" }) => {
  return (
    <div className="space-y-4 w-full animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-lg border border-gray-200 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
          <div className="flex justify-between items-center pt-2">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-8 bg-gray-200 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const PageHeader = ({ title, subtitle, breadcrumb, action, className = "" }) => {
  return (
    <div className={`mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200 ${className}`}>
      <div>
        {breadcrumb && (
          <nav className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1.5">
            {breadcrumb}
          </nav>
        )}
        <h1 className="text-2xl font-bold text-[#141821] tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2.5 shrink-0">{action}</div>}
    </div>
  );
};
