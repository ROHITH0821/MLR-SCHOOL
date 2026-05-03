'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen, closeMenu]);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'About',
      path: '#',
      dropdown: [
        { name: 'About School', path: '/about' },
        { name: "Principal's Desk", path: '/principal' },
        { name: 'Management Team', path: '/management-team' },
        { name: 'Vision & Mission', path: '/vision' },
      ],
    },
    {
      name: 'Academics',
      path: '#',
      dropdown: [
        { name: 'IIT Foundation', path: '/iit-foundation' },
        { name: 'Curriculum', path: '/curriculum' },
        { name: 'Labs', path: '/labs' },
        { name: 'Student Achievers', path: '/achievers' },
        { name: 'Careers', path: '/careers' },
      ],
    },
    {
      name: 'Co-Curricular',
      path: '/co-curricular',
      dropdown: [
        { name: 'Dance', path: '/co-curricular#dance' },
        { name: 'Music', path: '/co-curricular#music' },
        { name: 'Art & Craft', path: '/co-curricular#art-craft' },
        { name: 'Indoor Games', path: '/co-curricular#indoor' },
        { name: 'Outdoor Games', path: '/co-curricular#outdoor' },
        { name: 'Summer Camps', path: '/co-curricular#summercamps' },
      ],
    },
    { name: 'Gallery', path: '/gallery', galleryPill: true },
    {
      name: 'Admissions',
      path: '#',
      dropdown: [
        { name: 'Admission Procedure', path: '/admission' },
      ],
    },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`navbar-shell ${scrolled ? 'is-scrolled' : ''} ${pathname === '/' ? 'navbar-shell--home' : ''}`}
      >
        <div className="navbar-panel">
          <div className="navbar-bar">

            {/* Left: Logo + Wordmark */}
            <div className="navbar-start">
              <Link
                href="/"
                className="navbar-mark"
                onClick={closeMenu}
                aria-label="Malla Reddy School home"
              >
                <img src="/logo.svg" alt="" width={56} height={56} className="navbar-mark-img" />
                <span className="navbar-wordmark">Malla Reddy School</span>
              </Link>
            </div>

            {/* Trailing: nav links + Apply (flush right, large gap after logo — like reference) */}
            <div className="navbar-trailing">
              <nav className="navbar-desktop" aria-label="Primary">
                {navLinks.map((link) =>
                  'dropdown' in link && link.dropdown ? (
                    <div key={link.name} className="navbar-dd">
                      <div className="navbar-dd-trigger">
                        {link.name}
                        <ChevronDown size={14} strokeWidth={2.5} aria-hidden />
                      </div>
                      <div className="navbar-dd-menu">
                        {link.dropdown.map((sub) => {
                          const subPath = sub.path.split('#')[0];
                          return (
                            <Link
                              key={sub.name}
                              href={sub.path}
                              className={`navbar-dd-item ${pathname === subPath ? 'is-active' : ''}`}
                              onClick={closeMenu}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`navbar-desktop-link ${pathname === link.path ? 'is-active' : ''
                        } ${'galleryPill' in link && link.galleryPill ? 'navbar-desktop-link--gallery' : ''}`}
                    >
                      {link.name}
                    </Link>
                  ),
                )}
              </nav>

              <div className="navbar-end">
                <a href="tel:+919123456789" className="navbar-call-btn" onClick={closeMenu}>
                  <Phone size={16} />
                  <span>Call Us</span>
                </a>
                <Link href="/admission" className="navbar-cta" onClick={closeMenu}>
                  APPLY NOW
                </Link>
                <button
                  type="button"
                  className="navbar-menu-trigger"
                  aria-expanded={menuOpen}
                  aria-controls="site-nav-menu"
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  onClick={() => setMenuOpen((o) => !o)}
                >
                  {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <div
            id="site-nav-menu"
            className={`navbar-menu-panel ${menuOpen ? 'is-open' : ''}`}
            aria-hidden={!menuOpen}
          >
            <nav className="navbar-menu-inner" aria-label="Site pages">
              {navLinks.map((link) => (
                <div key={link.name} className="navbar-menu-group">
                  {'dropdown' in link && link.dropdown ? (
                    <>
                      <span className="navbar-menu-label">{link.name}</span>
                      <div className="navbar-menu-sub">
                        {link.dropdown.map((sub) => {
                          const subPath = sub.path.split('#')[0];
                          return (
                            <Link
                              key={sub.name}
                              href={sub.path}
                              className={`navbar-menu-link ${pathname === subPath ? 'is-active' : ''}`}
                              onClick={closeMenu}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.path}
                      className={`navbar-menu-link navbar-menu-link--solo ${pathname === link.path ? 'is-active' : ''}`}
                      onClick={closeMenu}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="navbar-menu-ctas" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <a href="tel:+919123456789" className="navbar-menu-call" onClick={closeMenu}>
                  <Phone size={20} />
                  <span>Call Us</span>
                </a>
                <Link href="/admission" className="navbar-menu-cta" onClick={closeMenu}>
                  APPLY NOW
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <button
          type="button"
          className="navbar-menu-backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      ) : null}
    </>
  );
};

export default Navbar;
