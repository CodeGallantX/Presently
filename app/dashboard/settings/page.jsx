'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Accessibility, 
  Lock, 
  Mail, 
  Clock, 
  ChevronRight, 
  Globe, 
  Building, 
  GraduationCap, 
  Link, 
  KeyRound, 
  Signature, 
  ArrowLeft, 
  Palette, 
  Text, 
  Contrast, 
  Languages, 
  Shield, 
  Fingerprint, 
  DownloadCloud, 
  LayoutDashboard, 
  Clock as ClockIcon, 
  HelpCircle, 
  LifeBuoy, 
  FileText, 
  LogOut,
  MapPin
} from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MobileNav from '@/components/dashboard/MobileNav';
import { useAppStore } from '@/lib/store'; // Adjust the import path as needed
import { cn } from '@/lib/utils';
import ReportIssueDialog from '@/components/dashboard/ReportIssueDialog';

// Sub-components for settings sections
const AccountSettings = ({ onBack }) => (
  <Card className="w-full">
    <CardHeader className="relative">
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

      {/* In-App Notifications */}
      <h3 className="text-lg font-semibold flex items-center gap-2"><Bell className="w-4 h-4" /> In-App Notifications</h3>
      <div className="flex items-center justify-between">
        <Label htmlFor="inapp-popups">Sonner Popups</Label>
        <Switch id="inapp-popups" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="inapp-alerts">Dashboard Alerts</Label>
        <Switch id="inapp-alerts" defaultChecked />
      </div>

      <Separator className="my-4" />

      {/* Push Notifications */}
      <h3 className="text-lg font-semibold flex items-center gap-2"><Clock className="w-4 h-4" /> Push Notifications</h3>
      <div className="flex items-center justify-between">
        <Label htmlFor="push-notifications">Enable Push Notifications</Label>
        <Switch id="push-notifications" />
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

const AppearanceAccessibilitySettings = ({ onBack }) => {
  const { theme, setTheme } = useTheme();
  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5" /> Appearance & Accessibility</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">Customize the look and feel of the app.</p>
        {/* Theme */}
        <h3 className="text-lg font-semibold flex items-center gap-2"><Palette className="w-4 h-4" /> Theme</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="theme-toggle">Dark Mode</Label>
          <Switch
            id="theme-toggle"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>

        <Separator className="my-4" />

        {/* Text Size */}
        <h3 className="text-lg font-semibold flex items-center gap-2"><Text className="w-4 h-4" /> Text Size</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="text-size">Large Text</Label>
          <Switch id="text-size" />
        </div>

        <Separator className="my-4" />

        {/* High Contrast Mode */}
        <h3 className="text-lg font-semibold flex items-center gap-2"><Contrast className="w-4 h-4" /> High Contrast Mode</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="high-contrast">Enable High Contrast</Label>
          <Switch id="high-contrast" />
        </div>

        <Separator className="my-4" />

        {/* Language Preference */}
        <h3 className="text-lg font-semibold flex items-center gap-2"><Languages className="w-4 h-4" /> Language Preference</h3>
        <Select defaultValue="english">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
          </SelectContent>
        </Select>
        <Button>Save Appearance</Button>
      </CardContent>
    </Card>
  );
};

const PrivacySecuritySettings = ({ onBack }) => {
  const { locationAccessGranted, setLocationAccessGranted } = useAppStore();
  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" /> Privacy & Security</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">Manage your privacy and security settings.</p>
        {/* Manage Login Devices */}
        <h3 className="text-lg font-semibold flex items-center gap-2"><Fingerprint className="w-4 h-4" /> Manage Login Devices</h3>
        <p className="text-muted-foreground">View and manage devices logged into your account.</p>
        <Button variant="outline" className="w-full justify-start">View Active Sessions</Button>

        <Separator className="my-4" />

        {/* 2FA */}
        <h3 className="text-lg font-semibold flex items-center gap-2"><Lock className="w-4 h-4" /> Two-Factor Authentication (2FA)</h3>
        <p className="text-muted-foreground">Add an extra layer of security to your account.</p>
        <Button variant="outline" className="w-full justify-start">Enable 2FA (Coming Soon)</Button>

        <Separator className="my-4" />

        {/* Location Permissions */}
        <h3 className="text-lg font-semibold flex items-center gap-2"><MapPin className="w-4 h-4" /> Location Permissions</h3>
        <p className="text-muted-foreground">Control app access to your device's location.</p>
        <div className="flex items-center justify-between">
          <Label htmlFor="location-permissions">Enable Location Access</Label>
          <Switch
            id="location-permissions"
            checked={locationAccessGranted}
            onCheckedChange={setLocationAccessGranted}
          />
        </div>

        <Separator className="my-4" />

        {/* Data Download/Export */}
        <h3 className="text-lg font-semibold flex items-center gap-2"><DownloadCloud className="w-4 h-4" /> Data & Export</h3>
        <p className="text-muted-foreground">Download your personal data or export attendance records.</p>
        <Button variant="outline" className="w-full justify-start">Request Data Export</Button>
        <Button>Save Privacy Settings</Button>
      </CardContent>
    </Card>
  );
};

