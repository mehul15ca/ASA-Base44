import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Star, MessageSquare, Eye, Reply } from 'lucide-react';

export default function AdminFeedback() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [feedbacks] = useState([
    {
      id: 1,
      studentName: 'Ravi Kumar',
      studentId: 'STU001',
      rating: 5,
      category: 'Coaching',
      message: 'Excellent coaching! My skills have improved significantly.',
      date: '2026-01-20',
      status: 'Replied',
      reply: 'Thank you for your positive feedback!'
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      studentId: 'STU023',
      rating: 4,
      category: 'Facilities',
      message: 'Good facilities but could use more equipment.',
      date: '2026-01-19',
      status: 'Pending',
      reply: null
    },
    {
      id: 3,
      studentName: 'Amit Patel',
      studentId: 'STU045',
      rating: 5,
      category: 'Overall Experience',
      message: 'Amazing academy! Highly recommended.',
      date: '2026-01-18',
      status: 'Replied',
      reply: 'We appreciate your recommendation!'
    }
  ]);

  const filteredFeedbacks = feedbacks.filter(f =>
    f.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout currentPageName="AdminFeedback">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Feedback</h1>
            <p className="text-gray-500 mt-1">View and respond to student feedback</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">Total Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{feedbacks.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-gray-900">
                  {(feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)}
                </p>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">Pending Replies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                {feedbacks.filter(f => f.status === 'Pending').length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search feedback..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{feedback.studentName}</h3>
                        <Badge variant="outline" className="text-xs">{feedback.studentId}</Badge>
                        <Badge variant="outline" className="text-xs">{feedback.category}</Badge>
                        {renderStars(feedback.rating)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{feedback.message}</p>
                      {feedback.reply && (
                        <div className="bg-blue-50 p-3 rounded-lg mt-3">
                          <p className="text-xs font-medium text-blue-900 mb-1">Your Reply:</p>
                          <p className="text-sm text-blue-800">{feedback.reply}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-gray-500">{feedback.date}</span>
                        <Badge className={feedback.status === 'Replied' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {feedback.status}
                        </Badge>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedFeedback(feedback);
                            setReplyText(feedback.reply || '');
                          }}
                        >
                          {feedback.status === 'Replied' ? <Eye className="w-4 h-4" /> : <Reply className="w-4 h-4" />}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Feedback Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Student</label>
                            <p className="text-sm text-gray-900 mt-1">{feedback.studentName} ({feedback.studentId})</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Rating</label>
                            <div className="mt-1">{renderStars(feedback.rating)}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Message</label>
                            <p className="text-sm text-gray-900 mt-1">{feedback.message}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Reply</label>
                            <Textarea
                              placeholder="Type your reply..."
                              rows={4}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button variant="outline">Cancel</Button>
                            <Button className="bg-[#1A4D2E] hover:bg-[#2D6A4F]">
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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