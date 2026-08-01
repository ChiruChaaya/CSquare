// src/compenents/SectionBackground/SectionBackground.jsx
// Reusable background treatment — grid + gradient overlay + vignette
// Matches Hero section aesthetic. Direction changes based on where icon sits.

export default function SectionBackground({ iconSide = 'right' }) {
  // Direction of dark gradient (opposite of icon side so text stays readable)
  const gradientDirection = {
    right:  '90deg',       // dark on left → light on right (icon on right)
    left:   '270deg',      // dark on right → light on left (icon on left)
    center: '180deg',      // dark top → transparent (icon centered)
  }[iconSide] || '90deg';

  const gradientStops =
    iconSide === 'center'
      ? `rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.7) 100%`
      : `rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0) 100%`;

  const vignetteOrigin =
    iconSide === 'right'  ? '30% 50%' :
    iconSide === 'left'   ? '70% 50%' :
                            '50% 50%';

  return (
    <>
      {/* ─── Dark gradient overlay for text readability ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(${gradientDirection}, ${gradientStops})`,
          zIndex: 1,
        }}
      />

      {/* ─── Subtle grid overlay ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,232,165,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,232,165,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.03,
          zIndex: 1,
        }}
      />

      {/* ─── Radial vignette ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${vignetteOrigin}, transparent 40%, rgba(0,0,0,0.6) 100%)`,
          zIndex: 1,
        }}
      />

      {/* ─── Corner decorations (top) ─── */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none z-[2]">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
        <div
          className="absolute top-0 left-0 h-full w-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
      </div>
      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none z-[2]">
        <div
          className="absolute top-0 right-0 w-full h-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
        <div
          className="absolute top-0 right-0 h-full w-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
      </div>
    </>
  );
}