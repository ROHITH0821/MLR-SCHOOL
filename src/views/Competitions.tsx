'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Medal, Users, Calendar } from 'lucide-react';
import Image from 'next/image';
import './IITFoundation.css'; // Reusing some base styles for consistency

const Competitions = () => {
  const primaryCompetitions = [
    {
      title: 'SOF Olympiads',
      desc: 'International General Knowledge, Math, Science, and English Olympiads fostering global competitive spirit.',
      highlights: ['75+ Participants', 'Zonal Rankers', 'International Exposure'],
      icon: <Trophy className="text-accent" />
    },
    {
      title: 'MI Champs India',
      desc: 'A platform for students to showcase their multiple intelligences through various national level challenges.',
      highlights: ['Skill Development', 'National Certification', 'Creative Problem Solving'],
      icon: <Award className="text-secondary" />
    },
    {
      title: 'SIP Abacus',
      desc: 'Focusing on mental arithmetic and brain development to enhance concentration and calculation speed.',
      highlights: ['Mental Math', 'Speed & Accuracy', 'Concentration Training'],
      icon: <Medal className="text-primary" />
    },
    {
      title: 'Writivity Handwriting',
      desc: 'Specialized programs to improve penmanship and presentation skills from a young age.',
      highlights: ['Calligraphy Skills', 'Presentation', 'Fine Motor Control'],
      icon: <Star className="text-accent" />
    }
  ];

  return (
    <div className="competitions-page iit-foundation-page"> {/* Reusing base page class */}
      {/* Hero Section */}
      <section className="iit-hero" style={{ background: 'radial-gradient(circle at 100% 0%, #0DB6B5 0%, #064E4D 100%)' }}>
        <div className="container">
          <div className="hero-content">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            >
              Academic Excellence
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              National & Global <span className="text-accent">Competitions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Empowering students to test their skills against the best, 
              building confidence and a legacy of achievement.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hero-image-grid"
          >
            <div className="main-image">
              <Image 
                src="https://images.unsplash.com/photo-1578262825743-a4e402caab76?q=80&w=1200" 
                alt="Award Ceremony"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-3xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitions Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '5rem' }}>
            <h2 className="section-title">Major <span className="text-secondary">Platforms</span></h2>
            <p className="section-subtitle">We partner with leading educational organizations to provide diverse competitive opportunities.</p>
          </div>
          
          <div className="subjects-grid">
            {primaryCompetitions.map((comp, idx) => (
              <motion.div 
                key={idx}
                className="subject-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="subject-icon" style={{ backgroundColor: '#f8fafc', color: 'inherit' }}>
                  {React.cloneElement(comp.icon as React.ReactElement, { size: 40 })}
                </div>
                <h3>{comp.title}</h3>
                <p style={{ marginBottom: '1.5rem' }}>{comp.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 'auto' }}>
                  {comp.highlights.map((h, i) => (
                    <li key={i} style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      color: '#0A2463', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0DB6B5' }}></div>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="card-accent" style={{ backgroundColor: '#F5A623' }}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Wall Highlight */}
      <section className="section" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container">
          <div className="overview-card" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="overview-visual" style={{ position: 'relative', height: '350px', borderRadius: '2rem', overflow: 'hidden' }}>
              <Image 
                src="https://images.unsplash.com/photo-1526676037777-05a232554f75?q=80&w=800" 
                alt="Legacy of Achievers"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="overview-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2>Building a <span className="text-accent">Legacy</span></h2>
              <p>
                Our students consistently rank in the top percentiles in national Olympiads. 
                Beyond medals, we value the discipline and analytical skills these 
                competitions instill in every participant.
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '2rem', fontWeight: 950, color: '#0DB6B5' }}>500+</h4>
                  <p style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>Annual Participants</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '2rem', fontWeight: 950, color: '#F5A623' }}>50+</h4>
                  <p style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>Zonal Rankers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="iit-cta section">
        <div className="container">
          <div className="cta-box" style={{ background: '#F5A623', color: '#0A2463' }}>
            <h2>Ready to Challenge Yourself?</h2>
            <p style={{ color: 'rgba(10, 36, 99, 0.8)' }}>Registrations for upcoming Olympiads are now open for the current academic year.</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-primary" style={{ backgroundColor: '#0A2463', color: 'white' }}>Enquire for Schedule</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Competitions;
