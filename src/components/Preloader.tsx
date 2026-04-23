'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold uppercase tracking-widest"
      >
        Loading...
      </motion.div>
    </motion.div>
  );
}
