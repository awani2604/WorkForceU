import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

// Layout Wrapper
import { Layout } from "./components/navigation/Layout";

// Section A: Public & Auth
import { LandingPage } from "./pages/public/LandingPage";
import { LoginPage } from "./pages/public/LoginPage";
import { SignupPage } from "./pages/public/SignupPage";
import { OtpVerificationPage } from "./pages/public/OtpVerificationPage";
import { RoleSelectionPage } from "./pages/public/RoleSelectionPage";

// Section B: Customer
import { CustomerDashboard } from "./pages/customer/CustomerDashboard";
import { SearchWorkersPage } from "./pages/customer/SearchWorkersPage";
import { WorkerProfilePage } from "./pages/customer/WorkerProfilePage";
import { BookWorkerPage } from "./pages/customer/BookWorkerPage";
import { MyBookingsPage } from "./pages/customer/MyBookingsPage";
import { TeamBuilderPage } from "./pages/customer/TeamBuilderPage";

// Section C: Professional
import { ProDashboard } from "./pages/professional/ProDashboard";
import { MyJobsPage } from "./pages/professional/MyJobsPage";
import { AvailabilityPage } from "./pages/professional/AvailabilityPage";

// Section D: Trainee
import { TraineeDashboard } from "./pages/trainee/TraineeDashboard";
import { LearningPage } from "./pages/trainee/LearningPage";
import { QuizPage } from "./pages/trainee/QuizPage";
import { TraineePassportPage } from "./pages/trainee/TraineePassportPage";
import { ApprenticeshipLogPage } from "./pages/trainee/ApprenticeshipLogPage";

// Section E: Admin
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { CertApprovalsPage } from "./pages/admin/CertApprovalsPage";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* SECTION A — PUBLIC & AUTHENTICATION */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-otp" element={<OtpVerificationPage />} />
            <Route path="/role-select" element={<RoleSelectionPage />} />

            {/* SECTION B — CUSTOMER MODULE */}
            <Route path="/customer" element={<Layout role="customer" />}>
              <Route index element={<Navigate to="/customer/dashboard" replace />} />
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="search" element={<SearchWorkersPage />} />
              <Route path="worker/:id" element={<WorkerProfilePage />} />
              <Route path="book/:id" element={<BookWorkerPage />} />
              <Route path="bookings" element={<MyBookingsPage />} />
              <Route path="team-builder" element={<TeamBuilderPage />} />
              <Route path="settings" element={<CustomerDashboard />} />
            </Route>

            {/* SECTION C — PROFESSIONAL MODULE */}
            <Route path="/professional" element={<Layout role="professional" />}>
              <Route index element={<Navigate to="/professional/dashboard" replace />} />
              <Route path="dashboard" element={<ProDashboard />} />
              <Route path="jobs" element={<MyJobsPage />} />
              <Route path="availability" element={<AvailabilityPage />} />
              <Route path="passport" element={<WorkerProfilePage />} />
              <Route path="settings" element={<ProDashboard />} />
            </Route>

            {/* SECTION D — TRAINEE MODULE */}
            <Route path="/trainee" element={<Layout role="trainee" />}>
              <Route index element={<Navigate to="/trainee/dashboard" replace />} />
              <Route path="dashboard" element={<TraineeDashboard />} />
              <Route path="learning" element={<LearningPage />} />
              <Route path="quiz" element={<QuizPage />} />
              <Route path="passport" element={<TraineePassportPage />} />
              <Route path="apprenticeship" element={<ApprenticeshipLogPage />} />
              <Route path="settings" element={<TraineeDashboard />} />
            </Route>

            {/* SECTION E — ADMIN MODULE */}
            <Route path="/admin" element={<Layout role="admin" />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="certifications" element={<CertApprovalsPage />} />
              <Route path="users" element={<AdminDashboard />} />
              <Route path="verifications" element={<CertApprovalsPage />} />
              <Route path="reports" element={<AdminDashboard />} />
            </Route>

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
