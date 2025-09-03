
import Link from 'next/link';
import { Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
const motion = dynamic(() => import('framer-motion').then(mod => mod.motion), { ssr: false });

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Frown className="w-24 h-24 text-primary mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <Button asChild className="cta-button">
          <Link href="/">Go back home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
