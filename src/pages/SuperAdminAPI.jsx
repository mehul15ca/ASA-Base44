import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Search, Filter, ExternalLink, RefreshCw, Play, StopCircle } from 'lucide-react';
import SuperAdminLayout from '../components/superadmin/SuperAdminLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const mockAPIs = [
  { id: 1, name: 'User Authentication API', endpoint: '/api/v1/auth', method: 'POST', status: 'LIVE', avgResponse: '125ms', errorRate: 0.8, dependencies: 'Database, Redis' },
  { id: 2, name: 'Payment Gateway', endpoint: '/api/v1/payments', method: 'POST', status: 'LIVE', avgResponse: '342ms', errorRate: 1.2, dependencies: 'Stripe, Database' },
  { id: 3, name: 'Notification Service', endpoint: '/api/v1/notifications', method: 'POST', status: 'DEGRADED', avgResponse: '856ms', errorRate: 4.5, dependencies: 'Email, SMS' },
  { id: 4, name: 'WebSocket Connection', endpoint: '/ws/v1/realtime', method: 'WS', status: 'LIVE', avgResponse: '45ms', errorRate: 0.3, dependencies: 'Redis' },
  { id: 5, name: 'File Upload Service', endpoint: '/api/v1/upload', method: 'POST', status: 'LIVE', avgResponse: '234ms', errorRate: 1.8, dependencies: 'S3, Database' },
  { id: 6, name: 'Analytics API', endpoint: '/api/v1/analytics', method: 'GET', status: 'DOWN', avgResponse: '-', errorRate: 100, dependencies: 'Database' },
];

export default function SuperAdminAPI() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    { label: 'Total APIs', value: mockAPIs.length },
    { label: 'Live', value: mockAPIs.filter(a => a.status === 'LIVE').length },
    { label: 'Degraded', value: mockAPIs.filter(a => a.status === 'DEGRADED').length },
    { label: 'Down', value: mockAPIs.filter(a => a.status === 'DOWN').length },
  ];

  const filteredAPIs = mockAPIs.filter(api => {
    const matchesSearch = searchTerm === '' || 
      api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.endpoint.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || api.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (action, apiName) => {
    toast.success(`${action} executed for ${apiName}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'LIVE': return <Badge className="bg-green-500/20 text-green-400">LIVE</Badge>;
      case 'DEGRADED': return <Badge className="bg-yellow-500/20 text-yellow-400">DEGRADED</Badge>;
      case 'DOWN': return <Badge className="bg-red-500/20 text-red-400">DOWN</Badge>;
      default: return <Badge className="bg-gray-500/20 text-gray-400">UNKNOWN</Badge>;
    }
  };

  const getMethodBadge = (method) => {
    const colors = {
      'GET': 'bg-blue-500/20 text-blue-400',
      'POST': 'bg-green-500/20 text-green-400',
      'WS': 'bg-purple-500/20 text-purple-400',
    };
    return <Badge className={colors[method] || 'bg-gray-500/20 text-gray-400'}>{method}</Badge>;
  };

  return (
    <SuperAdminLayout>
      <div>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">API Monitoring</h1>
              <p className="text-gray-400">Real-time API health and performance tracking</p>
            </div>
            <Button onClick={() => toast.success('All APIs refreshed')} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
              Refresh All
            </Button>
          </div>
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
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search APIs by name or endpoint..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div className="w-48">
                <div className="flex items-center gap-2">
                  <Filter className="text-gray-400 w-4 h-4" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="degraded">Degraded</SelectItem>
                      <SelectItem value="down">Down</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* API Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">API Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Endpoint</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Method</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Avg Response</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Error Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAPIs.map((api, index) => (
                    <motion.tr
                      key={api.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{api.name}</p>
                          <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                            <Zap className="w-3 h-3" />
                            {api.dependencies}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-[#D4AF37] text-sm bg-[#0A1F0A]/50 px-2 py-1 rounded">{api.endpoint}</code>
                      </td>
                      <td className="px-6 py-4">{getMethodBadge(api.method)}</td>
                      <td className="px-6 py-4">{getStatusBadge(api.status)}</td>
                      <td className="px-6 py-4 text-white">{api.avgResponse}</td>
                      <td className="px-6 py-4">
                        <span className={api.errorRate > 2 ? 'text-red-400 font-semibold' : 'text-white'}>
                          {api.errorRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAction('View Logs', api.name)}
                            className="text-[#40916C]"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAction('Retry Health Check', api.name)}
                            className="text-[#40916C]"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                          {api.status === 'DOWN' ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleAction('Enable', api.name)}
                              className="text-green-400"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleAction('Disable', api.name)}
                              className="text-red-400"
                            >
                              <StopCircle className="w-4 h-4" />
                            </Button>
                          )}
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