import React from "react";
import { Star } from "lucide-react";

export const RatingStars = ({ rating = 5, totalStars = 5, size = "sm", count = null, showScore = true, interactive = false, onRate = null }) => {
  const starSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-6 h-6"
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRate && onRate(i + 1)}
              className={`${interactive ? "cursor-pointer hover:scale-110 p-0.5" : "cursor-default"} transition-transform`}
            >
              <Star
                className={`${starSizes[size]} ${
                  filled
                    ? "fill-[#F2B705] text-[#F2B705]"
                    : half
                    ? "fill-[#F2B705]/50 text-[#F2B705]"
                    : "text-gray-300"
                }`}
              />
            </button>
          );
        })}
      </div>
      {showScore && (
        <span className="text-xs font-semibold text-gray-800">
          {typeof rating === "number" ? rating.toFixed(1) : rating}
        </span>
      )}
      {count !== null && (
        <span className="text-xs text-gray-700">({count})</span>
      )}
    </div>
  );
};
