"use client";

import React from 'react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { LucideArrowLeft, LucideMapPin, LucideClock, LucideMountain, LucideSun, LucideNavigation } from 'lucide-react';

const outfit = Outfit({ subsets: ['latin'] });

// --- DATA: MUST SEE PLACES IN GEORGIA ---
const PLACES = [
  {
    id: 1,
    name: "Gergeti Trinity Church",
    location: "Kazbegi",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=1000&auto=format&fit=crop",
    distance: "3h from Tbilisi",
    tag: "Mountain"
  },
  {
    id: 2,
    name: "Old Tbilisi",
    location: "Tbilisi",
    image: "https://images.unsplash.com/photo-1582121657683-1123498a4481?q=80&w=1000&auto=format&fit=crop",
    distance: "City Center",
    tag: "Urban"
  },
  {
    id: 3,
    name: "Ushguli Villages",
    location: "Svaneti",
    image: "https://images.unsplash.com/photo-1532431690042-45e0d4a7c06b?q=80&w=1000&auto=format&fit=crop",
    distance: "8h from Tbilisi",
    tag: "Adventure"
  },
  {
    id: 4,
    name: "Martvili Canyon",
    location: "Samegrelo",
    image: "https://images.unsplash.com/photo-1602844558235-86f3453b3df9?q=80&w=1000&auto=format&fit=crop",
    distance: "4h from Tbilisi",
    tag: "Nature"
  },
  {
    id: 5,
    name: "Signagi City of Love",
    location: "Kakheti",
    image: "https://images.unsplash.com/photo-1629277022026-66b96e6d1912?q=80&w=1000&auto=format&fit=crop",
    distance: "2h from Tbilisi",
    tag: "Wine"
  },
  {
    id: 6,
    name: "Batumi Boulevard",
    location: "Adjara",
    image: "https://images.unsplash.com/photo-1596306499300-e27aec504066?q=80&w=1000&auto=format&fit=crop",
    distance: "5h from Tbilisi",
    tag: "Sea"
  },
  {
    id: 7,
    name: "Ananuri Fortress",
    location: "Jinvali",
    image: "https://images.unsplash.com/photo-1622368945620-3b092289659f?q=80&w=1000&auto=format&fit=crop",
    distance: "1h from Tbilisi",
    tag: "History"
  },
  {
    id: 8,
    name: "Vardzia Cave City",
    location: "Aspindza",
    image: "https://images.unsplash.com/photo-1655825066661-80f4ba342c30?q=80&w=1000&auto=format&fit=crop",
    distance: "4.5h from Tbilisi",
    tag: "History"
  }
];

export default function ToursPage() {
  return (
    <div className={`bg-[#0f172a] min-h-screen text-white selection:bg-teal-500 selection:text-white ${outfit.className}`}>
      
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <LucideArrowLeft className="w-5 h-5" />
              <span className="font-bold text-sm">Back</span>
          </Link>
          <span className="font-bold tracking-wider">GEORGIA TOURS</span>
          <div className="w-5"></div> {/* Spacer to center title */}
      </div>

      {/* HERO HERO */}
      <section className="pt-32 pb-12 px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">Sakartvelo.</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg">
              From the highest peaks of Svaneti to the vineyards of Kakheti. Take a Chicho car and explore the gem of the Caucasus.
          </p>
      </section>

      {/* PLACES GRID */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLACES.map((place) => (
                  <div key={place.id} className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-teal-500/50 transition-all cursor-pointer">
                      <img src={place.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                          <div className="flex justify-between items-start mb-2">
                              <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-1 rounded-full uppercase border border-teal-500/20 backdrop-blur-md">
                                  {place.tag}
                              </span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">{place.name}</h3>
                          <div className="flex items-center gap-4 text-xs text-slate-300">
                              <span className="flex items-center gap-1"><LucideMapPin className="w-3 h-3 text-teal-500" /> {place.location}</span>
                              <span className="flex items-center gap-1"><LucideClock className="w-3 h-3 text-teal-500" /> {place.distance}</span>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* FOOTER CTA */}
      <div className="px-6 pb-12 text-center">
          <p className="text-slate-500 text-sm mb-4">Ready to go?</p>
          <Link href="/#fleet" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-teal-500 hover:text-white transition-all">
              Rent a Car Now
          </Link>
      </div>

    </div>
  );
}