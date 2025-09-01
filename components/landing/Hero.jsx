"use client";
import Header from "./Header"
// import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const Hero = () => {
  const router = useRouter();
  return (
    <div className="">
      <Header />
      <section className="flex flex-col items-center justify-center text-center py-8 px-24 space-y-6 w-full mt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-black">Smart Attendance, Made Simple</h1>
        <h2 className="text-lg md:text-2xl text-gray-600">Track, verify, and analyse student attendance in real-time with Presently - the intelligent attendance system built for students, lecturers, and institutions</h2>
        <div className="flex items-center space-x-3">
          <Button onClick={() => router.push('/auth/signup')} className="py-6 px-8">Get free trial</Button>
          <Button variant="outline" className="py-6 px-8">Watch Demo</Button>
        </div>
      </section>
    </div>
  )
}

export default Hero
