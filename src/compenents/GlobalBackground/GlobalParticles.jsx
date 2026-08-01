import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uMouseVelocity;
  uniform float uPixelRatio;
  uniform float uScrollY;
  
  attribute vec3 aOriginal;
  attribute float aSize;
  attribute float aSpeed;
  attribute float aOffset;
  attribute vec3 aColor;
  attribute float aInfluence;
  
  varying vec3 vColor;
  varying float vAlpha;

  // Simplex noise
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
    
    vec3 pos = aOriginal;
    
    // Scroll parallax — layers move at different speeds
    pos.y += uScrollY * (0.5 + aInfluence * 0.5);
    
    // Wrap vertically for infinite feel
    pos.y = mod(pos.y + 30.0, 60.0) - 30.0;
    
    // Noise-based organic movement
    float t = uTime * aSpeed * 0.2 + aOffset;
    vec3 noise = vec3(
      snoise(vec3(pos.x * 0.1, pos.y * 0.1, t)),
      snoise(vec3(pos.y * 0.1, pos.z * 0.1, t + 100.0)),
      snoise(vec3(pos.z * 0.1, pos.x * 0.1, t + 200.0))
    );
    pos += noise * 0.4;
    
    // Screen position
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vec4 projected = projectionMatrix * mvPos;
    vec2 screenPos = projected.xy / projected.w;
    
    // Mouse position in clip space
    vec2 mouseNorm = uMouse * 2.0 - 1.0;
    float mouseDist = distance(screenPos, mouseNorm);
    
    // USTA-STYLE: Particles follow mouse with delay + drift toward it
    // Attraction strength based on distance
    float attraction = smoothstep(0.6, 0.0, mouseDist);
    
    // Direction toward mouse
    vec2 toMouse = (mouseNorm - screenPos) * attraction;
    
    // Different particles react differently (based on aInfluence)
    // Some get attracted, some get repelled slightly
    float behavior = aInfluence * 2.0 - 1.0; // -1 to 1
    pos.xy += toMouse * behavior * 0.8;
    
    // Add velocity drag — particles follow mouse movement direction
    pos.xy += uMouseVelocity * attraction * aInfluence * 2.0;
    
    // Recalculate final position
    vec4 finalPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * finalPos;
    
    // Small particles
    gl_PointSize = aSize * uPixelRatio * (150.0 / -finalPos.z);
    
    // Fade based on depth
    vAlpha = 0.8;

  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    if (dist > 0.5) discard;
    
    // Very soft edges
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    
    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

export default function GlobalParticles({ count = 2500 }) {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const prevMouse = useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const scrollY = useRef(0);

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
    const originals = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const influences = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Wide spread
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 12;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      originals[i3] = x;
      originals[i3 + 1] = y;
      originals[i3 + 2] = z;

      // Very small dots (like USTA)
sizes[i] =
  Math.random() < 0.85
    ? 0.4 + Math.random() * 0.4
    : 0.7 + Math.random() * 0.5;

      speeds[i] = 0.3 + Math.random() * 0.7;
      offsets[i] = Math.random() * Math.PI * 2;

      // Random influence factor (some react more, some less)
      influences[i] = Math.random();

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aOriginal', new THREE.BufferAttribute(originals, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aInfluence', new THREE.BufferAttribute(influences, 1));

    const uniformsObj = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVelocity: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uScrollY: { value: 0 },
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
    const handleScroll = () => {
      scrollY.current = window.scrollY * 0.001;
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    uniforms.uTime.value = timeRef.current;
    uniforms.uScrollY.value = scrollY.current;

    // Calculate mouse velocity
    mouseVelocity.current.x = mouse.current.x - prevMouse.current.x;
    mouseVelocity.current.y = mouse.current.y - prevMouse.current.y;
    prevMouse.current.x = mouse.current.x;
    prevMouse.current.y = mouse.current.y;

    // Smooth mouse
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.1;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.1;

    uniforms.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y);
    uniforms.uMouseVelocity.value.set(
      mouseVelocity.current.x * 5,
      mouseVelocity.current.y * 5
    );
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}