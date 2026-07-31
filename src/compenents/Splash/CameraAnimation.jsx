import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

export default function CameraAnimation() {
  const { camera } = useThree();
  const startTime = useRef(null);

useFrame((state) => {
  if (startTime.current === null) {
    startTime.current = state.clock.elapsedTime;
  }
  const t = state.clock.elapsedTime - startTime.current;

  // Detect mobile
  const isMobile = window.innerWidth < 768;

  let z;
  if (t < 3) {
    const p = t / 3;
    const eased = 1 - Math.pow(1 - p, 3);
    z = isMobile ? 45 - eased * 18 : 40 - eased * 18;
  } else {
    z = isMobile ? 27 : 22;
  }

  camera.position.z = z;

  // Slight upward look on mobile so puzzle stays visible above text/button
camera.position.y = 0; // Keep camera at center
  camera.lookAt(0, 0, 0);
});

  return null;
}