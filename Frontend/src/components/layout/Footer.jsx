import React from 'react';

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white border-t border-orange-50 pt-16">
      <div className="max-w-6xl mx-auto px-10 flex flex-wrap justify-between gap-10 relative z-10">

        {/* Brand */}
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-md bg-orange-600 flex items-center justify-center text-white font-extrabold text-sm">
              W
            </div>
            <span className="text-lg font-extrabold text-slate-900">WorkForceU</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500 mb-4">
            National workforce skill development and verified blue-collar
            marketplace. Aligned with Skill India and NSQF standards.
          </p>
          <div className="text-xs text-slate-400">
            © 2026 WorkForceU. All rights reserved.
          </div>
        </div>

        {/* Link columns */}
        <div className="flex flex-wrap gap-14">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wide text-slate-900 mb-4">
              For Customers
            </h5>
            <a href="/search-workers" className="block text-sm text-slate-500 hover:text-orange-600 mb-3">
              Search Verified Workers
            </a>
            <a href="/team-builder" className="block text-sm text-slate-500 hover:text-orange-600 mb-3">
              Team &amp; Crew Builder
            </a>
            <a href="/my-bookings" className="block text-sm text-slate-500 hover:text-orange-600 mb-3">
              My Bookings
            </a>
            <a href="/verify-passport" className="block text-sm text-slate-500 hover:text-orange-600 mb-3">
              Verify Skill Passport
            </a>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wide text-slate-900 mb-4">
              For Workers &amp; Trainees
            </h5>
            <a href="/register-professional" className="block text-sm text-slate-500 hover:text-orange-600 mb-3">
              Register as Professional
            </a>
            <a href="/courses" className="block text-sm text-slate-500 hover:text-orange-600 mb-3">
              Digital Skill Courses
            </a>
            <a href="/certification-exam" className="block text-sm text-slate-500 hover:text-orange-600 mb-3">
              Certification Exam
            </a>
            <a href="/apprenticeship-log" className="block text-sm text-slate-500 hover:text-orange-600 mb-3">
              Log Apprenticeship Hours
            </a>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wide text-slate-900 mb-4">
              Admin &amp; Compliance
            </h5>
            <a href="/admin" className="block text-sm text-slate-500 hover:text-orange-600 mb-3">
              Admin Dashboard
            </a>
            <a href="/certification-approvals" className="block text-sm text-slate-500 hover:text-orange-600 mb-3">
              Certification Approvals
            </a>
            <span className="block text-sm text-slate-300 mb-3">
              Ministry of Skill Dev Aligned
            </span>
            <span className="block text-sm text-slate-300 mb-3">
              Aadhaar e-KYC Secured
            </span>
          </div>
        </div>
      </div>

      {/* Giant background wordmark — subtle bleed top/bottom, still fully readable */}
      <div
        className="relative z-0 mt-10 w-full flex items-center justify-center overflow-hidden"
        style={{ height: '13vw', minHeight: '90px' }}
      >
        <span
          className="font-extrabold whitespace-nowrap bg-clip-text text-transparent opacity-60"
          style={{
            fontSize: '18vw',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            backgroundImage:
              'linear-gradient(90deg, #E8632A 0%, #F2A26B 45%, #FBDCC4 85%)',
          }}
        >
          workforceu
        </span>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-orange-50 max-w-6xl mx-auto px-10 py-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-400">
          © 2026 WorkForceU. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="/privacy" className="text-xs text-slate-500 hover:text-orange-600">
            Privacy Policy
          </a>
          <a href="/terms" className="text-xs text-slate-500 hover:text-orange-600">
            Terms of Service
          </a>
          <a href="/security" className="text-xs text-slate-500 hover:text-orange-600">
            Security &amp; Escrow
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;