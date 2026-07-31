import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlePuzzle from './ParticlePuzzle';
import CameraAnimation from './CameraAnimation';
import BackgroundStars from './BackgroundStars';
import Nebula from './Nebula';

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('loading');
  const [showText, setShowText] = useState(false);

  // Show text after puzzle starts forming
  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 2500);
    return () => clearTimeout(textTimer);
  }, []);

  const handleFormationComplete = () => {
    setPhase('complete');
  };

  const handleEnter = () => {
    setPhase('exiting');
    const music = document.getElementById('background-music');
    if (music) {
      music.volume = 0.3;
      music.play().catch(() => {});
    }
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      }}
      animate={
        phase === 'exiting'
          ? {
              y: '-100%',
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
            }
          : {}
      }
    >
      {/* ─── WebGL Canvas ─── */}
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 50,
          near: 0.1,
          far: 100,
          position: [0, 0, 40],
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ background: '#000000' }}
      >
        <Suspense fallback={null}>
          <Nebula />
          <BackgroundStars count={800} />
          <ParticlePuzzle onFormationComplete={handleFormationComplete} />
          <CameraAnimation />

          <EffectComposer multisampling={0}>
            <Vignette offset={0.4} darkness={0.7} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* ─── Grid Overlay ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,232,165,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,232,165,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ─── Radial Gradient Overlay ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 30%,
            rgba(0, 0, 0, 0.5) 90%
          )`,
        }}
      />

      {/* ─── Corner Decorations ─── */}
      <CornerDecor />

      {/* ─── Top Label ─── */}
      <motion.div
        className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 pointer-events-none px-4 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p
          className="text-[10px] md:text-xs font-mono tracking-[0.3em] md:tracking-[0.4em] uppercase"
          style={{ color: 'rgba(217, 232, 165, 0.5)' }}
        >
          Digital Experience Studio
        </p>
      </motion.div>

      {/* ─── CENTER TEXT — Brand + Tagline ─── */}
{/* ─── CENTER TEXT — Brand + Tagline ─── */}
<AnimatePresence>
  {showText && (
<motion.div
  className="absolute inset-x-0 top-[62%] md:top-[64%] flex flex-col items-center gap-3 md:gap-4 pointer-events-none px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Brand name */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-center leading-none"
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={{ opacity: 1, letterSpacing: '-0.02em' }}
        transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
      >
        <span className="text-white">C</span>
        <span
          style={{
            color: '#D9E8A5',
            textShadow: '0 0 30px rgba(217, 232, 165, 0.5)',
          }}
        >
          Square
        </span>
      </motion.h1>

      {/* Divider line */}
      <motion.div
        className="h-px w-16 md:w-24"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(217,232,165,0.6), transparent)',
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '6rem', opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />

      {/* Tagline */}
      <motion.p
        className="text-sm sm:text-base md:text-lg font-serif italic text-center max-w-xs md:max-w-md"
        style={{ color: 'rgba(217, 232, 165, 0.75)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        "The Piece Your Vision Needs"
      </motion.p>
    </motion.div>
  )}
</AnimatePresence>

      {/* ─── Enter Button ─── */}
      <AnimatePresence>
        {phase === 'complete' && (
         <motion.div
  className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              onClick={handleEnter}
              className="relative group px-8 md:px-10 py-3 rounded-xl font-semibold text-black overflow-hidden text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #D9E8A5, #E8F5C0)',
                boxShadow: '0 0 30px rgba(217, 232, 165, 0.4)',
              }}
            >
              <span className="relative flex items-center gap-2">
                Enter Experience
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.p
              className="text-[10px] md:text-xs font-mono text-center"
              style={{ color: 'rgba(217, 232, 165, 0.3)' }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Music will play on enter
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Loading dots during formation ─── */}
      <AnimatePresence>
        {phase === 'loading' && (
<motion.div
  className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                  style={{ backgroundColor: '#D9E8A5' }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Bottom info bar ─── */}
      <motion.div
        className="absolute bottom-3 md:bottom-4 left-0 right-0 flex justify-between px-4 md:px-8 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p
          className="text-[9px] md:text-xs font-mono"
          style={{ color: 'rgba(255,255,255,0.15)' }}
        >
          © 2024 CSquare
        </p>
        <p
          className="text-[9px] md:text-xs font-mono"
          style={{ color: 'rgba(255,255,255,0.15)' }}
        >
          v1.0.0
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Corner Decorations ───
function CornerDecor() {
  const corners = [
    { pos: 'top-4 md:top-6 left-4 md:left-6', lines: 'top-0 left-0' },
    { pos: 'top-4 md:top-6 right-4 md:right-6', lines: 'top-0 right-0' },
    { pos: 'bottom-4 md:bottom-6 left-4 md:left-6', lines: 'bottom-0 left-0' },
    {
      pos: 'bottom-4 md:bottom-6 right-4 md:right-6',
      lines: 'bottom-0 right-0',
    },
  ];

  return (
    <>
      {corners.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.pos} w-6 h-6 md:w-8 md:h-8 pointer-events-none`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
        >
          <div
            className={`absolute ${c.lines} w-full h-px`}
            style={{ backgroundColor: 'rgba(217, 232, 165, 0.5)' }}
          />
          <div
            className={`absolute ${c.lines} h-full w-px`}
            style={{ backgroundColor: 'rgba(217, 232, 165, 0.5)' }}
          />
        </motion.div>
      ))}
    </>
  );
}