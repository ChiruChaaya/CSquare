// src/compenents/MorphIcon/MorphParticles.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ICON_CONFIG, sampleImagePoints, generateAmbientCloud } from './svgIcons';

const PARTICLE_COUNT = 4000;  // ← Denser like splash (was 3000)

const POSITION_OFFSETS = {
  left:   -3.0,
  center:  0,
  right:   3.0,
};

export default function MorphParticles({ currentIcon = 'hero' }) {
  const pointsRef  = useRef(null);
  const groupRef   = useRef(null);
  const { camera } = useThree();
  const mouseWorld = useRef({ x: 99999, y: 99999 });
  const [targets, setTargets] = useState(null);

  // ── Mouse → world coords ─────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      const ndcX =  (e.clientX / window.innerWidth)  * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      const wp = camera.position.clone().add(dir.multiplyScalar(dist));
      mouseWorld.current.x = wp.x;
      mouseWorld.current.y = wp.y;
    };
    const onLeave = () => {
      mouseWorld.current.x = 99999;
      mouseWorld.current.y = 99999;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [camera]);

  // ── Load all targets ─────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const loaded = {};
      for (const [name, cfg] of Object.entries(ICON_CONFIG)) {
        if (cfg.ambient) {
          loaded[name] = generateAmbientCloud(PARTICLE_COUNT, cfg.scale);
        } else {
          loaded[name] = await sampleImagePoints(
            cfg.src,
            PARTICLE_COUNT,
            220,
            cfg.scale
          );
        }
      }
      if (!cancelled) setTargets(loaded);
    })();
    return () => { cancelled = true; };
  }, []);

  // ── Geometry with per-particle color + size variation ───────────────────
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);
    const sizes     = new Float32Array(PARTICLE_COUNT);

    // Splash-style palette — warm whites + emerald accents
    const palette = [
      new THREE.Color('#FFFFFF'),   // pure white (dominant)
      new THREE.Color('#FFFFF0'),   // warm white
      new THREE.Color('#F5FBD8'),   // cream-emerald
      new THREE.Color('#E8F5B0'),   // soft emerald
      new THREE.Color('#D9E8A5'),   // brand emerald
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      // Color distribution: mostly white/warm white, few emerald accents
      const rand = Math.random();
      let color;
      if (rand < 0.55)       color = palette[0]; // 55% pure white
      else if (rand < 0.80)  color = palette[1]; // 25% warm white
      else if (rand < 0.92)  color = palette[2]; // 12% cream
      else if (rand < 0.98)  color = palette[3]; // 6% soft emerald
      else                   color = palette[4]; // 2% brand emerald (accents)

      colors[i * 3]     = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Size variation: mostly small with occasional larger ones
      const sizeRand = Math.random();
      if (sizeRand < 0.85)       sizes[i] = 1.0;
      else if (sizeRand < 0.97)  sizes[i] = 1.5;
      else                       sizes[i] = 2.2;  // rare larger accents
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, []);

  // ── Splash-style bright glowing texture ──────────────────────────────────
  const material = useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Soft warm glow — matches splash particle look
    const grad = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    grad.addColorStop(0,    'rgba(255,255,255,1)');
    grad.addColorStop(0.1,  'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(255,253,235,0.9)');
    grad.addColorStop(0.5,  'rgba(240,250,200,0.4)');
    grad.addColorStop(0.8,  'rgba(217,232,165,0.1)');
    grad.addColorStop(1,    'rgba(217,232,165,0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);

    // Custom shader material for per-particle sizes + vertex colors
    return new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: tex },
        uPixelRatio:  { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3  color;
        varying   vec3  vColor;
        uniform   float uPixelRatio;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * 45.0 * uPixelRatio / -mvPosition.z;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3      vColor;

        void main() {
          vec4 tex = texture2D(pointTexture, gl_PointCoord);
          gl_FragColor = vec4(vColor, tex.a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // ── Morph state ──────────────────────────────────────────────────────────
  const anim = useRef({
    currentTarget:  null,
    previousTarget: null,
    morphProgress:  1,
    currentOffset:  3.0,
    displayOffset:  3.0,
  });

  useEffect(() => {
    if (!targets) return;
    const cfg = ICON_CONFIG[currentIcon] || ICON_CONFIG.hero;
    anim.current.currentTarget  = targets[currentIcon] || targets.hero;
    anim.current.previousTarget = null;
    anim.current.morphProgress  = 1;
    anim.current.currentOffset  = POSITION_OFFSETS[cfg.position] ?? 3.0;
    anim.current.displayOffset  = anim.current.currentOffset;
  }, [targets]);

  useEffect(() => {
    if (!targets || !anim.current.currentTarget) return;
    const cfg = ICON_CONFIG[currentIcon] || ICON_CONFIG.hero;
    anim.current.previousTarget = anim.current.currentTarget;
    anim.current.currentTarget  = targets[currentIcon] || targets.hero;
    anim.current.morphProgress  = 0;
    anim.current.currentOffset  = POSITION_OFFSETS[cfg.position] ?? 3.0;
  }, [currentIcon, targets]);

  // ── Frame loop ───────────────────────────────────────────────────────────
  useFrame((state, delta) => {
    if (!pointsRef.current || !anim.current.currentTarget) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const pos = posAttr.array;
    const time = state.clock.elapsedTime;

    if (anim.current.morphProgress < 1) {
      anim.current.morphProgress = Math.min(
        1,
        anim.current.morphProgress + delta * 0.6
      );
    }
    const t = easeInOutCubic(anim.current.morphProgress);

    const { currentTarget, previousTarget } = anim.current;

    anim.current.displayOffset +=
      (anim.current.currentOffset - anim.current.displayOffset) * 0.05;

    const localMX = mouseWorld.current.x - anim.current.displayOffset;
    const localMY = mouseWorld.current.y;

    const REPEL_RADIUS = 1.2;
    const REPEL_STRENGTH = 0.4;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;

      const tgt = currentTarget[i]  || [0, 0, 0];
      const prv = previousTarget?.[i] || [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        0,
      ];

      const tx = prv[0] + (tgt[0] - prv[0]) * t;
      const ty = prv[1] + (tgt[1] - prv[1]) * t;
      const tz = prv[2] + (tgt[2] - prv[2]) * t;

      // Subtle idle float (small like splash)
      const fx = Math.sin(time * 0.5 + i * 0.11) * 0.012;
      const fy = Math.cos(time * 0.4 + i * 0.13) * 0.012;

      // Cursor repel
      const dx = pos[idx]     - localMX;
      const dy = pos[idx + 1] - localMY;
      const d  = Math.sqrt(dx * dx + dy * dy);
      let rx = 0, ry = 0;
      if (d < REPEL_RADIUS && d > 0.001) {
        const f = (1 - d / REPEL_RADIUS) * REPEL_STRENGTH;
        rx = (dx / d) * f;
        ry = (dy / d) * f;
      }

      pos[idx]     += (tx + fx + rx - pos[idx])     * 0.08;
      pos[idx + 1] += (ty + fy + ry - pos[idx + 1]) * 0.08;
      pos[idx + 2] += (tz          - pos[idx + 2])  * 0.08;
    }

    posAttr.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.position.x = anim.current.displayOffset;
      groupRef.current.rotation.y = Math.sin(time * 0.12) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry} material={material} />
    </group>
  );
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}