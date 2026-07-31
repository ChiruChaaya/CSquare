import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex shader for background stars
const starVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  
  attribute float aSize;
  attribute float aSpeed;
  attribute float aOffset;
  
  varying float vBrightness;
  varying float vTwinkle;

  void main() {
    vec3 pos = position;
    
    // Very slow drift
    pos.x += sin(uTime * aSpeed * 0.1 + aOffset) * 0.3;
    pos.y += cos(uTime * aSpeed * 0.15 + aOffset) * 0.2;
    
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;
    
    // Depth-based sizing
    gl_PointSize = aSize * uPixelRatio * (150.0 / -mvPos.z);
    
    // Twinkle effect
    vTwinkle = sin(uTime * aSpeed * 2.0 + aOffset * 3.14) * 0.5 + 0.5;
    vBrightness = 0.3 + 0.7 * vTwinkle;
  }
`;

const starFragmentShader = /* glsl */ `
  varying float vBrightness;
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    
    if (dist > 0.5) discard;
    
    // Sharp small stars
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    
    // Slight color variation
    vec3 color = mix(
      vec3(0.85, 0.95, 1.0),   // slight cyan white
      vec3(1.0, 0.98, 0.85),   // slight warm white
      vTwinkle
    );
    
    gl_FragColor = vec4(color, alpha * vBrightness * 0.4);
  }
`;

export default function BackgroundStars({ count = 800 }) {
  const pointsRef = useRef();
  const timeRef = useRef(0);

  const { geometry, uniforms, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute stars in a large sphere far behind the puzzle
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 25 + Math.random() * 35;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi) - 15; // push behind

      sizes[i] = 0.3 + Math.random() * 0.9;
      speeds[i] = 0.2 + Math.random() * 0.8;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));

    const uniformsObj = {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: uniformsObj,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, uniforms: uniformsObj, material: mat };
  }, [count]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    uniforms.uTime.value = timeRef.current;

    // Very slow rotation for cosmic feel
    if (pointsRef.current) {
      pointsRef.current.rotation.y = timeRef.current * 0.008;
      pointsRef.current.rotation.z = Math.sin(timeRef.current * 0.02) * 0.05;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}