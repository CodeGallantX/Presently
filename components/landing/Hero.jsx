'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { sectionVariants } from '@/lib/animations';

const Hero = ({ setActiveSection }) => {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('hero');
    }
  }, [isInView, setActiveSection]);

  return (
    <motion.div
      ref={ref}
      id="hero"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <section className="flex flex-col items-center justify-center text-center py-8 px-24 space-y-6 w-full mt-20">
        <h1 className="text-4xl md:text-6xl font-bold">Attendance Made Simple, Smart, and Reliable.</h1>
        <h2 className="text-lg md:text-2xl text-gray-600">Digitally verified attendance for students and lecturers, powered by GPS and real-time dashboards.</h2>
        <div className="flex items-center space-x-3">
          <Button onClick={() => router.push('/auth/signup')} className="py-6 px-8">Get Started</Button>
          <Button variant="outline" className="py-6 px-8">Request Demo</Button>
        </div>
        <div className="mt-8">
          {/* Placeholder for visual */}
          <div className="w-full max-w-4xl h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">[Mockup of student marking attendance on phone + lecturer viewing dashboard]</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Hero;
