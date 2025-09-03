'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MobileNav from '@/components/dashboard/MobileNav';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotificationStore } from '@/lib/store';
import NotificationDialog from '@/components/dashboard/NotificationDialog'; // Assuming this path is correct
import { Bell, CheckCheck, ArrowLeft } from 'lucide-react';

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <DashboardHeader
        title="Notifications"
        showBackButton={true}
        onBackClick={handleBack}
      />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 pb-24 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="w-full">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-5 h-5" /> All Notifications
              </CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Mark all as read
                </Button>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-[calc(100vh-250px)]">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center p-4">No notifications yet.</p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`flex items-start gap-3 p-3 cursor-pointer border-b border-border last:border-b-0 ${!notification.read ? 'bg-accent/50' : ''}`}
                    >
                      <div className={`mt-1 w-2 h-2 rounded-full ${!notification.read ? 'bg-primary' : 'bg-transparent'}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>From: {notification.source}</span>
                          <span>Category: {notification.category}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{new Date(notification.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <MobileNav activeTab="notifications" />
      {selectedNotification && (
        <NotificationDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          notification={selectedNotification}
        />
      )}
    </>
  );
}
