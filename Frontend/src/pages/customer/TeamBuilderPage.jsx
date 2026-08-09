import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Sparkles,
  Calendar,
  DollarSign
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { TEAM_PRESETS, AVAILABLE_ROLES_CATALOG } from "../../mock/mockData";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const TeamBuilderPage = () => {
  const navigate = useNavigate();
  const { createBooking } = useApp();
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const [selectedPresetId, setSelectedPresetId] = useState("preset-house-construction");
  const [teamName, setTeamName] = useState("House Construction Crew");
  const [durationDays, setDurationDays] = useState(14);
  const [siteLocation, setSiteLocation] = useState("Whitefield Infrastructure Site, Bengaluru, KA");
  const [startDate, setStartDate] = useState("2026-08-20");

  // Crew Roles in Current Custom Team
  const [crewRoles, setCrewRoles] = useState(TEAM_PRESETS[0].roles);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load a preset template
  const applyPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setTeamName(preset.name);
    setDurationDays(preset.defaultDurationDays);
    setCrewRoles(JSON.parse(JSON.stringify(preset.roles)));
  };

  // Adjust role quantity
  const handleQuantityChange = (trade, delta) => {
    setCrewRoles((prev) =>
      prev
        .map((r) => {
          if (r.trade === trade) {
            const nextCount = Math.max(1, r.count + delta);
            return { ...r, count: nextCount };
          }
          return r;
        })
        .filter((r) => r.count > 0)
    );
  };

  // Remove role
  const handleRemoveRole = (trade) => {
    setCrewRoles((prev) => prev.filter((r) => r.trade !== trade));
  };

  // Add role from catalog
  const handleAddRoleFromCatalog = (roleCatalogItem) => {
    setCrewRoles((prev) => {
      const exists = prev.find((r) => r.trade === roleCatalogItem.trade);
      if (exists) {
        return prev.map((r) =>
          r.trade === roleCatalogItem.trade ? { ...r, count: r.count + 1 } : r
        );
      }
      return [
        ...prev,
        {
          trade: roleCatalogItem.trade,
          level: roleCatalogItem.level,
          title: roleCatalogItem.title,
          count: 1,
          dailyRate: roleCatalogItem.dailyRate,
        },
      ];
    });
  };

  // Calculations
  const totalCrewSize = crewRoles.reduce((sum, r) => sum + r.count, 0);
  const dailyCost = crewRoles.reduce((sum, r) => sum + r.count * r.dailyRate, 0);
  const totalProjectCost = dailyCost * durationDays;

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      const newBooking = createBooking({
        workerId: "crew-" + Date.now(),
        workerName: `${teamName} (${totalCrewSize} Multi-trade Workers)`,
        workerTrade: "Multi-trade Turnkey Crew",
        workerLevel: "Level 6 Contractor Supervised",
        workerPhoto: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&q=80",
        customerName: currentUser?.name || "Pooja Reddy",
        jobTitle: `${teamName} - ${totalCrewSize} Member Deployment`,
        jobDescription: `Turnkey team deployment for ${durationDays} days: ${crewRoles
          .map((r) => `${r.count}x ${r.title}`)
          .join(", ")}.`,
        date: startDate,
        timeSlot: "Full Project Hours",
        duration: `${durationDays} Days`,
        price: totalProjectCost,
        location: siteLocation,
      });

      addToast(`Crew booking ${newBooking.id} submitted! Escrow secured.`, "success");
      setRequestModalOpen(false);
      navigate("/customer/bookings");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interactive Team Builder"
        subtitle="Assemble and customize turnkey multi-trade crews with transparent daily rates."
        breadcrumb={<span>Customer &bull; Team Builder</span>}
      />

      {/* Preset Selector */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          Quick Start: Choose a Preset Template
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TEAM_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset)}
              className={`p-3.5 rounded-lg border text-left transition cursor-pointer ${
                selectedPresetId === preset.id
                  ? "border-[#2E6FB0] bg-[#EAF1FB] ring-2 ring-[#2E6FB0]"
                  : "border-gray-200 bg-gray-50 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-gray-900">{preset.name}</span>
                <span className="text-[10px] font-semibold text-[#2E6FB0] bg-white px-2 py-0.5 rounded border border-blue-200">
                  {preset.roles.reduce((s, r) => s + r.count, 0)} Crew
                </span>
              </div>
              <p className="text-[11px] text-gray-500 line-clamp-2">{preset.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Crew Table & Catalog (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Crew Roles Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-subtle overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#141821]">Active Crew Configuration</h3>
                <p className="text-xs text-gray-500">Adjust role quantities or add new trade specialists</p>
              </div>
              <span className="text-xs font-bold bg-[#141821] text-white px-2.5 py-1 rounded">
                Total Crew: {totalCrewSize}
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {crewRoles.map((role) => (
                <div
                  key={role.trade}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#141821] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      L{role.level}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{role.title}</h4>
                      <span className="text-gray-500 text-[11px]">
                        Level {role.level} &bull; ₹{role.dailyRate}/day per person
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(role.trade, -1)}
                        className="p-1.5 hover:bg-gray-200 text-gray-700 cursor-pointer"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 font-bold text-sm text-gray-900 bg-white min-w-[32px] text-center">
                        {role.count}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(role.trade, 1)}
                        className="p-1.5 hover:bg-gray-200 text-gray-700 cursor-pointer"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="font-bold text-gray-900 block">₹{role.count * role.dailyRate}</span>
                      <span className="text-[10px] text-gray-400">/day total</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveRole(role.trade)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Remove Role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Available Trade Catalog */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Add More Trade Specialists to Crew
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AVAILABLE_ROLES_CATALOG.map((item) => (
                <button
                  key={item.trade}
                  type="button"
                  onClick={() => handleAddRoleFromCatalog(item)}
                  className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-[#2E6FB0] text-left transition cursor-pointer text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{item.trade}</span>
                    <Plus className="w-3.5 h-3.5 text-[#2E6FB0]" />
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    L{item.level} &bull; ₹{item.dailyRate}/day
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Team Summary & Cost Estimate (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-[#141821]">Team Deployment Estimate</h3>
              <p className="text-xs text-gray-500">Live cost breakdown based on selected crew</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Duration (Working Days)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 p-2 bg-gray-50 border border-gray-300 rounded font-bold text-sm text-center"
                  />
                  <span className="text-gray-500">Days project timeline</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Total Crew Members:</span>
                  <span className="font-bold text-gray-900">{totalCrewSize} Workers</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Daily Labor Combined:</span>
                  <span className="font-bold text-gray-900">₹{dailyCost} / day</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Project Duration:</span>
                  <span className="font-bold text-gray-900">{durationDays} Days</span>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline text-sm font-bold text-[#141821]">
                  <span>Total Estimated Cost</span>
                  <span className="text-[#C1502E] text-xl font-extrabold">₹{totalProjectCost}</span>
                </div>
                <p className="text-[10px] text-gray-400">All wages backed by SkillBridge escrow assurance.</p>
              </div>

              <Button
                variant="rust"
                size="lg"
                onClick={() => setRequestModalOpen(true)}
                className="w-full font-bold text-sm mt-3"
              >
                Request This Team &rarr;
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        title="Confirm Turnkey Crew Request"
        subtitle="Review your deployment details before locking escrow"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRequestModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="rust"
              size="sm"
              disabled={submitting}
              onClick={handleRequestSubmit}
            >
              {submitting ? "Submitting Request..." : "Confirm & Deploy Crew"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
            <p className="font-bold text-gray-900 text-sm">{teamName}</p>
            <p className="text-gray-600">
              {totalCrewSize} workers deployed for {durationDays} days &bull; Total ₹{totalProjectCost}
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Project Site Location *</label>
            <input
              type="text"
              value={siteLocation}
              onChange={(e) => setSiteLocation(e.target.value)}
              className="w-full p-2 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-[#2E6FB0]"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Target Start Date *</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-[#2E6FB0]"
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
