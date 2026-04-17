'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Laptop, Calculator, BookOpen, Zap } from 'lucide-react';
import './Home.css';

const Labs = () => {
  const labs = [
    { title: 'Composite Science Lab', icon: <Microscope />, img: 'https://images.unsplash.com/photo-1532094349884-543bb1198c33?q=80&w=600', desc: 'Equipped with the latest apparatus for Physics, Chemistry, and Biology experiments.' },
    { title: 'Computer Intelligence Lab', icon: <Laptop />, img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=600', desc: 'High-speed internet and modern systems for coding, AI, and digital literacy.' },
    { title: 'Mathematical Explorer Zone', icon: <Calculator />, img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600', desc: 'Making abstract concepts concrete through 3D models and interactive tools.' },
    { title: 'Robotics & Innovation Lab', icon: <Zap />, img: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=600', desc: 'Where students build and program robots for national level competitions.' },
  ];

  return (
    <div className="labs-page">
      <section className="page-header" style={{ background: 'var(--c-mint)', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 className="hero-brand-name" style={{ fontSize: '4rem' }}>
            Labs & <span className="text-primary">Facilities</span>
          </motion.h1>
          <p className="hero-brand-tagline">Infrastructure designed to spark curiosity and innovation.</p>
        </div>
      </section>

      <section className="labs-grid-section section">
        <div className="container">
          <div className="creative-grid">
            {labs.map((lab, i) => (
              <motion.div 
                key={i} 
                className="blob-card"
                whileInView={{ scale: [0.95, 1], rotate: i % 2 === 0 ? -1 : 1 }}
              >
                <div className="blob-card-img" style={{ height: '200px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #000', marginBottom: '1.5rem' }}>
                  <img src={lab.img} alt={lab.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="blob-card-icon" style={{ background: 'var(--c-sky)' }}>{lab.icon}</div>
                <h3 style={{ fontWeight: 800 }}>{lab.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>{lab.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section className="library-section section" style={{ background: 'var(--c-lavender)' }}>
        <div className="container">
          <div className="contact-grid contact-grid-labs">
            <div>
              <h2 className="section-title-spark"><BookOpen /> The Digital Library</h2>
              <p style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                With over 10,000 physical books and a vast digital repository, our library 
                is the heart of knowledge on campus. It features quiet study zones and 
                collaborative spaces.
              </p>
            </div>
            <div className="polaroid-card">
              <div className="polaroid-taped"></div>
              <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600" alt="Library" style={{ width: '100%', borderRadius: '15px' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Labs;
