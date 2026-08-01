// src/sections/About.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

function StatCounter({ value, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          gsap.to({ v: 0 }, {
            v: value, duration: 2.2, ease: 'power3.out',
            onUpdate: function () { setCount(Math.floor(this.targets()[0].v)); },
          });
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div
        className="text-5xl md:text-6xl font-bold leading-none font-serif"
        style={{
          color: '#D9E8A5',
          textShadow: '0 0 40px rgba(217, 232, 165, 0.3)',
        }}
      >
        {count}{suffix}
      </div>
      <div
        className="text-xs font-mono tracking-[0.25em] uppercase mt-2"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        {label}
      </div>
    </div>
  );
}

function ValueCard({ icon, title, description, index }) {
  const cardRef = useRef(null);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { y: 60, opacity: 0 });
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to(el, {
        y: 0, opacity: 1,
        duration: 0.9, delay: index * 0.15,
        ease: 'power4.out',
      }),
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative p-6 md:p-8 rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={{
        borderColor: 'rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)',
      }}
      data-cursor="text"
      data-cursor-text={title}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(217,232,165,0.12), transparent 70%)' }}
      />
      <div className="relative">
        <div className="text-3xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 inline-block">
          {icon}
        </div>
        <h3
          className="text-lg md:text-xl font-serif font-bold text-white mb-3 group-hover:text-[#D9E8A5] transition-colors duration-300"
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef   = useRef(null);
  const textRef    = useRef(null);
  const statsRef   = useRef(null);
  const dividerRef = useRef(null);

  const stats = [
    { value: 50, suffix: '+', label: 'Projects Delivered' },
    { value: 30, suffix: '+', label: 'Happy Clients' },
    { value: 3,  suffix: '+', label: 'Years Experience' },
    { value: 6,  suffix: '',  label: 'Core Services' },
  ];

  const values = [
    { icon: '⚡', title: 'Speed',      description: 'Blazing fast delivery without compromising quality.' },
    { icon: '🎯', title: 'Precision',  description: 'Every detail matters. We sweat the small stuff.' },
    { icon: '🔮', title: 'Innovation', description: "We use tomorrow's technology today." },
  ];

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
          duration: 1.1, stagger: 0.025,
          ease: 'power4.out',
        }),
      });

      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      ScrollTrigger.create({
        trigger: dividerRef.current, start: 'top 80%', once: true,
        onEnter: () => gsap.to(dividerRef.current, {
          scaleX: 1, duration: 1.2, delay: 0.3, ease: 'power4.inOut',
        }),
      });

      [textRef.current, statsRef.current].forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { y: 50, opacity: 0 });
        ScrollTrigger.create({
          trigger: el, start: 'top 78%', once: true,
          onEnter: () => gsap.to(el, {
            y: 0, opacity: 1,
            duration: 1, delay: i * 0.18,
            ease: 'power4.out',
          }),
        });
      });

      return () => split.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen overflow-hidden py-24 md:py-36 flex items-center"
      style={{ background: 'transparent' }}
    >
      {/* Dark gradient overlay — left side (icon is on right) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.6) 35%,
            rgba(0, 0, 0, 0) 55%,
            rgba(0, 0, 0, 0) 100%
          )`,
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at 30% 50%,
            transparent 40%,
            rgba(0, 0, 0, 0.6) 100%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <p
              ref={labelRef}
              className="text-xs font-mono tracking-[0.3em] uppercase mb-6 md:mb-8"
              style={{ color: 'rgba(217,232,165,0.55)' }}
            >
              — About Us
            </p>

            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[1.05] mb-10"
            >
              We craft digital{' '}
              <span
                style={{
                  color: '#D9E8A5',
                  textShadow: '0 0 40px rgba(217, 232, 165, 0.3)',
                }}
              >
                experiences
              </span>{' '}
              that leave a mark.
            </h2>

            <div
              ref={dividerRef}
              className="w-full h-px mb-10"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />

            <div ref={textRef} className="mb-14">
              <p className="text-base md:text-lg text-neutral-300 mb-6 leading-relaxed">
                CSquare is a premium digital studio specializing in cutting-edge
                web experiences, AI automation, and brand transformation.
              </p>
              <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                We combine technical precision with creative vision to build
                products that don&rsquo;t just work &mdash; they inspire.
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-x-8 gap-y-10 mb-14">
              {stats.map((s) => (
                <StatCounter key={s.label} {...s} />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {values.map((v, i) => (
                <ValueCard key={v.title} {...v} index={i} />
              ))}
            </div>
          </div>

          <div className="hidden lg:block" />
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