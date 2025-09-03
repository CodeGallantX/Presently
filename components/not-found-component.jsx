
'use client';

import { useRouter } from 'next/navigation';
import { Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-6">
      <div className="text-center">
        <Ghost className="w-24 h-24 text-primary mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <Button onClick={() => router.back()} className="cta-button">
          Go back
        </Button>
      </div>
    </div>
  );
}
