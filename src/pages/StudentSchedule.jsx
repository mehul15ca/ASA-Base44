import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import StudentLayout from '../components/student/StudentLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mockSessions = [
  { id: 1, title: 'Cricket Batch A', date: '2026-01-22', time: '06:00 AM - 07:30 AM', ground: 'Ground A', coach: 'Coach John Doe', batch: 'Batch A', status: 'upcoming' },
  { id: 2, title: 'Cricket Batch A', date: '2026-01-22', time: '05:00 PM - 06:30 PM', ground: 'Ground B', coach: 'Coach Sarah Smith', batch: 'Batch B', status: 'upcoming' },
  { id: 3, title: 'Cricket Batch A', date: '2026-01-23', time: '06:00 AM - 07:30 AM', ground: 'Ground A', coach: 'Coach John Doe', batch: 'Batch A', status: 'upcoming' },
  { id: 4, title: 'Cricket Batch A', date: '2026-01-13', time: '06:00 AM - 07:30 AM', ground: 'Ground A', coach: 'Coach John Doe', batch: 'Batch A', status: 'completed' },
  { id: 5, title: 'Cricket Batch A', date: '2026-01-15', time: '06:00 AM - 07:30 AM', ground: 'Ground A', coach: 'Coach John Doe', batch: 'Batch A', status: 'cancelled' },
  { id: 6, title: 'Cricket Batch A', date: '2026-01-24', time: '06:00 AM - 07:30 AM', ground: 'Ground A', coach: 'Coach John Doe', batch: 'Batch A', status: 'upcoming' },
  { id: 7, title: 'Cricket Batch A', date: '2026-01-24', time: '05:00 PM - 06:30 PM', ground: 'Ground B', coach: 'Coach Sarah Smith', batch: 'Batch B', status: 'upcoming' },
  { id: 8, title: 'Cricket Batch A', date: '2026-01-25', time: '06:00 AM - 07:30 AM', ground: 'Ground A', coach: 'Coach John Doe', batch: 'Batch A', status: 'upcoming' },
];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

export default function StudentSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedSession, setSelectedSession] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const upcomingSessions = mockSessions.filter(s => s.status === 'upcoming');
  const totalPages = Math.ceil(upcomingSessions.length / itemsPerPage);
  const paginatedSessions = upcomingSessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getSessionsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockSessions.filter(s => s.date === dateStr);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <StudentLayout>
      <div className="p-8">
        {/* Calendar */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                  className="border-[#40916C] text-gray-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                  className="border-[#40916C] text-gray-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-300 text-sm">Upcoming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-300 text-sm">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="text-gray-300 text-sm">Cancelled</span>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-[#D4AF37] font-semibold py-2">{day}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const sessions = getSessionsForDate(day);
                const isToday = day === 13;
                return (
                  <motion.div
                    key={day}
                    whileHover={{ scale: 1.02 }}
                    className={`aspect-square bg-[#0A1F0A] border ${isToday ? 'border-[#D4AF37] border-2' : 'border-[#2D6A4F]/50'} rounded-lg p-2 cursor-pointer hover:border-[#D4AF37] transition-colors`}
                  >
                    <div className={`${isToday ? 'text-[#D4AF37]' : 'text-white'} font-semibold mb-1 text-sm`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {sessions.slice(0, 2).map((session, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setSelectedSession(session)}
                          className="relative pl-2 text-[10px] text-gray-300 truncate cursor-pointer hover:text-[#D4AF37]"
                        >
                          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${getStatusColor(session.status)}`}></div>
                          {session.title} {session.time.split(' - ')[0]}
                        </div>
                      ))}
                      {sessions.length > 2 && (
                        <div className="text-[10px] text-[#D4AF37]">+{sessions.length - 2} more</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Sessions List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Upcoming Sessions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ground</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Coach</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSessions.map((session, index) => (
                    <motion.tr
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedSession(session)}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-white">{session.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{session.time}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{session.ground}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{session.coach}</td>
                      <td className="px-6 py-4">
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-gray-400 text-sm">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, upcomingSessions.length)} of {upcomingSessions.length} sessions
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="border-[#40916C] text-gray-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="border-[#40916C] text-gray-300"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Session Details Modal */}
        <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white">{selectedSession?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p className="text-white">{selectedSession?.date}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Time</p>
                <p className="text-white">{selectedSession?.time}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Ground</p>
                <p className="text-white">{selectedSession?.ground}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Coach</p>
                <p className="text-white">{selectedSession?.coach}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Batch</p>
                <p className="text-white">{selectedSession?.batch}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <Badge className={
                  selectedSession?.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                  selectedSession?.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  'bg-gray-500/20 text-gray-400'
                }>
                  {selectedSession?.status?.charAt(0).toUpperCase() + selectedSession?.status?.slice(1)}
                </Badge>
              </div>
            </div>
            <Button
              onClick={() => setSelectedSession(null)}
              variant="outline"
              className="w-full border-[#40916C] text-gray-300"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </StudentLayout>
  );
}