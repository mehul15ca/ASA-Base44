import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardCheck, 
  Users, 
  DollarSign, 
  AlertTriangle,
  FileText,
  Bell,
  UserCircle,
  LogOut,
  Search,
  Award,
  Menu,
  X
} from 'lucide-react';
import AnimatedLogo from '../AnimatedLogo';
import { createPageUrl } from '../../utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'CoachDashboard' },
  { icon: Calendar, label: 'My Sessions', path: 'CoachSessions' },
  { icon: ClipboardCheck, label: 'My Attendance', path: 'CoachAttendance' },
  { icon: Users, label: 'Students Today', path: 'CoachStudents' },
  { icon: Award, label: 'Evaluations', path: 'CoachEvaluations' },
  { icon: DollarSign, label: 'Salary', path: 'CoachSalary' },
  { icon: AlertTriangle, label: 'Injury Reports', path: 'CoachInjuries' },
  { icon: FileText, label: 'Session Notes', path: 'CoachNotes' },
  { icon: Bell, label: 'Announcements', path: 'CoachAnnouncements' },
  { icon: UserCircle, label: 'My Profile', path: 'CoachProfile' },
];

export default function CoachLayout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPath = location.pathname.split('/').pop();

  const getPageTitle = () => {
    const item = menuItems.find(m => m.path === currentPageName || m.path === currentPath);
    return item ? item.label : 'Dashboard';
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
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        className="fixed lg:relative w-64 h-screen bg-gradient-to-b from-[#0D2818] to-[#0A1F0A] border-r border-[#2D6A4F]/50 flex flex-col z-50 lg:translate-x-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#2D6A4F]/30">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="sm" />
            <div>
              <h1 className="text-white font-bold text-lg">ASA Coach</h1>
              <p className="text-gray-400 text-xs">Sports Academy</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-2 md:p-4">
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
                  className={`flex items-center gap-3 px-2 md:px-4 py-2 md:py-3 mb-1 md:mb-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] shadow-lg'
                      : 'text-gray-300 hover:bg-[#2D6A4F]/20'
                  }`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-2 md:p-4 border-t border-[#2D6A4F]/50">
          <Button
            onClick={() => setShowLogoutModal(true)}
            variant="outline"
            className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 h-8 md:h-9 text-xs md:text-sm"
          >
            <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Coach Identity Card */}
        <div className="p-2 md:p-4 bg-[#1A4D2E]/30 border-t border-[#2D6A4F]/50">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <span className="text-[#0A1F0A] font-bold text-xs md:text-sm">JD</span>
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-xs md:text-sm truncate">Coach John Doe</p>
              <p className="text-gray-400 text-xs truncate">Cricket Coach</p>
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
          className="bg-gradient-to-r from-[#0D2818] to-[#1A4D2E] border-b border-[#2D6A4F]/50 px-4 md:px-8 py-3 md:py-4"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-white p-1 hover:bg-[#2D6A4F]/20 rounded-lg flex-shrink-0"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-lg md:text-2xl font-bold text-white">{getPageTitle()}</h1>
            </div>
            <div className="hidden md:flex items-center gap-2 md:gap-4">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm"
                />
              </div>
              <div className="relative">
                <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-300 cursor-pointer hover:text-[#D4AF37]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></span>
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
            <DialogTitle className="text-white">Confirm Logout</DialogTitle>
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
              onClick={() => navigate(createPageUrl('Portal'))}
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