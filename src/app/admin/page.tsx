'use client';

import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">Total Projects</div>
          <div className="text-3xl font-bold">12</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">Total Leads</div>
          <div className="text-3xl font-bold">24</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">Services</div>
          <div className="text-3xl font-bold">4</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">Testimonials</div>
          <div className="text-3xl font-bold">8</div>
        </div>
      </div>
    </div>
  );
}
