import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Nebula shader — creates soft glowing cloud
const nebulaVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  // Simple noise
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    
    // Distance from center for radial gradient
    vec2 center = vec2(0.5);
    float dist = distance(uv, center);
    
    // Animated noise clouds
    vec2 flow = vec2(uTime * 0.02, uTime * 0.01);
    float n1 = fbm(uv * 3.0 + flow);
    float n2 = fbm(uv * 2.0 - flow * 0.5);
    float cloud = (n1 + n2) * 0.5;
    
    // Emerald nebula color
    vec3 color1 = vec3(0.06, 0.15, 0.10); // deep green
    vec3 color2 = vec3(0.10, 0.25, 0.20); // mint green
    vec3 color3 = vec3(0.05, 0.10, 0.15); // deep teal
    
    vec3 nebulaColor = mix(color1, color2, cloud);
    nebulaColor = mix(color3, nebulaColor, cloud * 0.7);
    
    // Radial falloff — brightest in center, dark at edges
    float radial = 1.0 - smoothstep(0.0, 0.7, dist);
    
    // Combine with cloud intensity
    float intensity = cloud * radial;
    
    // Subtle overall alpha
    float alpha = intensity * 0.25;
    
    gl_FragColor = vec4(nebulaColor, alpha);
  }
`;

export default function Nebula() {
  const meshRef = useRef();
  const timeRef = useRef(0);

  const { uniforms, material } = useMemo(() => {
    const uniformsObj = {
      uTime: { value: 0 },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader: nebulaVertexShader,
      fragmentShader: nebulaFragmentShader,
      uniforms: uniformsObj,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    return { uniforms: uniformsObj, material: mat };
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    uniforms.uTime.value = timeRef.current;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]}>
      <planeGeometry args={[80, 80]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}