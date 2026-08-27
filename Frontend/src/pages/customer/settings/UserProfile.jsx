import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { User, Mail, Phone, Camera, Save } from "lucide-react";

export const UserProfile = () => {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    // TODO: call your update-profile API here
    setTimeout(() => setSaving(false), 800);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-lg font-bold text-gray-900 mb-6">User Profile</h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"}
            alt={currentUser?.name}
            className="w-16 h-16 rounded-full object-cover border border-gray-200"
          />
          <button className="absolute -bottom-1 -right-1 bg-[#C1502E] p-1.5 rounded-full text-white">
            <Camera className="w-3 h-3" />
          </button>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{currentUser?.name}</p>
          <p className="text-xs text-gray-500 capitalize">{currentUser?.role} Account</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 bg-white border border-gray-200 rounded-lg p-5">
        <div>
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1">
            <User className="w-3.5 h-3.5" /> Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C1502E]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1">
            <Mail className="w-3.5 h-3.5" /> Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C1502E]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1">
            <Phone className="w-3.5 h-3.5" /> Phone
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#C1502E]"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#C1502E] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#a8442a] transition disabled:opacity-60"
        >
          <Save className="w-3.5 h-3.5" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};