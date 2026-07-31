import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './particleShader';
import { generatePuzzlePoints } from './puzzleShape';

export default function ParticlePuzzle({ onFormationComplete }) {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });

  const [explosion, setExplosion] = useState(0);
  const [puzzlePoints, setPuzzlePoints] = useState(null);
  const timeRef = useRef(0);
  const formationStartTime = useRef(null);

const isMobile =
  typeof window !== 'undefined' && window.innerWidth < 768;
const particleCount = isMobile ? 3000 : 5000;

  const palette = useMemo(
    () => [
      new THREE.Color('#D9E8A5'),
      new THREE.Color('#D9E8A5'),
      new THREE.Color('#A5D9C0'),
      new THREE.Color('#7FB98A'),
      new THREE.Color('#B5D080'),
      new THREE.Color('#FFFFFF'),
    ],
    []
  );

  // Load SVG puzzle points
  useEffect(() => {
    generatePuzzlePoints(particleCount).then(setPuzzlePoints);
  }, [particleCount]);

  // Build geometry when points are loaded
  const { geometry, uniforms, material } = useMemo(() => {
    if (!puzzlePoints) return { geometry: null, uniforms: null, material: null };

    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const targets = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      const target = puzzlePoints[i] || puzzlePoints[i % puzzlePoints.length];
      targets[i3] = target.x;
      targets[i3 + 1] = target.y;
      targets[i3 + 2] = target.z;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 10 + Math.random() * 12;
      randoms[i3] = r * Math.sin(phi) * Math.cos(theta);
      randoms[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      randoms[i3 + 2] = r * Math.cos(phi);

      positions[i3] = randoms[i3];
      positions[i3 + 1] = randoms[i3 + 1];
      positions[i3 + 2] = randoms[i3 + 2];

      sizes[i] =
        Math.random() < 0.9
          ? 0.3 + Math.random() * 0.4
          : 0.6 + Math.random() * 0.5;

      offsets[i] = Math.random() * Math.PI * 2;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aTarget', new THREE.BufferAttribute(targets, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const uniformsObj = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseStrength: { value: 0.6 },
      uSize: { value: 0.55 },
      uExplosion: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsObj,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    return { geometry: geo, uniforms: uniformsObj, material: mat };
  }, [particleCount, palette, puzzlePoints]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

useEffect(() => {
  if (!puzzlePoints) return;

  // Simply notify completion after puzzle forms (no explosion)
  const timer = setTimeout(() => {
    if (onFormationComplete) {
      onFormationComplete();
    }
  }, 4200);

  return () => clearTimeout(timer);
}, [onFormationComplete, puzzlePoints]);

  useFrame((state, delta) => {
    if (!uniforms) return;

    timeRef.current += delta;
    uniforms.uTime.value = timeRef.current;

    if (formationStartTime.current === null) {
      formationStartTime.current = timeRef.current + 0.8;
    }

    const elapsed = timeRef.current - formationStartTime.current;
    const rawProgress = Math.max(0, Math.min(1, elapsed / 3));
    const eased = rawProgress === 1 ? 1 : 1 - Math.pow(2, -7 * rawProgress);
    uniforms.uProgress.value = eased;

    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05;
    uniforms.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y);

    // Smoothly interpolate explosion value in shader
uniforms.uExplosion.value = 0; // No explosion

if (pointsRef.current) {
  // Very subtle mouse-based tilt only, no automatic rotation
  pointsRef.current.rotation.y = (smoothMouse.current.x - 0.5) * 0.15;
  pointsRef.current.rotation.x = (smoothMouse.current.y - 0.5) * -0.1;
}
  });

  if (!geometry || !material) return null;

return (
  <points
    ref={pointsRef}
    geometry={geometry}
    material={material}
    position={[0, 2.5, 0]}
  />
);
}