import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertCircle, Calendar, Info, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import StudentLayout from '../components/student/StudentLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const mockAnnouncements = [
  {
    id: 1,
    title: 'Important: Training Schedule Change',
    message: 'Please note that training sessions on January 25th will be rescheduled to 7:00 AM due to ground maintenance.',
    date: '2026-01-20',
    time: '10:30 AM',
    author: 'Admin Team',
    type: 'Important',
    isNew: true
  },
  {
    id: 2,
    title: 'Upcoming Tournament Registration',
    message: 'Registration for the Inter-Academy Cricket Tournament is now open. Please register before January 30th.',
    date: '2026-01-19',
    time: '02:15 PM',
    author: 'Coach John Doe',
    type: 'Event',
    isNew: true
  },
  {
    id: 3,
    title: 'Fee Payment Reminder',
    message: 'Monthly fee payment for February is due by January 31st. Please ensure timely payment to avoid any disruption.',
    date: '2026-01-18',
    time: '11:00 AM',
    author: 'Finance Department',
    type: 'Payment',
    isNew: false
  },
  {
    id: 4,
    title: 'New Equipment Available',
    message: 'New cricket equipment including bats, balls, and helmets are now available in the academy store.',
    date: '2026-01-17',
    time: '03:45 PM',
    author: 'Store Manager',
    type: 'Information',
    isNew: false
  },
  {
    id: 5,
    title: 'Parent-Coach Meeting',
    message: 'A parent-coach meeting is scheduled for January 28th at 6:00 PM. All parents are requested to attend.',
    date: '2026-01-16',
    time: '09:00 AM',
    author: 'Admin Team',
    type: 'Event',
    isNew: false
  },
  {
    id: 6,
    title: 'Holiday Notice',
    message: 'The academy will be closed on January 26th (Republic Day). Regular training will resume on January 27th.',
    date: '2026-01-15',
    time: '10:00 AM',
    author: 'Admin Team',
    type: 'Important',
    isNew: false
  },
];

export default function StudentAnnouncements() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const unreadCount = announcements.filter(a => a.isNew).length;
  const totalCount = announcements.length;
  const thisWeekCount = 4;

  const totalPages = Math.ceil(announcements.length / itemsPerPage);
  const paginatedAnnouncements = announcements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleMarkAsRead = (id) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, isNew: false } : a));
    toast.success('Announcement marked as read');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Important': return <AlertCircle className="w-6 h-6 text-red-400" />;
      case 'Event': return <Calendar className="w-6 h-6 text-blue-400" />;
      case 'Information': return <Info className="w-6 h-6 text-green-400" />;
      case 'Payment': return <Bell className="w-6 h-6 text-yellow-400" />;
      default: return <Info className="w-6 h-6 text-gray-400" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Important': return 'bg-red-500/20 text-red-400';
      case 'Event': return 'bg-blue-500/20 text-blue-400';
      case 'Information': return 'bg-green-500/20 text-green-400';
      case 'Payment': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <StudentLayout>
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="w-5 h-5 text-red-400" />
                <p className="text-gray-400 text-sm">Unread</p>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-white">{unreadCount}</p>
                {unreadCount > 0 && <Badge className="bg-red-500/20 text-red-400">{unreadCount} New</Badge>}
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-sm">Total Announcements</p>
              </div>
              <p className="text-3xl font-bold text-white">{totalCount}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <p className="text-gray-400 text-sm">This Week</p>
              </div>
              <p className="text-3xl font-bold text-white">{thisWeekCount}</p>
            </Card>
          </motion.div>
        </div>

        {/* Announcements List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Announcements</h2>
            <div className="space-y-4">
              {paginatedAnnouncements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#0A1F0A]/50 rounded-lg p-6"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-[#0D2818] rounded-lg">
                        {getTypeIcon(announcement.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                            {announcement.title}
                            {announcement.isNew && (
                              <Badge className="bg-red-500/20 text-red-400">NEW</Badge>
                            )}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-gray-400 text-sm">{announcement.date} • {announcement.time}</p>
                            <Badge className={getTypeColor(announcement.type)}>
                              {announcement.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">{announcement.message}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-400 text-sm">Posted by: <span className="text-[#D4AF37]">{announcement.author}</span></p>
                        {announcement.isNew && (
                          <Button
                            onClick={() => handleMarkAsRead(announcement.id)}
                            size="sm"
                            variant="outline"
                            className="border-[#40916C] text-[#40916C]"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-gray-400 text-sm">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, announcements.length)} of {announcements.length} announcements
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
      </div>
    </StudentLayout>
  );
}