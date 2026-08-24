import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  Users,
  Star,
  Briefcase,
  Award,
  ShieldCheck,
  BarChart3,
  User,
  ChevronRight,
} from "lucide-react";

export const AppSidebar = ({
  role = "customer",
  isMobile = false,
  onCloseMobile = null,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const roleConfigs = {
    customer: {
      title: "Customer Portal",
      accentBg: "bg-[#2E6FB0]",
      activeBg:
        "bg-[#EAF1FB] text-[#2E6FB0] font-semibold border-r-4 border-[#2E6FB0]",
      inactiveHover: "hover:bg-gray-100 text-gray-700",

      links: [
        {
          name: "Home",
          href: "/customer/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Search Workers",
          href: "/customer/search",
          icon: Search,
        },
        {
          name: "My Bookings",
          href: "/customer/bookings",
          icon: CalendarCheck,
        },
        {
          name: "Team Builder",
          href: "/customer/team-builder",
          icon: Users,
        },
        {
          name: "Ratings & Reviews",
          href: "/customer/reviews",
          icon: Star,
        },
      ],
    },

    professional: {
      title: "Professional Portal",
      accentBg: "bg-[#C1502E]",
      activeBg:
        "bg-orange-50 text-[#C1502E] font-semibold border-r-4 border-[#C1502E]",
      inactiveHover: "hover:bg-gray-100 text-gray-700",

      links: [
        {
          name: "Dashboard",
          href: "/professional/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "My Jobs",
          href: "/professional/jobs",
          icon: Briefcase,
        },
        {
          name: "Skill Passport",
          href: "/professional/passport",
          icon: Award,
        },
        {
          name: "Verification",
          href: "/professional/verification",
          icon: ShieldCheck,
        },
        {
          name: "Personal Information",
          href: "/professional/personal-information",
          icon: User,
        },
      ],
    },

    trainee: {
      title: "Trainee Portal",
      accentBg: "bg-[#2E8B57]",
      activeBg:
        "bg-green-50 text-[#2E8B57] font-semibold border-r-4 border-[#2E8B57]",
      inactiveHover: "hover:bg-gray-100 text-gray-700",

      links: [
        {
          name: "Dashboard",
          href: "/trainee/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Learning",
          href: "/trainee/learning",
          icon: Search,
        },
        {
          name: "Quiz",
          href: "/trainee/quiz",
          icon: CalendarCheck,
        },
        {
          name: "Skill Passport",
          href: "/trainee/passport",
          icon: Award,
        },
        {
          name: "Apprenticeship",
          href: "/trainee/apprenticeship",
          icon: Users,
        },
      ],
    },

    admin: {
      title: "Admin Console",
      accentBg: "bg-[#7C6BC4]",
      activeBg:
        "bg-purple-50 text-[#7C6BC4] font-semibold border-r-4 border-[#7C6BC4]",
      inactiveHover: "hover:bg-gray-100 text-gray-700",

      links: [
        {
          name: "Dashboard Overview",
          href: "/admin/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "User Management",
          href: "/admin/users",
          icon: Users,
        },
        {
          name: "Verification Requests",
          href: "/admin/verifications",
          icon: ShieldCheck,
        },
        {
          name: "Platform Reports",
          href: "/admin/reports",
          icon: BarChart3,
        },
      ],
    },
  };

  const activeConfig =
    roleConfigs[role] || roleConfigs.customer;

  const handleLinkClick = (href) => {
    navigate(href);

    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const isLinkActive = (href) => {
    return location.pathname === href;
  };

  return (
    <aside
      className={`w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 select-none ${
        isMobile
          ? "h-full"
          : "min-h-[calc(100vh-4rem)] hidden md:flex"
      }`}
    >
      {/* Portal Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/70">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {activeConfig.title}
          </span>

          <span
            className={`w-2.5 h-2.5 rounded-full ${activeConfig.accentBg}`}
          />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="p-3 space-y-1">
        {activeConfig.links.map((link) => {
          const Icon = link.icon;
          const isActive = isLinkActive(link.href);

          return (
            <button
              key={link.name}
              type="button"
              onClick={() =>
                handleLinkClick(link.href)
              }
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs transition-colors cursor-pointer text-left ${
                isActive
                  ? activeConfig.activeBg
                  : activeConfig.inactiveHover
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? ""
                      : "text-gray-400"
                  }`}
                />

                <span>{link.name}</span>
              </div>

              {isActive && (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default AppSidebar;