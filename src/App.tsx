import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import TeacherProfile from './pages/TeacherProfile';
import TeacherBonafide from './pages/TeacherBonafide';
import TeacherMigration from './pages/TeacherMigration';
import StudentBonafide from './pages/StudentBonafide';
import StudentMigration from './pages/StudentMigration';
import StudentAttendance from './pages/StudentAttendance';
import StudentFees from './pages/StudentFees';
import Blog from './pages/Blog';

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
}

// Student routes
const StudentDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Welcome, Student!</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
        <p className="text-3xl font-bold text-indigo-600">85%</p>
        <p className="text-sm text-gray-500">Current Semester</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Fee Status</h2>
        <p className="text-green-600 font-semibold">Paid</p>
        <p className="text-sm text-gray-500">Last payment: March 1, 2024</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Certificate Requests</h2>
        <p className="text-yellow-600 font-semibold">2 Pending</p>
        <p className="text-sm text-gray-500">Last request: 2 days ago</p>
      </div>
    </div>
  </div>
);

// Teacher routes
const TeacherDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Welcome, Teacher!</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>
        <p className="text-3xl font-bold text-indigo-600">5</p>
        <p className="text-sm text-gray-500">Requires your attention</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600">Approved 2 bonafide requests</li>
          <li className="text-sm text-gray-600">Approved 1 migration certificate</li>
          <li className="text-sm text-gray-600">Published new announcement</li>
        </ul>
      </div>
    </div>
  </div>
);

function DashboardContent() {
  const { user } = useAuth();
  return user?.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />;
}

// Wrap routes that need auth context
function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardContent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <StudentAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bonafide"
        element={
          <ProtectedRoute>
            {user?.role === 'student' ? <StudentBonafide /> : <TeacherBonafide />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/migration"
        element={
          <ProtectedRoute>
            {user?.role === 'student' ? <StudentMigration /> : <TeacherMigration />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/fees"
        element={
          <ProtectedRoute>
            <StudentFees />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blog"
        element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            {user?.role === 'student' ? <Profile /> : <TeacherProfile />}
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App