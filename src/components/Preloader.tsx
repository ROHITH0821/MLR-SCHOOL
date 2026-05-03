'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 2000);

    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 700);
    }, 3200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
        >
          <motion.div
            className="preloader-bg"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Image
              src="/images/intro_sports_day.png"
              alt=""
              className="preloader-bg-img preloader-bg-img--photo"
              fill
              priority
              sizes="100vw"
            />
          </motion.div>

          <AnimatePresence>
            {showLogo && (
              <motion.div
                className="preloader-logo-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'backOut' }}
              >
                <Image
                  src="/logo.svg"
                  alt="School Logo"
                  className="preloader-logo"
                  width={180}
                  height={180}
                  priority
                  unoptimized
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
