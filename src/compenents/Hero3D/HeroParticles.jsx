import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uPixelRatio;
  uniform float uProgress;
  uniform float uExplode;
  
  attribute vec3 aTarget;
  attribute vec3 aRandom;
  attribute float aSize;
  attribute float aSpeed;
  attribute float aOffset;
  attribute vec3 aColor;
  
  varying vec3 vColor;
  varying float vAlpha;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vColor = aColor;
    
    // Interpolate from random → target based on assembly progress
    vec3 pos = mix(aRandom, aTarget, uProgress);
    
    // Add scroll-based explosion outward
    if (uExplode > 0.0) {
      vec3 explodeDir = normalize(aTarget + vec3(0.001));
      float rand = fract(sin(aOffset * 12.9898) * 43758.5453);
      float force = uExplode * (2.0 + rand * 3.0);
      pos += explodeDir * force;
    }
    
    // Noise floating
    float t = uTime * aSpeed * 0.25 + aOffset;
    float noise = snoise(vec3(pos.x * 0.3, pos.y * 0.3, t)) * 0.15;
    float noise2 = snoise(vec3(pos.y * 0.3, pos.z * 0.3, t + 100.0)) * 0.15;
    pos.x += noise * (1.0 - uProgress * 0.7);
    pos.y += noise2 * (1.0 - uProgress * 0.7);
    
    // Mouse repulsion
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vec4 projected = projectionMatrix * mvPos;
    vec2 screenPos = projected.xy / projected.w;
    vec2 mouseNorm = uMouse * 2.0 - 1.0;
    float mouseDist = distance(screenPos, mouseNorm);
    float mouseForce = smoothstep(0.4, 0.0, mouseDist) * uMouseStrength;
    vec2 pushDir = normalize(screenPos - mouseNorm);
    pos.xy += pushDir * mouseForce * 0.8;
    
    vec4 finalPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * finalPos;
    
    gl_PointSize = aSize * uPixelRatio * (150.0 / -finalPos.z);
    
    vAlpha = mix(0.4, 0.8, uProgress);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;
  float alpha = 1.0 - smoothstep(0.35, 0.5, dist);
  gl_FragColor = vec4(vColor, alpha * vAlpha * 0.75);
}
`;

// Load SVG and extract points
// Load image and extract particles from black pixels
async function loadImagePoints(imageUrl, pointCount) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Create canvas to read pixels
      const canvas = document.createElement('canvas');
      const size = 200; // Sample resolution
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Draw image scaled to canvas
      ctx.drawImage(img, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size);
      const pixels = imageData.data;

      // Find all dark (icon) pixels
      const darkPixels = [];
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const idx = (y * size + x) * 4;
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];
          const a = pixels[idx + 3];

          // Detect dark pixels (icon lines)
          const brightness = (r + g + b) / 3;
          if (a > 100 && brightness < 100) {
            darkPixels.push({ x, y });
          }
        }
      }

      console.log(`Found ${darkPixels.length} icon pixels`);

      if (darkPixels.length === 0) {
        console.error('No dark pixels found! Check image.');
        resolve([]);
        return;
      }

      // Sample particles from dark pixels
      const points = [];
      for (let i = 0; i < pointCount; i++) {
        const pixel = darkPixels[Math.floor(Math.random() * darkPixels.length)];

        // Convert to 3D coordinates (centered, scaled)
        const x = (pixel.x - size / 2) / 20;
        const y = -(pixel.y - size / 2) / 20;
        const z = (Math.random() - 0.5) * 0.5;

        // Add tiny jitter for organic feel
        points.push({
          x: x + (Math.random() - 0.5) * 0.1,
          y: y + (Math.random() - 0.5) * 0.1,
          z,
        });
      }

      resolve(points);
    };

    img.onerror = () => {
      console.error('Failed to load image:', imageUrl);
      resolve([]);
    };

    img.src = imageUrl;
  });
}

export default function HeroParticles({ scrollProgress = 0 }) {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const progressRef = useRef(0);
  const startTimeRef = useRef(null);
  const [svgPoints, setSvgPoints] = useState(null);

  const particleCount = 4000;

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

 useEffect(() => {
  loadImagePoints('/hero-icon.jpg', particleCount).then(setSvgPoints);
}, []);

  const { geometry, uniforms, material } = useMemo(() => {
    if (!svgPoints || svgPoints.length === 0) {
      return { geometry: null, uniforms: null, material: null };
    }

    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const targets = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      const target = svgPoints[i] || svgPoints[i % svgPoints.length];
      targets[i3] = target.x;
      targets[i3 + 1] = target.y;
      targets[i3 + 2] = target.z;

      // Scatter position (far away for assembly animation)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 10 + Math.random() * 15;
      randoms[i3] = r * Math.sin(phi) * Math.cos(theta);
      randoms[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      randoms[i3 + 2] = r * Math.cos(phi);

      // Initial = random scattered
      positions[i3] = randoms[i3];
      positions[i3 + 1] = randoms[i3 + 1];
      positions[i3 + 2] = randoms[i3 + 2];

sizes[i] =
  Math.random() < 0.9
    ? 0.2 + Math.random() * 0.3   // Very small (90%)
    : 0.4 + Math.random() * 0.3;  // Small (10%)

      speeds[i] = 0.5 + Math.random() * 0.8;
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
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const uniformsObj = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseStrength: { value: 1.0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uProgress: { value: 0 },
      uExplode: { value: 0 },
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
  }, [palette, svgPoints]);

useEffect(() => {
  const handleMove = (e) => {
    mouse.current.x = e.clientX / window.innerWidth;
    mouse.current.y = 1 - e.clientY / window.innerHeight;
  };
  window.addEventListener('mousemove', handleMove);
  return () => window.removeEventListener('mousemove', handleMove);
}, []);

  useFrame((state, delta) => {
    if (!uniforms) return;

    timeRef.current += delta;
    uniforms.uTime.value = timeRef.current;

    // Assembly progress (0 → 1 over 3 seconds)
    if (startTimeRef.current === null) {
      startTimeRef.current = timeRef.current;
    }
    const elapsed = timeRef.current - startTimeRef.current;
    const rawProgress = Math.min(elapsed / 3.0, 1);
    const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
    progressRef.current = easedProgress;
    uniforms.uProgress.value = easedProgress;

    // Scroll-based explosion (only after assembly)
    if (easedProgress >= 1) {
      uniforms.uExplode.value = THREE.MathUtils.lerp(
        uniforms.uExplode.value,
        scrollProgress * 2, // stronger explosion
        0.1
      );
    }

    // Smooth mouse
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.06;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.06;
    uniforms.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y);
  });

  if (!geometry || !material) return null;

return (
  <points
    ref={pointsRef}
    geometry={geometry}
    material={material}
    position={[5, 0, 0]}
    scale={[0.9, 0.9, 0.9]}
  />
);
}