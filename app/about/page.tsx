"use client";

import React, { useState, useEffect } from 'react';
import { LucideUsers, LucideTarget, LucideZap, LucideCar } from 'lucide-react';
import { TRANSLATIONS, LangKey } from '../lib/translations';

export default function AboutPage() {
  const [lang, setLang] = useState<LangKey>('en');
  useEffect(() => {
    const savedLang = localStorage.getItem('chicho_lang') as LangKey;
    if (savedLang && TRANSLATIONS[savedLang]) setLang(savedLang);
  }, []);
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      {/* HERO - Added padding */}
      <section className="pt-12 pb-16 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t.about_title}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              {t.about_desc}
          </p>
      </section>

      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { label: t.stat_fleet, value: "50+", icon: LucideCar },
                { label: t.stat_clients, value: "2.5k", icon: LucideUsers },
                { label: t.stat_years, value: "4", icon: LucideTarget },
                { label: t.stat_support, value: "Yes", icon: LucideZap },
            ].map((stat, i) => (
                <div key={i} className="bg-slate-900 border border-white/5 p-6 rounded-2xl text-center">
                    <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
            ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative rounded-3xl overflow-hidden h-96 border border-white/10 group">
              <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div>
              <h2 className="text-3xl font-bold mb-6">{t.mission_title}</h2>
              <div className="space-y-6 text-slate-300">
                  <p>{t.mission_text_1}</p>
                  <p>{t.mission_text_2}</p>
              </div>
          </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-24 text-center">
        <h2 className="text-2xl font-bold mb-12">{t.team_title}</h2>
        <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-slate-900 p-6 rounded-3xl border border-white/5 w-64">
                <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold">Chicho</h3>
                <p className="text-teal-400 text-sm">{t.role_founder}</p>
            </div>
             <div className="bg-slate-900 p-6 rounded-3xl border border-white/5 w-64">
                <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold">Nino</h3>
                <p className="text-teal-400 text-sm">{t.role_ops}</p>
            </div>
        </div>
      </section>
    </div>
  );
}