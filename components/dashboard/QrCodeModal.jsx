'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const QrCodeModal = ({ isOpen, onClose, qrCodeUrl, sessionCode }) => {
  const { toast } = useToast();
  const handleDownload = () => {
    toast({ title: "Download", description: "Simulating QR code download." });
    // In a real app, you'd initiate a file download here
  };

  const handleShare = () => {
    toast({ title: "Share", description: "Simulating QR code share." });
    // In a real app, you'd use the Web Share API or similar
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-[425px] p-6 text-center overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Session QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code or use the session code below to mark attendance.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 flex flex-col items-center">
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 border border-border rounded-lg p-2" />
          ) : (
            <div className="w-48 h-48 bg-muted flex items-center justify-center rounded-lg text-muted-foreground">
              No QR Code Available
            </div>
          )}
          {sessionCode && (
            <div className="mt-4 text-lg font-semibold">Session Code: <span className="text-primary">{sessionCode}</span></div>
          )}
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={handleDownload} className="secondary-button">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleShare} className="cta-button">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeModal;
