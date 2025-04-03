import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User, BookOpen, Calendar, FileText, CreditCard, CheckSquare, Menu, X, FileUp, Newspaper } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const studentLinks = [
  { to: '/dashboard', icon: BookOpen, label: 'Home' },
  { to: '/attendance', icon: Calendar, label: 'Attendance' },
  { to: '/bonafide', icon: FileText, label: 'Bonafide' },
  { to: '/migration', icon: FileUp, label: 'Migration' },
  { to: '/fees', icon: CreditCard, label: 'Fees' },
  { to: '/blog', icon: Newspaper, label: 'Blog' },
  { to: '/profile', icon: User, label: 'Profile' },
];

const teacherLinks = [
  { to: '/dashboard', icon: BookOpen, label: 'Home' },
  { to: '/bonafide', icon: CheckSquare, label: 'Bonafide Requests' },
  { to: '/migration', icon: FileUp, label: 'Migration Requests' },
  { to: '/blog', icon: Newspaper, label: 'Blog' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const links = user?.role === 'student' ? studentLinks : teacherLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for laptop/desktop */}
      <aside className="hidden lg:block w-64 bg-white shadow-lg fixed h-full">
        <div className="h-16 bg-indigo-600 flex items-center px-6">
          <Link to="/dashboard" className="text-xl font-bold text-white">
            EduPortal
          </Link>
        </div>
        <nav className="mt-6 px-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-4 py-3 mb-2 rounded-md transition-colors ${
                  location.pathname === link.to
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity z-20 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />

      <aside
        className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 bg-indigo-600 flex items-center justify-between px-6">
          <Link to="/dashboard" className="text-xl font-bold text-white">
            EduPortal
          </Link>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-6 px-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-4 py-3 mb-2 rounded-md transition-colors ${
                  location.pathname === link.to
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 lg:ml-64">
        {/* Top Navigation Bar */}
        <nav className="bg-indigo-600 text-white h-16 fixed w-full lg:w-[calc(100%-16rem)] z-30">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <Menu size={24} />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:bg-indigo-700 px-3 py-2 rounded-md"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="pt-16 min-h-screen">
          <div className="max-w-7xl mx-auto p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}