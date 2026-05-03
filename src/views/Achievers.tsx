'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchDataFromSheet } from '@/lib/sheets';
import './Home.css';
import './Achievers.css';

const ACHIEVEMENTS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=1510166299&single=true&output=csv";

interface Achiever {
  name: string;
  cat: string;
  year: string;
  achievement: string;
  img: string;
}

const Achievers = () => {
  const [filter, setFilter] = useState('All');
  const [achievers, setAchievers] = useState<Achiever[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAchievers() {
      setIsLoading(true);
      try {
        const data = await fetchDataFromSheet<Achiever>(ACHIEVEMENTS_SHEET_URL, '0', (cols) => ({
          name: cols[1] || 'Student',
          achievement: cols[2] || 'Achievement',
          img: cols[3] || '',
          cat: cols[4] || 'General', // Using Month or Category
          year: cols[5] || '2025-26',
        }));
        
        if (data && data.length > 0) {
          const validData = data.filter(a => a.name && a.name !== 'Student');
          setAchievers(validData);
        } else {
          // Fallback static data if sheet fails
          setAchievers([
            { name: 'Sai Kiran', cat: 'Academics', year: '2024', achievement: 'NTSE State Ranker - Top 50', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400' },
            { name: 'Ananya R.', cat: 'Sports', year: '2024', achievement: 'National U-14 Chess Silver Medalist', img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=400' },
            { name: 'Varun T.', cat: 'Academics', year: '2024', achievement: 'IIT-JEE Mains - 99.2 Percentile', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400' },
            { name: 'Meenakshi S.', cat: 'Arts', year: '2023', achievement: 'State Level Classical Dance Excellence', img: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=400' },
            { name: 'Pranav K.', cat: 'Science', year: '2024', achievement: 'Young Scientist Award - Robotics', img: 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?q=80&w=400' },
          ]);
        }
      } catch (err) {
        console.error("Achievers fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAchievers();
  }, []);

  const filtered = filter === 'All' ? achievers : achievers.filter(a => a.cat === filter);

  return (
    <div className="achievers-page">
      <section className="page-header achievers-hero">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-brand-name"
          >
            Hall of <span className="text-primary">Fame</span>
          </motion.h1>
          <p className="hero-brand-tagline">
            Celebrating our brightest stars and their incredible journeys.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ 
              marginTop: '2rem', 
              padding: '0.75rem 1.5rem', 
              background: 'rgba(13, 182, 181, 0.1)', 
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              border: '1px solid rgba(13, 182, 181, 0.2)'
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0DB6B5', animation: 'pulse 2s infinite' }}></div>
            <span style={{ fontSize: '0.9rem', color: '#0A2463', fontWeight: 600 }}>
              Updating Records: We are currently gathering achievement data for the new academic cycle.
            </span>
          </motion.div>
        </div>
      </section>

      <section className="achievers-grid-section section">
        <div className="container">
          {/* Filters */}
          <div className="filters" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            {['All', 'Academics', 'Sports', 'Arts', 'Science'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`squishy-btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.6rem 1.5rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <div className="loader" style={{ border: '4px solid #f3f4f6', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            </div>
          ) : (
            <motion.div layout className="creative-grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((achiever, idx) => (
                  <motion.div 
                    key={achiever.name + idx}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="polaroid-card"
                  >
                    <div className="polaroid-taped"></div>
                    <div className="polaroid-img-wrapper" style={{ height: '220px' }}>
                      {achiever.img && achiever.img.length > 5 ? (
                        <img src={achiever.img} alt={achiever.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>No Image</div>
                      )}
                    </div>
                    <div className="text-center" style={{ padding: '0.5rem' }}>
                      <h4 style={{ fontWeight: 800 }}>{achiever.name}</h4>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--primary)',
                          background: 'rgba(61, 79, 47, 0.1)',
                          padding: '0.25rem 0.55rem',
                          borderRadius: '10px',
                          fontWeight: 600,
                        }}
                      >
                        {achiever.cat} • {achiever.year}
                      </span>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '0.5rem' }}>{achiever.achievement}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          
          {/* Empty State */}
          {!isLoading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <p style={{ color: '#9ca3af', fontSize: '1.2rem' }}>No achievers found in this category yet.</p>
            </div>
          )}
        </div>
      </section>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Achievers;
