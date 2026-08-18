import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  Users,
  Star,
  Settings,
  Briefcase,
  Calendar,
  Award,
  BookOpen,
  HelpCircle,
  FileText,
  ShieldCheck,
  BarChart3,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const AppSidebar = ({
  role = "customer",
  isMobile = false,
  onCloseMobile = null,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // ==============================
  // ROLE CONFIGURATIONS
  // ==============================

  const roleConfigs = {
    customer: {
      title: "Customer Portal",
      accentBg: "bg-[#2E6FB0]",

      activeBg:
        "bg-[#EAF1FB] text-[#2E6FB0] font-semibold border-r-4 border-[#2E6FB0]",

      inactiveHover:
        "hover:bg-gray-100 text-gray-700",

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
          href: "/customer/bookings?tab=completed",
          icon: Star,
        },
        {
          name: "Settings",
          href: "/customer/settings",
          icon: Settings,
        },
      ],
    },

    professional: {
      title: "Professional Portal",
      accentBg: "bg-[#C1502E]",

      activeBg:
        "bg-orange-50 text-[#C1502E] font-semibold border-r-4 border-[#C1502E]",

      inactiveHover:
        "hover:bg-gray-100 text-gray-700",

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
          name: "Availability Calendar",
          href: "/professional/availability",
          icon: Calendar,
        },
        {
          name: "Skill Passport",
          href: "/professional/passport",
          icon: Award,
        },
        {
          name: "Settings",
          href: "/professional/settings",
          icon: Settings,
        },
      ],
    },

    trainee: {
      title: "Trainee Portal",
      accentBg: "bg-[#1D8C6C]",

      activeBg:
        "bg-emerald-50 text-[#1D8C6C] font-semibold border-r-4 border-[#1D8C6C]",

      inactiveHover:
        "hover:bg-gray-100 text-gray-700",

      links: [
        {
          name: "Home Dashboard",
          href: "/trainee/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Learning Content",
          href: "/trainee/learning",
          icon: BookOpen,
        },
        {
          name: "Certification Quiz",
          href: "/trainee/quiz",
          icon: HelpCircle,
        },
        {
          name: "Apprenticeship Log",
          href: "/trainee/apprenticeship",
          icon: FileText,
        },
        {
          name: "My Skill Passport",
          href: "/trainee/passport",
          icon: Award,
        },
        {
          name: "Settings",
          href: "/trainee/settings",
          icon: Settings,
        },
      ],
    },

    admin: {
      title: "Admin Console",
      accentBg: "bg-[#7C6BC4]",

      activeBg:
        "bg-purple-50 text-[#7C6BC4] font-semibold border-r-4 border-[#7C6BC4]",

      inactiveHover:
        "hover:bg-gray-100 text-gray-700",

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
          name: "Certification Approvals",
          href: "/admin/certifications",
          icon: Award,
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

  // ==============================
  // HANDLE NAVIGATION
  // ==============================

  const handleLinkClick = (href) => {
    navigate(href);

    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  // ==============================
  // CHECK EXACT ACTIVE LINK
  // ==============================

  const isLinkActive = (href) => {
    // Split path and query string
    const [linkPath, linkQuery = ""] = href.split("?");

    // Current pathname
    const currentPath = location.pathname;

    // Current query string without ?
    const currentQuery = location.search.replace("?", "");

    // If the link has NO query parameters
    if (!linkQuery) {
      // It should only be active if:
      // pathname matches AND current page has no query parameters
      return (
        currentPath === linkPath &&
        currentQuery === ""
      );
    }

    // If the link HAS query parameters
    return (
      currentPath === linkPath &&
      currentQuery === linkQuery
    );
  };

  return (
    <aside
      className={`
        w-64
        bg-white
        border-r
        border-gray-200
        flex
        flex-col
        justify-between
        shrink-0
        select-none
        ${
          isMobile
            ? "h-full"
            : "min-h-[calc(100vh-4rem)] hidden md:flex"
        }
      `}
    >
      {/* ============================== */}
      {/* TOP SECTION */}
      {/* ============================== */}

      <div>
        {/* MODULE BRAND */}
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

        {/* ============================== */}
        {/* NAVIGATION */}
        {/* ============================== */}

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
                className={`
                  w-full
                  flex
                  items-center
                  justify-between
                  px-3
                  py-2.5
                  rounded-md
                  text-xs
                  transition-colors
                  cursor-pointer
                  text-left
                  ${
                    isActive
                      ? activeConfig.activeBg
                      : activeConfig.inactiveHover
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`
                      w-4
                      h-4
                      shrink-0
                      ${
                        isActive
                          ? ""
                          : "text-gray-400"
                      }
                    `}
                  />

                  <span>
                    {link.name}
                  </span>
                </div>

                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ============================== */}
      {/* USER FOOTER */}
      {/* ============================== */}

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={
              currentUser?.avatar ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
            }
            alt={currentUser?.name || "User"}
            className="w-9 h-9 rounded-full object-cover border border-gray-300"
          />

          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">
              {currentUser?.name || "Pooja Reddy"}
            </p>

            <p className="text-[11px] text-gray-500 capitalize truncate">
              {currentUser?.trade
                ? `${currentUser.trade} (L${currentUser.level})`
                : currentUser?.role || "Customer"}
            </p>
          </div>
        </div>

        {/* SIGN OUT */}

        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-1.5
            py-1.5
            px-3
            rounded
            text-xs
            text-red-600
            bg-white
            border
            border-gray-300
            hover:bg-red-50
            transition
            cursor-pointer
          "
        >
          <LogOut className="w-3.5 h-3.5" />

          <span>
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};