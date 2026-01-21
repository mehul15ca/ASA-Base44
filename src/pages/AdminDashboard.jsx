import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  TrendingUp, TrendingDown, Users, UserCheck, DollarSign, 
  CheckCircle, Plus, Eye, FileText, BarChart3 
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const stats = [
  { label: 'Total Students', value: '245', trend: '+12%', icon: Users, color: '#40916C' },
  { label: 'Active Coaches', value: '18', trend: '+5%', icon: UserCheck, color: '#D4AF37' },
  { label: 'Monthly Revenue', value: 'CAD 45,890', trend: '+18%', icon: DollarSign, color: '#2D6A4F' },
  { label: 'Attendance Rate', value: '92%', trend: '+3%', icon: CheckCircle, color: '#F4D03F' },
];

const revenueData = [
  { month: 'Jan', revenue: 35000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 42000 },
  { month: 'Apr', revenue: 39000 },
  { month: 'May', revenue: 43000 },
  { month: 'Jun', revenue: 45890 },
];

const groundAttendance = [
  { ground: 'Ground A', attendance: 85 },
  { ground: 'Ground B', attendance: 92 },
  { ground: 'Ground C', attendance: 78 },
  { ground: 'Indoor Court', attendance: 88 },
  { ground: 'Main Stadium', attendance: 95 },
];

const batchDistribution = [
  { name: 'Cricket Batch A', value: 45, color: '#40916C' },
  { name: 'Football Batch B', value: 38, color: '#D4AF37' },
  { name: 'Basketball Batch C', value: 32, color: '#2D6A4F' },
  { name: 'Tennis Batch D', value: 28, color: '#F4D03F' },
  { name: 'Badminton Batch E', value: 22, color: '#1A4D2E' },
];

const paymentAlerts = [
  { student: 'John Smith', id: 'STU0123', amount: 'CAD 250', days: 5 },
  { student: 'Emma Wilson', id: 'STU0145', amount: 'CAD 300', days: 12 },
  { student: 'Michael Brown', id: 'STU0167', amount: 'CAD 250', days: 8 },
];

const coachSalary = [
  { coach: 'James Anderson', amount: 'CAD 3,500', status: 'Due', color: 'text-yellow-500' },
  { coach: 'Sarah Miller', amount: 'CAD 4,000', status: 'Paid', color: 'text-green-500' },
  { coach: 'David Lee', amount: 'CAD 3,200', status: 'Due', color: 'text-yellow-500' },
];

const recentActivity = [
  { event: 'Fee payment received from John Smith', time: '10 mins ago' },
  { event: 'Attendance marked for Cricket Batch A', time: '25 mins ago' },
  { event: 'New student enrolled: Emma Johnson', time: '1 hour ago' },
  { event: 'Coach salary processed for Sarah Miller', time: '2 hours ago' },
];

const upcomingEvents = [
  { title: 'Cricket Tournament Finals', date: 'Jan 25, 2026', time: '10:00 AM' },
  { title: 'Parent-Teacher Meeting', date: 'Jan 28, 2026', time: '3:00 PM' },
  { title: 'Football Practice Match', date: 'Jan 30, 2026', time: '5:00 PM' },
];

