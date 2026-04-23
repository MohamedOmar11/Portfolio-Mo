'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { LayoutDashboard, Briefcase, FileText, Settings, Users, MessageSquare, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [status, pathname, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!session) {
    return null;
  }

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: Briefcase },
    { href: '/admin/content', label: 'Content', icon: FileText },
    { href: '/admin/services', label: 'Services', icon: Settings },
    { href: '/admin/testimonials', label: 'Testimonials', icon: Users },
    { href: '/admin/leads', label: 'Leads', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 text-xl font-bold border-b">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <span className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                  <Icon size={20} />
                  <span>{link.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <button 
            onClick={() => signOut()} 
            className="flex items-center space-x-3 p-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
