"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { School, GraduationCap, Users, Building2, Globe, Monitor } from "lucide-react";
import "./JourneySection.css";

const stats = [
  { label: "Secondary School Examination (X) & Senior School Certificate Examination (XII) Pass Rate", end: 100, suffix: "%", icon: <GraduationCap size={24} /> },
  { label: "Acres of Campus", end: 25, suffix: "+", icon: <Globe size={24} /> },
  { label: "Infrastructure Facilities", end: 50, suffix: "+", icon: <Building2 size={24} /> },
  { label: "Interactive Learning", textValue: "Digital Class Rooms", icon: <Monitor size={24} /> },
];


function StatItem({ label, end, suffix, icon, active, textValue }: { label: string; end?: number; suffix?: string; icon: React.ReactNode; active: boolean; textValue?: string }) {
  const value = useCountUp(end || 0, 2500, active);
  return (
    <div className="journey-stat-item">
      <div className="journey-stat-icon">
        {icon}
      </div>
      {textValue ? (
        <p className="journey-stat-number" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: '1.2' }}>
          {textValue}
        </p>
      ) : (
        <p className="journey-stat-number">
          {value.toLocaleString()}{suffix}
        </p>
      )}
      <p className="journey-stat-label">
        {label}
      </p>
    </div>
  );
}

export function JourneySection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="journey-section" ref={ref}>
      <div className="journey-overlay">
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 20% 30%, #0DB6B5 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 80% 70%, #F5A623 0%, transparent 50%)' }} />
      </div>
      
      <div className="container journey-container">
        <div className="journey-header">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="journey-eyebrow"
          >
            Milestones of Excellence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="journey-title"
          >
            For Our <span className="journey-title-accent">Journey</span>
          </motion.h2>
        </div>

        <div className="journey-stats-grid">
          {stats.map((stat, idx) => (
            <StatItem key={idx} {...stat} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
