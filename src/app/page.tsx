'use client';

import { Hero } from '@/components/Hero';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Smooth scroll polyfill or lenis could go here
    const scrollFn = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const id = target.getAttribute('href')?.slice(1);
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', scrollFn);
    });

    let timer: NodeJS.Timeout;
    
    // Check if preloader has already been shown this session
    if (sessionStorage.getItem('preloader_shown')) {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    } else {
      // Remove overflow hidden after preloader finishes
      timer = setTimeout(() => {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
      }, 2500);
    }

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', scrollFn);
      });
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black relative">
      <CustomCursor />
      <Preloader />
      <Navbar />
      <Hero />
      <PortfolioGrid />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
