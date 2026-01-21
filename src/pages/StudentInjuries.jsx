import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Activity, TrendingUp, CheckCircle2, Search, X, PartyPopper } from 'lucide-react';
import StudentLayout from '../components/student/StudentLayout';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const mockInjuries = [
  {
    id: 1,
    type: 'Ankle Sprain',
    severity: 'Minor',
    status: 'Recovered',
    date: '2025-12-15',
    description: 'Minor sprain during fielding practice',
    treatment: 'Ice compression and rest for 1 week. Light exercises recommended.',
    coach: 'Coach John Doe'
  },
  {
    id: 2,
    type: 'Hamstring Strain',
    severity: 'Moderate',
    status: 'Recovering',
    date: '2026-01-10',
    description: 'Muscle strain during sprint training',
    treatment: 'Physiotherapy sessions scheduled. Avoid high-intensity activities for 2 weeks.',
    coach: 'Coach Sarah Smith'
  },
  {
    id: 3,
    type: 'Finger Bruise',
    severity: 'Minor',
    status: 'Active',
    date: '2026-01-18',
    description: 'Bruised finger while catching',
    treatment: 'Apply ice and keep finger elevated. Use protective tape during practice.',
    coach: 'Coach John Doe'
  },
];

export default function StudentInjuries() {
  const [searchFilter, setSearchFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const totalInjuries = mockInjuries.length;
  const activeInjuries = mockInjuries.filter(i => i.status === 'Active').length;
  const recoveringInjuries = mockInjuries.filter(i => i.status === 'Recovering').length;
  const recoveredInjuries = mockInjuries.filter(i => i.status === 'Recovered').length;

  const filteredInjuries = mockInjuries.filter(injury => {
    const matchesSearch = searchFilter === '' || 
      injury.type.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || 
      injury.severity.toLowerCase() === severityFilter;
    const matchesStatus = statusFilter === 'all' || 
      injury.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'minor': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'severe': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-red-500/20 text-red-400';
      case 'recovering': return 'bg-yellow-500/20 text-yellow-400';
      case 'recovered': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case 'minor': return <Activity className="w-5 h-5 text-blue-400" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'severe': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <StudentLayout>
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-sm">Total Injuries</p>
              </div>
              <p className="text-3xl font-bold text-white">{totalInjuries}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <p className="text-gray-400 text-sm">Active</p>
              </div>
              <p className="text-3xl font-bold text-white">{activeInjuries}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <p className="text-gray-400 text-sm">Recovering</p>
              </div>
              <p className="text-3xl font-bold text-white">{recoveringInjuries}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">Recovered</p>
              </div>
              <p className="text-3xl font-bold text-white">{recoveredInjuries}</p>
            </Card>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Filter by student name or ID..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
                {searchFilter && (
                  <X
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-white"
                    onClick={() => setSearchFilter('')}
                  />
                )}
              </div>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-[#0A1F0A] border border-[#2D6A4F] rounded-md px-3 py-2 text-white"
              >
                <option value="all">All Severity</option>
                <option value="minor">Minor</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#0A1F0A] border border-[#2D6A4F] rounded-md px-3 py-2 text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="recovering">Recovering</option>
                <option value="recovered">Recovered</option>
              </select>
            </div>
          </Card>
        </motion.div>

        {/* Injuries List */}
        {filteredInjuries.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-12 text-center">
              <PartyPopper className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                {searchFilter || severityFilter !== 'all' || statusFilter !== 'all' 
                  ? 'No injury reports found for this student'
                  : 'No injury records found 🎉'}
              </h3>
              <p className="text-gray-400">
                {searchFilter || severityFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Keep up the safe training!'}
              </p>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Injury Reports</h2>
              <div className="space-y-4">
                {filteredInjuries.map((injury, index) => (
                  <motion.div
                    key={injury.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#0A1F0A]/50 rounded-lg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg border ${getSeverityColor(injury.severity)}`}>
                        {getSeverityIcon(injury.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-white font-semibold text-lg">{injury.type}</h3>
                            <p className="text-gray-400 text-sm">{injury.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getSeverityColor(injury.severity)}>
                              {injury.severity}
                            </Badge>
                            <Badge className={getStatusColor(injury.status)}>
                              {injury.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#0D2818] rounded-lg p-4">
                            <p className="text-gray-400 text-sm mb-1">Description</p>
                            <p className="text-white">{injury.description}</p>
                          </div>
                          <div className="bg-[#0D2818] rounded-lg p-4">
                            <p className="text-gray-400 text-sm mb-1">Treatment</p>
                            <p className="text-white">{injury.treatment}</p>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-3">
                          Reported by: <span className="text-[#D4AF37]">{injury.coach}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </StudentLayout>
  );
}