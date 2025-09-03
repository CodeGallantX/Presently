'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Shield, TrendingUp, Clock, Users } from "lucide-react";

const benefits = [
  {
    category: "For Students",
    icon: <Users className="w-6 h-6" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    items: [
      { icon: <CheckCircle className="w-5 h-5" />, text: "No more signing paper sheets or waiting in lines" },
      { icon: <Shield className="w-5 h-5" />, text: "Transparent, tamper-proof attendance records" },
      { icon: <Zap className="w-5 h-5" />, text: "Quick check-in with QR codes or GPS" },
      { icon: <TrendingUp className="w-5 h-5" />, text: "Track your progress with beautiful analytics" }
    ]
  },
  {
    category: "For Lecturers",
    icon: <Zap className="w-6 h-6" />,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    items: [
      { icon: <Clock className="w-5 h-5" />, text: "Save hours of administrative work every week" },
      { icon: <TrendingUp className="w-5 h-5" />, text: "Real-time insights into student engagement" },
      { icon: <Shield className="w-5 h-5" />, text: "Eliminate attendance fraud and disputes" },
      { icon: <CheckCircle className="w-5 h-5" />, text: "Professional reports generated instantly" }
    ]
  },
  {
    category: "For Institutions",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    items: [
      { icon: <TrendingUp className="w-5 h-5" />, text: "Improve overall student discipline and punctuality" },
      { icon: <Shield className="w-5 h-5" />, text: "Comprehensive data for accreditation requirements" },
      { icon: <Users className="w-5 h-5" />, text: "Department-wide analytics and insights" },
      { icon: <Zap className="w-5 h-5" />, text: "Streamlined operations across all departments" }
    ]
  }
];

const ValueProposition = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">
            Why Choose
            <span className="text-primary"> Presently?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed specifically for the unique needs of African educational institutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className={cn(
                "feature-card h-full group",
                benefit.borderColor
              )}>
                <CardHeader className="text-center pb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110",
                    benefit.bgColor,
                    benefit.color
                  )}>
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {benefit.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {benefit.items.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.2) + (i * 0.1) }}
                      >
                        <div className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <span className="text-sm leading-relaxed">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="glass-card p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Institution?</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Join the attendance revolution. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="cta-button">
                Start Free Trial
              </Button>
              <Button variant="outline" className="secondary-button">
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;