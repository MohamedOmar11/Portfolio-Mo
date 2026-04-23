'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useContent } from '@/components/ContentProvider';

export function Navbar() {
  const { get } = useContent();

  const logoText = get('site.logoText', 'Studio');
  const navWork = get('nav.work', 'Work');
  const navAbout = get('nav.about', 'About');
  const navServices = get('nav.services', 'Services');
  const navContact = get('nav.contact', 'Contact');
  const navCta = get('nav.cta', 'Book a Call');

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: typeof window !== 'undefined' && sessionStorage.getItem('preloader_shown') ? 0 : 2.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 mix-blend-difference flex justify-between items-center text-white"
    >
      <Link href="/" className="text-xl font-bold uppercase tracking-widest cursor-pointer">
        {logoText}
      </Link>
      <div className="hidden md:flex space-x-8">
        <a href="#work" className="text-sm font-medium hover:text-gray-300 transition cursor-pointer">{navWork}</a>
        <a href="#about" className="text-sm font-medium hover:text-gray-300 transition cursor-pointer">{navAbout}</a>
        <a href="#services" className="text-sm font-medium hover:text-gray-300 transition cursor-pointer">{navServices}</a>
        <a href="#contact" className="text-sm font-medium hover:text-gray-300 transition cursor-pointer">{navContact}</a>
      </div>
      <a href="#contact" className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold cursor-pointer hover:scale-105 transition-transform">
        {navCta}
      </a>
    </motion.nav>
  );
}
