import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Search, Calendar, User, Eye, FileText } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mockInjuries = [
  {
    id: 1,
    studentName: 'Alex Johnson',
    batch: 'Cricket Batch A',
    date: '2026-01-20',
    type: 'Muscle Strain',
    severity: 'Minor',
    description: 'Mild hamstring strain during warm-up exercises',
    status: 'Recovering',
    expectedReturn: '2026-01-27',
  },
  {
    id: 2,
    studentName: 'Sarah Williams',
    batch: 'Cricket Batch A',
    date: '2026-01-18',
    type: 'Sprain',
    severity: 'Moderate',
    description: 'Ankle sprain while fielding practice',
    status: 'Under Treatment',
    expectedReturn: '2026-02-05',
  },
  {
    id: 3,
    studentName: 'Michael Chen',
    batch: 'Cricket Batch B',
    date: '2026-01-15',
    type: 'Impact Injury',
    severity: 'Minor',
    description: 'Bruised shoulder from catching drill',
    status: 'Recovered',
    expectedReturn: '2026-01-22',
  },
  {
    id: 4,
    studentName: 'Emma Davis',
    batch: 'Cricket Batch A',
    date: '2026-01-10',
    type: 'Overuse',
    severity: 'Moderate',
    description: 'Tennis elbow from excessive bowling practice',
    status: 'Recovering',
    expectedReturn: '2026-02-01',
  },
];

export default function CoachInjuries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInjury, setSelectedInjury] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredInjuries = mockInjuries.filter(
    injury =>
      injury.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      injury.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      injury.batch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Minor': return 'bg-yellow-500/20 text-yellow-400';
      case 'Moderate': return 'bg-orange-500/20 text-orange-400';
      case 'Severe': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Recovered': return 'bg-green-500/20 text-green-400';
      case 'Recovering': return 'bg-blue-500/20 text-blue-400';
      case 'Under Treatment': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const viewInjuryDetails = (injury) => {
    setSelectedInjury(injury);
    setShowDetails(true);
  };

  const activeInjuries = mockInjuries.filter(i => i.status !== 'Recovered').length;
  const recoveredCount = mockInjuries.filter(i => i.status === 'Recovered').length;

  return (
    <CoachLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Injury Reports</h2>
          <p className="text-gray-400">Track and monitor student injuries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-sm">Total Injuries</p>
              </div>
              <p className="text-3xl font-bold text-white">{mockInjuries.length}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <p className="text-gray-400 text-sm">Active Cases</p>
              </div>
              <p className="text-3xl font-bold text-white">{activeInjuries}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">Recovered</p>
              </div>
              <p className="text-3xl font-bold text-white">{recoveredCount}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[#F4D03F]" />
                <p className="text-gray-400 text-sm">This Month</p>
              </div>
              <p className="text-3xl font-bold text-white">4</p>
            </Card>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by student name, injury type, or batch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-[#0A1F0A] border-[#2D6A4F] text-white"
              />
            </div>
          </Card>
        </motion.div>

        {/* Injuries List */}
        <div className="space-y-4">
          {filteredInjuries.map((injury, index) => (
            <motion.div
              key={injury.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-[#D4AF37]" />
                        <h3 className="text-white font-bold text-lg">{injury.studentName}</h3>
                      </div>
                      <Badge className="bg-[#40916C]/20 text-[#40916C]">{injury.batch}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Injury Type</p>
                        <p className="text-white font-medium">{injury.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Date</p>
                        <p className="text-white font-medium">
                          {new Date(injury.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Expected Return</p>
                        <p className="text-white font-medium">
                          {new Date(injury.expectedReturn).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">{injury.description}</p>
                    <div className="flex gap-3">
                      <Badge className={getSeverityColor(injury.severity)}>
                        {injury.severity}
                      </Badge>
                      <Badge className={getStatusColor(injury.status)}>
                        {injury.status}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewInjuryDetails(injury)}
                    className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredInjuries.length === 0 && (
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-12">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">No injury reports found</h3>
              <p className="text-gray-400">Try adjusting your search criteria</p>
            </div>
          </Card>
        )}

        {/* Injury Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Injury Report Details</DialogTitle>
            </DialogHeader>
            {selectedInjury && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-[#D4AF37]" />
                  <div>
                    <h3 className="text-white font-bold text-xl">{selectedInjury.studentName}</h3>
                    <p className="text-gray-400">{selectedInjury.batch}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0A1F0A]/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Injury Type</p>
                    <p className="text-white font-semibold">{selectedInjury.type}</p>
                  </div>
                  <div className="bg-[#0A1F0A]/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Severity</p>
                    <Badge className={getSeverityColor(selectedInjury.severity)}>
                      {selectedInjury.severity}
                    </Badge>
                  </div>
                  <div className="bg-[#0A1F0A]/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Date of Injury</p>
                    <p className="text-white">
                      {new Date(selectedInjury.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="bg-[#0A1F0A]/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Expected Return</p>
                    <p className="text-white">
                      {new Date(selectedInjury.expectedReturn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="bg-[#0A1F0A]/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">Status</p>
                  <Badge className={getStatusColor(selectedInjury.status)}>
                    {selectedInjury.status}
                  </Badge>
                </div>

                <div className="bg-[#0A1F0A]/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">Description</p>
                  <p className="text-white">{selectedInjury.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </CoachLayout>
  );
}