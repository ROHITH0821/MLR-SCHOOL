'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Music, Sun, Users } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import './LifeAtSchool.css';

const LifeAtSchool = () => {
  const highlights = [
    {
      icon: <Users size={32} className="text-primary" />,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400',
      title: 'Vibrant Community',
      desc: 'A diverse and inclusive environment where every student finds their place.',
    },
    {
      icon: <Sun size={32} className="text-secondary" />,
      image: 'https://images.unsplash.com/photo-1519302959554-a75be0afc82a?q=80&w=400',
      title: 'Modern Campus',
      desc: 'State-of-the-art facilities designed to inspire creativity and learning.',
    },
    {
      icon: <Coffee size={32} className="text-accent" />,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400',
      title: 'Student Wellness',
      desc: 'Focus on mental and physical health through various support programs.',
    },
    {
      icon: <Music size={32} className="text-secondary" />,
      image: 'https://images.unsplash.com/photo-1514525253361-b83f85dfd75c?q=80&w=400',
      title: 'Arts & Culture',
      desc: 'Rich extracurricular programs in music, dance, and fine arts.',
    },
  ];

  return (
    <div className="life-at-school">
      <section className="page-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Life at <span className="text-primary">Malla Reddy School</span>
          </motion.h1>
          <p>Beyond the classroom: Designing a holistic experience for every child.</p>
        </div>
      </section>

      <section className="highlights section">
        <div className="container">
          <div className="highlights-grid">
            {highlights.map((item, index) => (
              <motion.div 
                key={index}
                className="polaroid-card"
                initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -3 : 3 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 50, damping: 10, delay: index * 0.1 }}
                style={
                  { '--rotation': `${index % 2 === 0 ? -3 : 3}deg` } as CSSProperties
                }
              >
                <div className="polaroid-taped"></div>
                <div className="polaroid-img-wrapper">
                  <OptimizedImage 
                    src={item.image} 
                    alt={item.title} 
                    className="highlight-img"
                    aspectRatio="1/1"
                  />
                </div>
                <div className="highlight-content text-center" style={{ padding: '0.5rem 0 1rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="campus-sections section">
        <div className="container">
          <div className="campus-row">
            <div className="campus-content">
              <h2>Modern Infrastructure</h2>
              <p>
                Our campus features smart classrooms, advanced labs, and specialized 
                learning centers. Every corner is designed to facilitate discovery 
                and collaboration.
              </p>
              <ul className="campus-list">
                <li>Digital Smart Classrooms</li>
                <li>Advanced Robotics Lab</li>
                <li>Comprehensive Library</li>
              </ul>
            </div>
            <div className="campus-image">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800" 
                alt="Infrastructure" 
                className="rounded-image shadow-image hover-zoom" 
                aspectRatio="16/9"
              />
            </div>
          </div>

          <div className="campus-row reverse">
            <div className="campus-content">
              <h2>Sports & Fitness</h2>
              <p>
                We believe in the power of physical education. Our sports programs 
                include professional coaching in various disciplines to build 
                discipline and teamwork.
              </p>
              <ul className="campus-list">
                <li>Professional Sports Ground</li>
                <li>Indoor Games Arena</li>
                <li>Annual Sports Meet</li>
              </ul>
            </div>
            <div className="campus-image">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800" 
                alt="Sports" 
                className="rounded-image shadow-image hover-zoom"
                aspectRatio="16/9"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifeAtSchool;
