import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

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
  const [workers, setWorkers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [adminStats, setAdminStats] = useState(INITIAL_ADMIN_STATS);

  const [proAvailability, setProAvailability] = useState({});

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
