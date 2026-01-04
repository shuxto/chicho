"use client";

import React from 'react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { LucideArrowLeft, LucideUsers, LucideTarget, LucideAward, LucideZap } from 'lucide-react';

const outfit = Outfit({ subsets: ['latin'] });

export default function AboutPage() {
  return (
    <div className={`bg-[#0f172a] min-h-screen text-white selection:bg-teal-500 selection:text-white ${outfit.className}`}>
      
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <LucideArrowLeft className="w-5 h-5" />
              <span className="font-bold text-sm">Back Home</span>
          </Link>
          <span className="font-bold tracking-wider">ABOUT US</span>
          <div className="w-5"></div>
      </div>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">Passion.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Chicho Rentals started with a simple idea: Car rental in Georgia shouldn't be a headache. It should be the start of an adventure.
          </p>
      </section>

      {/* STATS */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { label: "Active Fleet", value: "50+", icon: LucideCar },
                { label: "Happy Clients", value: "2.5k", icon: LucideUsers },
                { label: "Years Active", value: "4", icon: LucideTarget },
                { label: "24/7 Support", value: "Yes", icon: LucideZap },
            ].map((stat, i) => (
                <div key={i} className="bg-slate-900 border border-white/5 p-6 rounded-2xl text-center">
                    <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
            ))}
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative rounded-3xl overflow-hidden h-96 border border-white/10 group">
              <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="space-y-6 text-slate-300">
                  <p>
                      We noticed that renting a car in Georgia was complicated. Old cars, hidden fees, and paperwork.
                  </p>
                  <p>
                      <strong>CHICHO is different.</strong> We bring technology to the driver's seat. Our entire fleet is managed digitally, ensuring that the car you see on your screen is the exact car you get.
                  </p>
                  <p>
                      Whether you are crossing the Goderdzi Pass or cruising down Rustaveli Avenue, we provide the machine you can trust.
                  </p>
              </div>
          </div>
      </section>

      {/* TEAM */}
      <section className="px-6 max-w-7xl mx-auto pb-24 text-center">
        <h2 className="text-2xl font-bold mb-12">The Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-slate-900 p-6 rounded-3xl border border-white/5 w-64">
                <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold">Chicho</h3>
                <p className="text-teal-400 text-sm">Founder</p>
            </div>
             <div className="bg-slate-900 p-6 rounded-3xl border border-white/5 w-64">
                <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold">Nino</h3>
                <p className="text-teal-400 text-sm">Head of Operations</p>
            </div>
        </div>
      </section>

    </div>
  );
}

// Helper icon
function LucideCar({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
}