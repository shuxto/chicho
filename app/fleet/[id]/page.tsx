"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  LucideArrowLeft, LucideCheckCircle, LucideShield, LucideZap, LucideX, LucideChevronLeft, LucideChevronRight
} from 'lucide-react';

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [similarCars, setSimilarCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [bookingOpen, setBookingOpen] = useState(false);

  // Lightbox States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- FETCH CAR DATA ---
  useEffect(() => {
    const fetchCarData = async () => {
      if (!id) return;

      // 1. Fetch the main car
      const { data: carData, error: carError } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (carError) {
        console.error("Error fetching car:", carError);
        setLoading(false);
        return;
      }

      setCar(carData);

      // 2. Fetch similar cars (Same category, NOT same ID)
      const { data: similarData } = await supabase
        .from('cars')
        .select('*')
        .eq('category', carData.category)
        .neq('id', id)
        .limit(3);

      setSimilarCars(similarData || []);
      setLoading(false);
    };

    fetchCarData();
  }, [id]);

  if (loading) return <div className="bg-[#0f172a] min-h-screen text-white flex items-center justify-center">Loading Machine...</div>;
  if (!car) return <div className="bg-[#0f172a] min-h-screen text-white flex items-center justify-center">Car not found.</div>;

  // --- MOCK GALLERY IMAGES (Since DB has only 1 image) ---
  const galleryImages = [
      car.image,
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop", // Generic Steering Wheel
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop", // Generic Road
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000&auto=format&fit=crop"  // Generic Interior
  ];

  const openLightbox = (index: number) => {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
  };

  const nextImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-12 pb-12 lg:h-[80vh] flex flex-col lg:flex-row">
          
          {/* Main Image (Click to Zoom) */}
          <div className="relative w-full lg:w-2/3 h-[50vh] lg:h-full bg-slate-900 cursor-zoom-in" onClick={() => openLightbox(0)}>
              <img src={car.image} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent lg:bg-gradient-to-r pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold pointer-events-none">
                  Click to Expand
              </div>
          </div>

          {/* Details Sidebar */}
          <div className="w-full lg:w-1/3 px-6 lg:px-12 flex flex-col justify-center py-8">
              <Link href="/fleet" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6">
                  <LucideArrowLeft className="w-4 h-4" /> Back to Fleet
              </Link>
              
              <div className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase mb-4 w-fit">
                  {car.category} Class
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{car.name}</h1>
              <p className="text-slate-400 mb-8">Premium Selection</p>

              <div className="flex items-end gap-2 mb-8">
                  <span className="text-4xl font-bold text-white">${car.price}</span>
                  <span className="text-slate-500 mb-1">/ day</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                  {car.specs && Object.entries(car.specs).map(([key, val]) => (
                      <div key={key} className="bg-slate-800/50 border border-white/5 p-3 rounded-xl">
                          <p className="text-xs text-slate-500 uppercase">{key}</p>
                          <p className="font-bold">{String(val)}</p>
                      </div>
                  ))}
              </div>

              <button 
                onClick={() => setBookingOpen(true)}
                className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-teal-400 hover:text-white transition-all shadow-lg shadow-teal-500/10 mb-6"
              >
                  Book This Car
              </button>

              <div className="space-y-3 text-sm text-slate-400">
                  <div className="flex items-center gap-2"><LucideCheckCircle className="w-4 h-4 text-teal-500" /> Instant Confirmation</div>
                  <div className="flex items-center gap-2"><LucideShield className="w-4 h-4 text-teal-500" /> Full Insurance Included</div>
                  <div className="flex items-center gap-2"><LucideZap className="w-4 h-4 text-teal-500" /> Free Cancellation (24h)</div>
              </div>
          </div>
      </div>

      {/* --- NEW: PHOTO GALLERY SECTION --- */}
      <section className="px-6 py-12 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-2xl font-bold mb-8">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, index) => (
                  <div key={index} onClick={() => openLightbox(index)} className="aspect-square bg-slate-800 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer hover:border-teal-500/50 transition-all">
                      <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
              ))}
          </div>
      </section>

      {/* --- SIMILAR CARS SECTION --- */}
      {similarCars.length > 0 && (
          <section className="px-6 py-20 max-w-7xl mx-auto border-t border-white/5">
              <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarCars.map((sim) => (
                      <Link href={`/fleet/${sim.id}`} key={sim.id} className="group bg-slate-800/40 border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/40 transition-all">
                          <div className="h-40 relative">
                              <img src={sim.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="p-4">
                              <h3 className="font-bold text-lg mb-1 group-hover:text-teal-400 transition-colors">{sim.name}</h3>
                              <p className="text-sm text-slate-400">${sim.price} / day</p>
                          </div>
                      </Link>
                  ))}
              </div>
          </section>
      )}

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:px-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setBookingOpen(false)}></div>
            <div className="relative bg-[#0f172a] w-full max-w-lg md:rounded-3xl rounded-t-3xl border border-white/10 p-6 animate-slide-up shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Reserve {car.name}</h3>
                    <button onClick={() => setBookingOpen(false)}><LucideX className="text-slate-400" /></button>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Request sent!'); setBookingOpen(false); }}>
                    <input required type="text" placeholder="Full Name" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:border-teal-500 outline-none" />
                    <input required type="tel" placeholder="Phone Number" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:border-teal-500 outline-none" />
                    <button className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 active:scale-95 transition-transform hover:bg-teal-50">Confirm Request</button>
                </form>
            </div>
        </div>
      )}

      {/* --- LIGHTBOX MODAL --- */}
      {lightboxOpen && (
          <div className="fixed inset-0 z-[110] bg-black flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
              <button className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-20">
                  <LucideX className="w-6 h-6" />
              </button>
              
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-20 transition-all"
              >
                  <LucideChevronLeft className="w-8 h-8" />
              </button>

              <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center p-4">
                  <img 
                    src={galleryImages[currentImageIndex]} 
                    className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                  />
              </div>

              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-20 transition-all"
              >
                  <LucideChevronRight className="w-8 h-8" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {galleryImages.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/30'}`}
                      />
                  ))}
              </div>
          </div>
      )}

    </div>
  );
}