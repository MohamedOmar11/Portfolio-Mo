'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function PortfolioGrid() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data.filter((p: any) => p.isVisible));
        } else {
          setProjects([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch projects', err);
        setProjects([]);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p: any) => p.category)))];
  const filteredProjects = filter === 'All' ? projects : projects.filter((p: any) => p.category === filter);

  return (
    <section id="work" className="py-32 bg-gray-50 text-gray-900 px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-extrabold tracking-tighter uppercase mb-8 md:mb-0"
          >
            Selected <br /> Work
          </motion.h2>

          <div className="flex flex-wrap gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full border-2 text-sm font-bold uppercase tracking-wider transition ${filter === cat ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'}`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {filteredProjects.map((project: any, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (index % 2) * 0.2 }}
              className={`group relative ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              <Link href={`/project/${project.slug}`}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-square bg-gray-200 mb-6">
                  <img
                    src={project.thumbnail || `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(project.title)}&image_size=portrait_4_3`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 font-bold uppercase text-sm">
                      View
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{project.category}</div>
                    <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-gray-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
