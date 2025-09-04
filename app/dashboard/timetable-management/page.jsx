"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileNav from "@/components/dashboard/MobileNav";
import TimetableManagement from "@/components/dashboard/TimetableManagement";
import { useRouter } from "next/navigation"; // Import useRouter

export default function TimetableManagementPage() {
  const router = useRouter(); // Initialize useRouter

  return (
    <>
      <DashboardHeader
        title="Manage Timetable"
        showBackButton={true} // Show back button
        onBackClick={() => router.back()} // Go back on click
      />
      <div className="pt-32 pb-16 px-4 md:px-8 lg:px-12 space-y-6 min-h-[calc(100vh-64px)]">
        <TimetableManagement />
      </div>
      <MobileNav activeTab="sessions" /> {/* Timetable management is related to sessions */}
    </>
  );
}