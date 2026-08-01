// src/sections/Prices.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Perfect for new brands',
    price: 25000,
    per: 'project',
    featured: false,
    features: [
      'Custom website (5 pages)',
      'Mobile-first responsive',
      'Basic SEO setup',
      'Contact form',
      '2 revisions',
      '30-day support',
    ],
    cta: 'Get Started',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For scaling businesses',
    price: 65000,
    per: 'project',
    featured: true,
    badge: 'Most Popular',
    features: [
      'Everything in Starter',
      'React / Next.js app',
      'CRM integration',
      'AI automation',
      'Advanced SEO',
      '4 revisions',
      '90-day support',
    ],
    cta: 'Start Growing',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Full transformation',
    price: null,
    priceLabel: 'Custom',
    per: 'scope',
    featured: false,
    features: [
      'Everything in Growth',
      'Custom AI/ML systems',
      'Full brand identity',
      'Security audit',
      'WebGL experiences',
      'Unlimited revisions',
      '12-month retainer',
    ],
    cta: "Let's Talk",
  },
];

// ─── Price with count-up animation ──────────────────────────────────────
function PriceDisplay({ tier }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    if (!tier.price) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          gsap.to(
            { v: 0 },
            {
              v: tier.price,
              duration: 2,
              ease: 'power3.out',
              onUpdate: function () {
                setVal(Math.floor(this.targets()[0].v));
              },
            }
          );
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [tier.price]);

  const display = tier.price ? val.toLocaleString('en-IN') : tier.priceLabel;

  return (
    <div ref={ref} className="flex items-end gap-1">
      {tier.price && (
        <span
          className="text-2xl font-mono"
          style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}
        >
          ₹
        </span>
      )}
      <span
        className="text-5xl md:text-6xl font-serif font-bold leading-none"
        style={{
          color: tier.featured ? '#D9E8A5' : '#ffffff',
          textShadow: tier.featured
            ? '0 0 40px rgba(217,232,165,0.4)'
            : 'none',
        }}
      >
        {display}
      </span>
    </div>
  );
}

// ─── Pricing Card ────────────────────────────────────────────────────────
function PricingCard({ tier, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { y: 60, opacity: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () =>
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.15,
          ease: 'power4.out',
        }),
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-1"
      style={{
        border: tier.featured
          ? '1px solid rgba(217,232,165,0.4)'
          : '1px solid rgba(255,255,255,0.1)',
        // Solid dark background so text stays crisp over particles
        background: tier.featured
          ? 'linear-gradient(180deg, rgba(20,30,20,0.95), rgba(10,15,10,0.98))'
          : 'linear-gradient(180deg, rgba(15,15,15,0.94), rgba(5,5,5,0.97))',
        backdropFilter: 'blur(16px)',
        padding: '2.25rem',
        boxShadow: tier.featured
          ? '0 25px 70px rgba(217,232,165,0.1), 0 0 0 1px rgba(217,232,165,0.15) inset'
          : '0 15px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02) inset',
      }}
      data-cursor="button"
    >
      {/* Featured glow */}
      {tier.featured && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(217,232,165,0.18), transparent 60%)',
            animation: 'subtlePulse 3s ease-in-out infinite',
          }}
        />
      )}

      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
            style={{
              background: '#D9E8A5',
              color: '#000',
              boxShadow: '0 8px 24px rgba(217,232,165,0.3)',
            }}
          >
            {tier.badge}
          </span>
        </div>
      )}

      <div className="relative flex flex-col flex-1">
        {/* Tier name */}
        <div className="mb-6">
          <h3
            className="text-xs font-mono tracking-[0.3em] uppercase mb-2"
            style={{ color: tier.featured ? '#D9E8A5' : 'rgba(255,255,255,0.5)' }}
          >
            {tier.name}
          </h3>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {tier.tagline}
          </p>
        </div>

        {/* Price */}
        <div className="mb-2">
          <PriceDisplay tier={tier} />
        </div>
        <p
          className="text-xs font-mono mb-8"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          / {tier.per}
        </p>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1 mb-8">
          {tier.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 text-sm"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              <span
                className="text-xs mt-1"
                style={{ color: '#D9E8A5', flexShrink: 0 }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="block text-center text-sm font-mono tracking-widest uppercase py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group"
          style={
            tier.featured
              ? {
                  background: '#D9E8A5',
                  color: '#000',
                  boxShadow: '0 10px 30px rgba(217,232,165,0.25)',
                }
              : {
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.9)',
                  background: 'rgba(255,255,255,0.03)',
                }
          }
          onClick={(e) => {
            e.preventDefault();
            window.lenis?.scrollTo(document.querySelector('#contact'), {
              offset: -80,
              duration: 1.5,
            });
          }}
        >
          <span className="inline-flex items-center gap-2">
            {tier.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

// ─── Main Pricing Section ────────────────────────────────────────────────
export default function Prices() {
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
      id="pricing"
      className="relative w-full min-h-screen py-24 md:py-36 flex items-center"
      style={{ background: 'transparent' }}
    >
      <style>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.5; }
        }
      `}</style>

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
          — Pricing
        </p>

        {/* Heading */}
        <div className="mb-10 max-w-3xl">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[1.05]"
          >
            Transparent{' '}
            <span
              style={{
                color: '#D9E8A5',
                textShadow: '0 0 40px rgba(217, 232, 165, 0.4)',
              }}
            >
              pricing.
            </span>
          </h2>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="w-full h-px mb-14"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {TIERS.map((t, i) => (
            <PricingCard key={t.id} tier={t} index={i} />
          ))}
        </div>

        <p
          className="text-center text-xs font-mono tracking-widest mt-12"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          All prices in INR. Discovery call is always free.
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