import React, { createContext, useContext, useState } from "react";
import {
  MOCK_WORKERS,
  MOCK_BOOKINGS,
  TRAINING_MODULES,
  MOCK_QUIZ,
  MOCK_APPRENTICESHIP_LOGS,
  MOCK_CERTIFICATION_REQUESTS,
  MOCK_TRAINEE_PROFILE,
  MOCK_ADMIN_STATS
} from "../mock/mockData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Workers State
  const [workers, setWorkers] = useState(MOCK_WORKERS);

  // Bookings State
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

  // Trainee Learning Modules State
  const [modules, setModules] = useState(TRAINING_MODULES);

  // Trainee Apprenticeship Logs State
  const [apprenticeshipLogs, setApprenticeshipLogs] = useState(MOCK_APPRENTICESHIP_LOGS);

  // Trainee Profile State
  const [traineeProfile, setTraineeProfile] = useState(MOCK_TRAINEE_PROFILE);

  // Admin Certification Requests State
  const [certRequests, setCertRequests] = useState(MOCK_CERTIFICATION_REQUESTS);

  // Admin Stats State
  const [adminStats, setAdminStats] = useState(MOCK_ADMIN_STATS);

  // Professional Availability State (Selected Dates & Slots)
  const [proAvailability, setProAvailability] = useState({
    "2026-08-10": { morning: true, afternoon: true, fullDay: true },
    "2026-08-11": { morning: true, afternoon: true, fullDay: true },
    "2026-08-12": { morning: true, afternoon: false, fullDay: false },
    "2026-08-14": { morning: false, afternoon: true, fullDay: false },
    "2026-08-15": { morning: true, afternoon: true, fullDay: true },
    "2026-08-18": { morning: true, afternoon: true, fullDay: true },
    "2026-08-19": { morning: true, afternoon: true, fullDay: true },
  });

  // Action: Add new customer booking
  const createBooking = (bookingData) => {
    const newBooking = {
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      status: "Pending",
      paymentStatus: "Escrow Secured",
      rating: null,
      ...bookingData
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  // Action: Update booking status (e.g. from Professional or Customer actions)
  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  // Action: Rate a completed booking
  const rateBooking = (bookingId, rating, comment = "") => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, rating } : b))
    );
  };

  // Action: Toggle Trainee Module Lesson completion
  const toggleLessonCompletion = (moduleId, lessonId) => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== moduleId) return mod;
        const updatedLessons = mod.lessons.map((les) =>
          les.id === lessonId ? { ...les, completed: !les.completed } : les
        );
        const completedCount = updatedLessons.filter((l) => l.completed).length;
        const progress = Math.round((completedCount / updatedLessons.length) * 100);
        const status =
          progress === 100 ? "Completed" : progress > 0 ? "In Progress" : "Not Started";

        return {
          ...mod,
          lessons: updatedLessons,
          progress,
          status
        };
      })
    );
  };

  // Action: Add new Apprenticeship log entry
  const addApprenticeshipLog = (logData) => {
    const newLog = {
      id: "log-" + Math.floor(500 + Math.random() * 500),
      status: "Pending Approval",
      signedAt: null,
      ...logData
    };
    setApprenticeshipLogs((prev) => [newLog, ...prev]);
    
    // Update logged hours in trainee profile
    setTraineeProfile((prev) => {
      const addedHours = Number(logData.hours) || 0;
      const newTotal = prev.completedHours + addedHours;
      return {
        ...prev,
        completedHours: newTotal,
        pendingHours: prev.pendingHours + addedHours,
        overallProgress: Math.min(100, Math.round((newTotal / prev.requiredHours) * 100))
      };
    });

    return newLog;
  };

  // Action: Approve or Reject Certification in Admin
  const handleCertApproval = (requestId, newStatus, reason = "") => {
    setCertRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: newStatus, decisionReason: reason } : req
      )
    );

    // If Bablu Paswan's request is approved, level up trainee profile!
    if (requestId === "req-101" && newStatus === "Approved") {
      setTraineeProfile((prev) => ({
        ...prev,
        currentLevel: 2,
        currentLevelTitle: "Assistant",
        targetLevel: 3,
        targetLevelTitle: "Skilled Worker",
        verificationStatus: "Verified Assistant (Level 2)"
      }));
    }
  };

  // Action: Toggle Professional availability for a specific date
  const toggleDateAvailability = (dateString, slotType = "fullDay") => {
    setProAvailability((prev) => {
      const current = prev[dateString] || { morning: false, afternoon: false, fullDay: false };
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
        [dateString]: updated
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        workers,
        bookings,
        createBooking,
        updateBookingStatus,
        rateBooking,
        modules,
        toggleLessonCompletion,
        apprenticeshipLogs,
        addApprenticeshipLog,
        traineeProfile,
        setTraineeProfile,
        certRequests,
        handleCertApproval,
        adminStats,
        proAvailability,
        toggleDateAvailability
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
