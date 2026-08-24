import React, { useState } from "react";
import {
  ArrowLeft,
  Pencil,
  ChevronRight,
  User,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PersonalInformationPage = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    gender: "",
    dateOfBirth: "",
    address: "",
    cityState: "Kolkata, West Bengal",
    pincode: "700052",
    emergencyName: "",
    emergencyPhone: "",
    relationship: "",
  });

  const [editing, setEditing] = useState(null);

  const handleSave = (field, value) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value,
    }));

    setEditing(null);
  };

  const DetailRow = ({ label, value, field }) => (
    <div className="py-3 border-b border-gray-200 last:border-b-0">

      <p className="text-xs font-semibold text-gray-400">
        {label}
      </p>

      {editing === field ? (
        <div className="flex gap-2 mt-1">

          <input
            autoFocus
            type={
              field === "dateOfBirth"
                ? "date"
                : field === "emergencyPhone"
                ? "tel"
                : "text"
            }
            defaultValue={value}
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-xs focus:outline-none focus:border-[#C1502E]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave(field, e.target.value);
              }

              if (e.key === "Escape") {
                setEditing(null);
              }
            }}
          />

          <button
            type="button"
            onClick={(e) =>
              handleSave(
                field,
                e.currentTarget.previousSibling.value
              )
            }
            className="px-3 py-2 rounded-md bg-[#C1502E] text-white text-xs font-semibold"
          >
            Save
          </button>

        </div>
      ) : (
        <p className="text-sm font-semibold text-[#141821] mt-1">
          {value || "Not added"}
        </p>
      )}

    </div>
  );

  const missingDetails = [
    { key: "gender", label: "Gender" },
    { key: "dateOfBirth", label: "Date of birth" },
    { key: "address", label: "Address" },
    {
      key: "emergencyName",
      label: "Emergency contact name",
    },
    {
      key: "emergencyPhone",
      label: "Emergency contact phone",
    },
    {
      key: "relationship",
      label: "Relationship",
    },
  ].filter((item) => !details[item.key]);

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
            Personal Information
          </h1>

          <div className="w-12 h-1 bg-[#C1502E] rounded-full mt-1" />
        </div>

      </div>

      {/* SAVED DETAILS */}
      <div className="bg-[#111111] rounded-lg p-5">

        <p className="text-[10px] font-bold tracking-widest text-[#FF7043] uppercase">
          Your saved details
        </p>

        <h2 className="text-xl font-bold text-white mt-2">
          Rameshwar Sharma
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          +91 98765 43210
        </p>

      </div>

      {/* PROFILE COMPLETION */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">

        <div className="flex items-center justify-between">

          <h2 className="text-sm font-bold text-[#141821]">
            Complete your profile
          </h2>

          <span className="text-xl font-bold text-[#C1502E]">
            33%
          </span>

        </div>

        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF7043] rounded-full"
            style={{ width: "33%" }}
          />
        </div>

        <p className="text-xs text-gray-400 mt-3">
          6 details still needed. Tap one to fill it in:
        </p>

        <div className="mt-2">

          {missingDetails.map((item) => (

            <button
              key={item.key}
              type="button"
              onClick={() => setEditing(item.key)}
              className="w-full flex items-center justify-between py-2.5 text-left hover:bg-gray-50 rounded-md px-2"
            >

              <div className="flex items-center gap-2">

                <span className="w-5 h-5 rounded-full border-2 border-[#FF7043]" />

                <span className="text-xs font-semibold text-[#141821]">
                  {item.label}
                </span>

              </div>

              <ChevronRight className="w-4 h-4 text-gray-400" />

            </button>

          ))}

        </div>

      </div>

      {/* BASIC DETAILS */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <User className="w-4 h-4 text-[#C1502E]" />

            <h2 className="text-sm font-bold text-[#141821]">
              Basic details
            </h2>

          </div>

          <button
            type="button"
            onClick={() => setEditing("gender")}
            className="flex items-center gap-1 text-xs font-semibold text-[#C1502E]"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>

        </div>

        <DetailRow
          label="Email"
          value=""
          field="email"
        />

        <DetailRow
          label="Gender"
          value={details.gender}
          field="gender"
        />

        <DetailRow
          label="Date of birth"
          value={details.dateOfBirth}
          field="dateOfBirth"
        />

      </div>

      {/* ADDRESS */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <MapPin className="w-4 h-4 text-[#C1502E]" />

            <h2 className="text-sm font-bold text-[#141821]">
              Address
            </h2>

          </div>

          <button
            type="button"
            onClick={() => setEditing("address")}
            className="flex items-center gap-1 text-xs font-semibold text-[#C1502E]"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>

        </div>

        <DetailRow
          label="Address"
          value={details.address}
          field="address"
        />

        <DetailRow
          label="City and state"
          value={details.cityState}
          field="cityState"
        />

        <DetailRow
          label="Pincode"
          value={details.pincode}
          field="pincode"
        />

      </div>

      {/* EMERGENCY CONTACT */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Phone className="w-4 h-4 text-[#C1502E]" />

            <h2 className="text-sm font-bold text-[#141821]">
              Emergency contact
            </h2>

          </div>

          <button
            type="button"
            onClick={() => setEditing("emergencyName")}
            className="flex items-center gap-1 text-xs font-semibold text-[#C1502E]"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>

        </div>

        <DetailRow
          label="Name"
          value={details.emergencyName}
          field="emergencyName"
        />

        <DetailRow
          label="Phone"
          value={details.emergencyPhone}
          field="emergencyPhone"
        />

        <DetailRow
          label="Relationship"
          value={details.relationship}
          field="relationship"
        />

      </div>

      {/* VERIFICATION */}
      <button
        type="button"
        onClick={() =>
          navigate("/professional/verification")
        }
        className="w-full bg-white border border-[#FF7043] rounded-lg p-4 flex items-center gap-4 text-left hover:bg-orange-50 transition"
      >

        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-[#FF7043]" />
        </div>

        <div className="flex-1">

          <h3 className="text-sm font-bold text-[#141821]">
            Complete your verification
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            Next step: submit your ID documents to get approved for work.
          </p>

        </div>

        <ChevronRight className="w-5 h-5 text-gray-400" />

      </button>

    </div>
  );
};

export default PersonalInformationPage;