import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Calendar, Eye } from 'lucide-react';
import StudentLayout from '../components/student/StudentLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

const mockEvaluations = [
  {
    id: 1,
    coach: 'Coach John Doe',
    date: '2026-01-15',
    overallScore: 85,
    skills: { batting: 88, bowling: 82, fielding: 90, fitness: 85, strategy: 80, teamwork: 92 },
    notes: 'Excellent performance overall. Shows great improvement in batting techniques. Continue working on bowling accuracy.'
  },
  {
    id: 2,
    coach: 'Coach Sarah Smith',
    date: '2026-01-08',
    overallScore: 82,
    skills: { batting: 85, bowling: 78, fielding: 88, fitness: 82, strategy: 78, teamwork: 85 },
    notes: 'Good effort in training sessions. Needs to focus more on bowling consistency and strategy development.'
  },
  {
    id: 3,
    coach: 'Coach John Doe',
    date: '2026-01-01',
    overallScore: 80,
    skills: { batting: 82, bowling: 75, fielding: 85, fitness: 80, strategy: 75, teamwork: 83 },
    notes: 'Showing steady progress. Keep practicing regularly and maintain discipline in training.'
  },
];

export default function StudentEvaluations() {
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  const totalEvaluations = mockEvaluations.length;
  const averageRating = Math.round(mockEvaluations.reduce((sum, e) => sum + e.overallScore, 0) / totalEvaluations);
  const lastEvaluationDate = mockEvaluations[0].date;

  return (
    <StudentLayout>
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-sm">Total Evaluations</p>
              </div>
              <p className="text-3xl font-bold text-white">{totalEvaluations}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">Average Rating</p>
              </div>
              <p className="text-3xl font-bold text-white">{averageRating}%</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[#40916C]" />
                <p className="text-gray-400 text-sm">Last Evaluation</p>
              </div>
              <p className="text-xl font-bold text-white">{lastEvaluationDate}</p>
            </Card>
          </motion.div>
        </div>

        {/* Evaluations List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Evaluation History</h2>
            <div className="space-y-4">
              {mockEvaluations.map((evaluation, index) => (
                <motion.div
                  key={evaluation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#0A1F0A]/50 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{evaluation.coach}</h3>
                      <p className="text-gray-400 text-sm">{evaluation.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#D4AF37] text-2xl font-bold">{evaluation.overallScore}%</p>
                      <p className="text-gray-400 text-sm">Overall Score</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {Object.entries(evaluation.skills).slice(0, 3).map(([skill, value]) => (
                      <div key={skill}>
                        <p className="text-gray-400 text-sm capitalize">{skill}</p>
                        <p className="text-white font-semibold">{value}%</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setSelectedEvaluation(evaluation)}
                    variant="outline"
                    size="sm"
                    className="border-[#40916C] text-[#40916C]"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Evaluation Details Modal */}
        <Dialog open={!!selectedEvaluation} onOpenChange={() => setSelectedEvaluation(null)}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Evaluation Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Coach</p>
                  <p className="text-white font-semibold">{selectedEvaluation?.coach}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white font-semibold">{selectedEvaluation?.date}</p>
                </div>
              </div>

              <div className="bg-[#0A1F0A]/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm mb-2">Overall Score</p>
                <p className="text-[#D4AF37] text-4xl font-bold">{selectedEvaluation?.overallScore}%</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-semibold">Skill Ratings</h3>
                {selectedEvaluation && Object.entries(selectedEvaluation.skills).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-2">
                      <p className="text-gray-300 capitalize">{skill}</p>
                      <p className="text-white font-semibold">{value}%</p>
                    </div>
                    <Slider
                      value={[value]}
                      max={100}
                      disabled
                      className="cursor-default"
                    />
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Coach Notes</h3>
                <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                  <p className="text-gray-300">{selectedEvaluation?.notes}</p>
                </div>
              </div>

              <Button
                onClick={() => setSelectedEvaluation(null)}
                variant="outline"
                className="w-full border-[#40916C] text-gray-300"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </StudentLayout>
  );
}