'use client';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does GPS verification work?",
    answer: "Our GPS verification ensures students are physically present within a defined radius of the classroom. The system uses precise location data to confirm attendance, making it nearly impossible to mark attendance from outside the designated area.",
  },
  {
    question: "What if my GPS is turned off or inaccurate?",
    answer: "If GPS is unavailable, students can use QR code scanning as an alternative. For GPS accuracy issues, our system has built-in tolerance levels and fallback verification methods to ensure legitimate attendance is never missed.",
  },
  {
    question: "Can attendance be faked or manipulated?",
    answer: "We use multiple layers of security including GPS verification, time-based validation, timetable integration, and behavioral analysis to prevent fraud. Our smart algorithms can detect and flag suspicious attendance patterns.",
  },
  {
    question: "Does Presently work offline?",
    answer: "Currently, an active internet connection is required for real-time verification and dashboard updates. However, we're developing offline capabilities that will sync data once connectivity is restored.",
  },
  {
    question: "What devices and platforms are supported?",
    answer: "Presently is a web-based application that works on any modern browser across smartphones, tablets, and computers. No app downloads required - just visit our website and start using it immediately.",
  },
  {
    question: "How do you ensure student privacy?",
    answer: "We take privacy seriously. Location data is only used for attendance verification and is not stored permanently. All personal information is encrypted and we comply with international data protection standards.",
  },
  {
    question: "Can I integrate Presently with existing school systems?",
    answer: "Yes! We offer API integrations and can work with your existing student information systems, learning management platforms, and administrative tools. Contact our team for custom integration options.",
  },
  {
    question: "What kind of support do you provide?",
    answer: "We provide comprehensive support including onboarding assistance, training materials, live chat support, and dedicated account management for institutional clients. Our team is here to ensure your success.",
  }
];

const Faq = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="section-title mb-4">
            Frequently Asked
            <span className="text-primary"> Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Presently and how it works.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-8 rounded-2xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border-border">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help. Get in touch and we'll answer any questions you have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="cta-button">
                Contact Support
              </Button>
              <Button variant="outline" className="secondary-button">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;