"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileNav from "@/components/dashboard/MobileNav";
import ViewTimetable from "@/components/dashboard/ViewTimetable";
import { useRouter } from "next/navigation"; // Import useRouter

export default function ViewTimetablePage() {
  const router = useRouter(); // Initialize useRouter

  return (
    <>
      <DashboardHeader
        title="View Timetable"
        showBackButton={true} // Show back button
        onBackClick={() => router.back()} // Go back on click
      />
      <div className="pt-16 pb-16 px-4 md:px-8 lg:px-12 space-y-6 min-h-[calc(100vh-64px)]">
        <ViewTimetable />
      </div>
      <MobileNav activeTab="sessions" /> {/* Timetable view is related to sessions */}
    </>
  );
}