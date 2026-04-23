'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setServices(data.filter((s: any) => s.isVisible));
        } else {
          setServices([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch services', err);
        setServices([]);
      });
  }, []);

  return (
    <section id="services" className="py-32 bg-gray-50 text-gray-900 px-8">
      <div className="container mx-auto text-center mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-extrabold tracking-tighter uppercase mb-6"
        >
          What We Do
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto"
        >
          Tailored solutions designed to elevate your brand.
        </motion.p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: any, index) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-black transition-all duration-500 flex flex-col h-full"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-black mb-4">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">{service.description}</p>
              <div className="text-4xl font-extrabold mb-8">{service.price}</div>
            </div>

            <ul className="space-y-4 mb-12 flex-1">
              {service.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-start space-x-3">
                  <Check className="text-black flex-shrink-0 w-5 h-5 mt-1" />
                  <span className="text-gray-600 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-gray-100 text-black py-4 rounded-xl font-bold flex items-center justify-center space-x-2 group-hover:bg-black group-hover:text-white transition-colors">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
