"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronDown, Award, MapPin, Filter, ArrowRight } from "lucide-react";
import { ACHIEVEMENTS_DATA, type Achievement, type BranchName } from "@/lib/achievements-data";
import Image from "next/image";
import Link from "next/link";
import { fetchDataFromSheet } from "@/lib/sheets";

const ACHIEVEMENTS_SHEET_ID = "1yq3iz43AgYISZKXJEE6P6aMmYme84eo8SXPmsgCt4Bs";
const ACHIEVEMENTS_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=1510166299&single=true&output=csv";

const MONTHS = ["April", "March", "February", "January", "December", "November", "October", "September", "August", "July", "June"];
const ACADEMIC_YEARS = ["2025-26", "2024-25"];
const BRANCHES: BranchName[] = ["Lalgadi Malakpet", "Kompally", "Suraram", "Shampur", "Kundanpally", "MB Grammar School"];

const MonthlyAchievements = () => {
  const [activeMonth, setActiveMonth] = useState("April");
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [selectedBranch, setSelectedBranch] = useState<BranchName | "All">("All");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    async function loadAchievements() {
      setIsLoading(true);
      try {
        // Try fetching from the direct published CSV first (most reliable)
        const sheetData = await fetchDataFromSheet<Achievement>(ACHIEVEMENTS_SHEET_URL, '0', (cols, index) => ({
          id: `${cols[0] || 'ach'}-${index}`,
          title: cols[1] || 'Achievement',
          description: cols[2] || '',
          image: cols[3] || '',
          month: cols[4] || 'April',
          academicYear: cols[5] || '2025-26',
          branch: (cols[6] || 'Lalgadi Malakpet') as BranchName,
        }));

        if (sheetData && sheetData.length > 0) {
          const validData = sheetData.filter(item => item.title && item.title !== 'Achievement');
          if (validData.length > 0) {
            setAchievements(validData);
            setIsLoading(false);
            return;
          }
        }

        // Fallback to Apps Script if CSV fetch fails or returns empty
        const response = await fetch("https://script.google.com/macros/s/AKfycbxzGg_9G09RThkXBTfxYnfdP25qbKjX07MAeN-9ABYwglidLfK6RvTizNWbiTuEzgk/exec?type=achievements");
        const data = await response.json();
        
        const mappedData = data.map((item: any, index: number) => ({
          id: `${item.id || 'ach'}-${index}`,
          title: item.title || item.Title || 'Achievement',
          description: item.description || item.Description || '',
          image: (item.image || item.Image || item.img || '').toString(),
          month: item.month || item.Month || 'April',
          academicYear: item.academicyear || item.academicYear || item.Year || '2025-26',
          branch: (item.branch || item.Branch || 'Lalgadi Malakpet') as BranchName,
        }));

        if (mappedData.length > 0) {
          setAchievements(mappedData);
        }
      } catch (err) {
        console.error("Achievements fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAchievements();
  }, []);

  const filteredAchievements = useMemo(() => {
    return achievements.filter(a => 
      a.month === activeMonth && 
      a.academicYear === selectedYear && 
      (selectedBranch === "All" || a.branch === selectedBranch)
    );
  }, [achievements, activeMonth, selectedYear, selectedBranch]);

  return (
    <section className="achievements-section" id="achievements" style={{ padding: '6rem 0', backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Header */}
        <header className="achievements-header" style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'inherit' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="achievements-badge" style={{ alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '999px', backgroundColor: '#f1f5f9', color: '#0A2463', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              <Trophy size={14} />
              Wall of Fame
            </div>
            <h2 className="achievements-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#0A2463', lineHeight: 1.1, margin: 0, textAlign: 'center' }}>
              Monthly <span style={{ color: '#F5A623' }}>Achievements</span>
            </h2>
          </div>
          <p className="achievements-desc" style={{ color: '#6b7280', maxWidth: '30rem', fontSize: '1.1rem', margin: '0 auto', textAlign: 'center' }}>
            Celebrating the milestones, victories, and excellence of our bright students across all campuses.
          </p>
        </header>

        {/* Control Bar */}
        <div className="achievements-controls" style={{ marginBottom: '4rem', padding: '1.5rem', background: '#fff', border: '3px solid #000', borderRadius: '2.5rem', boxShadow: '8px 8px 0 #000', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
          {/* Month Tabs */}
          <div className="month-tabs" style={{ flex: 1, minWidth: '300px', overflowX: 'auto', display: 'flex', gap: '0.75rem', paddingBottom: '0.5rem' }}>
            {MONTHS.map(month => (
              <button
                key={month}
                onClick={() => setActiveMonth(month)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '1rem',
                  fontSize: '11px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeMonth === month ? '#0A2463' : '#f8fafc',
                  color: activeMonth === month ? '#fff' : '#9ca3af'
                }}
              >
                {month}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="filter-group" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            <div className="filter-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#9ca3af' }}>
              <Filter size={14} /> Filter By:
            </div>
            
            <div style={{ position: 'relative' }}>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{ appearance: 'none', background: '#f9fafb', border: '2px solid #f1f5f9', padding: '0.6rem 2.5rem 0.6rem 1.5rem', borderRadius: '1rem', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#0A2463', cursor: 'pointer', outline: 'none' }}
              >
                {ACADEMIC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
            </div>

            <div style={{ position: 'relative' }}>
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value as BranchName | "All")}
                style={{ appearance: 'none', background: '#f9fafb', border: '2px solid #f1f5f9', padding: '0.6rem 2.5rem 0.6rem 1.5rem', borderRadius: '1rem', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#0A2463', cursor: 'pointer', outline: 'none' }}
              >
                <option value="All">All Campuses</option>
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="achievements-content-area" style={{ minHeight: '400px' }}>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem 0' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', border: '4px solid #f3f4f6', borderTopColor: '#F5A623', animation: 'spin 1s linear infinite' }} />
              </div>
            ) : filteredAchievements.length > 0 ? (
              <motion.div 
                key={`${activeMonth}-${selectedYear}-${selectedBranch}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mobile-flex-grid"
                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}
              >
                {filteredAchievements.map((achievement) => (
                  <motion.article 
                    key={achievement.id}
                    whileHover={{ y: -5 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#fff',
                      border: '3px solid #000',
                      borderRadius: '2.5rem',
                      overflow: 'hidden',
                      boxShadow: '8px 8px 0 rgba(0,0,0,0.05)',
                      transition: 'all 0.3s',
                      width: '100%',
                      maxWidth: '45rem',
                      flex: '1 1 45%'
                    }}
                  >
                    {achievement.image && achievement.image.length > 5 && (
                      <div style={{ position: 'relative', width: '100%', height: '250px', background: '#f3f4f6', borderBottom: '3px solid #000' }}>
                        <Image
                          src={achievement.image}
                          alt={achievement.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '0.75rem', background: 'rgba(245, 166, 35, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5A623', border: '2px solid rgba(245, 166, 35, 0.2)' }}>
                          <Award size={16} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', color: '#9ca3af' }}>
                          <MapPin size={12} />
                          {achievement.branch}
                        </div>
                      </div>

                      <h3 className="mobile-text-center" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, color: '#0A2463', margin: '0 0 1rem 0', lineHeight: 1.2 }}>
                        {achievement.title}
                      </h3>
                      <p className="mobile-text-center" style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                        {achievement.description}
                      </p>

                      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '2px dashed #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#0A2463' }}>
                          {activeMonth} {selectedYear}
                        </span>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {[1,2,3].map(i => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0DB6B5' }} />)}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 0', textAlign: 'center' }}
              >
                <div style={{ width: '6rem', height: '6rem', borderRadius: '2rem', background: '#f9fafb', border: '2px dashed #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d1d5db', margin: '0 auto 2rem', transform: 'rotate(12deg)' }}>
                  <Trophy size={48} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.875rem', fontWeight: 900, color: '#0A2463', marginBottom: '1rem' }}>The stage is set...</h3>
                <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '24rem', margin: '0 auto', fontWeight: 500 }}>
                  We are currently verifying the latest results for {activeMonth}. New milestones will be posted shortly!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Link 
            href="/achievers"
            className="btn-primary squishy-btn"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '1.25rem 2.5rem', 
              borderRadius: '20px',
              backgroundColor: '#0A2463',
              color: '#fff',
              fontWeight: 900,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(10, 36, 99, 0.2)',
              transition: 'all 0.3s'
            }}
          >
            Explore Hall of Fame
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default MonthlyAchievements;
