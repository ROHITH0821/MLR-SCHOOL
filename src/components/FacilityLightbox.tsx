"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface FacilityLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

const FacilityLightbox: React.FC<FacilityLightboxProps> = ({ isOpen, onClose, images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#0A2463]/98 backdrop-blur-xl p-4 md:p-10"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white/50 hover:text-white p-3 hover:rotate-90 transition-all z-[2001]"
        >
          <X size={40} />
        </button>

        <div className="relative w-full max-w-6xl aspect-video flex items-center justify-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-3xl border-[8px] border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} view ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 md:-left-20 w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 md:-right-20 w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div className="absolute -bottom-16 left-0 right-0 text-center">
            <h4 className="text-white font-display text-2xl font-black mb-2 uppercase tracking-widest">{title}</h4>
            <div className="flex items-center justify-center gap-2">
              {images.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 bg-[#F5A623]' : 'w-2 bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FacilityLightbox;
