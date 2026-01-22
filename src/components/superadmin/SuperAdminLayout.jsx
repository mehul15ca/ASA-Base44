import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Activity, Zap, Briefcase, Bell, TestTube, 
  Users, Database, FileText, Settings, ChevronDown, User, LogOut,
  Clock
} from 'lucide-react';
import { createPageUrl } from '../../utils';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', subtitle: 'System Overview', path: 'SuperAdminDashboard', id: 'dashboard' },
  { icon: Activity, label: 'System Health', path: 'SuperAdminHealth', id: 'system-health' },
  { icon: Zap, label: 'API Monitoring', path: 'SuperAdminAPI', id: 'api-monitoring' },
  { icon: Briefcase, label: 'Background Jobs', path: 'SuperAdminJobs', id: 'background-jobs' },
  { icon: Bell, label: 'Notifications', path: 'SuperAdminNotifications', id: 'notifications' },
  { icon: TestTube, label: 'Automated Testing', path: 'SuperAdminTesting', id: 'automated-testing' },
  { icon: Users, label: 'User Management', path: 'SuperAdminUsers', id: 'user-management' },
  { icon: Database, label: 'Database & Backups', path: 'SuperAdminDatabase', id: 'database-backups' },
  { icon: FileText, label: 'Logs & Audits', path: 'SuperAdminLogs', id: 'logs-audit' },
  { icon: Settings, label: 'System Settings', path: 'SuperAdminSettings', id: 'system-settings' },
];

export default function SuperAdminLayout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const currentPath = location.pathname.split('/').pop();
  const failuresCount = 2; // Mock data

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A]">
      {/* Top System Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#0D2818] to-[#1A4D2E] border-b border-[#2D6A4F]/50 z-50"
      >
        <div className="flex items-center justify-between h-full px-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-lg flex items-center justify-center">
                <span className="text-[#0A1F0A] font-bold text-lg">SA</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">SuperAdmin Portal</h1>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Production</Badge>
          </div>

          {/* Center - System Health */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
              </div>
              <span className="text-green-400 font-semibold">Healthy</span>
            </div>
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Last check: {currentTime}
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Bell className="w-5 h-5" />
              </Button>
              {failuresCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {failuresCount}
                </span>
              )}
            </div>
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-white"
              >
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                  <span className="text-[#0A1F0A] font-bold text-sm">SA</span>
                </div>
                <span className="font-medium">SuperAdmin</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-12 w-48 bg-[#0D2818] border border-[#2D6A4F] rounded-lg shadow-xl z-50"
                  >
                    <button className="w-full px-4 py-3 text-left text-white hover:bg-[#1A4D2E] flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button className="w-full px-4 py-3 text-left text-white hover:bg-[#1A4D2E] flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Activity Logs
                    </button>
                    <div className="border-t border-[#2D6A4F] my-1"></div>
                    <button
                      onClick={() => navigate(createPageUrl('Portal'))}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-[#1A4D2E] flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-[#0D2818] to-[#0A1F0A] border-r border-[#2D6A4F]/50 overflow-y-auto"
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || currentPageName === item.path;
              return (
                <Link key={item.path} to={createPageUrl(item.path)}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] shadow-lg'
                        : 'text-gray-300 hover:bg-[#2D6A4F]/20'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${isActive ? 'text-[#0A1F0A]' : 'text-white'}`}>{item.label}</p>
                      {item.subtitle && (
                        <p className={`text-xs ${isActive ? 'text-[#0A1F0A]/70' : 'text-gray-400'}`}>{item.subtitle}</p>
                      )}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>

      {/* Overlay for profile menu */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}
    </div>
  );
}