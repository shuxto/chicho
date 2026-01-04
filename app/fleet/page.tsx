"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; 
import Link from 'next/link';
import { LucideFilter } from 'lucide-react';
import { TRANSLATIONS, LangKey } from '../lib/translations'; // <--- Import translations

export default function FleetPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Language Logic
  const [lang, setLang] = useState<LangKey>('en');
  useEffect(() => {
    const savedLang = localStorage.getItem('chicho_lang') as LangKey;
    if (savedLang && TRANSLATIONS[savedLang]) setLang(savedLang);
  }, []);
  const t = TRANSLATIONS[lang]; // <--- Get words for current language

  // UI States
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);

  useEffect(() => {
    const getCars = async () => {
      const { data, error } = await supabase.from('cars').select('*').order('price', { ascending: true });
      if (!error) setCars(data || []);
      setLoading(false);
    };
    getCars();
  }, []);

  const filteredCars = activeCategory === 'All' 
    ? cars 
    : cars.filter(car => car.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <div className="pt-12 pb-8 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      {t.fleet_title}
                  </h1>
                  <p className="text-slate-400">
                      {cars.length} {t.fleet_subtitle}
                  </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                  {['All', 'Sport', 'SUV', 'Electric'].map((cat) => {
                      let label = cat;
                      if(cat === 'All') label = t.cat_all;
                      if(cat === 'Sport') label = t.cat_sport;
                      if(cat === 'SUV') label = t.cat_suv;
                      if(cat === 'Electric') label = t.cat_electric;
                      
                      return (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                                activeCategory === cat 
                                ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-500/20' 
                                : 'bg-transparent border-white/10 text-slate-400 hover:border-teal-500 hover:text-white'
                            }`}
                        >
                            {label}
                        </button>
                      );
                  })}
              </div>
          </div>

          {loading ? (
              <div className="text-center py-20 text-slate-500">{t.fleet_loading}</div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCars.map((car) => (
                      <div key={car.id} className="bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-teal-500/40 transition-all flex flex-col shadow-xl group hover:-translate-y-2 duration-300">
                          <Link href={`/fleet/${car.id}`} className="block h-64 relative bg-slate-800 cursor-pointer">
                              <img src={car.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase border border-white/10 text-teal-300">
                                  {car.category}
                              </div>
                          </Link>

                          <div className="p-6 flex-1 flex flex-col justify-between -mt-4 relative z-10">
                              <div>
                                  <Link href={`/fleet/${car.id}`}>
                                      <h3 className="text-2xl font-bold mb-2 text-white hover:text-teal-400 transition-colors cursor-pointer">{car.name}</h3>
                                  </Link>
                                  
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
                                      <span className="text-slate-500 text-xs"> {t.per_day}</span>
                                  </div>
                                  <button 
                                      onClick={() => { setSelectedCar(car); setBookingOpen(true); }}
                                      className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold hover:bg-teal-400 hover:text-white transition-all active:scale-95 shadow-lg"
                                  >
                                      {t.book_now}
                                  </button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          )}
          
          {!loading && filteredCars.length === 0 && (
              <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-white/5">
                  <LucideFilter className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white">{t.fleet_no_cars}</h3>
                  <p className="text-slate-400">{t.fleet_no_cars_desc}</p>
              </div>
          )}
      </div>

      {/* BOOKING MODAL */}
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
                        <p className="text-xs text-teal-400 font-bold uppercase mb-1">{t.modal_reserve}</p>
                        <h3 className="text-xl font-bold text-white">{selectedCar.name}</h3>
                        <p className="text-lg font-bold text-slate-400">${selectedCar.price}<span className="text-sm font-normal">{t.per_day}</span></p>
                    </div>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Request sent!'); setBookingOpen(false); }}>
                    <input required type="text" placeholder={t.modal_name} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:border-teal-500 outline-none" />
                    <input required type="tel" placeholder={t.modal_phone} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:border-teal-500 outline-none" />
                    <button className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 active:scale-95 transition-transform hover:bg-teal-50">{t.modal_confirm}</button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}