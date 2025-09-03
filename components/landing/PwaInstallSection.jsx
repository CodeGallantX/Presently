'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Smartphone, Apple, Android, Share2, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const PwaInstallSection = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallDialogOpen, setIsInstallDialogOpen] = useState(false);
  const [isIosInstructionsOpen, setIsIosInstructionsOpen] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Detect iOS
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallDialogOpen(true); // Show install dialog when prompt is available
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setIsInstallDialogOpen(false);
    }
  };

  const handleIosInstallClick = () => {
    setIsIosInstructionsOpen(true);
  };

  return (
    <section id="install-app" className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">
            Install Presently
            <span className="text-primary"> on Your Device</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Get the full app experience directly from your home screen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Mockups Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center relative"
          >
            <div className="relative w-64 h-96 bg-gray-800 rounded-3xl shadow-xl flex items-center justify-center overflow-hidden">
              {/* Phone Bezel */}
              <div className="absolute inset-0 border-8 border-gray-900 rounded-3xl z-10"></div>
              {/* Screen Content Placeholder */}
              <div className="w-[calc(100%-16px)] h-[calc(100%-16px)] bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-sm p-4">
                <div className="text-center space-y-2">
                  <Smartphone className="w-10 h-10 mx-auto" />
                  <p className="font-semibold">Your App Here</p>
                  <p className="text-xs opacity-80">Seamless Experience</p>
                </div>
              </div>
              {/* Notch/Camera */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-lg z-20"></div>
            </div>
          </motion.div>

          {/* Install Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 text-left"
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Android className="w-5 h-5" />
                  Install for Android
                </CardTitle>
                <CardDescription>Add Presently to your Android home screen for quick access.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleInstallClick}
                  disabled={!deferredPrompt}
                  className="cta-button w-full"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Install App (Android)
                </Button>
                {!deferredPrompt && (
                  <p className="text-sm text-muted-foreground mt-2">Open in Chrome or Edge to see install prompt.</p>
                )}
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5" />
                  Install for iOS
                </CardTitle>
                <CardDescription>Follow these steps to add Presently to your iPhone/iPad home screen.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleIosInstallClick}
                  className="secondary-button w-full"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Add to Home Screen (iOS)
                </Button>
                {!isIos && (
                  <p className="text-sm text-muted-foreground mt-2">This feature is for iOS devices only.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Android Install Dialog */}
      <Dialog open={isInstallDialogOpen} onOpenChange={setIsInstallDialogOpen}>
        <DialogContent className="sm:max-w-[425px] text-center">
          <DialogHeader>
            <DialogTitle>Install Presently</DialogTitle>
            <DialogDescription>Add Presently to your home screen for a faster experience.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <Smartphone className="w-16 h-16 text-primary" />
            <p className="text-lg font-semibold">Ready to install?</p>
            <p className="text-muted-foreground">Click the button below to add Presently to your device.</p>
          </div>
          <Button onClick={handleInstallClick} className="cta-button w-full">
            Install App
          </Button>
        </DialogContent>
      </Dialog>

      {/* iOS Instructions Dialog */}
      <Dialog open={isIosInstructionsOpen} onOpenChange={setIsIosInstructionsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add to Home Screen (iOS)</DialogTitle>
            <DialogDescription>Follow these steps on your iPhone or iPad:</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[300px] pr-4">
            <ol className="list-decimal list-inside space-y-4 text-left text-muted-foreground">
              <li>Tap the <Share2 className="inline-block w-4 h-4 mx-1" /> **Share** button at the bottom of your browser.</li>
              <li>Scroll down and tap **Add to Home Screen** <PlusCircle className="inline-block w-4 h-4 mx-1" />.</li>
              <li>Tap **Add** in the top right corner.</li>
              <li>Presently will now appear on your home screen!</li>
            </ol>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PwaInstallSection;
