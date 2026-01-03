"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase'; 
import { 
  LucideCar, LucideMapPin, LucideSearch, LucideMenu, LucideSparkles, 
  LucideZap, LucideShield, LucideX, LucideArrowRight, LucideCalendar, 
  LucideSmartphone, LucideMountain, LucideInstagram, LucidePhone 
} from 'lucide-react';
import { Outfit } from 'next/font/google';

// Font Setup
const outfit = Outfit({ subsets: ['latin'] });

export default function Home() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  
  // AI States
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<any[]>([
    { role: 'ai', text: "Gamarjoba! I'm Chicho AI. Ask me about our cars or trips in Georgia." }
  ]);

  // --- CONNECT TO DB ---
  useEffect(() => {
    const getCars = async () => {
      // Fetch cars from Supabase
      const { data, error } = await supabase.from('cars').select('*').order('price', { ascending: true });
      if (!error) setCars(data || []);
      setLoading(false);
    };
    getCars();
  }, []);

  return (
    <div className={`bg-black min-h-screen text-white selection:bg-indigo-500 selection:text-white ${outfit.className} relative overflow-x-hidden`}>
      
      {/* --- BACKGROUND AMBIENT GLOW (Boosted Visibility) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/30 blur-[120px] rounded-full opacity-70"></div>
          <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-violet-900/20 blur-[100px] rounded-full opacity-60"></div>
      </div>

      {/* --- MOBILE APP STYLE BOTTOM NAV (Visible only on Mobile) --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-900/90 backdrop-blur-xl border-t border-white/20 z-50 px-6 py-4 flex justify-between items-center pb-8">
        <a href="#home" className="flex flex-col items-center text-xs gap-1 text-white"><LucideZap className="w-5 h-5" />Home</a>
        <a href="#fleet" className="flex flex-col items-center text-xs gap-1 text-zinc-400 hover:text-white"><LucideCar className="w-5 h-5" />Cars</a>
        <button onClick={() => setAiOpen(true)} className="flex flex-col items-center text-xs gap-1 text-indigo-400"><LucideSparkles className="w-5 h-5" />AI</button>
        <a href="#tours" className="flex flex-col items-center text-xs gap-1 text-zinc-400 hover:text-white"><LucideMountain className="w-5 h-5" />Tours</a>
      </div>

      {/* --- HEADER (Desktop & Mobile) --- */}
      <nav className="fixed w-full z-40 top-0 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 relative z-10">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-black text-lg">C</div>
                <span className="text-lg font-bold tracking-tight">CHICHO</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
                <a href="#fleet" className="hover:text-white transition-colors">Fleet</a>
                <a href="#tours" className="hover:text-white transition-colors">Georgia Tours</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <button onClick={() => setAiOpen(true)} className="text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all flex items-center gap-2 border border-white/10">
                    <LucideSparkles className="w-4 h-4 text-indigo-400" /> AI Concierge
                </button>
            </div>

            {/* Mobile Hamburger (Opens full menu) */}
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-white relative z-10">
                <LucideMenu />
            </button>
        </div>
      </nav>

      {/* --- HERO SECTION (Compact, Modern) --- */}
      <section id="home" className="pt-32 pb-12 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end gap-8 mb-12">
            <div className="md:w-2/3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    Available in Tbilisi & Batumi
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
                    Explore Georgia <br/>
                    <span className="text-zinc-500">on your terms.</span>
                </h1>
                <p className="text-lg text-zinc-300 max-w-lg">
                    Premium car rentals without the hassle. Book instantly, unlock with your phone, and drive the best roads in the Caucasus.
                </p>
            </div>
            
            {/* App CTA Card */}
            <div className="md:w-1/3 w-full">
                <div className="bg-zinc-900 border border-white/20 p-6 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-indigo-500/50 transition-all shadow-xl">
                    <div>
                        <p className="text-xs font-bold text-indigo-300 uppercase mb-1">Coming Soon</p>
                        <h3 className="text-xl font-bold text-white">The Chicho App</h3>
                        <p className="text-sm text-zinc-400 mt-1">Keyless entry & GPS tours.</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                        <LucideSmartphone className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>

        {/* Search Bar (Bento Style) */}
        <div className="bg-zinc-900 border border-white/20 p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-2 shadow-2xl">
            <div className="flex-1 bg-black/50 rounded-xl md:rounded-full px-6 py-3 flex items-center gap-3 border border-white/5 focus-within:border-indigo-500/50 transition-colors">
                <LucideMapPin className="text-zinc-400" />
                <input type="text" placeholder="Pick-up (e.g. Tbilisi Airport)" className="bg-transparent w-full outline-none text-sm placeholder-zinc-500 text-white" />
            </div>
            <div className="flex-1 bg-black/50 rounded-xl md:rounded-full px-6 py-3 flex items-center gap-3 border border-white/5 focus-within:border-indigo-500/50 transition-colors">
                <LucideCalendar className="text-zinc-400" />
                <input type="text" placeholder="Dates" onFocus={(e) => e.target.type='date'} className="bg-transparent w-full outline-none text-sm placeholder-zinc-500 text-white" />
            </div>
            <button className="bg-white text-black font-bold rounded-xl md:rounded-full px-8 py-4 md:py-3 hover:bg-zinc-200 transition-colors active:scale-95 duration-200">
                Search
            </button>
        </div>
      </section>

      {/* --- FLEET SECTION (Horizontal Scroll for Mobile) --- */}
      <section id="fleet" className="py-20 border-t border-white/10 relative z-10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
            <div className="px-6 mb-8 flex justify-between items-end">
                <h2 className="text-3xl font-bold">The Fleet</h2>
                <a href="#" className="text-sm text-indigo-400 hover:text-white">View All</a>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-4 px-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                {loading ? (
                    <div className="text-zinc-500 px-6">Loading machines...</div>
                ) : cars.map((car) => (
                    // VISIBILITY UPDATE: Lighter Background (Zinc-900) + Stronger Border
                    <div key={car.id} className="min-w-[85vw] md:min-w-[350px] snap-center bg-zinc-900 border border-white/15 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all flex flex-col shadow-lg">
                        
                        {/* Image Container with Fallback Grey Background */}
                        <div className="h-48 relative bg-zinc-800">
                            <img src={car.image} className="w-full h-full object-cover" />
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase border border-white/10">{car.category}</div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-white">{car.name}</h3>
                                <div className="flex gap-3 text-xs text-zinc-400 mb-4">
                                    {car.specs && Object.keys(car.specs).slice(0,2).map(key => (
                                        <span key={key}>• {car.specs[key]}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div>
                                    <span className="text-lg font-bold text-white">${car.price}</span>
                                    <span className="text-zinc-500 text-xs">/day</span>
                                </div>
                                <button 
                                    onClick={() => { setSelectedCar(car); setBookingOpen(true); }}
                                    className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-500 hover:text-white transition-all active:scale-95"
                                >
                                    Book
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- GEORGIA TOURS (Bento Grid) --- */}
      <section id="tours" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-8">Must See in Georgia</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {/* Card 1: Kazbegi (Large) */}
            <div className="md:col-span-2 row-span-2 relative rounded-3xl overflow-hidden group border border-white/20 shadow-lg bg-zinc-800">
                <img src="https://images.unsplash.com/photo-1565008576549-57569a49371d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white">Kazbegi Mountains</h3>
                    <p className="text-zinc-300 text-sm mt-2">Drive the Military Highway. 4x4 Recommended.</p>
                </div>
            </div>
            {/* Card 2: Tbilisi */}
            <div className="relative rounded-3xl overflow-hidden group border border-white/20 shadow-lg bg-zinc-800">
                 <img src="https://images.unsplash.com/photo-1582121657683-1123498a4481?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors flex items-end p-6">
                    <h3 className="font-bold text-white drop-shadow-md">Old Tbilisi</h3>
                 </div>
            </div>
            {/* Card 3: Batumi */}
            <div className="relative rounded-3xl overflow-hidden group border border-white/20 shadow-lg bg-zinc-800">
                 <img src="https://images.unsplash.com/photo-1596306499300-e27aec504066?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors flex items-end p-6">
                    <h3 className="font-bold text-white drop-shadow-md">Batumi Coast</h3>
                 </div>
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-zinc-900 border-t border-white/10 py-16 px-6 pb-24 md:pb-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <h2 className="text-2xl font-bold mb-4">CHICHO</h2>
                <p className="text-zinc-400 text-sm">Premium car rentals in Georgia.</p>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-white">Company</h4>
                <ul className="space-y-2 text-sm text-zinc-400">
                    <li><a href="#" className="hover:text-white">About Us</a></li>
                    <li><a href="#" className="hover:text-white">Careers</a></li>
                    <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-white">Social</h4>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><LucideInstagram className="w-5 h-5" /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><LucidePhone className="w-5 h-5" /></a>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs text-zinc-500">
            © 2026 Chicho Rentals. All rights reserved.
        </div>
      </footer>

      {/* --- MOBILE FULL MENU --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold text-white">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full text-white"><LucideX /></button>
            </div>
            <nav className="flex flex-col gap-6 text-2xl font-bold text-white">
                <a onClick={() => setMobileMenuOpen(false)} href="#home">Home</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#fleet">Our Fleet</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#tours">Georgia Tours</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#about">About Us</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#" className="text-indigo-400">Download App</a>
            </nav>
        </div>
      )}

      {/* --- BOOKING MODAL --- */}
      {bookingOpen && selectedCar && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:px-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setBookingOpen(false)}></div>
            <div className="relative bg-zinc-900 w-full max-w-lg md:rounded-3xl rounded-t-3xl border border-white/20 p-6 animate-slide-up shadow-2xl">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6 md:hidden"></div>
                
                <div className="flex gap-4 mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-zinc-800 border border-white/5 overflow-hidden">
                        <img src={selectedCar.image} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-xs text-indigo-400 font-bold uppercase mb-1">Reserve</p>
                        <h3 className="text-xl font-bold text-white">{selectedCar.name}</h3>
                        <p className="text-lg font-bold text-zinc-400">${selectedCar.price}<span className="text-sm font-normal">/day</span></p>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Request sent!'); setBookingOpen(false); }}>
                    <input required type="text" placeholder="Full Name" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white placeholder-zinc-500 focus:border-indigo-500 outline-none" />
                    <input required type="tel" placeholder="Phone Number" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white placeholder-zinc-500 focus:border-indigo-500 outline-none" />
                    <button className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 active:scale-95 transition-transform hover:bg-zinc-200">
                        Confirm Request
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* --- AI CONCIERGE MODAL --- */}
      {aiOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:px-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setAiOpen(false)}></div>
            <div className="relative bg-zinc-900 w-full max-w-lg md:rounded-3xl rounded-t-3xl border border-white/20 h-[80vh] flex flex-col overflow-hidden animate-slide-up shadow-2xl">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-zinc-900">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="font-bold text-white">Chicho AI</span>
                    </div>
                    <button onClick={() => setAiOpen(false)} className="text-white"><LucideX /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/30">
                    {aiMessages.map((msg, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-indigo-600 ml-auto text-white' : 'bg-zinc-800 border border-white/10 mr-auto text-gray-200'}`}>
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
                }} className="p-4 bg-zinc-900 border-t border-white/10 pb-8 md:pb-4">
                    <div className="relative">
                        <input value={aiInput} onChange={e => setAiInput(e.target.value)} placeholder="Message..." className="w-full bg-black border border-white/10 rounded-full pl-5 pr-12 py-3 focus:border-indigo-500 outline-none text-white placeholder-zinc-500" />
                        <button className="absolute right-2 top-2 p-1.5 bg-indigo-600 rounded-full text-white"><LucideArrowRight className="w-4 h-4" /></button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}