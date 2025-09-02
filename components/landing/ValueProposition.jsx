'use client';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { sectionVariants } from '@/lib/animations';

const ValueProposition = () => {
  return (
    <motion.section
      className="py-20 px-4 md:px-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Presently?</h2>
          <p className="text-lg text-gray-600 mt-2">The clear choice for modern attendance management.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* For Students */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">For Students</CardTitle>
            </CardHeader>
            <CardDescription>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /><span>No more signing paper sheets.</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /><span>Transparent and accessible attendance records.</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /><span>Motivational insights to stay on track.</span></li>
              </ul>
            </CardDescription>
          </Card>

          {/* For Lecturers */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">For Lecturers</CardTitle>
            </CardHeader>
            <CardDescription>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /><span>Eliminate hours of administrative paperwork.</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /><span>Instant validation of student presence.</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /><span>Maintain fair and accurate records effortlessly.</span></li>
              </ul>
            </CardDescription>
          </Card>

          {/* For Institutions */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">For Institutions</CardTitle>
            </CardHeader>
            <CardDescription>
              <ul className="space-y-3">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /><span>Boost student discipline and punctuality.</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /><span>Curb attendance malpractice effectively.</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" /><span>Reliable data for accreditation and decisions.</span></li>
              </ul>
            </CardDescription>
          </Card>
        </div>
      </div>
    </motion.section>
  );
};

export default ValueProposition;
