import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWindowSize } from '../hooks/useWindowSize';

const mockSessions = [
  { id: 1, title: 'Cricket Batch A', date: '2026-01-13', time: '06:00 AM', students: 35, location: 'Ground A', status: 'completed' },
  { id: 2, title: 'Cricket Batch B', date: '2026-01-13', time: '05:00 PM', students: 28, location: 'Ground B', status: 'upcoming' },
  { id: 3, title: 'Cricket Batch A', date: '2026-01-15', time: '06:00 AM', students: 35, location: 'Ground A', status: 'missed', adminNotes: 'Coach was absent' },
  { id: 4, title: 'Cricket Batch B', date: '2026-01-18', time: '05:00 PM', students: 28, location: 'Ground B', status: 'cancelled', adminNotes: 'Ground maintenance' },
  { id: 5, title: 'Cricket Batch A', date: '2026-01-21', time: '06:00 AM', students: 35, location: 'Ground A', status: 'upcoming' },
  { id: 6, title: 'Cricket Batch B', date: '2026-01-21', time: '05:00 PM', students: 28, location: 'Ground B', status: 'upcoming' },
  { id: 7, title: 'Cricket Batch A', date: '2026-01-22', time: '06:00 AM', students: 35, location: 'Ground A', status: 'upcoming' },
  { id: 8, title: 'Cricket Batch B', date: '2026-01-22', time: '05:00 PM', students: 28, location: 'Ground B', status: 'upcoming' },
  { id: 9, title: 'Cricket Batch A', date: '2026-01-24', time: '06:00 AM', students: 35, location: 'Ground A', status: 'upcoming' },
  { id: 10, title: 'Cricket Batch B', date: '2026-01-24', time: '05:00 PM', students: 28, location: 'Ground B', status: 'upcoming' },
];

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const getWeekDays = (date) => {
  const curr = new Date(date);
  const first = curr.getDate() - curr.getDay();
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(curr.setDate(first + i));
    weekDays.push(new Date(day));
  }
  return weekDays;
};

