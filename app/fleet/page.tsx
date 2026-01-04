"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; 
import Link from 'next/link';
import { 
  LucideCar, LucideMenu, LucideSparkles, LucideZap, LucideX, LucideArrowLeft, LucideFilter, LucideGlobe, LucideArrowRight
} from 'lucide-react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function FleetPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  
  // AI States (Required for Standard Nav)
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<any[]>([{ role: 'ai', text: "Hello! I'm Chicho AI." }]);

  // --- FETCH CARS ---
  useEffect(() => {
    const getCars = async () => {
      const { data, error } = await supabase.from('cars').select('*').order('price', { ascending: true });
      if (!error) setCars(data || []);
      setLoading(false);
    };
    getCars();
  }, []);

  // Filter Logic
  const filteredCars = activeCategory === 'All' 
    ? cars 
    : cars.filter(car => car.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className={`bg-[#0f172a] min-h-screen text-white selection:bg-teal-500 selection:text-white ${outfit.className}`}>
      
      {/* --- STANDARD HEADER (Same as Home) --- */}
      <nav className="fixed w-full z-40 top-0 bg-[#0f172a]/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 relative z-10">
                <div className="w-8 h-8 bg-gradient-to-tr from-teal-500 to-cyan-400 rounded-lg flex items-center justify-center text-black font-black text-lg shadow-lg shadow-teal-500/20">C</div>
                <span className="text-lg font-bold tracking-tight text-white">CHICHO</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <Link href="/fleet" className="text-teal-400 transition-colors">Fleet</Link>
                <Link href="/tours" className="hover:text-teal-400 transition-colors">Georgia Tours</Link>
                <Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link>
                
                <button onClick={() => setAiOpen(true)} className="text-white bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-all flex items-center gap-2 border border-white/10 ml-4">
                    <LucideSparkles className="w-4 h-4 text-teal-400" /> AI
                </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-white relative z-10">
                <LucideMenu />
            </button>
        </div>
      </nav>

      {/* --- MOBILE FULL MENU (Same as Home) --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0f172a]/95 backdrop-blur-xl flex flex-col p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold text-white">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full text-white"><LucideX /></button>
            </div>
            <nav className="flex flex-col gap-6 text-2xl font-bold text-white">
                <Link onClick={() => setMobileMenuOpen(false)} href="/">Home</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/fleet">Our Fleet</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/tours">Georgia Tours</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/about">About Us</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/contact">Contact</Link>
            </nav>
        </div>
      )}

      {/* PAGE TITLE & FILTERS */}
      <div className="pt-32 pb-8 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">Machine.</span>
                  </h1>
                  <p className="text-slate-400">
                      {cars.length} premium vehicles available for instant booking.
                  </p>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                  {['All', 'Sports', 'SUV', 'Electric'].map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                            activeCategory === cat 
                            ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-500/20' 
                            : 'bg-transparent border-white/10 text-slate-400 hover:border-teal-500 hover:text-white'
                        }`}
                      >
                          {cat}
                      </button>
                  ))}
              </div>
          </div>

          {/* CAR GRID */}
          {loading ? (
              <div className="text-center py-20 text-slate-500">Loading Fleet...</div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCars.map((car) => (
                      <div key={car.id} className="bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-teal-500/40 transition-all flex flex-col shadow-xl group hover:-translate-y-2 duration-300">
                          {/* Image Link */}
                          <Link href={`/fleet/${car.id}`} className="block h-64 relative bg-slate-800 cursor-pointer">
                              <img src={car.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase border border-white/10 text-teal-300">
                                  {car.category}
                              </div>
                          </Link>

                          {/* Details */}
                          <div className="p-6 flex-1 flex flex-col justify-between -mt-4 relative z-10">
                              <div>
                                  <Link href={`/fleet/${car.id}`}>
                                      <h3 className="text-2xl font-bold mb-2 text-white hover:text-teal-400 transition-colors cursor-pointer">{car.name}</h3>
                                  </Link>
                                  
                                  {/* Specs Grid */}
                                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6 text-sm text-slate-400">
                                      {car.specs && Object.keys(car.specs).map(key => (
                                          <div key={key} className="flex items-center gap-2">
                                              <div className="w-1 h-1 rounded-full bg-teal-500"></div>
                                              <span className="capitalize">{String(car.specs[key])} {key}</span>
                                          </div>
                                      ))}
                                  </div>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                  <div>
                                      <span className="text-xl font-bold text-white">${car.price}</span>
                                      <span className="text-slate-500 text-xs"> / day</span>
                                  </div>
                                  <button 
                                      onClick={() => { setSelectedCar(car); setBookingOpen(true); }}
                                      className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold hover:bg-teal-400 hover:text-white transition-all active:scale-95 shadow-lg"
                                  >
                                      Book Now
                                  </button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          )}
          
          {/* Empty State */}
          {!loading && filteredCars.length === 0 && (
              <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-white/5">
                  <LucideFilter className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white">No cars found</h3>
                  <p className="text-slate-400">Try selecting a different category.</p>
              </div>
          )}
      </div>

      {/* BOOKING MODAL (Reused) */}
      {bookingOpen && selectedCar && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:px-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setBookingOpen(false)}></div>
            <div className="relative bg-[#0f172a] w-full max-w-lg md:rounded-3xl rounded-t-3xl border border-white/10 p-6 animate-slide-up shadow-2xl">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6 md:hidden"></div>
                <div className="flex gap-4 mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-white/10 overflow-hidden">
                        <img src={selectedCar.image} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-xs text-teal-400 font-bold uppercase mb-1">Reserve</p>
                        <h3 className="text-xl font-bold text-white">{selectedCar.name}</h3>
                        <p className="text-lg font-bold text-slate-400">${selectedCar.price}<span className="text-sm font-normal">/day</span></p>
                    </div>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Request sent!'); setBookingOpen(false); }}>
                    <input required type="text" placeholder="Full Name" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:border-teal-500 outline-none" />
                    <input required type="tel" placeholder="Phone Number" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:border-teal-500 outline-none" />
                    <button className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 active:scale-95 transition-transform hover:bg-teal-50">Confirm Request</button>
                </form>
            </div>
        </div>
      )}

      {/* AI MODAL */}
      {aiOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:px-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setAiOpen(false)}></div>
            <div className="relative bg-[#0f172a] w-full max-w-lg md:rounded-3xl rounded-t-3xl border border-white/10 h-[80vh] flex flex-col overflow-hidden animate-slide-up shadow-2xl">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0f172a]">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                        <span className="font-bold text-white">Chicho AI</span>
                    </div>
                    <button onClick={() => setAiOpen(false)} className="text-white"><LucideX /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
                    {aiMessages.map((msg, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-teal-600 ml-auto text-white' : 'bg-slate-800 border border-white/10 mr-auto text-slate-200'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if(!aiInput) return;
                    setAiMessages(prev => [...prev, {role: 'user', text: aiInput}]);
                    setAiInput('');
                    setTimeout(() => setAiMessages(prev => [...prev, {role: 'ai', text: "I can check availability for that. One moment..."}]), 1000);
                }} className="p-4 bg-[#0f172a] border-t border-white/10 pb-8 md:pb-4">
                    <div className="relative">
                        <input value={aiInput} onChange={e => setAiInput(e.target.value)} placeholder="Message..." className="w-full bg-slate-900 border border-white/10 rounded-full pl-5 pr-12 py-3 focus:border-teal-500 outline-none text-white placeholder-slate-500" />
                        <button className="absolute right-2 top-2 p-1.5 bg-teal-600 rounded-full text-white"><LucideArrowRight className="w-4 h-4" /></button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}