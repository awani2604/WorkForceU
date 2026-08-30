import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// Frontend .env must define VITE_API_URL=http://localhost:5000 (see note below)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function apiRequest(path, { body, token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || "Something went wrong. Please try again.");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("WorkForceU_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("WorkForceU_token") || null
  );

  // Tracks the in-progress signup/login OTP flow
  const [authPendingPhone, setAuthPendingPhone] = useState("");
  const [authPendingRole, setAuthPendingRole] = useState("customer");
  const [authPendingPurpose, setAuthPendingPurpose] = useState("login"); // "signup" | "login"
  const [authPendingName, setAuthPendingName] = useState(""); // needed to resend signup OTP
  const [otpExpiresInSeconds, setOtpExpiresInSeconds] = useState(null);

  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("WorkForceU_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("WorkForceU_user");
    }
  }, [currentUser]);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("WorkForceU_token", authToken);
    } else {
      localStorage.removeItem("WorkForceU_token");
    }
  }, [authToken]);

  // Step 1a — Signup: creates the account, backend sends the first OTP automatically
  const signup = async (fullName, phone, role = "customer") => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const data = await apiRequest("/api/auth/register", {
        body: { name: fullName, mobile: phone, role },
      });

      setAuthPendingName(fullName);
      setAuthPendingPhone(phone);
      setAuthPendingRole(role);
      setAuthPendingPurpose("signup");
      setOtpExpiresInSeconds(data.expiresInSeconds ?? null);

      return { success: true, data };
    } catch (error) {
      setAuthError(error.message);
      return { success: false, message: error.message };
    } finally {
      setAuthLoading(false);
    }
  };

  // Step 1b — Login: requests an OTP for an existing, already-verified account
  const initiateOtpFlow = async (phone, role = "customer") => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const data = await apiRequest("/api/auth/login/request-otp", {
        body: { mobile: phone, role },
      });

      setAuthPendingPhone(phone);
      setAuthPendingRole(role);
      setAuthPendingPurpose("login");
      setOtpExpiresInSeconds(data.expiresInSeconds ?? null);

      return { success: true, data };
    } catch (error) {
      setAuthError(error.message);
      return { success: false, message: error.message };
    } finally {
      setAuthLoading(false);
    }
  };

  // Step 2 — Verify the 6-digit code the user typed in
  const verifyOtp = async (otpCode) => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const data = await apiRequest("/api/auth/otp/verify", {
        body: {
          mobile: authPendingPhone,
          role: authPendingRole,
          purpose: authPendingPurpose,
          otp: otpCode,
        },
      });

      setCurrentUser(data.user);
      setAuthToken(data.token);
      setAuthPendingPhone("");
      setAuthPendingName("");

      return { success: true, user: data.user };
    } catch (error) {
      setAuthError(error.message);
      return { success: false, message: error.message };
    } finally {
      setAuthLoading(false);
    }
  };

  // Re-sends the OTP for whichever flow (signup/login) is currently pending
  const resendOtp = async () => {
    if (authPendingPurpose === "signup") {
      return signup(authPendingName, authPendingPhone, authPendingRole);
    }
    return initiateOtpFlow(authPendingPhone, authPendingRole);
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    setAuthPendingPhone("");
    setAuthPendingName("");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authToken,
        signup,
        initiateOtpFlow,
        verifyOtp,
        resendOtp,
        logout,
        authPendingPhone,
        authPendingRole,
        authPendingPurpose,
        setAuthPendingRole,
        otpExpiresInSeconds,
        authError,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
