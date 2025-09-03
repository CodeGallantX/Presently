'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const motion = dynamic(() => import('framer-motion').then(mod => mod.motion), { ssr: false });
const AnimatePresence = dynamic(() => import('framer-motion').then(mod => mod.AnimatePresence), { ssr: false });
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const dummyCourses = [
  { id: 'math101', name: 'Mathematics 101' },
  { id: 'phy201', name: 'Physics 201' },
  { id: 'chem101', name: 'Chemistry 101' },
  { id: 'bio101', name: 'Biology 101' },
];

const dummyVenues = [
  { id: 'lt1', name: 'Lecture Theatre 1' },
  { id: 'lt2', name: 'Lecture Theatre 2' },
  { id: 'labA', name: 'Computer Lab A' },
  { id: 'confR', name: 'Conference Room' },
];

const CreateSessionModal = ({ isOpen, onClose, onCreateSession }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (!selectedCourse || !selectedVenue) {
      alert('Please select both a course and a venue.');
      return;
    }

    setIsCreating(true);
    setTimeout(() => {
      const newSession = {
        courseId: selectedCourse,
        courseName: dummyCourses.find(c => c.id === selectedCourse)?.name,
        venueId: selectedVenue,
        venueName: dummyVenues.find(v => v.id === selectedVenue)?.name,
        startTime: new Date(),
        present: 0,
        total: 45, // Dummy total students
        sessionCode: Math.random().toString(36).substring(2, 8).toUpperCase(), // 6-alphanumeric
        qrCodeUrl: 'https://example.com/dummy-qr.png', // Dummy QR code URL
      };
      onCreateSession(newSession);
      setIsCreating(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Session</DialogTitle>
          <DialogDescription>
            Select a course and venue to start a new attendance session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Course Selection */}
          <div className="space-y-2">
            <Label htmlFor="course" className="text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Course
            </Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {dummyCourses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Venue Selection */}
          <div className="space-y-2">
            <Label htmlFor="venue" className="text-base flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Venue
            </Label>
            <Select value={selectedVenue} onValueChange={setSelectedVenue}>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select a venue" />
              </SelectTrigger>
              <SelectContent>
                {dummyVenues.map(venue => (
                  <SelectItem key={venue.id} value={venue.id}>
                    {venue.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleCreate} 
            disabled={isCreating || !selectedCourse || !selectedVenue}
            className="cta-button"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Session'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionModal;
