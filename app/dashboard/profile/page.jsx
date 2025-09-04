'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MobileNav from '@/components/dashboard/MobileNav';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Building, GraduationCap, MapPin } from 'lucide-react'; // Icons

import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter(); // Import useRouter
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    department: "Computer Science",
    level: "400",
    institution: "University of XYZ",
    country: "Nigeria",
  });

  return (
    <>
      <DashboardHeader title="My Profile" />
      <main className="flex-1 container mx-auto px-4 py-8 pt-32 pb-24 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" /> Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                  {/* Placeholder for profile picture display */}
                  <User className="w-full h-full object-cover text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Name</Label>
                <p className="text-lg font-medium">{profileData.name}</p>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <p className="text-lg font-medium">{profileData.department}</p>
              </div>
              <div className="space-y-2">
                <Label>Level</Label>
                <p className="text-lg font-medium">{profileData.level}</p>
              </div>
              <div className="space-y-2">
                <Label>Institution</Label>
                <p className="text-lg font-medium">{profileData.institution}</p>
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <p className="text-lg font-medium">{profileData.country}</p>
              </div>
              <Button onClick={() => router.push('/dashboard/settings?section=account')}>Edit Profile</Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <MobileNav activeTab="profile" />
    </>
  );
}
