
'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotificationStore } from '@/lib/store';
import NotificationDialog from './NotificationDialog';
import { Bell, CheckCheck } from 'lucide-react';

const NotificationDropdown = () => {
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end">
          <div className="p-2 flex justify-between items-center">
            <h4 className="font-medium text-sm">Notifications</h4>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>
          <DropdownMenuSeparator />
          <ScrollArea className="h-72">
            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center p-4">No notifications yet.</p>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex items-start gap-3 p-3 cursor-pointer ${!notification.read ? 'bg-accent/50' : ''}`}
                >
                  <div className={`mt-1 w-2 h-2 rounded-full ${!notification.read ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{new Date(notification.timestamp).toLocaleString()}</p>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedNotification && (
        <NotificationDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          notification={selectedNotification}
        />
      )}
    </>
  );
};

export default NotificationDropdown;
