import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { SKILL_LEVELS } from "../../mock/mockData";

export const LevelLadder = ({ currentLevel = 3, compact = false, className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      {!compact && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            National Skill Level Progression
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#141821] text-white">
            Level {currentLevel} of 6
          </span>
        </div>
      )}

      {/* Grid Ladder */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {SKILL_LEVELS.map((item) => {
          const isPassed = item.level < currentLevel;
          const isCurrent = item.level === currentLevel;
          const isUpcoming = item.level > currentLevel;

          let blockStyle = "bg-gray-100 border-gray-200 text-gray-400";
          let badgeStyle = "bg-gray-200 text-gray-500";

          if (isPassed) {
            blockStyle = "bg-emerald-50 border-emerald-300 text-emerald-900";
            badgeStyle = "bg-[#1D8C6C] text-white";
          } else if (isCurrent) {
            blockStyle = "bg-[#141821] border-[#141821] text-white shadow-sm ring-2 ring-[#C1502E]";
            badgeStyle = "bg-[#C1502E] text-white";
          }

          return (
            <div
              key={item.level}
              className={`p-2 rounded-lg border flex flex-col items-center justify-between text-center transition-all ${blockStyle} ${compact ? "py-1.5 px-1" : "py-2.5"}`}
              title={`Level ${item.level}: ${item.title} - ${item.description}`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 shrink-0 ${badgeStyle}`}>
                {isPassed ? <Check className="w-3 h-3" /> : item.level}
              </div>
              <span className={`text-[10px] font-semibold truncate max-w-full ${isCurrent ? "text-white" : isPassed ? "text-emerald-900" : "text-gray-500"}`}>
                {compact ? `L${item.level}` : item.title}
              </span>
              {!compact && (
                <span className="text-[9px] text-gray-400 mt-0.5 hidden md:block truncate max-w-full">
                  {item.level === 0 ? "Novice" : item.level === 6 ? "Master" : `Step ${item.level}`}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
