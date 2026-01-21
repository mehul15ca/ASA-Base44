import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Users, DollarSign, Clock } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const upcomingSessions = [
  { id: 1, title: 'Cricket Batch A', time: '06:00 AM - 07:30 AM', students: 35, location: 'Ground A', date: 'Today' },
  { id: 2, title: 'Cricket Batch B', time: '05:00 PM - 06:30 PM', students: 28, location: 'Ground B', date: 'Today' },
  { id: 3, title: 'Cricket Batch A', time: '06:00 AM - 07:30 AM', students: 35, location: 'Ground A', date: 'Jan 22' },
  { id: 4, title: 'Cricket Batch B', time: '05:00 PM - 06:30 PM', students: 28, location: 'Ground B', date: 'Jan 22' },
  { id: 5, title: 'Cricket Batch A', time: '06:00 AM - 07:30 AM', students: 35, location: 'Ground A', date: 'Jan 23' },
  { id: 6, title: 'Cricket Batch B', time: '05:00 PM - 06:30 PM', students: 28, location: 'Ground B', date: 'Jan 23' },
];

const recentActivities = [
  { action: 'Attendance marked for Cricket Batch A', time: '2 hours ago' },
  { action: 'Evaluation submitted for John Smith', time: '4 hours ago' },
  { action: 'Notes added for morning session', time: '1 day ago' },
  { action: 'Injury report updated for Sarah Johnson', time: '2 days ago' },
  { action: 'Session completed - Cricket Batch B', time: '3 days ago' },
];

export default function CoachDashboard() {
  const [showAllSessions, setShowAllSessions] = useState(false);

  return (
    <CoachLayout>
      <div className="p-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#1A4D2E] via-[#2D6A4F] to-[#1A4D2E] rounded-2xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#40916C]/20 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Coach John! 👋</h1>
            <p className="text-gray-300">Here's your performance overview for this month</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-sm">Total Sessions</p>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-white">24</p>
                <Badge className="bg-green-500/20 text-green-400">+5%</Badge>
              </div>
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
                <p className="text-gray-400 text-sm">Students Present Today</p>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-white">42</p>
                <Badge className="bg-green-500/20 text-green-400">+12%</Badge>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="grid grid-cols-2 divide-x divide-[#2D6A4F]/50">
                <div className="pr-3">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                    <p className="text-gray-400 text-xs">Expected Pay</p>
                  </div>
                  <p className="text-xl font-bold text-white">$1,800</p>
                </div>
                <div className="pl-3">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <p className="text-gray-400 text-xs">Total Earned</p>
                  </div>
                  <p className="text-xl font-bold text-white">$3,800</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-[#F4D03F]" />
                <p className="text-gray-400 text-sm">Sessions Completed</p>
              </div>
              <p className="text-3xl font-bold text-white mb-1">18</p>
              <p className="text-gray-400 text-sm">75%</p>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Upcoming Sessions</h2>
                  <Button
                    onClick={() => setShowAllSessions(true)}
                    variant="outline"
                    size="sm"
                    className="border-[#D4AF37] text-[#D4AF37]"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {upcomingSessions.slice(0, 4).map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#0A1F0A]/50 rounded-lg p-4 hover:bg-[#0A1F0A]/70 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{session.title}</h3>
                          <p className="text-gray-400 text-sm">{session.time}</p>
                        </div>
                        <Badge className={session.date === 'Today' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-gray-500/20 text-gray-400'}>
                          {session.date}
                        </Badge>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{session.students} Students</span>
                        </div>
                        <div className="text-gray-400">{session.location}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* View All Sessions Modal */}
        <Dialog open={showAllSessions} onOpenChange={setShowAllSessions}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">All Upcoming Sessions</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#0A1F0A]/50 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-semibold">{session.title}</h3>
                      <p className="text-gray-400 text-sm">{session.time}</p>
                    </div>
                    <Badge className={session.date === 'Today' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-gray-500/20 text-gray-400'}>
                      {session.date}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{session.students} Students</span>
                    </div>
                    <div className="text-gray-400">{session.location}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </CoachLayout>
  );
}