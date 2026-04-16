import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Bus, Briefcase, Download, ExternalLink } from 'lucide-react';
import './Home.css';

const Utility = () => {
  return (
    <div className="utility-page">
      <section className="page-header" style={{ background: 'var(--c-citrus)', padding: '6rem 0 4rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hero-brand-name"
            style={{ color: 'var(--foreground)', fontSize: '3.5rem' }}
          >
            Resources & <span className="text-primary">Info</span>
          </motion.h1>
        </div>
      </section>

      {/* Mandatory Public Disclosure (CBSE) */}
      <section id="disclosure" className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title-spark" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <FileText /> Mandatory Public Disclosure
            </h2>
          </div>
          <div className="disclosure-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {[
              'Extension of Affiliation',
              'Society Incorporation Certificate',
              'No Objection Certificate (NOC)',
              'Building Safety Certificate',
              'Fire Safety Certificate',
              'School Academic Calendar',
              'Annual Academic Curriculum',
            ].map((doc, i) => (
              <motion.div 
                key={i} 
                className="blob-card" 
                style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                whileHover={{ scale: 1.02 }}
              >
                <span style={{ fontWeight: 700 }}>{doc}</span>
                <button className="squishy-btn btn-primary" style={{ padding: '0.4rem 0.8rem' }}>
                  <Download size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation Section */}
      <section id="transport" className="section" style={{ background: 'var(--c-mint)' }}>
        <div className="container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 className="section-title-spark" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Bus /> Transport Facilities
              </h2>
              <p style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                The school provides a safe and comfortable fleet of GPS-enabled buses covering 
                all major areas of Hyderabad and Medchal. Every bus is equipped with a first-aid kit, 
                fire extinguisher, and a trained female attendant.
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <button className="btn-primary squishy-btn">View Routes</button>
                <button className="btn-secondary squishy-btn">Guidelines</button>
              </div>
            </div>
            <div className="polaroid-card">
              <div className="polaroid-taped"></div>
              <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600" alt="School Bus" style={{ width: '100%', borderRadius: '15px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title-spark" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Briefcase /> Join Our Team
            </h2>
            <p className="section-subtitle">We are always looking for passionate educators to join our family.</p>
          </div>
          <div className="creative-grid" style={{ marginTop: '3rem' }}>
            {[
              { role: 'Pre-Primary Teacher', dept: 'Academics', icon: <ExternalLink size={16} /> },
              { role: 'Music Instructor', dept: 'Arts', icon: <ExternalLink size={16} /> },
              { role: 'Physics Teacher', dept: 'Secondary', icon: <ExternalLink size={16} /> },
            ].map((job, i) => (
              <motion.div key={i} className="bubble-card">
                <h4 style={{ fontWeight: 800, fontSize: '1.2rem' }}>{job.role}</h4>
                <p style={{ color: 'var(--primary)' }}>{job.dept}</p>
                <button className="squishy-btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Apply Now</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Utility;
