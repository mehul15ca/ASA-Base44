import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, Smartphone, RefreshCw, Eye } from 'lucide-react';
import SuperAdminLayout from '../components/superadmin/SuperAdminLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const mockNotifications = [
  { id: 1, type: 'Email', recipient: 'user@example.com', subject: 'Welcome to Academy', status: 'SENT', timestamp: '2026-01-21 14:45', failureReason: null },
  { id: 2, type: 'SMS', recipient: '+91 9876543210', subject: 'Attendance Reminder', status: 'SENT', timestamp: '2026-01-21 14:30', failureReason: null },
  { id: 3, type: 'Push', recipient: 'device-token-abc123', subject: 'Session Starting Soon', status: 'FAILED', timestamp: '2026-01-21 14:25', failureReason: 'Device token expired' },
  { id: 4, type: 'Email', recipient: 'coach@academy.com', subject: 'Monthly Report Ready', status: 'SENT', timestamp: '2026-01-21 14:20', failureReason: null },
  { id: 5, type: 'Push', recipient: 'device-token-xyz789', subject: 'Payment Received', status: 'PENDING', timestamp: '2026-01-21 14:15', failureReason: null },
  { id: 6, type: 'SMS', recipient: '+91 9876543211', subject: 'Fee Due Reminder', status: 'FAILED', timestamp: '2026-01-21 14:10', failureReason: 'Invalid phone number' },
  { id: 7, type: 'Email', recipient: 'admin@academy.com', subject: 'System Alert', status: 'SENT', timestamp: '2026-01-21 14:05', failureReason: null },
  { id: 8, type: 'Push', recipient: 'device-token-def456', subject: 'New Announcement', status: 'PENDING', timestamp: '2026-01-21 14:00', failureReason: null },
];

export default function SuperAdminNotifications() {
  const [typeFilter, setTypeFilter] = useState('All');

  const stats = [
    { label: 'Total Sent (Today)', value: '12,847' },
    { label: 'Failed Notifications', value: '34' },
    { label: 'Pending Queue', value: '127' },
    { label: 'Retry Attempts', value: '89' },
  ];

  const filteredNotifications = typeFilter === 'All' 
    ? mockNotifications 
    : mockNotifications.filter(n => n.type === typeFilter);

  const handleRetry = (id) => {
    toast.success('Notification retry initiated');
  };

  const handleViewPayload = (id) => {
    toast.success('Viewing payload');
  };

  const handleRetryAllFailed = () => {
    toast.success('Retrying all failed notifications');
  };

  const handleDisableAll = () => {
    toast.warning('All notifications disabled');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Email': return <Mail className="w-4 h-4 text-blue-400" />;
      case 'SMS': return <MessageSquare className="w-4 h-4 text-green-400" />;
      case 'Push': return <Smartphone className="w-4 h-4 text-purple-400" />;
      default: return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SENT': return <Badge className="bg-green-500/20 text-green-400">SENT</Badge>;
      case 'FAILED': return <Badge className="bg-red-500/20 text-red-400">FAILED</Badge>;
      case 'PENDING': return <Badge className="bg-yellow-500/20 text-yellow-400">PENDING</Badge>;
      default: return <Badge className="bg-gray-500/20 text-gray-400">UNKNOWN</Badge>;
    }
  };

  return (
    <SuperAdminLayout>
      <div>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Notifications Monitoring</h1>
          <p className="text-gray-400">Monitor and manage all system notifications</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Type Filter Bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-300 font-medium">Filter by type:</span>
              <div className="flex gap-2">
                {['All', 'Email', 'SMS', 'Push'].map((type) => (
                  <Button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={typeFilter === type 
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]'
                      : 'bg-[#0A1F0A] border border-[#2D6A4F] text-gray-300 hover:bg-[#2D6A4F]/20'
                    }
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notifications Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Notifications</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Recipient</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Timestamp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotifications.map((notification, index) => (
                    <motion.tr
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(notification.type)}
                          <span className="text-white">{notification.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{notification.recipient}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white">{notification.subject}</p>
                          {notification.failureReason && (
                            <p className="text-red-400 text-xs mt-1">{notification.failureReason}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(notification.status)}</td>
                      <td className="px-6 py-4 text-gray-300">{notification.timestamp}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {notification.status === 'FAILED' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRetry(notification.id)}
                              className="text-green-400"
                              title="Retry"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewPayload(notification.id)}
                            className="text-[#40916C]"
                            title="View Payload"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Bottom Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex gap-4">
              <Button
                onClick={handleRetryAllFailed}
                className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-lg py-6"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Retry All Failed Notifications
              </Button>
              <Button
                onClick={handleDisableAll}
                variant="outline"
                className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10 text-lg py-6"
              >
                <Bell className="w-5 h-5 mr-2" />
                Disable All Notifications
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </SuperAdminLayout>
  );
}