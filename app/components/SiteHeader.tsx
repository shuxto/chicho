"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LucideCar, LucideMenu, LucideSparkles, LucideZap, LucideX, 
  LucideMountain, LucideGlobe, LucideArrowRight
} from 'lucide-react';

// --- TRANSLATIONS (Only what the Header needs) ---
type LangKey = 'en' | 'ru' | 'ka' | 'he' | 'ar';

const NAV_TEXT = {
  en: { fleet: "Fleet", tours: "Georgia Tours", about: "About Us", contact: "Contact", ai_welcome: "Gamarjoba! I'm Chicho AI." },
  ru: { fleet: "Автопарк", tours: "Туры", about: "О нас", contact: "Контакты", ai_welcome: "Гамаржоба! Я Chicho AI." },
  ka: { fleet: "ავტოპარკი", tours: "ტურები", about: "ჩვენ შესახებ", contact: "კონტაქტი", ai_welcome: "გამარჯობა! მე ვარ Chicho AI." },
  he: { fleet: "צי הרכב", tours: "טיולים", about: "עלינו", contact: "צור קשר", ai_welcome: "גמרג'ובה! אני Chicho AI." },
  ar: { fleet: "الأسطول", tours: "جولات جورجيا", about: "معلومات عنا", contact: "اتصل بنا", ai_welcome: "غامارجوبا! أنا Chicho AI." }
};

