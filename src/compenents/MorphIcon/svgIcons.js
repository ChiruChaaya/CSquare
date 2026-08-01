// src/compenents/MorphIcon/svgIcons.js
export const ICON_CONFIG = {
  hero: {
    src: '/icons/hero-icon.jpg',
    position: 'right',
    scale: 4.5,
    ambient: false,
  },
  about: {
    src: '/icons/about-icon.jpg',
    position: 'right',
    scale: 4.5,
    ambient: false,
  },
  services: {
    src: '/icons/services-icon.jpg',
    position: 'left',
    scale: 4.5,
    ambient: false,
  },
  pricing: {
    src: null,           // ← no image
    position: 'center',
    scale: 4.5,
    ambient: true,       // ← ambient mode
  },
  combos: {
    src: null,
    position: 'center',
    scale: 4.5,
    ambient: true,
  },
  contact: {
    src: '/icons/contact-icon.jpg',
    position: 'center',
    scale: 4.5,
    ambient: false,
  },
};

// ── Ambient cloud — thin scatter pushed to viewport edges ────────────────
export function generateAmbientCloud(count = 3000, scale = 4.5) {
  const points = [];
  for (let i = 0; i < count; i++) {
    // Push particles to OUTER edges (leave center clear for cards)
    const angle = Math.random() * Math.PI * 2;

    // Bias radius toward outer edges — 0.7 to 1.4 of scale range
    const radiusBias = 0.7 + Math.random() * 0.7;
    const radius = radiusBias * scale * 2.0;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.75;
    const z = (Math.random() - 0.5) * 2;

    points.push([x, y, z]);
  }
  return points;
}

function generateSphereFallback(count, scale) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = (scale / 2) * (0.7 + Math.random() * 0.3);
    points.push([
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi) * 0.3,
    ]);
  }
  return points;
}

export function sampleImagePoints(imageUrl, sampleCount = 3000, size = 220, scale = 4.5) {
  return new Promise((resolve) => {
    console.log(`[MorphIcon] Loading: ${imageUrl}`);
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      console.log(`[MorphIcon] ✅ Loaded: ${imageUrl}`);

      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      const aspect = img.width / img.height;
      let drawW, drawH, offsetX, offsetY;
      if (aspect > 1) {
        drawH = size;
        drawW = size * aspect;
        offsetX = -(drawW - size) / 2;
        offsetY = 0;
      } else {
        drawW = size;
        drawH = size / aspect;
        offsetX = 0;
        offsetY = -(drawH - size) / 2;
      }
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

      const data = ctx.getImageData(0, 0, size, size).data;
      let totalBrightness = 0;
      for (let i = 0; i < data.length; i += 4) {
        totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      const avgBrightness = totalBrightness / (data.length / 4);
      const isMostlyBright = avgBrightness > 140;
      const validPoints = [];

      for (let y = 0; y < size; y += 2) {
        for (let x = 0; x < size; x += 2) {
          const idx = (y * size + x) * 4;
          const b = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          if (isMostlyBright ? b < avgBrightness - 20 : b > avgBrightness + 20) {
            validPoints.push({ x, y });
          }
        }
      }

      if (validPoints.length < 100) {
        resolve(generateSphereFallback(sampleCount, scale));
        return;
      }

      const points = [];
      for (let i = 0; i < sampleCount; i++) {
        const p = validPoints[Math.floor(Math.random() * validPoints.length)];
        const nx = ((p.x - size / 2) / size) * scale;
        const ny = -((p.y - size / 2) / size) * scale;
        const nz = (Math.random() - 0.5) * 0.3;
        points.push([nx, ny, nz]);
      }
      resolve(points);
    };

    img.onerror = () => {
      console.error(`[MorphIcon] ❌ FAILED: ${imageUrl}`);
      resolve(generateSphereFallback(sampleCount, scale));
    };

    img.src = imageUrl;
  });
}