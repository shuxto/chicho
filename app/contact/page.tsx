"use client";

import React, { useState, useEffect } from 'react';
import { LucideMail, LucidePhone, LucideMapPin, LucideSend } from 'lucide-react';
import { TRANSLATIONS, LangKey } from '../lib/translations';

export default function ContactPage() {
  const [lang, setLang] = useState<LangKey>('en');
  useEffect(() => {
    const savedLang = localStorage.getItem('chicho_lang') as LangKey;
    if (savedLang && TRANSLATIONS[savedLang]) setLang(savedLang);
  }, []);
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      {/* Main Content - Added top padding for header */}
      <div className="pt-12 pb-12 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {t.contact_title}
              </h1>
              <p className="text-slate-400 text-lg mb-12">
                  {t.contact_desc}
              </p>

              <div className="space-y-8">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-white/10 text-teal-400"><LucidePhone className="w-5 h-5" /></div>
                      <div><p className="text-xs text-slate-500 uppercase font-bold">{t.contact_call}</p><p className="text-xl font-bold">+995 555 00 00 00</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-white/10 text-teal-400"><LucideMail className="w-5 h-5" /></div>
                      <div><p className="text-xs text-slate-500 uppercase font-bold">{t.contact_email}</p><p className="text-xl font-bold">hello@chicho.ge</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border border-white/10 text-teal-400"><LucideMapPin className="w-5 h-5" /></div>
                      <div><p className="text-xs text-slate-500 uppercase font-bold">{t.contact_visit}</p><p className="text-xl font-bold">Rustaveli Ave 12, Tbilisi</p></div>
                  </div>
              </div>
          </div>

          <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 shadow-2xl">
              <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); alert("Message sent!")}}>
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.form_name}</label>
                      <input type="text" className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-teal-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.form_email}</label>
                      <input type="email" className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-teal-500 transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{t.form_message}</label>
                      <textarea rows={4} className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-4 focus:outline-none focus:border-teal-500 transition-colors" />
                  </div>
                  <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                      <LucideSend className="w-5 h-5" /> {t.form_btn}
                  </button>
              </form>
          </div>
      </div>
    </div>
  );
}