import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import StudentDashboard from './pages/student/StudentDashboard';
import Profile from './pages/student/Profile';
import ApplyPlacement from './pages/student/ApplyPlacement';
import ApplicationStatus from './pages/student/ApplicationStatus'; // Fixed import name
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateDrive from './pages/admin/CreateDrive';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<Profile />} />
              <Route path="/student/apply" element={<ApplyPlacement />} />
              <Route path="/student/status" element={<ApplicationStatus />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create-drive" element={<CreateDrive />} />
              {/* Add other admin routes here */}
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
