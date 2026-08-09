import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { RatingStars } from "../common/RatingStars";
import { Button } from "../common/Button";

export const WorkerCard = ({ worker, onBook = null }) => {
  const navigate = useNavigate();

  if (!worker) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-subtle hover:border-gray-400 transition-all p-5 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={worker.photo}
              alt={worker.name}
              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
            />
            {worker.verified && (
              <div
                className="absolute -bottom-1.5 -right-1.5 bg-[#1D8C6C] text-white p-0.5 rounded-full"
                title="Verified"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-base font-bold text-[#141821] truncate">
                {worker.name}
              </h3>
              <span className="text-xs font-bold text-[#141821] bg-gray-100 px-2 py-0.5 rounded shrink-0">
                ₹{worker.dailyRate}/day
              </span>
            </div>

            <p className="text-xs font-semibold text-[#C1502E] mt-0.5">
              {worker.trade} &bull; {worker.levelTitle}
            </p>

            <div className="flex items-center gap-2 mt-1.5">
              <RatingStars rating={worker.rating} count={worker.reviewsCount} size="sm" />
            </div>
          </div>
        </div>

        {/* Location & Availability Badges */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{worker.location}</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <Clock className="w-3 h-3 shrink-0" />
            <span>{worker.availability || "Available"}</span>
          </div>
        </div>

        {/* Key Skills */}
        {worker.skills && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {worker.skills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="text-[11px] bg-gray-50 text-gray-700 px-2 py-0.5 rounded border border-gray-200"
              >
                {skill}
              </span>
            ))}
            {worker.skills.length > 3 && (
              <span className="text-[10px] text-gray-400 self-center">
                +{worker.skills.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Action Buttons */}
      <div className="mt-5 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/customer/worker/${worker.id}`)}
          className="w-full text-xs"
        >
          View Passport
        </Button>
        <Button
          variant="rust"
          size="sm"
          onClick={() => (onBook ? onBook(worker) : navigate(`/customer/book/${worker.id}`))}
          className="w-full text-xs"
        >
          Book Worker
        </Button>
      </div>
    </div>
  );
};
