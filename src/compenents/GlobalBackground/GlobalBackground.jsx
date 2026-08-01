import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import GlobalParticles from './GlobalParticles';

export default function GlobalBackground() {
  return (
    <div
      className="fixed inset-0"
      style={{
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 55,
          near: 0.1,
          far: 100,
          position: [0, 0, 15],
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
      >
        <Suspense fallback={null}>
          <GlobalParticles count={2500} />
        </Suspense>
      </Canvas>
    </div>
  );
}