import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Calendar, Users, Edit, Trash2, FileText } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from 'sonner';

const mockNotes = [
  {
    id: 1,
    date: '2026-01-21',
    session: 'Cricket Batch A',
    time: '06:00 AM',
    students: 35,
    notes: 'Excellent performance today. Focused on bowling techniques. Students showed great improvement in their grip and release.',
    highlights: 'Top performers: John, Sarah, Mike',
    concerns: 'None',
  },
  {
    id: 2,
    date: '2026-01-21',
    session: 'Cricket Batch B',
    time: '05:00 PM',
    students: 28,
    notes: 'Good energy throughout the session. Worked on batting stance and footwork. Several students need more practice with defensive shots.',
    highlights: 'Good progress in team coordination',
    concerns: 'Need to focus on defensive techniques in next session',
  },
  {
    id: 3,
    date: '2026-01-20',
    session: 'Cricket Batch A',
    time: '06:00 AM',
    students: 35,
    notes: 'Morning session went well. Conducted fielding drills and practiced catching techniques. Weather was perfect for outdoor training.',
    highlights: 'Improved fielding coordination',
    concerns: 'Few students were late',
  },
];

export default function CoachNotes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    session: '',
    time: '',
    students: '',
    notes: '',
    highlights: '',
    concerns: '',
  });

  const filteredNotes = mockNotes.filter(
    note =>
      note.session.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.date.includes(searchQuery)
  );

  const handleAddNote = () => {
    toast.success('Session note added successfully');
    setShowAddNote(false);
    setFormData({
      date: '',
      session: '',
      time: '',
      students: '',
      notes: '',
      highlights: '',
      concerns: '',
    });
  };

  const handleEditNote = () => {
    toast.success('Session note updated successfully');
    setShowEditNote(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = () => {
    toast.success('Session note deleted successfully');
    setShowDeleteConfirm(false);
    setSelectedNote(null);
  };

  const openEditDialog = (note) => {
    setSelectedNote(note);
    setFormData({
      date: note.date,
      session: note.session,
      time: note.time,
      students: note.students,
      notes: note.notes,
      highlights: note.highlights,
      concerns: note.concerns,
    });
    setShowEditNote(true);
  };

  return (
    <CoachLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-0 mb-4 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Session Notes</h2>
            <p className="text-gray-400 text-xs md:text-sm">Document and track your coaching sessions</p>
          </div>
          <Button
            onClick={() => setShowAddNote(true)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] w-full md:w-auto text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <FileText className="w-4 md:w-5 h-4 md:h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-xs md:text-sm">Total Notes</p>
              </div>
              <p className="text-lg md:text-3xl font-bold text-white">{mockNotes.length}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <Calendar className="w-4 md:w-5 h-4 md:h-5 text-[#40916C]" />
                <p className="text-gray-400 text-xs md:text-sm">This Week</p>
              </div>
              <p className="text-lg md:text-3xl font-bold text-white">12</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <Users className="w-4 md:w-5 h-4 md:h-5 text-[#F4D03F]" />
                <p className="text-gray-400 text-xs md:text-sm">Students Documented</p>
              </div>
              <p className="text-lg md:text-3xl font-bold text-white">98</p>
            </Card>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-6"
        >
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 md:w-5 h-4 md:h-5" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 md:pl-12 bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm"
              />
            </div>
          </Card>
        </motion.div>

        {/* Notes List */}
        <div className="space-y-3 md:space-y-4">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3 md:mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <h3 className="text-white font-bold text-base md:text-lg">{note.session}</h3>
                      <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] text-xs">{note.time}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 md:w-4 h-3 md:h-4" />
                        <span>{new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 md:w-4 h-3 md:h-4" />
                        <span>{note.students} Students</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(note)}
                      className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10 flex-1 md:flex-none text-xs"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedNote(note);
                        setShowDeleteConfirm(true);
                      }}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 flex-1 md:flex-none text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <div>
                    <p className="text-gray-400 text-xs md:text-sm font-semibold mb-1">Notes:</p>
                    <p className="text-gray-300 text-xs md:text-sm line-clamp-2">{note.notes}</p>
                  </div>
                  {note.highlights && (
                    <div>
                      <p className="text-gray-400 text-xs md:text-sm font-semibold mb-1">Highlights:</p>
                      <p className="text-green-400 text-xs md:text-sm">{note.highlights}</p>
                    </div>
                  )}
                  {note.concerns && note.concerns !== 'None' && (
                    <div>
                      <p className="text-gray-400 text-xs md:text-sm font-semibold mb-1">Concerns:</p>
                      <p className="text-yellow-400 text-xs md:text-sm">{note.concerns}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6 md:p-12">
            <div className="text-center">
              <FileText className="w-8 md:w-12 h-8 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
              <h3 className="text-white text-base md:text-lg font-semibold mb-2">No session notes found</h3>
              <p className="text-gray-400 text-xs md:text-sm">Try adjusting your search or add a new session note</p>
            </div>
          </Card>
        )}

        {/* Add Note Dialog */}
        <Dialog open={showAddNote} onOpenChange={setShowAddNote}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-lg md:text-xl">Add Session Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Date *</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Session *</Label>
                  <Input
                    placeholder="e.g., Cricket Batch A"
                    value={formData.session}
                    onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Time *</Label>
                  <Input
                    placeholder="e.g., 06:00 AM"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Number of Students</Label>
                  <Input
                    type="number"
                    placeholder="35"
                    value={formData.students}
                    onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Session Notes *</Label>
                <Textarea
                  placeholder="Describe what happened during the session..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white h-20 md:h-24 text-xs"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Highlights</Label>
                <Textarea
                  placeholder="Key achievements or positive observations..."
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white h-16 md:h-20 text-xs"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Concerns</Label>
                <Textarea
                  placeholder="Issues or areas that need attention..."
                  value={formData.concerns}
                  onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white h-16 md:h-20 text-xs"
                />
              </div>
            </div>
            <DialogFooter className="flex-col-reverse md:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddNote(false)}
                className="border-[#40916C] text-gray-300 text-xs w-full md:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddNote}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-xs w-full md:w-auto"
              >
                Add Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Note Dialog */}
        <Dialog open={showEditNote} onOpenChange={setShowEditNote}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-lg md:text-xl">Edit Session Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Date *</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Session *</Label>
                  <Input
                    placeholder="e.g., Cricket Batch A"
                    value={formData.session}
                    onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <div>
                  <Label className="text-gray-300">Time *</Label>
                  <Input
                    placeholder="e.g., 06:00 AM"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Number of Students</Label>
                  <Input
                    type="number"
                    placeholder="35"
                    value={formData.students}
                    onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Session Notes *</Label>
                <Textarea
                  placeholder="Describe what happened during the session..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white h-20 md:h-24 text-xs"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Highlights</Label>
                <Textarea
                  placeholder="Key achievements or positive observations..."
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white h-16 md:h-20 text-xs"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Concerns</Label>
                <Textarea
                  placeholder="Issues or areas that need attention..."
                  value={formData.concerns}
                  onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white h-16 md:h-20 text-xs"
                />
              </div>
              </div>
              <DialogFooter className="flex-col-reverse md:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowEditNote(false)}
                className="border-[#40916C] text-gray-300 text-xs w-full md:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditNote}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-xs w-full md:w-auto"
              >
                Update Note
              </Button>
              </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white text-lg md:text-xl">Delete Session Note</DialogTitle>
            </DialogHeader>
            <p className="text-gray-300 text-xs md:text-sm">
              Are you sure you want to delete this session note? This action cannot be undone.
            </p>
            <DialogFooter className="flex-col-reverse md:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="border-[#40916C] text-gray-300 text-xs w-full md:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteNote}
                className="bg-red-500 hover:bg-red-600 text-white text-xs w-full md:w-auto"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CoachLayout>
  );
}