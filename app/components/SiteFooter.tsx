"use client";

import React from 'react';
import Link from 'next/link';
import { LucideInstagram, LucidePhone } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-16 px-6 pb-24 md:pb-16 relative z-10 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <h2 className="text-2xl font-bold mb-4">CHICHO</h2>
                <p className="text-slate-400 text-sm">Premium car rentals in Georgia.</p>
            </div>
            <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li><Link href="/about" className="hover:text-teal-400">About Us</Link></li>
                    <li><Link href="/contact" className="hover:text-teal-400">Contact</Link></li>
                    <li><Link href="/fleet" className="hover:text-teal-400">Our Fleet</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Social</h4>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors text-slate-400"><LucideInstagram className="w-5 h-5" /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors text-slate-400"><LucidePhone className="w-5 h-5" /></a>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2026 Chicho Rentals. All rights reserved.
        </div>
    </footer>
  );
}