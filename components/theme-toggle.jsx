"use client";
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    return (
        <Button onClick={() => setTheme(theme === "dark" ? "light": "dark")} variant="ghost" size="icon" className="text-lg">
            {theme === 'dark' ? (
                <Sun className="rounded-full text-white"/>
            ) : (
                <Moon className="rounded-full text-black"/>
            )}
        </Button>
    )
}

export default Button;