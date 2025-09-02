'use client';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sectionVariants } from '@/lib/animations';

const faqs = [
  {
    question: "What if my GPS is off?",
    answer: "For GPS-verified attendance, your location services must be enabled. The app will prompt you to turn it on if it's off. For non-GPS based methods, this is not an issue.",
  },
  {
    question: "Can attendance be faked?",
    answer: "We use a combination of GPS data, timetable integration, and smart rules to minimize the possibility of malpractice. While no system is foolproof, our multi-layered approach makes it very difficult to fake attendance.",
  },
  {
    question: "Does Presently work offline?",
    answer: "Currently, an active internet connection is required to mark attendance and access real-time dashboards. We are exploring offline capabilities for future updates.",
  },
  {
    question: "What devices are supported?",
    answer: "Presently is a web-based application that works on any modern browser on your smartphone, tablet, or computer. There is no need to download a separate app.",
  },
];

const Faq = () => {
  return (
    <motion.section
      className="py-20 px-4 md:px-12 bg-gray-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};

export default Faq;
