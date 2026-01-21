import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, Info, AlertTriangle, CheckCircle, Search, Download } from 'lucide-react';
import SuperAdminLayout from '../components/superadmin/SuperAdminLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const mockLogs = [
  { id: 1, timestamp: '2026-01-21 14:45:23', level: 'ERROR', source: 'PaymentGateway', message: 'Connection timeout while processing payment #12345', user: 'system' },
  { id: 2, timestamp: '2026-01-21 14:44:12', level: 'INFO', source: 'AuthService', message: 'User login successful: john@academy.com', user: 'john@academy.com' },
  { id: 3, timestamp: '2026-01-21 14:43:45', level: 'WARNING', source: 'DatabasePool', message: 'Connection pool reaching capacity (85% used)', user: 'system' },
  { id: 4, timestamp: '2026-01-21 14:42:30', level: 'INFO', source: 'AttendanceService', message: 'Attendance marked for session #456', user: 'coach@academy.com' },
  { id: 5, timestamp: '2026-01-21 14:41:15', level: 'ERROR', source: 'EmailService', message: 'Failed to send notification email to user@example.com', user: 'system' },
  { id: 6, timestamp: '2026-01-21 14:40:02', level: 'SUCCESS', source: 'BackupService', message: 'Daily backup completed successfully (4.2GB)', user: 'system' },
  { id: 7, timestamp: '2026-01-21 14:38:50', level: 'WARNING', source: 'APIController', message: 'Rate limit exceeded for IP 192.168.1.100', user: 'system' },
  { id: 8, timestamp: '2026-01-21 14:37:20', level: 'INFO', source: 'SessionManager', message: 'New session created: Session #789', user: 'admin@academy.com' },
];

export default function SuperAdminLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');

  const stats = [
    { label: 'Total Logs Today', value: '47,832' },
    { label: 'Errors', value: '234' },
    { label: 'Warnings', value: '1,847' },
    { label: 'Success', value: '45,751' },
  ];

  const sources = ['All', 'AuthService', 'PaymentGateway', 'DatabasePool', 'EmailService', 'AttendanceService', 'BackupService', 'APIController'];

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'All' || log.level === levelFilter;
    const matchesSource = sourceFilter === 'All' || log.source === sourceFilter;
    return matchesSearch && matchesLevel && matchesSource;
  });

  const handleExportLogs = () => {
    toast.success('Exporting logs...');
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'ERROR': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'WARNING': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'INFO': return <Info className="w-4 h-4 text-blue-400" />;
      case 'SUCCESS': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case 'ERROR': return <Badge className="bg-red-500/20 text-red-400">ERROR</Badge>;
      case 'WARNING': return <Badge className="bg-yellow-500/20 text-yellow-400">WARNING</Badge>;
      case 'INFO': return <Badge className="bg-blue-500/20 text-blue-400">INFO</Badge>;
      case 'SUCCESS': return <Badge className="bg-green-500/20 text-green-400">SUCCESS</Badge>;
      default: return <Badge className="bg-gray-500/20 text-gray-400">{level}</Badge>;
    }
  };

  return (
    <SuperAdminLayout>
      <div>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">System Logs</h1>
          <p className="text-gray-400">Monitor all system activity and error logs</p>
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

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full md:w-40 bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                  <SelectItem value="All">All Levels</SelectItem>
                  <SelectItem value="ERROR">Error</SelectItem>
                  <SelectItem value="WARNING">Warning</SelectItem>
                  <SelectItem value="INFO">Info</SelectItem>
                  <SelectItem value="SUCCESS">Success</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full md:w-40 bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                  {sources.map(source => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleExportLogs}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Logs Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Logs</h2>
            <div className="space-y-3">
              {filteredLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#0A1F0A]/50 rounded-lg p-4 hover:bg-[#2D6A4F]/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getLevelIcon(log.level)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {getLevelBadge(log.level)}
                        <Badge className="bg-[#40916C]/20 text-[#40916C]">{log.source}</Badge>
                        <span className="text-gray-400 text-sm">{log.timestamp}</span>
                        <span className="text-gray-500 text-sm">by {log.user}</span>
                      </div>
                      <p className="text-white">{log.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </SuperAdminLayout>
  );
}