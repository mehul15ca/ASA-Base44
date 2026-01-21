import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Plus, Eye } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from 'sonner';

const mockStudents = [
  { id: 1, name: 'John Smith', rollNo: 'STU-001', level: 'Advanced', session: 'Cricket Batch A', time: '06:00 AM', status: 'present', lastEvaluated: '2026-01-08' },
  { id: 2, name: 'Sarah Johnson', rollNo: 'STU-002', level: 'Intermediate', session: 'Cricket Batch A', time: '06:00 AM', status: 'present', lastEvaluated: null },
  { id: 3, name: 'Mike Wilson', rollNo: 'STU-003', level: 'Beginner', session: 'Cricket Batch A', time: '06:00 AM', status: 'present', lastEvaluated: '2026-01-12' },
  { id: 4, name: 'Emma Davis', rollNo: 'STU-004', level: 'Advanced', session: 'Cricket Batch A', time: '06:00 AM', status: 'absent', lastEvaluated: '2026-01-05' },
];

const studentProfileData = {
  firstName: 'John', lastName: 'Smith', studentId: 'STU-001', gender: 'Male', dob: '2005-05-15', bloodGroup: 'O+',
  streetAddress: '123 Main St', city: 'Mumbai', province: 'Maharashtra', postalCode: '400001',
  emergencyContactName: 'Parent Name', emergencyRelationship: 'Father', emergencyPhone: '+91 9876543210',
  parentName: 'Parent Name', parentPhone: '+91 9876543210',
  medicalCondition: 'No', pastInjuries: 'None', allergyInfo: 'None'
};

