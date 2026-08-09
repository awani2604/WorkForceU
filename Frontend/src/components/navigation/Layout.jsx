import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { TopHeader } from "./TopHeader";
import { AppSidebar } from "./AppSidebar";
import { X } from "lucide-react";

export const Layout = ({ role = "customer" }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F4EA] flex flex-col">
      {/* Top Header */}
      <TopHeader
        role={role}
        onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <AppSidebar role={role} />

        {/* Mobile Sidebar Modal Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-[#141821]/70"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 bg-white z-10 h-full shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <span className="text-xs font-bold text-gray-500 uppercase">Navigation Menu</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <AppSidebar
                  role={role}
                  isMobile={true}
                  onCloseMobile={() => setMobileSidebarOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
