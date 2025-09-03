
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, User, Bell, Accessibility, Lock, Mail, Clock, ChevronRight, Globe, Building, GraduationCap, Link, KeyRound, Signature, ArrowLeft } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MobileNav from '@/components/dashboard/MobileNav';
import { cn } from '@/lib/utils';

// Sub-components for settings sections
const AccountSettings = ({ onBack }) => (
  <Card className="w-full">
    <CardHeader className="relative">
      <div className="md:hidden absolute left-2 top-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>
      <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Account Settings</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-muted-foreground">Edit your profile information.</p>
      {/* Profile Edit Form */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Input id="department" defaultValue="Computer Science" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="level">Level</Label>
        <Input id="level" defaultValue="400" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="institution">Institution</Label>
        <Input id="institution" defaultValue="University of XYZ" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input id="country" defaultValue="Nigeria" />
      </div>
      <Button>Save Profile</Button>
      
      <Separator className="my-4" />

      <h3 className="text-lg font-semibold flex items-center gap-2"><Lock className="w-4 h-4" /> Change Password</h3>
      <p className="text-muted-foreground">Update your account password.</p>
      {/* Change Password Form */}
      <div className="space-y-2">
        <Label htmlFor="current-password">Current Password</Label>
        <Input id="current-password" type="password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input id="new-password" type="password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input id="confirm-password" type="password" />
      </div>
      <Button>Change Password</Button>

      <Separator className="my-4" />

      <h3 className="text-lg font-semibold flex items-center gap-2"><Link className="w-4 h-4" /> Integrations</h3>
      <p className="text-muted-foreground">Connect your accounts for seamless experience.</p>
      <Button variant="outline" className="w-full justify-start">
        <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
        Connect Google Account
      </Button>

      <Separator className="my-4" />

      <h3 className="text-lg font-semibold flex items-center gap-2"><Signature className="w-4 h-4" /> Digital Signature</h3>
      <p className="text-muted-foreground">Manage your digital signature for official documents.</p>
      <Button variant="outline" className="w-full justify-start">
        Manage Digital Signature
      </Button>
    </CardContent>
  </Card>
);

const NotificationSettings = ({ onBack }) => (
  <Card className="w-full">
    <CardHeader className="relative">
      <div className="md:hidden absolute left-2 top-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>
      <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" /> Notification Settings</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-muted-foreground">Manage your notification preferences.</p>
      {/* Email Notifications */}
      <h3 className="text-lg font-semibold flex items-center gap-2"><Mail className="w-4 h-4" /> Email Notifications</h3>
      <div className="flex items-center justify-between">
        <Label htmlFor="email-attendance">Attendance Updates</Label>
        <Switch id="email-attendance" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="email-announcements">Announcements</Label>
        <Switch id="email-announcements" />
      </div>

      <Separator className="my-4" />

      {/* Reminders */}
      <h3 className="text-lg font-semibold flex items-center gap-2"><Clock className="w-4 h-4" /> Reminders</h3>
      <div className="flex items-center justify-between">
        <Label htmlFor="reminder-session">Session Start Reminder</Label>
        <Switch id="reminder-session" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="reminder-attendance">Mark Attendance Reminder</Label>
        <Switch id="reminder-attendance" />
      </div>
      <Button>Save Notifications</Button>
    </CardContent>
  </Card>
);

const AccessibilitySettings = ({ onBack }) => (
  <Card className="w-full">
    <CardHeader className="relative">
      <div className="md:hidden absolute left-2 top-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>
      <CardTitle className="flex items-center gap-2"><Accessibility className="w-5 h-5" /> Accessibility</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">Adjust accessibility options (e.g., font size, contrast).</p>
      <p className="text-sm text-muted-foreground mt-4">More accessibility options coming soon!</p>
    </CardContent>
  </Card>
);

const settingsCategories = [
  { id: 'account', label: 'Account', icon: <User className="w-5 h-5" />, component: AccountSettings },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" />, component: NotificationSettings },
  { id: 'accessibility', label: 'Accessibility', icon: <Accessibility className="w-5 h-5" />, component: AccessibilitySettings },
];

const SettingsPage = () => {
  const [activeCategory, setActiveCategory] = useState('account'); // Default active category
  const [showMobileCategoryContent, setShowMobileCategoryContent] = useState(false);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setShowMobileCategoryContent(true);
  };

  const handleBackToCategories = () => {
    setShowMobileCategoryContent(false);
  };

  const ActiveComponent = settingsCategories.find(cat => cat.id === activeCategory)?.component;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader title="Settings" />

      <main className="flex-1 container mx-auto px-4 py-8 pt-24 pb-24 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Mobile View: List of buttons */}
          <div className={cn("md:hidden space-y-4", showMobileCategoryContent ? "hidden" : "block")}>
            {settingsCategories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="w-full justify-start py-6 text-lg"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.icon} <span className="ml-3">{category.label}</span>
                <ChevronRight className="w-5 h-5 ml-auto" />
              </Button>
            ))}
          </div>

          {/* Mobile View: Category Content */}
          <div className={cn("md:hidden", showMobileCategoryContent ? "block" : "hidden")}>
            {ActiveComponent && <ActiveComponent onBack={handleBackToCategories} />}
          </div>

          {/* Desktop View: Two-column layout */}
          <div className="hidden md:flex gap-8">
            {/* Sidebar for navigation */}
            <Card className="w-64 flex-shrink-0">
              <CardHeader>
                <CardTitle className="text-xl">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {settingsCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "ghost"}
                    className={cn("w-full justify-start", activeCategory === category.id && "cta-button")}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.icon} <span className="ml-2">{category.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Content area */}
            <div className="flex-1">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>
        </motion.div>
      </main>

      <MobileNav activeTab="settings" />
    </div>
  );
};

export default SettingsPage;
