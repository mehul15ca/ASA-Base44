import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, Briefcase, HardDrive, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import SuperAdminLayout from '../components/superadmin/SuperAdminLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const healthSections = [
  {
    name: 'API Health',
    icon: Activity,
    status: 'healthy',
    lastCheck: '30 seconds ago',
    metrics: { avgResponse: '142ms', failures24h: 2, failures7d: 15 },
    details: [
      { key: 'Total Endpoints', value: '47' },
      { key: 'Active Connections', value: '1,847' },
      { key: 'Uptime', value: '99.98%' }
    ]
  },
  {
    name: 'Database Health',
    icon: Database,
    status: 'healthy',
    lastCheck: '45 seconds ago',
    metrics: { avgResponse: '28ms', failures24h: 0, failures7d: 1 },
    details: [
      { key: 'Active Connections', value: '234' },
      { key: 'Query Rate', value: '1,245/min' },
      { key: 'Storage Used', value: '68%' }
    ]
  },
  {
    name: 'Queue / Cron Health',
    icon: Briefcase,
    status: 'degraded',
    lastCheck: '1 minute ago',
    metrics: { avgResponse: '3.2s', failures24h: 8, failures7d: 42 },
    details: [
      { key: 'Pending Jobs', value: '127' },
      { key: 'Processing Rate', value: '45/min' },
      { key: 'Failed Jobs', value: '3' }
    ]
  },
  {
    name: 'Storage Health',
    icon: HardDrive,
    status: 'healthy',
    lastCheck: '20 seconds ago',
    metrics: { avgResponse: '56ms', failures24h: 1, failures7d: 4 },
    details: [
      { key: 'Total Storage', value: '2.4 TB' },
      { key: 'Available', value: '856 GB' },
      { key: 'Read/Write', value: '234 MB/s' }
    ]
  },
];

export default function SuperAdminHealth() {
  const handleRefreshAll = () => {
    toast.success('All health checks refreshed');
  };

  const handleRecheck = (sectionName) => {
    toast.success(`${sectionName} rechecked`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'degraded': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'down': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <CheckCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'healthy': return <Badge className="bg-green-500/20 text-green-400">HEALTHY</Badge>;
      case 'degraded': return <Badge className="bg-yellow-500/20 text-yellow-400">DEGRADED</Badge>;
      case 'down': return <Badge className="bg-red-500/20 text-red-400">DOWN</Badge>;
      default: return <Badge className="bg-gray-500/20 text-gray-400">UNKNOWN</Badge>;
    }
  };

  return (
    <SuperAdminLayout>
      <div>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">System Health</h1>
              <p className="text-gray-400">Real-time monitoring of all system components</p>
            </div>
            <Button onClick={handleRefreshAll} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
              Refresh All
            </Button>
          </div>
        </motion.div>

        {/* Health Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {healthSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#0A1F0A]/50 rounded-lg">
                        <Icon className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{section.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400 text-xs">{section.lastCheck}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(section.status)}
                      {getStatusBadge(section.status)}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#0A1F0A]/50 rounded-lg p-3">
                      <p className="text-gray-400 text-xs mb-1">Avg Response Time</p>
                      <p className="text-white font-semibold text-lg">{section.metrics.avgResponse}</p>
                    </div>
                    <div className="bg-[#0A1F0A]/50 rounded-lg p-3">
                      <p className="text-gray-400 text-xs mb-1">Failures</p>
                      <p className="text-white font-semibold text-lg">
                        {section.metrics.failures24h} <span className="text-sm text-gray-400">/ {section.metrics.failures7d}</span>
                      </p>
                      <p className="text-gray-400 text-xs">24h / 7d</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    {section.details.map((detail, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">{detail.key}</span>
                        <span className="text-white font-medium">{detail.value}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleRecheck(section.name)}
                    variant="outline"
                    className="w-full border-[#40916C] text-[#40916C]"
                  >
                    Re-check {section.name}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SuperAdminLayout>
  );
}