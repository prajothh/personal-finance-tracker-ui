import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddTransaction from "./pages/Transactions/AddTransaction";
import TransactionsList from "./pages/Transactions/TransactionsList";
import Goals from "./pages/Goals/Goals";
import Logout from "./pages/Auth/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/Auth/landingpage";

export default function App() {
  return (
    <Routes>
      {/* Landing page is public and not wrapped in AuthLayout */}
      <Route path="/" element={<LandingPage />} />

      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionsList />} />
        <Route path="/transactions/add" element={<AddTransaction />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/logout" element={<Logout />} />
      </Route>

      {/* unknown routes -> landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
