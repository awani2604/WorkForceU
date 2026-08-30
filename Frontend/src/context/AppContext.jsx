import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const AppContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const INITIAL_ADMIN_STATS = {
  totalUsers: 0,
  activeWorkers: 0,
  activeCustomers: 0,
  pendingVerifications: 0,
  activeBookings: 0,
  totalPlatformVolume: "₹0",
  recentUsers: [],
  auditActivity: [],
};

export const AppProvider = ({ children }) => {
  const { authToken } = useAuth();

  const [workers, setWorkers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [adminStats, setAdminStats] = useState(INITIAL_ADMIN_STATS);
  const [proAvailability, setProAvailability] = useState({});

  // NEW: real dashboard numbers coming from the backend
  const [dashboardStats, setDashboardStats] = useState({
    activeBookings: 0,
    completedJobs: 0,
  });
  const [dashboardStatsLoading, setDashboardStatsLoading] = useState(false);

  useEffect(() => {
    // If nobody is logged in yet, don't call the API
    if (!authToken) return;

    const fetchStats = async () => {
      setDashboardStatsLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/bookings/stats`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load stats");

        const data = await res.json();
        setDashboardStats({
          activeBookings: data.activeBookings,
          completedJobs: data.completedJobs,
        });
      } catch (error) {
        console.error("Could not load dashboard stats:", error.message);
      } finally {
        setDashboardStatsLoading(false);
      }
    };

    fetchStats();
  }, [authToken]);

  const createBooking = (bookingData) => {
    const newBooking = {
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      status: "Pending",
      paymentStatus: "Escrow Secured",
      rating: null,
      ...bookingData,
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  const rateBooking = (bookingId, rating, comment = "") => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, rating, review: comment }
          : booking
      )
    );
  };

  const toggleDateAvailability = (dateString, slotType = "fullDay") => {
    setProAvailability((prev) => {
      const current = prev[dateString] || {
        morning: false,
        afternoon: false,
        fullDay: false,
      };

      const updated = { ...current };

      if (slotType === "fullDay") {
        const nextState = !current.fullDay;
        updated.fullDay = nextState;
        updated.morning = nextState;
        updated.afternoon = nextState;
      } else {
        updated[slotType] = !updated[slotType];
        updated.fullDay = updated.morning && updated.afternoon;
      }

      return {
        ...prev,
        [dateString]: updated,
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        workers,
        setWorkers,
        bookings,
        createBooking,
        updateBookingStatus,
        rateBooking,
        adminStats,
        setAdminStats,
        proAvailability,
        toggleDateAvailability,
        dashboardStats,
        dashboardStatsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
};
