"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileNav from "@/components/dashboard/MobileNav";
import TimetableManagement from "@/components/dashboard/TimetableManagement";

export default function TimetableManagementPage() {
  return (
    <>
      <DashboardHeader title="Manage Timetable" />
      <div className="pt-16 pb-16 px-4 md:px-8 lg:px-12 space-y-6 min-h-[calc(100vh-64px)]">
        <TimetableManagement />
      </div>
      <MobileNav activeTab="sessions" /> {/* Timetable management is related to sessions */}
    </>
  );
}
