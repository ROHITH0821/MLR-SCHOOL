'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Atom, 
  Brain, 
  Calculator, 
  Target, 
  BookOpen, 
  Search, 
  FileText, 
  MessageSquare, 
  LineChart,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import Image from 'next/image';
import './IITFoundation.css';

const IITFoundation = () => {
  const subjects = [
    {
      icon: <Calculator size={40} />,
      title: 'Mathematics',
      desc: 'Building a logical powerhouse with deep dives into algebra, geometry, and advanced reasoning.',
      color: '#0DB6B5'
    },
    {
      icon: <Atom size={40} />,
      title: 'Physics',
      desc: 'Understanding the laws of the universe through conceptual clarity and mathematical applications.',
      color: '#F5A623'
    },
    {
      icon: <Search size={40} />,
      title: 'Chemistry',
      desc: 'Exploring the building blocks of matter with focused sessions on organic and inorganic principles.',
      color: '#0A2463'
    },
    {
      icon: <Brain size={40} />,
      title: 'Biology',
      desc: 'Nurturing curiosity about life sciences and preparing a base for medical excellence.',
      color: '#0DB6B5'
    }
  ];

  const features = [
    {
      icon: <FileText size={24} />,
      title: 'Comprehensive Materials',
      desc: 'Exhaustive study materials and practice sheets designed by IITian experts.'
    },
    {
      icon: <LineChart size={24} />,
      title: 'Regular Assessments',
      desc: 'Weekly tests and performance tracking to monitor progress and identify gaps.'
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Doubt Clearing',
      desc: 'Dedicated one-on-one sessions to resolve academic queries and strengthen concepts.'
    },
    {
      icon: <Lightbulb size={24} />,
      title: 'Growth Mindset',
      desc: 'Fostering a passion for discovery and the confidence to explore complex STEM fields.'
    }
  ];

  return (
    <div className="iit-foundation-page">
      {/* Hero Section */}
      <section className="iit-hero">
        <div className="container">
          <div className="hero-content">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge"
            >
              Grades 6th to 9th
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              IIT <span className="text-accent">Foundation</span> Program
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Nurturing young minds to excel in STEM through a rigorous, 
              concept-driven curriculum designed for future innovators.
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
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200" 
                alt="Students collaborating on advanced science experiments"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-3xl"
                priority
              />
            </div>
            <div className="accent-box">
              <h3>STEM <br/>Excellence</h3>
              <p>Preparing for JEE, NEET & Olympiads</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview-section section">
        <div className="container">
          <div className="overview-card">
            <div className="overview-text">
              <h2>A Head Start for <span className="text-secondary">Brilliant Futures</span></h2>
              <p>
                At Malla Reddy School, we believe in preparing students for a successful 
                future in Science, Technology, Engineering, and Mathematics. Our IIT Foundation 
                program focuses on a thorough understanding of key concepts, stimulating 
                curiosity and critical thinking from a young age.
              </p>
              <div className="quote-box">
                "We don't just teach subjects; we foster a passion for discovery."
              </div>
            </div>
            <div className="overview-stats">
              <div className="stat-item">
                <Target size={32} />
                <span>Concept-Driven Learning</span>
              </div>
              <div className="stat-item">
                <GraduationCap size={32} />
                <span>Expert Faculty</span>
              </div>
              <div className="stat-item">
                <BookOpen size={32} />
                <span>Rigorous Training</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Subjects */}
      <section className="subjects-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Core <span className="text-accent">Focus</span> Areas</h2>
            <p className="section-subtitle">Deep conceptual mastery in the four pillars of competitive excellence.</p>
          </div>
          
          <div className="subjects-grid">
            {subjects.map((sub, idx) => (
              <motion.div 
                key={idx}
                className="subject-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="subject-icon" style={{ backgroundColor: `${sub.color}15`, color: sub.color }}>
                  {sub.icon}
                </div>
                <h3>{sub.title}</h3>
                <p>{sub.desc}</p>
                <div className="card-accent" style={{ backgroundColor: sub.color }}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="features-grid">
            <div className="features-visual">
              <div className="feature-img-main">
                <Image 
                  src="https://images.unsplash.com/photo-1544535830-9df3f56fff6a?q=80&w=1000" 
                  alt="Students in an engaging classroom environment"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="feature-overlay-card">
                <h4>Interactive Sessions</h4>
                <p>Engaging classroom environments that encourage inquiry.</p>
              </div>
            </div>
            
            <div className="features-content">
              <h2>Comprehensive <span className="text-primary">Support System</span></h2>
              <div className="feature-list">
                {features.map((f, idx) => (
                  <motion.div 
                    key={idx}
                    className="feature-item"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="feature-icon-small">{f.icon}</div>
                    <div className="feature-text-small">
                      <h5>{f.title}</h5>
                      <p>{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="iit-cta section">
        <div className="container">
          <div className="cta-box">
            <h2>Join the Excellence Journey</h2>
            <p>Enroll your child today in our IIT Foundation program and build a solid base for future competitive success.</p>
            <div className="cta-buttons">
              <a href="/admission" className="btn-primary squishy-btn blink-btn" style={{ backgroundColor: 'var(--accent)', color: 'var(--primary-dark)' }}>Apply Now</a>
              <a href="/contact" className="btn-secondary-outline">Enquire More</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IITFoundation;
