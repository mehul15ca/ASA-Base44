import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle2, XCircle, LogOut, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedLogo from '../components/AnimatedLogo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const grounds = [
  'Main Cricket Ground',
  'Practice Ground A',
  'Practice Ground B',
  'Indoor Training Center',
  'Baseball Field'
];

export default function AttendancePortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedGround, setSelectedGround] = useState('');
  const [pin, setPin] = useState('');
  const [currentGround, setCurrentGround] = useState('');
  const [showDialog, setShowDialog] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceState, setAttendanceState] = useState('ready'); // ready, success, error
  const [studentName, setStudentName] = useState('');

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const handleGroundLogin = (e) => {
    e.preventDefault();
    if (selectedGround && pin) {
      setCurrentGround(selectedGround);
      setIsAuthenticated(true);
      setShowDialog(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentGround('');
    setSelectedGround('');
    setPin('');
    setShowDialog(true);
    setAttendanceState('ready');
  };

  const simulateTapCard = () => {
    if (attendanceState !== 'ready') return;

    // Simulate random success/error
    const isSuccess = Math.random() > 0.3;
    
    if (isSuccess) {
      const names = ['Alex Johnson', 'Sarah Williams', 'Michael Chen', 'Emily Davis', 'James Smith'];
      setStudentName(names[Math.floor(Math.random() * names.length)]);
      setAttendanceState('success');
      setTimeout(() => {
        setAttendanceState('ready');
      }, 5000);
    } else {
      setAttendanceState('error');
      setTimeout(() => {
        setAttendanceState('ready');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E] flex items-center justify-center relative overflow-hidden">
      {/* Ground Selection Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#D4AF37]">Attendance Portal Access</DialogTitle>
            <DialogDescription className="text-gray-400">
              Select ground and enter PIN to access attendance system
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGroundLogin} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Select Ground</Label>
              <Select value={selectedGround} onValueChange={setSelectedGround}>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Choose a ground" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                  {grounds.map((ground) => (
                    <SelectItem key={ground} value={ground}>
                      {ground}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">PIN</Label>
              <Input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                placeholder="Enter PIN"
                maxLength={6}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:from-[#F4D03F] hover:to-[#D4AF37] font-semibold"
            >
              Access Portal
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Logout Button */}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="absolute top-3 right-3 md:top-6 md:right-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs md:text-sm"
        >
          <LogOut className="w-3 md:w-4 h-3 md:h-4" />
          <span className="hidden md:inline">Logout from Ground</span>
          <span className="md:hidden">Logout</span>
        </button>
      )}

      {/* Main Attendance Interface */}
      {isAuthenticated && (
        <div className="w-full max-w-4xl px-3 md:px-6">
          {/* Header Info */}
          <div className="text-center mb-6 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 md:space-y-6"
            >
              <div className="flex justify-center mb-2 md:mb-4">
                <AnimatedLogo size="xl" />
              </div>
              <h1 className="text-xl md:text-3xl font-bold text-white">Australasia Sports Academy</h1>
              <h2 className="text-lg md:text-2xl font-semibold text-[#D4AF37]">{currentGround}</h2>
              <div className="flex items-center justify-center gap-2 md:gap-3 text-white text-lg md:text-2xl font-mono">
                <Clock className="w-4 md:w-6 h-4 md:h-6" />
                {formatTime(currentTime)}
              </div>
            </motion.div>
          </div>

          {/* Attendance Status Display */}
          <AnimatePresence mode="wait">
            {/* Ready State */}
            {attendanceState === 'ready' && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gradient-to-br from-[#1A4D2E]/80 to-[#0D2818]/80 border-2 border-[#2D6A4F] rounded-2xl md:rounded-3xl p-8 md:p-16 text-center"
                onClick={simulateTapCard}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-4 md:mb-8"
                >
                  <CreditCard className="w-20 md:w-32 h-20 md:h-32 mx-auto text-[#40916C]" />
                </motion.div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">Tap Your Card</h2>
                <p className="text-gray-400 text-base md:text-xl">Ready to record attendance</p>
                <p className="text-gray-500 text-xs md:text-sm mt-2 md:mt-4">(Click anywhere to simulate tap)</p>
              </motion.div>
            )}

            {/* Success State */}
            {attendanceState === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  backgroundColor: ['rgba(64, 145, 108, 0.2)', 'rgba(64, 145, 108, 0.4)', 'rgba(64, 145, 108, 0.2)']
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-green-900/80 to-[#40916C]/80 border-2 border-green-500 rounded-2xl md:rounded-3xl p-8 md:p-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="mb-4 md:mb-8"
                >
                  <CheckCircle2 className="w-20 md:w-32 h-20 md:h-32 mx-auto text-green-400" />
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-6">Welcome!</h2>
                <p className="text-xl md:text-3xl text-green-300 mb-2 md:mb-4 font-semibold">{studentName}</p>
                <p className="text-lg md:text-2xl text-green-400">✓ Attendance Marked</p>
              </motion.div>
            )}

            {/* Error State */}
            {attendanceState === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  backgroundColor: ['rgba(220, 38, 38, 0.2)', 'rgba(220, 38, 38, 0.5)', 'rgba(220, 38, 38, 0.2)']
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-red-900/80 to-red-800/80 border-2 border-red-500 rounded-2xl md:rounded-3xl p-8 md:p-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="mb-4 md:mb-8"
                >
                  <XCircle className="w-20 md:w-32 h-20 md:h-32 mx-auto text-red-400" />
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-6">Access Denied</h2>
                <p className="text-xl md:text-3xl text-red-300 font-semibold">Student Not Scheduled</p>
                <p className="text-base md:text-xl text-red-400 mt-2 md:mt-4">Please contact administration</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}