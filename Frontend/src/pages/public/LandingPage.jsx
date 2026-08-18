import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Award,
  BookOpen,
  Briefcase,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

import { PublicNavbar } from "../../components/navigation/PublicNavbar";
import { Button } from "../../components/common/Button";
import { LevelLadder } from "../../components/passport/LevelLadder";
import Footer from "../../components/layout/Footer";
import { SERVICE_CATEGORIES } from "../../mock/mockData";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#141821] flex flex-col">
      {/* Navigation Header */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="bg-white py-16 sm:py-20 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            {/* Hero Copy */}
            <div className="max-w-4xl space-y-6 text-center">
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-md text-xs font-semibold text-orange-700">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>India's National Workforce Skill Standard</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#141821]">
                Find verified hands for{" "}
                <span className="text-orange-600">every job.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                WorkForce India connects verified skilled tradespeople,
                apprentices, and businesses. Powered by the{" "}
                <strong className="text-[#141821]">
                  Digital Skill Passport
                </strong>
                , transparent NSQF level certification, and instant crew
                booking.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
                <Link to="/role-select">
                  <Button
                    variant="rust"
                    size="lg"
                    className="text-base font-semibold bg-orange-600 hover:bg-orange-700 border-orange-600"
                  >
                    Join WorkForce
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>

                <Link to="/customer/search">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-[#141821] border-slate-300 text-base"
                  >
                    Search Workers
                  </Button>
                </Link>

                <Link to="/customer/team-builder">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-orange-700 border-orange-300 text-base"
                  >
                    Build a Crew
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-orange-100 text-xs text-slate-500">
                <div>
                  <strong className="block text-xl font-bold text-[#141821]">
                    14,000+
                  </strong>
                  <span>Verified Workers</span>
                </div>

                <div>
                  <strong className="block text-xl font-bold text-[#141821]">
                    Level 0–6
                  </strong>
                  <span>Skills Ladder</span>
                </div>

                <div>
                  <strong className="block text-xl font-bold text-[#141821]">
                    100% Escrow
                  </strong>
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Problem & Solution */}
      <section className="py-14 sm:py-16 bg-orange-50/40 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600">
              The Workforce Challenge
            </h2>

            <p className="text-2xl sm:text-3xl font-extrabold text-[#141821] mt-1">
              Why India needs a standardized skill verification platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-orange-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-base mb-4">
                01
              </div>

              <h3 className="text-base font-bold text-[#141821] mb-2">
                Unverified Skill Claims
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                Traditional hiring relies on word-of-mouth with zero proof of
                genuine competence, resulting in shoddy workmanship and site
                safety hazards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-orange-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-base mb-4">
                02
              </div>

              <h3 className="text-base font-bold text-[#141821] mb-2">
                Trapped in Low Wages
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                Informal laborers have no career ladder to prove their growing
                expertise, keeping their daily wage stagnant despite years of
                on-site experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-orange-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-base mb-4">
                03
              </div>

              <h3 className="text-base font-bold text-[#141821] mb-2">
                The WorkForce Solution
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                A transparent 3-step pipeline (Learn → Apprenticeship → Work)
                with tamper-proof Digital Skill Passports backed by master
                supervisors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 3-Step Skill Framework */}
      <section
        id="how-it-works"
        className="py-14 sm:py-16 bg-white border-b border-orange-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Structured Growth Engine
            </h2>

            <p className="text-2xl sm:text-3xl font-extrabold text-[#141821] mt-1">
              How WorkForce India transforms informal labor into certified
              professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-orange-100 bg-orange-50/40 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-orange-200 text-orange-800 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>

                <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded uppercase">
                  Step 1
                </span>

                <h3 className="text-lg font-bold text-[#141821] mt-2 mb-2">
                  Digital Learning
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Interactive mobile modules covering Indian electrical codes,
                  plumbing blueprints, masonry safety, and PPE standards.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-orange-100 text-xs font-semibold text-orange-700">
                Level 0 → Level 1 (Trainee)
              </div>
            </div>

            <div className="p-6 rounded-lg border border-orange-100 bg-orange-50/40 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>

                <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded uppercase">
                  Step 2
                </span>

                <h3 className="text-lg font-bold text-[#141821] mt-2 mb-2">
                  On-Site Apprenticeship
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Trainees work under Level 4 & 5 certified supervisors. Hours
                  and tasks are digitally signed on the verified job log.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-orange-100 text-xs font-semibold text-orange-700">
                Level 1 → Level 2 (Assistant)
              </div>
            </div>

            <div className="p-6 rounded-lg border border-orange-200 bg-orange-50/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#141821] text-white flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-orange-400" />
                </div>

                <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded uppercase">
                  Step 3
                </span>

                <h3 className="text-lg font-bold text-[#141821] mt-2 mb-2">
                  Certification & Higher Earnings
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Pass the practical evaluation and receive an official
                  NSQF-aligned Skill Passport to unlock direct high-paying
                  customer bookings.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-orange-100 text-xs font-semibold text-orange-700">
                Level 3 → Level 6 (Contractor)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The 7-Level Skill Ladder */}
      <section className="py-14 sm:py-16 bg-orange-50/40 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#141821]">
              The National Framework
            </h2>

            <p className="text-2xl sm:text-3xl font-extrabold text-[#141821] mt-1">
              Complete Level 0 to Level 6 Career Hierarchy
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg border border-orange-100 shadow-sm">
            <LevelLadder currentLevel={4} />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-orange-50 rounded border border-orange-100">
                <span className="font-bold text-[#141821] block">
                  Levels 0 & 1: Entry & Trainee
                </span>
                <span className="text-slate-500 mt-1 block">
                  Digital modules, basic safety guidelines, tool orientation.
                </span>
              </div>

              <div className="p-3 bg-orange-50 rounded border border-orange-100">
                <span className="font-bold text-orange-700 block">
                  Level 2: Assistant
                </span>
                <span className="text-slate-500 mt-1 block">
                  Verified 300 hrs on-site apprenticeship with a licensed
                  mentor.
                </span>
              </div>

              <div className="p-3 bg-orange-50 rounded border border-orange-100">
                <span className="font-bold text-orange-700 block">
                  Levels 3 & 4: Skilled & Senior
                </span>
                <span className="text-slate-500 mt-1 block">
                  Independent task execution, specialized residential &
                  commercial mastery.
                </span>
              </div>

              <div className="p-3 bg-orange-50 rounded border border-orange-100">
                <span className="font-bold text-orange-700 block">
                  Levels 5 & 6: Supervisor & Contractor
                </span>
                <span className="text-slate-500 mt-1 block">
                  Crew leadership, blueprint compliance, multi-trade project
                  delivery.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Service Categories */}
      <section
        id="categories"
        className="py-14 sm:py-16 bg-white border-b border-orange-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Trades & Specializations
              </h2>

              <p className="text-2xl sm:text-3xl font-extrabold text-[#141821] mt-1">
                Verified professionals across 8 core trades
              </p>
            </div>

            <Link to="/customer/search">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-orange-300 text-orange-700"
              >
                View All Trades →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() =>
                  navigate(`/customer/search?trade=${cat.name}`)
                }
                className="p-5 rounded-lg border border-orange-100 bg-orange-50/30 hover:bg-white hover:border-orange-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-10 h-10 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                      {cat.name.slice(0, 2).toUpperCase()}
                    </span>

                    <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-orange-100">
                      {cat.baseRate}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#141821]">
                    {cat.name}
                  </h4>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-orange-100 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>{cat.count}</span>

                  <span className="text-orange-600 font-semibold flex items-center gap-0.5">
                    Browse <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Team Builder Preview */}
      <section className="py-14 sm:py-16 bg-orange-50/40 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Enterprise & Contractor Solutions
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141821] leading-tight">
                Need an entire multi-trade crew? <br />
                <span className="text-orange-600">
                  Deploy with the Team Builder.
                </span>
              </h2>

              <p className="text-sm text-slate-500 leading-relaxed">
                Whether you are building a villa, renovating a commercial
                floor, or setting up factory power infrastructure — customize
                your crew size, mix contractor supervisors with skilled masons
                and electricians, and receive an instant transparent daily rate
                estimate.
              </p>

              <div className="pt-2">
                <Link to="/customer/team-builder">
                  <Button
                    variant="rust"
                    size="md"
                    className="bg-orange-600 hover:bg-orange-700 border-orange-600"
                  >
                    Launch Interactive Team Builder
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-lg border border-orange-100 shadow-sm p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-orange-100">
                  <span className="font-bold text-[#141821] text-sm">
                    Example: House Construction Crew
                  </span>

                  <span className="bg-orange-600 text-white px-2 py-0.5 rounded font-semibold text-[10px]">
                    10 WORKERS
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-orange-50 p-2.5 rounded border border-orange-100">
                    <span className="text-[#141821]">
                      1 Project Contractor (Level 6)
                    </span>
                    <span className="font-mono text-slate-500">
                      ₹2,500/day
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-orange-50 p-2.5 rounded border border-orange-100">
                    <span className="text-[#141821]">
                      2 Lead Masons (Supervisor Level 5)
                    </span>
                    <span className="font-mono text-slate-500">
                      ₹2,800/day
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-orange-50 p-2.5 rounded border border-orange-100">
                    <span className="text-[#141821]">
                      5 General Labourers (Level 1)
                    </span>
                    <span className="font-mono text-slate-500">
                      ₹2,500/day
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-orange-50 p-2.5 rounded border border-orange-100">
                    <span className="text-[#141821]">
                      1 Conduit Electrician + 1 Plumber
                    </span>
                    <span className="font-mono text-slate-500">
                      ₹1,700/day
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-orange-100 flex justify-between items-center font-bold text-sm text-[#141821]">
                  <span>Estimated Daily Total</span>
                  <span className="text-orange-600">₹9,500 / day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};