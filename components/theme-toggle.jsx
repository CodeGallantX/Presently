"use client";
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    return (
        <Button onClick={() => setTheme(theme === "dark" ? "light": "dark")} variant="ghost" size="icon">
            {theme === 'dark' ? (
                <Sun className="rounded-full"/>
            ) : (
                <Moon className="rounded-full"/>
            )}
        </Button>
    )
}

export default ThemeToggle;