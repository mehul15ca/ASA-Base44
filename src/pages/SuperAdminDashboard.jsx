import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, Zap, AlertTriangle, Bell, Database, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import SuperAdminLayout from '../components/superadmin/SuperAdminLayout';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const kpiData = [
  { icon: Users, title: 'Total Users', value: '24,567', subtitle: '18,432 Students / 5,234 Coaches / 901 Admins', trend: '+12% this month', trendUp: true },
  { icon: Activity, title: 'Active Sessions', value: '1,847', subtitle: 'Today', trend: '+5% from yesterday', trendUp: true },
  { icon: Zap, title: 'APIs Status', value: '47 / 50', subtitle: 'Healthy / Total', hasWarning: true },
  { icon: AlertTriangle, title: 'Failed Jobs', value: '3', subtitle: 'Last 24h', hasError: true },
  { icon: Bell, title: 'Pending Notifications', value: '127', subtitle: 'In Queue', hasWarning: false },
  { icon: Database, title: 'Last Backup', value: '2h ago', subtitle: 'Status: Success', hasSuccess: true },
];

const healthComponents = [
  { name: 'APIs', avgResponse: '142ms', percent: 98 },
  { name: 'Database', avgResponse: '28ms', percent: 99 },
  { name: 'Jobs', avgResponse: '3.2s', percent: 94 },
  { name: 'Notifications', avgResponse: '89ms', percent: 97 },
  { name: 'Storage', avgResponse: '56ms', percent: 96 },
];

const recentIncidents = [
  { timestamp: '2026-01-21 14:23', component: 'API Gateway', errorType: 'Timeout Error', severity: 'CRITICAL', status: 'OPEN' },
  { timestamp: '2026-01-21 12:45', component: 'Email Service', errorType: 'Connection Failed', severity: 'MEDIUM', status: 'RESOLVED' },
  { timestamp: '2026-01-21 10:15', component: 'Background Job', errorType: 'Memory Overflow', severity: 'LOW', status: 'RESOLVED' },
];

export default function SuperAdminDashboard() {
  return (
    <SuperAdminLayout>
      <div>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">System Overview</h1>
          <p className="text-gray-400">High-level platform health and activity snapshot</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6 cursor-pointer hover:border-[#D4AF37] transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="w-6 h-6 text-[#D4AF37]" />
                    {kpi.hasError && <AlertCircle className="w-5 h-5 text-red-400" />}
                    {kpi.hasWarning && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                    {kpi.hasSuccess && <CheckCircle className="w-5 h-5 text-green-400" />}
                  </div>
                  <h3 className="text-gray-400 text-sm mb-1">{kpi.title}</h3>
                  <p className="text-3xl font-bold text-white mb-2">{kpi.value}</p>
                  <p className="text-gray-400 text-xs mb-2">{kpi.subtitle}</p>
                  {kpi.trend && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-4 h-4 ${kpi.trendUp ? 'text-green-400' : 'text-red-400'}`} />
                      <span className={`text-sm ${kpi.trendUp ? 'text-green-400' : 'text-red-400'}`}>{kpi.trend}</span>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Platform Health Summary */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Platform Health Summary</h2>
                    <p className="text-gray-400 text-sm">Real-time component status</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#D4AF37]">96%</p>
                    <p className="text-gray-400 text-sm">Overall Health Score</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {healthComponents.map((component, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${component.percent >= 95 ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                          <span className="text-white font-medium">{component.name}</span>
                          <span className="text-gray-400 text-sm">{component.avgResponse}</span>
                        </div>
                        <span className="text-white font-semibold">{component.percent}%</span>
                      </div>
                      <Progress value={component.percent} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recent Incidents */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <h2 className="text-xl font-bold text-white mb-1">Recent Incidents</h2>
              <p className="text-gray-400 text-sm mb-6">Last 24 hours</p>
              <div className="space-y-3">
                {recentIncidents.map((incident, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="bg-[#0A1F0A]/50 rounded-lg p-4 hover:bg-[#0A1F0A]/70 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-white font-medium text-sm">{incident.component}</p>
                      <Badge className={
                        incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                        incident.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }>
                        {incident.severity}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{incident.errorType}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">{incident.timestamp}</span>
                      <Badge className={
                        incident.status === 'OPEN' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                      }>
                        {incident.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}