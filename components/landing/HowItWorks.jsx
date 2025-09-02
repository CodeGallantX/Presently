'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { sectionVariants } from '@/lib/animations';

const HowItWorks = () => {
  return (
    <motion.section
      className="py-20 px-4 md:px-12 bg-gray-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-lg text-gray-600 mt-2">A simple, streamlined process for everyone.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* For Students */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">For Students</CardTitle>
            </CardHeader>
            <CardDescription>
              <ul className="list-disc list-inside space-y-2">
                <li>Sign up and create your profile.</li>
                <li>Verify your identity.</li>
                <li>Mark attendance in class with a single tap.</li>
                <li>Track your attendance progress.</li>
              </ul>
            </CardDescription>
          </Card>

          {/* For Lecturers */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">For Lecturers</CardTitle>
            </CardHeader>
            <CardDescription>
              <ul className="list-disc list-inside space-y-2">
                <li>Create your courses and set schedules.</li>
                <li>Monitor attendance live from your dashboard.</li>
                <li>Export detailed attendance reports.</li>
              </ul>
            </CardDescription>
          </Card>

          {/* For Institutions */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">For Institutions</CardTitle>
            </CardHeader>
            <CardDescription>
              <ul className="list-disc list-inside space-y-2">
                <li>Manage departments and user roles.</li>
                <li>Oversee attendance compliance across the institution.</li>
                <li>Generate insightful analytics for decision-making.</li>
              </ul>
            </CardDescription>
          </Card>
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
