'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          setTestimonials([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch testimonials', err);
        setTestimonials([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      setTestimonials(testimonials.filter((t: any) => t._id !== id));
    }
  };

  if (loading) return <div>Loading testimonials...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition">
          <Plus size={20} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-500">Client</th>
              <th className="p-4 font-medium text-gray-500">Company</th>
              <th className="p-4 font-medium text-gray-500">Status</th>
              <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No testimonials found. Add one to get started.
                </td>
              </tr>
            ) : (
              testimonials.map((testimonial: any) => (
                <tr key={testimonial._id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{testimonial.clientName}</td>
                  <td className="p-4 text-gray-500">{testimonial.company || '-'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${testimonial.isVisible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {testimonial.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-black transition">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(testimonial._id)} className="p-2 text-gray-400 hover:text-red-600 transition">
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
