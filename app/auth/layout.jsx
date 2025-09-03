// import ThemeToggle from "@/components/theme-toggle"

export default function AuthLayout({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Blobs for Auth Pages */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full animate-float-x" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/15 rounded-full animate-scale-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-primary/5 rounded-full animate-rotate-slow" style={{ animationDelay: '3s' }} />

            {/* <ThemeToggle /> */}
            <div>
                {children}
            </div>
        </div>
    )
}