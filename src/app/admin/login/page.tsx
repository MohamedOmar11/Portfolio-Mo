'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
