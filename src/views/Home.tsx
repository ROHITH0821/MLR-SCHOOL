'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Star,
  BookOpen,
  Microscope,
  GraduationCap,
  Images,
} from 'lucide-react';
import MonthlyAchievements from '@/components/MonthlyAchievements';
import './Home.css';
import './Gallery.css';
import { JourneySection } from '../components/JourneySection';
import { fetchDataFromSheet } from '@/lib/sheets';

// REPLACE THIS WITH YOUR REAL SHEET ID
const GOOGLE_SHEET_ID = "1yq3iz43AgYISZKXJEE6P6aMmYme84eo8SXPmsgCt4Bs";
const GIDS = {
  GALLERY: '438455533',
  PROGRAMS: '185361245', 
  FACILITIES: '1248382523' 
};

// Use the same "Published to web" CSV pattern as Achievements (only gid differs)
const FACILITIES_SHEET_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=1248382523&single=true&output=csv&t=${Date.now()}`;

/** Homepage hero — provided by user */
const HERO_IMAGE = '/malla-reddy-hero.jpg';
const HERO_IMAGE_MOBILE = '/malla-reddy-hero-mobile.png';



// Framer Motion v12+ deprecates motion(); prefer motion.create()
const MotionLink = motion.create(Link);



interface Program {
  title: string;
  desc: string;
  image: string;
  icon: string;
}

interface Facility {
  images: string[];
}

const Home = () => {
  const [galleryPreview, setGalleryPreview] = useState<{src: string, title: string}[]>([]);
  const [galleryMore, setGalleryMore] = useState<{src: string, title: string, cat: string}[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [facilityImages, setFacilityImages] = useState<string[]>([]);
  const [isFacilitiesLoading, setIsFacilitiesLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      // Gallery via Apps Script
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxzGg_9G09RThkXBTfxYnfdP25qbKjX07MAeN-9ABYwglidLfK6RvTizNWbiTuEzgk/exec?type=gallery");
        const galleryData = await response.json();
        
        const validGallery = galleryData
          .filter((item: any) => {
            const src = item.coverimage || item.coverImage || item.src;
            return src && src.toString().length > 10;
          })
          .map((item: any) => {
            const rawSrc = (item.coverimage || item.coverImage || item.src).toString();
            const imgs = rawSrc.split(/[,|]/).map((s: string) => s.trim());
            return {
              src: imgs[0],
              title: item.title || item.Title || 'School Moment',
              category: item.category || item.Category || 'General'
            };
          });

        if (validGallery.length > 0) {
          setGalleryPreview(validGallery.slice(0, 3));
          if (validGallery.length > 3) {
            setGalleryMore(validGallery.slice(3, 7).map((item: any) => ({ ...item, cat: item.category })));
          }
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      }
      // Programs
      const programsData = await fetchDataFromSheet<Program>(GOOGLE_SHEET_ID, GIDS.PROGRAMS, (cols) => ({
        title: cols[0]?.trim(),
        desc: cols[1]?.trim(),
        image: cols[2]?.trim(),
        icon: cols[3]?.trim() || 'Star'
      }));
      const validPrograms = programsData.filter(p => p.title && p.image && (p.image.startsWith('http') || p.image.startsWith('/')));
      if (validPrograms.length > 0) setPrograms(validPrograms);

      // Facilities
      setIsFacilitiesLoading(true);
      try {
        const facilitiesData = await fetchDataFromSheet<Facility>(
          FACILITIES_SHEET_URL,
          '0',
          (cols) => {
            // Robust: facilities sheet columns may vary; extract URLs from any cell.
            const images = cols
              .flatMap((cell) => (cell ? cell.split(/[,|]/) : []))
              .map((s) => s.trim())
              .filter((s) => s.startsWith('http') || s.startsWith('/'))
              .filter(Boolean);

            return { images };
          }
        );

        if (facilitiesData && facilitiesData.length > 0) {
          const validFacilities = facilitiesData.filter((f) => f.images?.length > 0);
          const allImages = Array.from(new Set(validFacilities.flatMap((f) => f.images)));
          setFacilities(validFacilities);
          setFacilityImages(allImages);
        }
      } catch (err) {
        console.error("Facilities fetch error:", err);
      } finally {
        setIsFacilitiesLoading(false);
      }
    }
    loadContent();
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };


  return (
    <div className="home" style={{ color: '#1a1a1a' }}>
      <section className="hero-modern">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="hero-slide active"
          style={{ zIndex: 1 }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Happy students walking towards the welcoming entrance of Malla Reddy School"
            className="hero-slide-img desktop-only"
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <Image
            src={HERO_IMAGE_MOBILE}
            alt="Happy students walking towards the welcoming entrance of Malla Reddy School"
            className="hero-slide-img mobile-only"
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </motion.div>
        <div
          className="hero-overlay"
          style={{
            background: 'rgba(0,0,0,0.15)',
          }}
        />



        <div className="container hero-content-container">
          {/* Hero content removed as per request */}
        </div>
      </section>
      <div className="trust-strip-wrapper">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="trust-strip"
        >
          <div className="trust-strip-grid">
            {[
              { img: "/images/safety/campus-safety.png", label: "Campus Safety" },
              { img: "/images/safety/health-safety.png", label: "Health and Safety Policy" },
              { img: "/images/safety/safety-hygiene.png", label: "Safety and Hygiene" },
              { img: "/images/safety/cctv.png", label: "CCTV" },
              { img: "/images/safety/pest-control.png", label: "Pest Control" }
            ].map((item, idx) => (
              <div key={idx} className="trust-item">
                <div className="trust-icon-img" style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '1rem' }}>
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    sizes="64px"
                    style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
                  />
                </div>
                <span className="trust-label" style={{ fontSize: '0.7rem', maxWidth: '100px' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <section
        className="section about-section text-center"
        style={{ backgroundColor: 'var(--page-bg)', overflow: 'hidden', padding: '6rem 0' }}
      >
        <div className="container about-grid">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px', amount: 0.15 }}
            variants={fadeUpVariant}
            className="about-content"
            style={{ textAlign: 'left' }}
          >
            <h2 className="section-title section-title-spark" style={{ color: 'var(--primary)' }}>
              Welcome to Excellence
            </h2>
            <p
              className="section-desc"
              style={{
                marginBottom: '2rem',
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#555',
              }}
            >
              At Malla Reddy School, we believe in nurturing every child&apos;s potential. Our
              holistic approach integrates academics, sports, and creative arts to build confident,
              responsible, and forward-thinking individuals ready to face tomorrow&apos;s
              challenges.
            </p>
            <Link
              href="/about"
              className="link-with-icon"
              style={{
                color: 'var(--primary)',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              Read More <ArrowRight size={20} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: -10, x: 50 }}
            whileInView={{ opacity: 1, rotate: 0, x: 0 }}
            viewport={{ once: true, margin: '-100px', amount: 0.15 }}
            transition={{ type: 'spring', stiffness: 60, delay: 0.2 }}
            className="about-image-wrapper"
            style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
          >
            <div
              className="polaroid-card"
              style={{ '--rotation': '3deg' } as React.CSSProperties}
            >
              <div className="polaroid-taped" style={{ background: '#ddd' }} />
              <div
                className="polaroid-img-wrapper"
                style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)', position: 'relative' }}
              >
                <Image
                  src={HERO_IMAGE}
                  alt="Students learning"
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  width={800}
                  height={300}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <JourneySection />

      {/* Wall of Fame Achievements */}
      <MonthlyAchievements />

      <section
        className="section programs-section text-center"
        style={{ backgroundColor: 'var(--page-bg)', padding: '6rem 0' }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-center"
            style={{ marginBottom: '4rem', fontSize: '2.5rem', color: '#333' }}
          >
            Programs Offered
          </motion.h2>
          <motion.div
            className="facilities-grid mobile-flex-grid"
          >
            {programs.map((prog, idx) => {
              // Dynamic Icon selection
              const IconComp = prog.icon === 'Star' ? Star : 
                               prog.icon === 'BookOpen' ? BookOpen : 
                               prog.icon === 'Microscope' ? Microscope : 
                               prog.icon === 'GraduationCap' ? GraduationCap : Star;

              return (
              <motion.div
                key={idx}
                className="blob-card"
                style={{
                  background: '#ffffff',
                  borderColor: '#e2e8f0',
                  boxShadow: '8px 8px 0 #94a3b8',
                  padding: '0',
                  overflow: 'hidden'
                }}
              >
                <div className="blob-image-wrapper" style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <Image src={prog.image} fill style={{ objectFit: 'cover' }} alt={prog.title} />
                  <div className="blob-card-icon-overlay" style={{ 
                    position: 'absolute', 
                    top: '1rem', 
                    right: '1rem', 
                    background: 'white', 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '15px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}>
                    {React.createElement(IconComp, { size: 24, style: { color: 'var(--primary)' } })}
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 className="blob-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{prog.title}</h3>
                  <p className="blob-desc" style={{ color: '#666', lineHeight: '1.6' }}>{prog.desc}</p>
                </div>
              </motion.div>
            ); })}
          </motion.div>
        </div>
      </section>

      <section className="section home-gallery-section">
        <div className="container home-gallery-header-wrap">
          <motion.div
            className="home-gallery-header"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
          >
            <span className="home-gallery-badge">
              <Images size={18} aria-hidden />
              Gallery
            </span>
            <h2 className="home-gallery-title">Moments from our school</h2>
            <p className="home-gallery-lead">
              Same layout as our photo gallery — tap below to see the full collection.
            </p>
          </motion.div>
        </div>

        {/* 3-card preview — matches /gallery */}
        <div className="gallery-preview-outer">
          <div className="gallery-preview-stage">
            <div className="gallery-preview">
              {galleryPreview.map((photo, idx) => (
                <MotionLink
                  key={`${photo.src}-${idx}`}
                  href="/gallery"
                  className={`gallery-preview-card gallery-preview-card--${idx}`}
                  aria-label={`Open gallery: ${photo.title}`}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28, delay: idx * 0.08 }}
                  whileHover={
                    idx === 1
                      ? { y: -10, scale: 1.02, zIndex: 5 }
                      : { y: -6, scale: 1.03, zIndex: 4 }
                  }
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="gallery-preview-shine" aria-hidden />
                  <span className="gallery-preview-frame">
                    {photo.src && (photo.src.startsWith('http') || photo.src.startsWith('/')) && (
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        className="gallery-preview-img"
                        sizes={
                          idx === 1
                            ? '(max-width: 639px) 96vw, (max-width: 768px) 92vw, (max-width: 1400px) 32vw, 34vw'
                            : '(max-width: 639px) 46vw, (max-width: 768px) 92vw, (max-width: 1400px) 32vw, 34vw'
                        }
                        priority={idx === 1}
                      />
                    )}
                    <span className="gallery-preview-caption">{photo.title}</span>
                  </span>
                </MotionLink>
              ))}
            </div>
          </div>
        </div>

        {/* Second row — compact tiles like the main gallery grid */}
        <div className="gallery-bento-shell home-gallery-more-shell">
          <div className="home-gallery-more-grid">
            {galleryMore.map((photo, idx) => (
              <Link
                key={`${photo.src}-${idx}`}
                href="/gallery"
                className="gallery-tile gallery-tile--sm home-gallery-tile-link"
              >
                <span className="gallery-tile-glow" aria-hidden />
                <span className="gallery-tile-media">
                  {photo.src && (photo.src.startsWith('http') || photo.src.startsWith('/')) && (
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="gallery-tile-img"
                      sizes="(max-width: 640px) 50vw, 22vw"
                    />
                  )}
                </span>
                <span className="gallery-tile-bottom">
                  <span className="gallery-tile-title">{photo.title}</span>
                  <span className="gallery-tile-cat">{photo.cat}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="container home-gallery-cta-wrap">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            <Link href="/gallery" className="btn-primary squishy-btn home-gallery-cta">
              View full gallery
              <ArrowRight size={18} className="inline-icon" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Facilities Section — only show when loaded and has content */}
      {!isFacilitiesLoading && facilityImages.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section facilities-section text-center"
          style={{ backgroundColor: 'var(--page-bg)', padding: '6rem 0' }}
        >
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-center"
              style={{ marginBottom: '4rem', fontSize: '2.5rem', color: '#333' }}
            >
              World-Class Facilities
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px', amount: 0.15 }}
              variants={staggerContainer}
              className="programs-grid mobile-flex-grid"
            >
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '1rem', color: '#64748b', fontWeight: 700 }}>
                  Showing {facilityImages.length} facility images
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {facilityImages.map((src, i) => (
                    <div
                      key={`${src}-${i}`}
                      style={{
                        borderRadius: '18px',
                        overflow: 'hidden',
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <img
                        src={src}
                        alt={`Facility image ${i + 1}`}
                        loading="lazy"
                        onError={() => console.warn('[Facilities] image failed to load:', src)}
                        style={{
                          width: '100%',
                          height: '220px',
                          objectFit: 'cover',
                          background: '#f3f4f6',
                          display: 'block',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}



    </div>
  );
};

export default Home;
