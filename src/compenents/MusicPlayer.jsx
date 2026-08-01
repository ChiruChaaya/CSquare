// src/compenents/MusicPlayer.jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ── Listen for global "start music" events fired from Splash ────────────
  useEffect(() => {
    const handleStartMusic = async () => {
      const audio = audioRef.current;
      if (!audio) return;
      try {
        await audio.play();
        setIsPlaying(true);
        console.log('[Music] ▶️ Playing');
      } catch (err) {
        console.error('[Music] ❌ Autoplay blocked:', err);
      }
    };

    window.addEventListener('start-music', handleStartMusic);
    return () => window.removeEventListener('start-music', handleStartMusic);
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('[Music] ❌ Play failed:', err);
      }
    }
  };

  return (
    <>
      {/* Audio element — persists forever, never unmounts */}
      <audio
        ref={audioRef}
        id="background-music"
        src="/music/atlasaudio-hope-piano-509806.mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-neutral-900/80 backdrop-blur border border-emerald-500/30 flex items-center justify-center hover:border-emerald-400 transition-colors group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        data-cursor="button"
      >
        {isPlaying ? (
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
    </>
  );
}