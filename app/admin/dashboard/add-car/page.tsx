"use client";

import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';
import { LucideX, LucideStar } from 'lucide-react';

export default function AddCar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form Data
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Sport'); 
  const [price, setPrice] = useState('');
  
  // Specs
  const [engine, setEngine] = useState('');
  const [seats, setSeats] = useState('');

  // IMAGE LOGIC
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [coverIndex, setCoverIndex] = useState(0); // Which image is the "Main" one?

  // Handle selecting files
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      
      // Create preview URLs for the UI
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  // Remove an image from the list
  const removeImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
    
    // If we removed the cover, reset cover to the first one
    if (index === coverIndex) setCoverIndex(0);
    if (index < coverIndex) setCoverIndex(coverIndex - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please add at least one image.");
    setLoading(true);

    try {
      // 1. Upload ALL files
      const uploadedUrls: string[] = [];

      // We loop through files and upload them one by one
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Date.now()}_${i}_${file.name}`; // Unique name
        
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
          
        uploadedUrls.push(publicUrl);
      }

      // 2. Insert into Database
      // The "cover" image is the one selected by coverIndex
      const mainImage = uploadedUrls[coverIndex];

      const { error: dbError } = await supabase.from('cars').insert([
        {
          name,
          category,
          price: Number(price),
          image: mainImage,         // Main image for the card
          gallery: uploadedUrls,    // All images for the gallery
          specs: { Engine: engine, Seats: seats }
        }
      ]);

      if (dbError) throw dbError;

      alert('Car Saved!');
      router.push('/admin/dashboard');

    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-3xl border border-white/10">
        <h1 className="text-2xl font-bold mb-6">Add New Car</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* BASICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-slate-400 mb-1">Car Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} 
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3" placeholder="e.g. Porsche 911" />
            </div>
            <div>
                <label className="block text-slate-400 mb-1">Price ($)</label>
                <input required type="number" value={price} onChange={e => setPrice(e.target.value)} 
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3" placeholder="200" />
            </div>
            <div>
                <label className="block text-slate-400 mb-1">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} 
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3">
                    <option value="Sport">Sport</option>
                    <option value="SUV">SUV</option>
                    <option value="Electric">Electric</option>
                    <option value="Sedan">Sedan</option>
                </select>
            </div>
             <div className="grid grid-cols-2 gap-2">
                <div>
                   <label className="block text-slate-400 mb-1">Engine</label>
                   <input type="text" value={engine} onChange={e => setEngine(e.target.value)} 
                     className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3" placeholder="V8" />
                </div>
                <div>
                   <label className="block text-slate-400 mb-1">Seats</label>
                   <input type="text" value={seats} onChange={e => setSeats(e.target.value)} 
                     className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3" placeholder="2" />
                </div>
             </div>
          </div>

          <hr className="border-white/10 my-6" />

          {/* IMAGE MANAGER */}
          <div>
            <div className="flex justify-between items-center mb-4">
                <label className="block text-lg font-bold">Gallery Images</label>
                <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full">Click an image to set as Cover</span>
            </div>
            
            {/* Hidden Input */}
            <input type="file" multiple accept="image/*" id="file-upload" 
                onChange={handleFileSelect} className="hidden" />
            
            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {previews.map((src, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setCoverIndex(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-4 transition-all ${coverIndex === idx ? 'border-teal-500 shadow-lg shadow-teal-500/20' : 'border-transparent hover:border-white/20'}`}
                    >
                        <img src={src} className="w-full h-full object-cover" />
                        
                        {/* Remove Button */}
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(idx); }} 
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                            <LucideX size={14} />
                        </button>

                        {/* Cover Badge */}
                        {coverIndex === idx && (
                            <div className="absolute bottom-2 left-2 bg-teal-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <LucideStar size={10} fill="black" /> COVER
                            </div>
                        )}
                    </div>
                ))}

                {/* Add Button */}
                <label htmlFor="file-upload" className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:text-teal-500 transition-all text-slate-400 bg-slate-900/50">
                    <span className="text-2xl font-light">+</span>
                    <span className="text-sm font-bold">Add Photo</span>
                </label>
            </div>
          </div>

          <button disabled={loading} className="w-full bg-teal-500 text-black font-bold py-4 rounded-xl hover:bg-teal-400 transition-colors">
            {loading ? 'Uploading Images...' : 'Save Car'}
          </button>
        </form>
      </div>
    </div>
  );
}