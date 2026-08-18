import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const TopHeader = ({ onToggleMobileSidebar, role = "customer" }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#141821] text-white border-b border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleMobileSidebar}
              className="p-1.5 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#C1502E] flex items-center justify-center font-black text-white text-xs tracking-wider">
                WF
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-extrabold text-white flex items-center gap-1">
                  WorkForceU <span className="text-[#C1502E]">India</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Search input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search trades, workers, bookings, certificates..."
                className="w-full pl-9 pr-4 py-1.5 bg-[#1e2330] text-xs text-gray-200 rounded-lg border border-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#C1502E] focus:ring-1 focus:ring-[#C1502E]"
              />
            </div>
          </div>

          {/* Right: Notification + Profile — no role switcher */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                }}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C1502E]" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">Notifications</span>
                    <span className="text-[10px] text-[#2E6FB0] font-semibold">Mark read</span>
                    <div className="p-3 hover:bg-gray-50">
                      <p className="font-semibold text-gray-900">Apprenticeship Log Signed</p>
                      <p className="text-gray-500 text-[11px] mt-0.5">8 hours approved by Mohammad Arif.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800 transition cursor-pointer"
              >
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"}
                  alt={currentUser?.name || "User"}
                  className="w-8 h-8 rounded-full object-cover border border-gray-600"
                />
                <span className="text-xs font-medium text-gray-200 hidden md:block max-w-[100px] truncate">
                  {currentUser?.name || "User"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900 truncate">{currentUser?.name}</p>
                    <p className="text-[11px] text-gray-500 capitalize">{currentUser?.role} Account</p>
                  </div>

                  <div className="py-1 text-xs">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      Public Home
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                        navigate("/login");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};