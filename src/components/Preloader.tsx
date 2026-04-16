import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show logo after 6.5 seconds
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 6500);

    // Start fading out after 8.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade animation to complete before notifying parent
      setTimeout(onLoadingComplete, 1000);
    }, 8500);

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
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Sketch Background */}
          <motion.div 
            className="preloader-sketch"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <img 
              src="/images/school_sketch_preloader.png" 
              alt="School Sketch" 
              className="sketch-image"
            />
          </motion.div>

          {/* Logo Overlay */}
          <AnimatePresence>
            {showLogo && (
              <motion.div 
                className="preloader-logo-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
              >
                <img src="/logo.svg" alt="School Logo" className="preloader-logo" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Indicator (Optional but adds premium feel) */}
          <motion.div 
            className="preloader-bar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 8.5, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
