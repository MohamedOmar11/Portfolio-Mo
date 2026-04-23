'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/components/ContentProvider';

export function About() {
  const { get } = useContent();

  return (
    <section id="about" className="py-32 bg-black text-white px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="container mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">{get('about.label', 'Our Story')}</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-8">
            {get('about.headline', 'We believe that great design is invisible. It just works.')}
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            {get('about.body', 'For over a decade, we have been crafting digital experiences and brand identities that stand the test of time.')}
          </p>
          
          <div className="grid grid-cols-2 gap-8 mt-16">
            <div>
              <div className="text-5xl font-black mb-2 text-[color:var(--accent)]">{get('about.stat1Number', '15+')}</div>
              <div className="text-sm text-gray-400 uppercase font-bold tracking-wider">{get('about.stat1Label', 'Years Experience')}</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2 text-[color:var(--accent2)]">{get('about.stat2Number', '200+')}</div>
              <div className="text-sm text-gray-400 uppercase font-bold tracking-wider">{get('about.stat2Label', 'Projects Completed')}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="aspect-[3/4] bg-zinc-900 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition duration-700">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
              alt="Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
