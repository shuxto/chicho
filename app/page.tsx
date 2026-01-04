"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase'; 
import Link from 'next/link';
import { 
  LucideCar, LucideMapPin, LucideSearch, LucideMenu, LucideSparkles, 
  LucideZap, LucideShield, LucideX, LucideArrowRight, LucideCalendar, 
  LucideSmartphone, LucideMountain, LucideInstagram, LucidePhone, LucideGlobe
} from 'lucide-react';
import { Outfit } from 'next/font/google';

// Font Setup
const outfit = Outfit({ subsets: ['latin'] });

// --- TRANSLATIONS CONFIGURATION ---
type LangKey = 'en' | 'ru' | 'ka' | 'he' | 'ar';

const TRANSLATIONS = {
  en: {
    nav_fleet: "Fleet",
    nav_tours: "Georgia Tours",
    nav_about: "About Us",
    nav_contact: "Contact",
    hero_badge: "Live in Tbilisi & Batumi",
    hero_title_1: "Drive the",
    hero_title_2: "Extraordinary.",
    hero_desc: "Premium rentals. 24/7 Delivery. No paperwork. Experience Georgia with the ultimate freedom.",
    search_pickup: "Pick-up (e.g. Tbilisi Airport)",
    search_dates: "Dates",
    search_btn: "Search Cars",
    fleet_title: "The Fleet",
    fleet_subtitle: "Curated Selection",
    fleet_view: "View All Cars",
    fleet_loading: "Loading machines...",
    fleet_day: "/day",
    fleet_book: "Book",
    tours_title: "Must See in Georgia",
    tour_btn: "Start Discovery",
    footer_desc: "Premium car rentals in Georgia.",
    footer_company: "Company",
    footer_social: "Social",
    modal_reserve: "Reserve",
    modal_name: "Full Name",
    modal_phone: "Phone Number",
    modal_confirm: "Confirm Request",
    ai_welcome: "Gamarjoba! I'm Chicho AI. Ask me about our cars or trips in Georgia.",
    coming_soon: "Coming Soon",
    app_title: "Unlock the road.",
    app_desc: "Manage your bookings, unlock cars keylessly, and track your trips all in one place.",
    features_title: "Why Choose Chicho",
    feat_1_title: "Instant Booking",
    feat_1_desc: "No counters. No queues. Just book and drive.",
    feat_2_title: "Fully Insured",
    feat_2_desc: "Comprehensive coverage included in every rental.",
    feat_3_title: "Anywhere Delivery",
    feat_3_desc: "We bring the car to your hotel or airport.",
    about_title: "More Than Just Rentals",
    about_desc: "We are a team of locals passionate about cars and our country. We don't just give you keys; we give you the keys to uncover the hidden gems of Georgia.",
    about_btn: "Read Our Story"
  },
  ru: {
    nav_fleet: "Автопарк",
    nav_tours: "Туры",
    nav_about: "О нас",
    nav_contact: "Контакты",
    hero_badge: "Работаем в Тбилиси и Батуми",
    hero_title_1: "Управляй",
    hero_title_2: "Мечтой.",
    hero_desc: "Премиум прокат. Доставка 24/7. Без бумаг. Почувствуй свободу в Грузии.",
    search_pickup: "Место (напр. Аэропорт Тбилиси)",
    search_dates: "Даты",
    search_btn: "Найти авто",
    fleet_title: "Автопарк",
    fleet_subtitle: "Наш выбор",
    fleet_view: "Все авто",
    fleet_loading: "Загрузка...",
    fleet_day: "/день",
    fleet_book: "Бронь",
    tours_title: "Места для посещения",
    tour_btn: "Открыть Грузию",
    footer_desc: "Премиум прокат авто в Грузии.",
    footer_company: "Компания",
    footer_social: "Соцсети",
    modal_reserve: "Забронировать",
    modal_name: "ФИО",
    modal_phone: "Телефон",
    modal_confirm: "Подтвердить",
    ai_welcome: "Гамаржоба! Я Chicho AI. Спросите меня об авто или турах.",
    coming_soon: "Скоро",
    app_title: "Приложение Chicho",
    app_desc: "Бесключевой доступ и GPS туры.",
    features_title: "Почему Chicho",
    feat_1_title: "Мгновенная бронь",
    feat_1_desc: "Без очередей. Просто бронируйте и езжайте.",
    feat_2_title: "Полная страховка",
    feat_2_desc: "Полное покрытие включено в каждую аренду.",
    feat_3_title: "Доставка везде",
    feat_3_desc: "Привезем авто в отель или аэропорт.",
    about_title: "Больше чем прокат",
    about_desc: "Мы команда местных жителей, влюбленных в авто и свою страну. Мы даем не просто ключи, а возможность открыть скрытые жемчужины Грузии.",
    about_btn: "Наша история"
  },
  ka: {
    nav_fleet: "ავტოპარკი",
    nav_tours: "ტურები",
    nav_about: "ჩვენ შესახებ",
    nav_contact: "კონტაქტი",
    hero_badge: "თბილისსა და ბათუმში",
    hero_title_1: "მართე",
    hero_title_2: "გამორჩეული.",
    hero_desc: "პრემიუმ გაქირავება. 24/7 მიწოდება. ქაღალდების გარეშე. იგრძენი თავისუფლება.",
    search_pickup: "ადგილი (მაგ. თბილისის აეროპორტი)",
    search_dates: "თარიღები",
    search_btn: "ძებნა",
    fleet_title: "ავტოპარკი",
    fleet_subtitle: "რჩეული ავტომობილები",
    fleet_view: "ნახე ყველა",
    fleet_loading: "იტვირთება...",
    fleet_day: "/დღე",
    fleet_book: "ჯავშანი",
    tours_title: "აუცილებლად სანახავი",
    tour_btn: "აღმოაჩინე საქართველო",
    footer_desc: "პრემიუმ ავტო გაქირავება.",
    footer_company: "კომპანია",
    footer_social: "სოც. ქსელები",
    modal_reserve: "დაჯავშნა",
    modal_name: "სახელი გვარი",
    modal_phone: "ნომერი",
    modal_confirm: "დადასტურება",
    ai_welcome: "გამარჯობა! მე ვარ Chicho AI. მკითხეთ მანქანებზე ან ტურებზე.",
    coming_soon: "მალე",
    app_title: "Chicho აპლიკაცია",
    app_desc: "გასაღების გარეშე წვდომა და GPS.",
    features_title: "რატომ Chicho",
    feat_1_title: "მყისიერი ჯავშანი",
    feat_1_desc: "რიგების გარეშე. დაჯავშნე და წაიყვანე.",
    feat_2_title: "სრული დაზღვევა",
    feat_2_desc: "ყველა მანქანა დაზღვეულია.",
    feat_3_title: "მიწოდება ყველგან",
    feat_3_desc: "მოგვიყვანთ მანქანას სასტუმროსა თუ აეროპორტში.",
    about_title: "მეტ ვიდრე გაქირავება",
    about_desc: "ჩვენ ვართ გუნდი, რომელსაც უყვარს მანქანები და საქართველო. ჩვენ გაძლევთ საშუალებას აღმოაჩინოთ ქვეყნის სილამაზე.",
    about_btn: "ჩვენი ისტორია"
  },
  he: {
    nav_fleet: "צי הרכב",
    nav_tours: "טיולים",
    nav_about: "עלינו",
    nav_contact: "צור קשר",
    hero_badge: "זמין בטביליסי ובאטומי",
    hero_title_1: "נהג ב",
    hero_title_2: "יוצא דופן.",
    hero_desc: "השכרת רכב פרימיום. משלוח 24/7. ללא ניירת. חווה את גאורגיה בחופש מוחלט.",
    search_pickup: "איסוף (למשל נמל תעופה)",
    search_dates: "תאריכים",
    search_btn: "חפש רכבים",
    fleet_title: "צי הרכב",
    fleet_subtitle: "מבחר מומלץ",
    fleet_view: "הכל",
    fleet_loading: "טוען רכבים...",
    fleet_day: "/יום",
    fleet_book: "הזמן",
    tours_title: "חובה לראות בגאורגיה",
    tour_btn: "התחל לגלות",
    footer_desc: "השכרת רכב פרימיום בגאורגיה.",
    footer_company: "חברה",
    footer_social: "חברתי",
    modal_reserve: "שריון",
    modal_name: "שם מלא",
    modal_phone: "מספר טלפון",
    modal_confirm: "אשר בקשה",
    ai_welcome: "גמרג'ובה! אני Chicho AI. שאל אותי על רכבים או טיולים.",
    coming_soon: "בקרוב",
    app_title: "אפליקציית Chicho",
    app_desc: "כניסה ללא מפתח וסיורי GPS.",
    features_title: "למה לבחור בנו",
    feat_1_title: "הזמנה מיידית",
    feat_1_desc: "בלי תורים. פשוט הזמן וסע.",
    feat_2_title: "ביטוח מלא",
    feat_2_desc: "כיסוי מקיף כלול בכל השכרה.",
    feat_3_title: "משלוח לכל מקום",
    feat_3_desc: "נביא את הרכב למלון או לשדה התעופה שלך.",
    about_title: "יותר מסתם השכרה",
    about_desc: "אנחנו צוות של מקומיים שאוהבים מכוניות ואת המדינה שלנו. אנחנו נותנים לך את המפתחות לגלות את גאורגיה.",
    about_btn: "הסיפור שלנו"
  },
  ar: {
    nav_fleet: "الأسطول",
    nav_tours: "جولات جورجيا",
    nav_about: "معلومات عنا",
    nav_contact: "اتصل بنا",
    hero_badge: "متاح في تبليسي وباتومي",
    hero_title_1: "قُد",
    hero_title_2: "الاستثنائي.",
    hero_desc: "تأجير سيارات فاخرة. توصيل 24/7. بدون أوراق. اختبر جورجيا بحرية مطلقة.",
    search_pickup: "الاستلام (مثل مطار تبليسي)",
    search_dates: "التواريخ",
    search_btn: "بحث سيارات",
    fleet_title: "الأسطول",
    fleet_subtitle: "تشكيلة مختارة",
    fleet_view: "عرض الكل",
    fleet_loading: "جاري التحميل...",
    fleet_day: "/يوم",
    fleet_book: "احجز",
    tours_title: "يجب رؤيته في جورجيا",
    tour_btn: "ابدأ الاكتشاف",
    footer_desc: "تأجير سيارات فاخرة في جورجيا.",
    footer_company: "الشركة",
    footer_social: "تواصل اجتماعي",
    modal_reserve: "حجز",
    modal_name: "الاسم الكامل",
    modal_phone: "رقم الهاتف",
    modal_confirm: "تأكيد الطلب",
    ai_welcome: "غامارجوبا! أنا Chicho AI. اسألني عن السيارات أو الرحلات.",
    coming_soon: "قريباً",
    app_title: "تطبيق Chicho",
    app_desc: "دخول بدون مفتاح وجولات GPS.",
    features_title: "لماذا تختارنا",
    feat_1_title: "حجز فوري",
    feat_1_desc: "لا طوابير. فقط احجز وانطلق.",
    feat_2_title: "تأمين شامل",
    feat_2_desc: "تغطية شاملة مشمولة في كل عملية استئجار.",
    feat_3_title: "توصيل لأي مكان",
    feat_3_desc: "نحضر السيارة إلى فندقك أو المطار.",
    about_title: "أكثر من مجرد تأجير",
    about_desc: "نحن فريق من السكان المحليين الشغوفين بالسيارات وبلدنا. نمنحك المفاتيح لاكتشاف جواهر جورجيا.",
    about_btn: "قصتنا"
  }
};

