'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
// import LecturerDashboard from '@/components/dashboard/LecturerDashboard';
import ClassRepDashboard from '@/components/dashboard/ClassRepDashboard';

const DashboardPage = () => {
  const router = useRouter();
  const { isAuthenticated, userRole, isHydrated } = useAppStore();

  useEffect(() => {
    if (isHydrated) { // Only run checks after hydration
      if (!isAuthenticated) {
        router.push('/auth/signin');
        return;
      }
      
      if (!userRole) {
        router.push('/onboarding');
        return;
      }
    }
  }, [isAuthenticated, userRole, router, isHydrated]);

  if (!isHydrated || !isAuthenticated || !userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const renderDashboard = () => {
    switch (userRole) {
      case 'student':
        return <StudentDashboard />;
      case 'lecturer':
        return null; // <LecturerDashboard />;
      case 'class-rep':
        return <ClassRepDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return renderDashboard();
};

export default DashboardPage;