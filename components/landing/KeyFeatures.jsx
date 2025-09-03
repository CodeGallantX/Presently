'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MapPin, Calendar, LayoutDashboard, ShieldCheck, FileDown, Smile, Zap, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "GPS-Verified Check-ins",
    description: "Location-based attendance ensures students are physically present in class.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Smart Scheduling",
    description: "Integrated timetables ensure attendance only works during valid class hours.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20"
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Real-Time Dashboards",
    description: "Live attendance tracking with instant updates and beautiful visualizations.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Anti-Fraud Protection",
    description: "Smart rules and validation prevent attendance manipulation and ensure accuracy.",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20"
  },
  {
    icon: <FileDown className="w-6 h-6" />,
    title: "One-Click Exports",
    description: "Generate professional reports in PDF, Excel, or CSV format instantly.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Smart Analytics",
    description: "Detailed insights and trends to help improve attendance and engagement.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20"
  },
];

const KeyFeatures = ({ setActiveSection }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('features');
    }
  }, [isInView, setActiveSection]);

  return (
    <section ref={ref} id="features" className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">
            Powerful Features for
            <span className="text-primary"> Modern Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to streamline attendance management and boost engagement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={cn(
                "feature-card group h-full",
                feature.borderColor
              )}>
                <CardHeader className="space-y-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                    feature.bgColor,
                    feature.color
                  )}>
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { number: "99.9%", label: "Accuracy Rate", icon: <ShieldCheck className="w-6 h-6" /> },
            { number: "10K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
            { number: "5min", label: "Setup Time", icon: <Zap className="w-6 h-6" /> },
          ].map((stat, index) => (
            <div key={index} className="stat-card text-center group">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;