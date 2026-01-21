import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, UserCog, MapPin, Calendar, 
  FileText, DollarSign, BarChart3, Megaphone, MessageSquare,
  ShoppingBag, Mail, Wallet, Settings, LogOut, CreditCard
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'AdminDashboard' },
  { icon: Users, label: 'Student Management', path: 'AdminStudents' },
  { icon: UserCog, label: 'Coach Management', path: 'AdminCoaches' },
  { icon: MapPin, label: 'Ground Management', path: 'AdminGrounds' },
  { icon: Calendar, label: 'Batch', path: 'AdminBatch' },
  { icon: Calendar, label: 'Schedule & Matches', path: 'AdminSchedule' },
  { icon: CreditCard, label: 'Attendance Portal', path: 'AdminAttendance' },
  { icon: DollarSign, label: 'Finance', path: 'AdminFinance' },
  { icon: BarChart3, label: 'Reports', path: 'AdminReports' },
  { icon: Megaphone, label: 'Announcements', path: 'AdminAnnouncements' },
  { icon: MessageSquare, label: 'Feedback', path: 'AdminFeedback' },
  { icon: ShoppingBag, label: 'Store Orders', path: 'AdminStore' },
  { icon: Mail, label: 'Enquiries', path: 'AdminEnquiries' },
  { icon: Wallet, label: 'Salary', path: 'AdminSalary' },
  { icon: Settings, label: 'System Settings', path: 'AdminSettings' },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-[#0A1F0A] text-white overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-72 bg-gradient-to-b from-[#0D2818] to-[#1A4D2E] border-r border-[#2D6A4F]/30 flex flex-col"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-[#2D6A4F]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl flex items-center justify-center">
              <span className="text-[#0A1F0A] font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ASA Admin</h1>
              <p className="text-sm text-gray-400">Sports Academy</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={createPageUrl(item.path)}>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                    active 
                      ? 'bg-gradient-to-r from-[#40916C] to-[#2D6A4F] text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-[#1A4D2E]/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              </Link>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-[#2D6A4F]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#40916C] to-[#2D6A4F] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@asa.com</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLogoutModal(true)}
              className="text-gray-400 hover:text-white hover:bg-[#1A4D2E]/50"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">Logout Confirmation</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">
            Are you sure you want to logout from the admin panel?
          </p>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowLogoutModal(false)}
              className="border-[#2D6A4F] text-white hover:bg-[#1A4D2E]"
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