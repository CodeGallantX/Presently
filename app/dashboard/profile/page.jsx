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

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    department: "Computer Science",
    level: "400",
    institution: "University of XYZ",
    country: "Nigeria",
  });
  const [profilePicture, setProfilePicture] = useState("/user-placeholder.png"); // Placeholder image

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would send this data to a backend API
    console.log("Profile saved:", profileData);
  };

  return (
    <>
      <DashboardHeader title="My Profile" />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 pb-24 md:pb-8">
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
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <label
                      htmlFor="profile-picture-upload"
                      className="absolute inset-0 flex items-center justify-center bg-black/50 text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <User className="w-6 h-6" />
                    </label>
                  )}
                </div>
                {isEditing && (
                  <Input
                    id="profile-picture-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePictureChange}
                    className="hidden"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={profileData.department}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  value={profileData.level}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={profileData.institution}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={profileData.country}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              {isEditing ? (
                <Button onClick={handleSave}>Save Profile</Button>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <MobileNav activeTab="profile" />
    </>
  );
}
