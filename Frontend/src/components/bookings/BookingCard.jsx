import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  PlayCircle,
  Star,
  UserCheck
} from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";
import { RatingStars } from "../common/RatingStars";
import { Button } from "../common/Button";

export const BookingCard = ({
  booking,
  isProView = false,
  onAccept = null,
  onReject = null,
  onStatusChange = null,
  onRateClick = null,
  className = ""
}) => {
  if (!booking) return null;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-subtle p-5 flex flex-col justify-between ${className}`}>
      <div>
        {/* Header with ID and Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {booking.id}
            </span>
            <span className="text-xs text-gray-400">&bull;</span>
            <span className="text-xs text-gray-500">{booking.paymentStatus || "Escrow Secured"}</span>
          </div>
          <StatusBadge status={booking.status} size="sm" />
        </div>

        {/* Worker or Customer Info Block */}
        <div className="flex items-center gap-3.5 my-3.5">
          <img
            src={booking.workerPhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"}
            alt={booking.workerName}
            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#141821] truncate">
              {isProView ? booking.customerName || "Customer Client" : booking.workerName}
            </h4>
            <p className="text-xs text-gray-500 font-medium">
              {isProView ? "Client Order" : `${booking.workerTrade} • ${booking.workerLevel}`}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">Total</span>
            <span className="text-base font-bold text-[#141821]">₹{booking.price}</span>
          </div>
        </div>

        {/* Job Title & Details */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/60 mb-3.5">
          <h5 className="text-xs font-bold text-gray-900 mb-1">{booking.jobTitle}</h5>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {booking.jobDescription}
          </p>
        </div>

        {/* Date, Time & Location Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{booking.date} ({booking.duration})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{booking.timeSlot || "Full Day Shift"}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:col-span-2">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{booking.location}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions / Ratings */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        {/* Professional View Actions */}
        {isProView ? (
          <div className="flex items-center justify-end gap-2">
            {booking.status === "Pending" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReject && onReject(booking.id)}
                  className="text-xs text-red-600 hover:bg-red-50"
                >
                  Decline
                </Button>
                <Button
                  variant="rust"
                  size="sm"
                  onClick={() => onAccept && onAccept(booking.id)}
                  className="text-xs"
                >
                  Accept Job
                </Button>
              </>
            )}

            {booking.status === "Accepted" && (
              <Button
                variant="blue"
                size="sm"
                onClick={() => onStatusChange && onStatusChange(booking.id, "In Progress")}
                className="text-xs w-full"
              >
                Mark In Progress
              </Button>
            )}

            {booking.status === "In Progress" && (
              <Button
                variant="teal"
                size="sm"
                onClick={() => onStatusChange && onStatusChange(booking.id, "Completed")}
                className="text-xs w-full"
              >
                Mark Completed
              </Button>
            )}

            {booking.status === "Completed" && (
              <div className="flex items-center justify-between w-full text-xs text-emerald-700 font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Job Completed & Payout Released
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Customer View Actions */
          <div className="flex items-center justify-between gap-2">
            {booking.status === "Completed" ? (
              booking.rating ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Your Rating:</span>
                  <RatingStars rating={booking.rating} size="sm" />
                </div>
              ) : (
                <Button
                  variant="rust"
                  size="sm"
                  onClick={() => onRateClick && onRateClick(booking)}
                  className="text-xs ml-auto"
                >
                  Rate this Job
                </Button>
              )
            ) : (
              <div className="text-xs text-gray-500 flex items-center justify-between w-full">
                <span>Status: <strong className="text-gray-800">{booking.status}</strong></span>
                {booking.status === "Pending" && (
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Awaiting worker confirmation
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
