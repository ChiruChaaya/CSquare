import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroParticles from './HeroParticles';

export default function Hero3DScene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(scrolled / heroHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{
        fov: 55,
        near: 0.1,
        far: 100,
        position: [0, 0, 12],
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{
        background: 'transparent',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <Suspense fallback={null}>
  <HeroParticles scrollProgress={scrollProgress} />
</Suspense>
    </Canvas>
  );
}