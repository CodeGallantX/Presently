import { Geist, Geist_Mono } from "next/font/google";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata = {
  title: "Presently",
  description: "Smart attendance management for students and lecturers",
  manifest: "/manifest.json",
  appleWebAppCapable: "yes",
  appleWebAppStatusBarStyle: "default",
  appleWebAppTitle: "Presently",
  formatDetection: { telephone: false },
  mobileWebAppCapable: "yes",
  msapplicationTapHighlight: "no",
  keywords: ["attendance", "management", "student", "lecturer", "presently"],
  authors: [{ name: "CodeGallantX", url: "https://codegallantx.dev" }],
  creator: "CodeGallantX",
  publisher: "CodeGallantX",
};

export const viewport = {
  themeColor: "#09090b",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${figtree.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
