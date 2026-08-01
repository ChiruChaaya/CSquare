// src/sections/Service.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { id: '01', title: 'AI Automation',    description: 'GPT integrations, custom AI pipelines, workflow automation.', icon: '🤖', accent: '#D9E8A5', tags: ['GPT', 'Workflow', 'Custom AI'] },
  { id: '02', title: 'CRM Systems',      description: 'CSquare360 — proprietary CRM built for modern sales teams.',   icon: '🔗', accent: '#A5D9C0', tags: ['CSquare360', 'Pipeline'] },
  { id: '03', title: 'Web Development',  description: 'Lightning-fast React apps and immersive WebGL experiences.',   icon: '🌐', accent: '#B5D080', tags: ['React', 'Next.js', 'WebGL'] },
  { id: '04', title: 'Cyber Security',   description: 'Security audits, pen testing, compliance frameworks.',         icon: '🛡️', accent: '#7FB98A', tags: ['Audits', 'Pen Testing'] },
  { id: '05', title: 'Digital Marketing',description: 'Data-driven growth across SEO, SEM, and social platforms.',   icon: '📈', accent: '#D9E8A5', tags: ['SEO/SEM', 'Growth'] },
  { id: '06', title: 'Brand Experiences',description: 'Identity, UI/UX, motion design that speaks your brand.',       icon: '✦', accent: '#A5D9C0', tags: ['Identity', 'UI/UX'] },
];

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { y: 70, opacity: 0 });
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => gsap.to(el, {
        y: 0, opacity: 1,
        duration: 1, delay: (index % 2) * 0.12,
        ease: 'power4.out',
      }),
    });
  }, [index]);

  const accent = service.accent;

  return (
    <div
      ref={cardRef}
      className="group relative p-6 rounded-2xl border flex flex-col gap-4 transition-all duration-500 hover:-translate-y-1"
      style={{
        borderColor: 'rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.015)',
        minHeight: '240px',
      }}
      data-cursor="view"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 0%, ${accent}18, transparent 65%)` }}
      />
      <div
        className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ borderColor: `${accent}25` }}
      />
      <div className="relative flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {service.id}
          </span>
          <span className="text-2xl transition-transform duration-400 group-hover:scale-110 group-hover:rotate-6 inline-block">
            {service.icon}
          </span>
        </div>
        <h3
          className="text-lg md:text-xl font-serif font-bold text-white group-hover:text-[#D9E8A5] transition-colors duration-300"
        >
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {service.description}
        </p>
        {service.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {service.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Service() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef   = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, { y: 20, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 75%', once: true,
        onEnter: () => gsap.to(labelRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }),
      });

      const split = new SplitType(headingRef.current, { types: 'chars' });
      gsap.set(split.chars, { y: '110%', opacity: 0 });
      ScrollTrigger.create({
        trigger: headingRef.current, start: 'top 72%', once: true,
        onEnter: () => gsap.to(split.chars, {
          y: '0%', opacity: 1,
          duration: 1.1, stagger: 0.022,
          ease: 'power4.out',
        }),
      });

      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      ScrollTrigger.create({
        trigger: dividerRef.current, start: 'top 82%', once: true,
        onEnter: () => gsap.to(dividerRef.current, {
          scaleX: 1, duration: 1.2, delay: 0.3, ease: 'power4.inOut',
        }),
      });

      return () => split.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full min-h-screen overflow-hidden py-24 md:py-36 flex items-center"
      style={{ background: 'transparent' }}
    >
      {/* Dark gradient — icon is on LEFT, so darken RIGHT */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            270deg,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.6) 35%,
            rgba(0, 0, 0, 0) 55%,
            rgba(0, 0, 0, 0) 100%
          )`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at 70% 50%,
            transparent 40%,
            rgba(0, 0, 0, 0.6) 100%
          )`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT — icon area (empty) */}
          <div className="hidden lg:block" />

          {/* RIGHT — content */}
          <div className="flex flex-col">
            <p
              ref={labelRef}
              className="text-xs font-mono tracking-[0.3em] uppercase mb-6 md:mb-8"
              style={{ color: 'rgba(217,232,165,0.55)' }}
            >
              — What We Do
            </p>

            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[1.05] mb-10"
            >
              Services that{' '}
              <span
                style={{
                  color: '#D9E8A5',
                  textShadow: '0 0 40px rgba(217, 232, 165, 0.3)',
                }}
              >
                move the needle.
              </span>
            </h2>

            <div
              ref={dividerRef}
              className="w-full h-px mb-10"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }} />
        <div className="absolute top-0 left-0 h-full w-px" style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }} />
      </div>
      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px" style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }} />
        <div className="absolute top-0 right-0 h-full w-px" style={{ backgroundColor: 'rgba(217, 232, 165, 0.3)' }} />
      </div>
    </section>
  );
}