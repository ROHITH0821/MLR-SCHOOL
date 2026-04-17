'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import ContactFab from '@/components/ContactFab';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="app-container">
        {!loading && (
          <>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ContactFab />
          </>
        )}
      </div>
    </>
  );
}
