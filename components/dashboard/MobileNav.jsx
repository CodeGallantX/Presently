'use client';
import { Home, Calendar, Users, BarChart3, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    // For now, all mobile nav items navigate to the main dashboard
    // In a real app, these would navigate to specific sub-routes like /dashboard/attendance
    router.push('/dashboard');
  };
  return (
    <motion.nav
      className="mobile-nav md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
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
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default MobileNav;