import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Save, X } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

const mockStudents = [
  { id: 1, name: 'Alex Johnson', batch: 'Senior Cricket', recentScore: 85 },
  { id: 2, name: 'Emma Wilson', batch: 'Junior Cricket', recentScore: 78 },
  { id: 3, name: 'Michael Brown', batch: 'Senior Cricket', recentScore: 92 },
  { id: 4, name: 'Sarah Davis', batch: 'Intermediate Cricket', recentScore: 88 },
  { id: 5, name: 'James Miller', batch: 'Senior Cricket', recentScore: 75 },
];

export default function CoachEvaluations() {
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [evaluation, setEvaluation] = useState({
    batting: 5,
    bowling: 5,
    fielding: 5,
    teamwork: 5,
    notes: ''
  });

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.batch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenEvaluation = (student) => {
    setSelectedStudent(student);
    setEvaluation({
      batting: 5,
      bowling: 5,
      fielding: 5,
      teamwork: 5,
      notes: ''
    });
    setShowEvaluationForm(true);
  };

  const handleSaveEvaluation = () => {
    // Save evaluation logic would go here
    console.log('Saving evaluation for', selectedStudent.name, evaluation);
    setShowEvaluationForm(false);
    setSelectedStudent(null);
  };

  const handleSliderChange = (skill, value) => {
    setEvaluation(prev => ({ ...prev, [skill]: value[0] }));
  };

  const overallScore = Math.round(
    (evaluation.batting + evaluation.bowling + evaluation.fielding + evaluation.teamwork) / 4
  );

  return (
    <CoachLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">Student Evaluations</h2>
            <p className="text-gray-400 text-xs md:text-sm">Evaluate your students' performance</p>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 md:pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm h-8 md:h-10"
            />
          </div>
        </motion.div>

        {/* Students List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
            <div className="space-y-2 md:space-y-4">
              {filteredStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#0A1F0A]/50 rounded-lg p-3 md:p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0"
                >
                  <div>
                    <h3 className="text-white font-semibold text-sm md:text-lg">{student.name}</h3>
                    <p className="text-gray-400 text-xs md:text-sm">{student.batch}</p>
                    <p className="text-[#D4AF37] text-xs md:text-sm mt-1">Score: {student.recentScore}%</p>
                  </div>
                  <Button
                    onClick={() => handleOpenEvaluation(student)}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:from-[#F4D03F] hover:to-[#D4AF37] text-xs md:text-sm h-8 md:h-10 w-full md:w-auto"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    Evaluate
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Evaluation Form Modal */}
        <Dialog open={showEvaluationForm} onOpenChange={setShowEvaluationForm}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                Evaluate {selectedStudent?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Student Info */}
              <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Batch: {selectedStudent?.batch}</p>
              </div>

              {/* Overall Score Display */}
              <div className="bg-gradient-to-r from-[#1A4D2E] to-[#0D2818] rounded-lg p-4 text-center border border-[#2D6A4F]/50">
                <p className="text-gray-400 text-sm mb-2">Overall Score</p>
                <p className="text-[#D4AF37] text-4xl font-bold">{overallScore}/10</p>
              </div>

              {/* Skill Sliders */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Rate Skills (1-10)</h3>
                
                {/* Batting */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-300">Batting</p>
                    <p className="text-white font-semibold">{evaluation.batting}/10</p>
                  </div>
                  <Slider
                    value={[evaluation.batting]}
                    onValueChange={(value) => handleSliderChange('batting', value)}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>

                {/* Bowling */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-300">Bowling</p>
                    <p className="text-white font-semibold">{evaluation.bowling}/10</p>
                  </div>
                  <Slider
                    value={[evaluation.bowling]}
                    onValueChange={(value) => handleSliderChange('bowling', value)}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>

                {/* Fielding */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-300">Fielding</p>
                    <p className="text-white font-semibold">{evaluation.fielding}/10</p>
                  </div>
                  <Slider
                    value={[evaluation.fielding]}
                    onValueChange={(value) => handleSliderChange('fielding', value)}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>

                {/* Teamwork */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-300">Teamwork</p>
                    <p className="text-white font-semibold">{evaluation.teamwork}/10</p>
                  </div>
                  <Slider
                    value={[evaluation.teamwork]}
                    onValueChange={(value) => handleSliderChange('teamwork', value)}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-white font-semibold mb-2">Evaluation Notes</h3>
                <Textarea
                  placeholder="Add detailed feedback for the student..."
                  value={evaluation.notes}
                  onChange={(e) => setEvaluation(prev => ({ ...prev, notes: e.target.value }))}
                  className="bg-[#0A1F0A]/50 border-[#2D6A4F] text-white min-h-32"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowEvaluationForm(false)}
                  variant="outline"
                  className="flex-1 border-[#2D6A4F] text-gray-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEvaluation}
                  className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:from-[#F4D03F] hover:to-[#D4AF37]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Evaluation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </CoachLayout>
  );
}