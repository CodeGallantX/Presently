
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from "@/components/ui/button";
import { useNotificationStore } from '@/lib/store';
import { Bell } from 'lucide-react';

const NotificationDropdown = () => {
  const router = useRouter(); // Initialize useRouter
  const { unreadCount } = useNotificationStore();

  const handleBellClick = () => {
    router.push('/dashboard/notifications'); // Navigate to the dedicated notifications page
  };

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={handleBellClick}>
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Button>
  );
};

export default NotificationDropdown;
