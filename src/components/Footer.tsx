'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/components/ContentProvider';

export function Footer() {
  const { get } = useContent();

  const logoText = get('footer.logoText', 'Studio.');
  const rights = get('footer.rightsText', `© ${new Date().getFullYear()} Studio. All rights reserved.`);
  const socialsRaw = get('footer.socials', 'Instagram|#\nTwitter|#\nLinkedIn|#\nDribbble|#');
  const socials = socialsRaw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split('|');
      return { label: (label || '').trim(), href: (href || '#').trim() };
    })
    .filter((x) => x.label.length > 0);

  return (
    <footer className="bg-black text-white py-16 px-8 border-t border-white/10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-black tracking-tighter uppercase">
          {logoText}
        </div>
        
        <div className="flex space-x-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="hover:text-[color:var(--accent)] transition-colors">
              {s.label}
            </a>
          ))}
        </div>

        <div className="text-sm text-gray-600 font-medium">
          {rights}
        </div>
      </div>
    </footer>
  );
}
