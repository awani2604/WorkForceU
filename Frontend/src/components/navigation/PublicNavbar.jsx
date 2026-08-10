import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";

export const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Find Work", href: "/role-select" },
    { name: "For Businesses", href: "/customer/team-builder" },
    { name: "Skill Passport", href: "/#skill-passport" },
    { name: "Categories", href: "/#categories" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#141821] text-white border-b border-gray-800">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#C1502E] flex items-center justify-center font-black text-white text-sm tracking-wider shadow-sm">
              WF
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                WorkForceU <span className="text-[#C1502E]">India</span>
              </span>
              <span className="text-[10px] text-gray-400 block -mt-1 font-medium tracking-wide">
                Learn. Certify. Work. Grow.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (currentUser.role === "customer") navigate("/customer/dashboard");
                    else if (currentUser.role === "professional") navigate("/professional/dashboard");
                    else if (currentUser.role === "trainee") navigate("/trainee/dashboard");
                    else navigate("/admin/dashboard");
                  }}
                  className="bg-white text-gray-900 border-gray-300 text-xs"
                >
                  My Dashboard ({currentUser.role})
                </Button>
                <button
                  onClick={logout}
                  className="text-xs text-gray-400 hover:text-white px-2 py-1 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-200 hover:text-white hover:bg-gray-800">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="rust" size="sm">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#1a1f2c] border-b border-gray-800 px-4 pt-2 pb-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-gray-800"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-700 flex flex-col gap-2">
            {currentUser ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-white text-gray-900"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (currentUser.role === "customer") navigate("/customer/dashboard");
                    else if (currentUser.role === "professional") navigate("/professional/dashboard");
                    else if (currentUser.role === "trainee") navigate("/trainee/dashboard");
                    else navigate("/admin/dashboard");
                  }}
                >
                  My Dashboard ({currentUser.role})
                </Button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="text-xs text-gray-400 hover:text-white px-2 py-1 transition text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full bg-white text-gray-900">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="rust" size="sm" className="w-full">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};