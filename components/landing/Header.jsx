'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
];

const Header = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed mx-auto w-full top-4 left-1/2 -translate-x-1/2 max-w-[90%] rounded-lg py-3 px-3 border transition-colors duration-300 z-50",
        {
          "border-border bg-background/80 backdrop-blur-md": scrolled,
          "border-transparent": !scrolled,
        }
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <h1 onClick={() => router.push('/')} className="font-bold text-xl cursor-pointer">Presently</h1>
        <nav className="flex items-center justify-center hidden md:block">
          <ul className="flex flex-row space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn("transition-colors hover:text-primary", {
                    "text-primary": activeSection === link.label.toLowerCase(),
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-row gap-2 items-center">
          <ThemeToggle />
          <Button onClick={() => router.push('/auth/signup')} className="hidden md:block">
            Get free trial
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-center block md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="block md:hidden border-t mt-4 px-4 py-3 w-full">
          <nav className="flex flex-col items-center space-y-1 w-full mb-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "w-full hover:bg-accent text-center p-2 rounded-lg transition-all duration-300 ease-in-out",
                  {
                    "bg-accent text-primary": activeSection === link.label.toLowerCase(),
                  }
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button onClick={() => router.push('/auth/signup')} className="block md:hidden w-full">
            Get free trial
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;