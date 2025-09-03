'use client';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ThemeToggle from '@/components/theme-toggle';
import { useNotificationStore } from '@/lib/store';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

const DashboardHeader = ({ title, showSidebarTrigger = false }) => {
  const { unreadCount, addNotification, markAsRead } = useNotificationStore();
  const { logout } = useAppStore();
  const router = useRouter();

  const handleBellClick = () => {
    if (unreadCount > 0) {
      // Mark all notifications as read for simplicity
      // In a real app, you'd likely open a notification panel and mark them individually
      console.log("Marking all notifications as read.");
      // This is a placeholder, as markAsRead currently takes an ID. 
      // We'd need to iterate through notifications or add a markAllAsRead action to the store.
      // For now, let's just add a new notification to show interaction.
      addNotification({ message: "You clicked the bell!", type: "info" });
    } else {
      console.log("No unread notifications. Adding a dummy one.");
      addNotification({ message: "New announcement!", type: "announcement" });
    }
  };

  const handleProfileClick = () => {
    alert("Navigating to Profile (simulated)");
    console.log("Profile clicked");
  };

  const handleSettingsClick = () => {
    alert("Navigating to Settings (simulated)");
    console.log("Settings clicked");
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/signin');
    console.log("Logged out");
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          {showSidebarTrigger && <SidebarTrigger />}
          <div>
            <h1 className="font-bold text-lg">{title}</h1>
            <p className="text-xs text-muted-foreground hidden md:block">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Search - Desktop only */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses, students..." 
              className="pl-10 bg-background/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative" onClick={handleBellClick}>
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={handleProfileClick}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;