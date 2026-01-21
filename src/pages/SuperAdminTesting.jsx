import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestTube, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import SuperAdminLayout from '../components/superadmin/SuperAdminLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';

const testSuites = [
  { id: 'api', name: 'API Health Tests', description: 'Test all API endpoints for availability and response times', tests: 47 },
  { id: 'integration', name: 'Integration Tests', description: 'Test third-party service integrations', tests: 23 },
  { id: 'load', name: 'Load / Stress Tests', description: 'Test system performance under heavy load', tests: 12 },
  { id: 'smoke', name: 'Smoke Tests', description: 'Quick validation of critical functionality', tests: 8 },
];

const mockTestResults = [
  { id: 1, name: 'User Authentication Endpoint', status: 'PASS', executionTime: '142ms', errorSummary: '-', suite: 'API Health Tests' },
  { id: 2, name: 'Database Connection Pool', status: 'PASS', executionTime: '45ms', errorSummary: '-', suite: 'Integration Tests' },
  { id: 3, name: 'Payment Gateway Integration', status: 'FAIL', executionTime: '3.2s', errorSummary: 'Connection timeout', suite: 'Integration Tests' },
  { id: 4, name: 'Email Service SMTP', status: 'PASS', executionTime: '234ms', errorSummary: '-', suite: 'API Health Tests' },
  { id: 5, name: 'Concurrent User Load (1000)', status: 'PASS', executionTime: '8.5s', errorSummary: '-', suite: 'Load / Stress Tests' },
  { id: 6, name: 'Critical Page Load', status: 'PASS', executionTime: '1.2s', errorSummary: '-', suite: 'Smoke Tests' },
];

const suiteHistory = [
  { suite: 'API Health Tests', lastStatus: 'PASS', lastRun: '2026-01-21 14:30', duration: '3m 24s', totalTests: 47 },
  { suite: 'Integration Tests', lastStatus: 'FAIL', lastRun: '2026-01-21 12:15', duration: '5m 12s', totalTests: 23 },
  { suite: 'Load / Stress Tests', lastStatus: 'PASS', lastRun: '2026-01-21 08:00', duration: '12m 45s', totalTests: 12 },
  { suite: 'Smoke Tests', lastStatus: 'PASS', lastRun: '2026-01-21 14:45', duration: '45s', totalTests: 8 },
];

export default function SuperAdminTesting() {
  const [selectedSuites, setSelectedSuites] = useState([]);
  const [targetEnvironment, setTargetEnvironment] = useState('staging');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalTests = mockTestResults.length;
  const passedTests = mockTestResults.filter(t => t.status === 'PASS').length;
  const failedTests = mockTestResults.filter(t => t.status === 'FAIL').length;

  const handleToggleSuite = (suiteId) => {
    setSelectedSuites(prev =>
      prev.includes(suiteId) ? prev.filter(id => id !== suiteId) : [...prev, suiteId]
    );
  };

  const handleRunTests = () => {
    if (selectedSuites.length === 0) return;
    
    setIsRunning(true);
    setProgress(0);
    toast.success(`Running tests on ${targetEnvironment} environment...`);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          toast.success('Tests completed');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <SuperAdminLayout>
      <div>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Automated Testing Control</h1>
          <p className="text-gray-400">Configure and run automated test suites</p>
        </motion.div>

        {/* Test Configuration */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Test Configuration</h2>
            
            {/* Select Test Suites */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">Select Test Suites</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testSuites.map((suite) => (
                  <div
                    key={suite.id}
                    onClick={() => handleToggleSuite(suite.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedSuites.includes(suite.id)
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#2D6A4F] bg-[#0A1F0A]/50 hover:border-[#40916C]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedSuites.includes(suite.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{suite.name}</h4>
                        <p className="text-gray-400 text-sm mb-2">{suite.description}</p>
                        <Badge className="bg-[#D4AF37]/20 text-[#D4AF37]">{suite.tests} tests</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Environment */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Target Environment</h3>
              <Select value={targetEnvironment} onValueChange={setTargetEnvironment}>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="production">Production (Caution!)</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Run Tests Button */}
            <Button
              onClick={handleRunTests}
              disabled={selectedSuites.length === 0 || isRunning}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] disabled:opacity-50"
            >
              {isRunning ? 'Running Tests...' : 'Run Selected Tests'}
            </Button>

            {/* Running Info */}
            <AnimatePresence>
              {isRunning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                      <p className="text-blue-400 font-semibold">Running tests on {targetEnvironment} environment...</p>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Test Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <p className="text-gray-400 text-sm mb-1">Total Tests</p>
              <p className="text-3xl font-bold text-white">{totalTests}</p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <p className="text-gray-400 text-sm mb-1">Passed</p>
              <p className="text-3xl font-bold text-green-400">{passedTests}</p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <p className="text-gray-400 text-sm mb-1">Failed</p>
              <p className="text-3xl font-bold text-red-400">{failedTests}</p>
            </Card>
          </motion.div>
        </div>

        {/* Latest Test Results */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Latest Test Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Test Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Execution Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Error Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTestResults.map((test, index) => (
                    <motion.tr
                      key={test.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                    >
                      <td className="px-6 py-4 text-white">{test.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {test.status === 'PASS' ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <Badge className="bg-green-500/20 text-green-400">PASS</Badge>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-400" />
                              <Badge className="bg-red-500/20 text-red-400">FAIL</Badge>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Clock className="w-4 h-4" />
                          <span>{test.executionTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={test.errorSummary === '-' ? 'text-gray-400' : 'text-red-400'}>
                          {test.errorSummary}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Test Suite History */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Test Suite History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suiteHistory.map((suite, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#0A1F0A]/50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-semibold">{suite.suite}</h3>
                    {suite.lastStatus === 'PASS' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Run</span>
                      <span className="text-white">{suite.lastRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white">{suite.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Tests</span>
                      <span className="text-white">{suite.totalTests}</span>
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