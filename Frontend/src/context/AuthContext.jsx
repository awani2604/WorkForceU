import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Roles: 'customer' | 'professional' | 'admin' | null
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("WorkForceU_user");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }

    return {
      id: "usr-01",
      name: "Pooja",
      phone: "+91 98450 11223",
      role: "customer",
      location: "Bengaluru, KA",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    };
  });

  const [authPendingPhone, setAuthPendingPhone] = useState("");
  const [authPendingRole, setAuthPendingRole] = useState("customer");
  const [authPendingSignup, setAuthPendingSignup] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("WorkForceU_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("WorkForceU_user");
    }
  }, [currentUser]);

  const switchRole = (newRole) => {
    const mockProfiles = {
      customer: {
        id: "usr-01",
        name: "Pooja",
        phone: "+91 98450 11223",
        role: "customer",
        location: "Bengaluru, KA",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      },

      professional: {
        id: "w-101",
        name: "Rameshwar",
        phone: "+91 98451 23890",
        role: "professional",
        trade: "Electrician",
        level: 4,
        levelTitle: "Senior Worker",
        location: "Bengaluru, KA",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces&q=80",
      },

      admin: {
        id: "adm-01",
        name: "Admin Ravi",
        phone: "+91 99000 88776",
        role: "admin",
        designation: "Platform Verification Lead",
        location: "National HQ, New Delhi",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      },
    };

    const target = mockProfiles[newRole] || mockProfiles.customer;
    setCurrentUser(target);
    return target;
  };

  const initiateOtpFlow = (phone, role = "customer") => {
    setAuthPendingPhone(phone);
    setAuthPendingRole(role);
  };

  const signup = (fullName, phone, role = "customer") => {
    setAuthPendingSignup({
      fullName,
      phone,
      role,
    });
  };

  const verifyOtp = (otpCode) => {
    // Demo OTP. Replace this check with your real backend OTP verification later.
    if (otpCode !== "123456") {
      return {
        success: false,
        message: "Invalid OTP. Use 123456 for instant demo verification.",
      };
    }

    let targetUser;

    if (authPendingSignup) {
      const { fullName, phone, role } = authPendingSignup;

      targetUser = {
        id: "usr-" + Date.now(),
        name: fullName,
        phone: "+91 " + phone,
        role,
        location: "India",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      };

      if (role === "professional") {
        targetUser.trade = "Professional";
        targetUser.level = 1;
        targetUser.levelTitle = "Verified Professional";
      }

      setCurrentUser(targetUser);
      setAuthPendingSignup(null);
    } else {
      targetUser = switchRole(authPendingRole || "customer");
    }

    setAuthPendingPhone("");

    return {
      success: true,
      user: targetUser,
    };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("WorkForceU_user");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        switchRole,
        initiateOtpFlow,
        verifyOtp,
        signup,
        logout,
        authPendingPhone,
        authPendingRole,
        setAuthPendingRole,
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
