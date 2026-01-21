import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Clock, Play, Pause, FileText, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import SuperAdminLayout from '../components/superadmin/SuperAdminLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const mockJobs = [
  { id: 1, name: 'Email Queue Processor', type: 'Queue', schedule: 'Every 5 minutes', lastRunStatus: 'success', lastRunTime: '2026-01-21 14:45', executionTime: '2m 34s', failureReason: null },
  { id: 2, name: 'Database Backup', type: 'Cron', schedule: '0 2 * * *', lastRunStatus: 'success', lastRunTime: '2026-01-21 02:00', executionTime: '5m 12s', failureReason: null },
  { id: 3, name: 'Notification Sender', type: 'Queue', schedule: 'Every minute', lastRunStatus: 'failed', lastRunTime: '2026-01-21 14:50', executionTime: '45s', failureReason: 'SMTP connection timeout' },
  { id: 4, name: 'Analytics Report Generator', type: 'Cron', schedule: '0 8 * * *', lastRunStatus: 'success', lastRunTime: '2026-01-21 08:00', executionTime: '8m 45s', failureReason: null },
  { id: 5, name: 'Cache Cleanup', type: 'Cron', schedule: '0 */6 * * *', lastRunStatus: 'success', lastRunTime: '2026-01-21 12:00', executionTime: '1m 23s', failureReason: null },
  { id: 6, name: 'User Data Sync', type: 'Manual', schedule: 'On demand', lastRunStatus: 'failed', lastRunTime: '2026-01-21 13:30', executionTime: '12m 05s', failureReason: 'API rate limit exceeded' },
];

export default function SuperAdminJobs() {
  const stats = [
    { label: 'Total Jobs', value: mockJobs.length },
    { label: 'Successful (Last Run)', value: mockJobs.filter(j => j.lastRunStatus === 'success').length },
    { label: 'Failed (Last Run)', value: mockJobs.filter(j => j.lastRunStatus === 'failed').length },
    { label: 'Avg Execution Time', value: '3m 24s' },
  ];

  const handleAction = (action, jobName) => {
    toast.success(`${action} executed for ${jobName}`);
  };

  const getTypeBadge = (type) => {
    const colors = {
      'Cron': 'bg-blue-500/20 text-blue-400',
      'Queue': 'bg-purple-500/20 text-purple-400',
      'Manual': 'bg-yellow-500/20 text-yellow-400',
    };
    return <Badge className={colors[type] || 'bg-gray-500/20 text-gray-400'}>{type}</Badge>;
  };

  return (
    <SuperAdminLayout>
      <div>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Background Jobs & Cron Monitoring</h1>
          <p className="text-gray-400">Monitor and manage background tasks and scheduled jobs</p>
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

        {/* Jobs Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Jobs</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Job Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Schedule</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Last Run Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Last Run Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Execution Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockJobs.map((job, index) => (
                    <motion.tr
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{job.name}</p>
                          {job.failureReason && (
                            <p className="text-red-400 text-xs mt-1">{job.failureReason}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">{getTypeBadge(job.type)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Clock className="w-4 h-4" />
                          <span>{job.schedule}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {job.lastRunStatus === 'success' ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-green-400">Success</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-400" />
                              <span className="text-red-400">Failed</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white">{job.lastRunTime}</td>
                      <td className="px-6 py-4 text-gray-300">{job.executionTime}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAction('Run Job Manually', job.name)}
                            className="text-green-400"
                            title="Run Job Manually"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAction('Pause Job', job.name)}
                            className="text-yellow-400"
                            title="Pause Job"
                          >
                            <Pause className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAction('View Execution Logs', job.name)}
                            className="text-[#40916C]"
                            title="View Execution Logs"
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAction('Refresh Status', job.name)}
                            className="text-[#40916C]"
                            title="Refresh Status"
                          >
                            <RefreshCw className="w-4 h-4" />
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
      </div>
    </SuperAdminLayout>
  );
}