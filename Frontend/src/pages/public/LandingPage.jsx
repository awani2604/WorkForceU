import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  Briefcase,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  ChevronRight,
  Zap,
  BrickWall,
  Wrench,
  Paintbrush,
  Hammer,
  Car,
  HardHat,
  Search,
  CalendarCheck
} from "lucide-react";
import { PublicNavbar } from "../../components/navigation/PublicNavbar";
import { Button } from "../../components/common/Button";
import { LevelLadder } from "../../components/passport/LevelLadder";
import { SERVICE_CATEGORIES, MOCK_WORKERS } from "../../mock/mockData";

export const LandingPage = () => {
  const navigate = useNavigate();
  const sampleWorker = MOCK_WORKERS[0]; // Rameshwar Sharma

  return (
    <div className="min-h-screen bg-[#F7F4EA] text-[#141821] flex flex-col">
      {/* Navigation Header */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="bg-[#141821] text-white py-16 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#1e2330] border border-gray-700 px-3.5 py-1.5 rounded-md text-xs font-semibold text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#1D8C6C]" />
                <span>India's National Workforce Skill Standard</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Find verified hands for <span className="text-[#C1502E]">every job.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
                SkillBridge India connects verified skilled tradespeople, apprentices, and businesses. Powered by the <strong>Digital Skill Passport</strong>, transparent NSQF level certification, and instant crew booking.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/role-select">
                  <Button variant="rust" size="lg" className="text-base font-semibold">
                    Join SkillBridge
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>

                <Link to="/customer/search">
                  <Button variant="outline" size="lg" className="bg-white text-gray-900 border-gray-300 text-base">
                    Search Workers
                  </Button>
                </Link>

                <Link to="/customer/team-builder">
                  <Button variant="blue" size="lg" className="text-base">
                    Build a Crew
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800 text-xs text-gray-300">
                <div>
                  <strong className="block text-xl font-bold text-white">14,000+</strong>
                  <span>Verified Workers</span>
                </div>
                <div>
                  <strong className="block text-xl font-bold text-white">Level 0–6</strong>
                  <span>Skills Ladder</span>
                </div>
                <div>
                  <strong className="block text-xl font-bold text-white">100% Escrow</strong>
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Realistic Dashboard & Passport Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white text-gray-900 rounded-lg border-2 border-gray-300 shadow-xl overflow-hidden">
                <div className="bg-[#141821] text-white px-4 py-2.5 flex items-center justify-between border-b border-gray-800">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#1D8C6C]" />
                    SkillBridge Digital Passport Preview
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">SBI-W-101</span>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={sampleWorker.photo}
                      alt={sampleWorker.name}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                    />
                    <div>
                      <h4 className="text-base font-bold text-gray-900">{sampleWorker.name}</h4>
                      <p className="text-xs font-semibold text-[#C1502E]">
                        {sampleWorker.trade} &bull; {sampleWorker.levelTitle}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-600 flex items-center gap-1 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-[#F2B705] text-[#F2B705]" />
                          {sampleWorker.rating} ({sampleWorker.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Level Ladder inside Hero Preview */}
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <LevelLadder currentLevel={sampleWorker.level} compact={true} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-gray-50 rounded border border-gray-200 text-center">
                      <span className="text-gray-500 block text-[10px]">Apprenticeship</span>
                      <strong className="text-[#1D8C6C] font-bold text-sm">320 Hours Logged</strong>
                    </div>
                    <div className="p-2.5 bg-gray-50 rounded border border-gray-200 text-center">
                      <span className="text-gray-500 block text-[10px]">Completed Jobs</span>
                      <strong className="text-[#141821] font-bold text-sm">310+ Work Orders</strong>
                    </div>
                  </div>

                  <Link to={`/customer/worker/${sampleWorker.id}`} className="block">
                    <Button variant="rust" size="sm" className="w-full text-xs">
                      Inspect Full Skill Passport
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Problem & Solution */}
      <section className="py-14 sm:py-16 bg-[#EAF1FB] border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2E6FB0]">
              The Workforce Challenge
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#141821] mt-1">
              Why India needs a standardized skill verification platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-[#C1502E] flex items-center justify-center font-bold text-base mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-[#141821] mb-2">Unverified Skill Claims</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Traditional hiring relies on word-of-mouth with zero proof of genuine competence, resulting in shoddy workmanship and site safety hazards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-[#141821] mb-2">Trapped in Low Wages</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Informal laborers have no career ladder to prove their growing expertise, keeping their daily wage stagnant despite years of on-site experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-subtle">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#1D8C6C] flex items-center justify-center font-bold text-base mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-[#141821] mb-2">The SkillBridge Solution</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                A transparent 3-step pipeline (Learn &rarr; Apprenticeship &rarr; Work) with tamper-proof Digital Skill Passports backed by master supervisors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 3-Step Skill Framework */}
      <section id="how-it-works" className="py-14 sm:py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C1502E]">
              Structured Growth Engine
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#141821] mt-1">
              How SkillBridge India transforms informal labor into certified professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#141821] text-white flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-[#F2B705]" />
                </div>
                <span className="text-xs font-bold text-[#141821] bg-amber-100 px-2 py-0.5 rounded uppercase">Step 1</span>
                <h3 className="text-lg font-bold text-[#141821] mt-2 mb-2">Digital Learning</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Interactive mobile modules covering Indian electrical codes, plumbing blueprints, masonry safety, and PPE standards.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-xs font-semibold text-[#141821]">
                Level 0 &rarr; Level 1 (Trainee)
              </div>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#1D8C6C] text-white flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#1D8C6C] bg-emerald-100 px-2 py-0.5 rounded uppercase">Step 2</span>
                <h3 className="text-lg font-bold text-[#141821] mt-2 mb-2">On-Site Apprenticeship</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Trainees work under Level 4 & 5 certified supervisors. Hours and tasks are digitally signed on the verified job log.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-xs font-semibold text-[#1D8C6C]">
                Level 1 &rarr; Level 2 (Assistant)
              </div>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 bg-gray-50 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#C1502E] text-white flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#C1502E] bg-orange-100 px-2 py-0.5 rounded uppercase">Step 3</span>
                <h3 className="text-lg font-bold text-[#141821] mt-2 mb-2">Certification & Higher Earnings</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Pass the practical evaluation and receive an official NSQF-aligned Skill Passport to unlock direct high-paying customer bookings.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 text-xs font-semibold text-[#C1502E]">
                Level 3 &rarr; Level 6 (Contractor)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The 7-Level Skill Ladder */}
      <section className="py-14 sm:py-16 bg-[#F7F4EA] border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#141821]">
              The National Framework
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#141821] mt-1">
              Complete Level 0 to Level 6 Career Hierarchy
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-card">
            <LevelLadder currentLevel={4} />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold text-[#141821] block">Levels 0 & 1: Entry & Trainee</span>
                <span className="text-gray-500 mt-1 block">Digital modules, basic safety guidelines, tool orientation.</span>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold text-[#1D8C6C] block">Level 2: Assistant</span>
                <span className="text-gray-500 mt-1 block">Verified 300 hrs on-site apprenticeship with a licensed mentor.</span>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold text-[#2E6FB0] block">Levels 3 & 4: Skilled & Senior</span>
                <span className="text-gray-500 mt-1 block">Independent task execution, specialized residential & commercial mastery.</span>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold text-[#C1502E] block">Levels 5 & 6: Supervisor & Contractor</span>
                <span className="text-gray-500 mt-1 block">Crew leadership, blueprint compliance, multi-trade project delivery.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Service Categories */}
      <section id="categories" className="py-14 sm:py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2E6FB0]">
                Trades & Specializations
              </h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#141821] mt-1">
                Verified professionals across 8 core trades
              </p>
            </div>
            <Link to="/customer/search">
              <Button variant="outline" size="sm" className="text-xs">
                View All Trades &rarr;
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/customer/search?trade=${cat.name}`)}
                className="p-5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-[#2E6FB0] hover:shadow-card transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-10 h-10 rounded-lg bg-[#141821] text-white flex items-center justify-center font-bold text-xs">
                      {cat.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">
                      {cat.baseRate}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#141821]">{cat.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs font-medium text-gray-500">
                  <span>{cat.count}</span>
                  <span className="text-[#2E6FB0] font-semibold flex items-center gap-0.5">
                    Browse <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Team Builder Preview */}
      <section className="py-14 sm:py-16 bg-[#141821] text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F2B705]">
                Enterprise & Contractor Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Need an entire multi-trade crew? <br />
                <span className="text-[#C1502E]">Deploy with the Team Builder.</span>
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Whether you are building a villa, renovating a commercial floor, or setting up factory power infrastructure — customize your crew size, mix contractor supervisors with skilled masons and electricians, and receive an instant transparent daily rate estimate.
              </p>
              <div className="pt-2">
                <Link to="/customer/team-builder">
                  <Button variant="rust" size="md">
                    Launch Interactive Team Builder
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#1e2330] rounded-lg border border-gray-700 p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="font-bold text-white text-sm">Example: House Construction Crew</span>
                  <span className="bg-[#1D8C6C] text-white px-2 py-0.5 rounded font-semibold text-[10px]">10 WORKERS</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-[#141821] p-2.5 rounded border border-gray-700">
                    <span>1 Project Contractor (Level 6)</span>
                    <span className="font-mono text-gray-300">₹2,500/day</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#141821] p-2.5 rounded border border-gray-700">
                    <span>2 Lead Masons (Supervisor Level 5)</span>
                    <span className="font-mono text-gray-300">₹2,800/day</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#141821] p-2.5 rounded border border-gray-700">
                    <span>5 General Labourers (Level 1)</span>
                    <span className="font-mono text-gray-300">₹2,500/day</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#141821] p-2.5 rounded border border-gray-700">
                    <span>1 Conduit Electrician + 1 Plumber</span>
                    <span className="font-mono text-gray-300">₹1,700/day</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-700 flex justify-between items-center font-bold text-sm text-white">
                  <span>Estimated Daily Total</span>
                  <span className="text-[#F2B705]">₹9,500 / day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141821] text-white pt-12 pb-8 border-t border-gray-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#C1502E] flex items-center justify-center font-black text-white text-xs">
                  SBI
                </div>
                <span className="text-base font-bold text-white">SkillBridge India</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                National workforce skill development and verified blue-collar marketplace. Aligned with Skill India and NSQF standards.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3">For Customers</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/customer/search" className="hover:text-white">Search Verified Workers</Link></li>
                <li><Link to="/customer/team-builder" className="hover:text-white">Team & Crew Builder</Link></li>
                <li><Link to="/customer/bookings" className="hover:text-white">My Bookings</Link></li>
                <li><Link to="/#skill-passport" className="hover:text-white">Verify Skill Passport</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3">For Workers & Trainees</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/role-select" className="hover:text-white">Register as Professional</Link></li>
                <li><Link to="/trainee/learning" className="hover:text-white">Digital Skill Courses</Link></li>
                <li><Link to="/trainee/quiz" className="hover:text-white">Certification Exam</Link></li>
                <li><Link to="/trainee/apprenticeship" className="hover:text-white">Log Apprenticeship Hours</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-3">Admin & Compliance</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/admin/dashboard" className="hover:text-white">Admin Dashboard</Link></li>
                <li><Link to="/admin/certifications" className="hover:text-white">Certification Approvals</Link></li>
                <li><span className="text-gray-500">Ministry of Skill Dev Aligned</span></li>
                <li><span className="text-gray-500">Aadhaar e-KYC Secured</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-500 gap-3">
            <p>&copy; {new Date().getFullYear()} SkillBridge India. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Security & Escrow</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