const AppPreferencesSettings = ({ onBack }) => (
  <Card className="w-full">
    <CardHeader className="relative">
      <CardTitle className="flex items-center gap-2"><LayoutDashboard className="w-5 h-5" /> App Preferences</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-muted-foreground">Configure how the app behaves.</p>
      {/* Default Dashboard View */}
      <h3 className="text-lg font-semibold flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Default Dashboard View</h3>
      <Select defaultValue="attendance">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select default view" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="attendance">Attendance</SelectItem>
          <SelectItem value="analytics">Analytics</SelectItem>
          <SelectItem value="courses">Courses</SelectItem>
        </SelectContent>
      </Select>

      <Separator className="my-4" />

      {/* Time Format */}
      <h3 className="text-lg font-semibold flex items-center gap-2"><ClockIcon className="w-4 h-4" /> Time Format</h3>
      <Select defaultValue="12h">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select time format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
          <SelectItem value="24h">24-hour</SelectItem>
        </SelectContent>
      </Select>

      <Separator className="my-4" />

      {/* Attendance Reminders */}
      <h3 className="text-lg font-semibold flex items-center gap-2"><Bell className="w-4 h-4" /> Attendance Reminders</h3>
      <div className="flex items-center justify-between">
        <Label htmlFor="remind-before-class">Before Class</Label>
        <Switch id="remind-before-class" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="remind-daily">Daily Summary</Label>
        <Switch id="remind-daily" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="remind-weekly">Weekly Report</Label>
        <Switch id="remind-weekly" />
      </div>
      <Button>Save Preferences</Button>
    </CardContent>
  </Card>
);

const HelpSupportSettings = ({ onBack, setIsReportIssueDialogOpen }) => (
  <Card className="w-full">
    <CardHeader className="relative">
      <CardTitle className="flex items-center gap-2"><HelpCircle className="w-5 h-5" /> Help & Support</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-muted-foreground">Find answers to common questions or contact our support team.</p>
      {/* FAQs */}
      <h3 className="text-lg font-semibold flex items-center gap-2"><HelpCircle className="w-4 h-4" /> Frequently Asked Questions</h3>
      <Button variant="outline" className="w-full justify-start">View FAQs</Button>

      <Separator className="my-4" />

      {/* Contact Support */}
      <h3 className="text-lg font-semibold flex items-center gap-2"><LifeBuoy className="w-4 h-4" /> Contact Support</h3>
      <Button variant="outline" className="w-full justify-start" onClick={() => setIsReportIssueDialogOpen(true)}>Report an Issue</Button>
      <Button variant="outline" className="w-full justify-start">Chat with Support</Button>

      <Separator className="my-4" />

      {/* Legal */}
      <h3 className="text-lg font-semibold flex items-center gap-2"><FileText className="w-4 h-4" /> Legal</h3>
      <Button variant="outline" className="w-full justify-start">Terms & Conditions</Button>
      <Button variant="outline" className="w-full justify-start">Privacy Policy</Button>
    </CardContent>
  </Card>
);

const settingsCategories = [
  { id: 'account', label: 'Account', icon: <User className="w-5 h-5" />, component: AccountSettings },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" />, component: NotificationSettings },
  { id: 'appearance', label: 'Appearance & Accessibility', icon: <Palette className="w-5 h-5" />, component: AppearanceAccessibilitySettings },
  { id: 'privacy', label: 'Privacy & Security', icon: <Shield className="w-5 h-5" />, component: PrivacySecuritySettings },
  { id: 'preferences', label: 'App Preferences', icon: <LayoutDashboard className="w-5 h-5" />, component: AppPreferencesSettings },
  { id: 'help', label: 'Help & Support', icon: <HelpCircle className="w-5 h-5" />, component: (props) => <HelpSupportSettings {...props} /> },
];

const SettingsPage = () => {
  const [activeCategory, setActiveCategory] = useState('account'); // Default active category
  const [showMobileCategoryContent, setShowMobileCategoryContent] = useState(false);
  const [isReportIssueDialogOpen, setIsReportIssueDialogOpen] = useState(false);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setShowMobileCategoryContent(true);
  };

  const { logout } = useAppStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/signin');
  };

  const handleBackToCategories = () => {
    setShowMobileCategoryContent(false);
  };

  const ActiveComponent = settingsCategories.find(cat => cat.id === activeCategory)?.component;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader title="Settings" showBackButton={showMobileCategoryContent} onBackClick={handleBackToCategories} />

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
            {ActiveComponent && <ActiveComponent onBack={handleBackToCategories} setIsReportIssueDialogOpen={setIsReportIssueDialogOpen} />}
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
              {ActiveComponent && <ActiveComponent setIsReportIssueDialogOpen={setIsReportIssueDialogOpen} />}
            </div>
          </div>
        </motion.div>
      </main>

      <div className="container mx-auto px-4 pb-8 md:pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            onClick={handleLogout}
            className="w-full cta-button flex items-center justify-center gap-2"
            variant="destructive"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </Button>
        </motion.div>
      </div>

      <MobileNav activeTab="settings" />

      <ReportIssueDialog
        isOpen={isReportIssueDialogOpen}
        onClose={() => setIsReportIssueDialogOpen(false)}
      />
    </div>
  );
};

export default SettingsPage;
