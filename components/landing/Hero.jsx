'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Play, Sparkles, Zap } from "lucide-react";

const Hero = ({ setActiveSection }) => {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('hero');
    }
  }, [isInView, setActiveSection]);

  return (
    <motion.div
      ref={ref}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Trusted by 10,000+ students & lecturers
          </div>
        </motion.div>

        <motion.h1
          className="hero-title mb-6 gold-text-gradient"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Attendance Made
          <br />
          <span className="text-primary">Effortless</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          GPS-verified attendance tracking with real-time dashboards. 
          No more paper sheets, no more confusion.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button 
            onClick={() => router.push('/auth/signup')} 
            className="cta-button group"
          >
            <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Start Free Trial
          </Button>
          <Button 
            variant="outline" 
            className="secondary-button group"
          >
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">Live Session Active</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Present</span>
                    <span className="text-primary font-bold">24/30</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-4/5 transition-all duration-500" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <p className="text-muted-foreground">Real-time attendance tracking</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;