'use client';
import { Search, User, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ThemeToggle from '@/components/theme-toggle';

import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

import { motion } from 'framer-motion';

import NotificationDropdown from './NotificationDropdown';

const DashboardHeader = ({ title, showSidebarTrigger = false, showBackButton = false, onBackClick }) => {
  const { logout } = useAppStore();
  const router = useRouter();

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
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={onBackClick} className="md:hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
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
          <NotificationDropdown />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-50" align="end" forceMount>
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
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