export default function CoachStudents() {
  const [evaluationModal, setEvaluationModal] = useState(null);
  const [profileModal, setProfileModal] = useState(null);
  const [notes, setNotes] = useState('');
  const [skills, setSkills] = useState({ batting: 70, bowling: 70, fielding: 70, fitness: 70, strategy: 70, teamwork: 70 });

  const presentStudents = mockStudents.filter(s => s.status === 'present');
  const absentStudents = mockStudents.filter(s => s.status === 'absent');
  const attendanceRate = Math.round((presentStudents.length / mockStudents.length) * 100);

  const canEvaluate = (student) => {
    if (!student.lastEvaluated) return true;
    const lastEval = new Date(student.lastEvaluated);
    const today = new Date('2026-01-13');
    const daysDiff = Math.floor((today - lastEval) / (1000 * 60 * 60 * 24));
    return daysDiff >= 7;
  };

  const handleEvaluate = () => {
    if (!notes.trim()) {
      toast.error('Please add notes for the evaluation');
      return;
    }
    toast.success('Evaluation submitted successfully! Student cannot be re-evaluated for 7 days.');
    setEvaluationModal(null);
    setNotes('');
    setSkills({ batting: 70, bowling: 70, fielding: 70, fitness: 70, strategy: 70, teamwork: 70 });
  };

  return (
    <CoachLayout>
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <UserCheck className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">Present</p>
              </div>
              <p className="text-3xl font-bold text-white">{presentStudents.length}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <UserX className="w-5 h-5 text-red-400" />
                <p className="text-gray-400 text-sm">Absent</p>
              </div>
              <p className="text-3xl font-bold text-white">{absentStudents.length}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-gray-400 text-sm">Attendance Rate</p>
              </div>
              <p className="text-3xl font-bold text-white">{attendanceRate}%</p>
            </Card>
          </motion.div>
        </div>

        {/* Present Students */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Present Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {presentStudents.map((student, index) => {
                const canEval = canEvaluate(student);
                return (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#0A1F0A]/50 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center">
                        <span className="text-[#0A1F0A] font-bold">{student.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{student.name}</h3>
                        <p className="text-gray-400 text-sm">{student.rollNo} • {student.level}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 mb-3">
                      <p>{student.session}</p>
                      <p>{student.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => canEval ? setEvaluationModal(student) : null}
                        disabled={!canEval}
                        size="sm"
                        className="flex-1 bg-[#40916C] hover:bg-[#2D6A4F] disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        {canEval ? 'Add Evaluation' : 'Evaluated'}
                      </Button>
                      <Button
                        onClick={() => setProfileModal(studentProfileData)}
                        size="sm"
                        variant="outline"
                        className="border-[#40916C] text-[#40916C]"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Absent Students */}
        {absentStudents.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Absent Students</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {absentStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#0A1F0A]/50 rounded-lg p-4 opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white font-bold">{student.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{student.name}</h3>
                        <p className="text-gray-400 text-sm">{student.rollNo}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        ) : (
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-12 text-center">
            <UserCheck className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No students absent today</h3>
            <p className="text-gray-400">Perfect attendance!</p>
          </Card>
        )}

        {/* Evaluation Modal */}
        <Dialog open={!!evaluationModal} onOpenChange={() => setEvaluationModal(null)}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Evaluate Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                <p className="text-white font-semibold">{evaluationModal?.name}</p>
                <p className="text-gray-400 text-sm">{evaluationModal?.rollNo}</p>
              </div>
              <div className="space-y-4">
                {Object.entries(skills).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-2">
                      <Label className="text-gray-300 capitalize">{skill}</Label>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                    <Slider value={[value]} onValueChange={(v) => setSkills({...skills, [skill]: v[0]})} max={100} className="cursor-pointer" />
                  </div>
                ))}
              </div>
              <div>
                <Label className="text-gray-300">Notes *</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add your evaluation notes..." className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setEvaluationModal(null)} variant="outline" className="flex-1 border-[#40916C] text-gray-300">Cancel</Button>
                <Button onClick={handleEvaluate} className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">Submit Evaluation</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Profile Modal */}
        <Dialog open={!!profileModal} onOpenChange={() => setProfileModal(null)}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Student Profile</DialogTitle>
            </DialogHeader>
            {profileModal && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center">
                    <span className="text-[#0A1F0A] font-bold text-xl">{profileModal.firstName[0]}{profileModal.lastName[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold">{profileModal.firstName} {profileModal.lastName}</h3>
                    <p className="text-gray-400">{profileModal.studentId} • Advanced</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-gray-400 text-sm">First Name</p><p className="text-white">{profileModal.firstName}</p></div>
                  <div><p className="text-gray-400 text-sm">Last Name</p><p className="text-white">{profileModal.lastName}</p></div>
                  <div><p className="text-gray-400 text-sm">Student ID</p><p className="text-white">{profileModal.studentId}</p></div>
                  <div><p className="text-gray-400 text-sm">Gender</p><p className="text-white">{profileModal.gender}</p></div>
                  <div><p className="text-gray-400 text-sm">Date of Birth</p><p className="text-white">{profileModal.dob}</p></div>
                  <div><p className="text-gray-400 text-sm">Blood Group</p><p className="text-white">{profileModal.bloodGroup}</p></div>
                </div>

                <div><h4 className="text-white font-semibold mb-2">Address</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-gray-400 text-sm">Street</p><p className="text-white">{profileModal.streetAddress}</p></div>
                    <div><p className="text-gray-400 text-sm">City</p><p className="text-white">{profileModal.city}</p></div>
                    <div><p className="text-gray-400 text-sm">Province</p><p className="text-white">{profileModal.province}</p></div>
                    <div><p className="text-gray-400 text-sm">Postal Code</p><p className="text-white">{profileModal.postalCode}</p></div>
                  </div>
                </div>

                <div><h4 className="text-white font-semibold mb-2">Emergency Contact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-gray-400 text-sm">Name</p><p className="text-white">{profileModal.emergencyContactName}</p></div>
                    <div><p className="text-gray-400 text-sm">Relationship</p><p className="text-white">{profileModal.emergencyRelationship}</p></div>
                    <div><p className="text-gray-400 text-sm">Phone</p><p className="text-white">{profileModal.emergencyPhone}</p></div>
                  </div>
                </div>

                <div><h4 className="text-white font-semibold mb-2">Parent Contact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-gray-400 text-sm">Parent Name</p><p className="text-white">{profileModal.parentName}</p></div>
                    <div><p className="text-gray-400 text-sm">Phone</p><p className="text-white">{profileModal.parentPhone}</p></div>
                  </div>
                </div>

                <div><h4 className="text-white font-semibold mb-2">Medical Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-gray-400 text-sm">Medical Condition</p><p className="text-white">{profileModal.medicalCondition}</p></div>
                    <div><p className="text-gray-400 text-sm">Past Injuries</p><p className="text-white">{profileModal.pastInjuries}</p></div>
                    <div><p className="text-gray-400 text-sm">Allergies</p><p className="text-white">{profileModal.allergyInfo}</p></div>
                  </div>
                </div>

                <Button onClick={() => setProfileModal(null)} variant="outline" className="w-full border-[#40916C] text-gray-300">Close</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </CoachLayout>
  );
}