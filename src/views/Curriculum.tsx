'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Laptop, Settings, Palette, Calculator } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import './Curriculum.css';

const Curriculum = () => {
  const steamSubjects = [
    {
      icon: <Beaker size={40} className="text-primary" />,
      title: 'Science',
      desc: 'Exploring the natural world through hands-on experiments and discovery.',
    },
    {
      icon: <Laptop size={40} className="text-secondary" />,
      title: 'Technology',
      desc: 'Mastering digital literacy and coding for the modern tech landscape.',
    },
    {
      icon: <Settings size={40} className="text-accent" />,
      title: 'Engineering',
      desc: 'Building problem-solving skills through robotics and design projects.',
    },
    {
      icon: <Palette size={40} className="text-secondary" />,
      title: 'Arts',
      desc: 'Nurturing creativity and self-expression through various artistic mediums.',
    },
    {
      icon: <Calculator size={40} className="text-primary" />,
      title: 'Mathematics',
      desc: 'Developing logical reasoning and analytical thinking skills.',
    },
  ];

  return (
    <div className="curriculum-page">
      <section className="page-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Academic <span className="text-primary">Curriculum</span>
          </motion.h1>
          <p>Official NCERT/CBSE Curriculum strictly aligned with NCF and NEP 2020 guidelines.</p>
        </div>
      </section>

      <section className="steam-subjects section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">The STEAM Foundation</h2>
            <p className="section-subtitle">Our integrated approach to Science, Technology, Engineering, Arts, and Mathematics.</p>
          </div>
          <div className="steam-grid">
            {steamSubjects.map((subject, index) => (
              <motion.div 
                key={index}
                className="notebook-card"
                initial={{ opacity: 0, x: -50, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, rotate: index % 2 === 0 ? -1 : 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 10, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                style={{ 
                  background: 'white',
                  border: '3px solid #000',
                  borderRadius: '15px 40px 15px 15px',
                  padding: '2.5rem',
                  boxShadow: '8px 8px 0px 0px #000',
                  position: 'relative'
                }}
              >
                <div className="notebook-corner" style={{ 
                  position: 'absolute', top: '-2px', right: '-2px', 
                  width: '40px', height: '40px', background: 'var(--c-citrus)',
                  borderLeft: '3px solid #000', borderBottom: '3px solid #000',
                  borderRadius: '0 15px 0 15px' 
                }}></div>
                <div className="steam-icon" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
                  {subject.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>
                  {subject.title}
                </h3>
                <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.6' }}>{subject.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="learning-journey section">
        <div className="container">
          {/* Pre-Primary */}
          <div className="journey-step">
            <div className="journey-content">
              <span className="step-num">01</span>
              <h2>Pre-Primary <span className="text-primary">(Nursery, PP1, PP2)</span></h2>
              <p>
                Laying a strong foundation for young learners with a curriculum designed for 
                holistic development. We focus on cognitive, motor, social, and emotional skills 
                through engaging, age-appropriate activities.
              </p>
              <ul className="curriculum-highlights">
                <li>Montessori & Playway Methods</li>
                <li>Language & Numeracy Readiness</li>
                <li>Creative Exploration</li>
              </ul>
            </div>
            <div className="journey-image">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800" 
                alt="Pre-Primary students engaged in creative play" 
                className="rounded-image shadow-image hover-zoom"
                aspectRatio="16/9"
              />
            </div>
          </div>

          {/* Primary */}
          <div className="journey-step reverse">
            <div className="journey-content">
              <span className="step-num">02</span>
              <h2>Primary <span className="text-secondary">(Grade I – V)</span></h2>
              <p>
                Dedicated to building a solid foundation in core subjects while developing 
                problem-solving and critical thinking. We integrate arts and physical education 
                to ensure a well-rounded academic experience.
              </p>
              <ul className="curriculum-highlights">
                <li>Core Subjects: English, Math, Science, Social</li>
                <li>Regional Languages: Telugu & Hindi</li>
                <li>Skill-based Knowledge Acquisition</li>
              </ul>
            </div>
            <div className="journey-image">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800" 
                alt="Primary students in an active classroom environment" 
                className="rounded-image shadow-image hover-zoom"
                aspectRatio="16/9"
              />
            </div>
          </div>

          {/* Secondary */}
          <div className="journey-step">
            <div className="journey-content">
              <span className="step-num">03</span>
              <h2>Secondary <span className="text-accent">(Grade VI – X)</span></h2>
              <p>
                A challenging and rigorous curriculum designed to equip students with academic 
                knowledge and practical skills. We focus on preparing students for higher 
                education while promoting leadership and teamwork.
              </p>
              <ul className="curriculum-highlights">
                <li>Advanced STEM Integration</li>
                <li>Leadership & Community Service</li>
                <li>Career Readiness Foundations</li>
              </ul>
            </div>
            <div className="journey-image">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800" 
                alt="Secondary students in a vibrant school setting" 
                className="rounded-image shadow-image hover-zoom"
                aspectRatio="16/9"
              />
            </div>
          </div>

          {/* Special Support */}
          <div className="support-notice card" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center', background: 'var(--page-bg)' }}>
            <h3>Inclusive Learning Support</h3>
            <p style={{ maxWidth: '40rem', margin: '1rem auto' }}>
              We also offer <strong>Special Education</strong>, <strong>Enrichment Classes</strong>, 
              and <strong>Remedial Classes</strong> to ensure every student receives the resources 
              they need to succeed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Curriculum;