export default function AdminDashboard() {
  const [dateFilter, setDateFilter] = useState('This Month');
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showGenerateInvoice, setShowGenerateInvoice] = useState(false);

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Monitor academy performance and manage operations</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Today</p>
              <p className="text-white font-medium">{today}</p>
            </div>
          </div>

          {/* Date Filter */}
          <div className="flex gap-3 items-center">
            <Button
              onClick={() => { setDateFilter('Today'); setShowCustomDate(false); }}
              variant={dateFilter === 'Today' ? 'default' : 'outline'}
              className={dateFilter === 'Today' ? 'bg-[#40916C]' : 'border-[#2D6A4F] text-white'}
            >
              Today
            </Button>
            <Button
              onClick={() => { setDateFilter('This Week'); setShowCustomDate(false); }}
              variant={dateFilter === 'This Week' ? 'default' : 'outline'}
              className={dateFilter === 'This Week' ? 'bg-[#40916C]' : 'border-[#2D6A4F] text-white'}
            >
              This Week
            </Button>
            <Button
              onClick={() => { setDateFilter('This Month'); setShowCustomDate(false); }}
              variant={dateFilter === 'This Month' ? 'default' : 'outline'}
              className={dateFilter === 'This Month' ? 'bg-[#40916C]' : 'border-[#2D6A4F] text-white'}
            >
              This Month
            </Button>
            <Button
              onClick={() => { setDateFilter('Custom'); setShowCustomDate(true); }}
              variant={dateFilter === 'Custom' ? 'default' : 'outline'}
              className={dateFilter === 'Custom' ? 'bg-[#40916C]' : 'border-[#2D6A4F] text-white'}
            >
              Custom
            </Button>
            {showCustomDate && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-2 items-center"
              >
                <Input type="date" className="bg-[#0D2818] border-[#2D6A4F] text-white w-40" />
                <span className="text-gray-400">to</span>
                <Input type="date" className="bg-[#0D2818] border-[#2D6A4F] text-white w-40" />
                <Button className="bg-[#D4AF37] text-[#0A1F0A] hover:bg-[#F4D03F]">Apply</Button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{stat.trend}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Revenue Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Revenue Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#40916C" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#40916C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#40916C" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => setShowAddStudent(true)}
              className="h-24 bg-gradient-to-br from-[#40916C] to-[#2D6A4F] hover:opacity-90 flex-col gap-2"
            >
              <Plus className="w-6 h-6" />
              <span>Add Student</span>
            </Button>
            <Link to={createPageUrl('AdminAttendance')}>
              <Button className="h-24 w-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90 flex-col gap-2">
                <Eye className="w-6 h-6" />
                <span>View Attendance</span>
              </Button>
            </Link>
            <Link to={createPageUrl('AdminFinance')}>
              <Button className="h-24 w-full bg-gradient-to-br from-[#1A4D2E] to-[#2D6A4F] hover:opacity-90 flex-col gap-2">
                <DollarSign className="w-6 h-6" />
                <span>Manage Fees</span>
              </Button>
            </Link>
            <Link to={createPageUrl('AdminReports')}>
              <Button className="h-24 w-full bg-gradient-to-br from-[#2D6A4F] to-[#40916C] hover:opacity-90 flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                <span>Generate Reports</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ground-wise Attendance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Ground-wise Attendance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={groundAttendance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                  <XAxis dataKey="ground" stroke="#fff" angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="attendance" fill="#40916C" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Batch Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Batch Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={batchDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {batchDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Payment Alerts</h2>
              <div className="space-y-3">
                {paymentAlerts.map((alert, index) => (
                  <div key={index} className="bg-[#1A4D2E]/50 rounded-lg p-4 border border-[#2D6A4F]/30">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-medium">{alert.student}</p>
                        <p className="text-xs text-gray-400">{alert.id}</p>
                      </div>
                      <span className="text-[#D4AF37] font-bold">{alert.amount}</span>
                    </div>
                    <p className="text-xs text-red-400">{alert.days} days overdue</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Coach Salary Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Coach Salary Overview</h2>
              <div className="space-y-3">
                {coachSalary.map((item, index) => (
                  <div key={index} className="bg-[#1A4D2E]/50 rounded-lg p-4 border border-[#2D6A4F]/30">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-medium">{item.coach}</p>
                      <span className={`text-sm font-bold ${item.color}`}>{item.status}</span>
                    </div>
                    <p className="text-[#D4AF37] font-bold">{item.amount}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="border-l-2 border-[#40916C] pl-4 py-2">
                    <p className="text-white text-sm">{activity.event}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-[#1A4D2E]/50 rounded-lg p-4 border border-[#2D6A4F]/30">
                  <h3 className="text-white font-medium mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.date}</p>
                  <p className="text-sm text-[#D4AF37]">{event.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Add Student Modal */}
      <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Student ID</Label>
              <Input 
                disabled 
                value="STU0001" 
                className="bg-[#1A4D2E]/50 border-[#2D6A4F] text-gray-400" 
              />
              <p className="text-xs text-gray-400 mt-1">Auto-generated upon creation</p>
            </div>
            <div>
              <Label className="text-gray-300">Full Name</Label>
              <Input className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Email</Label>
              <Input type="email" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Batch</Label>
              <Select>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
                  <SelectItem value="cricket-a">Cricket Batch A</SelectItem>
                  <SelectItem value="football-b">Football Batch B</SelectItem>
                  <SelectItem value="basketball-c">Basketball Batch C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Monthly Fee Amount</Label>
              <Input type="number" placeholder="250" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddStudent(false)}
              className="border-[#2D6A4F] text-white hover:bg-[#1A4D2E]"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setShowAddStudent(false)}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90"
            >
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}