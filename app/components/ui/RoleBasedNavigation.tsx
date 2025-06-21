import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const RoleBasedNavigation = ({ 
  userRole = 'student', 
  isWalletConnected = false,
  notifications = {},
  onNavigate 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation configurations for each role
  const navigationConfig = {
    student: {
      type: 'bottom-tabs',
      items: [
        {
          label: 'Dashboard',
          path: '/student-dashboard',
          icon: 'Home',
          badge: notifications.dashboard || 0
        },
        {
          label: 'Tasks',
          path: '/task-completion-interface',
          icon: 'CheckSquare',
          badge: notifications.tasks || 0
        },
        {
          label: 'Leaderboard',
          path: '/leaderboard-rankings',
          icon: 'Trophy',
          badge: notifications.leaderboard || 0
        }
      ]
    },
    teacher: {
      type: 'sidebar',
      items: [
        {
          label: 'Dashboard',
          path: '/teacher-dashboard',
          icon: 'LayoutDashboard',
          badge: notifications.dashboard || 0
        },
        {
          label: 'Leaderboard',
          path: '/leaderboard-rankings',
          icon: 'Trophy',
          badge: notifications.leaderboard || 0
        }
      ]
    },
    admin: {
      type: 'sidebar',
      items: [
        {
          label: 'Analytics',
          path: '/admin-analytics-dashboard',
          icon: 'BarChart3',
          badge: notifications.analytics || 0
        },
        {
          label: 'Leaderboard',
          path: '/leaderboard-rankings',
          icon: 'Trophy',
          badge: notifications.leaderboard || 0
        }
      ]
    }
  };

  const currentConfig = navigationConfig[userRole] || navigationConfig.student;

  const handleNavigation = (path) => {
    navigate(path);
    onNavigate?.(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Don't render navigation if wallet is not connected
  if (!isWalletConnected) {
    return null;
  }

  // Student Bottom Tab Navigation
  if (currentConfig.type === 'bottom-tabs') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-80">
        <div className="flex items-center justify-around px-4 py-2">
          {currentConfig.items.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-smooth relative ${
                isActivePath(item.path)
                  ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-surface-hover'
              }`}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  strokeWidth={isActivePath(item.path) ? 2.5 : 2}
                />
                {item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-error text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center min-w-[16px]">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${
                isActivePath(item.path) ? 'text-primary' : 'text-text-secondary'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    );
  }

  // Teacher/Admin Sidebar Navigation
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-100 p-2 bg-surface border border-border rounded-lg shadow-elevation-card"
      >
        <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-90"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`fixed left-0 top-0 h-full w-64 bg-surface border-r border-border z-90 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div>
              <h1 className="font-heading font-semibold text-lg text-text-primary">EduChain</h1>
              <p className="text-xs text-text-secondary capitalize">{userRole} Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-2">
          {currentConfig.items.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth relative ${
                isActivePath(item.path)
                  ? 'bg-primary-50 text-primary border-l-4 border-primary' :'text-text-secondary hover:text-primary hover:bg-surface-hover'
              }`}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                strokeWidth={isActivePath(item.path) ? 2.5 : 2}
              />
              <span className="font-medium">{item.label}</span>
              {item.badge > 0 && (
                <span className="ml-auto bg-error text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Role Badge */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-background rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                userRole === 'admin' ? 'bg-error' : 
                userRole === 'teacher' ? 'bg-accent' : 'bg-secondary'
              }`} />
              <span className="text-sm font-medium text-text-primary capitalize">
                {userRole} Mode
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default RoleBasedNavigation;