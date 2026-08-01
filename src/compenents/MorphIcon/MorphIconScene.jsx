// src/compenents/MorphIcon/MorphIconScene.jsx
import { Canvas } from '@react-three/fiber';
import { useEffect, useState, useRef } from 'react';
import MorphParticles from './MorphParticles';

const SECTION_TO_ICON = [
  { id: 'home',     icon: 'hero'     },
  { id: 'about',    icon: 'about'    },
  { id: 'services', icon: 'services' },
  { id: 'pricing',  icon: 'pricing'  },
  { id: 'combos',   icon: 'combos'   },
  { id: 'contact',  icon: 'contact'  },
];

export default function MorphIconScene() {
  const [currentIcon, setCurrentIcon] = useState('hero');
  const lastIconRef = useRef('hero');
  const rafRef = useRef(null);

  useEffect(() => {
    const trySetup = () => {
      const foundSections = SECTION_TO_ICON.filter(
        ({ id }) => document.getElementById(id) !== null
      );

      if (foundSections.length === 0) {
        setTimeout(trySetup, 300);
        return;
      }

      // ── Predictive scroll detection ────────────────────────────
      // Fires BEFORE the section fully arrives at viewport center,
      // so particles morph seamlessly during scroll transition
      const handleScroll = () => {
        if (rafRef.current) return; // throttle to one call per frame

        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;

          // Predictive line: 40% down from top of viewport
          // This makes icon change BEFORE section fully enters
          const detectionLine = window.innerHeight * 0.4;

          let bestSection = null;
          let bestScore = -Infinity;

          foundSections.forEach(({ id, icon }) => {
            const el = document.getElementById(id);
            if (!el) return;

            const rect = el.getBoundingClientRect();

            // Section is a candidate if any part crosses detection line
            if (rect.top <= detectionLine && rect.bottom >= detectionLine) {
              // Prefer section whose CENTER is closest to detection line
              const sectionCenter = rect.top + rect.height / 2;
              const distanceFromLine = Math.abs(sectionCenter - detectionLine);
              const score = -distanceFromLine;

              if (score > bestScore) {
                bestScore = score;
                bestSection = { id, icon };
              }
            }
          });

          // Fallback: if nothing crosses line, use closest to top
          if (!bestSection) {
            let closestDist = Infinity;
            foundSections.forEach(({ id, icon }) => {
              const el = document.getElementById(id);
              if (!el) return;
              const rect = el.getBoundingClientRect();
              const dist = Math.abs(rect.top);
              if (dist < closestDist) {
                closestDist = dist;
                bestSection = { id, icon };
              }
            });
          }

          if (bestSection && bestSection.icon !== lastIconRef.current) {
            lastIconRef.current = bestSection.icon;
            setCurrentIcon(bestSection.icon);
          }
        });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    };

    const cleanup = trySetup();
    return () => cleanup?.();
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          clearColor: 0x000000,
          clearAlpha: 0,
        }}
        style={{ background: 'transparent' }}
      >
        <MorphParticles currentIcon={currentIcon} />
      </Canvas>
    </div>
  );
}