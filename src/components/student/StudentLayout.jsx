import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardCheck, 
  Award,
  AlertTriangle,
  Wallet,
  ShoppingBag,
  Bell,
  UserCircle,
  LogOut,
  Search,
  Menu,
  X
} from 'lucide-react';
import AnimatedLogo from '../AnimatedLogo';
import { createPageUrl } from '../../utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'StudentDashboard' },
  { icon: Calendar, label: 'My Schedule', path: 'StudentSchedule' },
  { icon: ClipboardCheck, label: 'Attendance', path: 'StudentAttendance' },
  { icon: Award, label: 'Evaluations', path: 'StudentEvaluations' },
  { icon: AlertTriangle, label: 'Injuries', path: 'StudentInjuries' },
  { icon: Wallet, label: 'Fees & Wallet', path: 'StudentFees' },
  { icon: ShoppingBag, label: 'Store', path: 'StudentStore' },
  { icon: Bell, label: 'Announcements', path: 'StudentAnnouncements' },
  { icon: UserCircle, label: 'Profile', path: 'StudentProfile' },
];

export default function StudentLayout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPath = location.pathname.split('/').pop();

  const getPageTitle = () => {
    const item = menuItems.find(m => m.path === currentPageName || m.path === currentPath);
    return item ? item.label : 'Dashboard';
  };

  const handleLogout = () => {
    navigate(createPageUrl('Portal'));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className="hidden lg:flex lg:relative w-64 h-screen bg-gradient-to-b from-[#0D2818] to-[#0A1F0A] border-r border-[#2D6A4F]/50 flex-col z-50">
        {/* Logo */}
        <div className="p-6 border-b border-[#2D6A4F]/50">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="sm" />
            <div>
              <h1 className="text-white font-bold text-lg">Auustralasia</h1>
              <p className="text-gray-400 text-xs">Spports Academy</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || currentPageName === item.path;
            return (
              <Link key={item.path} to={createPageUrl(item.path)}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] shadow-lg'
                      : 'text-gray-300 hover:bg-[#2D6A4F]/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#2D6A4F]/50">
          <Button
            onClick={() => setShowLogoutModal(true)}
            variant="outline"
            className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Student Identity Card */}
        <div className="p-4 bg-[#1A4D2E]/30 border-t border-[#2D6A4F]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <span className="text-[#0A1F0A] font-bold text-sm">SN</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Student Name</p>
              <p className="text-gray-400 text-xs">STU-0001</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        className="lg:hidden fixed w-64 h-screen bg-gradient-to-b from-[#0D2818] to-[#0A1F0A] border-r border-[#2D6A4F]/50 flex flex-col z-50"
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#2D6A4F]/50">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="sm" />
            <div>
              <h1 className="text-white font-bold text-lg">Auustralasia</h1>
              <p className="text-gray-400 text-xs">Spports Academy</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || currentPageName === item.path;
            return (
              <Link key={item.path} to={createPageUrl(item.path)} onClick={() => setIsSidebarOpen(false)}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] shadow-lg'
                      : 'text-gray-300 hover:bg-[#2D6A4F]/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#2D6A4F]/50">
          <Button
            onClick={() => setShowLogoutModal(true)}
            variant="outline"
            className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Student Identity Card */}
        <div className="p-4 bg-[#1A4D2E]/30 border-t border-[#2D6A4F]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <span className="text-[#0A1F0A] font-bold text-sm">SN</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Student Name</p>
              <p className="text-gray-400 text-xs">STU-0001</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-gradient-to-r from-[#0D2818] to-[#1A4D2E] border-b border-[#2D6A4F]/50 px-4 md:px-8 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-white p-2 hover:bg-[#2D6A4F]/20 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-white">{getPageTitle()}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-80 hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div className="relative">
                <Bell 
                  className="w-6 h-6 text-gray-300 cursor-pointer hover:text-[#D4AF37]" 
                  onClick={() => navigate(createPageUrl('StudentAnnouncements'))}
                />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Logout Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
          <DialogHeader>
            <DialogTitle className="text-white">Logout Confirmation</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">Are you sure you want to logout?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              className="border-[#40916C] text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}