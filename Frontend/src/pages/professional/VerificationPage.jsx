import React, { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Camera,
  ChevronDown,
  CheckCircle2,
  Volume2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VerificationPage = () => {
  const navigate = useNavigate();

  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");

  const [idType, setIdType] = useState("PAN Card");

  const [documents, setDocuments] = useState({
    aadhaarFront: null,
    aadhaarBack: null,
    secondIdFront: null,
    secondIdBack: null,
  });

  const handleFileUpload = (field, file) => {
    if (!file) return;

    setDocuments((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const aadhaarComplete =
    aadhaarNumber.replace(/\s/g, "").length === 12 &&
    documents.aadhaarFront &&
    documents.aadhaarBack;

  const secondIdComplete =
    panNumber.length >= 8 &&
    documents.secondIdFront;

  const sectionsReady =
    Number(Boolean(aadhaarComplete)) +
    Number(Boolean(secondIdComplete));

  const progress = Math.round((sectionsReady / 3) * 100);

  const formatAadhaar = (value) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 12);

    return numbers.replace(
      /(\d{4})(?=\d)/g,
      "$1 "
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

        <div className="flex-1 flex items-center justify-between">

          <div>
            <h1 className="text-lg font-bold text-[#141821]">
              Verification
            </h1>

            <div className="w-12 h-1 bg-[#C1502E] rounded-full mt-1" />
          </div>

          <button
            type="button"
            className="w-8 h-8 rounded-full border border-orange-200 bg-orange-50 flex items-center justify-center"
            onClick={() => {
              if (window.speechSynthesis) {
                window.speechSynthesis.speak(
                  new SpeechSynthesisUtterance(
                    "Complete identity verification"
                  )
                );
              }
            }}
          >
            <Volume2 className="w-4 h-4 text-[#FF7043]" />
          </button>

        </div>

      </div>

      {/* PROGRESS CARD */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#FF7043]" />
          </div>

          <div className="flex-1">

            <h2 className="text-sm font-bold text-[#141821]">
              Complete identity verification
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              {sectionsReady} of 3 sections ready
            </p>

          </div>

        </div>

        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">

          <div
            className="h-full bg-[#FF7043] rounded-full transition-all"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* AADHAAR SECTION */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">

        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-2">

            <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold">
              1
            </div>

            <h2 className="text-sm font-bold text-[#141821]">
              Aadhaar card
            </h2>

            <span className="text-[10px] font-bold tracking-wider text-gray-400">
              REQUIRED
            </span>

          </div>

          <div
            className={`px-3 py-1.5 rounded-full text-[10px] font-semibold ${
              aadhaarComplete
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {aadhaarComplete
              ? "✓ Uploaded"
              : "○ Not uploaded"}
          </div>

        </div>

        {/* AADHAAR NUMBER */}
        <div className="mt-5">

          <label className="block text-xs font-semibold text-gray-500 mb-2">
            Aadhaar number
            <span className="text-red-500"> *</span>
          </label>

          <input
            type="text"
            inputMode="numeric"
            value={formatAadhaar(aadhaarNumber)}
            onChange={(e) =>
              setAadhaarNumber(
                e.target.value.replace(/\D/g, "")
              )
            }
            placeholder="0000 0000 0000"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-semibold tracking-wider focus:outline-none focus:border-[#C1502E] focus:ring-2 focus:ring-orange-100"
          />

        </div>

        {/* DOCUMENT UPLOAD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

          <UploadBox
            title="Front side"
            field="aadhaarFront"
            file={documents.aadhaarFront}
            onUpload={handleFileUpload}
          />

          <UploadBox
            title="Back side"
            field="aadhaarBack"
            file={documents.aadhaarBack}
            onUpload={handleFileUpload}
          />

        </div>

      </section>

      {/* SECOND ID */}
      <section className="bg-white border border-gray-200 rounded-lg p-5">

        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-2">

            <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold">
              2
            </div>

            <h2 className="text-sm font-bold text-[#141821]">
              One more ID
            </h2>

            <span className="text-[10px] font-bold tracking-wider text-gray-400">
              REQUIRED
            </span>

          </div>

          <div
            className={`px-3 py-1.5 rounded-full text-[10px] font-semibold ${
              secondIdComplete
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {secondIdComplete
              ? "✓ Uploaded"
              : "○ Not uploaded"}
          </div>

        </div>

        {/* ID TYPE */}
        <div className="mt-5">

          <label className="block text-xs font-semibold text-gray-500 mb-2">
            Choose ID type
          </label>

          <div className="relative">

            <select
              value={idType}
              onChange={(e) =>
                setIdType(e.target.value)
              }
              className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-semibold bg-white focus:outline-none focus:border-[#C1502E]"
            >
              <option>Pan Card</option>
              <option>Driving Licence</option>
              <option>Passport</option>
              <option>Voter ID</option>
            </select>

            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-500" />

          </div>

        </div>

        {/* ID NUMBER */}
        <div className="mt-5">

          <label className="block text-xs font-semibold text-gray-500 mb-2">
            {idType} number
          </label>

          <input
            type="text"
            value={panNumber}
            onChange={(e) =>
              setPanNumber(
                e.target.value.toUpperCase()
              )
            }
            placeholder={
              idType === "Pan Card"
                ? "ABCDE1234F"
                : "Enter document number"
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm font-semibold uppercase focus:outline-none focus:border-[#C1502E] focus:ring-2 focus:ring-orange-100"
          />

        </div>

        {/* SECOND ID UPLOAD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

          <UploadBox
            title="Front side"
            field="secondIdFront"
            file={documents.secondIdFront}
            onUpload={handleFileUpload}
          />

          <UploadBox
            title="Back side"
            field="secondIdBack"
            file={documents.secondIdBack}
            onUpload={handleFileUpload}
          />

        </div>

      </section>

      {/* SUBMIT */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">

        <button
          type="button"
          disabled={!aadhaarComplete || !secondIdComplete}
          onClick={() => {
            alert(
              "Verification submitted successfully."
            );
          }}
          className={`w-full py-3 rounded-lg text-sm font-bold transition ${
            aadhaarComplete && secondIdComplete
              ? "bg-[#111111] text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Submit for verification
        </button>

        <p className="text-center text-[10px] text-gray-400 mt-3">
          Your documents will be securely reviewed before your
          professional account is approved.
        </p>

      </div>

    </div>
  );
};


/* =====================================================
   UPLOAD BOX
===================================================== */

const UploadBox = ({
  title,
  field,
  file,
  onUpload,
}) => {
  return (
    <label className="cursor-pointer">

      <p className="text-xs font-semibold text-[#141821] mb-2">
        {title}
      </p>

      <div
        className={`min-h-[130px] rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-center transition ${
          file
            ? "border-green-400 bg-green-50"
            : "border-orange-200 bg-orange-50/50 hover:bg-orange-50"
        }`}
      >

        {file ? (
          <>
            <CheckCircle2 className="w-8 h-8 text-green-500" />

            <p className="mt-2 text-xs font-bold text-green-700">
              Document selected
            </p>

            <p className="text-[10px] text-gray-500 mt-1 max-w-[160px] truncate">
              {file.name}
            </p>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-lg bg-[#FF7043] flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>

            <p className="mt-2 text-xs font-bold text-[#FF7043]">
              Add {title.toLowerCase()}
            </p>

            <p className="text-[10px] text-gray-400 mt-1">
              JPG, PNG or PDF
            </p>
          </>
        )}

      </div>

      <input
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) =>
          onUpload(field, e.target.files?.[0])
        }
      />

    </label>
  );
};

export default VerificationPage;