import React, { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Filter, RotateCcw, ShieldCheck, Star, MapPin, SlidersHorizontal, Users } from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { WorkerCard } from "../../components/workers/WorkerCard";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSkeleton } from "../../components/common/LoadingSkeleton";
import { useApp } from "../../context/AppContext";

export const SearchWorkersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { workers } = useApp();

  const initialTrade = searchParams.get("trade") || "All";

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState(initialTrade);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const tradesList = ["All", "Electrician", "Mason", "Plumber", "Painter", "Carpenter", "Contractor", "Driver", "Trainee (Assistant)"];
  const locationsList = ["All", "Bengaluru", "Delhi NCR", "Mumbai", "Kolkata", "Hyderabad", "Chandigarh", "Pune"];
  const levelsList = [
    { label: "All Levels (0-6)", value: "All" },
    { label: "Level 2+ (Assistant & above)", value: "2" },
    { label: "Level 3+ (Certified Skilled)", value: "3" },
    { label: "Level 4+ (Senior Worker)", value: "4" },
    { label: "Level 5+ (Supervisor/Lead)", value: "5" },
    { label: "Level 6 (Master Contractor)", value: "6" },
  ];

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTrade("All");
    setSelectedLocation("All");
    setSelectedLevel("All");
    setSelectedRating("All");
    setSelectedAvailability("All");
    setSearchParams({});
  };

  // Filter Logic
  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = w.name.toLowerCase().includes(q);
        const matchesTrade = w.trade.toLowerCase().includes(q);
        const matchesLocation = w.location.toLowerCase().includes(q);
        const matchesBio = w.bio?.toLowerCase().includes(q);
        const matchesSkills = w.skills?.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTrade && !matchesLocation && !matchesBio && !matchesSkills) return false;
      }

      // Trade
      if (selectedTrade !== "All") {
        if (!w.trade.toLowerCase().includes(selectedTrade.toLowerCase().split(" ")[0])) return false;
      }

      // Location
      if (selectedLocation !== "All") {
        if (!w.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      }

      // Level
      if (selectedLevel !== "All") {
        if (w.level < Number(selectedLevel)) return false;
      }

      // Rating
      if (selectedRating !== "All") {
        if (w.rating < Number(selectedRating)) return false;
      }

      // Availability
      if (selectedAvailability !== "All") {
        if (!w.availability.toLowerCase().includes(selectedAvailability.toLowerCase())) return false;
      }

      return true;
    });
  }, [workers, searchQuery, selectedTrade, selectedLocation, selectedLevel, selectedRating, selectedAvailability]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Search & Hire Verified Workers"
        subtitle="Explore certified technical tradespeople across India with verified Skill Passports."
        breadcrumb={<span>Customer &bull; Search Workers</span>}
        action={
          <Button
            variant="blue"
            size="md"
            icon={Users}
            onClick={() => navigate("/customer/team-builder")}
          >
            Build a Multi-trade Crew
          </Button>
        }
      />

      {/* Main Search Bar & Quick Stats */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-subtle space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by worker name, trade (e.g. Electrician, Mason), skills, or locality..."
            className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E6FB0] focus:border-[#2E6FB0] text-gray-900 placeholder-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-gray-200 px-2 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Detailed Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 border-t border-gray-100 text-xs">
          {/* Trade Selector */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Trade Specialization</label>
            <select
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2E6FB0]"
            >
              {tradesList.map((trade) => (
                <option key={trade} value={trade}>
                  {trade === "All" ? "All Trades" : trade}
                </option>
              ))}
            </select>
          </div>

          {/* Location Selector */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">City / Region</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2E6FB0]"
            >
              {locationsList.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === "All" ? "All India Locations" : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Level Ladder Filter */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Minimum Skill Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2E6FB0]"
            >
              {levelsList.map((lvl) => (
                <option key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Worker Rating</label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2E6FB0]"
            >
              <option value="All">All Ratings</option>
              <option value="4.5">★ 4.5 & Above</option>
              <option value="4.8">★ 4.8 & Above (Top Rated)</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          <div className="flex items-end">
            <Button
              variant="outline"
              size="md"
              icon={RotateCcw}
              onClick={resetFilters}
              className="w-full text-xs"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-600 px-1">
        <div>
          Showing <strong>{filteredWorkers.length}</strong> verified tradespeople
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#1D8C6C]" />
          <span>All profiles backed by Digital Skill Passport</span>
        </div>
      </div>

      {/* Worker Cards Grid */}
      {isLoading ? (
        <LoadingSkeleton count={4} />
      ) : filteredWorkers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No workers match your filters"
          description="Try broadening your trade specialization, location, or minimum skill level requirement."
          actionText="Reset All Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
};
