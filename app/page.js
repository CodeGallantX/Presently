'use client';
import { useState } from 'react';
import { motion } from "framer-motion";
import Hero from "@/components/landing/Hero";
import KeyFeatures from "@/components/landing/KeyFeatures";
import HowItWorks from "@/components/landing/HowItWorks";
import ValueProposition from "@/components/landing/ValueProposition";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import Faq from "@/components/landing/Faq";
import PwaInstallSection from "@/components/landing/PwaInstallSection";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header activeSection={activeSection} />
      <Hero setActiveSection={setActiveSection} />
      <KeyFeatures setActiveSection={setActiveSection} />
      <HowItWorks setActiveSection={setActiveSection} />
      <ValueProposition setActiveSection={setActiveSection} />
      <Testimonials setActiveSection={setActiveSection} />
      <Pricing setActiveSection={setActiveSection} />
      <Faq setActiveSection={setActiveSection} />
      <PwaInstallSection />
      <Footer />
    </motion.main>
  );
};

export default App;