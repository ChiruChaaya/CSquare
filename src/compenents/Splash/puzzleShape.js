// ============================================
// PUZZLE POINT GENERATOR
// Loads your actual SVG file and samples particles
// ============================================

let cachedPath = null;

// Load SVG file and extract the path
async function loadPuzzlePath() {
  if (cachedPath) return cachedPath;

  try {
    const response = await fetch('/puzzle.svg');
    const svgText = await response.text();

    // Extract the first path's d attribute
    const match = svgText.match(/<path[^>]*d="([^"]+)"/);
    if (match && match[1]) {
      cachedPath = match[1];
      return cachedPath;
    }
  } catch (e) {
    console.error('Failed to load puzzle.svg:', e);
  }

  return null;
}

export async function generatePuzzlePoints(pointCount = 5000) {
  const pathD = await loadPuzzlePath();

  if (!pathD) {
    console.warn('Using fallback puzzle shape');
    return generateFallbackPuzzle(pointCount);
  }

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 240 176');
  svg.style.position = 'absolute';
  svg.style.opacity = '0';
  svg.style.pointerEvents = 'none';
  svg.style.width = '1px';
  svg.style.height = '1px';

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', pathD);
  //path.setAttribute('fill-rule', 'evenodd');
  svg.appendChild(path);
  document.body.appendChild(svg);

  const points = [];
  let attempts = 0;
  const maxAttempts = pointCount * 30;

  // Sample points inside the shape using SVG's built-in point-in-path test
while (points.length < pointCount && attempts < maxAttempts) {
  const pt = svg.createSVGPoint();
  pt.x = Math.random() * 240;
  pt.y = Math.random() * 176;

  if (path.isPointInFill(pt)) {
    // Center at (120, 88), scale for Three.js
    const x = (pt.x - 120) / 18;
    const y = -(pt.y - 88) / 18;
    const z = (Math.random() - 0.5) * 0.8;

    points.push({ x, y, z });
  }
  attempts++;
}

  document.body.removeChild(svg);

  console.log(`✓ Generated ${points.length} particles from your SVG`);
  return points;
}

// Fallback if SVG fails to load
function generateFallbackPuzzle(pointCount) {
  const points = [];
  for (let i = 0; i < pointCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * 2;
    points.push({
      x: Math.cos(theta) * r,
      y: Math.sin(theta) * r,
      z: (Math.random() - 0.5) * 2,
    });
  }
  return points;
}