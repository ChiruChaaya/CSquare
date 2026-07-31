// ============================================
// GLSL SHADERS — USTA STYLE (sharp tiny dots)
// ============================================

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uSize;
  uniform float uExplosion;
  uniform float uPixelRatio;
  
  attribute vec3 aTarget;
  attribute vec3 aRandom;
  attribute float aSize;
  attribute float aOffset;
  attribute vec3 aColor;
  
  varying float vAlpha;
  varying vec3 vColor;

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
    
    // Ease progress
    float p = smoothstep(0.0, 1.0, uProgress);
    
    // Interpolate from random → target
    vec3 pos = mix(aRandom, aTarget, p);
    
    // Organic floating noise
    float t = uTime * 0.2 + aOffset;
    vec3 noise = vec3(
      snoise(vec3(pos.x * 0.3, pos.y * 0.3, t)),
      snoise(vec3(pos.y * 0.3, pos.z * 0.3, t + 100.0)),
      snoise(vec3(pos.z * 0.3, pos.x * 0.3, t + 200.0))
    );
    
    // More noise when scattered, less when formed
    float noiseStrength = mix(0.6, 0.15, p);
    pos += noise * noiseStrength;
    
    // EXPLOSION EFFECT — particles push outward from center
if (uExplosion > 0.0) {
  // Direction from center outward
  vec3 explodeDir = normalize(aTarget + vec3(0.001));
  
  // Random per-particle variation for organic feel
  float rand = fract(sin(aOffset * 12.9898) * 43758.5453);
  float force = uExplosion * (2.5 + rand * 3.0);
  
  // Push outward
  pos += explodeDir * force;
  
  // Add rotation swirl during explosion
  float angle = uExplosion * 0.5 + aOffset;
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  pos.xy = rot * pos.xy;
}
    
    // Mouse repulsion
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vec4 projected = projectionMatrix * mvPos;
    vec2 screenPos = projected.xy / projected.w;
    vec2 mouseNorm = uMouse * 2.0 - 1.0;
    float mouseDist = distance(screenPos, mouseNorm);
    float mouseForce = smoothstep(0.35, 0.0, mouseDist) * uMouseStrength;
    vec2 pushDir = normalize(screenPos - mouseNorm);
    pos.xy += pushDir * mouseForce * 0.6;
    
    vec4 finalPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * finalPos;
    
    // SMALL sharp particles — like USTA
    gl_PointSize = aSize * uSize * uPixelRatio * (100.0 / -finalPos.z);
    
    vAlpha = mix(0.4, 1.0, p);
  }
`;

export const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    
    if (dist > 0.5) discard;
    
    // Very sharp — almost no falloff
    float alpha = 1.0 - smoothstep(0.35, 0.5, dist);
    
    gl_FragColor = vec4(vColor, alpha * vAlpha * 0.9);
  }
`;