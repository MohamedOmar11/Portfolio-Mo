'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function ContentPage() {
  const [contentList, setContentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pre-defined default keys to guide the user
  const defaultKeys = [
    { section: 'theme', key: 'accent', value: '#14f1c3', type: 'color' },
    { section: 'theme', key: 'accent2', value: '#00a3ff', type: 'color' },
    { section: 'site', key: 'logoText', value: 'Studio', type: 'text' },
    { section: 'nav', key: 'work', value: 'Work', type: 'text' },
    { section: 'nav', key: 'about', value: 'About', type: 'text' },
    { section: 'nav', key: 'services', value: 'Services', type: 'text' },
    { section: 'nav', key: 'contact', value: 'Contact', type: 'text' },
    { section: 'nav', key: 'cta', value: 'Book a Call', type: 'text' },
    { section: 'hero', key: 'headline', value: 'WE CRAFT\nBRANDS', type: 'textarea' },
    { section: 'hero', key: 'subheadline', value: 'Elevating businesses through bold design...', type: 'textarea' },
    { section: 'hero', key: 'ctaPrimary', value: 'View Work', type: 'text' },
    { section: 'hero', key: 'ctaSecondary', value: 'Book a Call', type: 'text' },
    { section: 'portfolio', key: 'headline', value: 'Selected\nWork', type: 'textarea' },
    { section: 'services', key: 'headline', value: 'What We Do', type: 'text' },
    { section: 'services', key: 'subheadline', value: 'Tailored solutions designed to elevate your brand.', type: 'textarea' },
    { section: 'services', key: 'cta', value: 'Get Started', type: 'text' },
    { section: 'about', key: 'label', value: 'Our Story', type: 'text' },
    { section: 'about', key: 'headline', value: 'We believe that great design is invisible. It just works.', type: 'textarea' },
    { section: 'about', key: 'body', value: 'For over a decade, we have been crafting digital experiences and brand identities that stand the test of time.', type: 'textarea' },
    { section: 'about', key: 'stat1Number', value: '15+', type: 'text' },
    { section: 'about', key: 'stat1Label', value: 'Years Experience', type: 'text' },
    { section: 'about', key: 'stat2Number', value: '200+', type: 'text' },
    { section: 'about', key: 'stat2Label', value: 'Projects Completed', type: 'text' },
    { section: 'testimonials', key: 'headline', value: 'Client Love', type: 'text' },
    { section: 'contact', key: 'headline', value: "Let's\nTalk", type: 'textarea' },
    { section: 'contact', key: 'subheadline', value: 'Ready to elevate your brand? Fill out the form or schedule a call directly.', type: 'textarea' },
    { section: 'contact', key: 'email', value: 'hello@studio.com', type: 'text' },
    { section: 'contact', key: 'location', value: 'New York, NY', type: 'text' },
    { section: 'footer', key: 'logoText', value: 'Studio.', type: 'text' },
    { section: 'footer', key: 'rightsText', value: `© ${new Date().getFullYear()} Studio. All rights reserved.`, type: 'text' },
    { section: 'footer', key: 'socials', value: 'Instagram|#\nTwitter|#\nLinkedIn|#\nDribbble|#', type: 'textarea' },
    { section: 'seo', key: 'meta_title', value: 'Studio | Creative Agency', type: 'text' },
    { section: 'seo', key: 'meta_description', value: 'Premium branding and web design studio.', type: 'textarea' }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = () => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // ensure existing items have a type, defaulting to text
          setContentList(data.map(item => ({ ...item, type: item.type || 'text' })));
        } else {
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
    setContentList([{ _id: `temp-${Date.now()}`, section: 'general', key: 'new_key', value: 'New Value', type: 'text' }, ...contentList]);
  };

  const handleChange = (id: string, field: string, value: string) => {
    setContentList(contentList.map(item => item._id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = async (item: any) => {
    const isNew = item._id.toString().startsWith('temp-');
    const url = isNew ? '/api/content' : `/api/content/${item._id}`;
    const method = isNew ? 'POST' : 'PUT';

    const payload = { section: item.section, key: item.key, value: item.value, type: item.type };

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

  // Group content by section
  const groupedContent = contentList.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Editor</h1>
        <button onClick={handleAddRow} className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition">
          <Plus size={20} />
          <span>Add Custom Key</span>
        </button>
      </div>

      <div className="space-y-12">
        {Object.keys(groupedContent).map((section) => (
          <div key={section} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-lg font-bold uppercase tracking-wider text-gray-700">{section} Section</h2>
            </div>
            <div className="p-6 space-y-6">
              {groupedContent[section].map((item) => (
                <div key={item._id} className="grid grid-cols-12 gap-6 items-start border-b pb-6 last:border-0 last:pb-0">
                  <div className="col-span-12 md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Key Name</label>
                    <input 
                      value={item.key} 
                      onChange={(e) => handleChange(item._id, 'key', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border rounded focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  
                  <div className="col-span-12 md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Type</label>
                    <select
                      value={item.type || 'text'}
                      onChange={(e) => handleChange(item._id, 'type', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border rounded focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="text">Short Text</option>
                      <option value="textarea">Paragraph</option>
                      <option value="color">Color Picker</option>
                      <option value="image">Image URL</option>
                    </select>
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Value</label>
                    {item.type === 'color' ? (
                      <div className="flex items-center space-x-3">
                        <input 
                          type="color" 
                          value={item.value} 
                          onChange={(e) => handleChange(item._id, 'value', e.target.value)}
                          className="w-12 h-10 cursor-pointer rounded border"
                        />
                        <input 
                          type="text" 
                          value={item.value} 
                          onChange={(e) => handleChange(item._id, 'value', e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-50 border rounded focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    ) : item.type === 'textarea' ? (
                      <textarea 
                        value={item.value} 
                        onChange={(e) => handleChange(item._id, 'value', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border rounded focus:outline-none focus:ring-1 focus:ring-black min-h-[80px]"
                      />
                    ) : item.type === 'image' ? (
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          value={item.value} 
                          onChange={(e) => handleChange(item._id, 'value', e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 bg-gray-50 border rounded focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        {item.value && (
                          <img src={item.value} alt="Preview" className="h-20 object-contain rounded border bg-gray-100" />
                        )}
                      </div>
                    ) : (
                      <input 
                        type="text" 
                        value={item.value} 
                        onChange={(e) => handleChange(item._id, 'value', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border rounded focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-2 flex items-center justify-end space-x-2 mt-6">
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
        ))}
      </div>
    </div>
  );
}
