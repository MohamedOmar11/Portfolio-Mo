'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // Wait a bit after 100%
          return 100;
        }
        // Randomize the loading speed slightly
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center text-white"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100%", // Slide up to exit
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
        >
          {/* Main Logo Reveal */}
          <div className="relative overflow-hidden mb-12">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
            >
              Studio.
            </motion.div>
          </div>

          {/* Progress Number */}
          <div className="absolute bottom-20 flex flex-col items-center">
            <motion.div 
              className="text-xl font-light mb-4 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress}%
            </motion.div>
            
            {/* Progress Bar Container */}
            <div className="w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
              {/* Actual Progress Line */}
              <motion.div 
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
