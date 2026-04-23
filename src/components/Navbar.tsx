'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 mix-blend-difference flex justify-between items-center text-white"
    >
      <Link href="/" className="text-xl font-bold uppercase tracking-widest cursor-pointer">
        Studio
      </Link>
      <div className="hidden md:flex space-x-8">
        <a href="#work" className="text-sm font-medium hover:text-gray-300 transition cursor-pointer">Work</a>
        <a href="#about" className="text-sm font-medium hover:text-gray-300 transition cursor-pointer">About</a>
        <a href="#services" className="text-sm font-medium hover:text-gray-300 transition cursor-pointer">Services</a>
        <a href="#contact" className="text-sm font-medium hover:text-gray-300 transition cursor-pointer">Contact</a>
      </div>
      <a href="#contact" className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold cursor-pointer hover:scale-105 transition-transform">
        Book a Call
      </a>
    </motion.nav>
  );
}
