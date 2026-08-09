import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  XCircle,
  Save,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

export const AvailabilityPage = () => {
  const { proAvailability, toggleDateAvailability } = useApp();
  const { addToast } = useToast();

  const [selectedDate, setSelectedDate] = useState("2026-08-12");

  // August 2026 Days (1 to 31)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const dateStr = `2026-08-${formattedDay}`;
    return {
      day: dayNum,
      dateStr,
      dayOfWeek: new Date(2026, 7, dayNum).getDay(), // 0 = Sun, 6 = Sat
    };
  });

  const currentSlot = proAvailability[selectedDate] || {
    morning: false,
    afternoon: false,
    fullDay: false,
  };

  const handleSlotToggle = (slotType) => {
    toggleDateAvailability(selectedDate, slotType);
    addToast(`Updated ${slotType} slot for ${selectedDate}`, "success");
  };

  const handleBulkAvailable = () => {
    daysInMonth.forEach((d) => {
      if (d.dayOfWeek !== 0) {
        // Monday to Saturday
        toggleDateAvailability(d.dateStr, "fullDay");
      }
    });
    addToast("Marked all weekdays in August available for bookings!", "success");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Availability & Work Schedule Calendar"
        subtitle="Control your booking slots. Clients will only see and book open dates."
        action={
          <Button
            variant="rust"
            size="md"
            icon={Save}
            onClick={handleBulkAvailable}
          >
            Mark All Weekdays Available
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-[#141821] flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#C1502E]" />
              August 2026
            </h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400" />
                Available Slot
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded bg-gray-100 border border-gray-300" />
                Unavailable
              </span>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-gray-500 py-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Days Cells */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Offset for Aug 1, 2026 (Saturday = index 6) */}
            {[...Array(6)].map((_, i) => (
              <div key={`empty-${i}`} className="p-2 sm:p-3 bg-gray-50/50 rounded-lg border border-transparent" />
            ))}

            {daysInMonth.map((d) => {
              const availability = proAvailability[d.dateStr];
              const isSelected = selectedDate === d.dateStr;
              const hasSlot = availability && (availability.morning || availability.afternoon || availability.fullDay);

              let style = "bg-white border-gray-200 text-gray-800 hover:border-gray-400";
              if (hasSlot) {
                style = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold";
              }
              if (isSelected) {
                style += " ring-2 ring-[#C1502E] border-[#C1502E] shadow-sm";
              }

              return (
                <button
                  key={d.dateStr}
                  type="button"
                  onClick={() => setSelectedDate(d.dateStr)}
                  className={`p-2 sm:p-3 rounded-lg border flex flex-col items-center justify-between transition cursor-pointer text-xs min-h-[56px] sm:min-h-[64px] ${style}`}
                >
                  <span className="font-bold text-sm">{d.day}</span>
                  <span className="text-[10px] mt-0.5">
                    {hasSlot ? (
                      <span className="text-emerald-700 font-semibold truncate block">Open</span>
                    ) : (
                      <span className="text-gray-400 truncate block">Off</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Slot Configuration (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-4">
          <div className="pb-3 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500 uppercase">Selected Date</span>
            <h4 className="text-lg font-bold text-[#141821] mt-0.5">{selectedDate}</h4>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-700">
              Shift Slot Availability
            </label>

            {/* Morning Slot */}
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 text-xs block">Morning Shift</span>
                <span className="text-gray-500 text-[11px]">09:00 AM - 01:00 PM</span>
              </div>
              <Button
                variant={currentSlot.morning ? "teal" : "outline"}
                size="sm"
                onClick={() => handleSlotToggle("morning")}
                className="text-xs"
              >
                {currentSlot.morning ? "Available" : "Mark Available"}
              </Button>
            </div>

            {/* Afternoon Slot */}
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 text-xs block">Afternoon Shift</span>
                <span className="text-gray-500 text-[11px]">02:00 PM - 06:00 PM</span>
              </div>
              <Button
                variant={currentSlot.afternoon ? "teal" : "outline"}
                size="sm"
                onClick={() => handleSlotToggle("afternoon")}
                className="text-xs"
              >
                {currentSlot.afternoon ? "Available" : "Mark Available"}
              </Button>
            </div>

            {/* Full Day Toggle */}
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 text-xs block">Full Day (8 Hours)</span>
                <span className="text-gray-500 text-[11px]">08:00 AM - 05:00 PM</span>
              </div>
              <Button
                variant={currentSlot.fullDay ? "rust" : "outline"}
                size="sm"
                onClick={() => handleSlotToggle("fullDay")}
                className="text-xs"
              >
                {currentSlot.fullDay ? "Full Day On" : "Mark Full Day"}
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1D8C6C]" />
            <span>Automatic calendar sync with customer booking engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
