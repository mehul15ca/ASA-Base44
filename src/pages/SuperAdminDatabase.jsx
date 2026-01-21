import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, HardDrive, Activity, Clock, Download, Upload, RefreshCw, AlertTriangle } from 'lucide-react';
import SuperAdminLayout from '../components/superadmin/SuperAdminLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';

const mockTables = [
  { name: 'users', rowCount: '2,847', size: '145 MB', lastModified: '2026-01-21 14:30' },
  { name: 'sessions', rowCount: '15,432', size: '892 MB', lastModified: '2026-01-21 14:25' },
  { name: 'attendance', rowCount: '48,921', size: '1.2 GB', lastModified: '2026-01-21 14:20' },
  { name: 'payments', rowCount: '8,234', size: '324 MB', lastModified: '2026-01-21 14:15' },
  { name: 'evaluations', rowCount: '12,567', size: '456 MB', lastModified: '2026-01-21 14:10' },
  { name: 'batches', rowCount: '234', size: '12 MB', lastModified: '2026-01-21 14:05' },
];

const mockBackups = [
  { id: 1, name: 'daily_backup_2026-01-21', size: '4.2 GB', timestamp: '2026-01-21 00:00', status: 'Completed' },
  { id: 2, name: 'daily_backup_2026-01-20', size: '4.1 GB', timestamp: '2026-01-20 00:00', status: 'Completed' },
  { id: 3, name: 'weekly_backup_2026-01-15', size: '4.0 GB', timestamp: '2026-01-15 00:00', status: 'Completed' },
  { id: 4, name: 'monthly_backup_2026-01-01', size: '3.8 GB', timestamp: '2026-01-01 00:00', status: 'Completed' },
];

export default function SuperAdminDatabase() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizeProgress, setOptimizeProgress] = useState(0);

  const stats = [
    { label: 'Total Database Size', value: '4.2 GB', icon: HardDrive },
    { label: 'Active Connections', value: '47', icon: Activity },
    { label: 'Query Performance', value: '98%', icon: Activity },
    { label: 'Last Backup', value: '2h ago', icon: Clock },
  ];

  const handleBackupNow = () => {
    toast.success('Database backup initiated');
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    setOptimizeProgress(0);
    toast.success('Database optimization started');

    const interval = setInterval(() => {
      setOptimizeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          toast.success('Database optimization completed');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleExportBackup = (backupId) => {
    toast.success('Backup export initiated');
  };

  const handleRestoreBackup = (backupId) => {
    toast.warning('Backup restore initiated - System will be unavailable during restore');
  };

  return (
    <SuperAdminLayout currentPageName="SuperAdminDatabase">
      <div>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Database Management</h1>
          <p className="text-gray-400">Monitor database health, manage backups, and optimize performance</p>
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
                <div className="flex items-center gap-3 mb-2">
                  <stat.icon className="w-5 h-5 text-[#D4AF37]" />
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Database Tables */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Database Tables</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Table Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Row Count</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Size</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTables.map((table, index) => (
                    <motion.tr
                      key={table.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-[#40916C]" />
                          <span className="text-white font-medium">{table.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{table.rowCount}</td>
                      <td className="px-6 py-4 text-gray-300">{table.size}</td>
                      <td className="px-6 py-4 text-gray-300">{table.lastModified}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Database Actions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Database Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleBackupNow}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] py-6"
              >
                <Download className="w-5 h-5 mr-2" />
                Backup Now
              </Button>
              <Button
                onClick={handleOptimize}
                disabled={isOptimizing}
                className="bg-[#40916C] text-white hover:bg-[#2D6A4F] py-6"
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${isOptimizing ? 'animate-spin' : ''}`} />
                {isOptimizing ? 'Optimizing...' : 'Optimize Database'}
              </Button>
            </div>
            {isOptimizing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6"
              >
                <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <p className="text-blue-400 font-semibold">Optimizing database tables...</p>
                  </div>
                  <Progress value={optimizeProgress} className="h-2" />
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Backup History */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Backup History</h2>
            <div className="space-y-4">
              {mockBackups.map((backup, index) => (
                <motion.div
                  key={backup.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#0A1F0A]/50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#40916C]/20 flex items-center justify-center">
                      <Database className="w-6 h-6 text-[#40916C]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{backup.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-gray-400 text-sm">{backup.size}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">{backup.timestamp}</span>
                        <Badge className="bg-green-500/20 text-green-400">{backup.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleExportBackup(backup.id)}
                      className="border-[#2D6A4F] text-[#40916C]"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRestoreBackup(backup.id)}
                      className="border-yellow-500 text-yellow-400"
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      Restore
                    </Button>
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