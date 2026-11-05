
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import CitizenDashboard from '../pages/citizen/CitizenDashboard';
import SubmitComplaint from '../pages/citizen/SubmitComplaint';
import ComplaintTracking from '../pages/citizen/ComplaintTracking';
import NotFoundPage from '../pages/errors/NotFoundPage';
import StaffDashboard from '../pages/staff/StaffDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/citizen/dashboard"
        element={<CitizenDashboard />}
      />

      <Route
        path="/complaints/new"
        element={<SubmitComplaint />}
      />

      <Route
        path="/staff/dashboard"
        element={<StaffDashboard />}
      />

      <Route
        path="/complaints/track"
        element={<ComplaintTracking />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