export default function CoachSessions() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // January 2026
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const itemsPerPage = 5;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const upcomingSessions = mockSessions.filter(s => s.status === 'upcoming' || new Date(s.date) >= new Date('2026-01-13'));
  const totalPages = Math.ceil(upcomingSessions.length / itemsPerPage);
  const paginatedSessions = upcomingSessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getSessionsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockSessions.filter(s => s.date === dateStr);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const nextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const weekDays = getWeekDays(new Date(currentDate));

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'missed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatFullDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <CoachLayout>
      <div className="p-4 md:p-8">
         {/* Calendar - Monthly for desktop, Weekly for mobile */}
         <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-4 md:mb-8"
         >
           <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
             {/* Calendar Header */}
             <div className="flex justify-between items-center mb-3 md:mb-6">
               <h2 className="text-lg md:text-2xl font-bold text-white">
                 {isMobile ? (
                   `${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                 ) : (
                   currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                 )}
               </h2>
               <div className="flex gap-2">
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={isMobile ? prevWeek : prevMonth}
                   className="border-[#40916C] text-gray-300 h-8 md:h-9"
                 >
                   <ChevronLeft className="w-4 h-4" />
                 </Button>
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={isMobile ? nextWeek : nextMonth}
                   className="border-[#40916C] text-gray-300 h-8 md:h-9"
                 >
                   <ChevronRight className="w-4 h-4" />
                 </Button>
               </div>
             </div>

             {/* Legend */}
             <div className={`flex flex-wrap gap-2 md:gap-6 mb-3 md:mb-6`}>
               <div className="flex items-center gap-1 md:gap-2">
                 <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-500"></div>
                 <span className="text-gray-300 text-xs md:text-sm">Upcoming</span>
               </div>
               <div className="flex items-center gap-1 md:gap-2">
                 <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                 <span className="text-gray-300 text-xs md:text-sm">Completed</span>
               </div>
               <div className="flex items-center gap-1 md:gap-2">
                 <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                 <span className="text-gray-300 text-xs md:text-sm">Missed</span>
               </div>
               <div className="flex items-center gap-1 md:gap-2">
                 <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gray-500"></div>
                 <span className="text-gray-300 text-xs md:text-sm">Cancelled</span>
               </div>
             </div>

             {/* Calendar Grid - Monthly for desktop */}
             {!isMobile && (
               <div className="grid grid-cols-7 gap-2">
                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                   <div key={day} className="text-center text-[#D4AF37] font-semibold py-2 text-sm">
                     {day}
                   </div>
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
                           <div key={idx} className="relative pl-2 text-[10px] text-gray-300 truncate">
                             <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${getStatusColor(session.status)}`}></div>
                             {session.title} {session.time}
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
             )}

             {/* Weekly Calendar for mobile */}
             {isMobile && (
               <div className="flex flex-col gap-2">
                 {weekDays.map((day, idx) => {
                   const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                   const sessions = mockSessions.filter(s => s.date === dateStr);
                   return (
                     <motion.div
                       key={idx}
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: idx * 0.05 }}
                       className="bg-[#0A1F0A]/50 rounded-lg p-3 border border-[#2D6A4F]/50"
                     >
                       <div className="font-semibold text-white text-sm mb-2">
                         {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                       </div>
                       {sessions.length > 0 ? (
                         <div className="space-y-2">
                           {sessions.map((session) => (
                             <div key={session.id} className="relative pl-3 py-1 border-l-2 border-[#D4AF37]">
                               <div className={`absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${getStatusColor(session.status)}`}></div>
                               <p className="text-white text-xs font-medium">{session.title}</p>
                               <p className="text-gray-400 text-xs">{session.time}</p>
                             </div>
                           ))}
                         </div>
                       ) : (
                         <p className="text-gray-400 text-xs">No sessions</p>
                       )}
                     </motion.div>
                   );
                 })}
               </div>
             )}
           </Card>
         </motion.div>

        {/* Upcoming Sessions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Upcoming Sessions</h2>
            <div className="space-y-2 md:space-y-4">
              {paginatedSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${getStatusColor(session.status)}`}></div>
                  <div className="bg-[#0A1F0A]/50 rounded-lg p-3 md:p-4 pl-4 md:pl-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0 mb-2 md:mb-3">
                      <div>
                        <h3 className="text-white font-semibold text-sm md:text-lg">{session.title}</h3>
                        <p className="text-gray-400 text-xs md:text-sm">{formatFullDate(session.date)}</p>
                      </div>
                      <Badge className={`text-xs md:text-sm ${
                        session.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                        session.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        session.status === 'missed' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-xs md:text-sm">
                      <div>
                        <p className="text-gray-400">Time</p>
                        <p className="text-white">{session.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Students</p>
                        <p className="text-white">{session.students}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Location</p>
                        <p className="text-white">{session.location}</p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-gray-400">Status</p>
                        <p className="text-white">{session.status.charAt(0).toUpperCase() + session.status.slice(1)}</p>
                      </div>
                    </div>
                    {session.adminNotes && (
                      <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-[#2D6A4F]/50">
                        <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 md:p-3">
                          <Info className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-yellow-400 text-xs md:text-sm font-semibold">Admin Notes</p>
                            <p className="text-gray-300 text-xs md:text-sm">{session.adminNotes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <p className="text-gray-400 text-xs md:text-sm">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, upcomingSessions.length)} of {upcomingSessions.length} sessions
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="border-[#40916C] text-gray-300 h-8 md:h-9 text-xs md:text-sm flex-1 md:flex-none"
                >
                  <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="border-[#40916C] text-gray-300 h-8 md:h-9 text-xs md:text-sm flex-1 md:flex-none"
                >
                  Next
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </CoachLayout>
  );
}