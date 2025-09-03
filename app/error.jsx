
'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Frown className="w-24 h-24 text-primary mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-lg text-muted-foreground mb-8">
          We apologize for the inconvenience. Please try again later.
        </p>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="cta-button"
        >
          Try again
        </Button>
      </motion.div>
    </div>
  );
}
