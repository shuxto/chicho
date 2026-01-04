"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('cars'); // 'cars' or 'tours'
  
  // Data State
  const [cars, setCars] = useState<any[]>([]);
  const [tours, setTours] = useState<any[]>([]);

  // 1. CHECK AUTH & FETCH DATA
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin'); // Kick out if not logged in
        return;
      }
      
      // Fetch Data
      fetchCars();
      fetchTours();
      setLoading(false);
    };
    
    checkUser();
  }, [router]);

  const fetchCars = async () => {
    const { data } = await supabase.from('cars').select('*').order('id', { ascending: false });
    if (data) setCars(data);
  };

  const fetchTours = async () => {
    const { data } = await supabase.from('tours').select('*').order('id', { ascending: false });
    if (data) setTours(data);
  };

  // 2. DELETE FUNCTIONS
  const deleteItem = async (table: string, id: number) => {
    if(!confirm('Are you sure you want to delete this?')) return;

    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      // Refresh the list
      if (table === 'cars') fetchCars();
      if (table === 'tours') fetchTours();
    }
  };

  // 3. SIGN OUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  if (loading) return <div className="text-white p-10">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-slate-800 p-4 rounded-2xl border border-white/10">
        <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">Sign Out</button>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveTab('cars')}
          className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${activeTab === 'cars' ? 'bg-teal-500 text-black' : 'bg-slate-800 text-slate-400'}`}
        >
          Manage Cars
        </button>
        <button 
          onClick={() => setActiveTab('tours')}
          className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${activeTab === 'tours' ? 'bg-teal-500 text-black' : 'bg-slate-800 text-slate-400'}`}
        >
          Manage Tours
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="bg-slate-800/50 p-4 md:p-6 rounded-3xl border border-white/10 overflow-hidden">
        
        {/* CARS TAB */}
        {activeTab === 'cars' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Fleet List</h2>
              <Link href="/admin/dashboard/add-car" className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors text-sm md:text-base">
                + Add Car
              </Link>
            </div>

            {cars.length === 0 ? (
              <p className="text-slate-500">No cars found in database.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 text-sm">
                      <th className="pb-3 pl-2">Image</th>
                      <th className="pb-3">Name</th>
                      {/* Hidden on Mobile (md:table-cell) */}
                      <th className="pb-3 hidden md:table-cell">Category</th>
                      <th className="pb-3 hidden md:table-cell">Price</th>
                      <th className="pb-3 text-right pr-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map(car => (
                      <tr key={car.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 pl-2">
                          {car.image && <img src={car.image} className="w-12 h-12 rounded-lg object-cover bg-slate-700" />}
                        </td>
                        <td className="py-3 font-bold text-sm md:text-base">{car.name}</td>
                        {/* Hidden on Mobile */}
                        <td className="py-3 text-sm text-slate-400 hidden md:table-cell">{car.category}</td>
                        <td className="py-3 hidden md:table-cell">${car.price}</td>
                        
                        {/* Actions - Aligned Right */}
                        <td className="py-3 text-right pr-2">
                            <div className="flex items-center justify-end gap-3">
                              <Link href={`/admin/dashboard/edit-car/${car.id}`} className="bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-black px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                                Edit
                              </Link>
                              
                              <button onClick={() => deleteItem('cars', car.id)} className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs transition-all">
                                Delete
                              </button>
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TOURS TAB */}
        {activeTab === 'tours' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Tours List</h2>
              <button onClick={() => alert("We will build this next!")} className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors text-sm md:text-base">
                + Add Tour
              </button>
            </div>

            {tours.length === 0 ? (
              <p className="text-slate-500">No tours found in database.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 text-sm">
                      <th className="pb-3 pl-2">Image</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3 hidden md:table-cell">Location</th>
                      <th className="pb-3 text-right pr-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours.map(tour => (
                      <tr key={tour.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 pl-2">
                           {tour.image && <img src={tour.image} className="w-12 h-12 rounded-lg object-cover bg-slate-700" />}
                        </td>
                        <td className="py-3 font-bold text-sm md:text-base">{tour.name}</td>
                        <td className="py-3 text-sm text-slate-400 hidden md:table-cell">{tour.location}</td>
                        <td className="py-3 text-right pr-2">
                            <div className="flex items-center justify-end gap-3">
                                <button onClick={() => deleteItem('tours', tour.id)} className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs transition-all">
                                    Delete
                                </button>
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}