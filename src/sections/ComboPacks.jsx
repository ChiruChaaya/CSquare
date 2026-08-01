// src/sections/ComboPacks.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const COMBOS = [
  {
    id: 'c1',
    name: 'Launch Pad',
    tagline: 'Web + Brand',
    discount: 20,
    originalPrice: 55000,
    bundlePrice: 44000,
    color: '#D9E8A5',
    includes: [
      'Custom Website',
      'Brand Identity',
      'Logo + Palette',
      'Social kit',
      '60-day support',
    ],
  },
  {
    id: 'c2',
    name: 'Growth Engine',
    tagline: 'Web + AI + CRM',
    discount: 25,
    originalPrice: 120000,
    bundlePrice: 90000,
    badge: 'Best Value',
    color: '#A5D9C0',
    includes: [
      'React app',
      'AI Automation',
      'CSquare360 CRM',
      'Analytics dashboard',
      'Bots',
      '90-day support',
    ],
  },
  {
    id: 'c3',
    name: 'Full Stack',
    tagline: 'Web + Security + Marketing',
    discount: 30,
    originalPrice: 150000,
    bundlePrice: 105000,
    color: '#B5D080',
    includes: [
      'Enterprise app',
      'Security audit',
      'SEO + SEM',
      'Social strategy',
      'Dashboard',
      '120-day support',
    ],
  },
  {
    id: 'c4',
    name: 'Total Dominance',
    tagline: 'All 6 Services',
    discount: 35,
    originalPrice: 250000,
    bundlePrice: 162500,
    badge: '🔥 Flagship',
    color: '#D9E8A5',
    includes: [
      'AI + CRM + Web + Security',
      'Marketing suite',
      'Brand design',
      'Project manager',
      '12-month retainer',
    ],
  },
];

// ─── Combo Card ──────────────────────────────────────────────────────────
function ComboCard({ combo, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { y: 70, opacity: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 87%',
      once: true,
      onEnter: () =>
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: (index % 2) * 0.15,
          ease: 'power4.out',
        }),
    });
  }, [index]);

  const savings = combo.originalPrice - combo.bundlePrice;
  const isBig = !!combo.badge;

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-1"
      style={{
        border: isBig
          ? `1px solid ${combo.color}55`
          : '1px solid rgba(255,255,255,0.1)',
        // Solid dark background so text stays readable
        background: isBig
          ? 'linear-gradient(180deg, rgba(20,30,20,0.95), rgba(10,15,10,0.98))'
          : 'linear-gradient(180deg, rgba(15,15,15,0.94), rgba(5,5,5,0.97))',
        backdropFilter: 'blur(16px)',
        padding: '2.25rem',
        boxShadow: isBig
          ? `0 25px 70px ${combo.color}15, 0 0 0 1px ${combo.color}20 inset`
          : '0 15px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02) inset',
      }}
      data-cursor="view"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 40% 0%, ${combo.color}20, transparent 65%)`,
        }}
      />

      {/* Badge */}
      {combo.badge && (
        <div className="absolute -top-3.5 left-6 z-10">
          <span
            className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
            style={{
              background: combo.color,
              color: '#000',
              boxShadow: `0 8px 24px ${combo.color}30`,
            }}
          >
            {combo.badge}
          </span>
        </div>
      )}

      <div className="relative flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p
              className="text-xs font-mono tracking-[0.25em] uppercase mb-1"
              style={{ color: combo.color }}
            >
              {combo.name}
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {combo.tagline}
            </p>
          </div>
          <div
            className="flex-shrink-0 text-xs font-mono font-bold px-3 py-1.5 rounded-full"
            style={{
              background: `${combo.color}25`,
              color: combo.color,
              border: `1px solid ${combo.color}40`,
            }}
          >
            Save {combo.discount}%
          </div>
        </div>

        {/* Price */}
        <div className="mb-1">
          <span
            className="text-4xl md:text-5xl font-serif font-bold"
            style={{
              color: combo.color,
              textShadow: `0 0 40px ${combo.color}40`,
            }}
          >
            ₹{combo.bundlePrice.toLocaleString('en-IN')}
          </span>
        </div>
        <p
          className="text-xs font-mono mb-2"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <span
            className="line-through mr-2"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            ₹{combo.originalPrice.toLocaleString('en-IN')}
          </span>
          You save ₹{savings.toLocaleString('en-IN')}
        </p>

        {/* Divider */}
        <div
          className="w-full h-px my-6"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />

        {/* Includes */}
        <ul className="flex flex-col gap-2.5 flex-1 mb-8">
          {combo.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              <span
                className="text-xs mt-1"
                style={{ color: combo.color, flexShrink: 0 }}
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="block text-center text-sm font-mono tracking-widest uppercase py-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 group/btn"
          style={{
            borderColor: `${combo.color}50`,
            color: combo.color,
            background: `${combo.color}08`,
          }}
          onClick={(e) => {
            e.preventDefault();
            window.lenis?.scrollTo(document.querySelector('#contact'), {
              offset: -80,
              duration: 1.5,
            });
          }}
        >
          <span className="inline-flex items-center gap-2">
            Claim Bundle
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

// ─── Main Combos Section ─────────────────────────────────────────────────
export default function ComboPacks() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, { y: 20, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to(labelRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
          }),
      });

      const split = new SplitType(headingRef.current, { types: 'chars' });
      gsap.set(split.chars, { y: '110%', opacity: 0 });
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 72%',
        once: true,
        onEnter: () =>
          gsap.to(split.chars, {
            y: '0%',
            opacity: 1,
            duration: 1.1,
            stagger: 0.022,
            ease: 'power4.out',
          }),
      });

      gsap.set(dividerRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
      });
      ScrollTrigger.create({
        trigger: dividerRef.current,
        start: 'top 82%',
        once: true,
        onEnter: () =>
          gsap.to(dividerRef.current, {
            scaleX: 1,
            duration: 1.2,
            delay: 0.3,
            ease: 'power4.inOut',
          }),
      });

      return () => split.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="combos"
      className="relative w-full min-h-screen py-24 md:py-36 flex items-center"
      style={{ background: 'transparent' }}
    >
      {/* Vignette — darkens center where cards sit */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at 50% 55%,
            rgba(0,0,0,0.75) 0%,
            rgba(0,0,0,0.4) 45%,
            transparent 85%
          )`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <p
          ref={labelRef}
          className="text-xs font-mono tracking-[0.3em] uppercase mb-8"
          style={{ color: 'rgba(217,232,165,0.6)' }}
        >
          — Bundle & Save
        </p>

        {/* Heading */}
        <div className="mb-10 max-w-3xl">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[1.05]"
          >
            More power,{' '}
            <span
              style={{
                color: '#D9E8A5',
                textShadow: '0 0 40px rgba(217, 232, 165, 0.4)',
              }}
            >
              less spend.
            </span>
          </h2>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="w-full h-px mb-14"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {COMBOS.map((c, i) => (
            <ComboCard key={c.id} combo={c} index={i} />
          ))}
        </div>

        <p
          className="text-center text-xs font-mono tracking-widest mt-12"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Save up to 35% when bundling services together.
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
        <div
          className="absolute top-0 left-0 h-full w-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
      </div>
      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-full h-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
        <div
          className="absolute top-0 right-0 h-full w-px"
          style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }}
        />
      </div>
    </section>
  );
}