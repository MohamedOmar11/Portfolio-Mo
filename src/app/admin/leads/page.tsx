'use client';

import { useState, useEffect } from 'react';
import { Trash2, Download } from 'lucide-react';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLeads(data);
        } else {
          setLeads([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch leads', err);
        setLeads([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      setLeads(leads.filter((l: any) => l._id !== id));
    }
  };

  const handleExport = () => {
    const csvData = [
      ['Date', 'Name', 'Email', 'Budget', 'Project Type', 'Message'],
      ...leads.map((l: any) => [
        new Date(l.createdAt).toLocaleDateString(),
        l.name,
        l.email,
        l.budget,
        l.projectType,
        l.message || ''
      ])
    ].map(e => e.join(',')).join('\n');
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads_export.csv';
    a.click();
  };

  if (loading) return <div>Loading leads...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Leads</h1>
        <button onClick={handleExport} className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition">
          <Download size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-500">Date</th>
              <th className="p-4 font-medium text-gray-500">Name</th>
              <th className="p-4 font-medium text-gray-500">Email</th>
              <th className="p-4 font-medium text-gray-500">Project Type</th>
              <th className="p-4 font-medium text-gray-500">Budget</th>
              <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No leads received yet.
                </td>
              </tr>
            ) : (
              leads.map((lead: any) => (
                <tr key={lead._id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 font-medium">{lead.name}</td>
                  <td className="p-4 text-gray-500">{lead.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {lead.projectType}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{lead.budget}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(lead._id)} className="p-2 text-gray-400 hover:text-red-600 transition">
                      <Trash2 size={18} />
                    </button>
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
