import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Music toggle button that appears in bottom-right corner
export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Check music state on mount
    const audio = document.getElementById('background-music');
    if (audio) {
      setIsPlaying(!audio.paused);
    }
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById('background-music');
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-neutral-900/80 backdrop-blur border border-emerald-500/30 flex items-center justify-center hover:border-emerald-400 transition-colors group"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        // Playing — show animated equalizer bars
        <div className="flex items-end gap-0.5 h-4">
          <motion.div
            className="w-0.5 bg-emerald-400 rounded-full"
            animate={{ height: ['30%', '100%', '30%'] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
            style={{ height: '30%' }}
          />
          <motion.div
            className="w-0.5 bg-emerald-400 rounded-full"
            animate={{ height: ['60%', '30%', '60%'] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
            style={{ height: '60%' }}
          />
          <motion.div
            className="w-0.5 bg-emerald-400 rounded-full"
            animate={{ height: ['100%', '40%', '100%'] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
            style={{ height: '100%' }}
          />
          <motion.div
            className="w-0.5 bg-emerald-400 rounded-full"
            animate={{ height: ['40%', '80%', '40%'] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.45 }}
            style={{ height: '40%' }}
          />
        </div>
      ) : (
        // Paused — show mute icon
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-emerald-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3L8 7H4v10h4l4 4zM17 9l6 6M23 9l-6 6"
          />
        </svg>
      )}
    </motion.button>
  );
}