"use client";

import React, { useState, useEffect } from 'react';
import { LucideCar, LucideMapPin, LucideCalendar, LucideSearch, LucideMenu, LucideX, LucideSparkles, LucideZap, LucideShield, LucideArrowRight } from 'lucide-react';

// --- DATA (We will move this to Supabase later) ---
const CARS = [
  {
    id: 1,
    name: "Porsche 911 Carrera",
    category: "sports",
    price: 450,
    image: "https://images.unsplash.com/photo-1503376763036-066120622c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: { "0-60": "3.2s", seats: "2", trans: "Auto", fuel: "Petrol" }
  },
  {
    id: 2,
    name: "Tesla Model S Plaid",
    category: "electric",
    price: 299,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: { range: "396mi", seats: "5", trans: "Auto", fuel: "Electric" }
  },
  {
    id: 3,
    name: "Range Rover Sport",
    category: "suv",
    price: 350,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: { bags: "4", seats: "5", trans: "Auto", fuel: "Diesel" }
  },
  {
    id: 4,
    name: "Mercedes AMG GT",
    category: "sports",
    price: 380,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: { "0-60": "3.6s", seats: "2", trans: "Auto", fuel: "Petrol" }
  },
  {
    id: 5,
    name: "BMW X7 M50i",
    category: "suv",
    price: 320,
    image: "https://images.unsplash.com/photo-1556189250-72ba95452242?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: { bags: "5", seats: "7", trans: "Auto", fuel: "Diesel" }
  },
  {
    id: 6,
    name: "Audi e-tron GT",
    category: "electric",
    price: 280,
    image: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: { range: "238mi", seats: "5", trans: "Auto", fuel: "Electric" }
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Modal States
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  
  // AI States
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<any[]>([
    { role: 'ai', text: "Hello! I'm the Chicho AI. Tell me about your trip plans, and I'll recommend the perfect car." }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Logic
  const filteredCars = activeCategory === 'all' 
    ? CARS 
    : CARS.filter(car => car.category === activeCategory);

  // AI Handler (Mock)
  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = aiInput;
    setAiMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setAiInput("");
    setAiLoading(true);

    // Simulate AI thinking delay
    setTimeout(() => {
        let responseText = "I recommend checking out our SUV collection for that trip.";
        let recommendedCar = null;

        if (userMsg.toLowerCase().includes("fast") || userMsg.toLowerCase().includes("sport")) {
            responseText = "For speed and style, nothing beats the Porsche 911. Ideally suited for coastal drives.";
            recommendedCar = CARS[0];
        } else if (userMsg.toLowerCase().includes("family") || userMsg.toLowerCase().includes("bags")) {
            responseText = "For a family trip with luggage, the Range Rover Sport offers the best comfort and space.";
            recommendedCar = CARS[2];
        } else if (userMsg.toLowerCase().includes("eco") || userMsg.toLowerCase().includes("electric")) {
             responseText = "The Tesla Model S Plaid is perfect for eco-friendly touring with incredible range.";
             recommendedCar = CARS[1];
        }

        const newMsg = {
            role: 'ai',
            text: responseText,
            recommendation: recommendedCar
        };
        
        setAiMessages(prev => [...prev, newMsg]);
        setAiLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-white/10 ${isScrolled ? 'bg-slate-900/90 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-2">
                    <LucideZap className="text-indigo-500 w-8 h-8" />
                    <span className="text-2xl font-bold tracking-tight">CHICHO</span>
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:block">
                    <div className="ml-10 flex items-center space-x-8">
                        {['Home', 'Fleet', 'Services'].map((item) => (
                           <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-400 transition-colors px-3 py-2 text-sm font-medium">{item}</a>
                        ))}
                        <button 
                            onClick={() => setAiOpen(true)}
                            className="bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                        >
                            <LucideSparkles className="w-4 h-4" /> AI Concierge
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white">
                        <LucideMenu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
             <div className="md:hidden bg-slate-800 border-b border-slate-700">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {['Home', 'Fleet', 'Services'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{item}</a>
                    ))}
                    <button onClick={() => {setAiOpen(true); setMobileMenuOpen(false);}} className="text-indigo-400 font-bold block px-3 py-2 w-full text-left flex items-center gap-2">
                         <LucideSparkles className="w-4 h-4" /> AI Concierge
                    </button>
                </div>
            </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
            <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Hero" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-20">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6 animate-bounce">
                ✨ Premium Fleet 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white">
                Drive the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Extraordinary</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 mb-10 font-light">
                Experience the thrill of the world's most exclusive cars. Instant booking, seamless delivery.
            </p>

            {/* Search Widget */}
            <div className="bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <LucideMapPin className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                        <input type="text" placeholder="Pick-up Location" className="w-full bg-slate-900/80 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div className="relative">
                        <LucideCalendar className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                         <input type="date" className="w-full bg-slate-900/80 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-slate-400" />
                    </div>
                     <div className="relative">
                        <LucideCalendar className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                        <input type="date" className="w-full bg-slate-900/80 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-slate-400" />
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl py-3 shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
                        <LucideSearch className="w-5 h-5" /> Search
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* --- FLEET SECTION --- */}
      <section id="fleet" className="py-24 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Fleet</h2>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {['all', 'sports', 'suv', 'electric'].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full border transition-all capitalize ${activeCategory === cat ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-700 text-slate-400 hover:border-indigo-500'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map((car) => (
                    <div key={car.id} className="bg-slate-800/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-indigo-500/50 transition-all duration-300 group">
                        <div className="relative h-56 overflow-hidden">
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold border border-white/10 uppercase">
                                {car.category}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white">{car.name}</h3>
                                <div className="text-right">
                                    <p className="text-indigo-400 font-bold text-xl">${car.price}</p>
                                    <p className="text-slate-500 text-xs">/ day</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-slate-400">
                                {Object.entries(car.specs).map(([key, val]) => (
                                    <div key={key} className="flex items-center gap-2 capitalize">
                                        <span className="text-slate-600">•</span> {val} {key}
                                    </div>
                                ))}
                            </div>

                            <button 
                                onClick={() => { setSelectedCar(car); setBookingOpen(true); }}
                                className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-indigo-500 hover:text-white transition-all duration-300"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- SERVICES / FEATURES --- */}
      <section id="services" className="py-24 bg-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="p-6">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-500">
                        <LucideZap className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
                    <p className="text-slate-400 text-sm">Skip the counter. Book via app and unlock your car instantly with your phone.</p>
                </div>
                <div className="p-6">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-500">
                         <LucideShield className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Fully Insured</h3>
                    <p className="text-slate-400 text-sm">Every rental includes comprehensive insurance and 24/7 roadside assistance.</p>
                </div>
                <div className="p-6">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-500">
                         <LucideMapPin className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Anywhere Delivery</h3>
                    <p className="text-slate-400 text-sm">We deliver your chosen vehicle directly to your doorstep, airport, or hotel.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800 text-center">
          <p className="text-slate-500">© 2024 CHICHO Rentals.</p>
      </footer>

      {/* --- BOOKING MODAL --- */}
      {bookingOpen && selectedCar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setBookingOpen(false)}></div>
            <div className="relative bg-slate-800 w-full max-w-lg rounded-2xl p-6 border border-slate-700 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Book {selectedCar.name}</h3>
                    <button onClick={() => setBookingOpen(false)} className="text-slate-400 hover:text-white"><LucideX /></button>
                </div>
                <div className="space-y-4">
                    <div className="bg-slate-900 p-4 rounded-xl flex justify-between items-center border border-slate-700">
                         <span>Daily Rate</span>
                         <span className="text-indigo-400 font-bold">${selectedCar.price}</span>
                    </div>
                    <input type="text" placeholder="Full Name" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none text-white" />
                    <input type="email" placeholder="Email Address" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none text-white" />
                    <button onClick={() => {alert('Booking request sent!'); setBookingOpen(false);}} className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold mt-4">Confirm Request</button>
                </div>
            </div>
        </div>
      )}

      {/* --- AI CONCIERGE MODAL --- */}
      {aiOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setAiOpen(false)}></div>
            <div className="relative bg-slate-900 w-full max-w-xl rounded-2xl border border-indigo-500/30 shadow-2xl overflow-hidden flex flex-col h-[600px]">
                {/* Header */}
                <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center"><LucideSparkles className="w-4 h-4 text-white" /></div>
                        <h3 className="font-bold">AI Concierge</h3>
                    </div>
                    <button onClick={() => setAiOpen(false)} className="text-slate-400 hover:text-white"><LucideX /></button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {aiMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700'}`}>
                                <p className="text-sm">{msg.text}</p>
                                {msg.recommendation && (
                                    <div className="mt-3 bg-slate-900 p-3 rounded-xl border border-slate-700">
                                        <p className="text-xs text-indigo-400 font-bold mb-1">RECOMMENDATION</p>
                                        <div className="flex gap-3 items-center">
                                            <img src={msg.recommendation.image} className="w-12 h-12 rounded-lg object-cover" />
                                            <div>
                                                <p className="font-bold text-white text-sm">{msg.recommendation.name}</p>
                                                <p className="text-xs text-slate-500">${msg.recommendation.price}/day</p>
                                            </div>
                                        </div>
                                        <button onClick={() => {setAiOpen(false); setSelectedCar(msg.recommendation); setBookingOpen(true);}} className="w-full mt-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 text-xs py-2 rounded-lg transition-colors">Book This Car</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {aiLoading && (
                         <div className="flex justify-start">
                            <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 text-slate-500 text-sm">
                                Typing...
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleAiSubmit} className="p-4 bg-slate-800 border-t border-slate-700">
                    <div className="relative">
                        <input 
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                            type="text" 
                            placeholder="Describe your trip..." 
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-12 py-3 focus:border-indigo-500 focus:outline-none text-white" 
                        />
                        <button type="submit" className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white"><LucideArrowRight className="w-4 h-4" /></button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}