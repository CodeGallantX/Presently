"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileNav from "@/components/dashboard/MobileNav";
import ViewTimetable from "@/components/dashboard/ViewTimetable";

export default function ViewTimetablePage() {
  return (
    <>
      <DashboardHeader title="View Timetable" />
      <div className="pt-16 pb-16 px-4 md:px-8 lg:px-12 space-y-6 min-h-[calc(100vh-64px)]">
        <ViewTimetable />
      </div>
      <MobileNav activeTab="sessions" /> {/* Timetable view is related to sessions */}
    </>
  );
}
