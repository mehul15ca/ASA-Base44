import React, { useState } from 'react';
      import { Link, useLocation, useNavigate } from 'react-router-dom';
      import { createPageUrl } from '../../utils';
      import { motion, AnimatePresence } from 'framer-motion';
      import AnimatedLogo from '../AnimatedLogo';
      import {
  LayoutDashboard,
  Users,
  UserCheck,
  MapPin,
  Layers,
  Calendar,
  ClipboardCheck,
  DollarSign,
  FileText,
  Megaphone,
  MessageSquare,
  ShoppingBag,
  HelpCircle,
  Wallet,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'AdminDashboard' },
  { icon: Users, label: 'Student Management', path: 'AdminStudents' },
  { icon: UserCheck, label: 'Coach Management', path: 'AdminCoaches' },
  { icon: MapPin, label: 'Ground Management', path: 'AdminGrounds' },
  { icon: Layers, label: 'Batch', path: 'AdminBatches' },
  { icon: Calendar, label: 'Schedule & Matches', path: 'AdminSchedule' },
  { icon: ClipboardCheck, label: 'Attendance Portal', path: 'AdminAttendance' },
  { icon: DollarSign, label: 'Finance', path: 'AdminFinance' },
  { icon: FileText, label: 'Reports', path: 'AdminReports' },
  { icon: Megaphone, label: 'Announcements', path: 'AdminAnnouncements' },
  { icon: MessageSquare, label: 'Feedback', path: 'AdminFeedback', badge: 1 },
  { icon: ShoppingBag, label: 'Store Orders', path: 'AdminStore' },
  { icon: HelpCircle, label: 'Enquiries', path: 'AdminEnquiries', badge: 2 },
  { icon: Wallet, label: 'Salary', path: 'AdminSalary' },
  { icon: Settings, label: 'System Settings', path: 'AdminSettings' },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPath = location.pathname.split('/').pop();

  const handleLogout = () => {
    navigate(createPageUrl('Portal'));
  };

  return (
    <div className="flex h-screen bg-[#0A1F0A] overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        className="fixed lg:relative w-70 h-screen bg-gradient-to-b from-[#0D2818] to-[#1A4D2E] border-r border-[#2D6A4F]/30 flex flex-col z-50 lg:translate-x-0"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-[#2D6A4F]/30">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="sm" />
            <div>
              <h1 className="text-white font-bold text-lg">ASA Admin</h1>
              <p className="text-gray-400 text-xs">Sports Academy</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <Link
                key={item.path}
                to={createPageUrl(item.path)}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] shadow-lg'
                      : 'text-gray-300 hover:bg-[#2D6A4F]/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-red-500 rounded-full w-2 h-2 flex-shrink-0"></span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-[#2D6A4F]/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#40916C] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Admin User</p>
              <p className="text-gray-400 text-xs truncate">admin@asa.com</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowLogoutModal(true)}
              className="text-gray-400 hover:text-[#D4AF37] transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gradient-to-r from-[#0D2818] to-[#1A4D2E] border-b border-[#2D6A4F]/30 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white p-2 hover:bg-[#2D6A4F]/20 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <AnimatedLogo size="xs" />
            <h1 className="text-white font-bold">Auustralasia</h1>
          </div>
          <div className="w-10" />
        </div>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A]">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Logout Confirmation</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">
            Are you sure you want to logout from the admin panel?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              className="border-[#40916C] text-gray-300 hover:bg-[#40916C]/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}