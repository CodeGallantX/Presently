"use client";
import Link from "next/link";
import { Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-12 border-t">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg font-bold">Presently</p>
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Presently. All rights reserved.</p>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link href="/about" className="text-gray-600 hover:text-primary">About</Link>
          <Link href="/blog" className="text-gray-600 hover:text-primary">Blog</Link>
          <Link href="/support" className="text-gray-600 hover:text-primary">Support</Link>
          <Link href="/terms" className="text-gray-600 hover:text-primary">Terms</Link>
          <Link href="/privacy" className="text-gray-600 hover:text-primary">Privacy</Link>
        </div>
        <div className="flex space-x-4">
          <a href="mailto:contact@presently.app" className="text-gray-600 hover:text-primary"><Mail /></a>
          <a href="#" className="text-gray-600 hover:text-primary"><Twitter /></a>
          <a href="#" className="text-gray-600 hover:text-primary"><Linkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
