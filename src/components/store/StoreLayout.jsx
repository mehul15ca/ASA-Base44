import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, Warehouse, ShoppingCart, 
  Truck, Users, BarChart3, Settings, Bell, Menu, X, LogOut
} from 'lucide-react';
import { createPageUrl } from '../../utils';
import { Button } from "@/components/ui/button";
import { base44 } from '@/api/base44Client';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'StoreDashboard' },
  { icon: Package, label: 'Products', path: 'StoreProducts' },
  { icon: Warehouse, label: 'Inventory', path: 'StoreInventory' },
  { icon: ShoppingCart, label: 'Orders', path: 'StoreOrders' },
  { icon: Truck, label: 'Shipping', path: 'StoreShipping' },
  { icon: Users, label: 'Customers', path: 'StoreCustomers' },
  { icon: BarChart3, label: 'Reports', path: 'StoreReports' },
  { icon: Settings, label: 'Settings', path: 'StoreSettings' },
];

export default function StoreLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentPath = location.pathname.split('/').pop();

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A]">
      {/* Top App Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#0D2818] to-[#1A4D2E] border-b border-[#2D6A4F]/50 z-50"
      >
        <div className="flex items-center justify-between h-full px-4">
          {/* Left */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">ACA Store Manager</h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/50">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
              </div>
              <span className="text-green-400 text-sm font-medium">Store Open</span>
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Bell className="w-5 h-5" />
              </Button>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-400"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
            <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <span className="text-[#0A1F0A] font-bold text-sm">SM</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <>
            {/* Mobile overlay */}
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
            )}
            
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-[#0D2818] to-[#0A1F0A] border-r border-[#2D6A4F]/50 z-40 overflow-y-auto"
            >
              {/* Mobile close button */}
              <div className="lg:hidden p-4 border-b border-[#2D6A4F]/50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="p-4 space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  return (
                    <Link 
                      key={item.path} 
                      to={createPageUrl(item.path)}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}