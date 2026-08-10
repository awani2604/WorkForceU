import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Roles: 'customer' | 'professional' | 'trainee' | 'admin' | null
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("WorkForceU_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default logged in user for instant preview capability
    return {
      id: "usr-01",
      name: "Pooja Reddy",
      phone: "+91 98450 11223",
      role: "customer",
      location: "Bengaluru, KA",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    };
  });

  const [authPendingPhone, setAuthPendingPhone] = useState("");
  const [authPendingRole, setAuthPendingRole] = useState("customer");

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("WorkForceU_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("WorkForceU_user");
    }
  }, [currentUser]);

  const switchRole = (newRole) => {
    let mockProfiles = {
      customer: {
        id: "usr-01",
        name: "Pooja Reddy",
        phone: "+91 98450 11223",
        role: "customer",
        location: "Bengaluru, KA",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      },
      professional: {
        id: "w-101",
        name: "Rameshwar Sharma",
        phone: "+91 98451 23890",
        role: "professional",
        trade: "Electrician",
        level: 4,
        levelTitle: "Senior Worker",
        location: "Bengaluru, KA",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces&q=80",
      },
      trainee: {
        id: "tr-901",
        name: "Bablu Paswan",
        phone: "+91 91234 56780",
        role: "trainee",
        trade: "Electrician",
        level: 1,
        levelTitle: "Trainee",
        location: "Pune, MH",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=faces&q=80",
      },
      admin: {
        id: "adm-01",
        name: "Admin Ravi Kumar",
        phone: "+91 99000 88776",
        role: "admin",
        designation: "Platform Verification Lead",
        location: "National HQ, New Delhi",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      }
    };

    const target = mockProfiles[newRole] || mockProfiles.customer;
    setCurrentUser(target);
    return target;
  };

  const loginWithPhonePassword = (phone, password) => {
    // Mock login logic
    const user = {
      id: "usr-01",
      name: "Pooja Reddy",
      phone: phone || "+91 98450 11223",
      role: "customer",
      location: "Bengaluru, KA",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    };
    setCurrentUser(user);
    return user;
  };

  const initiateOtpFlow = (phone, role = "customer") => {
    setAuthPendingPhone(phone);
    setAuthPendingRole(role);
  };

  const verifyOtp = (otpCode) => {
    if (otpCode === "123456" || otpCode.length === 6) {
      let role = authPendingRole || "customer";
      const targetUser = switchRole(role);
      setAuthPendingPhone("");
      return { success: true, user: targetUser };
    }
    return { success: false, message: "Invalid OTP. Use 123456 for instant demo verification." };
  };

  const signup = (fullName, phone, password, role = "customer") => {
    const newUser = {
      id: "usr-" + Date.now(),
      name: fullName,
      phone: phone,
      role: role,
      location: "India",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    };
    setCurrentUser(newUser);
    return newUser;
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
        loginWithPhonePassword,
        initiateOtpFlow,
        verifyOtp,
        signup,
        logout,
        authPendingPhone,
        authPendingRole,
        setAuthPendingRole
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
