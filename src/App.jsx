import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "./styles/GlobalStyles";

import { AuthProvider } from "./context/AuthContext";
import {
  ProtectedRoute,
  PublicRoute,
} from "./features/components/ProtectedRoute";

import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Reports from "./pages/Reports";
import Report from "./pages/Report";
import Employees from "./pages/Employees";
import ReportMain from "./pages/ReportMain";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";

import "./index.css";

function App() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute requiredPermissions={["view_dashboard"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="reportCategory" element={<ReportMain />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/:id" element={<Report />} />
              {/* Role-based route (only admins) */}
              <Route
                path="settings"
                element={
                  <ProtectedRoute requiredPermissions={["manage_users"]}>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              {/* Permission-based route */}
              <Route
                path="employees"
                element={
                  <ProtectedRoute requiredPermissions={["manage_users"]}>
                    <Employees />
                  </ProtectedRoute>
                }
              />
              <Route path="account" element={<Account />} />
              <Route path="calendar" element={<Calendar />} />
            </Route>

            {/* Public Routes */}
            <Route
              path="login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route path="unauthorized" element={<Unauthorized />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
