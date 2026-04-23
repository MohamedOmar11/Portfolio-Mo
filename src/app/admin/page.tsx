'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ projects: 0, leads: 0, services: 0, testimonials: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(res => res.json()),
      fetch('/api/leads').then(res => res.json()),
      fetch('/api/services').then(res => res.json()),
      fetch('/api/testimonials').then(res => res.json())
    ]).then(([projects, leads, services, testimonials]) => {
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        leads: Array.isArray(leads) ? leads.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0
      });
    }).catch(err => console.error("Failed to load stats", err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">Total Projects</div>
          <div className="text-3xl font-bold">{stats.projects}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">Total Leads</div>
          <div className="text-3xl font-bold">{stats.leads}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">Services</div>
          <div className="text-3xl font-bold">{stats.services}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">Testimonials</div>
          <div className="text-3xl font-bold">{stats.testimonials}</div>
        </div>
      </div>
    </div>
  );
}
