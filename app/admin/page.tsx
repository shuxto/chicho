"use client";

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // This checks your email/password with Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error: " + error.message);
      setLoading(false);
    } else {
      // If success, go to the dashboard
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-slate-800/50 p-8 rounded-3xl border border-white/10">
        <h1 className="text-2xl font-bold mb-6 text-center">Chicho Admin</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-teal-500"
              placeholder="admin@chicho.com"
            />
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-teal-500"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}