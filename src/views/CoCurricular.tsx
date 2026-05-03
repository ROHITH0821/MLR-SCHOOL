'use client'; 

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Music, Palette, Play, Info, Users, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import './CoCurricular.css';

type Category = 'All' | 'Arts' | 'Indoor' | 'Outdoor' | 'SummerCamps';

interface Activity {
  id: string;
  title: string;
  category: Category;
  description: string;
  image: string;
  year?: string;
  stats?: { label: string; value: string }[];
}

const ACTIVITIES: Activity[] = [
  // Arts
  {
    id: 'dance',
    title: 'Dance',
    category: 'Arts',
    description: 'Classical and contemporary dance forms to enhance rhythm, poise, and cultural expression.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800'
  },
  {
    id: 'music',
    title: 'Music',
    category: 'Arts',
    description: 'Vocal and instrumental training, including keyboard and guitar, fostering melodic intelligence.',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800'
  },
  {
    id: 'art-craft',
    title: 'Art & Craft',
    category: 'Arts',
    description: 'Unleashing creativity through painting, sculpting, and sustainable crafting workshops.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800'
  },
  // Indoor
  {
    id: 'carroms',
    title: 'Carroms',
    category: 'Indoor',
    description: 'Strategic indoor game that blends skill, concentration, and fine motor skills development.',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800'
  },
  {
    id: 'chess',
    title: 'Chess',
    category: 'Indoor',
    description: 'Grandmaster training sessions to develop logical thinking and strategic foresight.',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800'
  },
  {
    id: 'table-tennis',
    title: 'Table Tennis',
    category: 'Indoor',
    description: 'Fast-paced action to improve reflexes and hand-eye coordination.',
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=800'
  },
  // Outdoor
  {
    id: 'cricket',
    title: 'Cricket',
    category: 'Outdoor',
    description: 'Professional coaching at our standard cricket nets with regular inter-school matches.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800'
  },
  {
    id: 'tennis',
    title: 'Tennis',
    category: 'Outdoor',
    description: 'Professional clay and synthetic courts for budding tennis stars.',
    image: 'https://images.unsplash.com/photo-1595435066311-64531405e354?q=80&w=800'
  },
  {
    id: 'basketball',
    title: 'Basketball',
    category: 'Outdoor',
    description: 'Enhancing teamwork and agility through high-energy court sessions.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800'
  },
  {
    id: 'athletics',
    title: 'Athletics',
    category: 'Outdoor',
    description: 'Focusing on physical fitness, speed, and endurance through various track and field events.',
    image: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=800'
  },
  {
    id: 'kabaddi',
    title: 'Kabaddi & Kho-Kho',
    category: 'Outdoor',
    description: 'Promoting traditional Indian sports to build strength and agility.',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f75?q=80&w=800'
  },
  // Summer Camps
  {
    id: 'summer-2024',
    title: 'Adventure Quest',
    category: 'SummerCamps',
    year: '2024',
    description: 'A month-long immersion in rock climbing, archery, and wilderness survival skills.',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800'
  },
  {
    id: 'summer-2023',
    title: 'Tech Explorers',
    category: 'SummerCamps',
    year: '2023',
    description: 'Focused on robotics, drone piloting, and creative coding for the future innovators.',
    image: 'https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?q=80&w=800'
  },
  {
    id: 'summer-2022',
    title: 'Olympic Spirit',
    category: 'SummerCamps',
    year: '2022',
    description: 'Intensive multi-sport training camp focusing on stamina and competitive spirit.',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800'
  }
];

const CoCurricular = () => {
  const [activeTab, setActiveTab] = useState<Category>('All');

  const filteredActivities = activeTab === 'All' 
    ? ACTIVITIES 
    : ACTIVITIES.filter(a => a.category === activeTab);

  return (
    <div className="co-curricular-page">
      {/* Hero Section */}
      <section className="co-curricular-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Holistic <span style={{ color: '#F5A623' }}>Growth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            At Malla Reddy School, education goes beyond textbooks. Our rich co-curricular 
            program is designed to discover and nurture every child's unique talent.
          </motion.p>

          <div className="section-tabs">
            {(['All', 'Arts', 'Indoor', 'Outdoor', 'SummerCamps'] as Category[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab === 'All' ? 'Everything' : tab === 'SummerCamps' ? 'Summer Camps' : tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="activities-grid-section section">
        <div className="container">
          {/* Main Categories */}
          {(['Arts', 'Indoor', 'Outdoor'] as Category[]).map(cat => (
            (activeTab === 'All' || activeTab === cat) && (
              <div key={cat} id={cat.toLowerCase()} className="category-group" style={{ marginBottom: '6rem' }}>
                <div className="category-header">
                  <h2>{cat} <span style={{ color: '#F5A623' }}>Activities</span></h2>
                  <p>Developing {cat === 'Arts' ? 'creative and expressive' : cat === 'Indoor' ? 'strategic and cognitive' : 'physical and team'} skills.</p>
                </div>
                <motion.div 
                  layout
                  className="activity-grid centered-flex"
                >
                  <AnimatePresence mode="popLayout">
                    {ACTIVITIES.filter(a => a.category === cat).map((activity) => (
                      <motion.div
                        key={activity.id}
                        id={activity.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="activity-card"
                      >
                        <div className="activity-image-wrapper">
                          <Image 
                            src={activity.image} 
                            alt={activity.title}
                            fill
                            className="activity-image"
                          />
                        </div>
                        <div className="activity-content">
                          <span className="activity-badge">{activity.category}</span>
                          <h3>{activity.title}</h3>
                          <p>{activity.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )
          ))}

          {/* Summer Camps Section - Grouped by Year */}
          {(activeTab === 'All' || activeTab === 'SummerCamps') && (
            <div id="summercamps" className="category-group">
              <div className="category-header">
                <h2>Summer <span style={{ color: '#F5A623' }}>Camps</span></h2>
                <p>Annual programs designed for intensive learning and adventure.</p>
              </div>
              
              {Object.entries(
                ACTIVITIES
                  .filter(a => a.category === 'SummerCamps')
                  .reduce((acc, activity) => {
                    const year = activity.year || 'Other';
                    if (!acc[year]) acc[year] = [];
                    acc[year].push(activity);
                    return acc;
                  }, {} as Record<string, Activity[]>)
              )
              .sort(([yearA], [yearB]) => yearB.localeCompare(yearA))
              .map(([year, camps]) => (
                <div key={year} className="year-block">
                  <div className="year-indicator">
                    <span className="year-label">{year}</span>
                    <div className="year-line"></div>
                  </div>
                  
                  <motion.div layout className="activity-grid centered-flex">
                    <AnimatePresence mode="popLayout">
                      {camps.map((activity) => (
                        <motion.div
                          key={activity.id}
                          id={activity.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="activity-card"
                        >
                          <div className="activity-image-wrapper">
                            <Image 
                              src={activity.image} 
                              alt={activity.title}
                              fill
                              className="activity-image"
                            />
                          </div>
                          <div className="activity-content">
                            <span className="activity-badge">{activity.category}</span>
                            <h3>{activity.title}</h3>
                            <p>{activity.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section" style={{ padding: '6rem 0', background: '#f8fafc', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Want to join a club?</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Our clubs are open for enrollment at the beginning of every semester.</p>
          <a href="/contact" className="btn-primary squishy-btn" style={{ padding: '1rem 2.5rem' }}>
            Inquire Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default CoCurricular;
