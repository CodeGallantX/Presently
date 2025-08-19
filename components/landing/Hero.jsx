import Header from "./Header"
import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <div className="">
      <Header />
      <section className="flex flex-col items-center justify-center text-center py-8 px-24 space-y-6">
        <h1 className="text-6xl font-bold text-black">Smart Attendance, Made Simple</h1>
        <h2 className="text-2xl text-gray-600 w-xl">Track, verify, and analyse student attendance in real-time with Presently - the intelligent attendance system built for students, lecturers, and institutions</h2>
        <div>
          <Button>Get free trial</Button>
        </div>
      </section>
    </div>
  )
}

export default Hero
