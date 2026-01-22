import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Plus, Search, Edit, Trash2, Send } from 'lucide-react';

export default function AdminAnnouncements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Training Schedule Update',
      message: 'Please note that next week\'s training will start at 6:00 AM instead of 5:00 AM.',
      target: 'All Students',
      priority: 'High',
      date: '2026-01-20',
      status: 'Sent'
    },
    {
      id: 2,
      title: 'New Equipment Arrival',
      message: 'New cricket equipment has arrived and is now available for use.',
      target: 'Cricket Batch',
      priority: 'Medium',
      date: '2026-01-19',
      status: 'Sent'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    target: '',
    priority: 'Medium'
  });

  const handleCreateAnnouncement = () => {
    const announcement = {
      id: announcements.length + 1,
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0],
      status: 'Sent'
    };
    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: '', message: '', target: '', priority: 'Medium' });
    setShowNewDialog(false);
  };

  const filteredAnnouncements = announcements.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const priorityColors = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-blue-500'
  };

  return (
    <AdminLayout currentPageName="AdminAnnouncements">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-500 mt-1">Send announcements to students, coaches, and parents</p>
          </div>
          <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#1A4D2E] hover:bg-[#2D6A4F]">
                <Plus className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    placeholder="Announcement title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    placeholder="Announcement message"
                    rows={5}
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Audience</label>
                    <Select value={newAnnouncement.target} onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, target: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Students">All Students</SelectItem>
                        <SelectItem value="All Coaches">All Coaches</SelectItem>
                        <SelectItem value="Cricket Batch">Cricket Batch</SelectItem>
                        <SelectItem value="Football Batch">Football Batch</SelectItem>
                        <SelectItem value="Parents">Parents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Priority</label>
                    <Select value={newAnnouncement.priority} onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, priority: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowNewDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateAnnouncement}
                    disabled={!newAnnouncement.title || !newAnnouncement.message || !newAnnouncement.target}
                    className="bg-[#1A4D2E] hover:bg-[#2D6A4F]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search announcements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full ${priorityColors[announcement.priority]} mt-2`}></div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{announcement.message}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <Badge variant="outline" className="text-xs">
                            {announcement.target}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {announcement.priority} Priority
                          </Badge>
                          <span className="text-xs text-gray-500">{announcement.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}