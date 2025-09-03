'use client';
import { Home, Calendar, Users, BarChart3, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { id: 'dashboard', icon: <Home className="w-5 h-5" />, label: 'Home' },
  { id: 'attendance', icon: <Calendar className="w-5 h-5" />, label: 'Attendance' },
  { id: 'courses', icon: <Users className="w-5 h-5" />, label: 'Courses' },
  { id: 'analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
  { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
];

const MobileNav = ({ activeTab = 'dashboard' }) => {
  const router = useRouter();

  const handleNavigation = (id) => {
    let path = '/dashboard';
    switch (id) {
      case 'attendance':
        path = '/dashboard/sessions';
        break;
      case 'courses':
        path = '/dashboard/courses';
        break;
      case 'analytics':
        path = '/dashboard/analytics';
        break;
      case 'settings':
        path = '/dashboard/settings';
        break;
      default:
        path = '/dashboard';
    }
    router.push(path);
  };
  return (
    <motion.nav
      className="mobile-nav md:hidden glass border-t border-border"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item, index) => (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  className={cn(
                    "mobile-nav-item relative",
                    activeTab === item.id && "active"
                  )}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavigation(item.id)}
                >
                  <div className="relative">
                    {item.icon}
                    {activeTab === item.id && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                        layoutId="activeIndicator"
                      />
                    )}
                  </div>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {item.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </motion.nav>
  );
};

export default MobileNav;