import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Edit, Copy, X } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const mockClasses = {
  '2026-01-21': [
    { id: 1, batch: 'Cricket Batch A', time: '06:00 - 07:30', coach: 'David Miller', ground: 'Ground A', status: 'completed' },
    { id: 2, batch: 'Football Batch', time: '17:00 - 18:30', coach: 'Emma Watson', ground: 'Ground C', status: 'scheduled' },
  ],
  '2026-01-22': [
    { id: 3, batch: 'Tennis Batch', time: '16:00 - 17:30', coach: 'Tom Brown', ground: 'Indoor Court', status: 'scheduled' },
  ],
};

const mockMatches = [
  { id: 1, title: 'Inter-Batch Cricket Match', sport: 'Cricket', type: 'Internal', date: '2026-01-25', time: '10:00 AM', ground: 'Main Stadium', coach: 'David Miller', players: 22, teamA: 'Batch A', teamB: 'Batch B', status: 'Scheduled' },
  { id: 2, title: 'Football Friendly', sport: 'Football', type: 'External', date: '2026-01-28', time: '2:00 PM', ground: 'Ground C', coach: 'Emma Watson', players: 18, teamA: 'ASA', teamB: 'City FC', status: 'Scheduled', result: null },
  { id: 3, title: 'Tennis Championship Finals', sport: 'Tennis', type: 'Internal', date: '2026-01-15', time: '4:00 PM', ground: 'Indoor Court', coach: 'Tom Brown', players: 4, teamA: 'Singles A', teamB: 'Singles B', status: 'Completed', result: 'Singles A won 6-4, 6-3' },
];

