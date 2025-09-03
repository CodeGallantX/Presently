'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
const motion = dynamic(() => import('framer-motion').then(mod => mod.motion), { ssr: false });
const useInView = dynamic(() => import('framer-motion').then(mod => mod.useInView), { ssr: false });
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserPlus, QrCode, BarChart3, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: "Sign Up & Choose Role",
    description: "Create your account and select whether you're a student, lecturer, or class representative.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    step: "01"
  },
  {
    icon: <QrCode className="w-8 h-8" />,
    title: "Mark or Track Attendance",
    description: "Students scan QR codes or use GPS. Lecturers create sessions and monitor in real-time.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    step: "02"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "View Analytics",
    description: "Access detailed insights, trends, and attendance patterns through beautiful dashboards.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    step: "03"
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: "Export & Share",
    description: "Generate professional reports in PDF, Excel, or CSV format with one click.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    step: "04"
  }
];

const HowItWorks = ({ setActiveSection }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('how-it-works');
    }
  }, [isInView, setActiveSection]);

  return (
    <section ref={ref} id="how-it-works" className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">
            How It
            <span className="text-primary"> Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple, intuitive process designed for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <Card className="feature-card h-full group">
                <CardHeader className="text-center">
                  <div className="relative mb-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110",
                      step.bgColor,
                      step.color
                    )}>
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Arrow connector - Desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                  <ArrowRight className="w-6 h-6 text-primary/50" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of students and lecturers who have made attendance effortless.
            </p>
            <Button className="cta-button">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;