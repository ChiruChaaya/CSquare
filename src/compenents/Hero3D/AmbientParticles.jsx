import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex shader — particles scale up + push away from cursor
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  uniform float uMouseRadius;
  uniform float uMouseStrength;
  
  attribute float aSize;
  attribute float aSpeed;
  attribute float aOffset;
  attribute vec3 aColor;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vScale;

  void main() {
    vColor = aColor;
    
    vec3 pos = position;
    
    // Gentle floating drift
    float t = uTime * aSpeed * 0.15 + aOffset;
    pos.x += sin(t) * 0.3;
    pos.y += cos(t * 0.7) * 0.25;
    pos.z += sin(t * 0.5) * 0.2;
    
    // Calculate screen position for mouse interaction
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vec4 projected = projectionMatrix * mvPos;
    vec2 screenPos = projected.xy / projected.w;
    
    // Mouse position in clip space
    vec2 mouseNorm = uMouse * 2.0 - 1.0;
    float mouseDist = distance(screenPos, mouseNorm);
    
    // MOUSE REPULSION — push particles away from cursor
    float repulsion = smoothstep(uMouseRadius, 0.0, mouseDist) * uMouseStrength;
    vec2 pushDir = normalize(screenPos - mouseNorm);
    pos.xy += pushDir * repulsion * 0.5;
    
    // MOUSE SCALE — particles near cursor grow larger
    float scaleBoost = smoothstep(uMouseRadius, 0.0, mouseDist) * 2.5;
    vScale = 1.0 + scaleBoost;
    
    // Recalculate final position with pushed values
    vec4 finalPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * finalPos;
    
    // Size with scale boost from mouse proximity
    gl_PointSize = aSize * vScale * uPixelRatio * (120.0 / -finalPos.z);
    
    vAlpha = 0.7;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vScale;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    if (dist > 0.5) discard;
    
    // Sharp particles
    float alpha = 1.0 - smoothstep(0.35, 0.5, dist);
    
    // Brighten scaled particles
    vec3 color = vColor + vec3(vScale * 0.1);
    
    gl_FragColor = vec4(color, alpha * vAlpha);
  }
`;

export default function AmbientParticles({ count = 1500 }) {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);

  const palette = useMemo(
    () => [
      new THREE.Color('#D9E8A5'),
      new THREE.Color('#A5D9C0'),
      new THREE.Color('#7FB98A'),
      new THREE.Color('#B5D080'),
      new THREE.Color('#FFFFFF'),
    ],
    []
  );

  const { geometry, uniforms, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Wide spread — fill entire hero background
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Small sizes
      sizes[i] =
        Math.random() < 0.85
          ? 0.3 + Math.random() * 0.4
          : 0.6 + Math.random() * 0.5;

      speeds[i] = 0.3 + Math.random() * 0.7;
      offsets[i] = Math.random() * Math.PI * 2;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const uniformsObj = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMouseRadius: { value: 0.4 },
      uMouseStrength: { value: 1.0 },
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
  }, [count, palette]);

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    uniforms.uTime.value = timeRef.current;

    // Smooth mouse tracking
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.08;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.08;
    uniforms.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}