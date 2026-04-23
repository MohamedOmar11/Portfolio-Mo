'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-8 border-t border-white/10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-black tracking-tighter uppercase">
          Studio.
        </div>
        
        <div className="flex space-x-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Dribbble</a>
        </div>

        <div className="text-sm text-gray-600 font-medium">
          &copy; {new Date().getFullYear()} Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
