'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Calendar, LayoutDashboard, ShieldCheck, FileDown, Smile } from "lucide-react";
import { sectionVariants } from '@/lib/animations';

const features = [
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "GPS-Verified Check-ins",
    description: "Students can only mark attendance within class range.",
  },
  {
    icon: <Calendar className="w-8 h-8 text-primary" />,
    title: "Timetable Integration",
    description: "Attendance only works during valid class schedules.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
    title: "Real-Time Dashboards",
    description: "Lecturers see who’s present instantly.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Smart Attendance Rules",
    description: "Auto-nullify sessions if below threshold (e.g., <10%).",
  },
  {
    icon: <FileDown className="w-8 h-8 text-primary" />,
    title: "Export & Reports",
    description: "One-click PDF, Excel, CSV exports.",
  },
  {
    icon: <Smile className="w-8 h-8 text-primary" />,
    title: "Motivational Feedback",
    description: "Students get fun/motivational messages tied to attendance scores.",
  },
];

const KeyFeatures = ({ setActiveSection }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('features');
    }
  }, [isInView, setActiveSection]);

  return (
    <motion.section
      ref={ref}
      id="features"
      className="py-20 px-4 md:px-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
          <p className="text-lg text-gray-600 mt-2">Everything you need for a seamless attendance experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-primary/10 p-3 rounded-full">{feature.icon}</div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardDescription>{feature.description}</CardDescription>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default KeyFeatures;
