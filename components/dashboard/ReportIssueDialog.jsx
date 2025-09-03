'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Assuming a textarea component exists
import { Mail, MessageSquare, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ReportIssueDialog = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !description) {
      toast.error('Please fill in both subject and description.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log({
        subject,
        description,
        contactEmail,
      });
      toast.success('Thank you! Your report has been sent. We'll look into it shortly.');
      setIsSubmitting(false);
      onClose();
      setSubject('');
      setDescription('');
      setContactEmail('');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Report an Issue</DialogTitle>
          <DialogDescription>
            We're here to help! Please describe the issue you're facing.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="Brief summary of the issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Your Email (Optional)
            </Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="email@example.com (if you'd like a response)"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>

          <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm">
            <p className="font-semibold mb-2">Your feedback is invaluable!</p>
            <p>We genuinely appreciate you taking the time to report this. Our team is constantly monitoring these reports, and we promise to look into every single one. Your email won't be missed!</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="cta-button">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Report
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportIssueDialog;
