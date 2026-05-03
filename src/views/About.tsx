'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart, Users } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import DynamicCalendar from '../components/DynamicCalendar';
import './Home.css';

/** Each route (/about, /vision, /principal, /management) shows its own focused page — not a duplicate wall of content. */
const About = () => {
  const pathname = usePathname();

  const mode =
    pathname === '/vision'
      ? 'vision'
      : pathname === '/principal'
        ? 'principal'
        : pathname === '/management'
          ? 'management'
          : 'full';

  const showVision = mode === 'full' || mode === 'vision';
  const showPrincipal = mode === 'full' || mode === 'principal';
  const showManagement = mode === 'full' || mode === 'management';
  const showSalient = mode === 'full';
  const showCalendar = mode === 'full';

  const hero =
    mode === 'vision'
      ? {
          title: (
            <>
              Vision <span className="text-primary">&amp; Mission</span>
            </>
          ),
          lead: 'Our purpose and promise to every learner — aligned with CBSE excellence and whole-child growth.',
        }
      : mode === 'principal'
        ? {
            title: (
              <>
                Principal&apos;s <span className="text-primary">Desk</span>
              </>
            ),
            lead: 'A message from our leadership on learning, care, and community.',
          }
        : mode === 'management'
          ? {
              title: (
                <>
                  Leadership &amp; <span className="text-primary">Management</span>
                </>
              ),
              lead: 'Governance, oversight, and the people guiding Malla Reddy School.',
            }
          : {
              title: (
                <>
                  About <span className="text-primary">Malla Reddy School</span>
                </>
              ),
              lead: 'A legacy of excellence, innovation, and community.',
            };

  return (
    <div className="about-page">
      <section className="page-header" style={{ background: 'var(--page-bg)', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hero-brand-name"
            style={{ color: 'var(--foreground)', fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            {hero.title}
          </motion.h1>
          <p
            className="hero-brand-tagline"
            style={{ color: 'var(--muted-foreground)', margin: '1rem auto', maxWidth: '40rem' }}
          >
            {hero.lead}
          </p>
          {mode !== 'full' && (
            <p style={{ marginTop: '1.5rem' }}>
              <Link href="/about" className="btn-primary squishy-btn" style={{ textDecoration: 'none' }}>
                View full About School
              </Link>
            </p>
          )}
        </div>
      </section>

      {showVision && (
        <section className="vision-mission section" id="vision-mission">
          <div className="container">
            <div className="creative-grid">
              <motion.div
                className="blob-card"
                initial={{ x: -100 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
              >
                <div className="blob-card-icon" style={{ background: 'var(--c-sky)' }}>
                  <Eye size={32} />
                </div>
                <h3>Our Vision</h3>
                <p>
                  To be a global leader in education, nurturing creative minds and compassionate souls through a
                  STEAM-centric approach.
                </p>
              </motion.div>
              <motion.div
                className="blob-card"
                initial={{ x: 100 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
              >
                <div className="blob-card-icon" style={{ background: 'var(--c-citrus)' }}>
                  <Target size={32} />
                </div>
                <h3>Our Mission</h3>
                <p>
                  To provide a rigorous yet supportive environment where students excel academically, socially, and
                  emotionally.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {showPrincipal && (
        <section className="principal-desk section" id="principal-desk" style={{ background: 'var(--page-bg)' }}>
          <div className="container">
            <div className="contact-grid contact-grid-about">
              <motion.div className="polaroid-card" whileHover={{ rotate: 0 }}>
                <div className="polaroid-taped"></div>
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
                  alt="Principal"
                  aspectRatio="1/1"
                />
                <div className="text-center" style={{ marginTop: '1rem' }}>
                  <h4 style={{ fontWeight: 800 }}>Dr. Anitha Reddy</h4>
                  <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Principal</p>
                </div>
              </motion.div>
              <div className="principal-text">
                <h2 className="section-title-spark">Principal&apos;s Message</h2>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#333', fontStyle: 'italic' }}>
                  &ldquo;Education is not the learning of facts, but the training of the mind to think. At Malla Reddy
                  School, we believe in unlocking the potential within every child...&rdquo;
                </p>
                <p style={{ marginTop: '1.5rem', lineHeight: '1.6', color: 'var(--muted-foreground)' }}>
                  Our commitment is to provide a safe, nurturing, and high-tech environment for all our students. Join
                  us in this journey of academic and personal growth.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {showManagement && (
        <section className="management-section section" id="school-management">
          <div className="container" style={{ maxWidth: '52rem' }}>
            <div className="section-header text-center" style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'var(--c-mint)',
                  border: '3px solid #1a2314',
                  marginBottom: '1rem',
                }}
              >
                <Users size={34} strokeWidth={2} />
              </div>
              <h2 className="section-title-spark">Governance &amp; oversight</h2>
            </div>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.75,
                color: 'var(--muted-foreground)',
                marginBottom: '1.25rem',
                textAlign: 'center',
              }}
            >
              The school operates under a dedicated board and academic council that set policy, uphold CBSE standards,
              and ensure transparent, child-safe operations across campus life.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#333', textAlign: 'center' }}>
              Leadership meets regularly with faculty and parent representatives to review curriculum delivery,
              infrastructure, and student wellbeing — keeping Malla Reddy School accountable to its mission.
            </p>
          </div>
        </section>
      )}

      {showSalient && (
        <section className="salient-features section">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title-spark">Why We Are Different</h2>
            </div>
            <div className="creative-grid salient-grid">
              {[
                { t: 'STEAM Curriculum', i: <Zap />, d: 'Integrating Science, Technology, Engineering, Arts, and Mathematics to foster critical thinking and innovation.' },
                { t: 'Individual Attention', i: <Heart />, d: 'Maintaining low student-teacher ratios to ensure personalized guidance and holistic development.' },
                { t: 'Modern Infrastructure', i: <ShieldCheck />, d: 'State-of-the-art facilities, safe learning spaces, and advanced digital classrooms.' },
                { t: 'Global Exposure', i: <Globe />, d: 'Preparing students for a connected world through diverse cultural programs and international standards.' },
              ].map((f, i) => (
                <motion.div key={i} className="blob-card">
                  <div className="blob-card-icon">{f.i}</div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showCalendar && (
        <section className="calendar-section section">
          <div className="container">
            <DynamicCalendar />
          </div>
        </section>
      )}
    </div>
  );
};

const Globe = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const Zap = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default About;
