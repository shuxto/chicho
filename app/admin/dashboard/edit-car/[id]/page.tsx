"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';
import { useRouter, useParams } from 'next/navigation';
import { LucideX, LucideStar } from 'lucide-react';

export default function EditCar() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Data
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Sport');
  const [price, setPrice] = useState('');
  const [engine, setEngine] = useState('');
  const [seats, setSeats] = useState('');

  // IMAGE LOGIC (Mixing old URLs and new Files)
  // We store everything as objects: { url?: string, file?: File, preview: string }
  type ImageItem = { url?: string; file?: File; preview: string };
  const [images, setImages] = useState<ImageItem[]>([]);
  const [coverIndex, setCoverIndex] = useState(0);

  // 1. Fetch Existing Data
  useEffect(() => {
    const getCar = async () => {
      const { data, error } = await supabase.from('cars').select('*').eq('id', id).single();
      if (error) {
        alert('Error fetching car');
        router.push('/admin/dashboard');
      } else {
        setName(data.name);
        setCategory(data.category);
        setPrice(data.price);
        if(data.specs) {
            setEngine(data.specs.Engine || '');
            setSeats(data.specs.Seats || '');
        }

        // PREPARE IMAGES
        // If 'gallery' exists, use it. If not, use the single 'image' as a fallback.
        const galleryUrls = data.gallery && data.gallery.length > 0 ? data.gallery : [data.image];
        
        const initialImages = galleryUrls.map((url: string) => ({
            url: url,
            preview: url // For existing images, the preview IS the url
        }));
        
        setImages(initialImages);

        // Find which one was the cover (based on data.image)
        const foundIndex = initialImages.findIndex((img: any) => img.url === data.image);
        if (foundIndex !== -1) setCoverIndex(foundIndex);
      }
      setLoading(false);
    };
    getCar();
  }, [id, router]);

  // Handle NEW files
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        const newItems = newFiles.map(file => ({
            file: file,
            preview: URL.createObjectURL(file)
        }));
        setImages(prev => [...prev, ...newItems]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (index === coverIndex) setCoverIndex(0);
    if (index < coverIndex) setCoverIndex(coverIndex - 1);
  };

  // 2. Handle Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const finalUrls: string[] = [];

      // Loop through all images in our list
      for (let i = 0; i < images.length; i++) {
        const img = images[i];

        if (img.url) {
            // It's an old image, just keep the URL
            finalUrls.push(img.url);
        } else if (img.file) {
            // It's a new file, upload it!
            const fileName = `${Date.now()}_${i}_${img.file.name}`;
            const { error: uploadError } = await supabase.storage.from('images').upload(fileName, img.file);
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName);
            finalUrls.push(publicUrl);
        }
      }

      // The new Main Image is whoever is at coverIndex now
      const finalMainImage = finalUrls[coverIndex] || finalUrls[0];

      const { error: updateError } = await supabase.from('cars').update({
        name,
        category,
        price: Number(price),
        image: finalMainImage,
        gallery: finalUrls,
        specs: { Engine: engine, Seats: seats }
      }).eq('id', id);

      if (updateError) throw updateError;

      alert('Car Updated!');
      router.push('/admin/dashboard');

    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-white">Loading Car Data...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-3xl border border-white/10">
        <h1 className="text-2xl font-bold mb-6">Edit Car</h1>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-slate-400 mb-1">Car Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} 
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3" />
            </div>
            <div>
                <label className="block text-slate-400 mb-1">Price ($)</label>
                <input required type="number" value={price} onChange={e => setPrice(e.target.value)} 
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3" />
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
                     className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3" />
                </div>
                <div>
                   <label className="block text-slate-400 mb-1">Seats</label>
                   <input type="text" value={seats} onChange={e => setSeats(e.target.value)} 
                     className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3" />
                </div>
             </div>
          </div>

          <hr className="border-white/10 my-6" />

          {/* IMAGE MANAGER */}
          <div>
            <div className="flex justify-between items-center mb-4">
                <label className="block text-lg font-bold">Gallery Images</label>
                <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full">Green border = Cover Image</span>
            </div>
            
            <input type="file" multiple accept="image/*" id="file-upload" 
                onChange={handleFileSelect} className="hidden" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((img, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setCoverIndex(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-4 transition-all ${coverIndex === idx ? 'border-teal-500 shadow-lg shadow-teal-500/20' : 'border-transparent hover:border-white/20'}`}
                    >
                        <img src={img.preview} className="w-full h-full object-cover" />
                        
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(idx); }} 
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                            <LucideX size={14} />
                        </button>

                        {coverIndex === idx && (
                            <div className="absolute bottom-2 left-2 bg-teal-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <LucideStar size={10} fill="black" /> COVER
                            </div>
                        )}
                    </div>
                ))}

                <label htmlFor="file-upload" className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:text-teal-500 transition-all text-slate-400 bg-slate-900/50">
                    <span className="text-2xl font-light">+</span>
                    <span className="text-sm font-bold">Add Photo</span>
                </label>
            </div>
          </div>

          <button disabled={saving} className="w-full bg-teal-500 text-black font-bold py-4 rounded-xl hover:bg-teal-400 transition-colors">
            {saving ? 'Updating Car...' : 'Update Car'}
          </button>
        </form>
      </div>
    </div>
  );
}