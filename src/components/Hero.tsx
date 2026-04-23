'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useContent } from '@/components/ContentProvider';

export function Hero() {
  const { get } = useContent();

  const headline = get('hero.headline', 'WE CRAFT\nBRANDS');
  const subheadline = get('hero.subheadline', 'Elevating businesses through bold design, strategic thinking, and unforgettable visual identities.');
  const ctaPrimary = get('hero.ctaPrimary', 'View Work');
  const ctaSecondary = get('hero.ctaSecondary', 'Book a Call');
  const headlineParts = headline.split('\n');

  return (
    <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <motion.div
        className="absolute w-[60vw] h-[60vw] bg-gradient-to-tr from-[color:var(--accent)]/25 to-[color:var(--accent2)]/25 blur-[100px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative z-10 container mx-auto px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: typeof window !== 'undefined' && sessionStorage.getItem('preloader_shown') ? 0 : 2.8, ease: [0.76, 0, 0.24, 1] }}
          className="overflow-hidden"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-extrabold tracking-tighter leading-[0.85] mb-6">
            {headlineParts[0] || 'WE CRAFT'} <br />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent2)]">
              {headlineParts[1] || 'BRANDS'}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: typeof window !== 'undefined' && sessionStorage.getItem('preloader_shown') ? 0.3 : 3.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 font-light"
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: typeof window !== 'undefined' && sessionStorage.getItem('preloader_shown') ? 0.6 : 3.5, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a href="#work" className="group flex items-center space-x-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300">
            <span>{ctaPrimary}</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="flex items-center justify-center border-2 border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:border-white hover:bg-white/5 transition-all duration-300">
            {ctaSecondary}
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: [0, 10, 0] }}
        transition={{ delay: typeof window !== 'undefined' && sessionStorage.getItem('preloader_shown') ? 1 : 4.5, duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-white/50" />
      </motion.div>
    </section>
  );
}
