"use client";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import Link from "next/link"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed mx-auto w-full top-4 left-1/2 -translate-x-1/2 max-w-[90%] rounded-lg py-3 px-3 border border-gray-300 bg-white/30 backdrop-blur-md">
      <div className="flex flex-row items-center justify-between">
      <h1 onClick={() => router.push('/')} className="font-bold text-xl cursor-default">Presently</h1>
      <nav className="flex items-center justify-center hidden md:block">
        <ul className="flex flex-row space-x-6">
            <li><Link href="#features">Features</Link></li>
            <li><Link href="#testimonials">Testimonials</Link></li>
            <li><Link href="#pricing">Pricing</Link></li>
        </ul>
        </nav>
        <div className="flex flex-row gap-2 items-center">
        <ThemeToggle />
        <Button className="hidden md:block">
            Get free trial
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="block md:hidden text-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ?
                <X/> : <Menu />
              }
            </Button>
        </div>
</div>
        {isOpen && (
          <div className="block md:hidden border-t mt-4 px-4 py-3 w-full">
          <ul className="flex flex-col items-center space-y-3 w-full">
              <li><Link className="w-full hover:bg-gray-200" href="#features">Features</Link></li>
              <li><Link className="w-full" href="#testimonials">Testimonials</Link></li>
              <li><Link className="w-full" href="#pricing">Pricing</Link></li>
          </ul>

          </div>
        )}
    </header>
  )
}

export default Header
