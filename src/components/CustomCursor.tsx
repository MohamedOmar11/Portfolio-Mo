'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    
    document.querySelectorAll('a, button, input, textarea, select, .cursor-pointer').forEach(el => {
      el.addEventListener('mouseenter', handleMouseOver);
      el.addEventListener('mouseleave', handleMouseOut);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.querySelectorAll('a, button, input, textarea, select, .cursor-pointer').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseOver);
        el.removeEventListener('mouseleave', handleMouseOut);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white hidden md:block"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2 : 1,
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    />
  );
}
