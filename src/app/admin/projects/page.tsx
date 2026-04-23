'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setProjects([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch projects', err);
        setProjects([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter((p: any) => p._id !== id));
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition">
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-500">Thumbnail</th>
              <th className="p-4 font-medium text-gray-500">Title</th>
              <th className="p-4 font-medium text-gray-500">Category</th>
              <th className="p-4 font-medium text-gray-500">Status</th>
              <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No projects found. Add one to get started.
                </td>
              </tr>
            ) : (
              projects.map((project: any) => (
                <tr key={project._id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <img src={project.thumbnail} alt={project.title} className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="p-4 font-medium">{project.title}</td>
                  <td className="p-4 text-gray-500">{project.category}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.isVisible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {project.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-black transition">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(project._id)} className="p-2 text-gray-400 hover:text-red-600 transition">
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
