'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import ContactFab from '@/components/ContactFab';
import CallFab from '@/components/CallFab';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsMounted(true);
    const seen = localStorage.getItem('mr-preloader-seen');
    if (seen === 'true') {
      setLoading(false);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleComplete = () => {
    localStorage.setItem('mr-preloader-seen', 'true');
    setLoading(false);
  };

  // We must ensure the first render matches the server exactly to avoid hydration errors
  const showPreloader = !isMounted || loading;

  return (
    <>
      <AnimatePresence>
        {showPreloader && <Preloader onLoadingComplete={handleComplete} />}
      </AnimatePresence>

      <div className="app-container">
        {!showPreloader && (
          <>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ContactFab />
            <CallFab />
          </>
        )}
      </div>
    </>
  );
}
