'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function ContentPage() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContent(data);
        } else {
          setContent([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch content', err);
        setContent([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading content...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition">
          <Save size={20} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8 text-center text-gray-500">
        Content editor coming soon. This is where you will be able to edit homepage text, SEO metadata, and other static copy.
      </div>
    </div>
  );
}
