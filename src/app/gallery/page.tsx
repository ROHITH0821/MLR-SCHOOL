"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X, Images, Sparkles } from "lucide-react";
import { fetchDataFromSheet, type GalleryItem } from "@/lib/sheets";

const categories = ["All", "Campus", "Academics", "Sports", "Events", "Labs"];

const GOOGLE_SHEET_ID = "1yq3iz43AgYISZKXJEE6P6aMmYme84eo8SXPmsgCt4Bs";
const GALLERY_GID = "438455533";
const GALLERY_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${GALLERY_GID}`; 

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [mediaItems, setMediaItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      setIsLoading(true);
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxzGg_9G09RThkXBTfxYnfdP25qbKjX07MAeN-9ABYwglidLfK6RvTizNWbiTuEzgk/exec?type=gallery");
        const galleryData = await response.json();
        
        const validData = galleryData
          .filter((item: any) => {
            const src = item.coverimage || item.coverImage || item.src;
            return src && src.toString().length > 10;
          })
          .map((item: any, index: number) => {
            const rawSrc = (item.coverimage || item.coverImage || item.src).toString();
            const imgs = rawSrc.split(/[,|]/).map((s: string) => s.trim());
            const firstImg = imgs[0];
            return {
              id: `${item.id || 'item'}-${index}`,
              src: firstImg,
              category: item.category || item.Category || 'General',
              title: item.title || item.Title || 'School Moment',
              type: (firstImg.toLowerCase().includes('youtube.com') || firstImg.toLowerCase().includes('youtu.be')) ? 'video' : 'image'
            };
          });
        setMediaItems(validData);
      } catch (err) {
        console.error("Gallery page fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filteredItems = filter === "All" 
    ? mediaItems 
    : mediaItems.filter(item => item.category.toLowerCase() === filter.toLowerCase());

  const getThumbnail = (item: GalleryItem) => {
    if (item.type === "image") return item.src;
    const ytMatch = item.src.match(/(?:embed\/|v=)([^&?]+)/);
    if (ytMatch && ytMatch[1]) {
      return `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`;
    }
    return "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600";
  };

  return (
    <main className="min-h-screen bg-[#f5f5eb] pb-20">
      {/* HERO HEADER */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#f5f5eb]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#a67c1a_0%,transparent_50%)]" />
        </div>
        
        <div className="container relative z-10 mx-auto max-w-7xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3d4f2f]/10 text-[#3d4f2f] font-bold text-[10px] uppercase tracking-widest mb-6 backdrop-blur-sm border border-[#3d4f2f]/10">
              <Sparkles size={14} className="text-[#a67c1a]" />
              Captured Moments
            </span>
            <h1 className="font-display text-4xl md:text-7xl font-black text-[#1a2314] tracking-tight mb-6">
              Life at <span className="text-[#3d4f2f]">Malla Reddy</span>
            </h1>
            <p className="text-[#5c6654] max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
              Witness the journey of excellence, creativity, and joy through our lens.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12 relative z-20">
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-xs font-bold transition-all duration-300 border-2 ${
                filter === cat 
                  ? "bg-[#3d4f2f] border-[#3d4f2f] text-white shadow-xl scale-105" 
                  : "bg-white border-gray-100 text-[#3d4f2f] hover:border-[#a67c1a] hover:text-[#a67c1a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3d4f2f]"></div>
          </div>
        )}

        {/* Media Grid */}
        {!isLoading && (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative cursor-pointer aspect-square rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                  onClick={() => setSelectedItem(item)}
                >
                  <Image
                    src={getThumbnail(item)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3d4f2f]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-bold text-sm md:text-lg leading-tight">
                      {item.title}
                    </p>
                    <span className="text-white/60 text-[10px] uppercase tracking-widest mt-1 block">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <Images size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-500">No moments found</h3>
            <p className="text-gray-400">Try a different category</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#1a2314]/98 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white p-3 hover:rotate-90 transition-all"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-10 h-10" />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-black shadow-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === "video" ? (
                <iframe
                  src={selectedItem.src}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
