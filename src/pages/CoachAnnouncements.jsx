import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Users, AlertCircle, Info, CheckCircle } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockAnnouncements = [
  { 
    id: 1, 
    title: 'Ground Maintenance Schedule', 
    message: 'Ground A will be closed for maintenance from 2026-02-01 to 2026-02-05. All sessions will be shifted to Ground B during this period.', 
    date: '2026-01-20', 
    priority: 'High',
    targetAudience: 'All Coaches',
    status: 'unread'
  },
  { 
    id: 2, 
    title: 'New Equipment Arrival', 
    message: 'New cricket equipment including bats, balls, and protective gear will arrive next week. Please update your training plans accordingly.', 
    date: '2026-01-18', 
    priority: 'Medium',
    targetAudience: 'Cricket Coaches',
    status: 'read'
  },
  { 
    id: 3, 
    title: 'Monthly Performance Review', 
    message: 'Monthly performance review meeting scheduled for 2026-01-30. Please ensure all session reports are submitted before the meeting.', 
    date: '2026-01-15', 
    priority: 'High',
    targetAudience: 'All Coaches',
    status: 'read'
  },
  { 
    id: 4, 
    title: 'Holiday Notice', 
    message: 'The academy will remain closed on 2026-02-15 for national holiday. No sessions will be conducted on this day.', 
    date: '2026-01-12', 
    priority: 'Low',
    targetAudience: 'All Staff',
    status: 'read'
  },
  { 
    id: 5, 
    title: 'Parent-Teacher Meeting', 
    message: 'Parent-teacher meeting will be held on 2026-02-08. All coaches are requested to attend and provide feedback on student progress.', 
    date: '2026-01-10', 
    priority: 'Medium',
    targetAudience: 'All Coaches',
    status: 'read'
  },
  { 
    id: 6, 
    title: 'Safety Training Session', 
    message: 'Mandatory safety training session for all coaches on 2026-01-28. Topics include first aid, injury prevention, and emergency protocols.', 
    date: '2026-01-08', 
    priority: 'High',
    targetAudience: 'All Coaches',
    status: 'read'
  },
];

export default function CoachAnnouncements() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnnouncements = mockAnnouncements.filter(
    announcement =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = mockAnnouncements.filter(a => a.status === 'unread').length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return <AlertCircle className="w-4 h-4" />;
      case 'Medium': return <Info className="w-4 h-4" />;
      case 'Low': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <CoachLayout>
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-sm">Total Announcements</p>
              </div>
              <p className="text-3xl font-bold text-white">{mockAnnouncements.length}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-gray-400 text-sm">Unread</p>
              </div>
              <p className="text-3xl font-bold text-white">{unreadCount}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-[#40916C]" />
                <p className="text-gray-400 text-sm">For You</p>
              </div>
              <p className="text-3xl font-bold text-white">{mockAnnouncements.filter(a => a.targetAudience.includes('Coaches')).length}</p>
            </Card>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-[#0A1F0A] border-[#2D6A4F] text-white"
              />
            </div>
          </Card>
        </motion.div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6 hover:shadow-lg transition-shadow ${
                announcement.status === 'unread' ? 'border-l-4 border-l-[#D4AF37]' : ''
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`mt-1 ${announcement.priority === 'High' ? 'text-red-400' : announcement.priority === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {getPriorityIcon(announcement.priority)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-bold text-lg">{announcement.title}</h3>
                        {announcement.status === 'unread' && (
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-3">{announcement.message}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{announcement.targetAudience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {announcement.priority} Priority
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-12">
            <div className="text-center">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">No announcements found</h3>
              <p className="text-gray-400">Try adjusting your search query</p>
            </div>
          </Card>
        )}
      </div>
    </CoachLayout>
  );
}