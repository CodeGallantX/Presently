'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { sectionVariants } from '@/lib/animations';

const testimonials = [
  {
    quote: "Now I never worry if my attendance was marked correctly.",
    name: "Alex Johnson",
    role: "Student",
  },
  {
    quote: "Real-time sheets save me hours of admin work every week.",
    name: "Dr. Maria Rodriguez",
    role: "Lecturer",
  },
  {
    quote: "Attendance reporting is now seamless across our departments.",
    name: "Mr. David Chen",
    role: "Head of Department",
  },
];

const Testimonials = ({ setActiveSection }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActiveSection('testimonials');
    }
  }, [isInView, setActiveSection]);

  return (
    <motion.section
      ref={ref}
      id="testimonials"
      className="py-20 px-4 md:px-12 bg-gray-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Loved by Users Worldwide</h2>
          <p className="text-lg text-gray-600 mt-2">Don't just take our word for it. Here's what people are saying.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <p className="text-lg italic">"{testimonial.quote}"</p>
                <p className="text-right mt-4 font-semibold">- {testimonial.name}, {testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
