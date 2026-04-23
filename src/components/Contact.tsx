'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useContent } from '@/components/ContentProvider';

export function Contact() {
  const { get } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    timeline: '',
    budget: '',
    projectType: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const selectedService = window.sessionStorage.getItem('selectedService');
    if (selectedService) {
      setFormData((prev) => ({
        ...prev,
        projectType: prev.projectType || selectedService,
        message: prev.message || `Interested in: ${selectedService}`,
      }));
      window.sessionStorage.removeItem('selectedService');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          website: '',
          timeline: '',
          budget: '',
          projectType: '',
          message: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-32 bg-gray-50 text-gray-900 px-8 relative overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter uppercase mb-8">
            {get('contact.headline', "Let's\nTalk").split('\n')[0]}
            <br />
            {get('contact.headline', "Let's\nTalk").split('\n')[1] || 'Talk'}
          </h2>
          <p className="text-2xl text-gray-500 mb-16 font-light max-w-lg leading-relaxed">
            {get('contact.subheadline', 'Ready to elevate your brand? Fill out the form or schedule a call directly.')}
          </p>

          <div className="space-y-12">
            <div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email</div>
              <a
                href={`mailto:${get('contact.email', 'hello@studio.com')}`}
                className="text-2xl md:text-4xl font-bold hover:text-[color:var(--accent)] transition-colors"
              >
                {get('contact.email', 'hello@studio.com')}
              </a>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Location</div>
              <div className="text-2xl font-bold">{get('contact.location', 'New York, NY')}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-2xl shadow-gray-200/50">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Request Sent!</h3>
                <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-8 text-black font-bold border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-xl focus:outline-none focus:border-black transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-xl focus:outline-none focus:border-black transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Phone</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-xl focus:outline-none focus:border-black transition-colors"
                      placeholder="+1 555 000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-xl focus:outline-none focus:border-black transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Website (Optional)</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={e => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-xl focus:outline-none focus:border-black transition-colors"
                      placeholder="https://"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Timeline</label>
                    <select
                      required
                      value={formData.timeline}
                      onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-xl focus:outline-none focus:border-black transition-colors appearance-none"
                    >
                      <option value="" disabled>Select Timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="2-4 weeks">2-4 weeks</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Project Type</label>
                    <select
                      required
                      value={formData.projectType}
                      onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-xl focus:outline-none focus:border-black transition-colors appearance-none"
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="Branding">Branding</option>
                      <option value="Web Design">Web Design</option>
                      <option value="Full Package">Full Package</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Budget</label>
                    <select
                      required
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-xl focus:outline-none focus:border-black transition-colors appearance-none"
                    >
                      <option value="" disabled>Select Budget</option>
                      <option value="< $5k">&lt; $5k</option>
                      <option value="$5k - $10k">$5k - $10k</option>
                      <option value="$10k+">$10k+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Message (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-xl focus:outline-none focus:border-black transition-colors resize-none h-32"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-6 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 hover:bg-gray-900 transition-colors disabled:opacity-70 group"
                >
                  <span>{loading ? 'Sending...' : 'Send Request'}</span>
                  {!loading && <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
