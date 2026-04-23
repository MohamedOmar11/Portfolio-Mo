'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function ContentPage() {
  const [contentList, setContentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pre-defined default keys to guide the user
  const defaultKeys = [
    { section: 'theme', key: 'accent', value: '#14f1c3' },
    { section: 'theme', key: 'accent2', value: '#00a3ff' },
    { section: 'site', key: 'logoText', value: 'Studio' },
    { section: 'nav', key: 'work', value: 'Work' },
    { section: 'nav', key: 'about', value: 'About' },
    { section: 'nav', key: 'services', value: 'Services' },
    { section: 'nav', key: 'contact', value: 'Contact' },
    { section: 'nav', key: 'cta', value: 'Book a Call' },
    { section: 'hero', key: 'headline', value: 'WE CRAFT\nBRANDS' },
    { section: 'hero', key: 'subheadline', value: 'Elevating businesses through bold design...' },
    { section: 'hero', key: 'ctaPrimary', value: 'View Work' },
    { section: 'hero', key: 'ctaSecondary', value: 'Book a Call' },
    { section: 'portfolio', key: 'headline', value: 'Selected\nWork' },
    { section: 'services', key: 'headline', value: 'What We Do' },
    { section: 'services', key: 'subheadline', value: 'Tailored solutions designed to elevate your brand.' },
    { section: 'services', key: 'cta', value: 'Get Started' },
    { section: 'about', key: 'label', value: 'Our Story' },
    { section: 'about', key: 'headline', value: 'We believe that great design is invisible. It just works.' },
    { section: 'about', key: 'body', value: 'For over a decade, we have been crafting digital experiences and brand identities that stand the test of time.' },
    { section: 'about', key: 'stat1Number', value: '15+' },
    { section: 'about', key: 'stat1Label', value: 'Years Experience' },
    { section: 'about', key: 'stat2Number', value: '200+' },
    { section: 'about', key: 'stat2Label', value: 'Projects Completed' },
    { section: 'testimonials', key: 'headline', value: 'Client Love' },
    { section: 'contact', key: 'headline', value: "Let's\nTalk" },
    { section: 'contact', key: 'subheadline', value: 'Ready to elevate your brand? Fill out the form or schedule a call directly.' },
    { section: 'contact', key: 'email', value: 'hello@studio.com' },
    { section: 'contact', key: 'location', value: 'New York, NY' },
    { section: 'footer', key: 'logoText', value: 'Studio.' },
    { section: 'footer', key: 'rightsText', value: `© ${new Date().getFullYear()} Studio. All rights reserved.` },
    { section: 'footer', key: 'socials', value: 'Instagram|#\nTwitter|#\nLinkedIn|#\nDribbble|#' },
    { section: 'seo', key: 'meta_title', value: 'Studio | Creative Agency' },
    { section: 'seo', key: 'meta_description', value: 'Premium branding and web design studio.' }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = () => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setContentList(data);
        } else {
          // Provide defaults if DB is empty
          setContentList(defaultKeys.map((item, i) => ({ ...item, _id: `temp-${i}` })));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch content', err);
        setLoading(false);
      });
  };

  const handleAddRow = () => {
    setContentList([{ _id: `temp-${Date.now()}`, section: 'general', key: 'new_key', value: 'New Value' }, ...contentList]);
  };

  const handleChange = (id: string, field: string, value: string) => {
    setContentList(contentList.map(item => item._id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = async (item: any) => {
    const isNew = item._id.toString().startsWith('temp-');
    const url = isNew ? '/api/content' : `/api/content/${item._id}`;
    const method = isNew ? 'POST' : 'PUT';

    const payload = { section: item.section, key: item.key, value: item.value };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Saved!');
      fetchContent();
    } else {
      alert('Failed to save.');
    }
  };

  const handleDelete = async (id: string) => {
    if (id.startsWith('temp-')) {
      setContentList(contentList.filter(item => item._id !== id));
      return;
    }
    if (confirm('Are you sure you want to delete this content key?')) {
      await fetch(`/api/content/${id}`, { method: 'DELETE' });
      setContentList(contentList.filter(item => item._id !== id));
    }
  };

  if (loading) return <div>Loading content...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Editor</h1>
        <button onClick={handleAddRow} className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition">
          <Plus size={20} />
          <span>Add Custom Key</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        <div className="space-y-6">
          {contentList.map((item) => (
            <div key={item._id} className="grid grid-cols-12 gap-4 items-start border-b pb-6 last:border-0 last:pb-0">
              <div className="col-span-3">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Section</label>
                <input 
                  value={item.section} 
                  onChange={(e) => handleChange(item._id, 'section', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Key Name</label>
                <input 
                  value={item.key} 
                  onChange={(e) => handleChange(item._id, 'key', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="col-span-4">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Value (Text)</label>
                <textarea 
                  value={item.value} 
                  onChange={(e) => handleChange(item._id, 'value', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded focus:outline-none focus:ring-1 focus:ring-black min-h-[42px] max-h-32"
                />
              </div>
              <div className="col-span-2 flex items-center justify-end space-x-2 mt-6">
                <button onClick={() => handleSave(item)} className="bg-black text-white p-2 rounded hover:bg-gray-800 transition" title="Save">
                  <Save size={18} />
                </button>
                <button onClick={() => handleDelete(item._id)} className="bg-red-50 text-red-600 p-2 rounded hover:bg-red-100 transition" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
