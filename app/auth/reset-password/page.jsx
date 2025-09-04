
'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const motion = dynamic(() => import('framer-motion').then(mod => mod.motion), { ssr: false });
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { useToast } from "@/components/ui/use-toast";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match!", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    // Simulate password reset
    setTimeout(() => {
      toast({ title: "Success", description: "Password reset successfully! (Simulated)" });
      setIsLoading(false);
      // Redirect to sign-in page or dashboard
    }, 2000);
  };

  return (
    <AuthLayout page="reset-password">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
            <CardDescription>Enter your new password below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full cta-button" disabled={isLoading}>
                {isLoading ? (
                  <> 
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Remembered your password? <Link href="/auth/signin" className="text-primary hover:underline">Sign In</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
