'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { useContent } from '@/components/ContentProvider';

export function Testimonials() {
  const { get } = useContent();
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTestimonials(data.filter((t: any) => t.isVisible));
        } else {
          setTestimonials([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch testimonials', err);
        setTestimonials([]);
      });
  }, []);

  return (
    <section className="py-32 bg-black text-white px-8">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-extrabold tracking-tighter uppercase mb-24 text-center"
        >
          {get('testimonials.headline', 'Client Love')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {testimonials.map((testimonial: any, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-zinc-900 p-12 rounded-3xl border border-white/10 hover:border-[color:var(--accent)]/50 transition-colors"
            >
              <Quote className="w-12 h-12 text-white/20 mb-8" />
              <p className="text-xl md:text-2xl font-light italic text-gray-300 leading-relaxed mb-10">
                &quot;{testimonial.feedback}&quot;
              </p>
              <div className="flex items-center space-x-4">
                {testimonial.avatar ? (
                  <img src={testimonial.avatar} alt={testimonial.clientName} className="w-16 h-16 rounded-full object-cover grayscale" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">
                    {testimonial.clientName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-bold text-lg">{testimonial.clientName}</div>
                  <div className="text-gray-500 text-sm uppercase tracking-wider">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
