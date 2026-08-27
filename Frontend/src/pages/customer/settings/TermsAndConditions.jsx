import React from "react";

export const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-lg font-bold mb-4">Terms &amp; Conditions</h1>
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Welcome to WorkForceU India. By using our platform, you agree to
          the following terms and conditions governing bookings, trades,
          workers, and certificates listed on this site.
        </p>
        <h2 className="font-semibold text-gray-900 pt-2">1. Use of Platform</h2>
        <p>Users must provide accurate information while creating bookings or listing services.</p>
        <h2 className="font-semibold text-gray-900 pt-2">2. Payments</h2>
        <p>All payments made through the platform are subject to applicable service fees.</p>
        <h2 className="font-semibold text-gray-900 pt-2">3. Account Responsibility</h2>
        <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
        {/* Add your actual legal content here */}
      </div>
    </div>
  );
};