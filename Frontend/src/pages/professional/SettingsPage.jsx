import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Lock,
  Bell,
  Shield,
  Briefcase,
  CreditCard,
  HelpCircle,
  LogOut,
  Trash2,
  ChevronRight,
  Smartphone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Eye,
  KeyRound,
  MessageSquare,
  Banknote,
  AlertTriangle,
  Volume2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [notifications, setNotifications] = useState({
    jobRequests: true,
    bookingUpdates: true,
    paymentUpdates: true,
    messages: true,
    email: true,
    sms: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    twoFactor: false,
  });

  const [workPreferences, setWorkPreferences] =
    useState({
      urgentJobs: true,
      locationBasedJobs: true,
    });

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const Toggle = ({
    enabled,
    onChange,
  }) => {
    return (
      <button
        type="button"
        onClick={onChange}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          enabled
            ? "bg-[#C1502E]"
            : "bg-gray-300"
        }`}
      >

        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
            enabled
              ? "translate-x-5"
              : "translate-x-0.5"
          }`}
        />

      </button>
    );
  };

  const SettingsRow = ({
    icon: Icon,
    title,
    description,
    onClick,
    right,
    danger = false,
  }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${
          danger
            ? "hover:bg-red-50"
            : "hover:bg-gray-50"
        }`}
      >

        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
            danger
              ? "bg-red-50"
              : "bg-gray-100"
          }`}
        >

          <Icon
            className={`w-4 h-4 ${
              danger
                ? "text-red-500"
                : "text-gray-500"
            }`}
          />

        </div>

        <div className="flex-1 min-w-0">

          <p
            className={`text-xs font-semibold ${
              danger
                ? "text-red-600"
                : "text-[#141821]"
            }`}
          >
            {title}
          </p>

          {description && (
            <p className="text-[11px] text-gray-400 mt-0.5">
              {description}
            </p>
          )}

        </div>

        {right || (
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        )}

      </button>
    );
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 text-[#141821]" />
        </button>

        <div>

          <h1 className="text-lg font-bold text-[#141821]">
            Settings
          </h1>

          <div className="w-12 h-1 bg-[#C1502E] rounded-full mt-1" />

        </div>

      </div>


      {/* ACCOUNT */}

      <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-200">

          <div className="flex items-center gap-2">

            <User className="w-4 h-4 text-[#C1502E]" />

            <h2 className="text-sm font-bold text-[#141821]">
              Account
            </h2>

          </div>

        </div>

        <SettingsRow
          icon={User}
          title="Account Details"
          description="Manage your personal account information"
          onClick={() =>
            navigate(
              "/professional/personal-information"
            )
          }
        />

        <SettingsRow
          icon={Mail}
          title="Email & Mobile"
          description="Manage your contact information"
          onClick={() =>
            alert(
              "Email and mobile settings will be available here."
            )
          }
        />

        <SettingsRow
          icon={Lock}
          title="Change Password"
          description="Update your account password"
          onClick={() =>
            alert(
              "Password change page will be available here."
            )
          }
        />

      </section>


      {/* NOTIFICATIONS */}

      <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-200">

          <div className="flex items-center gap-2">

            <Bell className="w-4 h-4 text-[#C1502E]" />

            <h2 className="text-sm font-bold text-[#141821]">
              Notifications
            </h2>

          </div>

        </div>


        <SettingToggleRow
          icon={Briefcase}
          title="Job Requests"
          description="Get notified when clients send new job requests"
          enabled={notifications.jobRequests}
          onChange={() =>
            setNotifications((prev) => ({
              ...prev,
              jobRequests:
                !prev.jobRequests,
            }))
          }
          Toggle={Toggle}
        />


        <SettingToggleRow
          icon={Bell}
          title="Booking Updates"
          description="Updates about accepted and scheduled jobs"
          enabled={notifications.bookingUpdates}
          onChange={() =>
            setNotifications((prev) => ({
              ...prev,
              bookingUpdates:
                !prev.bookingUpdates,
            }))
          }
          Toggle={Toggle}
        />


        <SettingToggleRow
          icon={Banknote}
          title="Payment Notifications"
          description="Receive notifications about payments and payouts"
          enabled={notifications.paymentUpdates}
          onChange={() =>
            setNotifications((prev) => ({
              ...prev,
              paymentUpdates:
                !prev.paymentUpdates,
            }))
          }
          Toggle={Toggle}
        />


        <SettingToggleRow
          icon={MessageSquare}
          title="Messages"
          description="Notifications for client messages"
          enabled={notifications.messages}
          onChange={() =>
            setNotifications((prev) => ({
              ...prev,
              messages:
                !prev.messages,
            }))
          }
          Toggle={Toggle}
        />


        <SettingToggleRow
          icon={Mail}
          title="Email Notifications"
          description="Receive important updates by email"
          enabled={notifications.email}
          onChange={() =>
            setNotifications((prev) => ({
              ...prev,
              email: !prev.email,
            }))
          }
          Toggle={Toggle}
        />


        <SettingToggleRow
          icon={Smartphone}
          title="SMS Notifications"
          description="Receive important updates through SMS"
          enabled={notifications.sms}
          onChange={() =>
            setNotifications((prev) => ({
              ...prev,
              sms: !prev.sms,
            }))
          }
          Toggle={Toggle}
          last
        />

      </section>


      {/* PRIVACY */}

      <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-200">

          <div className="flex items-center gap-2">

            <Shield className="w-4 h-4 text-[#C1502E]" />

            <h2 className="text-sm font-bold text-[#141821]">
              Privacy & Security
            </h2>

          </div>

        </div>


        <SettingToggleRow
          icon={Eye}
          title="Profile Visibility"
          description="Allow customers to find your professional profile"
          enabled={privacy.profileVisible}
          onChange={() =>
            setPrivacy((prev) => ({
              ...prev,
              profileVisible:
                !prev.profileVisible,
            }))
          }
          Toggle={Toggle}
        />


        <SettingToggleRow
          icon={KeyRound}
          title="Two-Factor Authentication"
          description="Add an additional layer of account security"
          enabled={privacy.twoFactor}
          onChange={() =>
            setPrivacy((prev) => ({
              ...prev,
              twoFactor:
                !prev.twoFactor,
            }))
          }
          Toggle={Toggle}
        />


        <SettingsRow
          icon={Smartphone}
          title="Active Devices"
          description="View devices currently signed into your account"
          onClick={() =>
            alert(
              "Active devices will be displayed here."
            )
          }
        />

      </section>


      {/* WORK PREFERENCES */}

      <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-200">

          <div className="flex items-center gap-2">

            <Briefcase className="w-4 h-4 text-[#C1502E]" />

            <h2 className="text-sm font-bold text-[#141821]">
              Work Preferences
            </h2>

          </div>

        </div>


        <SettingsRow
          icon={Briefcase}
          title="Preferred Job Types"
          description="Choose the types of work you want to receive"
          onClick={() =>
            alert(
              "Preferred job types settings will be available here."
            )
          }
        />


        <SettingsRow
          icon={MapPin}
          title="Preferred Locations"
          description="Choose areas where you want to accept jobs"
          onClick={() =>
            alert(
              "Preferred locations settings will be available here."
            )
          }
        />


        <SettingsRow
          icon={Clock}
          title="Working Hours"
          description="Set your preferred working schedule"
          onClick={() =>
            navigate(
              "/professional/availability"
            )
          }
        />


        <SettingToggleRow
          icon={AlertTriangle}
          title="Urgent Job Requests"
          description="Allow urgent job requests outside your normal schedule"
          enabled={workPreferences.urgentJobs}
          onChange={() =>
            setWorkPreferences((prev) => ({
              ...prev,
              urgentJobs:
                !prev.urgentJobs,
            }))
          }
          Toggle={Toggle}
        />


        <SettingToggleRow
          icon={MapPin}
          title="Location-Based Jobs"
          description="Show jobs close to your preferred locations"
          enabled={
            workPreferences.locationBasedJobs
          }
          onChange={() =>
            setWorkPreferences((prev) => ({
              ...prev,
              locationBasedJobs:
                !prev.locationBasedJobs,
            }))
          }
          Toggle={Toggle}
          last
        />

      </section>


      {/* PAYMENT */}

      <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-200">

          <div className="flex items-center gap-2">

            <CreditCard className="w-4 h-4 text-[#C1502E]" />

            <h2 className="text-sm font-bold text-[#141821]">
              Payment Preferences
            </h2>

          </div>

        </div>


        <SettingsRow
          icon={CreditCard}
          title="Payout Method"
          description="Manage your preferred bank or UPI payout method"
          onClick={() =>
            alert(
              "Payout method settings will be available here."
            )
          }
        />

        <SettingsRow
          icon={Banknote}
          title="Payment Notifications"
          description="Manage notifications related to your earnings"
          onClick={() =>
            alert(
              "Payment notifications are managed above."
            )
          }
        />

      </section>


      {/* LANGUAGE */}

      <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-200">

          <div className="flex items-center gap-2">

            <Globe className="w-4 h-4 text-[#C1502E]" />

            <h2 className="text-sm font-bold text-[#141821]">
              Language & Accessibility
            </h2>

          </div>

        </div>


        <SettingsRow
          icon={Globe}
          title="Language"
          description="Choose your preferred language"
          onClick={() =>
            alert(
              "Language selection will be available here."
            )
          }
        />


        <SettingsRow
          icon={Volume2}
          title="Accessibility"
          description="Voice assistance and accessibility preferences"
          onClick={() =>
            alert(
              "Accessibility settings will be available here."
            )
          }
        />

      </section>


      {/* HELP */}

      <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-200">

          <div className="flex items-center gap-2">

            <HelpCircle className="w-4 h-4 text-[#C1502E]" />

            <h2 className="text-sm font-bold text-[#141821]">
              Help & Support
            </h2>

          </div>

        </div>


        <SettingsRow
          icon={HelpCircle}
          title="Help Center"
          description="Find answers to common questions"
          onClick={() =>
            alert(
              "Help Center will be available here."
            )
          }
        />


        <SettingsRow
          icon={MessageSquare}
          title="Contact Support"
          description="Get help from the WorkForceU support team"
          onClick={() =>
            alert(
              "Support contact options will be available here."
            )
          }
        />


        <SettingsRow
          icon={AlertTriangle}
          title="Report a Problem"
          description="Report an issue with the platform"
          onClick={() =>
            alert(
              "Problem reporting will be available here."
            )
          }
        />

      </section>


      {/* ACCOUNT ACTIONS */}

      <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">

        <div className="px-4 py-3 border-b border-gray-200">

          <h2 className="text-sm font-bold text-[#141821]">
            Account Actions
          </h2>

        </div>


        <SettingsRow
          icon={LogOut}
          title="Sign Out"
          description="Sign out of your WorkForceU account"
          onClick={handleLogout}
          danger
        />


        <SettingsRow
          icon={Trash2}
          title="Delete Account"
          description="Permanently delete your WorkForceU account"
          onClick={() =>
            setShowDeleteConfirmation(true)
          }
          danger
        />

      </section>


      {/* DELETE CONFIRMATION */}

      {showDeleteConfirmation && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-5">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">

                <Trash2 className="w-4 h-4 text-red-500" />

              </div>

              <h3 className="text-sm font-bold text-[#141821]">
                Delete Account?
              </h3>

            </div>

            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              This action cannot be undone. Your account,
              profile information and platform data may be
              permanently removed.
            </p>

            <div className="flex gap-2 mt-5">

              <button
                type="button"
                onClick={() =>
                  setShowDeleteConfirmation(false)
                }
                className="flex-1 py-2 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  alert(
                    "Account deletion request submitted."
                  );
                }}
                className="flex-1 py-2 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
              >
                Delete Account
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


/* =====================================================
   TOGGLE ROW
===================================================== */

const SettingToggleRow = ({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
  Toggle,
  last = false,
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${
        !last ? "border-b border-gray-100" : ""
      }`}
    >

      <Icon className="w-4 h-4 text-gray-500 shrink-0" />

      <div className="flex-1">

        <p className="text-xs font-semibold text-[#141821]">
          {title}
        </p>

        <p className="text-[11px] text-gray-400">
          {description}
        </p>

      </div>

      <Toggle
        enabled={enabled}
        onChange={onChange}
      />

    </div>
  );
};

export default SettingsPage;