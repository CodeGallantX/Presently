'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Presently transformed how we handle attendance. No more paper sheets, no more confusion. Just simple, reliable tracking.",
    name: "Dr. Sarah Johnson",
    role: "Mathematics Professor",
    university: "University of Lagos",
    rating: 5,
    avatar: "SJ"
  },
  {
    quote: "As a student, I love how easy it is to mark attendance. The GPS verification gives me confidence that my attendance is accurately recorded.",
    name: "Alex Okafor",
    role: "Computer Science Student",
    university: "Covenant University",
    rating: 5,
    avatar: "AO"
  },
  {
    quote: "The real-time dashboard is incredible. I can see exactly who's present and get instant insights into attendance patterns.",
    name: "Prof. Michael Chen",
    role: "Physics Department Head",
    university: "University of Ibadan",
    rating: 5,
    avatar: "MC"
  },
  {
    quote: "Being a class rep is so much easier now. I can export reports instantly and help coordinate with both students and lecturers.",
    name: "Fatima Abdul",
    role: "Class Representative",
    university: "Ahmadu Bello University",
    rating: 5,
    avatar: "FA"
  },
  {
    quote: "The analytics help me understand attendance trends and identify students who might need extra support. It's been a game-changer.",
    name: "Dr. Adaora Nwosu",
    role: "Biology Lecturer",
    university: "University of Nigeria",
    rating: 5,
    avatar: "AN"
  },
  {
    quote: "Finally, an attendance system that actually works! The mobile interface is intuitive and the GPS verification prevents any cheating.",
    name: "David Adeleke",
    role: "Engineering Student",
    university: "Obafemi Awolowo University",
    rating: 5,
    avatar: "DA"
  }
];

const Testimonials = ({ setActiveSection }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('testimonials');
    }
  }, [isInView, setActiveSection]);

  return (
    <section ref={ref} id="testimonials" className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">
            Loved by
            <span className="text-primary"> Thousands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what students, lecturers, and institutions are saying about Presently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="feature-card h-full group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                    <p className="text-base leading-relaxed italic pl-6">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-primary">{testimonial.university}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6">Trusted by leading institutions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {[
                'University of Lagos',
                'Covenant University', 
                'University of Ibadan',
                'Ahmadu Bello University'
              ].map((uni, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-xs font-bold">{uni.split(' ').map(w => w[0]).join('')}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{uni}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;