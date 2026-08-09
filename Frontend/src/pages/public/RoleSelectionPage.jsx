import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Users, Briefcase, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";
import { PublicNavbar } from "../../components/navigation/PublicNavbar";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const { addToast } = useToast();

  const [selectedRole, setSelectedRole] = useState("customer");

  const roles = [
    {
      id: "customer",
      title: "Customer / Business",
      headline: "I need workers or a crew",
      description: "Hire verified individual technicians or assemble full multi-trade building crews with secure escrow protection.",
      icon: Users,
      color: "border-[#2E6FB0] bg-[#EAF1FB]/30",
      accent: "#2E6FB0",
      badge: "HIRING PORTAL"
    },
    {
      id: "professional",
      title: "Skilled Professional",
      headline: "I'm an experienced worker",
      description: "Get direct booking requests, manage your availability calendar, earn daily rates, and supervise apprentices.",
      icon: Briefcase,
      color: "border-[#C1502E] bg-orange-50/30",
      accent: "#C1502E",
      badge: "WORKER PORTAL"
    },
    {
      id: "trainee",
      title: "Trainee / Apprentice",
      headline: "I want to learn a skill & certify",
      description: "Access mobile skill modules, log verified apprenticeship hours under master supervisors, and level up to certified status.",
      icon: GraduationCap,
      color: "border-[#1D8C6C] bg-emerald-50/30",
      accent: "#1D8C6C",
      badge: "LEARNER PORTAL"
    }
  ];

  const handleContinue = () => {
    switchRole(selectedRole);
    addToast(`Entering SkillBridge as ${selectedRole.toUpperCase()}`, "success");
    if (selectedRole === "customer") navigate("/customer/dashboard");
    else if (selectedRole === "professional") navigate("/professional/dashboard");
    else if (selectedRole === "trainee") navigate("/trainee/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F7F4EA] flex flex-col">
      <PublicNavbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C1502E]">
              Step 1 of 2: Profile Selection
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141821] mt-1">
              How would you like to use SkillBridge India?
            </h1>
            <p className="text-sm text-gray-600 max-w-lg mx-auto mt-2">
              Select your primary role. You can switch between roles at any time from your workspace.
            </p>
          </div>

          {/* 3 Selectable Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-6 rounded-lg border-2 bg-white transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? `${role.color} border-[#141821] shadow-card ring-2 ring-[#141821]`
                      : "border-gray-200 hover:border-gray-300 hover:shadow-subtle"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: role.accent }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {role.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#141821]">{role.title}</h3>
                    <p className="text-xs font-semibold text-gray-700 mt-1 mb-2">
                      {role.headline}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">
                      {isSelected ? "Selected Option" : "Click to Select"}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-[#141821] bg-[#141821] text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-subtle gap-4">
            <div className="text-xs text-gray-600">
              Selected: <strong className="text-gray-900 capitalize">{selectedRole} Portal</strong>
            </div>

            <Button
              variant="rust"
              size="lg"
              onClick={handleContinue}
              className="w-full sm:w-auto font-semibold"
            >
              Continue to Dashboard
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
