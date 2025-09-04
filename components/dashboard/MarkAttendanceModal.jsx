'use client';
import { useState } from 'react';

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QrCode, MapPin, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

const MarkAttendanceModal = ({ isOpen, onClose, onMarkAttendance }) => {
  const [sessionCode, setSessionCode] = useState('');
  const [locationStatus, setLocationStatus] = useState(null); // null, 'checking', 'in-range', 'out-of-range'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCheckLocation = () => {
    setLocationStatus('checking');
    // Simulate location check
    setTimeout(() => {
      const isInRange = Math.random() > 0.5; // 50% chance of being in range
      setLocationStatus(isInRange ? 'in-range' : 'out-of-range');
    }, 1500);
  };

  const handleSubmitAttendance = () => {
    if (locationStatus !== 'in-range') {
      toast({ title: "Location Error", description: "You must be in range to mark attendance.", variant: "destructive" });
      return;
    }
    if (!sessionCode) {
      toast({ title: "Input Error", description: "Please enter a session code.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    // Simulate attendance marking
    setTimeout(() => {
      onMarkAttendance(sessionCode); // Call the parent's mark attendance function
      setIsSubmitting(false);
      onClose(); // Close modal on success
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] sm:max-w-[425px] p-6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Mark Attendance</DialogTitle>
          <DialogDescription>
            Scan the QR code or enter the session code to mark your attendance.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Location Section */}
          <div className="space-y-2">
            <Label className="text-base flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location Check
            </Label>
            <Button 
              onClick={handleCheckLocation} 
              disabled={locationStatus === 'checking'}
              className="w-full secondary-button"
            >
              {locationStatus === 'checking' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking Location...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  Check My Location
                </>
              )}
            </Button>
            <AnimatePresence>
              {locationStatus && locationStatus !== 'checking' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium mt-2",
                    locationStatus === 'in-range' ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {locationStatus === 'in-range' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  {locationStatus === 'in-range' ? 'You are in range!' : 'You are out of range.'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* QR Code Section */}
          <div className="space-y-2">
            <Label className="text-base flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code Scan
            </Label>
            <Button className="w-full cta-button">
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR Code (Coming Soon)
            </Button>
          </div>

          {/* Session Code Section */}
          <div className="space-y-2">
            <Label htmlFor="sessionCode" className="text-base">Or Enter Session Code</Label>
            <Input
              id="sessionCode"
              placeholder="Enter 6-digit code"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value)}
              maxLength={6}
              className="h-10 text-base"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmitAttendance} 
            disabled={isSubmitting || locationStatus !== 'in-range' || !sessionCode}
            className="cta-button"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Marking...
              </>
            ) : (
              'Mark Attendance'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarkAttendanceModal;
