"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Chrome } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';
const motion = dynamic(() => import('framer-motion').then(mod => mod.motion), { ssr: false });
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

const AuthLayout = ({ page }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { setUser, setUserRole } = useAppStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let role = 'student'; // Default role
    let userName = 'Test User';

    if (email === 'error@presently.io') {
      setTimeout(() => {
        setIsLoading(false);
        toast.error("Login failed! Invalid credentials.");
      }, 1500);
      return;
    }

    if (email === 'staff@presently.io') {
      role = 'lecturer';
      userName = 'Staff User';
    } else if (email === 'hoc@presently.io') {
      role = 'class-rep';
      userName = 'HOC User';
    } else if (email === 'user@presently.io') {
      role = 'student';
      userName = 'Student User';
    }

    setTimeout(() => {
      setIsLoading(false);
      setUser({ name: userName, email: email });
      setUserRole(role);
      toast.success(`${config.cta} successful! Welcome, ${userName}.`);
      router.push('/dashboard');
    }, 1500);
  };

  const pageConfig = {
    signin: {
      title: "Welcome Back",
      subtitle: "Continue your attendance journey",
      cta: "Sign In",
      altText: "Don't have an account?",
      altLink: "/auth/signup",
      altAction: "Create one"
    },
    signup: {
      title: "Get Started",
      subtitle: "Join thousands of students and lecturers",
      cta: "Create Account",
      altText: "Already have an account?",
      altLink: "/auth/signin",
      altAction: "Sign in here"
    },
    forgotPassword: {
      title: "Reset Password",
      subtitle: "We'll send you a reset link",
      cta: "Send Reset Link",
      altText: "Remember your password?",
      altLink: "/auth/signin",
      altAction: "Sign in"
    }
  };

  const config = pageConfig[page] || pageConfig.signin;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </Button>

        <Card className="glass-card shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold mb-2">{config.title}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {config.subtitle}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {page === 'signup' && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    placeholder="Enter your full name"
                    className="h-12 text-base"
                    required 
                  />
                </motion.div>
              )}

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: page === 'signup' ? 0.2 : 0.1 }}
              >
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="h-12 text-base"
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>

              {page !== 'forgotPassword' && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: page === 'signup' ? 0.3 : 0.2 }}
                >
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    {page === 'signin' && (
                      <Link 
                        href="/auth/forgot-password"
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 text-base pr-12"
                      required 
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  type="submit" 
                  className="w-full h-12 cta-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    config.cta
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-6">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-12 secondary-button group"
            >
              <Chrome className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Google
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              {config.altText}{' '}
              <Link 
                href={config.altLink}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {config.altAction}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthLayout;