'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          setServices([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch services', err);
        setServices([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
      setServices(services.filter((s: any) => s._id !== id));
    }
  };

  if (loading) return <div>Loading services...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Services</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition">
          <Plus size={20} />
          <span>Add Service</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-500">Title</th>
              <th className="p-4 font-medium text-gray-500">Price</th>
              <th className="p-4 font-medium text-gray-500">Status</th>
              <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No services found. Add one to get started.
                </td>
              </tr>
            ) : (
              services.map((service: any) => (
                <tr key={service._id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{service.title}</td>
                  <td className="p-4 text-gray-500">{service.price}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${service.isVisible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {service.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-black transition">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(service._id)} className="p-2 text-gray-400 hover:text-red-600 transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
