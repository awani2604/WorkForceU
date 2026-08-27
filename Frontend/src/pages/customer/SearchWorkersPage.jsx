import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ShieldCheck,
  Users,
  Check,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Star,
  Award,
  Wrench,
} from "lucide-react";
import { PageHeader } from "../../components/common/PageHeader";
import { WorkerCard } from "../../components/workers/WorkerCard";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSkeleton } from "../../components/common/LoadingSkeleton";
import { useApp } from "../../context/AppContext";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest", icon: Star },
  { value: "price-asc", label: "Price: Low to High", icon: ArrowUpWideNarrow },
  { value: "price-desc", label: "Price: High to Low", icon: ArrowDownWideNarrow },
  { value: "rating", label: "Top Rated", icon: Award },
];

const TRADES_LIST = ["All", "Electrician", "Mason", "Plumber", "Painter", "Carpenter", "Contractor", "Driver", "Trainee (Assistant)"];

const LEVELS_LIST = [
  { label: "All Levels (0-6)", value: "All" },
  { label: "Level 2+ (Assistant & above)", value: "2" },
  { label: "Level 3+ (Certified Skilled)", value: "3" },
  { label: "Level 4+ (Senior Worker)", value: "4" },
  { label: "Level 5+ (Supervisor/Lead)", value: "5" },
  { label: "Level 6 (Master Contractor)", value: "6" },
];

export const SearchWorkersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { workers } = useApp();
  const dropdownRef = useRef(null);

  const initialTrade = searchParams.get("trade") || "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState(initialTrade);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFiltersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeFilterCount =
    (selectedTrade !== "All" ? 1 : 0) +
    (selectedLevel !== "All" ? 1 : 0) +
    (sortBy !== "newest" ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTrade("All");
    setSelectedLevel("All");
    setSortBy("newest");
    setSearchParams({});
  };

  // Filter + sort logic
  const filteredWorkers = useMemo(() => {
    let result = workers.filter((w) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = w.name.toLowerCase().includes(q);
        const matchesTrade = w.trade.toLowerCase().includes(q);
        const matchesLocation = w.location.toLowerCase().includes(q);
        const matchesBio = w.bio?.toLowerCase().includes(q);
        const matchesSkills = w.skills?.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTrade && !matchesLocation && !matchesBio && !matchesSkills) return false;
      }

      if (selectedTrade !== "All") {
        if (!w.trade.toLowerCase().includes(selectedTrade.toLowerCase().split(" ")[0])) return false;
      }

      if (selectedLevel !== "All") {
        if (w.level < Number(selectedLevel)) return false;
      }

      return true;
    });

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => (a.dailyRate || 0) - (b.dailyRate || 0));
        break;
      case "price-desc":
        result = [...result].sort((a, b) => (b.dailyRate || 0) - (a.dailyRate || 0));
        break;
      case "rating":
        result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
      default:
        // assume array order / id order represents newest-first as-is
        break;
    }

    return result;
  }, [workers, searchQuery, selectedTrade, selectedLevel, sortBy]);

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

      {/* Search bar + single Filters button */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-subtle">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by worker name, trade or by skills...."
              className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-900 placeholder-gray-500"
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

          {/* Filters button + dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-semibold transition ${
                filtersOpen || activeFilterCount > 0
                  ? "bg-orange-50 border-orange-300 text-orange-700"
                  : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {filtersOpen && (
              <div className="absolute right-0 sm:right-0 mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-30 py-2 text-sm">
                {/* Sort by section */}
                <div className="px-3 pt-1 pb-2">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 px-1 mb-1">
                    Sort By
                  </p>
                  {SORT_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const active = sortBy === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setSortBy(opt.value)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition ${
                          active ? "bg-orange-50 text-orange-700" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" />
                          {opt.label}
                        </span>
                        {active && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-gray-100 px-3 pt-2 pb-2">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 px-1 mb-1.5 flex items-center gap-1.5">
                    <Wrench className="w-3 h-3" /> Specialization
                  </p>
                  <select
                    value={selectedTrade}
                    onChange={(e) => setSelectedTrade(e.target.value)}
                    className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
                  >
                    {TRADES_LIST.map((trade) => (
                      <option key={trade} value={trade}>
                        {trade === "All" ? "All Trades" : trade}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-gray-100 px-3 pt-2 pb-1">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 px-1 mb-1.5">
                    Skill Level
                  </p>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
                  >
                    {LEVELS_LIST.map((lvl) => (
                      <option key={lvl.value} value={lvl.value}>
                        {lvl.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-gray-100 px-3 pt-2 flex justify-between">
                  <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-2 py-1"
                  >
                    Reset all
                  </button>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
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
          description="Try broadening your trade specialization or minimum skill level requirement."
          actionText="Reset All Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
};
