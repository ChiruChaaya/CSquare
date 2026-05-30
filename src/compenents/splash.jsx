import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2; // Adjust speed here (higher = faster)
      });
    }, 30); // Adjust tick rate here

    return () => clearInterval(timer);
  }, []);

  // When progress hits 100, trigger the onComplete callback after a delay

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-950 text-white"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      
      {/* Background Tint (Matching your theme) */}
      <div className="absolute inset-0 bg-[#183A3B]/20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* LOGO / BRAND NAME */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold font-serif tracking-tight mb-4"
        >
          C<span className="text-emerald-500">SQUARE</span>
        </motion.h1>

        {/* LOADING BAR CONTAINER */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
          {/* FILLING BAR */}
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* PERCENTAGE TEXT */}
        <div className="mt-4 font-mono text-xs text-neutral-500">
          {progress}%
        </div>

        {progress === 100 && (
  <motion.button
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    onClick={() => {
      const music = document.getElementById("background-music");

      if (music) {
        music.play();
      }

      onComplete();
    }}
    className="
      mt-6
      px-8
      py-3
      bg-emerald-500
      hover:bg-emerald-600
      text-white
      rounded-xl
      font-semibold
      shadow-lg
      transition-all
      duration-300
    "
  >
    Get In
  </motion.button>
)}
      
      </div>
    </motion.div>
  );
};

export default SplashScreen;