export default function AdminSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // January 2026
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showClassListModal, setShowClassListModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showEditMatchModal, setShowEditMatchModal] = useState(false);
  const [showCreateMatchModal, setShowCreateMatchModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [searchMatch, setSearchMatch] = useState('');
  const [matchStatusFilter, setMatchStatusFilter] = useState('all');
  const [selectedDates, setSelectedDates] = useState([]);
  const [matchType, setMatchType] = useState('internal');

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const handleDateClick = (day) => {
    const dateStr = `2026-01-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    if (mockClasses[dateStr]) {
      setShowClassListModal(true);
    } else {
      setShowAddClassModal(true);
    }
  };

  const filteredMatches = mockMatches.filter(match => {
    const matchesSearch = match.title.toLowerCase().includes(searchMatch.toLowerCase());
    const matchesStatus = matchStatusFilter === 'all' || match.status.toLowerCase() === matchStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Matches', value: mockMatches.length.toString() },
    { label: 'Scheduled', value: mockMatches.filter(m => m.status === 'Scheduled').length.toString() },
    { label: 'Completed', value: mockMatches.filter(m => m.status === 'Completed').length.toString() },
    { label: 'This Month', value: '5' },
  ];

  const getClassStatus = (cls) => {
    if (cls.status === 'cancelled') return 'Cancelled';
    const now = new Date();
    const classDate = new Date(selectedDate + ' ' + cls.time.split(' - ')[0]);
    if (classDate < now) return 'Completed';
    return 'Scheduled';
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A] min-h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Schedule & Matches</h1>
          <p className="text-gray-400">Manage training schedule and matches</p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="bg-[#0D2818] border border-[#2D6A4F]/50 mb-6">
            <TabsTrigger value="schedule" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Matches
            </TabsTrigger>
          </TabsList>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-xl p-6"
            >
              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                    className="border-[#40916C] text-gray-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                    className="border-[#40916C] text-gray-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-[#D4AF37] font-semibold py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `2026-01-${String(day).padStart(2, '0')}`;
                  const classes = mockClasses[dateStr] || [];
                  return (
                    <motion.div
                      key={day}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleDateClick(day)}
                      className="aspect-square bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg p-2 cursor-pointer hover:border-[#D4AF37] transition-colors"
                    >
                      <div className="text-white font-semibold mb-1">{day}</div>
                      <div className="space-y-1">
                        {classes.slice(0, 2).map((cls, idx) => (
                          <div key={idx} className="text-[10px] bg-[#40916C]/30 text-[#40916C] px-1 py-0.5 rounded truncate">
                            {cls.batch}
                          </div>
                        ))}
                        {classes.length > 2 && (
                          <div className="text-[10px] text-[#D4AF37]">+{classes.length - 2} more</div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-xl p-6"
                >
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-xl p-6 mb-6"
            >
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Input
                    placeholder="Search matches..."
                    value={searchMatch}
                    onChange={(e) => setSearchMatch(e.target.value)}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                  />
                </div>
                <Select value={matchStatusFilter} onValueChange={setMatchStatusFilter}>
                  <SelectTrigger className="w-48 bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => setShowCreateMatchModal(true)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Match
                </Button>
              </div>
            </motion.div>

            {/* Matches List */}
            <div className="space-y-4">
              {filteredMatches.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{match.title}</h3>
                        <div className="flex gap-2">
                          <Badge className="bg-[#D4AF37]/20 text-[#D4AF37]">{match.sport}</Badge>
                          <Badge className={match.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}>
                            {match.status}
                          </Badge>
                          <Badge variant="outline" className="border-[#40916C] text-[#40916C]">
                            {match.type}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedMatch(match);
                          setShowEditMatchModal(true);
                        }}
                        className="border-[#40916C] text-[#40916C]"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-xs">Date</p>
                        <p className="text-white text-sm">{match.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Time</p>
                        <p className="text-white text-sm">{match.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Ground</p>
                        <p className="text-white text-sm">{match.ground}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Players</p>
                        <p className="text-white text-sm">{match.players}</p>
                      </div>
                    </div>
                    <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-white font-semibold">{match.teamA}</p>
                          </div>
                          <span className="text-gray-400">vs</span>
                          <div className="text-center">
                            <p className="text-white font-semibold">{match.teamB}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Coach</p>
                          <p className="text-white text-sm">{match.coach}</p>
                        </div>
                      </div>
                      {match.result && match.status === 'Completed' && (
                        <div className="mt-3 pt-3 border-t border-[#2D6A4F]/50">
                          <p className="text-[#D4AF37] font-semibold">Result: {match.result}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Class Modal */}
        <Dialog open={showAddClassModal} onOpenChange={setShowAddClassModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white">Add Class - {selectedDate}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Batch *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="cricket_a">Cricket Batch A</SelectItem>
                    <SelectItem value="cricket_b">Cricket Batch B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Time From *</Label>
                  <Input type="time" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
                </div>
                <div>
                  <Label className="text-gray-300">Time To *</Label>
                  <Input type="time" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Coach *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select coach" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="david">David Miller</SelectItem>
                    <SelectItem value="emma">Emma Watson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Ground *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select ground" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="ground_a">Ground A</SelectItem>
                    <SelectItem value="ground_b">Ground B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddClassModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setShowAddClassModal(false);
                  setShowDuplicateModal(true);
                }}
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37]"
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicate This
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Class List Modal */}
        <Dialog open={showClassListModal} onOpenChange={setShowClassListModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Scheduled Classes - {selectedDate}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {mockClasses[selectedDate]?.map((cls) => (
                <Card key={cls.id} className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-white font-semibold">{cls.batch}</h4>
                      <Badge className={
                        getClassStatus(cls) === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                        getClassStatus(cls) === 'Completed' ? 'bg-green-500/20 text-green-400' :
                        'bg-blue-500/20 text-blue-400'
                      }>
                        {getClassStatus(cls)}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-[#40916C] text-[#40916C]">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                        <Copy className="w-3 h-3" />
                      </Button>
                      {getClassStatus(cls) === 'Scheduled' && (
                        <Button size="sm" variant="outline" className="border-red-500/50 text-red-400">
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Time</p>
                      <p className="text-white">{cls.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Coach</p>
                      <p className="text-white">{cls.coach}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Ground</p>
                      <p className="text-white">{cls.ground}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  setShowClassListModal(false);
                  setShowAddClassModal(true);
                }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Class
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Duplicate Modal */}
        <Dialog open={showDuplicateModal} onOpenChange={setShowDuplicateModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Select Dates</DialogTitle>
              <p className="text-gray-400 text-sm">Choose multiple dates to duplicate this class</p>
            </DialogHeader>
            <div>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `2026-01-${String(day).padStart(2, '0')}`;
                  const isSelected = selectedDates.includes(dateStr);
                  return (
                    <motion.div
                      key={day}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedDates(selectedDates.filter(d => d !== dateStr));
                        } else {
                          setSelectedDates([...selectedDates, dateStr]);
                        }
                      }}
                      className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer ${
                        isSelected 
                          ? 'bg-[#D4AF37] text-[#0A1F0A] font-bold' 
                          : 'bg-[#0A1F0A] border border-[#2D6A4F]/50 text-white hover:border-[#D4AF37]'
                      }`}
                    >
                      {day}
                    </motion.div>
                  );
                })}
              </div>
              <p className="text-[#D4AF37] text-sm">{selectedDates.length} dates selected</p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDuplicateModal(false);
                  setSelectedDates([]);
                }}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
                onClick={() => {
                  setShowDuplicateModal(false);
                  setSelectedDates([]);
                }}
              >
                Save for Selected Dates
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Match Modal */}
        <Dialog open={showEditMatchModal} onOpenChange={setShowEditMatchModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Match</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Match Title *</Label>
                <Input 
                  defaultValue={selectedMatch?.title}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Type *</Label>
                  <Select defaultValue={selectedMatch?.type?.toLowerCase()}>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="external">External</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Sport *</Label>
                  <Select defaultValue={selectedMatch?.sport?.toLowerCase()}>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="cricket">Cricket</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="tennis">Tennis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Ground *</Label>
                  <Select>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                      <SelectValue placeholder={selectedMatch?.ground} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="main">Main Stadium</SelectItem>
                      <SelectItem value="ground_a">Ground A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Coach *</Label>
                  <Select>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                      <SelectValue placeholder={selectedMatch?.coach} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="david">David Miller</SelectItem>
                      <SelectItem value="emma">Emma Watson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Date *</Label>
                  <Input 
                    type="date"
                    defaultValue={selectedMatch?.date}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Time *</Label>
                  <Input 
                    type="time"
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Status *</Label>
                <Select defaultValue={selectedMatch?.status?.toLowerCase()}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedMatch?.status === 'Completed' && (
                <div>
                  <Label className="text-gray-300">Result</Label>
                  <Textarea 
                    placeholder="Enter match result..."
                    defaultValue={selectedMatch?.result}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditMatchModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowEditMatchModal(false)}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Match Modal */}
        <Dialog open={showCreateMatchModal} onOpenChange={setShowCreateMatchModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Create Match</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Match Title *</Label>
                <Input className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
              <div>
                <Label className="text-gray-300">Type *</Label>
                <Select value={matchType} onValueChange={setMatchType}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Sport *</Label>
                  <Select>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="cricket">Cricket</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="tennis">Tennis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Ground *</Label>
                  <Select>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                      <SelectValue placeholder="Select ground" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="main">Main Stadium</SelectItem>
                      <SelectItem value="ground_a">Ground A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Coach *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select coach" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="david">David Miller</SelectItem>
                    <SelectItem value="emma">Emma Watson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Date *</Label>
                  <Input type="date" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
                </div>
                <div>
                  <Label className="text-gray-300">Time *</Label>
                  <Input type="time" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
                </div>
              </div>
              {matchType === 'external' && (
                <div>
                  <Label className="text-gray-300">External Team Name *</Label>
                  <Input className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
                </div>
              )}
              {matchType === 'internal' && (
                <div className="bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <Label className="text-gray-300 mb-3 block">Select Students</Label>
                  <div className="space-y-2">
                    {['John Smith - Cricket', 'Sarah Johnson - Cricket', 'Mike Wilson - Cricket'].map((student, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Checkbox className="border-[#40916C]" />
                        <span className="text-white text-sm">{student}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCreateMatchModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowCreateMatchModal(false)}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Create Match
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}