export default function Home() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Language State
  const [lang, setLang] = useState<LangKey>('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  
  // AI States
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<any[]>([
    { role: 'ai', text: TRANSLATIONS['en'].ai_welcome }
  ]);

  // Derived Values
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'he' || lang === 'ar';

  // --- PERSIST LANGUAGE ---
  useEffect(() => {
    // Load language from LocalStorage on start
    const savedLang = localStorage.getItem('chicho_lang') as LangKey;
    if (savedLang && TRANSLATIONS[savedLang]) {
      setLang(savedLang);
    }
  }, []);

  const switchLanguage = (newLang: LangKey) => {
    setLang(newLang);
    localStorage.setItem('chicho_lang', newLang); // Save to storage
    setLangMenuOpen(false);
  };

  // --- CONNECT TO DB ---
  useEffect(() => {
    const getCars = async () => {
      const { data, error } = await supabase.from('cars').select('*').order('price', { ascending: true });
      if (!error) setCars(data || []);
      setLoading(false);
    };
    getCars();
  }, []);

  // Update AI welcome message when language changes
  useEffect(() => {
    setAiMessages([{ role: 'ai', text: t.ai_welcome }]);
  }, [lang]);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`bg-[#0f172a] min-h-screen text-white selection:bg-teal-500 selection:text-white ${outfit.className} relative overflow-x-hidden`}>
      
      {/* --- BACKGROUND IMAGE & OVERLAY (Fixed for Visibility) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493238792015-1a7d49552c67?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          {/* Slightly darkened overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/95 to-[#0f172a]/90"></div>
      </div>

      {/* --- MOBILE APP BOTTOM NAV (Solid Background) --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0f172a] border-t border-slate-800 z-50 px-6 py-4 flex justify-between items-center pb-8 shadow-2xl">
        <a href="#home" className="flex flex-col items-center text-xs gap-1 text-teal-400"><LucideZap className="w-5 h-5" /></a>
        <a href="#fleet" className="flex flex-col items-center text-xs gap-1 text-slate-400 hover:text-white"><LucideCar className="w-5 h-5" /></a>
        <button onClick={() => setAiOpen(true)} className="flex flex-col items-center text-xs gap-1 text-white bg-gradient-to-r from-teal-500 to-cyan-500 p-3 -mt-6 rounded-full shadow-lg shadow-teal-500/20"><LucideSparkles className="w-5 h-5" /></button>
        <Link href="/tours" className="flex flex-col items-center text-xs gap-1 text-slate-400 hover:text-white"><LucideMountain className="w-5 h-5" /></Link>
        {/* Mobile Lang Toggle */}
        <button 
            onClick={() => {
                const langs: LangKey[] = ['en', 'ru', 'ka', 'he', 'ar'];
                const next = langs[(langs.indexOf(lang) + 1) % langs.length];
                switchLanguage(next);
            }} 
            className="flex flex-col items-center text-xs gap-1 text-slate-400 hover:text-white uppercase font-bold"
        >
            <div className="w-5 h-5 flex items-center justify-center border border-slate-600 rounded-full text-[10px]">{lang.toUpperCase()}</div>
        </button>
      </div>

      {/* --- HEADER (Desktop & Mobile - Solid) --- */}
      <nav className="fixed w-full z-40 top-0 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 relative z-10">
                <div className="w-8 h-8 bg-gradient-to-tr from-teal-500 to-cyan-400 rounded-lg flex items-center justify-center text-black font-black text-lg shadow-lg shadow-teal-500/20">C</div>
                <span className="text-lg font-bold tracking-tight text-white">CHICHO</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <a href="#fleet" className="hover:text-teal-400 transition-colors">{t.nav_fleet}</a>
                <Link href="/tours" className="hover:text-teal-400 transition-colors">{t.nav_tours}</Link>
                <Link href="/about" className="hover:text-teal-400 transition-colors">{t.nav_about}</Link>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">{t.nav_contact}</Link>
                
                {/* Language Switcher Desktop */}
                <div className="relative">
                    <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-1 hover:text-white uppercase font-bold">
                        <LucideGlobe className="w-4 h-4" /> {lang}
                    </button>
                    {langMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex flex-col w-32 shadow-xl z-50">
                            {(['en', 'ru', 'ka', 'he', 'ar'] as LangKey[]).map((l) => (
                                <button 
                                    key={l} 
                                    onClick={() => switchLanguage(l)}
                                    className={`px-4 py-2 text-left hover:bg-slate-800 flex items-center gap-2 ${lang === l ? 'text-teal-400' : 'text-slate-300'}`}
                                >
                                    <span className="uppercase text-xs font-bold">{l}</span>
                                    {l === 'en' && '🇺🇸'}
                                    {l === 'ru' && '🇷🇺'}
                                    {l === 'ka' && '🇬🇪'}
                                    {l === 'he' && '🇮🇱'}
                                    {l === 'ar' && '🇸🇦'}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button onClick={() => setAiOpen(true)} className="text-white bg-slate-800 px-4 py-2 rounded-full hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-700 ml-4">
                    <LucideSparkles className="w-4 h-4 text-teal-400" /> AI
                </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-white relative z-10">
                <LucideMenu />
            </button>
        </div>
      </nav>

      {/* --- HERO SECTION (Dark BG) --- */}
      <section id="home" className="pt-32 pb-12 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end gap-8 mb-12">
            <div className="w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-medium text-teal-300 mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    {t.hero_badge}
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-2xl text-white">
                    {t.hero_title_1} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">{t.hero_title_2}</span>
                </h1>
                <p className="text-lg text-slate-300 max-w-lg">
                    {t.hero_desc}
                </p>
            </div>
        </div>

        {/* Search Bar - Solid */}
        <div className="bg-slate-800 border border-slate-700 p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-2 shadow-2xl">
            <div className="flex-1 bg-slate-900 rounded-xl md:rounded-full px-6 py-3 flex items-center gap-3 border border-slate-800 focus-within:border-teal-500/50 transition-colors">
                <LucideMapPin className="text-teal-400 shrink-0" />
                <input type="text" placeholder={t.search_pickup} className="bg-transparent w-full outline-none text-sm placeholder-slate-400 text-white" />
            </div>
            <div className="flex-1 bg-slate-900 rounded-xl md:rounded-full px-6 py-3 flex items-center gap-3 border border-slate-800 focus-within:border-teal-500/50 transition-colors">
                <LucideCalendar className="text-teal-400 shrink-0" />
                <input type="text" placeholder={t.search_dates} onFocus={(e) => e.target.type='date'} className="bg-transparent w-full outline-none text-sm placeholder-slate-400 text-white" />
            </div>
            <button className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl md:rounded-full px-8 py-4 md:py-3 hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95 duration-200 shrink-0">
                {t.search_btn}
            </button>
        </div>
      </section>

      {/* --- FLEET SECTION (Slightly Lighter Dark BG) --- */}
      <section id="fleet" className="py-20 border-t border-slate-800 relative z-10 bg-slate-900">
        <div className="max-w-7xl mx-auto">
            <div className="px-6 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold">{t.fleet_title}</h2>
                    <p className="text-xs text-slate-400 mt-1">{t.fleet_subtitle}</p>
                </div>
            </div>

            {/* --- NEW GRID LAYOUT (Solid Cards) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {loading ? (
                    <div className="text-slate-500 col-span-full text-center py-12">{t.fleet_loading}</div>
                ) : cars.slice(0, 9).map((car) => (
                    // CARD STYLE: SOLID BACKGROUND (Slate-800)
                    <div key={car.id} className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden hover:border-teal-500/40 transition-all flex flex-col shadow-xl group hover:-translate-y-2 duration-300">
                        {/* LINK TO DETAILS PAGE */}
                        <Link href={`/fleet/${car.id}`} className="block h-52 relative bg-slate-900 cursor-pointer">
                            <img src={car.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-black/80 px-3 py-1 rounded-full text-xs font-bold uppercase border border-slate-700 text-teal-300`}>{car.category}</div>
                        </Link>

                        <div className="p-5 flex-1 flex flex-col justify-between -mt-4 relative z-10">
                            <div>
                                <Link href={`/fleet/${car.id}`}>
                                    <h3 className="text-xl font-bold mb-1 text-white hover:text-teal-400 transition-colors cursor-pointer">{car.name}</h3>
                                </Link>
                                <div className="flex gap-3 text-xs text-slate-400 mb-4">
                                    {car.specs && Object.keys(car.specs).slice(0,2).map(key => (
                                        <span key={key}>• {car.specs[key]}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div>
                                    <span className="text-lg font-bold text-white">${car.price}</span>
                                    <span className="text-slate-500 text-xs">{t.fleet_day}</span>
                                </div>
                                <button 
                                    onClick={() => { setSelectedCar(car); setBookingOpen(true); }}
                                    className="bg-white text-slate-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-teal-400 hover:text-white transition-all active:scale-95"
                                >
                                    {t.fleet_book}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- VIEW ALL BUTTON --- */}
            <div className="mt-16 text-center">
                <Link href="/fleet" className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-600 hover:border-teal-500 transition-all group">
                    {t.fleet_view} <LucideArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
      </section>

      {/* --- SERVICES / FEATURES SECTION (Darker BG) --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800 bg-[#0f172a]">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">{t.features_title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col items-center text-center hover:border-teal-500/30 transition-all shadow-lg">
                  <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 mb-6">
                      <LucideZap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.feat_1_title}</h3>
                  <p className="text-slate-400 text-sm">{t.feat_1_desc}</p>
              </div>
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col items-center text-center hover:border-teal-500/30 transition-all shadow-lg">
                  <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 mb-6">
                      <LucideShield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.feat_2_title}</h3>
                  <p className="text-slate-400 text-sm">{t.feat_2_desc}</p>
              </div>
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col items-center text-center hover:border-teal-500/30 transition-all shadow-lg">
                  <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 mb-6">
                      <LucideMapPin className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.feat_3_title}</h3>
                  <p className="text-slate-400 text-sm">{t.feat_3_desc}</p>
              </div>
          </div>
      </section>

      {/* --- TEASER SECTION (Solid BG & Re-designed) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden h-[500px] group border border-slate-700 shadow-2xl">
            {/* Background Image */}
            <img 
                src="https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=2000&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt="Kazbegi Georgia"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 hover:bg-black/40 transition-colors flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-2xl tracking-tight">
                    {t.tours_title}
                </h2>
                <Link 
                    href="/tours" 
                    className="inline-flex items-center gap-3 bg-teal-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-teal-500 hover:scale-105 transition-all shadow-xl"
                >
                    {t.tour_btn} <LucideArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
      </section>

      {/* --- ABOUT US TEASER (Solid Card) --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-16 text-center shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-white">{t.about_title}</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                  {t.about_desc}
              </p>
              <Link href="/about" className="text-teal-400 font-bold hover:text-white transition-colors flex items-center justify-center gap-2 text-lg">
                  {t.about_btn} <LucideArrowRight className="w-5 h-5" />
              </Link>
          </div>
      </section>

      {/* --- APP DOWNLOAD BANNER (RESTORED TO ORIGINAL HTML STYLE) --- */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-600"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">{t.app_title}<br/>{t.app_desc}</h2>
                <div className="flex gap-4">
                    <button className="bg-[#0f172a] text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800 transition-colors border border-slate-700 shadow-lg">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.8-1.31.05-2.3-1.3-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.68-.83 1.14-1.99.94-3.14-1.02.04-2.22.68-2.93 1.52-.63.75-1.19 1.94-.99 3.07 1.14.09 2.3-.64 2.98-1.45z"/></svg>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-wider text-gray-400">Download on the</div>
                            <div className="text-sm font-bold leading-none">App Store</div>
                        </div>
                    </button>
                    <button className="bg-[#0f172a] text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800 transition-colors border border-slate-700 shadow-lg">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.15L13.69,12L3.84,21.85C3.34,21.6,3,21.09,3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08,20.75,11.5,20.75,12C20.75,12.5,20.5,12.92,20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-wider text-gray-400">Get it on</div>
                            <div className="text-sm font-bold leading-none">Google Play</div>
                        </div>
                    </button>
                </div>
            </div>
            <div className="md:w-1/2 flex justify-center relative">
                {/* Abstract Phone Mockup */}
                <div className="w-64 h-[400px] border-8 border-slate-900 rounded-[3rem] bg-slate-800 overflow-hidden shadow-2xl relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-20"></div>
                    <img src="https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover opacity-80" alt="App Screen" />
                    <div className="absolute bottom-10 left-0 right-0 px-6 text-center">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                            <h4 className="font-bold text-sm text-white">Booking Confirmed</h4>
                            <p className="text-xs text-gray-300 mt-1">Porsche 911 Carrera is on the way.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

      {/* --- FOOTER (Solid) --- */}
      <footer className="bg-slate-950 border-t border-slate-800 py-16 px-6 pb-24 md:pb-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-white">CHICHO</h2>
                <p className="text-slate-400 text-sm">{t.footer_desc}</p>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-white">{t.footer_company}</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li><Link href="/about" className="hover:text-teal-400">{t.nav_about}</Link></li>
                    <li><Link href="/contact" className="hover:text-teal-400">{t.nav_contact}</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4 text-white">{t.footer_social}</h4>
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

      {/* --- MOBILE FULL MENU (Solid) --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0f172a] flex flex-col p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold text-white">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-800 rounded-full text-white"><LucideX /></button>
            </div>
            <nav className="flex flex-col gap-6 text-2xl font-bold text-white">
                <a onClick={() => setMobileMenuOpen(false)} href="#home">{t.nav_fleet}</a>
                <Link onClick={() => setMobileMenuOpen(false)} href="/tours">{t.nav_tours}</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/about">{t.nav_about}</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/contact">{t.nav_contact}</Link>
            </nav>
        </div>
      )}

      {/* --- BOOKING MODAL --- */}
      {bookingOpen && selectedCar && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:px-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setBookingOpen(false)}></div>
            <div className="relative bg-slate-900 w-full max-w-lg md:rounded-3xl rounded-t-3xl border border-slate-700 p-6 animate-slide-up shadow-2xl">
                <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-6 md:hidden"></div>
                <div className="flex gap-4 mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden">
                        <img src={selectedCar.image} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-xs text-teal-400 font-bold uppercase mb-1">{t.modal_reserve}</p>
                        <h3 className="text-xl font-bold text-white">{selectedCar.name}</h3>
                        <p className="text-lg font-bold text-slate-400">${selectedCar.price}<span className="text-sm font-normal">{t.fleet_day}</span></p>
                    </div>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Request sent!'); setBookingOpen(false); }}>
                    <input required type="text" placeholder={t.modal_name} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:border-teal-500 outline-none" />
                    <input required type="tel" placeholder={t.modal_phone} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:border-teal-500 outline-none" />
                    <button className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 active:scale-95 transition-transform hover:bg-teal-50">{t.modal_confirm}</button>
                </form>
            </div>
        </div>
      )}

      {/* --- AI MODAL --- */}
      {aiOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:px-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setAiOpen(false)}></div>
            <div className="relative bg-slate-900 w-full max-w-lg md:rounded-3xl rounded-t-3xl border border-slate-700 h-[80vh] flex flex-col overflow-hidden animate-slide-up shadow-2xl">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                        <span className="font-bold text-white">Chicho AI</span>
                    </div>
                    <button onClick={() => setAiOpen(false)} className="text-white"><LucideX /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
                    {aiMessages.map((msg, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-teal-600 ml-auto text-white' : 'bg-slate-800 border border-slate-700 mr-auto text-slate-200'}`}>
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
                        <input value={aiInput} onChange={e => setAiInput(e.target.value)} placeholder="Message..." className="w-full bg-slate-800 border border-slate-700 rounded-full pl-5 pr-12 py-3 focus:border-teal-500 outline-none text-white placeholder-slate-500" />
                        <button className="absolute right-2 top-2 p-1.5 bg-teal-600 rounded-full text-white"><LucideArrowRight className="w-4 h-4" /></button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}