export default function SiteHeader() {
  // State
  const [lang, setLang] = useState<LangKey>('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false); // <--- New state for mobile lang menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<any[]>([{ role: 'ai', text: NAV_TEXT['en'].ai_welcome }]);

  // Load language on start
  useEffect(() => {
    const savedLang = localStorage.getItem('chicho_lang') as LangKey;
    if (savedLang && NAV_TEXT[savedLang]) setLang(savedLang);
  }, []);

  // Update AI message when lang changes
  useEffect(() => {
    setAiMessages(prev => [{ ...prev[0], text: NAV_TEXT[lang].ai_welcome }, ...prev.slice(1)]);
  }, [lang]);

  const switchLanguage = (newLang: LangKey) => {
    setLang(newLang);
    localStorage.setItem('chicho_lang', newLang);
    setLangMenuOpen(false);
    setMobileLangOpen(false); // Close mobile menu too
    window.location.reload(); 
  };

  const t = NAV_TEXT[lang];
  const isRTL = lang === 'he' || lang === 'ar';

  return (
    <>
      {/* --- DESKTOP TOP NAV --- */}
      <nav className="fixed w-full z-40 top-0 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 relative z-10">
                <img src="/logo.png" alt="Chicho" className="h-10 w-auto object-contain" />
                <span className="text-lg font-bold tracking-tight">CHICHO</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <Link href="/fleet" className="hover:text-teal-400 transition-colors">{t.fleet}</Link>
                <Link href="/tours" className="hover:text-teal-400 transition-colors">{t.tours}</Link>
                <Link href="/about" className="hover:text-teal-400 transition-colors">{t.about}</Link>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">{t.contact}</Link>
                
                {/* Desktop Language Switcher */}
                <div className="relative">
                    <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-1 hover:text-white uppercase font-bold">
                        <LucideGlobe className="w-4 h-4" /> {lang}
                    </button>
                    {langMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col w-32 shadow-xl z-50">
                            {(['en', 'ru', 'ka', 'he', 'ar'] as LangKey[]).map((l) => (
                                <button key={l} onClick={() => switchLanguage(l)} className={`px-4 py-2 text-left hover:bg-slate-800 uppercase text-xs font-bold ${lang === l ? 'text-teal-400' : 'text-slate-300'}`}>
                                    {l}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button onClick={() => setAiOpen(true)} className="text-white bg-slate-800 px-4 py-2 rounded-full hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-700 ml-4">
                    <LucideSparkles className="w-4 h-4 text-teal-400" /> AI
                </button>
            </div>

            {/* Mobile Menu Toggle (Hamburger) */}
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-white relative z-10">
                <LucideMenu />
            </button>
        </div>
      </nav>

      {/* --- MOBILE BOTTOM NAV --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0f172a] border-t border-slate-800 z-50 px-6 py-4 flex justify-between items-center pb-8 shadow-2xl">
        
        {/* 1. Home Icon */}
        <Link href="/" className="flex flex-col items-center text-xs gap-1 text-slate-400 hover:text-white group">
            <LucideZap className="w-5 h-5 group-hover:text-teal-400 transition-colors" />
        </Link>
        
        {/* 2. Fleet Icon */}
        <Link href="/fleet" className="flex flex-col items-center text-xs gap-1 text-slate-400 hover:text-white group">
            <LucideCar className="w-5 h-5 group-hover:text-teal-400 transition-colors" />
        </Link>
        
        {/* 3. AI Icon (Now Standard Size) */}
        <button onClick={() => setAiOpen(true)} className="flex flex-col items-center text-xs gap-1 text-slate-400 hover:text-white group">
            <LucideSparkles className="w-5 h-5 group-hover:text-teal-400 transition-colors" />
        </button>
        
        {/* 4. Tours Icon */}
        <Link href="/tours" className="flex flex-col items-center text-xs gap-1 text-slate-400 hover:text-white group">
            <LucideMountain className="w-5 h-5 group-hover:text-teal-400 transition-colors" />
        </Link>
        
        {/* 5. Language Switcher (With Popup Menu) */}
        <div className="relative">
            {/* The Popup Menu */}
            {mobileLangOpen && (
                <div className="absolute bottom-full right-0 mb-4 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col w-24 shadow-xl z-50 animate-fade-in-up">
                    {(['en', 'ru', 'ka', 'he', 'ar'] as LangKey[]).map((l) => (
                        <button 
                            key={l} 
                            onClick={() => switchLanguage(l)} 
                            className={`px-4 py-3 text-center hover:bg-slate-800 uppercase text-xs font-bold border-b border-slate-800 last:border-0 ${lang === l ? 'text-teal-400 bg-slate-800' : 'text-slate-300'}`}
                        >
                            {l.toUpperCase()}
                        </button>
                    ))}
                </div>
            )}
            
            {/* The Button */}
            <button 
                onClick={() => setMobileLangOpen(!mobileLangOpen)} 
                className={`flex flex-col items-center text-xs gap-1 hover:text-white uppercase font-bold group ${mobileLangOpen ? 'text-teal-400' : 'text-slate-400'}`}
            >
                <div className="w-5 h-5 flex items-center justify-center border border-slate-600 rounded-full text-[10px] group-hover:border-teal-400 transition-colors">
                    {lang.toUpperCase()}
                </div>
            </button>
        </div>

      </div>

      {/* --- MOBILE FULL MENU OVERLAY --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0f172a] flex flex-col p-6 animate-fade-in text-white">
            <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-800 rounded-full"><LucideX /></button>
            </div>
            <nav className="flex flex-col gap-6 text-2xl font-bold">
                <Link onClick={() => setMobileMenuOpen(false)} href="/fleet">{t.fleet}</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/tours">{t.tours}</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/about">{t.about}</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/contact">{t.contact}</Link>
            </nav>
        </div>
      )}

      {/* --- AI MODAL --- */}
      {aiOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:px-4 text-white">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setAiOpen(false)}></div>
            <div className="relative bg-slate-900 w-full max-w-lg md:rounded-3xl rounded-t-3xl border border-slate-700 h-[80vh] flex flex-col overflow-hidden animate-slide-up shadow-2xl">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                        <span className="font-bold">Chicho AI</span>
                    </div>
                    <button onClick={() => setAiOpen(false)}><LucideX /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
                    {aiMessages.map((msg, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-teal-600 ml-auto' : 'bg-slate-800 border border-slate-700 mr-auto text-slate-200'}`}>
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
                }} className="p-4 bg-slate-900 border-t border-slate-700 pb-8 md:pb-4">
                    <div className="relative">
                        <input value={aiInput} onChange={e => setAiInput(e.target.value)} placeholder="Message..." className="w-full bg-slate-800 border border-slate-700 rounded-full pl-5 pr-12 py-3 focus:border-teal-500 outline-none placeholder-slate-500" />
                        <button className="absolute right-2 top-2 p-1.5 bg-teal-600 rounded-full"><LucideArrowRight className="w-4 h-4" /></button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </>
  );
}