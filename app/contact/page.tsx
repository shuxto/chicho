"use client";

import React from 'react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { LucideArrowLeft, LucideMail, LucidePhone, LucideMapPin, LucideSend } from 'lucide-react';

const outfit = Outfit({ subsets: ['latin'] });

export default function ContactPage() {
  return (
    <div className={`bg-[#0f172a] min-h-screen text-white selection:bg-teal-500 selection:text-white ${outfit.className}`}>
      
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <LucideArrowLeft className="w-5 h-5" />
              <span className="font-bold text-sm">Back Home</span>
          </Link>
          <span className="font-bold tracking-wider">CONTACT</span>
          <div className="w-5"></div>
      </div>

      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LEFT: INFO */}
          <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">Talk.</span>
              </h1>
              <p className="text-slate-400 text-lg mb-12">
                  Need a custom quote? Have a question about insurance? Or just want to ask which road is best for Kazbegi? We are here.
              </p>

              <div className="space-y-8">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-white/10 text-teal-400">
                          <LucidePhone className="w-5 h-5" />
                      </div>
                      <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Call Us 24/7</p>
                          <p className="text-xl font-bold">+995 555 00 00 00</p>
                      </div>
                  </div>

                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-white/10 text-teal-400">
                          <LucideMail className="w-5 h-5" />
                      </div>
                      <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Email Us</p>
                          <p className="text-xl font-bold">hello@chicho.ge</p>
                      </div>
                  </div>

                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-white/10 text-teal-400">
                          <LucideMapPin className="w-5 h-5" />
                      </div>
                      <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Visit HQ</p>
                          <p className="text-xl font-bold">Rustaveli Ave 12, Tbilisi</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 shadow-2xl">
              <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); alert("Message sent!")}}>
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Your Name</label>
                      <input type="text" className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-teal-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
                      <input type="email" className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-teal-500 transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Message</label>
                      <textarea rows={4} className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-teal-500 transition-colors" placeholder="I want to rent a car for 5 days..." />
                  </div>
                  <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                      <LucideSend className="w-5 h-5" /> Send Message
                  </button>
              </form>
          </div>

      </div>
    </div>
  );
}