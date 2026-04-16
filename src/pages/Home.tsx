import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, UserCheck, Heart, Map, ArrowRight, Star, BookOpen, Microscope, GraduationCap } from 'lucide-react';
import './Home.css';

const AnimatedCounter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            if (start === end) return;
            let totalMilSecDur = duration * 1000;
            let incrementTime = (totalMilSecDur / end) * 5;

            let timer = setInterval(() => {
                start += Math.ceil(end / 100);
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, incrementTime);
            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    return <span ref={ref}>{count}</span>;
};

const Home = () => {

    // Animation Variants
    const fadeUpVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const popVariant = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
    };

    return (
        <div className="home" style={{ color: '#1a1a1a' }}>
            {/* 1. Hero Banner - Single Image */}
            <section className="hero-modern" style={{ height: '80vh', position: 'relative' }}>
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="hero-slide active"
                    style={{ zIndex: 1 }}
                >
                    <img src="/hero_bg.png" alt="Malla Reddy School Campus" className="hero-slide-img" />
                </motion.div>
                <div className="hero-overlay" style={{ background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))' }}></div>

                <div className="container hero-centered-container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="hero-center-content"
                    >
                        <motion.h1 variants={fadeUpVariant} className="hero-brand-name" style={{ fontFamily: 'Playfair Display, serif', fontSize: '4.5rem' }}>
                            Malla Reddy School
                        </motion.h1>
                        <motion.p variants={fadeUpVariant} className="hero-brand-tagline" style={{ fontSize: '1.5rem', fontWeight: '500', marginTop: '1rem' }}>
                            Empowering Minds, Shaping the Future
                        </motion.p>
                        <motion.div variants={fadeUpVariant} className="hero-modern-btns" style={{ justifyContent: 'center', marginTop: '3rem' }}>
                            <Link to="/admission" className="btn-primary squishy-btn" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '50px' }}>
                                Start Admissions
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. About Snippet */}
            <section className="section about-section text-center" style={{ backgroundColor: '#ffffff', overflow: 'hidden', padding: '6rem 0' }}>
                <div className="container about-grid">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariant}
                        className="about-content" style={{ textAlign: 'left' }}
                    >
                        <h2 className="section-title section-title-spark" style={{ color: 'var(--primary)' }}>Welcome to Excellence</h2>
                        <p className="section-desc" style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                            At Malla Reddy School, we believe in nurturing every child's potential. Our holistic approach integrates academics, sports, and creative arts to build confident, responsible, and forward-thinking individuals ready to face tomorrow's challenges.
                        </p>
                        <Link to="/about" className="link-with-icon" style={{ color: 'var(--primary)', fontSize: '1.25rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                            Read More <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, rotate: -10, x: 50 }} 
                        whileInView={{ opacity: 1, rotate: 0, x: 0 }} 
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
                        className="about-image-wrapper" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
                    >
                        <div className="polaroid-card" style={{ '--rotation': '3deg' } as React.CSSProperties}>
                            <div className="polaroid-taped" style={{ background: '#ddd' }}></div>
                            <div className="polaroid-img-wrapper" style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)' }}>
                                <img
                                    src="/hero_bg.png"
                                    alt="Students learning"
                                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="polaroid-caption" style={{ fontFamily: 'Playfair Display', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', padding: '0.5rem 0', color: '#333' }}>Our Campus</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Stats Counter */}
            <section className="section stats-section text-center text-white" style={{ backgroundColor: '#1e293b', borderTop: '4px solid #fff', borderBottom: '4px solid #fff' }}>
                <div className="container">
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                        className="stats-grid"
                    >
                        {[
                            { icon: <Users size={48} />, val: 2500, label: "Students", plus: true },
                            { icon: <UserCheck size={48} />, val: 150, label: "Teachers", plus: true },
                            { icon: <Heart size={48} />, val: 4000, label: "Happy Parents", plus: true },
                            { icon: <Map size={48} />, val: 15, label: "Acres Campus", plus: false },
                        ].map((stat, idx) => (
                            <motion.div key={idx} variants={popVariant} className="stat-card-modern">
                                <div style={{ color: '#fff', opacity: 0.8, marginBottom: '1rem' }}>{stat.icon}</div>
                                <h3 className="stat-number" style={{ color: '#fff' }}>
                                    <AnimatedCounter value={stat.val} />{stat.plus ? '+' : ''}
                               </h3>
                                <p className="stat-label" style={{ color: '#cbd5e1' }}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. Programs Offered (Blob Cards) */}
            <section className="section programs-section text-center" style={{ backgroundColor: '#f8fafc', padding: '6rem 0' }}>
                <div className="container">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="section-title text-center" style={{ marginBottom: '4rem', fontSize: '2.5rem', color: '#333' }}
                    >
                        Programs Offered
                    </motion.h2>
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                        className="facilities-grid" 
                    >
                        {[
                            { title: 'Pre-Primary', desc: 'Play-based learning focusing on foundational skills and curiosity.', icon: <Star size={32} /> },
                            { title: 'Primary', desc: 'Interactive environment encouraging creativity and core academic growth.', icon: <BookOpen size={32} /> },
                            { title: 'Secondary', desc: 'Comprehensive curriculum emphasizing analytical thinking and application.', icon: <Microscope size={32} /> },
                            { title: 'High School', desc: 'Rigorous preparation for board exams and global career pathways.', icon: <GraduationCap size={32} /> }
                        ].map((prog, idx) => (
                            <motion.div key={idx} variants={popVariant} className="blob-card" style={{ background: '#ffffff', borderColor: '#e2e8f0', boxShadow: '5px 5px 0 #94a3b8' }}>
                                <div className="blob-card-icon" style={{ background: '#f1f5f9', margin: '0 auto 1.5rem auto' }}>
                                    {React.cloneElement(prog.icon, { style: { color: 'var(--primary)' }})}
                                </div>
                                <h3 className="blob-title" style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#1f2937' }}>{prog.title}</h3>
                                <p className="blob-desc" style={{ color: '#64748b' }}>{prog.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 5. Facilities Overview (Notebook Cards) */}
            <section className="section facilities-section text-center" style={{ backgroundColor: '#ffffff', padding: '6rem 0' }}>
                <div className="container">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="section-title text-center" style={{ marginBottom: '4rem', fontSize: '2.5rem', color: '#333' }}
                    >
                        World-Class Facilities
                    </motion.h2>
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                        className="programs-grid"
                    >
                        {[
                            { title: 'Smart Classrooms', img: 'https://images.unsplash.com/photo-1577896851231-70ef18bcee14?q=80&w=600&auto=format&fit=crop', desc: 'Digitally equipped rooms to make learning interactive and fun.' },
                            { title: 'Advanced Labs', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop', desc: 'State-of-the-art Science and Robotics labs for practicals.' },
                            { title: 'Sports Complex', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop', desc: 'Expansive fields and courts for physical excellence.' },
                            { title: 'Campus Safety', img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format&fit=crop', desc: '24/7 security with full CCTV coverage and guards.' }
                        ].map((fac, idx) => (
                            <motion.div key={idx} variants={fadeUpVariant} className="notebook-card" style={{ borderColor: '#e2e8f0' }}>
                                <div className="notebook-spiral" style={{ backgroundImage: 'radial-gradient(#94a3b8 3px, transparent 0)' }}></div>
                                <img src={fac.img} alt={fac.title} className="notebook-photo" />
                                <div className="notebook-inner" style={{ textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
                                    <h3 className="notebook-title" style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#1f2937' }}>{fac.title}</h3>
                                    <p className="notebook-desc" style={{ color: '#64748b', lineHeight: '1.6' }}>{fac.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Home;
